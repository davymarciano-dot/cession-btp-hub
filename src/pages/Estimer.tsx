import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DepartementsSelect } from "@/data/departements";
import EstimationDialog from "@/components/EstimationDialog";
import { useToast } from "@/hooks/use-toast";
import { SearchableSelect } from "@/components/SearchableSelect";
import { Calculator, TrendingUp, Shield, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

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

    const estimationData = {
      ca: caNumber,
      secteur,
      departement
    };

    setEstimation(estimationData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6B35] via-[#FF8854] to-[#FFA573] py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
          
          <div className="container relative mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Hero Content */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Estimez la valeur de votre
                  <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    entreprise BTP
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
                  Obtenez une estimation gratuite et instantanée par IA
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Résultat en 2 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>100% Gratuit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Confidentiel</span>
                  </div>
                </div>
              </div>

              {/* Formulaire d'estimation */}
              <Card className="bg-white shadow-2xl p-8 md:p-12 rounded-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937]">Estimation Gratuite</h2>
                    <p className="text-muted-foreground">Remplissez le formulaire ci-dessous</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="ca" className="text-base font-semibold text-[#1F2937] mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
                      Chiffre d'affaires annuel
                    </Label>
                    <Input
                      id="ca"
                      type="number"
                      placeholder="Exemple : 500000"
                      className="h-14 text-lg border-2 focus:border-[#FF6B35]"
                      value={ca}
                      onChange={(e) => setCa(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="secteur" className="text-base font-semibold text-[#1F2937] mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#FF6B35]" />
                      Secteur d'activité
                    </Label>
                    <SearchableSelect
                      value={secteur}
                      onValueChange={setSecteur}
                      placeholder="Sélectionnez votre secteur"
                      className="h-14 text-lg border-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="departement" className="text-base font-semibold text-[#1F2937] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Département
                    </Label>
                    <Select value={departement} onValueChange={setDepartement}>
                      <SelectTrigger className="h-14 text-lg border-2">
                        <SelectValue placeholder="Sélectionnez votre département" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        <DepartementsSelect />
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleEstimation}
                    disabled={isLoading}
                    className="w-full h-16 text-lg font-bold bg-[#FF6B35] hover:bg-[#FF5722] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        Obtenir Mon Estimation Gratuite
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    🔒 Vos données sont 100% sécurisées et confidentielles
                  </p>
                </div>
              </Card>

              <EstimationDialog 
                open={showDialog}
                onOpenChange={setShowDialog}
                estimation={estimation}
                isLoading={isLoading}
                formData={{ ca, secteur, departement }}
              />
            </div>
          </div>
        </section>


        {/* Pourquoi Estimer Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
                Pourquoi estimer votre entreprise ?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connaître la valeur de votre entreprise est essentiel pour prendre les bonnes décisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-[#FF6B35]/20 rounded-2xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8854] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-4">Valorisation Réaliste</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Obtenez une estimation basée sur les multiples réels du marché BTP, adaptée à votre secteur et votre région.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-[#FF6B35]/20 rounded-2xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8854] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-4">Accompagnement Expert</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nos experts en transmission d'entreprises BTP vous accompagnent pour affiner votre estimation.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-[#FF6B35]/20 rounded-2xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FF8854] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-4">Gratuit & Rapide</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Résultat immédiat par IA, sans engagement ni frais cachés. Profitez de notre expertise gratuitement.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Comment ça marche Section */}
        <section className="py-20 bg-[#F8F9FA]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                3 étapes simples pour obtenir votre estimation professionnelle
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FFA573] transform -translate-y-1/2 z-0" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                  {/* Étape 1 */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8854] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                      1
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-[#1F2937] mb-3">Remplissez le formulaire</h3>
                      <p className="text-muted-foreground">
                        Indiquez votre CA, secteur et département en moins de 30 secondes
                      </p>
                    </div>
                  </div>

                  {/* Étape 2 */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8854] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                      2
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-[#1F2937] mb-3">IA analyse instantanément</h3>
                      <p className="text-muted-foreground">
                        Notre algorithme calcule une fourchette réaliste basée sur votre secteur
                      </p>
                    </div>
                  </div>

                  {/* Étape 3 */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FF8854] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                      3
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-[#1F2937] mb-3">Recevez votre rapport</h3>
                      <p className="text-muted-foreground">
                        Obtenez un rapport détaillé avec recommandations personnalisées
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-xl text-muted-foreground">
                  Tout ce que vous devez savoir sur l'estimation
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border-2 rounded-2xl px-6 bg-[#F8F9FA]">
                  <AccordionTrigger className="text-lg font-semibold text-[#1F2937] hover:text-[#FF6B35]">
                    L'estimation est-elle vraiment gratuite ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    Oui, l'estimation est 100% gratuite et sans engagement. Vous recevez immédiatement une fourchette de valorisation basée sur votre secteur d'activité.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-2 rounded-2xl px-6 bg-[#F8F9FA]">
                  <AccordionTrigger className="text-lg font-semibold text-[#1F2937] hover:text-[#FF6B35]">
                    Comment est calculée l'estimation ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    Notre IA utilise des multiples de valorisation spécifiques au BTP (entre 0,3x et 1,2x le CA) selon votre secteur, taille d'entreprise et région.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-2 rounded-2xl px-6 bg-[#F8F9FA]">
                  <AccordionTrigger className="text-lg font-semibold text-[#1F2937] hover:text-[#FF6B35]">
                    Mes données sont-elles confidentielles ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    Absolument. Toutes vos informations sont sécurisées et confidentielles. Nous ne partageons jamais vos données avec des tiers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-2 rounded-2xl px-6 bg-[#F8F9FA]">
                  <AccordionTrigger className="text-lg font-semibold text-[#1F2937] hover:text-[#FF6B35]">
                    Puis-je affiner l'estimation avec un expert ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    Oui, après l'estimation IA, vous pouvez demander à être recontacté par un expert en transmission d'entreprises BTP pour affiner la valorisation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-2 rounded-2xl px-6 bg-[#F8F9FA]">
                  <AccordionTrigger className="text-lg font-semibold text-[#1F2937] hover:text-[#FF6B35]">
                    Combien de temps prend l'estimation ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    L'estimation IA est instantanée (moins de 2 minutes). Vous recevez immédiatement une fourchette de prix et un rapport détaillé.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-20 bg-gradient-to-br from-[#FF6B35] via-[#FF8854] to-[#FFA573] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
          
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Prêt à connaître la valeur de votre entreprise ?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Obtenez votre estimation gratuite et confidentielle en moins de 2 minutes
              </p>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="h-16 px-12 text-lg font-bold bg-white text-[#FF6B35] hover:bg-white/90 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Commencer Mon Estimation Gratuite
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="mt-6 text-white/80">
                ✓ 100% Gratuit • ✓ Sans Engagement • ✓ Résultat Immédiat
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Estimer;
