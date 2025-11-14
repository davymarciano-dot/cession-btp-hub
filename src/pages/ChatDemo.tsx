import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ChatDemo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

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
            ville
          )
        `)
        .or(`acheteur_id.eq.${user.id},vendeur_id.eq.${user.id}`)
        .order("updated_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Chat Widget Demo</h1>
          
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Vos conversations</h2>
            <div className="space-y-2">
              {conversations.length === 0 ? (
                <p className="text-muted-foreground">
                  Aucune conversation disponible. 
                  <Button
                    variant="link"
                    onClick={() => navigate("/entreprises")}
                    className="px-2"
                  >
                    Voir les entreprises
                  </Button>
                </p>
              ) : (
                conversations.map((conv) => (
                  <Button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    variant={selectedConversation === conv.id ? "default" : "outline"}
                    className="w-full justify-start"
                  >
                    {conv.annonce?.raison_sociale || "Entreprise"} - {conv.annonce?.ville}
                  </Button>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Caractéristiques du Chat Widget:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>✅ Messages en temps réel avec Supabase Realtime</li>
              <li>✅ Interface flottante minimisable</li>
              <li>✅ Indicateurs de lecture (✓ et ✓✓)</li>
              <li>✅ Bulles de messages avec avatars</li>
              <li>✅ Indicateur de saisie</li>
              <li>✅ Auto-scroll vers le bas</li>
              <li>✅ Design responsive et moderne</li>
            </ul>
          </Card>
        </div>
      </main>

      {/* Floating Chat Widget */}
      {selectedConversation && user && (
        <ChatWidget
          conversationId={selectedConversation}
          currentUserId={user.id}
          onClose={() => setSelectedConversation(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default ChatDemo;