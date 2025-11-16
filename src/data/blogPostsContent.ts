export interface BlogPostContent {
  content: string;
  metaDescription: string;
  imageUrl: string;
  schema: any;
}

export const blogPostsFullContent: Record<string, BlogPostContent> = {
  'vendre-entreprise-btp-2026': {
    metaDescription: 'Vendez votre entreprise BTP en 45 jours avec notre méthode complète 2026. Estimation, diffusion, négociation : le guide étape par étape qui marche.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070',
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
  'certification-rge-valorisation': {
    metaDescription: 'Les entreprises RGE se vendent 40% plus cher en 2026. Découvrez pourquoi et comment maximiser votre valorisation avec la certification RGE. Cas réels et stratégies.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069',
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
  },
  'reprendre-entreprise-pompe-chaleur': {
    metaDescription: 'Reprendre une entreprise de pompes à chaleur en 2026 : opportunités, valorisation, financement. Le guide complet pour réussir votre reprise.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070',
    content: `
      <p class="text-muted-foreground mb-6"><strong>Temps de lecture : 10 minutes | Publié le 05/11/2025 | Catégorie : Reprise</strong></p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Introduction : L'opportunité en or de 2026</h2>
      <p class="mb-4">
        Le secteur de la pompe à chaleur connaît une croissance explosive en 2026. Avec l'interdiction des chaudières gaz dans le neuf dès janvier 2025 et les aides massives de l'État, <strong>reprendre une entreprise de PAC aujourd'hui, c'est saisir une opportunité unique sur un marché en pleine expansion</strong>.
      </p>
      
      <p class="mb-4"><strong>Les chiffres qui donnent le vertige :</strong></p>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>Marché des PAC : <strong>+65% de croissance en 2025</strong></li>
        <li>Prix moyen d'une entreprise PAC : <strong>520 000€</strong> (+40% vs 2024)</li>
        <li>Délai de vente moyen : <strong>28 jours</strong> (record absolu)</li>
        <li>Rentabilité moyenne : <strong>28% de marge</strong> (vs 15% plomberie classique)</li>
        <li>Carnet de commandes moyen : <strong>9,2 mois</strong></li>
      </ul>

      <p class="mb-6">
        Dans ce guide, découvrez pourquoi et comment reprendre une entreprise de pompes à chaleur, les pièges à éviter, et les stratégies pour réussir votre acquisition.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 1 : Pourquoi le secteur PAC explose en 2026</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">L'interdiction des chaudières gaz</h3>
      <p class="mb-4">
        Depuis janvier 2025, l'installation de chaudières gaz dans le neuf est interdite. <strong>Résultat : 100% des nouveaux logements se tournent vers la PAC air/eau</strong>.
      </p>
      
      <div class="bg-muted p-6 rounded-lg mb-6">
        <h4 class="font-bold mb-3">Les impacts concrets :</h4>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>350 000 logements neufs/an</strong> = 350 000 PAC à installer</li>
          <li>Marché captif pour les entreprises certifiées RGE</li>
          <li>Prix moyen installation : <strong>18 500€</strong> (vs 8 000€ pour une chaudière gaz)</li>
          <li>Marge moyenne : <strong>28%</strong> (vs 12% chaudières gaz)</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">MaPrimeRénov' dopée</h3>
      <p class="mb-4">
        Les aides gouvernementales atteignent des sommets en 2026 :
      </p>
      
      <div class="space-y-4 mb-6">
        <div>
          <h4 class="font-bold mb-2">Pour les ménages modestes :</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>PAC air/eau : jusqu'à <strong>11 000€</strong> d'aide</li>
            <li>PAC géothermique : jusqu'à <strong>15 000€</strong></li>
            <li>Bonus sortie chaudière fioul : <strong>+1 500€</strong></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-2">Pour les ménages intermédiaires :</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>PAC air/eau : jusqu'à <strong>6 000€</strong></li>
            <li>Éco-PTZ : prêt à 0% jusqu'à <strong>50 000€</strong></li>
          </ul>
        </div>
      </div>

      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <p class="font-bold mb-2">💡 Conséquence directe :</p>
        <p>Les clients ne regardent plus le prix. Ils veulent la meilleure PAC avec le meilleur installateur RGE. <strong>Les entreprises PAC certifiées refusent des chantiers par manque de capacité</strong>.</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 2 : Combien coûte une entreprise PAC ?</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Fourchettes de prix 2026</h3>
      
      <div class="space-y-4 mb-6">
        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">Entreprise artisanale (CA 300-500K€)</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Prix moyen : <strong>300 000€ à 450 000€</strong></li>
            <li>Multiple CA : <strong>0,7x à 0,9x</strong></li>
            <li>Effectif : 2-4 personnes</li>
            <li>RGE obligatoire</li>
          </ul>
        </div>

        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">PME structurée (CA 800K-2M€)</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Prix moyen : <strong>800 000€ à 1,8M€</strong></li>
            <li>Multiple CA : <strong>0,9x à 1,1x</strong></li>
            <li>Effectif : 8-20 personnes</li>
            <li>Multi-RGE (PAC + solaire + isolation)</li>
          </ul>
        </div>

        <div class="bg-muted p-4 rounded-lg">
          <h4 class="font-bold mb-2">Groupe régional (CA >3M€)</h4>
          <ul class="list-disc pl-6 space-y-1">
            <li>Prix moyen : <strong>3M€ à 8M€</strong></li>
            <li>Multiple CA : <strong>1,2x à 1,5x</strong></li>
            <li>Effectif : 30-80 personnes</li>
            <li>Marque reconnue</li>
          </ul>
        </div>
      </div>

      <div class="bg-primary/10 p-6 rounded-lg mb-6">
        <p class="font-bold mb-2">📊 Exemple concret :</p>
        <pre class="text-sm">Entreprise PAC - Région Lyonnaise
CA 2025 : 620 000€
EBITDA : 174 000€ (28%)
Effectif : 5 salariés (dont 3 techniciens)
Certif : RGE PAC + QualiPAC
Prix de vente : 560 000€
→ Coefficient : 0,9x CA</pre>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 3 : Comment financer la reprise ?</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Les 4 solutions de financement</h3>

      <div class="space-y-6 mb-6">
        <div>
          <h4 class="font-bold mb-3">1. Prêt bancaire classique</h4>
          <p class="mb-2"><strong>Caractéristiques :</strong></p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>Apport personnel : <strong>20% à 30%</strong> du prix</li>
            <li>Taux 2026 : <strong>4,2% à 5,8%</strong></li>
            <li>Durée : 7 à 10 ans</li>
            <li>Garantie : Caution personnelle + hypothèque</li>
          </ul>
          
          <div class="bg-muted p-4 rounded-lg">
            <p class="font-semibold mb-2">Exemple :</p>
            <pre class="text-sm">Prix entreprise : 450 000€
Apport : 100 000€ (22%)
Emprunt : 350 000€
Mensualité : 4 200€ sur 10 ans</pre>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-3">2. Crédit-vendeur</h4>
          <p class="mb-2"><strong>Avantages :</strong></p>
          <ul class="list-disc pl-6 space-y-1 mb-3">
            <li>Réduit l'apport nécessaire</li>
            <li>Prouve la confiance du vendeur</li>
            <li>Facilite l'accord bancaire</li>
          </ul>
          
          <p class="mb-2"><strong>Montage type :</strong></p>
          <ul class="list-disc pl-6 space-y-1">
            <li>70% banque</li>
            <li>20% crédit-vendeur (sur 3 ans)</li>
            <li>10% apport personnel</li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-3">3. Fonds d'investissement spécialisés</h4>
          <p class="mb-2">Plusieurs fonds ciblent les PME transition énergétique :</p>
          <ul class="list-disc pl-6 space-y-1">
            <li>Energy Transition Fund</li>
            <li>Bpifrance Transition Énergétique</li>
            <li>Mirova Energy Transition</li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Partie 4 : Les pièges à éviter</h2>

      <div class="space-y-6 mb-6">
        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Piège 1 : Entreprise Sans RGE à Jour</h3>
          <p class="mb-2"><strong>Le problème :</strong> RGE expirée = Impossible d'accéder aux aides = Perte 80% du marché.</p>
          <p><strong>✅ Solution :</strong> Vérifiez la date d'expiration RGE AVANT tout engagement.</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Piège 2 : Dépendance à un Fournisseur</h3>
          <p class="mb-2"><strong>Le problème :</strong> 90% du CA avec Daikin/Atlantic = Risque énorme si contrat rompu.</p>
          <p><strong>✅ Solution :</strong> Exigez diversification fournisseurs (minimum 2 marques).</p>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h3 class="text-lg font-bold mb-2">❌ Piège 3 : Techniciens Clés Non Transférables</h3>
          <p class="mb-2"><strong>Le problème :</strong> Les 2 techniciens PAC partent = Entreprise morte.</p>
          <p><strong>✅ Solution :</strong> Clause de rétention 2 ans + prime transmission.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      
      <div class="bg-muted p-6 rounded-lg mb-6">
        <p class="font-bold mb-3">Le résumé en 3 points :</p>
        <ol class="list-decimal pl-6 space-y-2">
          <li><strong>Marché en pleine explosion</strong> : +65% de croissance, aides massives, interdiction chaudières gaz</li>
          <li><strong>Valorisations records</strong> : 0,7x à 1,1x le CA selon la taille</li>
          <li><strong>Financement accessible</strong> : 20-30% d'apport + crédit-vendeur possible</li>
        </ol>
      </div>

      <div class="bg-accent p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-2">🎯 Vous cherchez une entreprise PAC ?</h3>
        <p class="mb-4">
          Accédez aux opportunités exclusives d'entreprises de pompes à chaleur disponibles à la reprise.
        </p>
        <p>
          Les entreprises PAC certifiées RGE se vendent en moyenne <strong>28 jours</strong>. Ne ratez pas votre chance.
        </p>
      </div>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Reprendre une Entreprise de Pompe à Chaleur : Le Guide 2026",
      "datePublished": "2025-11-05",
      "author": {
        "@type": "Organization",
        "name": "CessionBTP"
      },
      "description": "Guide complet pour reprendre une entreprise de pompe à chaleur en 2026",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://cessionbtp.fr/blog/reprendre-entreprise-pompe-chaleur"
      }
    }
  }
};
