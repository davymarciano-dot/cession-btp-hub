import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, Shield, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DepartementsSelect } from "@/data/departements";
import EstimationDialog from "@/components/EstimationDialog";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import SiretAutocomplete from "@/components/SiretAutocomplete";

// Secteurs BTP les plus courants
const secteursBTP = [
  { value: "electricien", label: "Électricien" },
  { value: "plombier", label: "Plombier" },
  { value: "plombier-chauffagiste", label: "Plombier-chauffagiste" },
  { value: "chauffagiste", label: "Chauffagiste" },
  { value: "climatisation", label: "Climatisation" },
  { value: "macon", label: "Maçon" },
  { value: "menuisier", label: "Menuisier" },
  { value: "couvreur", label: "Couvreur" },
  { value: "peintre", label: "Peintre en bâtiment" },
  { value: "platrier", label: "Plâtrier" },
  { value: "carreleur", label: "Carreleur" },
  { value: "terrassier", label: "Terrassier" },
  { value: "panneaux-solaires", label: "Panneaux solaires / Photovoltaïque" },
  { value: "pompe-chaleur", label: "Pompe à chaleur" },
  { value: "isolation", label: "Isolation thermique" },
  { value: "autre", label: "Autre secteur BTP" },
];

const Estimer = () => {
  const [siret, setSiret] = useState("");
  const [raisonSociale, setRaisonSociale] = useState("");
  const [ca, setCa] = useState("");
  const [secteur, setSecteur] = useState("");
  const [departement, setDepartement] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [estimation, setEstimation] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  // Callback quand le SIRET est validé et les données récupérées
  const handleSiretDataFetched = (data: any) => {
    if (data.siret) {
      setSiret(data.siret);
    }
    if (data.raisonSociale) {
      setRaisonSociale(data.raisonSociale);
    }
    if (data.secteurActivite) {
      // Mapper le secteur récupéré vers nos valeurs
      const secteurLower = data.secteurActivite.toLowerCase();
      if (secteurLower.includes('électri')) setSecteur('electricien');
      else if (secteurLower.includes('plomb')) setSecteur('plombier');
      else if (secteurLower.includes('maçon')) setSecteur('macon');
      else if (secteurLower.includes('menuisi')) setSecteur('menuisier');
      else if (secteurLower.includes('couvr')) setSecteur('couvreur');
      else if (secteurLower.includes('peintr')) setSecteur('peintre');
      else if (secteurLower.includes('chauffage')) setSecteur('chauffagiste');
      else setSecteur('autre');
    }
    if (data.departement) {
      setDepartement(data.departement);
    }
  };

  const handleEstimation = async () => {
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
      departement,
      siret: siret || undefined,
      raisonSociale: raisonSociale || undefined,
    };

    setEstimation(estimationData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEOHead page="estimer" />
      <Header />

      <main>
        {/* HERO MODERNE */}
        <section className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500 text-white py-32 overflow-hidden">
          {/* Effet de fond */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMTBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Icône */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-2xl">
                <Calculator className="w-12 h-12 text-white" />
              </div>

              {/* Titre */}
              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                Estimez la valeur de votre entreprise BTP
              </h1>

              {/* Sous-titre */}
              <p className="text-2xl mb-4 text-white/95 font-light">
                Estimation gratuite par IA • Valorisation détaillée • 100% confidentiel
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Résultat en 2 minutes</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% confidentiel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vague en bas */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* FORMULAIRE MODERNE */}
        <section className="py-16 -mt-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Estimation Gratuite</h2>
                    <p className="text-slate-600">Remplissez les informations ci-dessous</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* SIRET - EN PREMIER */}
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl border-2 border-orange-200">
                    <label className="block text-sm font-bold text-orange-600 mb-3">
                      🏢 SIRET de votre entreprise (recommandé)
                    </label>
                    <SiretAutocomplete onDataFetched={handleSiretDataFetched} />
                    <p className="text-xs text-slate-600 mt-2">
                      💡 Remplissage automatique des informations de votre entreprise
                    </p>
                  </div>

                  {/* Raison sociale (pré-rempli ou modifiable) */}
                  {raisonSociale && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        🏢 Raison sociale
                      </label>
                      <Input
                        type="text"
                        placeholder="Raison sociale"
                        className="h-14 text-lg border-2 border-green-200 bg-green-50 rounded-xl"
                        value={raisonSociale}
                        onChange={(e) => setRaisonSociale(e.target.value)}
                      />
                    </div>
                  )}

                  {/* CA */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      💰 Chiffre d'affaires annuel (€)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 500 000"
                      className="h-14 text-lg border-2 border-slate-200 focus:border-orange-500 rounded-xl"
                      value={ca}
                      onChange={(e) => setCa(e.target.value)}
                    />
                  </div>

                  {/* Secteur */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">🏗️ Secteur d'activité BTP</label>
                    <Select value={secteur} onValueChange={setSecteur}>
                      <SelectTrigger className="h-14 text-lg border-2 border-slate-200 focus:border-orange-500 rounded-xl">
                        <SelectValue placeholder="Sélectionnez votre secteur" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {secteursBTP.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Département */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">📍 Département</label>
                    <Select value={departement} onValueChange={setDepartement}>
                      <SelectTrigger className="h-14 text-lg border-2 border-slate-200 focus:border-orange-500 rounded-xl">
                        <SelectValue placeholder="Ex: 75 (Paris)" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        <DepartementsSelect />
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bouton */}
                  <Button
                    className="w-full h-16 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    onClick={handleEstimation}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        Calcul en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <Calculator className="w-6 h-6" />
                        Obtenir Mon Estimation Gratuite par IA
                        <ArrowRight className="w-6 h-6" />
                      </span>
                    )}
                  </Button>

                  {/* Note */}
                  <p className="text-center text-sm text-slate-500">
                    🔒 Vos données sont sécurisées et confidentielles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AVANTAGES - 3 CARDS MODERNES */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">Pourquoi Estimer Votre Entreprise ?</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Une estimation précise pour prendre les meilleures décisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Valorisation Réaliste</h3>
                <p className="text-slate-600 leading-relaxed">
                  Multiples ajustés selon votre secteur BTP (0.3x à 1.2x le CA)
                </p>
              </div>

              {/* Card 2 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Expert vous rappelle</h3>
                <p className="text-slate-600 leading-relaxed">
                  Un expert BTP vous contacte sous 24h pour affiner l'estimation
                </p>
              </div>

              {/* Card 3 */}
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Gratuit & Rapide</h3>
                <p className="text-slate-600 leading-relaxed">Résultat immédiat sans engagement ni frais cachés</p>
              </div>
            </div>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE - TIMELINE */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">Comment Ça Marche ?</h2>
              <p className="text-xl text-slate-600">3 étapes simples pour obtenir votre estimation</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Ligne verticale */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-pink-500 hidden md:block"></div>

                {/* Étapes */}
                <div className="space-y-12">
                  {/* Étape 1 */}
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      1
                    </div>
                    <div className="flex-1 bg-slate-50 p-6 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">Remplissez le formulaire</h3>
                      <p className="text-slate-600">CA annuel, secteur d'activité et département</p>
                    </div>
                  </div>

                  {/* Étape 2 */}
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      2
                    </div>
                    <div className="flex-1 bg-slate-50 p-6 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">IA calcule instantanément</h3>
                      <p className="text-slate-600">Algorithme réaliste basé sur votre secteur BTP</p>
                    </div>
                  </div>

                  {/* Étape 3 */}
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      3
                    </div>
                    <div className="flex-1 bg-slate-50 p-6 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">Recevez votre estimation</h3>
                      <p className="text-slate-600">Fourchette + expert vous rappelle sous 24h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDEwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl font-bold mb-6">Prêt à Connaître la Valeur de Votre Entreprise ?</h2>
            <p className="text-2xl mb-10 text-white/90">C'est gratuit, rapide et sans engagement</p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="lg"
              className="h-16 px-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xl font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <Calculator className="w-6 h-6 mr-3" />
              Obtenir Mon Estimation Maintenant
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </section>

        <EstimationDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          estimation={estimation}
          isLoading={isLoading}
          formData={{ ca, secteur, departement }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Estimer;
