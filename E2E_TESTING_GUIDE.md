# 🧪 Guide Complet des Tests E2E avec Playwright pour CessionBTP

## 📋 Vue d'Ensemble

Les tests End-to-End (E2E) simulent le comportement réel d'un utilisateur et garantissent que les fonctionnalités critiques fonctionnent correctement en production.

**Bénéfices clés :**
- ✅ Détection précoce des régressions avant déploiement
- 🚀 Confiance dans les mises à jour de code
- 🤖 Automatisation des tests manuels répétitifs
- 📊 Couverture des parcours utilisateurs critiques
- 💰 Réduction des bugs en production

---

## 🎯 Étape 1 : Installation de Playwright

### 1.1 Installer Playwright

```bash
npm init playwright@latest
```

**Options recommandées :**
- ✅ TypeScript
- ✅ `tests/` comme dossier
- ✅ GitHub Actions workflow
- ✅ Installation des navigateurs (Chromium, Firefox, WebKit)

### 1.2 Structure de fichiers créée

```
cessionbtp/
├── tests/
│   ├── example.spec.ts        # Tests d'exemple (à supprimer)
│   ├── auth.spec.ts           # Tests authentification
│   ├── sell-flow.spec.ts      # Tests formulaire vendeur
│   ├── estimation.spec.ts     # Tests estimation IA
│   └── messaging.spec.ts      # Tests messagerie
├── playwright.config.ts        # Configuration Playwright
└── package.json
```

---

## ⚙️ Étape 2 : Configuration

### 2.1 Configurer `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  // Timeout par test (30 secondes)
  timeout: 30 * 1000,
  
  // Nombre de tentatives en cas d'échec
  retries: process.env.CI ? 2 : 0,
  
  // Parallélisation des tests
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results.json' }]
  ],
  
  use: {
    // URL de base de l'application
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    
    // Traces en cas d'échec uniquement
    trace: 'on-first-retry',
    
    // Screenshots en cas d'échec
    screenshot: 'only-on-failure',
    
    // Vidéos en cas d'échec
    video: 'retain-on-failure',
  },

  // Configuration des navigateurs
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Tests mobile
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Serveur de développement local
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

---

## 🧪 Étape 3 : Écrire les Tests Critiques

