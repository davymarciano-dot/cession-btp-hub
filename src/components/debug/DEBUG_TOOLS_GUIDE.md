# 🛠️ Guide des Outils de Debug TanStack Query

## 🎯 Deux outils complémentaires

### 1. **ReactQueryDevtools** (Officiel)
Outil officiel TanStack Query - Interface complète et puissante

**Position**: Coin inférieur gauche  
**Icône**: 🌸 (fleur TanStack)

#### Fonctionnalités
- 📊 **Explorer le cache** avec arborescence complète
- 🔍 **Inspecter chaque query** en détail
- ⏱️ **Timeline des requêtes** avec durées
- 🔄 **Actions avancées**: refetch, invalidate, remove
- 📝 **Logs détaillés** de toutes les opérations
- 🎨 **Thème sombre/clair**

#### Quand l'utiliser
- ✅ Debug approfondi d'une query spécifique
- ✅ Comprendre la structure du cache
- ✅ Voir l'historique des requêtes
- ✅ Tester les invalidations

### 2. **TanStackCacheDebugger** (Custom)
Notre composant custom - Vue rapide des métriques

**Position**: Coin inférieur droit  
**Icône**: 🔍

#### Fonctionnalités
- 📈 **Stats temps réel** (total, fresh, stale, active)
- 🎯 **Hit rate** du cache
- 💾 **Taille du cache** en KB
- ⚡ **Quick actions** (invalidate, clear)
- 📱 **Minimisable** pour ne pas gêner

#### Quand l'utiliser
- ✅ Monitoring continu pendant le dev
- ✅ Vérifier rapidement les performances
- ✅ Voir l'activité du cache en un coup d'œil
- ✅ Identifier des problèmes de cache

---

## 🎨 Interface

```
┌─────────────────────────┐         ┌──────────────────────┐
│ 🌸 ReactQuery DevTools  │         │ 🔍 Cache Debugger    │
│ (bottom-left)           │         │ (bottom-right)       │
│                         │         │                      │
│ • Explorer              │         │ Total:    10         │
│ • Query Details         │         │ Fresh:    8  🟢      │
│ • Timeline              │         │ Stale:    2  🟡      │
│ • Actions               │         │ Active:   0          │
│                         │         │                      │
│ [Detailed Tree View]    │         │ Hit Rate: 85% 🟢     │
└─────────────────────────┘         │ [Invalidate] [Clear] │
                                    └──────────────────────┘
```

---

## 🚀 Workflow de Debug Recommandé

### Étape 1: Vue d'ensemble (TanStackCacheDebugger)
1. Ouvrir le debugger custom (coin droit)
2. Observer les métriques globales:
   - Hit rate faible? → Problème de cache
   - Beaucoup de stale? → Ajuster staleTime
   - Beaucoup d'active? → Trop de refetchs

### Étape 2: Investigation (ReactQueryDevtools)
1. Ouvrir les DevTools officiels (coin gauche)
2. Explorer l'arbre des queries
3. Inspecter la query problématique
4. Voir son historique et ses mutations
5. Tester des actions (refetch, invalidate)

### Étape 3: Tests et Validation
1. Faire des changements dans le code
2. Observer en temps réel dans le debugger custom
3. Vérifier les détails dans les DevTools
4. Comparer les métriques avant/après

---

## 📊 Exemples de Scénarios

### Scénario 1: "Mes données ne se mettent pas à jour"

**Debugger Custom** → Hit rate à 100%, tout en "fresh"  
**Diagnostic**: staleTime trop long, données jamais refetch

**DevTools** → Ouvrir query → Voir "dataUpdatedAt" très ancien  
**Solution**: Réduire staleTime ou invalider manuellement

```tsx
// Avant
staleTime: 1000 * 60 * 60, // 1 heure

// Après
staleTime: 1000 * 60 * 2, // 2 minutes
```

### Scénario 2: "Trop de requêtes au serveur"

**Debugger Custom** → Indicateur jaune clignote constamment  
**Diagnostic**: Refetchs trop fréquents

**DevTools** → Timeline → Voir les refetchs multiples  
**Solution**: Désactiver refetchOnWindowFocus

