import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { TrustBadges } from "@/components/TrustBadges";
import { LiveNotification } from "@/components/LiveNotification";
import EntrepriseCard from "@/components/EntrepriseCard";
import StatCounter from "@/components/StatCounter";
import StatsSection from "@/components/StatsSection";
import PricingCard from "@/components/PricingCard";
import ComparisonTable from "@/components/ComparisonTable";
import SuccessFeeSection from "@/components/SuccessFeeSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialSectionEnhanced from "@/components/TestimonialSectionEnhanced";
import TrustBanner from "@/components/TrustBanner";
import NewsletterSection from "@/components/NewsletterSection";
import SecurityBadges from "@/components/SecurityBadges";
import { BTPMetiersSelect } from "@/data/btp-metiers";
import { analyticsEvents } from "@/lib/analytics";
import { IntelligentChatbot } from "@/components/chat/IntelligentChatbot";
import { ConversionPopup } from "@/components/ConversionPopup";
import { demoListings, platformStats } from "@/data/demo-listings";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonces = async () => {
      const { data, error } = await supabase
        .from('annonces')
        .select('*')
        .eq('statut', 'publiee')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (data) {
        setAnnonces(data);
      }
      setLoading(false);
    };

    fetchAnnonces();
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>CessionBTP | Achat Vente Entreprise BTP en 45 Jours | Success Fee 2%</title>
        <meta name="description" content="Plateforme n°1 de cession d'entreprises BTP. Matching IA, 2000+ repreneurs qualifiés, success fee uniquement 2%. Estimation gratuite en 48h." />
      </Helmet>
      <Header />

      <main>
        {/* Optimized Hero Section */}
        <HeroSection />
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* Live Notifications */}
        <LiveNotification />

        {/* Search Bar */}
        <section className="container mx-auto px-4 -mt-16 relative z-10 mb-12">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'entreprise" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px] overflow-y-auto">
                  <BTPMetiersSelect />
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idf">Île-de-France</SelectItem>
                  <SelectItem value="ara">Auvergne-Rhône-Alpes</SelectItem>
                  <SelectItem value="na">Nouvelle-Aquitaine</SelectItem>
                  <SelectItem value="occ">Occitanie</SelectItem>
                  <SelectItem value="paca">Provence-Alpes-Côte d'Azur</SelectItem>
                  <SelectItem value="ge">Grand Est</SelectItem>
                  <SelectItem value="hdf">Hauts-de-France</SelectItem>
                  <SelectItem value="nor">Normandie</SelectItem>
                  <SelectItem value="bre">Bretagne</SelectItem>
                  <SelectItem value="pdl">Pays de la Loire</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={() => navigate("/entreprises")}
                className="bg-secondary hover:bg-secondary/90 text-white"
              >
                Rechercher
              </Button>
            </div>
          </div>
        </section>

        {/* Section Statistiques */}
        <StatsSection />

        {/* Bannière de confiance */}
        <TrustBanner />

        {/* Featured Companies */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Opportunités à Saisir</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez les dernières entreprises BTP disponibles à la reprise
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {loading ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">Chargement des annonces...</p>
                </div>
              ) : annonces.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">Aucune annonce disponible</p>
                </div>
              ) : (
                annonces.slice(0, 3).map((annonce) => (
                  <EntrepriseCard
                    key={annonce.id}
                    type="blue"
                    certification="QUALIBAT"
                    status="disponible"
                    timeAgo="Récent"
                    title={annonce.raison_sociale || `Entreprise ${annonce.secteur_activite}`}
                    location={`${annonce.ville} (${annonce.departement})`}
                    creation={annonce.annee_creation.toString()}
                    ca={`${(annonce.ca_n1 / 1000).toFixed(0)}K€`}
                    effectif={`${annonce.nombre_salaries} salariés`}
                    secteur={annonce.secteur_activite}
                    description={annonce.description_activite}
                    price={`${(annonce.prix_vente / 1000).toFixed(0)}K€`}
                    financement={true}
                  />
                ))
              )}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => navigate("/entreprises")}
                variant="outline" 
                size="lg"
              >
                Voir toutes les annonces ({annonces.length} disponibles)
              </Button>
            </div>
          </div>
        </section>

        {/* Buyer Subscriptions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-3xl font-bold mb-4">Abonnements acheteurs</h2>
              <p className="text-xl text-muted-foreground">
                Accédez aux meilleures opportunités d'acquisition BTP
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <PricingCard
                title="Gratuit"
                price="0€"
                description="Consultation - Cible : 50 000€ - CA : 0"
                features={[
                  "Consultation des annonces",
                  "Recherche basique",
                  "Interface acheteur",
                  "Inscription gratuite"
                ]}
                buttonText="S'inscrire gratuitement"
              />
              
              <PricingCard
                title="Contact"
                price="49€"
                period="/5 contacts"
                description="Messages directs - Cible : 10 000€ - CA : 2,5M"
                features={[
                  "5 contacts directs",
                  "Messages dirigés vers vendeurs",
                  "Coordonnées complètes",
                  "Historique des échanges",
                  "Accès prioritaire"
                ]}
                buttonText="Acheter des contacts"
              />
              
              <PricingCard
                title="Pro"
                price="99€"
                period="/mois"
                description="Illimité + alertes - Cible : 5 000€ - CA : 6M"
                features={[
                  "Contacts ILLIMITÉS",
                  "Alertes personnalisées",
                  "Coordonnées complètes",
                  "Badge 'Acheteur Vérifié'",
                  "Support prioritaire"
                ]}
                buttonText="Choisir Pro"
                isPopular
                variant="primary"
              />
              
              <PricingCard
                title="Entreprise"
                price="299€"
                period="/mois"
                description="Multi-utilisateurs + API - Cible : 500€ - CA : 1,8M"
                features={[
                  "Accès multi-utilisateurs",
                  "API d'intégration",
                  "Rapports avancés",
                  "Gestionnaire dédié",
                  "Formation équipe"
                ]}
                buttonText="Choisir Entreprise"
              />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Seller Subscriptions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🏗️</div>
              <h2 className="text-3xl font-bold mb-4">Abonnements vendeurs</h2>
              <p className="text-xl text-muted-foreground">
                Choisissez la formule adaptée à vos besoins de transmission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <PricingCard
                title="Découverte"
                price="Gratuit"
                period="30j"
                description="Évaluation + 10 vues - Cible : 10 000€ - CA : 0"
                features={[
                  "Évaluation incluse",
                  "10 vues d'annonce",
                  "Interface spécialisée BTP",
                  "Expert en soutien métier"
                ]}
                buttonText="Commencer gratuitement"
              />
              
              <PricingCard
                title="Essentiel"
                price="290€"
                period="/3 mois"
                description="Annonce simple - Cible : 5 000€ - CA : 5,9M"
                features={[
                  "Annonce simple optimisée",
                  "Contacts qualifiés BTP",
                  "Interface professionnelle",
                  "Expert en soutien",
                  "Réseau artisans entrepreneurs"
                ]}
                buttonText="Choisir Essentiel"
                isPopular
                variant="primary"
              />
              
              <PricingCard
                title="Prime"
                price="490€"
                period="/3 mois"
                description="Mise en avant + stats - Cible : 2 000€ - CA : 3,9M"
                features={[
                  "Mise en avant prioritaire",
                  "Statistiques détaillées",
                  "Valorisation BTP incluse",
                  "Accompagnement expert dédié",
                  "Vendez 2x plus vite"
                ]}
                buttonText="Choisir Premium"
              />
              
              <PricingCard
                title="Exclusif"
                price="990€"
                period="/3 mois"
                description="Top position + agent - Cible : 500€ - CA : 2M"
                features={[
                  "Position top garantie",
                  "Agent dédié personnel",
                  "Mémorandum professionnel",
                  "Garantie mise en relation",
                  "Conciergerie complète"
                ]}
                buttonText="Choisir Exclusif"
              />
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Pourquoi Choisir CessionBTP</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              La plateforme la plus complète pour vendre ou acheter une entreprise BTP
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3">Valorisation Experte</h3>
                <p className="text-muted-foreground">
                  Évaluation précise par des experts BTP. Méthode éprouvée sur 500+ transactions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-3">Matching IA 95%</h3>
                <p className="text-muted-foreground">
                  Notre algorithme connecte vendeurs et acheteurs avec 95% de compatibilité.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3">100% Confidentiel</h3>
                <p className="text-muted-foreground">
                  Anonymat garanti. Data room sécurisée. NDA systématique.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-3">Success Fee 2%</h3>
                <p className="text-muted-foreground">
                  Vous ne payez qu'en cas de succès. Nos intérêts sont alignés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Fee Section */}
        <SuccessFeeSection />

        {/* Process Timeline */}
        <ProcessTimeline />

        {/* Social Proof - Real Platform Stats */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatCounter 
                value={platformStats.totalListings} 
                label="Entreprises disponibles" 
              />
              <StatCounter 
                value={platformStats.successfulSales} 
                label="Ventes réussies" 
              />
              <StatCounter 
                value={platformStats.activeRepreners} 
                label="Repreneurs actifs" 
              />
              <StatCounter 
                value={platformStats.avgTime} 
                label="Délai moyen de vente" 
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSectionEnhanced />

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prêt à vendre votre entreprise BTP ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Estimation gratuite • Accompagnement expert • Résultats garantis
            </p>
            <Button 
              onClick={() => {
                analyticsEvents.clickEstimateButton();
                navigate("/vendre");
              }}
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:shadow-2xl text-xl py-6 px-12"
            >
              💰 COMMENCER MON ESTIMATION
            </Button>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      <SecurityBadges />
      
      {/* Chatbot IA 24/7 */}
      <IntelligentChatbot />
      
      {/* Conversion Popup - Shows after 30s */}
      <ConversionPopup />

      <Footer />
    </div>
  );
};

export default Index;
