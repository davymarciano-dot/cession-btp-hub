# Guide de Prerendering SEO - CessionBTP

## Score SEO Estimé

| Avant Prerendering | Après Prerendering |
|-------------------|-------------------|
| 720,000 / 1M      | 820,000 / 1M      |

**Gain estimé: +100,000 points**

## Qu'est-ce que le Prerendering?

Le prerendering génère des fichiers HTML statiques de vos pages React. Cela permet aux crawlers Google (qui n'exécutent pas toujours JavaScript) de voir le contenu complet de vos pages.

## Configuration Implémentée

### Fichiers créés:

1. **`scripts/prerender.config.ts`** - Configuration complète des routes à pré-rendre
2. **`scripts/prerender-build.js`** - Script de génération des pages statiques
3. **`vite.config.prerender.ts`** - Config Vite optimisée pour le prerendering

### Pages pré-rendues (priorité SEO):

- **18 pages principales** (home, vendre, entreprises, estimer, tarifs, blog, etc.)
- **6 pages secteur énergie** (photovoltaïque, pompe à chaleur, etc.)
- **50 pages métiers** (électricité, plomberie, chauffage, etc.)
- **100 combinaisons métier-ville** (électricité paris, plomberie lyon, etc.)
- **100 combinaisons métier-région**

**Total: ~275 pages pré-rendues**

## Comment utiliser

### Option 1: Prerendering basique (sans Puppeteer)

```bash
# 1. Build le projet
npm run build

# 2. Générer les pages statiques
node scripts/prerender-build.js
```

### Option 2: Prerendering complet avec Puppeteer

Pour un rendu JavaScript complet:

```bash
# Installer Puppeteer
npm install puppeteer

# Puis utiliser @prerenderer/renderer-puppeteer
```

### Option 3: Service externe (Prerender.io)

1. Créer un compte sur [prerender.io](https://prerender.io)
2. Ajouter le middleware à votre serveur
3. Les crawlers seront automatiquement servis avec du HTML pré-rendu

## Intégration Netlify

Ajoutez à `netlify.toml`:

```toml
[[plugins]]
  package = "@netlify/plugin-lighthouse"

[[headers]]
  for = "/*"
  [headers.values]
    X-Robots-Tag = "index, follow"

# Prerendering pour les bots
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/prerender"
  status = 200
  conditions = {User-Agent = ["googlebot", "bingbot", "yandex", "baiduspider", "facebookexternalhit", "twitterbot", "rogerbot", "linkedinbot", "embedly", "quora link preview", "showyoubot", "outbrain", "pinterest", "slackbot", "vkShare", "W3C_Validator"]}
```

## Vérification du Prerendering

### Test avec Google

1. Allez sur [Google Search Console](https://search.google.com/search-console)
2. Utilisez l'outil "Inspection d'URL"
3. Vérifiez que le contenu est visible sans JavaScript

### Test local

```bash
# Désactiver JavaScript dans Chrome DevTools
# Accéder au site et vérifier que le contenu s'affiche
```

### Test avec curl

```bash
curl -A "Googlebot" https://cessionbtp.fr/ | head -100
```

## Signal de Rendu

Le fichier `src/main.tsx` dispatch deux événements quand le rendu est terminé:

- `render-event` - Standard pour prerender.io
- `prerender-ready` - Standard pour react-snap

Les prerenderers attendent ces événements avant de capturer le HTML.

## Impact SEO Attendu

| Métrique | Avant | Après |
|----------|-------|-------|
| Pages indexables | ~20 | 275+ |
| Contenu visible sans JS | Non | Oui |
| Time to First Contentful Paint | 2-3s | <1s |
| Score Lighthouse SEO | 85 | 95+ |

## Prochaines Étapes pour 900,000+

1. ✅ Prerendering basique (implémenté)
2. ⬜ 50+ articles blog qualité
3. ⬜ Images WEBP + lazy load optimisé
4. ⬜ Vraies reviews clients
5. ⬜ Backlinks qualité (PR, partenariats)

## Support

Pour toute question sur le SEO, consultez:
- [Google Search Central](https://developers.google.com/search)
- [Prerender.io Documentation](https://prerender.io/documentation)
