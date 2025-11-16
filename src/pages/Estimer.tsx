import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DepartementsSelect } from "@/data/departements";

import { useToast } from "@/hooks/use-toast";
import { SearchableSelect } from "@/components/SearchableSelect";

const Estimer = () => {
  const [ca, setCa] = useState("");
  const [secteur, setSecteur] = useState("");
  const [departement, setDepartement] = useState("");
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

    toast({
      title: "Estimation demandée",
      description: "Nous travaillons sur votre estimation.",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero with Estimation Form */}
        <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">🧮</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Estimez la valeur de votre entreprise BTP</h1>
                <p className="text-xl mb-2 text-white/90">
                  Estimation gratuite par IA • Valorisation détaillée • 100% confidentiel
                </p>
                <p className="text-sm text-white/80">✓ Résultat en 2 minutes • Sans engagement • Confidentiel</p>
              </div>

              {/* Estimation Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Estimation Gratuite en 2 Minutes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    type="number"
                    placeholder="CA annuel (€)"
                    className="text-foreground py-6 text-lg"
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
                    <SelectTrigger className="text-foreground py-6">
                      <SelectValue placeholder="Département" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px] overflow-y-auto">
                      <DepartementsSelect />
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
                  onClick={handleEstimation}
                >
                  💰 Obtenir Mon Estimation Gratuite par IA
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  ✅ Powered by Lovable AI • Sans engagement • 100% confidentiel
                </p>
              </div>

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
              <div className="bg-slate-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3">Valorisation Réaliste</h3>
                <p className="text-muted-foreground">Multiples ajustés selon secteur BTP (0.3x à 1.2x le CA)</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3">Expert vous rappelle</h3>
                <p className="text-muted-foreground">Un expert BTP vous contacte sous 24h pour affiner</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3">Gratuit & Rapide</h3>
                <p className="text-muted-foreground">Résultat immédiat sans engagement ni frais cachés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comment Ça Marche ?</h2>
              <p className="text-xl text-muted-foreground">3 étapes simples pour obtenir votre estimation</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Remplissez le formulaire</h3>
                  <p className="text-muted-foreground">CA annuel, secteur d'activité et département</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">IA calcule instantanément</h3>
                  <p className="text-muted-foreground">Algorithme réaliste basé sur votre secteur BTP</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3">Recevez votre estimation</h3>
                  <p className="text-muted-foreground">Fourchette + expert vous rappelle sous 24h</p>
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
              <div className="bg-slate-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Cette estimation est-elle gratuite ?</h3>
                <p className="text-muted-foreground">Oui, l'estimation est 100% gratuite et sans engagement.</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Comment est calculée la valeur ?</h3>
                <p className="text-muted-foreground">
                  Multiples réalistes par secteur BTP : Maçonnerie (0.35-0.75x), Électricité (0.55-1.15x), Plomberie
                  (0.45-0.95x), etc.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Mes données sont-elles confidentielles ?</h3>
                <p className="text-muted-foreground">
                  Absolument. Vos informations sont 100% confidentielles et sécurisées.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Un expert me rappelle vraiment ?</h3>
                <p className="text-muted-foreground">
                  Oui ! Un expert BTP vous contacte sous 24h pour affiner l'estimation et répondre à vos questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Prêt à Connaître la Valeur de Votre Entreprise ?</h2>
            <p className="text-xl mb-8 text-white/90">C'est gratuit, rapide et sans engagement</p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="lg"
              className="bg-white text-orange-600 hover:bg-white/90 hover:shadow-2xl text-xl py-6 px-12"
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
