import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EntrepriseCard from "@/components/EntrepriseCard";
import StatCounter from "@/components/StatCounter";
import PricingCard from "@/components/PricingCard";
import ComparisonTable from "@/components/ComparisonTable";
import SuccessFeeSection from "@/components/SuccessFeeSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialSection from "@/components/TestimonialSection";
import NewsletterSection from "@/components/NewsletterSection";
import SecurityBadges from "@/components/SecurityBadges";

const Index = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ repreneurs: 0, experience: 0, specialisation: 0 });

  useEffect(() => {
    const targetStats = { repreneurs: 500, experience: 15, specialisation: 100 };
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        repreneurs: Math.floor(targetStats.repreneurs * progress),
        experience: Math.floor(targetStats.experience * progress),
        specialisation: Math.floor(targetStats.specialisation * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-red-500 text-white mb-6 text-sm px-4 py-2">
                🔴 LIVE - Entreprise d'Électricité vendue pour €1.2M à Nice (06) Il y a 6h
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Cédez ou Reprenez une Entreprise BTP en 45 Jours
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Matching IA • 500+ Transactions • 95% Satisfaction • Success Fee 2%
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/vendre")}
                  className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8"
                >
                  Vendre mon entreprise
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => navigate("/acheter")}
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8"
                >
                  Trouver une entreprise
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Résultat en 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>100% confidentiel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Sans engagement</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="container mx-auto px-4 -mt-16 relative z-10 mb-20">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'entreprise" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  <SelectItem value="plomberie">Plomberie</SelectItem>
                  <SelectItem value="electricite">Électricité</SelectItem>
                  <SelectItem value="maconnerie">Maçonnerie</SelectItem>
                  <SelectItem value="chauffage">Chauffage & Climatisation</SelectItem>
                  <SelectItem value="couverture">Couverture-Zinguerie</SelectItem>
                  <SelectItem value="peinture">Peinture & Revêtements</SelectItem>
                  <SelectItem value="menuiserie-bois">Menuiserie Bois</SelectItem>
                  <SelectItem value="menuiserie-alu">Menuiserie Aluminium/PVC</SelectItem>
                  <SelectItem value="isolation">Isolation Thermique</SelectItem>
                  <SelectItem value="charpente">Charpente</SelectItem>
                  <SelectItem value="carrelage">Carrelage</SelectItem>
                  <SelectItem value="platerie">Plâtrerie & Cloisons sèches</SelectItem>
                  <SelectItem value="facade">Façadier</SelectItem>
                  <SelectItem value="etancheite">Étanchéité</SelectItem>
                  <SelectItem value="terrassement">Terrassement & VRD</SelectItem>
                  <SelectItem value="genie-civil">Génie Civil</SelectItem>
                  <SelectItem value="demolition">Démolition</SelectItem>
                  <SelectItem value="echafaudage">Échafaudage</SelectItem>
                  <SelectItem value="nettoyage">Nettoyage de Chantier</SelectItem>
                  <SelectItem value="metallerie">Métallerie & Serrurerie</SelectItem>
                  <SelectItem value="parquets">Parquets</SelectItem>
                  <SelectItem value="paysagisme">Espaces Verts & Paysagisme</SelectItem>
                  <SelectItem value="assainissement">Assainissement</SelectItem>
                  <SelectItem value="climatisation">Climatisation</SelectItem>
                  <SelectItem value="pompes-chaleur">Pompes à Chaleur</SelectItem>
                  <SelectItem value="photovoltaique">Panneaux Solaires / Photovoltaïque</SelectItem>
                  <SelectItem value="amenagement">Aménagement Intérieur</SelectItem>
                  <SelectItem value="renovation-energetique">Rénovation Énergétique</SelectItem>
                  <SelectItem value="ascenseurs">Ascenseurs & Monte-charges</SelectItem>
                  <SelectItem value="egb">Entreprise Générale du Bâtiment</SelectItem>
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

        {/* Featured Companies */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Opportunités à Saisir</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <EntrepriseCard
                type="orange"
                certification="CERTIFIÉE RGE"
                status="vendu"
                title="Société d'Isolation Thermique"
                location="Lyon, Rhône (69)"
                creation="2020"
                ca="542K€"
                effectif="8 salariés"
                secteur="Isolation et ITE"
              />

              <EntrepriseCard
                type="orange"
                certification="RGE QUALIPAC"
                status="vendu"
                title="Entreprise Chauffage & Climatisation"
                location="Toulouse, Haute-Garonne (31)"
                creation="2018"
                ca="890K€"
                effectif="6 salariés"
                secteur="Pompes à chaleur"
              />

              <EntrepriseCard
                type="blue"
                certification="QUALIBAT"
                status="disponible"
                timeAgo="Il y a 5h"
                title="Entreprise Générale du Bâtiment"
                location="Nice, PACA (06)"
                creation="2005"
                ca="2,8M€"
                effectif="22 salariés"
                secteur="Tous corps d'état"
                description="Entreprise générale tous corps d'état. Marchés publics 60%, privés 40%. Certifications Qualibat."
                price="1 850 000 €"
                financement={true}
              />
            </div>

            <div className="text-center">
              <Button 
                onClick={() => navigate("/entreprises")}
                variant="outline" 
                size="lg"
              >
                Voir toutes les annonces (18+ disponibles)
              </Button>
            </div>
          </div>
        </section>

        {/* Buyer Subscriptions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-3xl font-bold mb-4">Abonnements Acheteurs</h2>
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
              <h2 className="text-3xl font-bold mb-4">Abonnements Vendeurs</h2>
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

        {/* Social Proof */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <StatCounter value={`${stats.repreneurs}+`} label="Repreneurs qualifiés actifs" />
              <StatCounter value={stats.experience} label="Ans d'Expertise BTP" />
              <StatCounter value={`${stats.specialisation}%`} label="Spécialisé BTP & ENR" />
              <StatCounter value="48H" label="Délai de Valorisation" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSection />

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
              onClick={() => navigate("/vendre")}
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

      <Footer />
    </div>
  );
};

export default Index;
