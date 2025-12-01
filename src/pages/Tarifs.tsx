import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { UltraCompleteSchemas } from "@/components/seo/UltraCompleteSchemas";
import { AutoInternalLinks } from "@/components/seo/AutoInternalLinks";

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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* GRATUIT */}
            <div className="h-full flex flex-col border-2 border-slate-200 hover:border-blue-600 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Gratuit</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">0€</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Explorez les opportunités BTP et testez la plateforme
              </p>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Consultation illimitée des annonces</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Recherche avancée par métier/ville/CA</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Filtres détaillés (CA, effectif, prix, RGE)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Sauvegarde favoris</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Accès entreprises RGE certifiées</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Demandes de mise en relation (3/mois max)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Traitement sous 2-3 jours</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Alertes email basiques</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Note importante :</strong> Les mises en relation sont contrôlées par CessionBTP pour protéger vendeurs et garantir qualité. Pas de contact direct.
                </p>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-blue-600 transition-colors">
                S'inscrire gratuitement
              </Button>
            </div>

            {/* PREMIUM - ⭐ RECOMMANDÉ */}
            <div className="h-full flex flex-col border-2 border-blue-500 hover:border-blue-600 hover:shadow-2xl transition-all rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  ⭐ RECOMMANDÉ
                </span>
              </div>

              <h3 className="text-2xl font-bold text-blue-600 mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-blue-600">199€</span>
                <span className="text-slate-600 text-sm ml-2">paiement unique</span>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Accédez en priorité et soyez pris au sérieux par les vendeurs
              </p>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-semibold">Tout du plan Gratuit, plus :</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-semibold">Mises en relation ILLIMITÉES</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-semibold">Traitement PRIORITAIRE (24h au lieu de 3 jours)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Badge "Acheteur Vérifié" (vendeurs vous privilégient)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Accès annonces 48h AVANT public</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Matching IA personnalisé automatique</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Dossier financement pré-qualifié (qualification accélérée)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Consultation expert 30min</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Support prioritaire téléphone/email</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Statistiques marché BTP exclusives</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-900">Groupe privé acheteurs BTP</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Les vendeurs répondent 3× plus vite aux profils Premium vérifiés</strong>
                </p>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                Passer Premium - 199€
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
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-sky-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
              <h3 className="text-2xl font-bold text-sky-500 mb-2">Découverte</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-sky-500">Gratuit</span>
                <span className="text-slate-500 text-xl"> 30j</span>
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

              <Button className="w-full bg-orange-500 hover:bg-sky-500 group-hover:bg-sky-500 transition-colors">
                Commencer Gratuitement
              </Button>
            </div>

            {/* ESSENTIEL - POPULAIRE */}
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-gray-400 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  POPULAIRE
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-400 mb-2">Essentiel</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-400">290€</span>
                <span className="text-slate-600 text-xl"> /3 mois</span>
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

              <Button className="w-full bg-orange-500 hover:bg-gray-400 group-hover:bg-gray-400 transition-colors">
                Choisir Essentiel
              </Button>
            </div>

            {/* PRIME - ⭐ MEILLEUR CHOIX */}
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse whitespace-nowrap">
                  ⭐ MEILLEUR CHOIX
                </span>
              </div>

              <h3 className="text-2xl font-bold text-orange-500 mb-2">Prime</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-orange-500">490€</span>
                <span className="text-slate-500 text-xl"> /3 mois</span>
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

              <Button className="w-full bg-orange-500 hover:bg-orange-500 group-hover:bg-orange-500 transition-colors">
                Choisir Premium
              </Button>
            </div>

            {/* EXCLUSIF - 👑 PREMIUM */}
            <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-purple-600 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  👑 PREMIUM
                </span>
              </div>

              <h3 className="text-2xl font-bold text-purple-600 mb-2">Exclusif</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-purple-600">990€</span>
                <span className="text-slate-500 text-xl"> /3 mois</span>
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

              <Button className="w-full bg-orange-500 hover:bg-purple-600 group-hover:bg-purple-600 transition-colors">
                Choisir Exclusif
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Optimization */}
      <UltraCompleteSchemas page="home" />
      <AutoInternalLinks currentPage="/tarifs" maxLinks={6} />

      <Footer />
    </div>
  );
};

export default Tarifs;
