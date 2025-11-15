import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { queryKeys, cacheStrategies, invalidateQueries } from '@/lib/queryClient';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Annonce = Tables<'annonces'>;
type AnnonceInsert = TablesInsert<'annonces'>;
type AnnonceUpdate = TablesUpdate<'annonces'>;

interface ListingFilters {
  secteur?: string;
  departement?: string;
  prixMin?: number;
  prixMax?: number;
  status?: string;
  realtime?: boolean;
}

// Hook optimisé pour les listings avec filtres
export const useOptimizedListings = (filters: ListingFilters = {}, options = {}) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: queryKeys.listings.list(filters),
    queryFn: async () => {
      console.log('🔄 Fetching listings with filters:', filters);
      
      let query = supabase
        .from('annonces')
        .select('*')
        .eq('statut', 'publiee');
      
      // Appliquer les filtres dynamiquement
      if (filters.secteur) {
        query = query.eq('secteur_activite', filters.secteur);
      }
      if (filters.departement) {
        query = query.eq('departement', filters.departement);
      }
      if (filters.prixMin) {
        query = query.gte('prix_vente', filters.prixMin);
      }
      if (filters.prixMax) {
        query = query.lte('prix_vente', filters.prixMax);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    
    // Configuration dynamique selon le contexte
    staleTime: filters.realtime ? 0 : cacheStrategies.dynamic.staleTime,
    gcTime: cacheStrategies.dynamic.gcTime,
    
    // Optimisations UX
    placeholderData: (previousData) => previousData, // Garde données précédentes pendant refetch
    refetchInterval: filters.realtime ? 5000 : false, // Polling si realtime activé
    
    ...options,
  });
};

// Hook avec mutation optimiste pour mise à jour
export const useOptimisticUpdateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (listing: AnnonceUpdate & { id: string }) => {
      console.log('💾 Updating listing:', listing.id);
      
      const { data, error } = await supabase
        .from('annonces')
        .update(listing)
        .eq('id', listing.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Optimistic update - UI instantané avant confirmation serveur
    onMutate: async (newListing) => {
      console.log('⚡ Applying optimistic update...');
      
      // Annuler les refetch en cours pour éviter conflits
      await queryClient.cancelQueries({ queryKey: queryKeys.listings.all });
      
      // Snapshot des données actuelles pour rollback potentiel
      const previousListings = queryClient.getQueryData(queryKeys.listings.list());
      const previousDetail = queryClient.getQueryData(queryKeys.listings.detail(newListing.id));
      
      // Update optimiste dans tous les caches concernés
      queryClient.setQueriesData(
        { queryKey: queryKeys.listings.all },
        (old: Annonce[] | undefined) => {
          if (!old) return old;
          return old.map(item => 
            item.id === newListing.id 
              ? { ...item, ...newListing } 
              : item
          );
        }
      );
      
      // Update le détail aussi
      queryClient.setQueryData(
        queryKeys.listings.detail(newListing.id),
        (old: Annonce | undefined) => {
          if (!old) return old;
          return { ...old, ...newListing };
        }
      );
      
      return { previousListings, previousDetail };
    },
    
    // Rollback si erreur
    onError: (err, newListing, context) => {
      console.error('❌ Update failed, rolling back:', err);
      
      if (context?.previousListings) {
        queryClient.setQueryData(queryKeys.listings.list(), context.previousListings);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(
          queryKeys.listings.detail(newListing.id),
          context.previousDetail
        );
      }
    },
    
    // Revalidation après succès pour synchroniser avec serveur
    onSettled: (data) => {
      console.log('✅ Update confirmed, revalidating...');
      invalidateQueries.listings();
      
      if (data) {
        invalidateQueries.listing(data.id);
      }
    },
  });
};

