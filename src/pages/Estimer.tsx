import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DepartementsSelect } from "@/data/departements";
import EstimationDialog from "@/components/EstimationDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SearchableSelect } from "@/components/SearchableSelect";

const Estimer = () => {
  const [ca, setCa] = useState("");
  const [secteur, setSecteur] = useState("");
  const [departement, setDepartement] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [estimation, setEstimation] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handleEstimation = async () => {
    // Validation
    if (!ca || !secteur || !departement) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive",
      });
      return;
    }

    const caNumber = parseInt(ca);
    if (isNaN(caNumber) || caNumber <= 0) {
      toast({
        title: "Chiffre d'affaires invalide",
        description: "Veuillez entrer un chiffre d'affaires valide.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowDialog(true);

    try {
      const { data, error } = await supabase.functions.invoke('estimate-company', {
        body: { ca: caNumber, secteur, departement }
      });

      if (error) throw error;

      setEstimation(data);
      toast({
        title: "Estimation générée !",
        description: "Votre estimation de valorisation est prête.",
      });
    } catch (error: any) {
      console.error("Estimation error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'estimation.",
        variant: "destructive",
      });
      setShowDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero with Estimation Form */}
        <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                Estimez la valeur de votre entreprise BTP
              </h1>
              <p className="text-xl mb-12 text-center text-white/90">
                Estimation gratuite en 48h • Valorisation par IA • 100% confidentiel
              </p>

              {/* Estimation Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Estimation Gratuite en 2 Minutes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input 
                    type="number" 
                    placeholder="CA annuel (€)" 
                    className="text-foreground"
                    value={ca}
                    onChange={(e) => setCa(e.target.value)}
                  />
                  <SearchableSelect
                    value={secteur}
                    onValueChange={setSecteur}
                    placeholder="Secteur d'activité"
                    className="text-foreground"
                  />
                  <Select value={departement} onValueChange={setDepartement}>
                    <SelectTrigger className="text-foreground">
                      <SelectValue placeholder="Département" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px] overflow-y-auto">
                      <DepartementsSelect />
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6"
                  onClick={handleEstimation}
                  disabled={isLoading}
                >
                  {isLoading ? "Génération en cours..." : "💰 Obtenir Mon Estimation Gratuite"}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  ✅ Résultat immédiat par IA • Sans engagement • 100% confidentiel
                </p>
              </div>

              <EstimationDialog 
                open={showDialog}
                onOpenChange={setShowDialog}
                estimation={estimation}
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>

        {/* Avantages de l'Estimation */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi Estimer Votre Entreprise ?</h2>
              <p className="text-xl text-muted-foreground">
                Connaître la valeur de votre entreprise est essentiel pour prendre les bonnes décisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-slate-50 p-8 rounded-xl text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3">Valorisation Juste</h3>
                <p className="text-muted-foreground">
                  Obtenez une estimation précise basée sur les données du marché BTP et notre expertise IA
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3">Analyse Détaillée</h3>
                <p className="text-muted-foreground">
                  Points forts, axes d'amélioration et recommandations pour maximiser votre valeur
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3">Gratuit & Rapide</h3>
                <p className="text-muted-foreground">
                  Recevez votre estimation en quelques secondes, sans engagement ni frais cachés
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comment Ça Marche ?</h2>
              <p className="text-xl text-muted-foreground">
                3 étapes simples pour obtenir votre estimation
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Remplissez le formulaire</h3>
                  <p className="text-muted-foreground">
                    Indiquez votre CA annuel, secteur d'activité et département
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">IA analyse vos données</h3>
                  <p className="text-muted-foreground">
                    Notre algorithme évalue votre entreprise selon 20+ critères
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-success text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Recevez votre estimation</h3>
                  <p className="text-muted-foreground">
                    Fourchette de valorisation, multiple et recommandations détaillées
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-2">Cette estimation est-elle gratuite ?</h3>
                <p className="text-muted-foreground">
                  Oui, l'estimation est 100% gratuite et sans engagement. Vous pouvez l'utiliser autant de fois que nécessaire.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-2">Comment est calculée la valeur ?</h3>
                <p className="text-muted-foreground">
                  Notre IA analyse votre secteur, votre CA, votre localisation et compare avec des milliers de transactions similaires dans le BTP.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-2">Mes données sont-elles confidentielles ?</h3>
                <p className="text-muted-foreground">
                  Absolument. Vos informations sont traitées de manière confidentielle et ne sont jamais partagées sans votre accord.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-2">Puis-je vendre ensuite sur CessionBTP ?</h3>
                <p className="text-muted-foreground">
                  Oui ! Une fois votre estimation reçue, vous pouvez créer une annonce de vente en quelques clics depuis votre espace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-gradient-to-br from-secondary to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prêt à Connaître la Valeur de Votre Entreprise ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              C'est gratuit, rapide et sans engagement
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              size="lg" 
              className="bg-white text-secondary hover:bg-white/90 hover:shadow-2xl text-xl py-6 px-12"
            >
              💰 Obtenir Mon Estimation Maintenant
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Estimer;
