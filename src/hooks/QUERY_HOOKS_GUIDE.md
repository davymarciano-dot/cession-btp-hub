# Guide des Hooks Optimisés TanStack Query

## 📚 Hooks Disponibles

### 1. `useOptimizedListings` - Listings avec Filtres

```tsx
const { data, isLoading, isFetching } = useOptimizedListings({
  secteur: 'Maçonnerie',
  departement: '75',
  prixMin: 100000,
  prixMax: 500000,
  realtime: true, // Active polling toutes les 5s
});
```

**Fonctionnalités:**
- ✅ Cache intelligent (2 min par défaut)
- ✅ Garde les données précédentes pendant refetch
- ✅ Polling en temps réel optionnel
- ✅ Filtres dynamiques

### 2. `useOptimisticUpdateListing` - Mise à Jour Optimiste

```tsx
const updateListing = useOptimisticUpdateListing();

// UI réagit instantanément, rollback automatique si erreur
await updateListing.mutateAsync({
  id: '123',
  prix_vente: 250000,
  statut: 'publiee',
});
```

**Fonctionnalités:**
- ⚡ Update UI instantané (avant confirmation serveur)
- ✅ Rollback automatique si erreur
- ✅ Revalidation après succès
- ✅ Gestion des états de chargement

### 3. `useOptimisticCreateListing` - Création Optimiste

```tsx
const createListing = useOptimisticCreateListing();

await createListing.mutateAsync({
  secteur_activite: 'Plomberie',
  prix_vente: 200000,
  // ... autres champs requis
});
```

**Fonctionnalités:**
- ⚡ Affiche la création immédiatement
- ✅ ID temporaire puis remplacement par ID serveur
- ✅ Rollback si échec

### 4. `useInfiniteListings` - Pagination Infinie

```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteListings({ secteur: 'Électricité' });

// Toutes les pages combinées
const allListings = data?.pages.flatMap(page => page.data) || [];
```

**Fonctionnalités:**
- 📜 Scroll infini (20 items par page)
- ✅ Gestion automatique du curseur
- ✅ Compte total disponible
- ✅ États de chargement par page

### 5. `usePrefetchListing` - Préchargement

```tsx
const { prefetchListing } = usePrefetchListing();

// Précharge au hover pour navigation instantanée
<Card onMouseEnter={() => prefetchListing(listing.id)}>
```

**Fonctionnalités:**
- 🚀 Précharge avant navigation
- ✅ Détection hover automatique
- ✅ Cache intelligent

### 6. `useBatchUpdateListings` - Updates en Batch

```tsx
const batchUpdate = useBatchUpdateListings();

await batchUpdate.mutateAsync([
  { id: '1', prix_vente: 100000 },
  { id: '2', prix_vente: 200000 },
  { id: '3', prix_vente: 300000 },
]);
```

**Fonctionnalités:**
- 📦 Multiple updates en parallèle
- ✅ Gestion d'erreurs groupée
- ✅ Revalidation globale

## 🎯 Cas d'Usage Recommandés

### Liste Simple avec Filtres
```tsx
function ListingsPage() {
  const [filters, setFilters] = useState({ secteur: 'Maçonnerie' });
  const { data, isLoading } = useOptimizedListings(filters);
  
  if (isLoading) return <Skeleton />;
  
  return (
    <>
      <FilterBar onChange={setFilters} />
      {data?.map(listing => <ListingCard key={listing.id} {...listing} />)}
    </>
  );
}
```

### Update Optimiste (Favoris, Likes)
```tsx
function LikeButton({ listingId }) {
  const updateListing = useOptimisticUpdateListing();
  
  const handleLike = async () => {
    // UI réagit immédiatement
    await updateListing.mutateAsync({
      id: listingId,
      nombre_vues: currentViews + 1,
    });
  };
  
  return (
    <Button 
      onClick={handleLike}
      disabled={updateListing.isPending}
    >
      {updateListing.isPending ? '⏳' : '👍'}
    </Button>
  );
}
```

### Scroll Infini
```tsx
function InfiniteListingsPage() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteListings();
  
  return (
    <InfiniteScroll
      dataLength={data?.pages.flatMap(p => p.data).length || 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {data?.pages.flatMap(page => 
        page.data.map(listing => <ListingCard key={listing.id} {...listing} />)
      )}
    </InfiniteScroll>
  );
}
```

### Prefetch au Hover
```tsx
function ListingCard({ listing }) {
  const { prefetchListing } = usePrefetchListing();
  const navigate = useNavigate();
  
  return (
    <Card
      onMouseEnter={() => prefetchListing(listing.id)}
      onClick={() => navigate(`/listings/${listing.id}`)}
    >
      {/* Navigation instantanée car préchargé */}
    </Card>
  );
}
```

## 🔧 Configuration Avancée

### Personnaliser le Cache
```tsx
// Dans queryClient.ts
export const cacheStrategies = {
  static: {
    staleTime: 1000 * 60 * 60, // 1 heure
    gcTime: 1000 * 60 * 60 * 24, // 24 heures
  },
  dynamic: {
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  },
  realtime: {
    staleTime: 0, // Toujours refetch
    gcTime: 1000 * 60 * 5, // 5 minutes
  },
};
```

### Debugging
```tsx
import { logCacheStats, getCacheStats } from '@/lib/queryClient';

// Affiche stats dans console
logCacheStats();

// Obtient stats programmatiquement
const stats = getCacheStats();
console.log(stats.hitRate); // "75.5%"
```

## 📊 Métriques & Performance

### Hit Rate
Le hit rate indique le % de requêtes servies depuis le cache:
- **> 70%**: Excellent
- **50-70%**: Bon
- **< 50%**: À optimiser (augmenter staleTime)

### Memory Usage
- Surveillez `getCacheStats().total`
- Si > 1000 queries: ajustez `gcTime`
- Le garbage collector nettoie automatiquement

## ⚠️ Bonnes Pratiques

### ✅ À FAIRE
- Utiliser `useOptimizedListings` pour les listes
- Implémenter optimistic updates pour meilleure UX
- Prefetch au hover pour navigation rapide
- Monitorer le cache en dev avec `logCacheStats()`

### ❌ À ÉVITER
- Pas de `staleTime: 0` partout (tue le cache)
- Éviter les invalidations globales répétées
- Ne pas mélanger avec d'autres systèmes de cache
- Pas de polling si pas nécessaire (coûteux)

## 🚀 Tips Performance

1. **Prefetch Stratégique**: Préchargez les données avant qu'elles soient nécessaires
2. **Stale Time Adapté**: Augmentez pour données statiques, diminuez pour temps réel
3. **Pagination**: Utilisez infinite queries pour grandes listes
4. **Optimistic Updates**: Améliore drastiquement l'UX perçue

## 📖 Ressources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Optimistic Updates Guide](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [Infinite Queries](https://tanstack.com/query/latest/docs/react/guides/infinite-queries)
