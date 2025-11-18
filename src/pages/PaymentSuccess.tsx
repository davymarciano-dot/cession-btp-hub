import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { analyticsEvents } from "@/lib/analytics";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);
  const [annonceId, setAnnonceId] = useState<string | null>(null);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast({
          title: "Erreur",
          description: "ID de session manquant",
          variant: "destructive",
        });
        navigate("/vendre");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { session_id: sessionId }
        });

        if (error) throw error;

        if (data.paid && data.annonce_id) {
          setAnnonceId(data.annonce_id);
          toast({
            title: "Paiement réussi !",
            description: "Votre annonce a été publiée avec succès.",
          });
        } else {
          throw new Error("Paiement non confirmé");
        }
      } catch (error: any) {
        console.error("Payment verification error:", error);
        toast({
          title: "Erreur de vérification",
          description: "Impossible de vérifier le paiement. Contactez le support.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate, toast]);

  if (isVerifying) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto p-12">
            <div className="text-center">
              <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold mb-2">Vérification du paiement...</h1>
              <p className="text-muted-foreground">
                Veuillez patienter pendant que nous vérifions votre paiement.
              </p>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Paiement réussi !</h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Votre annonce a été publiée avec succès sur CessionBTP.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="font-semibold mb-4">Prochaines étapes :</h2>
                <ul className="text-left space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Votre annonce est maintenant visible par 2000+ repreneurs qualifiés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Vous recevrez des notifications par email pour chaque demande de contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Notre équipe d'experts est disponible pour vous accompagner</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate("/entreprises")}
                  className="bg-primary hover:bg-primary/90"
                >
                  Voir Mon Annonce
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Retour à l'Accueil
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Un email de confirmation a été envoyé à votre adresse email.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;