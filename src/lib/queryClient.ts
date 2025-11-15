import { QueryClient } from '@tanstack/react-query';

// Client avec cache optimisé
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes par défaut
      gcTime: 1000 * 60 * 30, // 30 minutes (nouvelle API TanStack Query v5)
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
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

// Préchargement des données critiques
export const prefetchCriticalData = async () => {
  try {
    // Précharger les catégories (rarement changées)
    await queryClient.prefetchQuery({
      queryKey: queryKeys.categories.list(),
      staleTime: cacheStrategies.static.staleTime,
    });
    
    // Précharger les stats globales
    await queryClient.prefetchQuery({
      queryKey: queryKeys.stats.global(),
      staleTime: cacheStrategies.static.staleTime,
    });
    
    // Précharger les listings en vedette
    await queryClient.prefetchQuery({
      queryKey: queryKeys.listings.featured(),
      staleTime: cacheStrategies.dynamic.staleTime,
    });
    
    console.log('✅ Cache préchauffé');
  } catch (error) {
    console.error('❌ Erreur préchargement cache:', error);
  }
};

// Nettoyer le cache expiré
export const cleanExpiredCache = () => {
  queryClient.clear();
  localStorage.removeItem('CESSIONBTP_CACHE');
  console.log('🗑️ Cache nettoyé');
};

// Statistiques du cache (utile pour debug)
export const getCacheStats = () => {
  const cache = queryClient.getQueryCache();
  const queries = cache.getAll();
  
  return {
    total: queries.length,
    active: queries.filter(q => q.getObserversCount() > 0).length,
    stale: queries.filter(q => q.isStale()).length,
    fresh: queries.filter(q => !q.isStale()).length,
    errors: queries.filter(q => q.state.status === 'error').length,
  };
};
