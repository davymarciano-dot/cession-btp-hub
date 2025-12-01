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
            <div>
              <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-sky-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
                <h3 className="text-2xl font-bold text-sky-500 mb-2">Découverte</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-sky-500">Gratuit</span>
                  <span className="text-slate-500 text-xl"> 60j</span>
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
            </div>

            {/* ESSENTIEL - POPULAIRE */}
            <div>
              <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-gray-400 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    POPULAIRE
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-400 mb-2">Essentiel</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-gray-400">490€</span>
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

              {/* Comparaison Essentiel */}
              <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-blue-600">Transentreprise</strong> = 250€ pour annonce seule. <strong className="text-gray-900">Nous 490€</strong> = annonce + expert BTP + valorisation + réseau acheteurs qualifiés + commission seulement si vente. <strong className="text-orange-600">240€ de différence</strong> pour un accompagnement complet qui vous fait vendre en 45j au lieu de 6 mois.
                </p>
              </div>
            </div>

            {/* PRIME - ⭐ MEILLEUR CHOIX */}
            <div>
              <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse whitespace-nowrap">
                    ⭐ MEILLEUR CHOIX
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-orange-500 mb-2">Prime</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-orange-500">990€</span>
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

              {/* Comparaison Prime */}
              <div className="mt-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-orange-600">Mise en avant prioritaire</strong> + expert dédié + photos pro = vous vendez <strong className="text-orange-600">2× plus vite</strong>. <strong className="text-gray-900">187 entreprises vendues en 2024</strong>. Si vous vendez 3 mois plus vite, ça vaut combien pour vous? <strong className="text-orange-600">Bien plus que 500€ de différence</strong>.
                </p>
              </div>
            </div>

            {/* EXCLUSIF - 👑 PREMIUM */}
            <div>
              <div className="group h-full flex flex-col border-2 border-slate-200 hover:border-purple-600 hover:shadow-xl transition-all rounded-2xl p-8 bg-white relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    👑 PREMIUM
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-purple-600 mb-2">Exclusif</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-purple-600">1,990€</span>
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

              {/* Comparaison Exclusif */}
              <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-amber-50 border border-purple-200 rounded-xl">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-purple-600">Agent personnel</strong> + conciergerie complète + confidentialité maximale. <strong className="text-gray-900">Cabinets M&A premium facturent 3,000-5,000€/mois</strong>. Nous <strong className="text-purple-600">1,990€/3 mois = 663€/mois</strong>. Vous économisez <strong className="text-purple-600">2,000-4,000€/mois</strong> vs concurrence.
                </p>
              </div>
            </div>
          </div>

          {/* COMMISSION DE SUCCÈS */}
          <div className="mt-40 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">💰 Commission de succès</h2>
              <p className="text-xl text-slate-600">
                Payée uniquement lors de la vente réussie - Barème progressif selon prix de vente
              </p>
            </div>

            {/* 5 BLOCS TRANCHES */}
            <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Bloc 1 */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center border-2 border-red-200">
                  <div className="text-sm font-semibold text-red-700 mb-2">{"< 300K€"}</div>
                  <div className="text-4xl font-black text-red-600 mb-1">8%</div>
                  <div className="text-xs text-red-600">Commission</div>
                </div>

                {/* Bloc 2 */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center border-2 border-orange-200">
                  <div className="text-sm font-semibold text-orange-700 mb-2">300-500K€</div>
                  <div className="text-4xl font-black text-orange-600 mb-1">6%</div>
                  <div className="text-xs text-orange-600">Commission</div>
                </div>

                {/* Bloc 3 */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 text-center border-2 border-yellow-200">
                  <div className="text-sm font-semibold text-yellow-700 mb-2">500K-1M€</div>
                  <div className="text-4xl font-black text-yellow-600 mb-1">5%</div>
                  <div className="text-xs text-yellow-600">Commission</div>
                </div>

                {/* Bloc 4 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border-2 border-green-200">
                  <div className="text-sm font-semibold text-green-700 mb-2">1-2M€</div>
                  <div className="text-4xl font-black text-green-600 mb-1">4%</div>
                  <div className="text-xs text-green-600">Commission</div>
                </div>

                {/* Bloc 5 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border-2 border-blue-200">
                  <div className="text-sm font-semibold text-blue-700 mb-2">{"> 2M€"}</div>
                  <div className="text-4xl font-black text-blue-600 mb-1">3%</div>
                  <div className="text-xs text-blue-600">Commission</div>
                </div>
              </div>

              {/* Note importante */}
              <div className="mt-8 bg-amber-50 border-2 border-amber-300 rounded-xl p-6 text-center">
                <p className="text-lg font-bold text-amber-900">
                  💎 Commission minimale: 8,000€
                </p>
                <p className="text-sm text-amber-800 mt-2">
                  Même si le pourcentage donne un montant inférieur, la commission minimale est de 8,000€.
                </p>
              </div>
            </div>

            {/* 3 EXEMPLES */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Exemple 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                <h4 className="text-lg font-bold text-slate-800 mb-3">Exemple 1: Petite PME Plomberie</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Prix vente:</span>
                    <span className="font-semibold">200,000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Taux:</span>
                    <span className="font-semibold">8% = 16,000€</span>
                  </div>
                  <div className="flex justify-between text-xs text-amber-700 bg-amber-50 p-2 rounded">
                    <span>Mais minimum 8K →</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-slate-200">
                    <span className="font-bold text-slate-800">Commission finale:</span>
                    <span className="font-black text-green-600 text-lg">8,000€</span>
                  </div>
                </div>
              </div>

              {/* Exemple 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-blue-200">
                <h4 className="text-lg font-bold text-slate-800 mb-3">Exemple 2: Entreprise Électricité</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Prix vente:</span>
                    <span className="font-semibold">450,000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Taux:</span>
                    <span className="font-semibold">6%</span>
                  </div>
                  <div className="h-6"></div>
                  <div className="flex justify-between pt-2 border-t-2 border-slate-200">
                    <span className="font-bold text-slate-800">Commission finale:</span>
                    <span className="font-black text-green-600 text-lg">27,000€</span>
                  </div>
                </div>
              </div>

              {/* Exemple 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                <h4 className="text-lg font-bold text-slate-800 mb-3">Exemple 3: Grande PME Maçonnerie</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Prix vente:</span>
                    <span className="font-semibold">1,500,000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Taux:</span>
                    <span className="font-semibold">4%</span>
                  </div>
                  <div className="h-6"></div>
                  <div className="flex justify-between pt-2 border-t-2 border-slate-200">
                    <span className="font-bold text-slate-800">Commission finale:</span>
                    <span className="font-black text-green-600 text-lg">60,000€</span>
                  </div>
                </div>
              </div>
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