### 3.1 Tests d'Authentification (`tests/auth.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test('Inscription nouveau vendeur', async ({ page }) => {
    await page.goto('/auth');
    
    // Cliquer sur l'onglet "Créer mon compte"
    await page.click('button:has-text("Créer mon compte")');
    
    // Remplir le formulaire d'inscription
    await page.selectOption('select[name="profil"]', 'Cédant propriétaire');
    await page.fill('input[type="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[placeholder*="Nom"]', 'Dupont');
    await page.fill('input[placeholder*="Prénom"]', 'Jean');
    await page.fill('input[placeholder*="Téléphone"]', '0612345678');
    await page.fill('input[placeholder*="Ville"]', 'Paris');
    await page.fill('input[placeholder*="Adresse"]', '10 rue de la Paix');
    
    // Accepter les CGU
    await page.check('input[type="checkbox"]');
    
    // Soumettre
    await page.click('button:has-text("Créer mon compte")');
    
    // Vérifier la redirection vers le dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
  });

  test('Connexion utilisateur existant', async ({ page }) => {
    await page.goto('/auth');
    
    // Remplir les identifiants
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    
    // Se connecter
    await page.click('button:has-text("Se connecter")');
    
    // Vérifier la connexion réussie
    await expect(page.locator('text=Dashboard')).toBeVisible({ timeout: 5000 });
  });

  test('Déconnexion', async ({ page }) => {
    // Se connecter d'abord
    await page.goto('/auth');
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    await page.click('button:has-text("Se connecter")');
    
    // Attendre le dashboard
    await page.waitForURL(/\/dashboard/);
    
    // Se déconnecter
    await page.click('button:has-text("Déconnexion")');
    
    // Vérifier la redirection
    await expect(page).toHaveURL('/');
  });
});
```

### 3.2 Tests Formulaire de Vente (`tests/sell-flow.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Flux de vente d\'entreprise', () => {
  test.beforeEach(async ({ page }) => {
    // Se connecter avant chaque test
    await page.goto('/auth');
    await page.fill('input[type="email"]', 'vendor@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    await page.click('button:has-text("Se connecter")');
    await page.waitForURL(/\/dashboard/);
  });

  test('Création d\'annonce complète - Formule Essentiel', async ({ page }) => {
    await page.goto('/vendre');
    
    // Section 1 : Coordonnées
    await page.selectOption('select[name="civilite"]', 'M.');
    await page.fill('input[name="nom_prenom"]', 'Jean Dupont');
    await page.fill('input[name="email"]', 'jean.dupont@example.com');
    await page.fill('input[name="telephone"]', '0612345678');
    await page.click('button:has-text("Suivant")');
    
    // Section 2 : Informations entreprise
    await page.fill('input[name="raison_sociale"]', 'Entreprise Test BTP');
    await page.selectOption('select[name="forme_juridique"]', 'SARL');
    await page.fill('input[name="siret"]', '12345678901234');
    await page.fill('input[name="secteur_activite"]', 'Maçonnerie');
    await page.fill('input[name="annee_creation"]', '2010');
    await page.fill('input[name="departement"]', '75');
    await page.fill('input[name="ville"]', 'Paris');
    await page.fill('input[name="code_postal"]', '75001');
    await page.click('button:has-text("Suivant")');
    
    // Section 3 : Activité
    await page.fill('textarea[name="description_activite"]', 
      'Entreprise spécialisée dans la maçonnerie générale avec une forte expertise en rénovation. ' +
      'Notre équipe expérimentée intervient sur des chantiers résidentiels et commerciaux. ' +
      'Nous disposons d\'un portefeuille client fidèle et d\'une excellente réputation locale.'
    );
    await page.click('button:has-text("Suivant")');
    
    // Section 4 : Données financières
    await page.fill('input[name="ca_n1"]', '500000');
    await page.fill('input[name="resultat_net_n1"]', '80000');
    await page.fill('input[name="prix_vente"]', '450000');
    await page.check('input[name="prix_negociable"]');
    await page.click('button:has-text("Suivant")');
    
    // Section 5 : Ressources humaines
    await page.fill('input[name="nombre_salaries"]', '8');
    await page.fill('input[name="nombre_cdi"]', '6');
    await page.fill('input[name="nombre_cdd"]', '2');
    await page.click('button:has-text("Suivant")');
    
    // Sections 6-14 : Remplissage rapide
    for (let i = 6; i <= 14; i++) {
      await page.click('button:has-text("Suivant")');
    }
    
    // Section 15 : Abonnement
    await page.click('button:has-text("Formule Essentiel")');
    
    // Cliquer sur "Publier mon annonce"
    await page.click('button:has-text("Publier mon annonce")');
    
    // Vérifier la redirection vers Stripe
    await expect(page).toHaveURL(/checkout\.stripe\.com/, { timeout: 10000 });
  });

  test('Sauvegarde brouillon automatique', async ({ page }) => {
    await page.goto('/vendre');
    
    // Remplir partiellement le formulaire
    await page.selectOption('select[name="civilite"]', 'M.');
    await page.fill('input[name="nom_prenom"]', 'Test Brouillon');
    
    // Attendre la sauvegarde automatique (si implémentée)
    await page.waitForTimeout(2000);
    
    // Recharger la page
    await page.reload();
    
    // Vérifier que les données sont conservées
    await expect(page.locator('input[name="nom_prenom"]')).toHaveValue('Test Brouillon');
  });
});
```

### 3.3 Tests Estimation IA (`tests/estimation.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Estimation IA', () => {
  test('Estimation complète avec RGE', async ({ page }) => {
    await page.goto('/estimation');
    
    // Question 1 : Secteur
    await page.fill('input[placeholder*="Rechercher"]', 'Isolation');
    await page.click('text=Isolation thermique');
    await page.click('button:has-text("Suivant")');
    
    // Question 2 : Département
    await page.selectOption('select', '75');
    await page.click('button:has-text("Suivant")');
    
    // Question 3 : Année création
    await page.fill('input[type="number"]', '2010');
    await page.click('button:has-text("Suivant")');
    
    // Questions 4-10 : Finances et effectifs
    await page.fill('input[name="ca_n1"]', '500000');
    await page.click('button:has-text("Suivant")');
    
    await page.fill('input[name="ca_n2"]', '480000');
    await page.click('button:has-text("Suivant")');
    
    await page.fill('input[name="resultat_n1"]', '80000');
    await page.selectOption('select[name="resultat_n1_type"]', 'positif');
    await page.click('button:has-text("Suivant")');
    
    await page.fill('input[name="resultat_n2"]', '75000');
    await page.selectOption('select[name="resultat_n2_type"]', 'positif');
    await page.click('button:has-text("Suivant")');
    
    await page.fill('input[name="nombre_employes"]', '8');
    await page.click('button:has-text("Suivant")');
    
    await page.fill('input[name="dettes_totales"]', '50000');
    await page.click('button:has-text("Suivant")');
    
    await page.check('input[value="non"]'); // Pas de crédits
    await page.click('button:has-text("Suivant")');
    
    // Question 11 : Certification RGE (BONUS +10%)
    await page.check('input[value="oui"]');
    await page.check('text=Isolation thermique');
    await page.click('button:has-text("Suivant")');
    
    // Question 12 : Partenariats financement (BONUS +5%)
    await page.check('input[value="oui"]');
    await page.check('text=Domofinance');
    await page.click('button:has-text("Obtenir mon estimation")');
    
    // Attendre les résultats IA
    await expect(page.locator('text=Estimation de votre entreprise')).toBeVisible({ timeout: 15000 });
    
    // Vérifier que les bonus sont affichés
    await expect(page.locator('text=Bonus RGE : +10%')).toBeVisible();
    await expect(page.locator('text=Bonus partenariats financement : +5%')).toBeVisible();
    
    // Vérifier que la valorisation est affichée
    await expect(page.locator('text=€').first()).toBeVisible();
  });

  test('Estimation sans bonus', async ({ page }) => {
    await page.goto('/estimation');
    
    // Remplir rapidement sans RGE ni partenariats
    const inputs = [
      { selector: 'input[placeholder*="Rechercher"]', value: 'Plomberie' },
      { selector: 'select', value: '69' },
      { selector: 'input[type="number"]', value: '2015' },
      { selector: 'input[name="ca_n1"]', value: '300000' },
      { selector: 'input[name="ca_n2"]', value: '280000' },
      { selector: 'input[name="resultat_n1"]', value: '50000' },
      { selector: 'input[name="resultat_n2"]', value: '45000' },
      { selector: 'input[name="nombre_employes"]', value: '5' },
      { selector: 'input[name="dettes_totales"]', value: '20000' },
    ];
    
    for (const input of inputs) {
      await page.fill(input.selector, input.value);
      await page.click('button:has-text("Suivant")');
    }
    
    // Pas de crédits
    await page.check('input[value="non"]');
    await page.click('button:has-text("Suivant")');
    
    // Pas de RGE
    await page.check('input[value="non"]');
    await page.click('button:has-text("Suivant")');
    
    // Pas de partenariats
    await page.check('input[value="non"]');
    await page.click('button:has-text("Obtenir mon estimation")');
    
    // Vérifier les résultats
    await expect(page.locator('text=Estimation de votre entreprise')).toBeVisible({ timeout: 15000 });
    
    // Vérifier que les bonus NE sont PAS affichés
    await expect(page.locator('text=Bonus RGE')).not.toBeVisible();
    await expect(page.locator('text=Bonus partenariats')).not.toBeVisible();
  });
});
```

### 3.4 Tests Messagerie (`tests/messaging.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Messagerie acheteur-vendeur', () => {
  test('Envoi d\'un message à un vendeur', async ({ page }) => {
    // Se connecter en tant qu'acheteur
    await page.goto('/auth');
    await page.fill('input[type="email"]', 'buyer@example.com');
    await page.fill('input[type="password"]', 'TestPassword123!');
    await page.click('button:has-text("Se connecter")');
    
    // Aller sur une annonce
    await page.goto('/entreprises');
    await page.click('.entreprise-card').first();
    
    // Cliquer sur "Contacter le vendeur"
    await page.click('button:has-text("Contacter le vendeur")');
    
    // Vérifier la redirection vers /messages
    await page.waitForURL(/\/messages/);
    
    // Envoyer un message
    await page.fill('textarea[placeholder*="message"]', 
      'Bonjour, je suis intéressé par votre entreprise. Pouvons-nous échanger ?'
    );
    await page.click('button:has-text("Envoyer")');
    
    // Vérifier que le message apparaît
    await expect(page.locator('text=je suis intéressé')).toBeVisible({ timeout: 3000 });
  });

  test('Réception d\'un message en temps réel', async ({ page, context }) => {
    // Ouvrir deux pages (vendeur et acheteur)
    const vendorPage = page;
    const buyerPage = await context.newPage();
    
    // Vendeur se connecte
    await vendorPage.goto('/auth');
    await vendorPage.fill('input[type="email"]', 'vendor@example.com');
    await vendorPage.fill('input[type="password"]', 'TestPassword123!');
    await vendorPage.click('button:has-text("Se connecter")');
    await vendorPage.goto('/messages');
    
    // Acheteur se connecte
    await buyerPage.goto('/auth');
    await buyerPage.fill('input[type="email"]', 'buyer@example.com');
    await buyerPage.fill('input[type="password"]', 'TestPassword123!');
    await buyerPage.click('button:has-text("Se connecter")');
    await buyerPage.goto('/messages');
    
    // Acheteur envoie un message
    await buyerPage.fill('textarea', 'Test message en temps réel');
    await buyerPage.click('button:has-text("Envoyer")');
    
    // Vendeur devrait recevoir le message instantanément (Supabase Realtime)
    await expect(vendorPage.locator('text=Test message en temps réel'))
      .toBeVisible({ timeout: 5000 });
  });
});
```

---

## 🚀 Étape 4 : Exécution des Tests

### 4.1 Lancer tous les tests

```bash
# Mode interactif avec UI
npx playwright test --ui

