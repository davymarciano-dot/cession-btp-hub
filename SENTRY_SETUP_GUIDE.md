# 🚨 Guide Complet d'Intégration Sentry pour CessionBTP

## 📋 Vue d'Ensemble

Sentry est un outil de monitoring d'erreurs en production essentiel pour détecter et résoudre rapidement les bugs avant qu'ils n'affectent vos utilisateurs.

**Bénéfices clés :**
- ✅ Détection automatique des erreurs en temps réel
- 🔍 Stack traces détaillées avec contexte utilisateur
- 📊 Tableaux de bord de santé de l'application
- 🔔 Alertes instantanées sur Slack/Email
- 📈 Suivi des performances et ralentissements

---

## 🎯 Étape 1 : Création du Compte Sentry

1. **Créer un compte gratuit** sur [sentry.io](https://sentry.io/signup/)
   - Le plan gratuit offre **5,000 erreurs/mois** (suffisant pour démarrer)
   - Pas de carte bancaire requise

2. **Créer un nouveau projet**
   - Sélectionner **"React"** comme plateforme
   - Nommer le projet : `cessionbtp-production`
   - Copier le **DSN** fourni (clé d'accès unique)

---

## ⚙️ Étape 2 : Installation

### 2.1 Installer les packages Sentry

```bash
npm install --save @sentry/react @sentry/vite-plugin
```

### 2.2 Ajouter la variable d'environnement

Créer un fichier `.env.local` à la racine du projet :

```bash
# Sentry Configuration
VITE_SENTRY_DSN=https://VOTRE_CLE_ICI@o4506123456789.ingest.sentry.io/4506987654321
VITE_SENTRY_AUTH_TOKEN=sntrys_VOTRE_TOKEN_ICI
```

**⚠️ IMPORTANT** : Ne jamais commiter ce fichier ! Ajouter à `.gitignore` :
```
.env.local
.env.production.local
```

---

## 🔧 Étape 3 : Configuration du Code

### 3.1 Initialiser Sentry dans `src/main.tsx`

Remplacer le contenu actuel par :

```typescript
import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { prefetchCriticalData } from "./lib/queryClient";
import * as Sentry from "@sentry/react";

// 🚨 INITIALISATION SENTRY - À configurer en production uniquement
if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    
    // Performance Monitoring
    tracesSampleRate: 1.0, // 100% des transactions (réduire à 0.1 en production haute charge)
    
    // Session Replay - Enregistre les sessions avec erreurs
    replaysSessionSampleRate: 0.1, // 10% des sessions normales
    replaysOnErrorSampleRate: 1.0, // 100% des sessions avec erreurs
    
    // Environnement
    environment: import.meta.env.MODE,
    
    // Filtrer les erreurs non critiques
    beforeSend(event, hint) {
      // Ignorer les erreurs de développement
      if (event.request?.url?.includes('localhost')) {
        return null;
      }
      
      // Ignorer les erreurs réseau temporaires
      const error = hint.originalException as Error;
      if (error?.message?.includes('NetworkError')) {
        return null;
      }
      
      return event;
    },
  });
}

// Précharger les données critiques au démarrage
prefetchCriticalData();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

### 3.2 Wrapper les routes avec Sentry dans `src/App.tsx`

```typescript
import * as Sentry from "@sentry/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ... autres imports

// Créer un ErrorBoundary Sentry
const SentryRoutes = Sentry.withSentryRouting(Routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SentryRoutes>
          <Route path="/" element={<Index />} />
          {/* ... autres routes */}
        </SentryRoutes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Sentry.withProfiler(App);
```

### 3.3 Configurer Vite pour les Source Maps

Modifier `vite.config.ts` :

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    
    // 🚨 SENTRY SOURCE MAPS - Production uniquement
    mode === 'production' && sentryVitePlugin({
      org: "votre-org-sentry",
      project: "cessionbtp-production",
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
      sourcemaps: {
        assets: "./dist/**",
        filesToDeleteAfterUpload: "./dist/**/*.map",
      },
    }),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    sourcemap: true, // Générer les source maps pour Sentry
  },
}));
```

---

## 🧪 Étape 4 : Tester l'Intégration

### 4.1 Créer une page de test

Créer `src/pages/TestSentry.tsx` :

```typescript
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/react";

export default function TestSentry() {
  const testError = () => {
    throw new Error("🚨 Test Sentry : Erreur volontaire pour vérification !");
  };

  const testCapturedError = () => {
    try {
      throw new Error("Erreur capturée manuellement");
    } catch (error) {
      Sentry.captureException(error);
      console.log("Erreur envoyée à Sentry !");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Test Sentry</h1>
        <Button onClick={testError}>
          Déclencher une erreur non gérée
        </Button>
        <Button onClick={testCapturedError} variant="secondary">
          Capturer une erreur manuellement
        </Button>
      </div>
    </div>
  );
}
```

### 4.2 Ajouter la route de test

Dans `src/App.tsx` :

```typescript
<Route path="/test-sentry" element={<TestSentry />} />
```

### 4.3 Vérifier dans Sentry

1. Aller sur [sentry.io](https://sentry.io) → Votre projet
2. Cliquer sur les boutons de test
3. Vérifier que les erreurs apparaissent dans **Issues**
4. Consulter les **replays de session** (si activés)

---

## 📊 Étape 5 : Surveiller en Production

### 5.1 Configurer les alertes

Dans Sentry Dashboard :
- **Alerts** → **Create Alert Rule**
- Déclencher sur : `When the issue is first seen`
- Envoyer vers : Email, Slack, Discord

### 5.2 Créer des métriques personnalisées

```typescript
import * as Sentry from "@sentry/react";

// Exemple : Tracker les transactions réussies
Sentry.addBreadcrumb({
  category: "transaction",
  message: "Paiement Stripe réussi",
  level: "info",
  data: {
    montant: "290€",
    formule: "Essentiel"
  }
});

// Exemple : Définir le contexte utilisateur
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.full_name
});

// Exemple : Tracker les performances critiques
const transaction = Sentry.startTransaction({
  name: "Chargement page Entreprises",
  op: "pageload"
});

// ... code
transaction.finish();
```

---

## 🎛️ Configuration Avancée (Optionnel)

### Filtrer les erreurs spécifiques

```typescript
Sentry.init({
  // ... config
  ignoreErrors: [
    // Ignorer les erreurs de plugins tiers
    /^Non-Error promise rejection captured/,
    /Script error/,
    // Ignorer les erreurs réseau temporaires
    /NetworkError/,
    /Failed to fetch/,
  ],
});
```

### Ajouter des tags personnalisés

```typescript
Sentry.setTag("page_locale", "fr-FR");
Sentry.setTag("user_plan", "Premium");
```

---

## 📈 Métriques à Surveiller

| Métrique | Seuil Critique | Action |
|----------|----------------|--------|
| **Taux d'erreur** | > 5% | Investiguer immédiatement |
| **Erreurs JavaScript** | > 10/heure | Analyser les plus fréquentes |
| **Temps de chargement** | > 3 secondes | Optimiser performances |
| **Issues non résolues** | > 20 | Sprint de bug fixes |

---

## 🚀 Checklist de Déploiement

- [ ] Compte Sentry créé et projet configuré
- [ ] Variables d'environnement ajoutées (`.env.local`)
- [ ] Code Sentry intégré dans `main.tsx` et `App.tsx`
- [ ] Source maps configurées dans `vite.config.ts`
- [ ] Tests effectués avec `/test-sentry`
- [ ] Alertes Slack/Email configurées
- [ ] Documentation partagée avec l'équipe
- [ ] Suppression de la route `/test-sentry` en production

---

## 🆘 Dépannage

### Problème : "Sentry DSN non défini"
**Solution** : Vérifier que `VITE_SENTRY_DSN` est bien dans `.env.local`

### Problème : "Source maps non uploadées"
**Solution** : Vérifier `VITE_SENTRY_AUTH_TOKEN` et les permissions du token

### Problème : "Trop d'erreurs (quota dépassé)"
**Solution** : Réduire `tracesSampleRate` à `0.1` (10%)

---

## 📚 Ressources

- [Documentation officielle Sentry React](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Meilleures pratiques Sentry](https://docs.sentry.io/product/sentry-basics/best-practices/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)

---

**✅ Une fois Sentry configuré, vous aurez une visibilité complète sur la santé de votre application en production !**
