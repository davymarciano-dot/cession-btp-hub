import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Tarifs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEOHead page="tarifs" />
      <Header />

      {/* SECTION ACHETEURS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💼 Pour les acheteurs
            </div>
            <h1 className="text-5xl font-black mb-4">Abonnements acheteurs</h1>
            <p className="text-xl text-slate-600">
              Accédez aux meilleures opportunités d'acquisition BTP
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* GRATUIT */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-white relative">
              {/* Pas de badge */}
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Gratuit</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">0€</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Consultation - Cible : 50 000€ - CA : 0
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Consultation des annonces</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Recherche basique</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Interface acheteur</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Inscription gratuite</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors duration-300">
                S'inscrire gratuitement
              </Button>
            </div>

            {/* CONTACT - POPULAIRE */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  POPULAIRE
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-700 mb-2">Contact</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">49€</span>
                <span className="text-slate-500"> /5 contacts</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Messages directs - Cible : 10 000€ - CA : 2,5M
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">5 contacts directs</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Messages dirigés vers vendeurs</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Coordonnées complètes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Historique des échanges</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Accès prioritaire</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors duration-300">
                Acheter des contacts
              </Button>
            </div>

            {/* PRO - 🔥 MEILLEUR RAPPORT */}
            <div className="h-full flex flex-col border-2 border-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-blue-50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  🔥 MEILLEUR RAPPORT
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">99€</span>
                <span className="text-slate-600"> /mois</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Illimité + alertes - Cible : 5 000€ - CA : 6M
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-semibold">Contacts ILLIMITÉS</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Alertes personnalisées</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Coordonnées complètes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Badge 'Acheteur Vérifié'</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Support prioritaire</span>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
                Choisir Pro
              </Button>
            </div>

            {/* ENTREPRISE - 👑 PREMIUM */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  👑 PREMIUM
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-700 mb-2">Entreprise</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">299€</span>
                <span className="text-slate-500"> /mois</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Multi-utilisateurs + API - Cible : 500€ - CA : 1,8M
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Accès multi-utilisateurs</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">API d'intégration</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Rapports avancés</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Gestionnaire dédié</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Formation équipe</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors duration-300">
                Choisir Entreprise
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION VENDEURS */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🏗️ Pour les vendeurs
            </div>
            <h2 className="text-5xl font-black mb-4">Abonnements vendeurs</h2>
            <p className="text-xl text-slate-600">
              Choisissez la formule adaptée à vos besoins de transmission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* DÉCOUVERTE */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-white relative">
              {/* Pas de badge */}
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Découverte</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">Gratuit</span>
                <span className="text-slate-500 text-lg"> 30j</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Évaluation + 10 vues - Cible : 10 000€ - CA : 0
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Évaluation incluse</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">10 vues d'annonce</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Interface spécialisée BTP</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Expert en soutien métier</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors duration-300">
                Commencer gratuitement
              </Button>
            </div>

            {/* ESSENTIEL - POPULAIRE */}
            <div className="h-full flex flex-col border-2 border-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-blue-50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  POPULAIRE
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">Essentiel</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">290€</span>
                <span className="text-slate-600"> /3 mois</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Annonce simple - Cible : 5 000€ - CA : 5,9M
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Annonce simple optimisée</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Contacts qualifiés BTP</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Interface professionnelle</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Expert en soutien</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Réseau artisans entrepreneurs</span>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
                Choisir Essentiel
              </Button>
            </div>

            {/* PRIME - ⭐ MEILLEUR CHOIX */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  ⭐ MEILLEUR CHOIX
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-700 mb-2">Prime</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-orange-600">490€</span>
                <span className="text-slate-500"> /3 mois</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Mise en avant + stats - Cible : 2 000€ - CA : 3,9M
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Mise en avant prioritaire</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Statistiques détaillées</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Valorisation BTP incluse</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Accompagnement expert dédié</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Vendez 2x plus vite</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors duration-300">
                Choisir Premium
              </Button>
            </div>

            {/* EXCLUSIF - 👑 PREMIUM */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  👑 PREMIUM
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-700 mb-2">Exclusif</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-orange-600">990€</span>
                <span className="text-slate-500"> /3 mois</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Top position + agent - Cible : 500€ - CA : 2M
              </p>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Position top garantie</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Agent dédié personnel</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Mémorandum professionnel</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Garantie mise en relation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Conciergerie complète</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors duration-300">
                Choisir Exclusif
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tarifs;
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
