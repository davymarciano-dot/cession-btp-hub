import { QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Configuration OPTIMALE du cache TanStack Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache par défaut - équilibre performance/fraîcheur
      staleTime: 1000 * 60 * 5, // 5 min - données fraîches
      gcTime: 1000 * 60 * 30, // 30 min - garde en mémoire (anciennement cacheTime)
      
      // Performance
      refetchOnWindowFocus: false, // Pas de refetch au focus (économise requêtes)
      refetchOnReconnect: 'always', // Refetch si reconnexion réseau
      refetchInterval: false, // Pas de polling par défaut
      
      // Retry intelligent - évite les retries inutiles
      retry: (failureCount, error: any) => {
        // Ne pas retry les erreurs définitives
        if (error?.status === 404) return false; // Not found
        if (error?.status === 401) return false; // Unauthorized
        if (error?.status === 403) return false; // Forbidden
        return failureCount < 3; // Max 3 tentatives
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Optimisations avancées
      structuralSharing: true, // Réutilise les refs d'objets (évite re-renders)
    },
    mutations: {
      retry: 1, // Une seule retry pour les mutations
      retryDelay: 1000,
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

// Stratégies de cache par type de données
export const cacheStrategies = {
  // Données statiques (changent rarement)
  static: {
    staleTime: 1000 * 60 * 60, // 1 heure
    gcTime: 1000 * 60 * 60 * 24, // 24 heures
  },
  
  // Données dynamiques (mises à jour fréquentes)
  dynamic: {
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  },
  
  // Données temps réel (toujours fraîches)
  realtime: {
    staleTime: 0,
    gcTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  },
  
  // Données utilisateur (personnalisées)
  user: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  },
};

// Clés de cache standardisées
export const queryKeys = {
  listings: {
    all: ['listings'] as const,
    list: (filters?: any) => [...queryKeys.listings.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.listings.all, 'detail', id] as const,
    featured: () => [...queryKeys.listings.all, 'featured'] as const,
    stats: () => [...queryKeys.listings.all, 'stats'] as const,
  },
  
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    matches: () => [...queryKeys.user.all, 'matches'] as const,
    alerts: () => [...queryKeys.user.all, 'alerts'] as const,
  },
  
  categories: {
    all: ['categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
  },
  
  stats: {
    all: ['stats'] as const,
    global: () => [...queryKeys.stats.all, 'global'] as const,
  },
};

// Invalidation intelligente
export const invalidateQueries = {
  // Invalider toutes les listings après création/modification
  listings: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.listings.all });
  },
  
  // Invalider une listing spécifique
  listing: (id: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.listings.detail(id) });
    queryClient.invalidateQueries({ queryKey: queryKeys.listings.list() });
  },
  
  // Invalider les données utilisateur
  userProfile: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.profile() });
  },
  
  // Tout invalider (à utiliser avec parcimonie)
  all: () => {
    queryClient.invalidateQueries();
  },
};

// Helper functions pour le préchargement
const fetchFeaturedListings = async () => {
  const { data, error } = await supabase
    .from('annonces')
    .select('*')
    .eq('statut', 'publiee')
    .order('nombre_vues', { ascending: false })
    .limit(6);
  
  if (error) throw error;
  return data;
};

const fetchGlobalStats = async () => {
  const { count: totalListings } = await supabase
    .from('annonces')
    .select('*', { count: 'exact', head: true })
    .eq('statut', 'publiee');
  
  return { totalListings: totalListings || 0 };
};

// Préchargement intelligent des données essentielles
export const prefetchCriticalData = async () => {
  try {
    console.log('🔄 Préchargement des données critiques...');
    
    // Précharger les listings en vedette
    await queryClient.prefetchQuery({
      queryKey: queryKeys.listings.featured(),
      queryFn: fetchFeaturedListings,
      staleTime: cacheStrategies.dynamic.staleTime,
    });
    
    // Précharger les stats globales
    await queryClient.prefetchQuery({
      queryKey: queryKeys.stats.global(),
      queryFn: fetchGlobalStats,
      staleTime: cacheStrategies.static.staleTime,
    });
    
    console.log('✅ Cache préchauffé avec succès');
  } catch (error) {
    // Ne pas bloquer l'app si le préchargement échoue
    console.warn('⚠️ Erreur préchargement cache (non-bloquant):', error);
  }
};

// Nettoyer le cache expiré
export const cleanExpiredCache = () => {
  queryClient.clear();
  localStorage.removeItem('CESSIONBTP_CACHE');
  console.log('🗑️ Cache nettoyé');
};

// Statistiques du cache (utile pour debug et monitoring)
export const getCacheStats = () => {
  const cache = queryClient.getQueryCache();
  const queries = cache.getAll();
  
  const stats = {
    total: queries.length,
    active: queries.filter(q => q.getObserversCount() > 0).length,
    stale: queries.filter(q => q.isStale()).length,
    fresh: queries.filter(q => !q.isStale()).length,
    errors: queries.filter(q => q.state.status === 'error').length,
    pending: queries.filter(q => q.state.status === 'pending').length,
  };
  
  // Calcul du hit rate approximatif
  const hitRate = stats.total > 0 
    ? ((stats.fresh / stats.total) * 100).toFixed(1) 
    : '0';
  
  return {
    ...stats,
    hitRate: `${hitRate}%`,
    memoryUsage: `${queries.length} queries en cache`,
  };
};

// Debug helper - affiche les stats dans la console
export const logCacheStats = () => {
  const stats = getCacheStats();
  console.table(stats);
  return stats;
};
