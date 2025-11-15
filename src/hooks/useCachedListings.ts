import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { queryKeys, cacheStrategies, invalidateQueries } from '@/lib/queryClient';

// Hook pour récupérer les listings avec cache intelligent
export const useCachedListings = (filters?: any) => {
  return useQuery({
    queryKey: queryKeys.listings.list(filters),
    queryFn: async () => {
      let query = supabase
        .from('annonces')
        .select('*')
        .eq('statut', 'publiee')
        .order('created_at', { ascending: false });
      
      if (filters?.secteur) {
        query = query.eq('secteur_activite', filters.secteur);
      }
      
      if (filters?.departement) {
        query = query.eq('departement', filters.departement);
      }
      
      if (filters?.prixMin) {
        query = query.gte('prix_vente', filters.prixMin);
      }
      
      if (filters?.prixMax) {
        query = query.lte('prix_vente', filters.prixMax);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    ...cacheStrategies.dynamic,
  });
};

// Hook pour une listing spécifique
export const useCachedListing = (id: string) => {
  return useQuery({
    queryKey: queryKeys.listings.detail(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('annonces')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    ...cacheStrategies.dynamic,
    enabled: !!id,
  });
};

// Hook pour les listings en vedette
export const useFeaturedListings = () => {
  return useQuery({
    queryKey: queryKeys.listings.featured(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('annonces')
        .select('*')
        .eq('statut', 'publiee')
        .order('nombre_vues', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
    ...cacheStrategies.dynamic,
  });
};

// Hook pour les stats des listings
export const useListingsStats = () => {
  return useQuery({
    queryKey: queryKeys.listings.stats(),
    queryFn: async () => {
      const { count: totalListings } = await supabase
        .from('annonces')
        .select('*', { count: 'exact', head: true })
        .eq('statut', 'publiee');
      
      const { data: avgPrice } = await supabase
        .from('annonces')
        .select('prix_vente')
        .eq('statut', 'publiee');
      
      const average = avgPrice?.length 
        ? avgPrice.reduce((sum, item) => sum + item.prix_vente, 0) / avgPrice.length 
        : 0;
      
      return {
        total: totalListings || 0,
        averagePrice: Math.round(average),
      };
    },
    ...cacheStrategies.static,
  });
};

// Mutation pour créer une listing avec invalidation du cache
export const useCreateListing = () => {
  return useMutation({
    mutationFn: async (listing: any) => {
      const { data, error } = await supabase
        .from('annonces')
        .insert(listing)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalider le cache après création
      invalidateQueries.listings();
    },
  });
};

// Mutation pour mettre à jour une listing
export const useUpdateListing = () => {
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('annonces')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalider le cache de cette listing spécifique
      invalidateQueries.listing(data.id);
    },
  });
};
