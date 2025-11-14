# 🚀 Guide de Déploiement CessionBTP

## Vue d'ensemble

Ce projet utilise GitHub Actions pour automatiser le déploiement en production et la création d'aperçus pour les Pull Requests.

## Workflows Disponibles

### 1. `deploy.yml` - Déploiement Production
Déclenché automatiquement à chaque push sur `main`.

**Étapes:**
- ✅ Exécute les tests
- 🏗️ Build l'application
- 🚀 Déploie sur Vercel
- ⚡ Déploie les Edge Functions Supabase
- 📢 Notifie le statut du déploiement

### 2. `pr-preview.yml` - Aperçus PR
Crée un environnement de preview pour chaque Pull Request.

**Fonctionnalités:**
- 🔍 Preview URL unique par PR
- 💬 Commentaire automatique avec le lien
- ♻️ Mise à jour à chaque nouveau commit

### 3. `quality-checks.yml` - Vérifications Qualité
Exécute des vérifications de qualité du code.

**Analyses:**
- 🔍 Linting avec ESLint
- 📝 Vérification TypeScript
- 🔒 Audit de sécurité npm
- 📦 Analyse de la taille du bundle

## Configuration des Secrets GitHub

Pour activer les workflows, configurez ces secrets dans **Settings → Secrets and variables → Actions**:

### Secrets Supabase (Obligatoires)
```bash
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
VITE_SUPABASE_PROJECT_ID=xfxfblhxdlzivowodpeg
SUPABASE_ACCESS_TOKEN=sbp_xxx  # Token pour CLI Supabase
```

### Secrets Vercel (Pour déploiement Vercel)
```bash
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
```

### Secrets Netlify (Alternative à Vercel - optionnel)
```bash
NETLIFY_SITE_ID=xxx
NETLIFY_AUTH_TOKEN=xxx
```

## Obtenir les Tokens Nécessaires

### 1. Token Supabase Access
```bash
# Via Supabase CLI
supabase login
supabase access-token

# Ou via Dashboard Supabase:
# Settings → API → Generate new token
```

### 2. Token Vercel
```bash
# Via Dashboard Vercel:
# Settings → Tokens → Create Token
# Scope: Full Account

# Pour obtenir les IDs:
vercel project ls
```

### 3. Token Netlify
```bash
# Via Dashboard Netlify:
# User Settings → Applications → Personal Access Tokens
```

## Déploiement Manuel

### Via GitHub Actions UI
1. Accédez à l'onglet **Actions**
2. Sélectionnez le workflow `Deploy to Production`
3. Cliquez sur **Run workflow**
4. Choisissez la branche `main`
5. Cliquez sur **Run workflow**

### Via Vercel CLI (local)
```bash
# Installation
npm install -g vercel

# Login
vercel login

# Déploiement preview
vercel

# Déploiement production
vercel --prod
```

### Via Netlify CLI (local)
```bash
# Installation
npm install -g netlify-cli

# Login
netlify login

# Déploiement
netlify deploy --prod
```

## Stratégie de Branches

```
main (production)
  ├── develop (staging)
  │   ├── feature/nouvelle-fonctionnalite
  │   └── fix/correction-bug
  └── hotfix/correction-urgente
```

### Workflow Recommandé

1. **Nouvelle fonctionnalité**
   ```bash
   git checkout -b feature/ma-fonctionnalite
   git push origin feature/ma-fonctionnalite
   # Créer une PR vers develop
   ```

2. **Correction de bug**
   ```bash
   git checkout -b fix/mon-bug
   git push origin fix/mon-bug
   # Créer une PR vers develop
   ```

3. **Hotfix urgent**
   ```bash
   git checkout -b hotfix/correction-urgente
   git push origin hotfix/correction-urgente
   # Créer une PR directement vers main
   ```

## Surveillance Post-Déploiement

### Vérifications Automatiques
- ✅ Status codes HTTP (200)
- ⚡ Temps de chargement < 3s
- 🔒 Certificats SSL valides
- 📊 Métriques Vercel Analytics

### Monitoring Manuel
1. **Vercel Dashboard**: https://vercel.com/dashboard
2. **Supabase Dashboard**: https://supabase.com/dashboard
3. **GitHub Actions**: https://github.com/votre-repo/actions

## Rollback en Cas de Problème

### Via Vercel
```bash
# Lister les déploiements
vercel ls

# Promouvoir un déploiement antérieur
vercel promote <deployment-url>
```

### Via GitHub
1. Accédez à **Actions** → **Deploy to Production**
2. Trouvez le dernier déploiement réussi
3. Cliquez sur **Re-run jobs**

### Via Lovable (Recommandé)
1. Utilisez l'historique des versions intégré
2. Cliquez sur "Restore" sur la version stable
3. Le changement se synchronise automatiquement avec GitHub

## Variables d'Environnement par Environnement

### Production (main)
- URL complète avec domaine personnalisé
- Clés API de production
- Analytics activés

### Staging/Preview (PR)
- URL preview temporaire
- Clés API de test/staging
- Logging verbose activé

### Development (local)
```bash
# .env.local
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
```

## Troubleshooting

### Build échoue avec erreur TypeScript
```bash
# Vérifier localement
npm run build

# Ignorer les erreurs TypeScript (temporaire)
# Dans vite.config.ts:
export default defineConfig({
  build: {
    rollupOptions: {
      onwarn: () => {}
    }
  }
})
```

### Déploiement Vercel timeout
- Vérifier la taille du build (< 50MB)
- Optimiser les images et assets
- Utiliser le code splitting

### Edge Functions ne se déploient pas
```bash
# Vérifier les logs Supabase
supabase functions list
supabase functions logs <function-name>

# Redéployer manuellement
supabase functions deploy --project-ref xxx
```

## Optimisations Recommandées

### Performance
- ⚡ Lazy loading des routes
- 🖼️ Optimisation d'images (WebP)
- 📦 Code splitting par route
- 🗜️ Compression Gzip/Brotli

### SEO
- 🔍 Meta tags dynamiques
- 🗺️ Sitemap.xml généré
- 🤖 Robots.txt configuré
- 📊 Analytics intégré

### Sécurité
- 🔒 Headers de sécurité (CSP, HSTS)
- 🛡️ Rate limiting sur APIs
- 🔐 Secrets dans GitHub Actions
- ✅ Audit npm automatique

## Support

Pour toute question sur le déploiement:
- 📧 Email: tech@cessionbtp.fr
- 💬 Discord: [Lien du serveur]
- 📚 Documentation: https://docs.cessionbtp.fr

## Changelog

### v1.0.0 (2025-01-14)
- ✅ Configuration initiale des workflows
- 🚀 Déploiement automatique sur Vercel
- ⚡ Intégration Supabase Edge Functions
- 🔍 PR Previews automatiques
