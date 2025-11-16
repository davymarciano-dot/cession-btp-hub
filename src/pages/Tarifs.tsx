import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Tarifs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEOHead page="pricing" />
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
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Gratuit</h3>
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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors">
                S'inscrire gratuitement
              </Button>
            </div>

            {/* CONTACT - POPULAIRE */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">

              <h3 className="text-2xl font-bold text-green-600 mb-2">Contact</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-green-600">49€</span>
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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors">
                Acheter des contacts
              </Button>
            </div>

            {/* PRO - 🔥 MEILLEUR RAPPORT */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">

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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors">
                Choisir Pro
              </Button>
            </div>

            {/* ENTREPRISE - 👑 PREMIUM */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 transition-colors">
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
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 group-hover:bg-blue-500 transition-colors">
                Commencer gratuitement
              </Button>
            </div>

            {/* ESSENTIEL - POPULAIRE */}
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 group-hover:bg-blue-500 transition-colors">
                Choisir Essentiel
              </Button>
            </div>

            {/* PRIME - ⭐ MEILLEUR CHOIX */}
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 group-hover:bg-blue-500 transition-colors">
                Choisir Premium
              </Button>
            </div>

            {/* EXCLUSIF - 👑 PREMIUM */}
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
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

              <Button className="w-full bg-orange-500 hover:bg-blue-500 group-hover:bg-blue-500 transition-colors">
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
