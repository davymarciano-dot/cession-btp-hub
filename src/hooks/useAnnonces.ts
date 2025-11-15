import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type AnnonceRow = Database['public']['Tables']['annonces']['Row'];
type AnnonceInsert = Database['public']['Tables']['annonces']['Insert'];
type AnnonceUpdate = Database['public']['Tables']['annonces']['Update'];

export interface FiltresAnnonces {
  secteurs?: string[];
  departements?: string[];
  prixMin?: number;
  prixMax?: number;
  caMin?: number;
  caMax?: number;
  effectifMin?: number;
  effectifMax?: number;
  search?: string;
}

export const useAnnonces = (filtres?: FiltresAnnonces) => {
  const [annonces, setAnnonces] = useState<AnnonceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAnnonces = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('annonces')
        .select('*')
        .eq('statut', 'publiee')
        .order('created_at', { ascending: false });

      // Appliquer les filtres
      if (filtres) {
        if (filtres.secteurs && filtres.secteurs.length > 0) {
          query = query.in('secteur_activite', filtres.secteurs);
        }

        if (filtres.departements && filtres.departements.length > 0) {
          query = query.in('departement', filtres.departements);
        }

        if (filtres.prixMin) {
          query = query.gte('prix_vente', filtres.prixMin);
        }

        if (filtres.prixMax) {
          query = query.lte('prix_vente', filtres.prixMax);
        }

        if (filtres.caMin) {
          query = query.gte('ca_n1', filtres.caMin);
        }

        if (filtres.caMax) {
          query = query.lte('ca_n1', filtres.caMax);
        }

        if (filtres.effectifMin !== undefined) {
          query = query.gte('nombre_salaries', filtres.effectifMin);
        }

        if (filtres.effectifMax !== undefined) {
          query = query.lte('nombre_salaries', filtres.effectifMax);
        }

        if (filtres.search) {
          query = query.or(`raison_sociale.ilike.%${filtres.search}%,description_activite.ilike.%${filtres.search}%,ville.ilike.%${filtres.search}%`);
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setAnnonces(data || []);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des annonces:', err);
      setError(err.message);
      toast({
        title: "Erreur",
        description: "Impossible de charger les annonces",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, [JSON.stringify(filtres)]);

  const refreshAnnonces = () => {
    fetchAnnonces();
  };

  return {
    annonces,
    loading,
    error,
    refreshAnnonces
  };
};

// Hook pour une annonce spécifique
export const useAnnonce = (id: string) => {
  const [annonce, setAnnonce] = useState<AnnonceRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('annonces')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        setAnnonce(data);

        // Incrémenter le compteur de vues
        const { data: { user } } = await supabase.auth.getUser();
        
        await supabase.from('listing_views').insert({
          listing_id: id,
          viewer_id: user?.id || null
        });

      } catch (err: any) {
        console.error('Erreur lors de la récupération de l\'annonce:', err);
        setError(err.message);
        toast({
          title: "Erreur",
          description: "Impossible de charger l'annonce",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnnonce();
    }
  }, [id]);

  return { annonce, loading, error };
};

// Hook pour créer/modifier une annonce
export const useCreateAnnonce = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createAnnonce = async (annonceData: AnnonceInsert) => {
    try {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Vous devez être connecté pour créer une annonce');
      }

      const { data, error } = await supabase
        .from('annonces')
        .insert({
          ...annonceData,
          user_id: user.id,
          statut: 'brouillon'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès !",
        description: "Votre annonce a été créée",
      });

      return data;
    } catch (err: any) {
      console.error('Erreur lors de la création de l\'annonce:', err);
      toast({
        title: "Erreur",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAnnonce = async (id: string, updates: AnnonceUpdate) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('annonces')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Succès !",
        description: "Votre annonce a été mise à jour",
      });

      return data;
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour:', err);
      toast({
        title: "Erreur",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const publishAnnonce = async (id: string) => {
    return updateAnnonce(id, {
      statut: 'publiee'
    });
  };

  const deleteAnnonce = async (id: string) => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('annonces')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès !",
        description: "Votre annonce a été supprimée",
      });
    } catch (err: any) {
      console.error('Erreur lors de la suppression:', err);
      toast({
        title: "Erreur",
        description: err.message,
        variant: "destructive"
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAnnonce,
    updateAnnonce,
    publishAnnonce,
    deleteAnnonce,
    loading
  };
};

// Hook pour les annonces de l'utilisateur connecté
export const useMyAnnonces = () => {
  const [annonces, setAnnonces] = useState<AnnonceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMyAnnonces = async () => {
      try {
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setAnnonces([]);
          return;
        }

        const { data, error } = await supabase
          .from('annonces')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setAnnonces(data || []);
      } catch (err: any) {
        console.error('Erreur:', err);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos annonces",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyAnnonces();
  }, []);

  return { annonces, loading };
};
