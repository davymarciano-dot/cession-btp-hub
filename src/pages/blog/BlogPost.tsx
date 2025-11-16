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
    title: 'Certification RGE : +30% de valorisation garantie',
    metaDescription: 'La certification RGE augmente la valeur de votre entreprise BTP de 30%. Découvrez comment l\'obtenir et la rentabiliser.',
    date: '2025-11-10',
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4">Pourquoi la certification RGE est essentielle</h2>
      <p class="mb-4">
        En 2026, la certification RGE (Reconnu Garant de l'Environnement) n'est plus une option mais une nécessité pour maximiser la valeur de votre entreprise BTP.
      </p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Impact sur la valorisation</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>+30% de valeur moyenne à la revente</li>
        <li>Délai de vente réduit de 45%</li>
        <li>Accès aux aides MaPrimeRénov</li>
        <li>Clientèle premium et fidèle</li>
      </ul>

      <div class="bg-primary/10 p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-2">📊 Exemple concret</h3>
        <p>
          Entreprise de plomberie, CA 500k€ :<br/>
          Sans RGE : Valorisation 400k€<br/>
          Avec RGE : Valorisation 520k€<br/>
          <strong>Gain : 120k€</strong>
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
