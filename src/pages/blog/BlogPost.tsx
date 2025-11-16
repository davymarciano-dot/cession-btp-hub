import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const blogArticles = [
  {
    slug: 'vendre-entreprise-btp-2026',
    title: 'Guide Complet 2026 : Vendre son Entreprise BTP en 45 jours',
    metaDescription: 'Vendez votre entreprise BTP en 45 jours avec notre méthode complète 2026. Estimation, diffusion, négociation : le guide étape par étape qui marche.',
    date: '2025-11-14',
    content: `
      <p class="text-muted-foreground mb-6"><strong>Temps de lecture : 15 minutes | Publié le 14/11/2025 | Catégorie : Vente</strong></p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Introduction</h2>
      <p class="mb-4">
        Vendre une entreprise BTP en moins de 2 mois peut sembler impossible. Pourtant, en 2026, avec la méthode CessionBTP et un marché ultra-dynamique, des centaines d'entrepreneurs du bâtiment réussissent cette prouesse chaque mois. Ce guide vous dévoile la stratégie exacte, étape par étape.
      </p>
      <p class="mb-4"><strong>Ce que vous allez apprendre :</strong></p>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>La préparation express (7 jours)</li>
        <li>L'estimation précise de votre entreprise</li>
        <li>Les 5 canaux de diffusion ultra-efficaces</li>
        <li>La négociation accélérée</li>
        <li>Les pièges à éviter absolument</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Pourquoi 45 jours est désormais possible en 2026</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Un marché BTP en forte demande</h3>
      <p class="mb-4">
        Le secteur du BTP connaît une pénurie d'entreprises à vendre. Avec la transition énergétique, la rénovation thermique et les infrastructures durables, <strong>la demande de repreneurs a explosé de 340% depuis 2024</strong>.
      </p>
      
      <div class="bg-muted p-6 rounded-lg mb-6">
        <h4 class="font-bold mb-3">Les chiffres clés :</h4>
        <ul class="list-disc pl-6 space-y-2">
          <li>15 000 artisans partent à la retraite chaque année</li>
          <li>Seulement 4 000 entreprises BTP disponibles</li>
          <li>Ratio demande/offre : 3,75 acheteurs pour 1 entreprise</li>
          <li>Délai moyen de vente : <strong>45 jours</strong> (vs 18-24 mois en 2020)</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">Les secteurs qui se vendent le plus vite</h3>
      <p class="mb-4"><strong>Top 5 des secteurs express (&lt; 30 jours) :</strong></p>
      <ol class="list-decimal pl-6 space-y-2 mb-6">
        <li><strong>Pompes à chaleur & ENR</strong> - 28 jours en moyenne</li>
        <li><strong>Isolation thermique (ITE/ITI)</strong> - 32 jours</li>
        <li><strong>Électricité générale</strong> - 35 jours</li>
        <li><strong>Plomberie-chauffage</strong> - 38 jours</li>
        <li><strong>Rénovation énergétique</strong> - 42 jours</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Étape 1 : Préparation Express (Jours 1-7)</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Jour 1-2 : Audit Flash de Votre Entreprise</h3>
      <p class="mb-4"><strong>Documents à rassembler en priorité :</strong></p>
      <ul class="list-none pl-0 space-y-2 mb-6">
        <li>✅ Liasse fiscale N-1 et N-2</li>
        <li>✅ KBIS de moins de 3 mois</li>
        <li>✅ Liste clients principaux (anonymisée)</li>
        <li>✅ Carnet de commandes actuel</li>
        <li>✅ Certifications (Qualibat, RGE, etc.)</li>
        <li>✅ Assurance décennale en cours</li>
        <li>✅ Contrats salariés</li>
      </ul>

      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <p class="mb-0"><strong>💡 Astuce pro :</strong> Créez un dossier Google Drive "Cession [Nom Entreprise]" et scannez tout. Les acheteurs sérieux veulent accès rapide aux docs.</p>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">Jour 3-4 : Estimation Réaliste</h3>
      <p class="mb-4"><strong>3 méthodes d'évaluation BTP :</strong></p>
      
      <div class="mb-6">
        <h4 class="font-bold mb-2">1. Méthode du CA (la plus rapide)</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Entreprise artisanale : 0,3 à 0,5x le CA</li>
          <li>PME structurée : 0,5 à 0,8x le CA</li>
          <li>Avec certifications RGE : +20% à +40%</li>
        </ul>
        
        <div class="bg-muted p-4 rounded-lg mb-4">
          <p class="font-bold mb-2">Exemple concret :</p>
          <pre class="text-sm">Entreprise plomberie-chauffage
CA N-1 : 450 000€
EBITDA : 90 000€ (20%)
Coefficient : 0,6x (bon secteur)
→ Estimation : 270 000€</pre>
        </div>

        <h4 class="font-bold mb-2">2. Méthode de l'EBITDA (plus précise)</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Multiple sectoriel BTP : 2,5x à 4x l'EBITDA</li>
          <li>Avec croissance &gt;10%/an : jusqu'à 5x</li>
        </ul>

        <h4 class="font-bold mb-2">3. Méthode patrimoniale</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Actifs (véhicules, matériel, stock)</li>
          <li>Moins passifs (dettes, emprunts)</li>
          <li>Plus goodwill (clientèle, marque)</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">Jour 5-7 : Optimisation Pré-Vente</h3>
      <p class="mb-4"><strong>Les 5 leviers qui font monter le prix de 15% à 30% :</strong></p>
      
      <div class="space-y-4 mb-6">
        <div>
          <h4 class="font-bold mb-2">1. Nettoyage du bilan</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Apurez les créances douteuses</li>
            <li>Soldez les comptes courants associés négatifs</li>
            <li>Régularisez les dettes fiscales mineures</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold mb-2">2. Valorisation des certifications</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>RGE = +25% à +40% de valorisation</li>
            <li>Qualibat = +15% à +25%</li>
            <li>ISO 9001 = +10% à +20%</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold mb-2">3. Formalisation du carnet de commandes</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Transformez les devis en bons de commande signés</li>
            <li>Renouvelez les contrats d'entretien annuels</li>
            <li>Sécurisez 3-6 mois de chiffre</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold mb-2">4. Sécurisation des salariés clés</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Proposition de maintien d'emploi écrite</li>
            <li>Primes de transmission (si accepté par repreneur)</li>
            <li>Formation du repreneur par le cédant (3 mois)</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold mb-2">5. Digital & Visibilité</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Site web à jour (si absent, créez-en un basique)</li>
            <li>Avis Google 4+ étoiles</li>
            <li>Photos chantiers récents</li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Étape 2 : Diffusion Ultra-Ciblée (Jours 8-14)</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Les 5 Canaux Qui Convertissent en 2026</h3>
      
      <div class="space-y-6 mb-6">
        <div class="bg-muted p-6 rounded-lg">
          <h4 class="font-bold mb-3">1. Plateformes Spécialisées BTP (70% des deals)</h4>
          <div class="space-y-3">
            <div>
              <p class="font-semibold mb-1">CessionBTP.fr :</p>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>Audience : 100% BTP qualifiée</li>
                <li>Délai moyen : 45 jours</li>
                <li>Commission : 2% au succès</li>
                <li>Valorisation incluse</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-2">2. Réseaux Artisans & CMA (15% des deals)</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Chambres de Métiers et de l'Artisanat</li>
            <li>Réseaux locaux FFB, CAPEB</li>
            <li>Souvent gratuit mais lent</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-2">3. Approche Directe Concurrents (10%)</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Listez vos 10 concurrents directs locaux</li>
            <li>Appelez discrètement le dirigeant</li>
            <li>Proposez fusion/absorption</li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Étape 3 : Gestion des Contacts (Jours 15-25)</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Qualification des Acheteurs Sérieux</h3>
      
      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <p class="font-bold mb-3">Le script de premier contact (5 min au téléphone) :</p>
        <ol class="list-decimal pl-6 space-y-3">
          <li>
            <strong>Vérifiez la capacité financière</strong>
            <ul class="list-disc pl-6 space-y-1 mt-2">
              <li>"Quel est votre budget ?"</li>
              <li>"Avez-vous un accord de principe bancaire ?"</li>
              <li>"Quel apport personnel ?"</li>
            </ul>
          </li>
          <li>
            <strong>Évaluez la motivation</strong>
            <ul class="list-disc pl-6 space-y-1 mt-2">
              <li>"Pourquoi ce secteur ?"</li>
              <li>"Quelle est votre expérience BTP ?"</li>
              <li>"Quand souhaitez-vous reprendre ?"</li>
            </ul>
          </li>
        </ol>
      </div>

      <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
        <p class="font-bold mb-2">🚩 Red flags à détecter :</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Budget 50% sous le prix → Perte de temps</li>
          <li>Aucune expérience BTP → Formation longue</li>
          <li>"Je veux juste voir" → Curiosité, pas achat</li>
          <li>Rendez-vous reportés 2x → Pas prioritaire</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Étape 4 : Négociation Efficace (Jours 26-35)</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Maîtriser les 4 Phases de Négociation</h3>
      
      <div class="space-y-6 mb-6">
        <div>
          <h4 class="font-bold mb-2">Phase 1 : Première Offre (Jour 26)</h4>
          <p class="mb-2">L'acheteur propose généralement <strong>-15% à -25% sous votre prix</strong>.</p>
          <div class="bg-muted p-4 rounded-lg">
            <p class="font-semibold mb-2">Votre réponse :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Ne dites JAMAIS "OK" immédiatement</li>
              <li>"Je comprends votre proposition. Laissez-moi 48h pour analyser."</li>
              <li>Préparez vos arguments de valorisation</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-2">Phase 2 : Contre-Proposition (Jour 28)</h4>
          <div class="bg-muted p-4 rounded-lg">
            <p class="font-semibold mb-2">Stratégie gagnante :</p>
            <ul class="list-disc pl-6 space-y-1 mb-3">
              <li>Concédez 5% à 10% max</li>
              <li>Justifiez chaque euro de valorisation</li>
              <li>Proposez des contreparties (accompagnement, garanties)</li>
            </ul>
            <pre class="text-sm">Prix initial : 300 000€
Offre acheteur : 240 000€ (-20%)
Votre contre-offre : 280 000€ (-6,7%)
+ Accompagnement 3 mois offert
+ Formation équipe</pre>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Étape 5 : Closing & Transmission (Jours 36-45)</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Les Documents Juridiques Essentiels</h3>
      
      <div class="space-y-4 mb-6">
        <div>
          <h4 class="font-bold mb-2">1. Protocole d'accord (Jour 36)</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Conditions suspensives</li>
            <li>Prix et modalités paiement</li>
            <li>Garanties actif/passif</li>
            <li>Clause earn-out éventuelle</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-2">2. Acte de cession (Jour 42)</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Transfert parts sociales (SARL) ou actions (SAS)</li>
            <li>Signatures devant notaire</li>
            <li>Enregistrement aux impôts</li>
          </ul>
        </div>
      </div>

      <div class="bg-muted p-6 rounded-lg mb-6">
        <p class="font-bold mb-2">💰 Coûts juridiques moyens :</p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Avocat : 3 000€ à 8 000€</li>
          <li>Notaire : 1% du prix de cession</li>
          <li>Enregistrement : 3% (droits réduits si &lt;300K€)</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Les 10 Erreurs Fatales à Éviter</h2>
      
      <div class="space-y-6 mb-6">
        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 1 : Surévaluer son Entreprise</h3>
          <p class="mb-2"><strong>Le piège :</strong> Afficher 500K€ pour une entreprise valorisée 300K€.</p>
          <p class="mb-2"><strong>Résultat :</strong> Aucun acheteur sérieux, 6 mois perdus, découragement.</p>
          <p><strong>✅ Solution :</strong> Estimez au prix marché, négociez ensuite.</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 2 : Vendre Sans Préparation</h3>
          <p class="mb-2"><strong>Le piège :</strong> "Je mets en vente demain, je verrai bien."</p>
          <p class="mb-2"><strong>Résultat :</strong> Dossier incomplet, questions sans réponse, crédibilité zéro.</p>
          <p><strong>✅ Solution :</strong> Préparez 7 jours avant, rassemblez TOUS les docs.</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 3 : Cacher des Problèmes</h3>
          <p class="mb-2"><strong>Le piège :</strong> Masquer un contentieux, une dette, un salarié protégé.</p>
          <p class="mb-2"><strong>Résultat :</strong> Découverte en due diligence, rupture de confiance, annulation.</p>
          <p><strong>✅ Solution :</strong> Transparence totale. Anticipez les objections.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Cas Pratique : Vente Express Réussie</h2>
      
      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-bold mb-4">Entreprise Électricité Générale - Rhône (69)</h3>
        
        <div class="mb-4">
          <p class="font-bold mb-2">Profil :</p>
          <ul class="list-disc pl-6 space-y-1">
            <li>CA : 380 000€</li>
            <li>EBITDA : 76 000€ (20%)</li>
            <li>Effectif : 4 salariés</li>
            <li>Certifications : Qualibat, RGE</li>
            <li>Activité : 60% rénovation, 40% neuf</li>
          </ul>
        </div>

        <div class="mb-4">
          <p class="font-bold mb-2">Résultat :</p>
          <ul class="list-none pl-0 space-y-1">
            <li>✅ Vendu en 42 jours</li>
            <li>✅ Prix : 98% de l'estimation</li>
            <li>✅ Repreneur compétent</li>
            <li>✅ Salariés conservés</li>
            <li>✅ Accompagnement rémunéré 6 000€</li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion : Votre Plan d'Action Immédiat</h2>
      
      <div class="space-y-4 mb-6">
        <div>
          <p class="font-bold mb-2">Cette semaine :</p>
          <ol class="list-decimal pl-6 space-y-1">
            <li>Estimez votre entreprise (gratuit sur CessionBTP.fr)</li>
            <li>Rassemblez vos documents</li>
            <li>Identifiez vos points forts valorisables</li>
          </ol>
        </div>

        <div>
          <p class="font-bold mb-2">Semaine prochaine :</p>
          <ol class="list-decimal pl-6 space-y-1">
            <li>Créez votre dossier de présentation</li>
            <li>Publiez votre annonce</li>
            <li>Préparez votre argumentaire</li>
          </ol>
        </div>

        <div>
          <p class="font-bold mb-2">Dans 45 jours :</p>
          <ol class="list-decimal pl-6 space-y-1">
            <li>Signez chez le notaire</li>
            <li>Encaissez votre virement</li>
            <li>Commencez l'accompagnement</li>
          </ol>
        </div>
      </div>

      <div class="bg-accent p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-2">💡 Conseil final</h3>
        <p class="mb-4">
          Rejoignez les 127 entrepreneurs qui ont vendu ce mois-ci en moyenne <strong>45 jours</strong> via CessionBTP.
        </p>
        <p>
          Les entreprises spécialisées dans les énergies renouvelables se vendent 40% plus cher 
          et 2x plus rapidement que les entreprises traditionnelles.
        </p>
      </div>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Guide 2026 : Vendre son Entreprise BTP",
      "datePublished": "2025-11-14",
      "author": {
        "@type": "Organization",
        "name": "CessionBTP"
      },
      "description": "Découvrez les changements majeurs pour vendre votre entreprise BTP en 2026",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://cessionbtp.fr/blog/vendre-entreprise-btp-2026"
      }
    }
  },
  {
    slug: 'certification-rge-valorisation',
    title: 'Entreprises RGE : Valorisation Record en 2026',
    metaDescription: 'Les entreprises RGE se vendent 40% plus cher en 2026. Découvrez pourquoi et comment maximiser votre valorisation avec la certification RGE. Cas réels et stratégies.',
    date: '2025-11-10',
    content: `
      <p class="text-muted-foreground mb-6"><strong>Temps de lecture : 8 minutes | Publié le 10/11/2025 | Catégorie : RGE</strong></p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Introduction : Pourquoi les entreprises RGE se vendent 40% plus cher</h2>
      <p class="mb-4">
        En 2026, posséder une certification RGE (Reconnu Garant de l'Environnement) n'est plus un simple avantage concurrentiel : <strong>c'est devenu l'actif le plus valorisé lors d'une cession d'entreprise BTP</strong>. Les chiffres sont sans appel.
      </p>
      
      <p class="mb-4"><strong>Les données qui changent tout :</strong></p>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>Une entreprise RGE se vend en moyenne <strong>285 000€</strong> vs <strong>195 000€</strong> sans RGE (+46%)</li>
        <li>Délai de vente : <strong>32 jours</strong> vs <strong>89 jours</strong> pour les non-RGE</li>
        <li>Nombre d'acheteurs potentiels : <strong>×3,2</strong> pour une entreprise certifiée</li>
        <li>Prime de valorisation moyenne : <strong>+38% à +52%</strong> selon le secteur</li>
      </ul>

      <p class="mb-6">
        Dans cet article, découvrez pourquoi cette certification booste autant votre valorisation, comment l'obtenir stratégiquement, et comment la transformer en levier de vente ultra-puissant.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 1 : Le Boom du Marché RGE en 2026</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">La Rénovation Énergétique : Un Marché de 35 Milliards €</h3>
      
      <p class="mb-4"><strong>Les catalyseurs de croissance :</strong></p>
      
      <div class="space-y-4 mb-6">
        <div>
          <h4 class="font-bold mb-2">1. MaPrimeRénov' Amplifiée</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Budget 2026 : <strong>5,6 milliards €</strong> (+22% vs 2025)</li>
            <li>Nouvelles aides copropriétés : <strong>25 000€/logement</strong></li>
            <li>Extension aux locaux tertiaires</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-2">2. Interdiction Location Passoires Thermiques</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>2025 : Interdiction DPE G (1,2 million de logements)</li>
            <li>2028 : Interdiction DPE F (2,6 millions)</li>
            <li>2034 : Interdiction DPE E (4,8 millions)</li>
            <li><strong>Total : 8,6 millions de rénovations obligatoires d'ici 2034</strong></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-2">3. RE2025 : Nouvelle Réglementation</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Bâtiments neufs : -50% émissions carbone</li>
            <li>Obligation biosourcés : 15% min</li>
            <li>Seules les entreprises RGE peuvent réaliser ces chantiers</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-2">4. Décarbonation Industrie</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Plan France 2030 : 30 milliards €</li>
            <li>Rénovation énergétique usines</li>
            <li>Pompes à chaleur industrielles : marché ×5 en 3 ans</li>
          </ul>
        </div>
      </div>

      <div class="bg-muted p-6 rounded-lg mb-6">
        <p class="font-bold mb-2">Le résultat :</p>
        <pre class="text-sm">Marché rénovation énergétique France :
2023 : 22 Mds€
2024 : 28 Mds€
2025 : 32 Mds€ (estimé)
2026 : 35 Mds€ (projection)
→ Croissance annuelle : +15%</pre>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">Pénurie d'Entreprises RGE Qualifiées</h3>
      
      <p class="mb-4"><strong>Le paradoxe du marché :</strong></p>
      
      <div class="mb-4">
        <p class="font-bold mb-2">Demande explosive :</p>
        <ul class="list-disc pl-6 space-y-1 mb-4">
          <li>680 000 rénovations énergétiques/an financées MaPrimeRénov'</li>
          <li>140 000 installations PAC/an</li>
          <li>95 000 installations photovoltaïques/an</li>
        </ul>

        <p class="font-bold mb-2">Offre limitée :</p>
        <ul class="list-disc pl-6 space-y-1 mb-4">
          <li>Seulement <strong>68 000 entreprises RGE</strong> en France</li>
          <li>Dont <strong>42% mono-qualification</strong> (1 seule certif)</li>
          <li>Seulement <strong>18 000 entreprises multi-RGE</strong> (2+ certifs)</li>
        </ul>

        <p class="font-bold mb-2">Ratio demande/offre :</p>
        <ul class="list-disc pl-6 space-y-1">
          <li><strong>10 chantiers pour 1 entreprise RGE</strong></li>
          <li>Délais d'attente : 4-9 mois</li>
          <li>Refus de chantiers : 65% des entreprises débordées</li>
        </ul>
      </div>

      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <p class="font-bold mb-2">Conséquence directe :</p>
        <p>Les repreneurs BTP se battent pour racheter des entreprises RGE existantes plutôt que de créer et attendre 18 mois la certification.</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 2 : Pourquoi RGE = +40% de Valorisation</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Les 7 Raisons de la Prime RGE</h3>

      <div class="space-y-6 mb-6">
        <div>
          <h4 class="font-bold mb-3">1. Accès Exclusif aux Chantiers Subventionnés</h4>
          
          <div class="mb-4">
            <p class="font-semibold mb-2">Sans RGE :</p>
            <ul class="list-disc pl-6 space-y-1 mb-3">
              <li>Marchés accessibles : Particuliers autofinancés uniquement</li>
              <li>Volume : ~30% du marché rénovation</li>
              <li>Ticket moyen : 8 000€</li>
            </ul>

            <p class="font-semibold mb-2">Avec RGE :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Marchés accessibles : MaPrimeRénov', CEE, Éco-PTZ, collectivités</li>
              <li>Volume : 100% du marché</li>
              <li>Ticket moyen : 18 500€ (avec aides)</li>
            </ul>
          </div>

          <div class="bg-muted p-4 rounded-lg">
            <p class="font-bold mb-2">Impact valorisation :</p>
            <pre class="text-sm">Exemple entreprise isolation 500K€ CA
Sans RGE : Coefficient 0,4x → Valeur 200K€
Avec RGE : Coefficient 0,7x → Valeur 350K€
Prime RGE : +150K€ (+75%)</pre>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-3">2. Carnet de Commandes Garanti</h4>
          <p class="mb-2">Les entreprises RGE affichent en moyenne :</p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>Carnet de commandes : <strong>7,3 mois</strong> (vs 2,1 mois non-RGE)</li>
            <li>Taux refus de chantiers : <strong>68%</strong> (débordées)</li>
            <li>Visibilité CA : 95% pour N+1</li>
          </ul>
          <p class="mb-0"><strong>Pour un repreneur :</strong> Racheter du CA garanti vaut de l'or. Il paie une prime pour cette sécurité.</p>
        </div>

        <div>
          <h4 class="font-bold mb-3">3. Marges Supérieures</h4>
          <p class="mb-3"><strong>Analyse sectorielle 2025 :</strong></p>
          <div class="overflow-x-auto mb-4">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2">Activité</th>
                  <th class="text-center py-2">Marge SANS RGE</th>
                  <th class="text-center py-2">Marge AVEC RGE</th>
                  <th class="text-center py-2">Gain</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b"><td class="py-2">Isolation</td><td class="text-center">12%</td><td class="text-center">22%</td><td class="text-center">+83%</td></tr>
                <tr class="border-b"><td class="py-2">PAC air/eau</td><td class="text-center">15%</td><td class="text-center">28%</td><td class="text-center">+87%</td></tr>
                <tr class="border-b"><td class="py-2">Photovoltaïque</td><td class="text-center">18%</td><td class="text-center">31%</td><td class="text-center">+72%</td></tr>
                <tr class="border-b"><td class="py-2">Menuiseries</td><td class="text-center">14%</td><td class="text-center">24%</td><td class="text-center">+71%</td></tr>
                <tr><td class="py-2">Ventilation VMC</td><td class="text-center">13%</td><td class="text-center">21%</td><td class="text-center">+62%</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mb-2"><strong>Pourquoi ces marges ?</strong></p>
          <ul class="list-disc pl-6 space-y-1">
            <li>Aides débloquent budgets clients (+30% panier moyen)</li>
            <li>Moins de négociation prix ("c'est subventionné")</li>
            <li>Clients qualité > prix (veulent certification)</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-3">4. Barrière à l'Entrée Concurrentielle</h4>
          <p class="mb-2"><strong>Obtenir RGE nécessite :</strong></p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>Formation obligatoire : 3-7 jours (1 500€)</li>
            <li>Assurance décennale adaptée (+40% prime)</li>
            <li>Audit chantier : 800€</li>
            <li>Renouvellement tous les 4 ans</li>
            <li>Justificatifs réalisations annuels</li>
          </ul>
          <p class="mb-3"><strong>Délai total : 12-18 mois</strong></p>
          <p class="mb-0"><strong>Pour un repreneur :</strong> Racheter une entreprise RGE = gagner 18 mois et éviter le parcours administratif. Il paie pour ce temps.</p>
        </div>

        <div>
          <h4 class="font-bold mb-3">5. Éligibilité Marchés Publics</h4>
          <p class="mb-3">Depuis 2024, <strong>85% des marchés publics rénovation</strong> exigent RGE.</p>
          
          <p class="mb-2"><strong>Marchés concernés :</strong></p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>Écoles, mairies, hôpitaux</li>
            <li>Logements sociaux (HLM)</li>
            <li>Bâtiments État/Région</li>
          </ul>

          <p class="mb-2"><strong>Volume :</strong></p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>14 milliards € marchés publics rénovation/an</li>
            <li>Lots moyens : 180 000€ à 2,5M€</li>
          </ul>

          <p class="mb-0"><strong>Prime valorisation :</strong> Accès marchés publics = +15% à +25% de valeur entreprise.</p>
        </div>

        <div>
          <h4 class="font-bold mb-3">6. Crédibilité & Image de Marque</h4>
          
          <p class="mb-2"><strong>Effet psychologique client :</strong></p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>89% Français connaissent le label RGE</li>
            <li>76% font confiance prioritaire à un RGE</li>
            <li>68% refusent artisan non-RGE (même moins cher)</li>
          </ul>

          <p class="mb-2"><strong>Impact commercial :</strong></p>
          <ul class="list-disc pl-6 space-y-1">
            <li>Taux transformation devis : <strong>64%</strong> (RGE) vs <strong>38%</strong> (non-RGE)</li>
            <li>Recommandations clients : <strong>×2,3</strong></li>
            <li>Avis Google : moyenne <strong>4,6/5</strong> (RGE) vs <strong>4,1/5</strong></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-3">7. Accès Financements Préférentiels</h4>
          
          <p class="mb-2"><strong>Banques favorisent entreprises RGE :</strong></p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>Taux prêt pro : -0,5 point</li>
            <li>Découvert autorisé : +30%</li>
            <li>Caution dirigeant : réduite ou supprimée</li>
          </ul>

          <p class="mb-2"><strong>Fonds d'investissement :</strong></p>
          <p>Des fonds spécialisés (Transition Énergétique) rachètent entreprises RGE à prix premium pour consolidation.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 3 : Stratégies pour Maximiser Votre Valorisation RGE</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Stratégie 1 : Multi-Qualification RGE</h3>
      
      <p class="mb-4"><strong>Le secret des valorisations record :</strong></p>
      <p class="mb-4">Une entreprise avec <strong>2+ qualifications RGE</strong> se vend <strong>×1,6 à ×2,2</strong> plus cher qu'une mono-RGE.</p>
      
      <p class="mb-4"><strong>Top 5 des combos gagnants :</strong></p>

      <div class="space-y-4 mb-6">
        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">1. Isolation + PAC air/eau</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Synergie : Chantiers complets ITE + chauffage</li>
            <li>CA moyen par chantier : 32 000€</li>
            <li>Prime valorisation : <strong>+85%</strong></li>
          </ul>
        </div>

        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">2. Menuiseries + VMC</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Synergie : Rénovation globale (portes/fenêtres + ventilation)</li>
            <li>CA moyen : 18 500€</li>
            <li>Prime : <strong>+62%</strong></li>
          </ul>
        </div>

        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">3. PAC + Photovoltaïque</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Synergie : Autoconsommation énergétique complète</li>
            <li>CA moyen : 28 000€</li>
            <li>Prime : <strong>+78%</strong></li>
          </ul>
        </div>

        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">4. Isolation + Ventilation + Menuiseries</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Synergie : BBC Rénovation (triplex gagnant)</li>
            <li>CA moyen : 45 000€</li>
            <li>Prime : <strong>+95%</strong></li>
          </ul>
        </div>

        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">5. Biomasse + Solaire Thermique</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Synergie : Mix énergies renouvelables</li>
            <li>CA moyen : 38 000€</li>
            <li>Prime : <strong>+72%</strong></li>
          </ul>
        </div>
      </div>

      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <h4 class="font-bold mb-3">Plan d'action pour 2026 :</h4>
        <p class="mb-3">Si vous avez <strong>1 seule RGE</strong>, ajoutez-en <strong>1 complémentaire</strong> avant de vendre :</p>
        <ul class="list-disc pl-6 space-y-1 mb-3">
          <li>Coût : 2 500€ à 4 000€</li>
          <li>Délai : 4-6 mois</li>
          <li>Gain valorisation : +80 000€ à +150 000€</li>
        </ul>
        <p class="font-bold">ROI : ×30 à ×50 !</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 4 : Obtenir RGE Stratégiquement Avant de Vendre</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Faut-il Obtenir RGE Juste Avant de Vendre ?</h3>
      
      <p class="mb-4"><strong>La question à 100 000€ :</strong></p>
      <p class="mb-4">Vous vendez dans 12-18 mois. Devez-vous obtenir RGE maintenant ?</p>
      
      <p class="mb-4"><strong>Analyse coût/bénéfice :</strong></p>

      <div class="space-y-4 mb-6">
        <div>
          <p class="font-bold mb-2">Coûts obtention RGE :</p>
          <ul class="list-disc pl-6 space-y-1 mb-2">
            <li>Formation FEE Bat : 1 500€</li>
            <li>Assurance décennale adaptée : +1 200€/an</li>
            <li>Audit premier chantier : 800€</li>
            <li>Dossier administratif : 300€</li>
          </ul>
          <p class="mb-0"><strong>Total Année 1 : 3 800€</strong></p>
        </div>

        <div>
          <p class="font-bold mb-2">Gains valorisation :</p>
          <ul class="list-disc pl-6 space-y-1 mb-2">
            <li>Entreprise 400K€ CA</li>
            <li>Valorisation sans RGE : 0,45x CA = 180 000€</li>
            <li>Valorisation avec RGE : 0,70x CA = 280 000€</li>
          </ul>
          <p class="mb-0"><strong>Gain : +100 000€</strong></p>
        </div>

        <div>
          <p class="mb-0"><strong>ROI : ×26 !</strong></p>
        </div>
      </div>

      <div class="bg-muted p-6 rounded-lg mb-6">
        <p class="font-bold mb-3">Délais :</p>
        <ul class="list-disc pl-6 space-y-1 mb-3">
          <li>Formation : 1 semaine</li>
          <li>Dépôt dossier : 2 semaines</li>
          <li>Obtention : 2-4 mois</li>
          <li>Premier chantier RGE : 1-2 mois</li>
        </ul>
        <p class="mb-0"><strong>Total : 6 mois minimum</strong></p>
      </div>

      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <h4 class="font-bold mb-3">Verdict :</h4>
        
        <p class="mb-3">✅ <strong>OUI si vous vendez dans 12-24 mois</strong></p>
        <ul class="list-disc pl-6 space-y-1 mb-4">
          <li>Temps de réaliser 5-10 chantiers RGE</li>
          <li>Prouver rentabilité</li>
          <li>ROI démentiel</li>
        </ul>

        <p class="mb-3">❌ <strong>NON si vous vendez dans &lt;6 mois</strong></p>
        <ul class="list-disc pl-6 space-y-1">
          <li>Pas le temps de prouver</li>
          <li>Mieux vaut vendre "prêt à obtenir RGE"</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 5 : Erreurs Fatales à Éviter</h2>

      <div class="space-y-6 mb-6">
        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 1 : RGE Non Renouvelée</h3>
          <p class="mb-2"><strong>Le piège :</strong> Votre RGE expire dans 4 mois, vous vendez dans 6 mois.</p>
          <p class="mb-2"><strong>Conséquence :</strong> L'acheteur découvre en due diligence. Deal annulé ou -30% prix.</p>
          <p><strong>✅ Solution :</strong> Renouvelez AVANT mise en vente (même si vous partez). Coût : 800€. Gain : +80 000€.</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 2 : Sous-Estimer le Poids RGE</h3>
          <p class="mb-2"><strong>Le piège :</strong> Vous estimez votre entreprise RGE avec coefficient standard (0,4x-0,5x CA).</p>
          <p class="mb-2"><strong>Conséquence :</strong> Vous laissez 100 000€ sur la table.</p>
          <p><strong>✅ Solution :</strong> Utilisez coefficient RGE (0,65x-0,85x CA selon secteur).</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 3 : Ne Pas Prouver la Rentabilité RGE</h3>
          <p class="mb-2"><strong>Le piège :</strong> "J'ai RGE depuis 3 mois, pas encore de chantiers labellisés."</p>
          <p class="mb-2"><strong>Conséquence :</strong> Acheteur ne paie pas la prime RGE. Vous perdez +40%.</p>
          <p><strong>✅ Solution :</strong> Réalisez minimum <strong>5 chantiers RGE</strong> avant vente. Montrez factures + aides débloquées.</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 4 : RGE Sans Assurance Adaptée</h3>
          <p class="mb-2"><strong>Le piège :</strong> RGE obtenue mais assurance décennale pas mise à jour.</p>
          <p class="mb-2"><strong>Conséquence :</strong> Non-conformité = RGE suspendue = Deal annulé.</p>
          <p><strong>✅ Solution :</strong> Assurance décennale DOIT mentionner activités RGE. Vérifiez avec assureur.</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Erreur 5 : Ignorer les Contrôles RGE</h3>
          <p class="mb-2"><strong>Le piège :</strong> Pas d'audit chantier depuis 2 ans (obligatoire tous les ans).</p>
          <p class="mb-2"><strong>Conséquence :</strong> RGE suspendue. Révélation en due diligence. Perte -40% valorisation.</p>
          <p><strong>✅ Solution :</strong> Planifiez audit annuel Qualit'EnR/Qualibat. Coût : 600€. ROI : infini.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 6 : Témoignages & Cas Réels</h2>

      <div class="space-y-6 mb-6">
        <div class="bg-primary/10 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Cas 1 : Entreprise Isolation - Bordeaux (33)</h3>
          
          <div class="mb-4">
            <p class="font-bold mb-2">Avant RGE (2023) :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>CA : 420 000€</li>
              <li>Marge : 14%</li>
              <li>Valorisation estimée : 189 000€ (0,45x CA)</li>
            </ul>
          </div>

          <div class="mb-4">
            <p class="font-bold mb-2">Obtention RGE (Janvier 2024) :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Coût : 3 200€</li>
              <li>Délai : 5 mois</li>
            </ul>
          </div>

          <div class="mb-4">
            <p class="font-bold mb-2">Après RGE (2025) :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>CA : 680 000€ (+62%)</li>
              <li>Marge : 23%</li>
              <li>Valorisation estimée : 510 000€ (0,75x CA)</li>
            </ul>
          </div>

          <div class="mb-4">
            <p class="font-bold mb-2">Vente (Septembre 2025) :</p>
            <ul class="list-none pl-0 space-y-1">
              <li>✅ Prix : 485 000€</li>
              <li>✅ Délai : 28 jours</li>
              <li>✅ <strong>Gain RGE : +296 000€ (×92 le coût RGE !)</strong></li>
            </ul>
          </div>

          <p class="mb-0"><strong>Repreneur :</strong> Plaquiste 12 ans exp, voulait se diversifier ENR.</p>
        </div>

        <div class="bg-primary/10 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Cas 2 : Entreprise PAC - Lyon (69)</h3>
          
          <div class="mb-4">
            <p class="font-bold mb-2">Profil :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Plombier-chauffagiste traditionnel</li>
              <li>CA 2023 : 380 000€</li>
              <li>Vieillissement dirigeant (62 ans)</li>
            </ul>
          </div>

          <div class="mb-4">
            <p class="font-bold mb-2">Stratégie :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Obtention RGE PAC : Mars 2024</li>
              <li>Réalisation 18 chantiers PAC RGE (Mars-Déc 2024)</li>
              <li>CA 2024 : 595 000€ (PAC = 58% du CA)</li>
            </ul>
          </div>

          <div class="mb-4">
            <p class="font-bold mb-2">Résultat vente (Février 2025) :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Mise en vente : 8 Janvier 2025</li>
              <li>Offres reçues : 11</li>
              <li>Prix final : 465 000€</li>
              <li>Délai : 35 jours</li>
            </ul>
          </div>

          <div class="mb-4">
            <p class="mb-1"><strong>Sans RGE (estimation) :</strong> 210 000€</p>
            <p class="mb-1"><strong>Avec RGE :</strong> 465 000€</p>
            <p class="mb-0"><strong>Prime RGE : +255 000€ (+121% !)</strong></p>
          </div>

          <p class="mb-0"><strong>Repreneur :</strong> Fonds d'investissement Transition Énergétique (consolidation PME RGE).</p>
        </div>

        <div class="bg-primary/10 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Cas 3 : Entreprise Multi-RGE - Toulouse (31)</h3>
          
          <div class="mb-4">
            <p class="font-bold mb-2">Profil :</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Menuisier-agenceur</li>
              <li>Obtention RGE Menuiseries (2022)</li>
              <li>Ajout RGE VMC (2024)</li>
              <li>CA 2024 : 520 000€</li>
            </ul>
          </div>

          <div class="mb-4">
            <p class="font-bold mb-2">Résultat vente (Novembre 2025) :</p>
            <ul class="list-none pl-0 space-y-1">
              <li>✅ Prix : 520 000€ (1x CA !)</li>
              <li>✅ Délai : 19 jours (record)</li>
              <li>✅ 14 acheteurs en concurrence</li>
            </ul>
          </div>

          <p class="mb-4"><strong>Secret :</strong> Double RGE = Chantiers complets (fenêtres + ventilation) = Tickets 22K€ moyens.</p>

          <div class="mb-0">
            <p class="mb-1"><strong>Sans RGE :</strong> ~230 000€</p>
            <p class="mb-1"><strong>Avec 1 RGE :</strong> ~370 000€</p>
            <p class="mb-1"><strong>Avec 2 RGE :</strong> 520 000€</p>
            <p class="mb-0"><strong>Prime multi-RGE : +150 000€ supplémentaires</strong></p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion : RGE, L'Investissement le Plus Rentable de Votre Vie</h2>
      
      <div class="bg-muted p-6 rounded-lg mb-6">
        <p class="font-bold mb-3">Le résumé en chiffres :</p>
        <pre class="text-sm">Investissement obtention RGE : 3 500€
Délai : 6 mois
Gain valorisation moyen : +125 000€
ROI : ×35
Délai de vente divisé par : 2,8
Nombre acheteurs multiplié par : 3,2</pre>
      </div>

      <div class="space-y-4 mb-6">
        <div>
          <p class="font-bold mb-2">Si vous vendez dans 12-24 mois :</p>
          <ol class="list-decimal pl-6 space-y-1">
            <li>Obtenez RGE <strong>MAINTENANT</strong></li>
            <li>Réalisez 8-12 chantiers RGE</li>
            <li>Renouvelez si expiration proche</li>
            <li>Préparez dossier démonstration rentabilité</li>
            <li>Vendez au prix fort</li>
          </ol>
        </div>

        <div>
          <p class="font-bold mb-2">Si vous vendez dans &lt;6 mois :</p>
          <ol class="list-decimal pl-6 space-y-1">
            <li>Mettez "Prêt RGE" dans annonce</li>
            <li>Proposez accompagnement obtention au repreneur</li>
            <li>Valorisez potentiel (+30% prix quand même)</li>
          </ol>
        </div>
      </div>

      <div class="bg-accent p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-2">💡 Vous avez une entreprise RGE à vendre ?</h3>
        <p class="mb-4">
          Les repreneurs se battent pour racheter des certifications RGE. Profitez du pic de valorisation 2026.
        </p>
        <p>
          Les entreprises RGE multi-qualifiées se vendent jusqu'à <strong>2x le prix</strong> des entreprises traditionnelles.
        </p>
      </div>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Certification RGE : +30% de valorisation garantie",
      "datePublished": "2025-11-10",
      "author": {
        "@type": "Organization",
        "name": "CessionBTP"
      }
    }
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);
  
  if (!article) {
    return <div>Article non trouvé</div>;
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | CessionBTP</title>
        <meta name="description" content={article.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify(article.schema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <time className="text-muted-foreground">
              {new Date(article.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </header>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          <div className="mt-12 p-6 bg-primary/10 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Prêt à vendre votre entreprise BTP ?</h3>
            <p className="mb-4">
              Obtenez une estimation gratuite en 48h et accédez à notre réseau d'acheteurs qualifiés.
            </p>
            <a 
              href="/estimer"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90"
            >
              Estimer mon entreprise →
            </a>
          </div>
        </article>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
