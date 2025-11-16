import { useState, useEffect } from "react";
import { Shield, TrendingUp, Award, FileCheck, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface RGEListing {
  id: string;
  raison_sociale: string;
  secteur_activite: string;
  ville: string;
  departement: string;
  prix_vente: number;
  ca_n1: number;
  nombre_salaries: number;
  certifications: string[];
  created_at: string;
}

const EntreprisesRGE = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<RGEListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchRGEListings();
  }, []);

  const fetchRGEListings = async () => {
    try {
      const { data, error } = await supabase
        .from('annonces_public')
        .select('id, raison_sociale, secteur_activite, ville, departement, prix_vente, ca_n1, nombre_salaries, certifications, created_at')
        .not('certifications', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filtrer uniquement les entreprises avec certifications RGE
      const rgeListings = (data || []).filter(listing => {
        const certs = listing.certifications as string[];
        return certs && certs.some(cert =>
          ['RGE', 'Qualibat', 'Qualipac', 'QualiPV', 'Qualibois', 'Qualisol'].includes(cert)
        );
      });

      setListings(rgeListings as RGEListing[]);
    } catch (error) {
      console.error('Error fetching RGE listings:', error);
      toast.error('Erreur lors du chargement des annonces');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Pour l'instant, on affiche juste un message de succès
      // L'intégration email sera faite plus tard avec Resend
      toast.success('Merci ! Le guide sera bientôt disponible par email');
      setEmail('');
    } catch (error) {
      console.error('Error capturing email:', error);
      toast.error('Erreur lors de l\'inscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 md:p-12 mb-12 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Entreprises RGE à Vendre
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 mb-4">
            {listings.length} entreprises certifiées RGE disponibles
          </p>
          <div className="flex flex-wrap gap-4 text-lg">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Certifications vérifiées</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Valorisation +30% vs non-RGE</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              <span>Accès MaPrimeRénov'</span>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <article className="prose max-w-none mb-12 bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Pourquoi acheter une entreprise RGE en 2026 ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 not-prose">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Marché en pleine explosion
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Plan France 2030 : 700,000 rénovations/an</li>
                <li>• MaPrimeRénov' boostée à 15,000€</li>
                <li>• Interdiction chaudières gaz neuves en 2026</li>
                <li>• Obligation DPE minimum D pour locations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                Avantages compétitifs
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Accès exclusif aux aides d'État</li>
                <li>• Marchés publics éco-conditionnés</li>
                <li>• Carnet de commandes plein</li>
                <li>• Valorisation +30% vs concurrence</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Nouvelles certifications 2026
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-green-700">QualiPAC+</strong>
                <p className="text-muted-foreground">Pompes à chaleur haute performance</p>
              </div>
              <div>
                <strong className="text-green-700">RGE Études</strong>
                <p className="text-muted-foreground">Audit énergétique obligatoire</p>
              </div>
              <div>
                <strong className="text-green-700">Label Bas Carbone</strong>
                <p className="text-muted-foreground">Construction éco-responsable</p>
              </div>
            </div>
          </div>
        </article>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des annonces...</p>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {listings.map((listing) => (
              <Card key={listing.id} className="p-6 hover:shadow-xl transition-shadow relative">
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                  <Shield className="w-3 h-3" />
                  RGE
                </div>
                
                <h3 className="text-xl font-bold mb-2 pr-16">{listing.raison_sociale || 'Entreprise confidentielle'}</h3>
                <p className="text-muted-foreground mb-4">📍 {listing.ville} ({listing.departement})</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Secteur:</span>
                    <span className="font-semibold">{listing.secteur_activite}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CA:</span>
                    <span className="font-semibold">{formatPrice(listing.ca_n1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Effectif:</span>
                    <span className="font-semibold">{listing.nombre_salaries} pers.</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {listing.certifications.slice(0, 3).map((cert, idx) => (
                      <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-2xl font-bold text-green-600 mb-4">
                  {formatPrice(listing.prix_vente)}
                </p>

                <Button 
                  onClick={() => navigate(`/entreprises/${listing.id}`)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Voir détails →
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune annonce RGE disponible pour le moment</p>
          </div>
        )}

        {/* Lead Magnet CTA */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-2xl mx-auto text-center">
            <Download className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              📚 Guide Gratuit : Reprendre une Entreprise RGE
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Tout savoir sur les certifications, les transferts, les financements et la valorisation
            </p>
            
            <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 px-8"
              >
                {isSubmitting ? 'Envoi...' : 'Télécharger le guide'}
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              100% gratuit • Sans engagement • Données sécurisées
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EntreprisesRGE;