```tsx
// Avant
refetchOnWindowFocus: true, // Par défaut

// Après
refetchOnWindowFocus: false, // Désactivé
```

### Scénario 3: "Le cache prend trop de mémoire"

**Debugger Custom** → Cache size > 1 MB  
**Diagnostic**: Trop de données conservées

**DevTools** → Explorer → Voir les grosses queries  
**Solution**: Réduire gcTime ou limiter les données

```tsx
// Avant
gcTime: 1000 * 60 * 60, // 1 heure

// Après
gcTime: 1000 * 60 * 10, // 10 minutes
```

### Scénario 4: "Une query spécifique échoue"

**Debugger Custom** → "Errors: 1"  
**Diagnostic**: Query en erreur

**DevTools** → Trouver la query rouge → Voir l'erreur  
**Solution**: Corriger la requête ou gérer l'erreur

---

## 🎯 Cheat Sheet Actions

### Dans ReactQueryDevtools
```
🔍 Explorer        → Voir toutes les queries
👁️ Inspect        → Détails d'une query
🔄 Refetch         → Force le refetch
❌ Remove          → Supprime du cache
♻️ Invalidate      → Marque comme stale
📊 Timeline        → Voir l'historique
```

### Dans TanStackCacheDebugger
```
+ Expand          → Voir les détails
− Collapse        → Masquer les détails
_ Minimize        → Réduire en icône
♻️ Invalidate All → Refetch toutes les queries
🗑️ Clear Cache    → Vider le cache
```

---

## 💡 Tips & Best Practices

### ✅ À FAIRE
- **Garder les deux outils ouverts** pendant le dev
- **Commencer par le debugger custom** pour vue d'ensemble
- **Utiliser DevTools** pour investigations approfondies
- **Comparer avant/après** vos optimisations
- **Monitorer le hit rate** continuellement

### ❌ À ÉVITER
- ❌ **Ne pas utiliser "Clear Cache"** en production
- ❌ **Ne pas invalider tout** à répétition
- ❌ **Ne pas ignorer** un hit rate < 50%
- ❌ **Ne pas garder** les DevTools ouverts en permanence (impact perf)

---

## 🔗 Raccourcis Clavier

### ReactQueryDevtools
```
Ctrl/Cmd + K     → Rechercher une query
Ctrl/Cmd + R     → Refetch query sélectionnée
Ctrl/Cmd + I     → Invalidate query sélectionnée
Escape           → Fermer les DevTools
```

---

## 📚 Ressources Complémentaires

- [TanStack Query DevTools Docs](https://tanstack.com/query/latest/docs/react/devtools)
- [Debugging Guide](https://tanstack.com/query/latest/docs/react/guides/debugging)
- [Performance Optimization](https://tanstack.com/query/latest/docs/react/guides/performance)

---

## 🎓 Formation Progressive

### Niveau 1: Débutant
1. Ouvrir les deux outils
2. Observer les stats pendant l'utilisation
3. Comprendre fresh vs stale
4. Tester quelques invalidations

### Niveau 2: Intermédiaire
1. Analyser le hit rate
2. Optimiser le staleTime
3. Utiliser la timeline
4. Comprendre le garbage collection

### Niveau 3: Avancé
1. Profiler les performances
2. Optimiser la taille du cache
3. Implémenter des stratégies custom
4. Monitorer en production (via analytics)

---

## 🚨 Troubleshooting

### "Je ne vois pas les DevTools"
- Vérifier que vous êtes en mode dev
- Vérifier `import.meta.env.DEV`
- Redémarrer le serveur de dev

### "Le debugger custom ne se met pas à jour"
- Vérifier la console pour erreurs
- Rafraîchir la page
- Vérifier que queryClient est bien configuré

### "Les deux outils se chevauchent"
- Minimiser un des deux
- Ajuster leur position dans le code
- Utiliser celui dont vous avez besoin

---

**Pro Tip**: Utilisez les deux outils ensemble pour un debugging optimal! 🚀

- 👈 **Gauche (ReactQueryDevtools)** = Investigation détaillée
- 👉 **Droite (TanStackCacheDebugger)** = Monitoring rapide
