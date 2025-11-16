import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();
  const [billingType, setBillingType] = useState<'success' | 'premium'>('success');

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead page="pricing" />
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Tarifs transparents</h1>
          <p className="text-center text-gray-600 mb-8 text-xl">Choisissez la formule adaptée à vos besoins</p>
          
          {/* Toggle Success Fee / Premium */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-md inline-flex">
              <button 
                onClick={() => setBillingType('success')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  billingType === 'success' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Success Fee
              </button>
              <button 
                onClick={() => setBillingType('premium')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  billingType === 'premium' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Abonnement Premium
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* GRATUIT */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Essentiel</h3>
              <div className="text-4xl font-bold mb-2 text-gray-900">Gratuit</div>
              <p className="text-gray-600 mb-6">Pour commencer</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Estimation gratuite en 48h</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">1 annonce basique</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">5 contacts vendeur/mois</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500">Matching IA premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500">Badge "Vérifié"</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/vendre')}
              >
                Commencer gratuitement
              </Button>
            </div>
            
            {/* SUCCESS FEE - POPULAIRE */}
            <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-2xl p-8 border-2 border-blue-500 relative transform md:scale-105 hover:shadow-3xl transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Plus populaire
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Success Fee</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-blue-600">2%</span>
                <span className="text-lg text-gray-600 ml-2">du prix de vente</span>
              </div>
              <p className="text-gray-600 mb-6">Payez uniquement si vous vendez</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Contacts illimités</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Matching IA premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Badge "Vérifié"</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Mise en avant annonce</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Accompagnement expert</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">Analytics avancés</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate('/vendre')}
              >
                Choisir Success Fee
              </Button>
              <p className="text-xs text-center text-gray-500 mt-4">
                💡 Exemple : Vente à 500k€ = 10k€ de commission
              </p>
            </div>
            
            {/* PREMIUM */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Premium</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">299€</span>
                <span className="text-lg text-gray-600">/mois</span>
              </div>
              <p className="text-gray-600 mb-6">Pour les professionnels</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Annonces illimitées</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Top des résultats de recherche</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Account manager dédié</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Accès API</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Rapports personnalisés</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-bold">0% de commission</span>
                </li>
              </ul>
              <Button 
                variant="default"
                className="w-full bg-gray-800 hover:bg-gray-900"
                onClick={() => navigate('/vendre')}
              >
                Devenir Premium
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
            <div className="space-y-6 bg-white rounded-xl shadow-lg p-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Quand dois-je payer la Success Fee ?</h3>
                <p className="text-gray-600">Uniquement après la signature définitive de la vente chez le notaire. Aucun frais avant.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Puis-je changer de formule ?</h3>
                <p className="text-gray-600">Oui, vous pouvez passer de Success Fee à Premium à tout moment, ou vice-versa.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Que se passe-t-il si je ne vends pas ?</h3>
                <p className="text-gray-600">Avec Success Fee, vous ne payez rien. Avec Premium, vous résiliez simplement votre abonnement mensuel.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">La Success Fee est-elle négociable ?</h3>
                <p className="text-gray-600">Pour les ventes supérieures à 2M€, contactez-nous pour un tarif personnalisé.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à vendre votre entreprise ?</h2>
            <p className="text-xl mb-8 opacity-90">Commencez gratuitement, sans engagement</p>
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
              onClick={() => navigate('/estimer')}
            >
              Obtenir une estimation gratuite
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
