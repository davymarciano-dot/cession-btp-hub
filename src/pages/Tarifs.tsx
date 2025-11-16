import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import ComparisonTable from "@/components/ComparisonTable";

const Tarifs = () => {
  const [hoveredBuyerCard, setHoveredBuyerCard] = useState<string | null>(null);
  const [hoveredSellerCard, setHoveredSellerCard] = useState<string | null>(null);

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
              <h2 className="text-3xl font-bold mb-4">Abonnements acheteurs</h2>
              <p className="text-xl text-muted-foreground mb-2">
                Accédez aux meilleures opportunités d'acquisition BTP
              </p>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                ✅ Consultation et demandes de contact 100% GRATUITES
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <PricingCard
                title="Gratuit"
                price="0€"
                description="Consultation illimitée - Demandes de contact gratuites"
                features={[
                  "✅ Consultation ILLIMITÉE des annonces",
                  "✅ Demandes de contact GRATUITES",
                  "✅ Recherche avancée",
                  "✅ Alertes email",
                  "❌ Dossier complet entreprise",
                  "❌ Coordonnées directes vendeur"
                ]}
                buttonText="S'inscrire gratuitement"
                userType="acheteur"
                isHovered={hoveredBuyerCard === "Gratuit"}
                onHover={(hovered) => setHoveredBuyerCard(hovered ? "Gratuit" : null)}
                anyCardHovered={hoveredBuyerCard !== null}
              />
              
              <PricingCard
                title="Dossier"
                price="49€"
                period="/dossier"
                description="Accès complet à UN dossier d'entreprise"
                features={[
                  "Dossier complet 1 entreprise",
                  "Bilan financier détaillé",
                  "Coordonnées vendeur",
                  "Documents juridiques",
                  "Accompagnement par email",
                  "Valable 30 jours"
                ]}
                buttonText="Acheter un dossier"
                userType="acheteur"
                isHovered={hoveredBuyerCard === "Dossier"}
                onHover={(hovered) => setHoveredBuyerCard(hovered ? "Dossier" : null)}
                anyCardHovered={hoveredBuyerCard !== null}
                isPopular
              />
              
              <PricingCard
                title="Pro"
                price="99€"
                period="/mois"
                description="Accès illimité aux dossiers complets"
                features={[
                  "Dossiers complets ILLIMITÉS",
                  "Coordonnées de TOUS les vendeurs",
                  "Alertes en temps réel",
                  "Badge 'Acheteur Vérifié'",
                  "Support prioritaire",
                  "Espace dédié"
                ]}
                buttonText="Choisir Pro"
                variant="primary"
                userType="acheteur"
                isHovered={hoveredBuyerCard === "Pro"}
                onHover={(hovered) => setHoveredBuyerCard(hovered ? "Pro" : null)}
                anyCardHovered={hoveredBuyerCard !== null}
                badgeText="🔥 MEILLEUR RAPPORT"
                badgeColor="bg-gradient-to-r from-orange-500 to-red-500"
                badgeAnimate
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
                userType="acheteur"
                isHovered={hoveredBuyerCard === "Entreprise"}
                onHover={(hovered) => setHoveredBuyerCard(hovered ? "Entreprise" : null)}
                anyCardHovered={hoveredBuyerCard !== null}
                badgeText="👑 PREMIUM"
                badgeColor="bg-gradient-to-r from-purple-600 to-amber-500"
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
              <p className="text-xl text-muted-foreground mb-2">
                Vendez votre entreprise en toute sécurité
              </p>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                ✅ Publication GRATUITE • Commission 2% uniquement à la vente
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <PricingCard
                title="Découverte"
                price="Gratuit"
                period="Publication gratuite"
                description="Publiez votre annonce sans frais initiaux"
                features={[
                  "✅ Publication GRATUITE",
                  "✅ Demandes de contact illimitées",
                  "✅ Anonymat garanti",
                  "✅ Mise en relation sécurisée",
                  "❌ Pas de mise en avant",
                  "💰 Commission 2% uniquement à la vente"
                ]}
                buttonText="Publier gratuitement"
                userType="vendeur"
                isHovered={hoveredSellerCard === "Découverte"}
                onHover={(hovered) => setHoveredSellerCard(hovered ? "Découverte" : null)}
                anyCardHovered={hoveredSellerCard !== null}
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
                variant="primary"
                userType="vendeur"
                isHovered={hoveredSellerCard === "Essentiel"}
                onHover={(hovered) => setHoveredSellerCard(hovered ? "Essentiel" : null)}
                anyCardHovered={hoveredSellerCard !== null}
                isPopular
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
                userType="vendeur"
                isHovered={hoveredSellerCard === "Prime"}
                onHover={(hovered) => setHoveredSellerCard(hovered ? "Prime" : null)}
                anyCardHovered={hoveredSellerCard !== null}
                badgeText="⭐ MEILLEUR CHOIX"
                badgeColor="bg-gradient-to-r from-orange-500 to-orange-600"
                badgeAnimate
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
                userType="vendeur"
                isHovered={hoveredSellerCard === "Exclusif"}
                onHover={(hovered) => setHoveredSellerCard(hovered ? "Exclusif" : null)}
                anyCardHovered={hoveredSellerCard !== null}
                badgeText="👑 PREMIUM"
                badgeColor="bg-gradient-to-r from-purple-600 to-amber-500"
              />
            </div>
          </div>
        </section>

        {/* Success Fee Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="text-6xl mb-6">💎</div>
                <h2 className="text-4xl font-bold mb-4">Commission Success Fee : 2%</h2>
                <p className="text-xl text-muted-foreground">
                  Nous gagnons uniquement quand vous gagnez. Vos intérêts sont nos intérêts.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-primary">👨‍💼 Pour les vendeurs</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold">Publication 100% gratuite</p>
                        <p className="text-sm text-muted-foreground">Aucun frais initial, publiez sans risque</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold">Commission uniquement à la vente</p>
                        <p className="text-sm text-muted-foreground">2% du prix de vente final, payable à la signature</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold">Pas de vente = 0€ à payer</p>
                        <p className="text-sm text-muted-foreground">Aucun engagement, aucun risque financier</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-primary">🔍 Pour les acheteurs</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold">Consultation gratuite illimitée</p>
                        <p className="text-sm text-muted-foreground">Parcourez toutes les annonces sans frais</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-semibold">Demandes de contact gratuites</p>
                        <p className="text-sm text-muted-foreground">Contactez autant de vendeurs que vous voulez</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <p className="font-semibold">Dossiers complets payants</p>
                        <p className="text-sm text-muted-foreground">49€/dossier ou 99€/mois pour accès illimité</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Exemple concret de commission
                </h4>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary mb-2">250 000€</p>
                    <p className="text-sm text-muted-foreground">Prix de vente</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl">→</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-600 mb-2">5 000€</p>
                    <p className="text-sm text-muted-foreground">Commission CessionBTP (2%)</p>
                  </div>
                </div>
                <p className="text-center mt-6 text-sm text-muted-foreground">
                  💡 Plus votre entreprise se vend cher, plus vous êtes gagnant. Nos intérêts sont parfaitement alignés !
                </p>
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
