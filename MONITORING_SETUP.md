# 📊 Guide Configuration Monitoring - CessionBTP

## ✅ DÉJÀ IMPLÉMENTÉ

### Analytics Tracking (Google Analytics)
Le tracking des événements est prêt dans `src/lib/analytics.ts` et intégré dans les pages clés.

**Pour activer :**
1. Créer un compte Google Analytics 4 : https://analytics.google.com
2. Créer une propriété GA4 pour CessionBTP
3. Copier votre Measurement ID (format: `G-XXXXXXXXXX`)
4. Remplacer `GA_MEASUREMENT_ID` dans `src/components/Analytics.tsx` ligne 6
5. Ajouter le composant `<GoogleAnalytics />` dans `src/main.tsx` (dans le `<head>`)

**Événements trackés :**
- ✅ Clics boutons CTA homepage (Vendre/Acheter/Estimer)
- ✅ Progression formulaire estimation (étapes + soumission)
- ✅ Progression formulaire vente (étapes + abonnement)
- ✅ Vues et filtres des annonces
- ✅ Détails entreprises + contact vendeur
- ✅ Inscriptions (avec type acheteur/vendeur)
- ✅ Paiements Stripe (begin_checkout + purchase)

### System Health Dashboard
Accessible sur `/admin/health` - Monitoring temps réel de :
- ✅ Connexion Supabase
- ✅ Tables base de données
- ✅ Authentification
- ✅ Storage (bucket company-listings)

---

## 🔴 À CONFIGURER MANUELLEMENT

### 1. Sentry - Monitoring des Erreurs

**Pourquoi Sentry ?**
- Détection automatique des erreurs en production
- Stack traces complètes
- Contexte utilisateur (page, actions, navigateur)
- Alertes email en temps réel
- Plan gratuit : 5 000 événements/mois

**Installation :**
```bash
npm install @sentry/react
```

**Configuration :**
1. Créer compte sur https://sentry.io (gratuit)
2. Créer un projet React
3. Copier votre DSN (format: `https://xxx@xxx.ingest.sentry.io/xxx`)
4. Ajouter le secret dans Backend → Secrets :
   - Nom: `SENTRY_DSN`
   - Valeur: Votre DSN Sentry

5. Créer `src/lib/sentry.ts` :
```typescript
import * as Sentry from "@sentry/react";

export const initSentry = () => {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      tracesSampleRate: 1.0, // 100% des transactions
      replaysSessionSampleRate: 0.1, // 10% des sessions
      replaysOnErrorSampleRate: 1.0, // 100% des erreurs
    });
  }
};
```

6. Appeler dans `src/main.tsx` :
```typescript
import { initSentry } from "@/lib/sentry";

initSentry(); // Avant le render
```

**Test :**
```typescript
// Déclencher une erreur test
throw new Error("Test Sentry");
```

---

### 2. Uptime Monitoring - Surveillance 24/7

**Options recommandées :**

#### Option A : UptimeRobot (Gratuit)
- 50 moniteurs gratuits
- Vérification toutes les 5 minutes
- Alertes email/SMS/Slack
- Dashboard public

**Configuration :**
1. Créer compte : https://uptimerobot.com
2. Ajouter moniteur HTTP(S)
3. URL à surveiller : `https://[votre-url].lovableproject.com`
4. Configurer alertes email

#### Option B : Better Uptime (Plus avancé)
- Monitoring global multi-régions
- Page de statut publique
- Incident management
- Plan gratuit : 10 moniteurs

**Configuration :**
1. Créer compte : https://betterstack.com/better-uptime
2. Créer moniteur pour votre URL
3. Configurer page de statut publique

---

### 3. Performance Monitoring

**Lighthouse CI (Gratuit)**

Mesure automatique des performances à chaque déploiement.

**Configuration :**
1. Installer : `npm install -D @lhci/cli`
2. Créer `lighthouserc.json` :
```json
{
  "ci": {
    "collect": {
      "url": ["https://[votre-url].lovableproject.com"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.7}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

3. Ajouter script dans `package.json` :
```json
"scripts": {
  "lighthouse": "lhci autorun"
}
```

---

## 📧 Alertes Email Automatiques

### Configuration Supabase Webhooks

Pour être notifié des événements critiques :

1. Backend → Database → Webhooks
2. Créer webhook :
   - **Nom** : "Alert Admin Errors"
   - **Table** : `automation_logs`
   - **Événement** : INSERT
   - **Condition** : `status = 'error'`
   - **URL** : Service email (voir ci-dessous)

### Services d'alerte email recommandés :

#### Option A : Zapier (Simple)
1. Créer Zap : Webhook → Email
2. URL webhook à utiliser dans Supabase

#### Option B : Make.com (Plus puissant)
1. Créer scénario : Webhook → Email
2. Conditions personnalisables

#### Option C : Custom Edge Function
Créer `supabase/functions/send-alert-email/index.ts` utilisant Resend.

---

## 🎯 KPIs à Surveiller (Dashboard Quotidien)

### Technique (via /admin/health)
- ✅ Uptime : >99%
- ✅ Temps réponse DB : <500ms
- ❌ Taux erreurs Sentry : <1%
- ❌ Performance Lighthouse : >70

### Business (via Google Analytics)
- Visiteurs uniques/jour
- Inscriptions/jour (objectif : 5+)
- Annonces publiées/semaine (objectif : 3+)
- Taux conversion inscription→annonce (objectif : 30%)
- Success rate paiements Stripe (objectif : >95%)

### À surveiller dans Stripe Dashboard
- Paiements réussis vs échoués
- Montant total transactions
- Disputes/chargebacks

---

## 🚨 Seuils d'Alerte

| Métrique | 🟢 Normal | 🟡 Attention | 🔴 Critique |
|----------|-----------|--------------|-------------|
| Uptime | >99% | 95-99% | <95% |
| Temps réponse | <500ms | 500ms-2s | >2s |
| Erreurs Sentry | <10/jour | 10-50/jour | >50/jour |
| Inscriptions | >3/jour | 1-3/jour | <1/jour |
| Success paiements | >95% | 85-95% | <85% |

---

## ✅ Checklist Configuration Monitoring

### Avant Lancement
- [ ] Google Analytics configuré avec Measurement ID
- [ ] Tester événements GA dans console (`gtag` events)
- [ ] Vérifier `/admin/health` fonctionne
- [ ] Documenter contacts urgence

### Semaine 1 Post-Lancement
- [ ] Configurer Sentry + tester erreur
- [ ] Configurer UptimeRobot ou Better Uptime
- [ ] Configurer alertes email webhook Supabase
- [ ] Run Lighthouse CI + vérifier scores

### Semaine 2-4
- [ ] Analyser données GA + optimiser conversion
- [ ] Revoir erreurs Sentry + fix critiques
- [ ] Optimiser performance si Lighthouse <70
- [ ] Configurer backup automatique DB (voir EMERGENCY_PROCEDURES.md)

---

## 📞 Contacts Support

- **Sentry Support** : https://sentry.io/support/
- **Google Analytics Help** : https://support.google.com/analytics
- **UptimeRobot Support** : support@uptimerobot.com
- **Lovable Support** : Ouvrir ticket dans dashboard

---

**Dernière mise à jour** : 2025-11-18
