import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import VendorAnalyticsDashboard from './VendorAnalytics';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Listing {
  id: string;
  user_id: string;
  raison_sociale: string;
  secteur_activite: string;
  departement: string;
  prix_vente: number;
  statut: string;
  [key: string]: any;
}

export const VendorListingAnalytics = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    if (id) {
      checkAuthorizationAndLoadListing();
    }
  }, [id]);
  
  const checkAuthorizationAndLoadListing = async () => {
    try {
      // Vérifier l'utilisateur connecté
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }
      
      // Charger l'annonce
      const { data: listingData, error } = await supabase
        .from('annonces')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error loading listing:', error);
        navigate('/dashboard');
        return;
      }
      
      // Vérifier l'autorisation
      if (listingData.user_id !== user.id) {
        navigate('/dashboard');
        return;
      }
      
      setListing(listingData);
      setAuthorized(true);
    } catch (error) {
      console.error('Error:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!authorized || !listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-muted-foreground mb-4">Non autorisé</p>
        <Button onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-background border-b sticky top-0 z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Analytics - {listing.raison_sociale}</h1>
            <p className="text-sm text-muted-foreground">
              {listing.secteur_activite} • {listing.departement}
            </p>
          </div>
        </div>
      </div>
      <VendorAnalyticsDashboard listingId={id!} />
    </div>
  );
};

export default VendorListingAnalytics;