// Hook pour création avec optimistic update
export const useOptimisticCreateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (listing: AnnonceInsert) => {
      console.log('➕ Creating listing...');
      
      const { data, error } = await supabase
        .from('annonces')
        .insert(listing)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    // Optimistic creation
    onMutate: async (newListing) => {
      console.log('⚡ Applying optimistic creation...');
      
      await queryClient.cancelQueries({ queryKey: queryKeys.listings.all });
      
      const previousListings = queryClient.getQueryData(queryKeys.listings.list());
      
      // Créer un ID temporaire pour l'UI
      const tempListing = {
        ...newListing,
        id: `temp-${Date.now()}`,
        created_at: new Date().toISOString(),
      } as Annonce;
      
      // Ajouter optimiste dans le cache
      queryClient.setQueriesData(
        { queryKey: queryKeys.listings.all },
        (old: Annonce[] | undefined) => {
          if (!old) return [tempListing as Annonce];
          return [tempListing as Annonce, ...old];
        }
      );
      
      return { previousListings, tempListing };
    },
    
    onError: (err, newListing, context) => {
      console.error('❌ Creation failed, rolling back:', err);
      
      if (context?.previousListings) {
        queryClient.setQueryData(queryKeys.listings.list(), context.previousListings);
      }
    },
    
    onSuccess: (data, variables, context) => {
      console.log('✅ Creation confirmed:', data.id);
      
      // Remplacer l'entrée temporaire par la vraie
      queryClient.setQueriesData(
        { queryKey: queryKeys.listings.all },
        (old: Annonce[] | undefined) => {
          if (!old) return [data];
          return old.map(item => 
            item.id === context?.tempListing.id ? data : item
          );
        }
      );
    },
    
    onSettled: () => {
      invalidateQueries.listings();
    },
  });
};

// Hook avec pagination infinie (scroll infini)
export const useInfiniteListings = (filters: ListingFilters = {}) => {
  const pageSize = 20;
  
  return useInfiniteQuery({
    queryKey: [...queryKeys.listings.list(filters), 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`🔄 Fetching page ${pageParam / pageSize}...`);
      
      let query = supabase
        .from('annonces')
        .select('*', { count: 'exact' })
        .eq('statut', 'publiee');
      
      // Appliquer les filtres
      if (filters.secteur) {
        query = query.eq('secteur_activite', filters.secteur);
      }
      if (filters.departement) {
        query = query.eq('departement', filters.departement);
      }
      if (filters.prixMin) {
        query = query.gte('prix_vente', filters.prixMin);
      }
      if (filters.prixMax) {
        query = query.lte('prix_vente', filters.prixMax);
      }
      
      const { data, error, count } = await query
        .range(pageParam, pageParam + pageSize - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return {
        data,
        count,
        nextCursor: data.length === pageSize ? pageParam + pageSize : undefined,
      };
    },
    
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    
    initialPageParam: 0,
    
    staleTime: cacheStrategies.dynamic.staleTime,
    gcTime: cacheStrategies.dynamic.gcTime,
  });
};

// Hook pour prefetch intelligent (hover sur card)
export const usePrefetchListing = () => {
  const queryClient = useQueryClient();
  
  const prefetchListing = (id: string) => {
    queryClient.prefetchQuery({
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
      staleTime: cacheStrategies.dynamic.staleTime,
    });
  };
  
  return { prefetchListing };
};

// Hook pour batch updates (multiple listings)
export const useBatchUpdateListings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: Array<AnnonceUpdate & { id: string }>) => {
      console.log(`📦 Batch updating ${updates.length} listings...`);
      
      // Supabase ne supporte pas les batch updates directement
      // On fait multiple updates en parallèle
      const promises = updates.map(listing =>
        supabase
          .from('annonces')
          .update(listing)
          .eq('id', listing.id)
          .select()
          .single()
      );
      
      const results = await Promise.all(promises);
      
      // Vérifier les erreurs
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(`${errors.length} updates failed`);
      }
      
      return results.map(r => r.data);
    },
    
    onSuccess: () => {
      console.log('✅ Batch update completed');
      invalidateQueries.listings();
    },
  });
};