# Mode headless (sans interface)
npx playwright test

# Tests spécifiques
npx playwright test auth.spec.ts
npx playwright test estimation --headed

# Sur un navigateur spécifique
npx playwright test --project=chromium
```

### 4.2 Générer un rapport HTML

```bash
npx playwright test
npx playwright show-report
```

### 4.3 Déboguer un test

```bash
# Mode debug interactif
npx playwright test --debug

# Trace viewer pour analyser un échec
npx playwright show-trace trace.zip
```

---

## 📊 Étape 5 : Intégration CI/CD

### 5.1 GitHub Actions (`.github/workflows/e2e-tests.yml`)

```yaml
name: E2E Tests Playwright

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 20
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    
    - name: Run Playwright tests
      run: npx playwright test
      env:
        PLAYWRIGHT_BASE_URL: http://localhost:5173
    
    - name: Upload test results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
    
    - name: Upload traces
      uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: playwright-traces
        path: test-results/
        retention-days: 7
```

---

## 🎯 Checklist de Tests Critiques

### Tests Prioritaires (P0 - Bloquants)

- [ ] **Authentification** : Inscription, connexion, déconnexion
- [ ] **Formulaire de vente** : Création annonce jusqu'au paiement Stripe
- [ ] **Estimation IA** : Génération estimation avec bonus RGE/financement
- [ ] **Paiement Stripe** : Redirection checkout et confirmation paiement
- [ ] **Messagerie** : Envoi/réception messages en temps réel

### Tests Secondaires (P1 - Importants)

- [ ] **Recherche d'entreprises** : Filtres secteur/région/CA
- [ ] **Page détail annonce** : Affichage complet informations
- [ ] **Dashboard vendeur** : Consultation statistiques et annonces
- [ ] **Formulaire d'inscription complet** : Validation 10 champs
- [ ] **Navigation responsive** : Tests mobile (Pixel 5, iPhone 12)

### Tests Tertiaires (P2 - Nice-to-have)

- [ ] **Performance** : Temps de chargement < 3 secondes
- [ ] **Accessibilité** : Contraste, aria-labels, navigation clavier
- [ ] **SEO** : Balises meta, structured data
- [ ] **Offline** : Mode hors ligne PWA

---

## 🐛 Dépannage

### Problème : "Browser not found"
```bash
npx playwright install chromium
```

### Problème : "Timeout waiting for element"
**Solution** : Augmenter le timeout dans `playwright.config.ts` :
```typescript
timeout: 60 * 1000, // 60 secondes
```

### Problème : "Connection refused localhost:5173"
**Solution** : Vérifier que le serveur Vite tourne :
```bash
npm run dev
```

---

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Generator](https://playwright.dev/docs/codegen) - Générer des tests automatiquement

---

**✅ Une fois les tests E2E en place, vous aurez une garantie de qualité avant chaque déploiement !**
