import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, Users, FileCheck, Wrench, Zap, Home, Droplet, Palette, TreeDeciduous } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import { BTPMetiersSelect } from "@/data/btp-metiers";

const Acheter = () => {
  const navigate = useNavigate();

  const secteurs = [
    { name: "Plomberie", icon: Droplet, count: 12 },
    { name: "Électricité", icon: Zap, count: 8 },
    { name: "Maçonnerie", icon: Home, count: 15 },
    { name: "Chauffage & Clim", icon: Wrench, count: 6 },
    { name: "Couverture", icon: Home, count: 5 },
    { name: "Peinture", icon: Palette, count: 7 },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero with Advanced Search */}
        <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                Trouvez l'Entreprise BTP de Vos Rêves
              </h1>
              <p className="text-xl mb-12 text-center text-white/90">
                2000+ repreneurs actifs • Entreprises vérifiées • Accompagnement complet
              </p>

              {/* Advanced Search Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Recherche Avancée</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Select>
                    <SelectTrigger className="text-foreground">
                      <SelectValue placeholder="Secteur d'activité" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px] overflow-y-auto">
                      <BTPMetiersSelect />
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="text-foreground">
                      <SelectValue placeholder="Région" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les régions</SelectItem>
                      <SelectItem value="idf">Île-de-France</SelectItem>
                      <SelectItem value="ara">Auvergne-Rhône-Alpes</SelectItem>
                      <SelectItem value="occ">Occitanie</SelectItem>
                      <SelectItem value="paca">PACA</SelectItem>
                      <SelectItem value="na">Nouvelle-Aquitaine</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input 
                    type="number" 
                    placeholder="CA minimum (€)" 
                    className="text-foreground"
                  />

                  <Input 
                    type="number" 
                    placeholder="CA maximum (€)" 
                    className="text-foreground"
                  />

                  <Input 
                    type="number" 
                    placeholder="Effectif minimum" 
                    className="text-foreground"
                  />

                  <Input 
                    type="number" 
                    placeholder="Prix maximum (€)" 
                    className="text-foreground"
                  />
                </div>
                <Button 
                  onClick={() => navigate("/entreprises")}
                  className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher les entreprises disponibles
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Secteurs BTP Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explorez par Secteur</h2>
              <p className="text-xl text-muted-foreground">
                Des opportunités dans tous les métiers du BTP
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {secteurs.map((secteur) => (
                <button
                  key={secteur.name}
                  onClick={() => navigate("/entreprises")}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <secteur.icon className="h-12 w-12 text-primary mb-4 group-hover:text-secondary transition-colors" />
                  <h3 className="text-xl font-bold mb-2">{secteur.name}</h3>
                  <p className="text-muted-foreground">
                    {secteur.count} entreprise{secteur.count > 1 ? 's' : ''} disponible{secteur.count > 1 ? 's' : ''}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Garanties */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Achetez en Toute Confiance</h2>
              <p className="text-xl text-muted-foreground">
                Nos garanties pour sécuriser votre reprise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <Shield className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Data Room Sécurisée RGPD</h3>
                <p className="text-muted-foreground">
                  Tous les documents financiers et juridiques accessibles dans un espace crypté et conforme RGPD
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <FileCheck className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Entreprises Vérifiées</h3>
                <p className="text-muted-foreground">
                  Chaque annonce est contrôlée par nos experts : bilans, K-bis, conformité fiscale et sociale
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <Users className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Support Acheteur Dédié</h3>
                <p className="text-muted-foreground">
                  Un expert vous accompagne : analyse financière, due diligence, négociation, montage juridique
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Acheteur */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Votre Parcours de Reprise</h2>
              <p className="text-xl text-muted-foreground">
                De la recherche au closing en 4 étapes simples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Recherchez</h3>
                <p className="text-muted-foreground">
                  Filtrez par secteur, région, CA, prix. Configurez vos alertes personnalisées.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Analysez</h3>
                <p className="text-muted-foreground">
                  Accédez aux bilans, ratios, historique CA. Posez vos questions directement.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Négociez</h3>
                <p className="text-muted-foreground">
                  Faites votre offre. Nos experts vous aident à obtenir les meilleures conditions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2">Reprenez</h3>
                <p className="text-muted-foreground">
                  Signez en toute sécurité. Accompagnement post-acquisition inclus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trouvez Votre Prochaine Entreprise Aujourd'hui
            </h2>
            <p className="text-xl mb-8 text-white/90">
              18 entreprises BTP disponibles • Nouvelles annonces chaque semaine
            </p>
            <Button 
              onClick={() => navigate("/entreprises")}
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-xl py-6 px-12"
            >
              Voir toutes les annonces
            </Button>
            <p className="mt-6 text-white/80">
              ✅ Inscription gratuite • 🔍 Recherche illimitée • 💬 Support dédié
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Acheter;
