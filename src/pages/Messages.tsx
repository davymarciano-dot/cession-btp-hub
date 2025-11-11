import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
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

      // Fetch last message for each conversation
      const conversationsWithMessages = await Promise.all(
        (data || []).map(async (conv) => {
          const { data: lastMsg } = await supabase
            .from("messages")
            .select("content, created_at")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          return {
            ...conv,
            lastMessage: lastMsg
          };
        })
      );

      setConversations(conversationsWithMessages);
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
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const { error } = await supabase
        .from("messages")
        .insert({
          conversation_id: selectedConversation,
          sender_id: user.id,
          content: newMessage.trim()
        });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", selectedConversation);

      setNewMessage("");
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message",
        variant: "destructive"
      });
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-slate-50">
        <div className="container mx-auto px-4 h-[calc(100vh-200px)]">
          <div className="bg-white rounded-xl shadow-lg h-full flex overflow-hidden">
            {/* Conversations List */}
            <div className="w-80 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold">Messages</h2>
              </div>
              
              <ScrollArea className="flex-1">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Aucune conversation
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 text-left hover:bg-slate-50 border-b border-border transition-colors ${
                        selectedConversation === conv.id ? "bg-slate-100" : ""
                      }`}
                    >
                      <div className="font-semibold mb-1 line-clamp-1">
                        {conv.annonce.raison_sociale || "Entreprise anonyme"}
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {conv.annonce.secteur_activite} - {conv.annonce.departement}
                      </div>
                      {conv.lastMessage && (
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {conv.lastMessage.content}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </ScrollArea>
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversation(null)}
                      className="mb-2 lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour
                    </Button>
                    <h3 className="font-bold text-lg">
                      {selectedConv.annonce.raison_sociale || "Entreprise anonyme"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConv.annonce.secteur_activite} - {selectedConv.annonce.ville}
                    </p>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => {
                        const isOwnMessage = msg.sender_id === user.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                isOwnMessage
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {format(new Date(msg.created_at), "HH:mm", { locale: fr })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <form onSubmit={sendMessage} className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Sélectionnez une conversation pour commencer
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
