import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import ComparisonTable from "@/components/ComparisonTable";

const Tarifs = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tarifs Transparents
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Que vous soyez vendeur ou acheteur, trouvez la formule adaptée à vos besoins
            </p>
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

        {/* Success Fee Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">💎</div>
              <h2 className="text-3xl font-bold mb-4">Success Fee 2%</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nous ne gagnons que si vous gagnez. Nos intérêts sont parfaitement alignés avec les vôtres.
              </p>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div>
                    <h3 className="font-bold text-lg mb-2">💰 Commission unique</h3>
                    <p className="text-muted-foreground">
                      Seulement 2% du prix de vente, payable uniquement lors de la signature
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">🎯 Intérêts alignés</h3>
                    <p className="text-muted-foreground">
                      Plus votre entreprise se vend cher, plus nous sommes satisfaits
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">✅ Sans risque</h3>
                    <p className="text-muted-foreground">
                      Pas de vente = pas de commission. Simple et transparent
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tarifs;
