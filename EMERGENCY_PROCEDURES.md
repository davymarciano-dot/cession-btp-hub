# 🚨 PROCÉDURES D'URGENCE - CessionBTP

## 📞 Contacts Urgence

- **Support Lovable**: Ouvrir ticket dans dashboard
- **Status Supabase**: https://status.supabase.com
- **Status Stripe**: https://status.stripe.com
- **CEO/Responsable**: [À COMPLÉTER]

---

## 🔴 INCIDENT CRITIQUE

### ⚡ Site complètement inaccessible

**Diagnostic rapide:**
```bash
1. Ouvrir https://[votre-url].lovableproject.com/admin/health
2. Si page ne charge pas → Problème infrastructure
3. Si page charge → Checker les statuts des services
```

**Actions immédiates:**
1. ✅ Vérifier status Lovable/Netlify
2. ✅ Checker status Supabase (https://status.supabase.com)
3. ✅ Tester en navigation privée (cache?)
4. ✅ Regarder logs Lovable/Netlify

**Rollback d'urgence:**
```bash
1. Dans Lovable: History → Sélectionner version stable
2. Cliquer "Restore"
3. Attendre 2-3 minutes
4. Tester l'app
```

---

## 🟠 PROBLÈMES COURANTS

### 1. 🔐 Connexion/Inscription ne fonctionne pas

**Symptômes:**
- Erreur "Email already exists"
- Redirection vers localhost
- "Invalid redirect URL"

**Solution:**
```bash
1. Ouvrir dashboard backend
2. Aller dans Auth → Configuration
3. Vérifier "Site URL" = URL production
4. Vérifier "Redirect URLs" contient:
   - https://[votre-url].lovableproject.com/*
   - https://[domaine-custom].com/* (si configuré)
5. Sauvegarder
```

**Alternative temporaire:**
- Désactiver confirmation email dans Auth settings

---

### 2. 💳 Paiement Stripe échoue

**Symptômes:**
- Erreur au checkout
- Paiement réussi mais annonce non créée
- "Payment failed"

**Diagnostic:**
```bash
1. Ouvrir Stripe Dashboard
2. Aller dans Developers → Webhooks
3. Vérifier webhook actif:
   URL: https://[projet].supabase.co/functions/v1/verify-payment
   Events: checkout.session.completed
4. Tester avec carte test: 4242 4242 4242 4242
```

**Actions:**
```bash
1. Checker logs edge function verify-payment
2. Vérifier table annonces pour dernières insertions
3. Si webhook manquant → Le recréer
4. Rembourser client si nécessaire
```

---

### 3. 🤖 Estimation IA ne répond pas

**Symptômes:**
- Loading infini
- Erreur "Failed to generate estimation"
- Timeout

**Solution:**
```bash
1. Checker edge function logs: generate-estimation
2. Vérifier crédit Lovable AI disponible
3. Tester manuellement l'edge function
4. Si timeout → Augmenter délai ou simplifier prompt
```

**Alternative:**
- Utiliser formule de calcul simplifiée temporaire
- Afficher message "Service temporairement indisponible"

---

### 4. 💬 Messagerie ne se met pas à jour

**Symptômes:**
- Messages n'apparaissent pas en temps réel
- "Failed to send message"

**Solution:**
```bash
1. Vérifier Realtime activé sur table messages
2. Checker RLS policies sur conversations + messages
3. Tester avec 2 comptes différents
4. Vider cache navigateur
```

---

### 5. 📤 Upload photos échoue

**Symptômes:**
- "Failed to upload"
- Photos ne s'affichent pas

**Solution:**
```bash
1. Vérifier bucket "company-listings" existe
2. Checker policies Storage
3. Vérifier taille fichier < 5MB
4. Tester avec autre format (JPG vs PNG)
```

---

## 🟡 PROBLÈMES NON-CRITIQUES

### Performances lentes

**Diagnostic:**
```bash
1. Ouvrir DevTools → Network
2. Identifier requêtes lentes (>1s)
3. Checker Lighthouse score
```

**Solutions rapides:**
- Augmenter cache duration
- Lazy load plus agressif
- Réduire taille images

---

### Erreurs 404

**Solution:**
```bash
1. Vérifier routes dans App.tsx
2. Checker redirections
3. Mettre à jour liens Footer/Header
```

---

## 📋 CHECKLIST POST-INCIDENT

Après chaque incident, compléter:

```bash
□ Incident documenté (date, heure, durée)
□ Cause racine identifiée
□ Solution appliquée
□ Tests de régression effectués
□ Monitoring renforcé sur zone à risque
□ Équipe informée
□ Users impactés notifiés (si applicable)
□ Post-mortem rédigé
```

---

## 🔧 OUTILS DE DEBUG

### Vérification Système
```
https://[url]/admin/health
```

### Logs Backend
```
1. Ouvrir Backend dans Lovable
2. Edge Functions → Logs
3. Database → Logs
```

### Logs Frontend
```
F12 → Console
```

---

## 🎯 MÉTRIQUES CRITIQUE

### Seuils d'alerte

| Métrique | Seuil Normal | ⚠️ Attention | 🚨 Critique |
|----------|--------------|--------------|-------------|
| Uptime | >99% | <99% | <95% |
| Temps réponse | <500ms | >1s | >3s |
| Taux erreur | <1% | >2% | >5% |
| Inscriptions/j | >3 | <3 | <1 |
| Success paiements | >95% | <95% | <85% |

---

## 📱 COMMUNICATION CRISE

### Template email utilisateurs
```
Objet: [CessionBTP] Incident technique résolu

Bonjour,

Nous avons rencontré un incident technique entre [heure début] et [heure fin] qui a pu affecter [fonctionnalité].

Le problème est maintenant résolu. Vos données sont en sécurité.

En compensation, nous vous offrons [geste commercial si applicable].

Merci de votre compréhension.

L'équipe CessionBTP
```

---

## 🔄 BACKUP & RESTORE

### Backup Base de Données
```bash
1. Backend → Database → Tables
2. Sélectionner table → Export CSV
3. Répéter pour tables critiques:
   - annonces
   - profiles
   - estimations
   - conversations
```

### Restore données
```bash
1. Backend → Database → SQL Editor
2. Importer backup SQL ou CSV
3. Vérifier données restaurées
4. Tester fonctionnalités
```

---

## 📚 RESSOURCES

- [Documentation Lovable](https://docs.lovable.dev)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)
- [Status page setup guide](https://docs.lovable.dev/production)

---

**⚠️ IMPORTANT:** Ce document doit être mis à jour après chaque incident majeur avec les learnings.
