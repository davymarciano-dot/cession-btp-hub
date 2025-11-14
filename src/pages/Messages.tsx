import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConversationItem } from "@/components/messages/ConversationItem";
import { ChatHeader } from "@/components/messages/ChatHeader";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { MessageInput } from "@/components/messages/MessageInput";
import { EmptyConversationState } from "@/components/messages/EmptyConversationState";

interface Conversation {
  id: string;
  annonce_id: string;
  acheteur_id: string;
  vendeur_id: string;
  created_at: string;
  updated_at: string;
  annonce: {
    id: string;
    raison_sociale: string | null;
    secteur_activite: string;
    ville: string;
    departement: string;
  };
  lastMessage?: {
    content: string;
    created_at: string;
  };
  unreadCount?: number;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

const Messages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    const conversationId = searchParams.get("conversation");
    if (conversationId && conversations.length > 0) {
      setSelectedConversation(conversationId);
    }
  }, [searchParams, conversations]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
      markMessagesAsRead(selectedConversation);
      
      // Subscribe to realtime updates
      const channel = supabase
        .channel('messages-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${selectedConversation}`
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);
            markMessagesAsRead(selectedConversation);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);
  };

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          annonce:annonces!conversations_annonce_id_fkey (
            id,
            raison_sociale,
            secteur_activite,
            ville,
            departement
          )
        `)
        .or(`acheteur_id.eq.${user.id},vendeur_id.eq.${user.id}`)
        .order("updated_at", { ascending: false });

      if (error) throw error;

      // Fetch last message and unread count for each conversation
      const conversationsWithData = await Promise.all(
        (data || []).map(async (conv) => {
          // Last message
          const { data: lastMsg } = await supabase
            .from("messages")
            .select("content, created_at")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          // Unread count
          const { count } = await supabase
            .from("messages")
            .select("*", { count: 'exact', head: true })
            .eq("conversation_id", conv.id)
            .neq("sender_id", user.id)
            .eq("read", false);

          return {
            ...conv,
            lastMessage: lastMsg || undefined,
            unreadCount: count || 0
          };
        })
      );

      setConversations(conversationsWithData);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les conversations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive"
      });
    }
  };

  const markMessagesAsRead = async (conversationId: string) => {
    try {
      await supabase
        .from("messages")
        .update({ read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", user.id)
        .eq("read", false);
      
      // Refresh conversations to update unread counts
      fetchConversations();
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !selectedConversation) return;

    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: selectedConversation,
          sender_id: user.id,
          content: content.trim()
        });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", selectedConversation);

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive"
      });
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  
  // Filtrer les conversations selon la recherche
  const filteredConversations = conversations.filter(conv => {
    const searchLower = searchQuery.toLowerCase();
    return (
      conv.annonce.raison_sociale?.toLowerCase().includes(searchLower) ||
      conv.annonce.secteur_activite?.toLowerCase().includes(searchLower) ||
      conv.annonce.ville?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Sidebar - Liste des conversations */}
          <div className={`${
            selectedConversation ? 'hidden lg:flex' : 'flex'
          } w-full lg:w-96 border-r flex-col bg-background`}>
            <div className="p-4 border-b">
              <h2 className="text-2xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {searchQuery ? 'Aucune conversation trouvée' : 'Aucune conversation'}
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isSelected={selectedConversation === conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                  />
                ))
              )}
            </ScrollArea>
          </div>

          {/* Zone de chat */}
          <div className={`${
            !selectedConversation ? 'hidden lg:flex' : 'flex'
          } flex-1 flex-col bg-background`}>
            {selectedConv ? (
              <>
                <ChatHeader 
                  conversation={selectedConv}
                  onBack={() => setSelectedConversation(null)}
                />
                
                <ScrollArea className="flex-1 p-4 bg-muted/10">
                  <div className="max-w-4xl mx-auto">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground py-12">
                        Aucun message pour le moment. Commencez la conversation !
                      </div>
                    ) : (
                      messages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isOwn={message.sender_id === user?.id}
                        />
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <MessageInput onSend={sendMessage} />
              </>
            ) : (
              <EmptyConversationState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
