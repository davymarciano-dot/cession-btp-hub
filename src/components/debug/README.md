# 🔍 TanStack Query Cache Debugger

Un composant de debugging visuel pour monitorer et contrôler le cache TanStack Query en temps réel.

## 🎯 Fonctionnalités

### Vue d'ensemble
- **Total Queries**: Nombre total de queries en cache
- **Fresh**: Données fraîches (dans leur staleTime)
- **Stale**: Données périmées (hors staleTime)
- **Active**: Queries en cours de fetch

### Métriques de Performance
- **Hit Rate**: % de queries servies depuis le cache (> 70% = excellent)
- **Avg Age**: Âge moyen des données en secondes
- **Cache Size**: Taille totale du cache en KB
- **Errors**: Nombre de queries en erreur

### Détails des Queries
Vue détaillée de chaque query avec:
- Clé de la query (queryKey)
- État (fresh/stale)
- Taille des données
- Nombre d'observateurs (composants qui l'utilisent)
- Dernière mise à jour

### Actions
- **Invalidate All**: Force le refetch de toutes les queries
- **Clear Cache**: Vide complètement le cache

## 📱 Interface

```
┌─────────────────────────────────┐
│ 🔍 TanStack Query Cache    🟢   │
├─────────────────────────────────┤
│  [10]   [8]    [2]    [0]       │
│ Total  Fresh  Stale  Active     │
├─────────────────────────────────┤
│ Hit Rate:        85%            │
│ Avg Age:         45s            │
│ Cache Size:      127 KB         │
│ Errors:          0              │
├─────────────────────────────────┤
│ [Query Details]                 │
│ ┌─────────────────────────────┐ │
│ │ ['listings', {...}]         │ │
│ │ ✅ Fresh • 12 KB • 👁️ 3    │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [♻️ Invalidate] [🗑️ Clear]    │
└─────────────────────────────────┘
```

## 🚀 Utilisation

### Automatic (déjà intégré)

Le debugger est automatiquement ajouté à l'application en mode développement:

```tsx
// Dans App.tsx
<TanStackCacheDebugger />
```

Il apparaît en bas à droite de l'écran et peut être:
- ✅ Minimisé (clic sur "_")
- ✅ Développé pour voir les détails (clic sur "+")
- ✅ Utilisé pour invalider ou vider le cache

### Production

Le composant ne s'affiche **jamais en production**:

```tsx
if (import.meta.env.PROD) return null;
```

## 🎨 États Visuels

### Indicateur d'activité
- 🟢 **Vert fixe**: Aucune query en cours
- 🟡 **Jaune clignotant**: Queries en cours de fetch

### Badges de couleur
- 🟢 **Vert**: Fresh queries, bon hit rate (> 70%)
- 🟡 **Jaune**: Stale queries, hit rate moyen (50-70%)
- 🔴 **Rouge**: Erreurs, mauvais hit rate (< 50%)

## 📊 Interprétation des Métriques

### Hit Rate
```
> 80%  = 🟢 Excellent - Cache très efficace
60-80% = 🟡 Bon - Optimisations possibles
< 60%  = 🔴 Faible - Augmenter staleTime
```

### Avg Age
```
< 30s  = 🟢 Données très fraîches
30-60s = 🟡 Fraîcheur normale
> 60s  = 🔴 Données anciennes (si problématique)
```

### Cache Size
```
< 100 KB  = 🟢 Léger
100-500KB = 🟡 Moyen
> 500 KB  = 🔴 Lourd (vérifier si nécessaire)
```

## 🛠️ Actions de Debug

### Invalidate All
Force le refetch de toutes les queries:
- ✅ Utile après un changement de données important
- ⚠️ Peut causer plusieurs requêtes simultanées
- 💡 Mieux: invalider seulement les queries concernées

```tsx
// Préférer l'invalidation ciblée
invalidateQueries.listings(); // Seulement les listings
```

### Clear Cache
Vide complètement le cache:
- ⚠️ Force le refetch de TOUTES les données
- 💡 Utile pour tester le comportement sans cache
- 🚫 À éviter en utilisation normale

## 🎯 Cas d'Usage

### 1. Vérifier l'efficacité du cache
Observez le hit rate pendant l'utilisation normale:
- Hit rate faible → augmenter `staleTime`
- Beaucoup de queries stale → réduire `staleTime`

### 2. Débugger les refetchs inutiles
Si vous voyez l'indicateur jaune clignoter trop souvent:
- Vérifiez `refetchOnWindowFocus`
- Ajustez `staleTime` pour vos queries
- Désactivez le polling inutile

### 3. Optimiser la taille du cache
Si le cache devient trop grand:
- Réduisez `gcTime` pour les données peu utilisées
- Limitez le nombre de pages en infinite scroll
- Nettoyez les queries obsolètes

### 4. Identifier les queries problématiques
Dans les détails:
- Queries avec 0 observateurs → peuvent être nettoyées
- Queries très grosses (> 100KB) → paginer ou limiter
- Queries toujours stale → revoir la stratégie de cache

## 📝 Exemples

### Scénario 1: Hit rate faible
```
Symptôme: Hit rate à 45%
Cause: staleTime trop court
Solution: Augmenter staleTime dans queryClient.ts
```

### Scénario 2: Trop de refetchs
```
Symptôme: Indicateur jaune clignote constamment
Cause: refetchOnWindowFocus activé
Solution: Désactiver ou ajuster refetchOnWindowFocus
```

### Scénario 3: Cache trop lourd
```
Symptôme: Cache > 1 MB
Cause: Trop de données conservées
Solution: Réduire gcTime ou limiter les queries
```

## 🔗 Ressources

- [TanStack Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- [Cache Optimization Guide](https://tanstack.com/query/latest/docs/react/guides/caching)
- [Performance Best Practices](https://tanstack.com/query/latest/docs/react/guides/performance)

## 💡 Tips

1. **Gardez-le ouvert pendant le dev** pour comprendre le comportement du cache
2. **Surveillez le hit rate** pour optimiser les performances
3. **Utilisez les détails** pour identifier les queries problématiques
4. **Minimisez-le** s'il gêne l'UI pendant les tests
5. **Comparez avant/après** vos optimisations de cache
