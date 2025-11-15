import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useOptimizedListings,
  useOptimisticUpdateListing,
  useInfiniteListings,
  usePrefetchListing,
} from '@/hooks/useOptimizedQueries';
import { logCacheStats } from '@/lib/queryClient';

// Exemple 1: Listings avec filtres et cache intelligent
export const OptimizedListingsExample = () => {
  const [filters, setFilters] = useState({ secteur: 'Maçonnerie' });
  
  const { data: listings, isLoading, isFetching } = useOptimizedListings(filters);
  const updateListing = useOptimisticUpdateListing();
  const { prefetchListing } = usePrefetchListing();
  
  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    // Update optimiste - UI réagit instantanément
    await updateListing.mutateAsync({
      id,
      // On pourrait ajouter un champ favori
      nombre_vues: (listings?.find(l => l.id === id)?.nombre_vues || 0) + 1,
    });
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">Annonces optimisées</h2>
        {isFetching && <span className="text-sm text-muted-foreground">Mise à jour...</span>}
        <Button variant="outline" size="sm" onClick={() => logCacheStats()}>
          📊 Stats Cache
        </Button>
      </div>
      
      <div className="space-y-2">
        {listings?.map(listing => (
          <Card
            key={listing.id}
            onMouseEnter={() => prefetchListing(listing.id)} // Prefetch au hover
          >
            <CardHeader>
              <CardTitle>{listing.secteur_activite}</CardTitle>
              <CardDescription>
                {listing.ville} ({listing.departement})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  {listing.prix_vente.toLocaleString('fr-FR')} €
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleFavorite(listing.id, false)}
                  disabled={updateListing.isPending}
                >
                  {updateListing.isPending ? '⏳' : '👍'} {listing.nombre_vues || 0}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Exemple 2: Infinite scroll avec pagination
export const InfiniteListingsExample = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteListings();
  
  if (isLoading) {
    return <div>Chargement initial...</div>;
  }
  
  const allListings = data?.pages.flatMap(page => page.data) || [];
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Scroll infini ({allListings.length} annonces)</h2>
      
      <div className="space-y-2">
        {allListings.map(listing => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle className="text-lg">{listing.secteur_activite}</CardTitle>
              <CardDescription>{listing.ville}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full"
        >
          {isFetchingNextPage ? 'Chargement...' : 'Charger plus'}
        </Button>
      )}
      
      {!hasNextPage && (
        <p className="text-center text-muted-foreground">
          Toutes les annonces ont été chargées
        </p>
      )}
    </div>
  );
};

// Exemple 3: Utilisation dans une page
export const OptimizedPage = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <OptimizedListingsExample />
      <hr />
      <InfiniteListingsExample />
    </div>
  );
};
