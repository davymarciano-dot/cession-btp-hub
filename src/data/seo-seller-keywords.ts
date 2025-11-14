export interface SellerKeyword {
  slug: string;
  title: string;
  searchVolume: number;
  mainKeyword: string;
  relatedKeywords: string[];
  heroTitle: string;
  heroDescription: string;
  benefits: string[];
  steps: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
}

export const sellerKeywords: SellerKeyword[] = [
  {
    slug: 'vendre-mon-entreprise-btp',
    title: 'Vendre mon entreprise BTP',
    searchVolume: 1900,
    mainKeyword: 'vendre mon entreprise btp',
    relatedKeywords: ['vendre entreprise batiment', 'cession entreprise btp', 'vente société btp'],
    heroTitle: 'Vendez votre entreprise BTP en 45 jours',
    heroDescription: 'La plateforme n°1 pour vendre votre entreprise de bâtiment rapidement et au meilleur prix. Success fee 2% uniquement si vente réussie.',
    benefits: [
      'Vente en 45 jours en moyenne (record: 12 jours)',
      'Commission 2% seulement à la vente',
      'Acheteurs vérifiés et qualifiés',
      'Estimation gratuite en 48h',
      'Accompagnement juridique complet',
      'Confidentialité garantie'
    ],
    steps: [
      { title: 'Estimation gratuite', description: 'Recevez une valorisation précise de votre entreprise BTP en 48h maximum' },
      { title: 'Publication annonce', description: 'Mise en ligne de votre annonce avec matching automatique des acheteurs qualifiés' },
      { title: 'Négociation', description: 'Accompagnement dans les échanges et négociations avec les repreneurs' },
      { title: 'Vente finalisée', description: 'Signature de la cession avec notre accompagnement juridique et fiscal' }
    ],
    faq: [
      {
        question: 'Combien de temps pour vendre mon entreprise BTP ?',
        answer: 'Le délai moyen est de 45 jours. Notre record est de 12 jours et 95% des entreprises sont vendues en moins de 60 jours grâce à notre algorithme de matching.'
      },
      {
        question: 'Quels sont vos frais pour vendre mon entreprise ?',
        answer: 'Success fee de 2% uniquement en cas de vente réussie. Aucun frais d\'inscription, d\'estimation ou de publication d\'annonce.'
      },
      {
        question: 'Comment est calculée la valeur de mon entreprise BTP ?',
        answer: 'Notre valorisation prend en compte: CA des 3 dernières années, EBITDA, actifs (matériel, locaux), carnet de commandes, certifications (RGE, Qualibat), zone géographique et réputation.'
      },
      {
        question: 'Puis-je vendre mon entreprise de manière confidentielle ?',
        answer: 'Oui, mode anonyme disponible. Votre identité et raison sociale ne sont révélées qu\'aux acheteurs sérieux après signature d\'un NDA et validation de votre part.'
      }
    ],
    ctaPrimary: 'Obtenir mon estimation gratuite',
    ctaSecondary: 'Voir les success stories'
  },
  {
    slug: 'estimation-entreprise-batiment',
    title: 'Estimation entreprise bâtiment',
    searchVolume: 1200,
    mainKeyword: 'estimation entreprise batiment',
    relatedKeywords: ['valorisation entreprise btp', 'combien vaut ma société btp', 'prix entreprise batiment'],
    heroTitle: 'Estimation gratuite de votre entreprise de bâtiment',
    heroDescription: 'Recevez une valorisation professionnelle de votre société BTP en 48h. Algorithme basé sur 543 ventes réussies.',
    benefits: [
      'Estimation 100% gratuite et sans engagement',
      'Résultat en 48h maximum',
      'Basée sur 543 ventes réelles',
      'Fourchette basse, moyenne et haute',
      'Conseils personnalisés inclus',
      'Comparaison avec le marché'
    ],
    steps: [
      { title: 'Formulaire 5 min', description: 'Informations sur votre activité, CA, effectifs et actifs' },
      { title: 'Analyse IA', description: 'Notre algorithme analyse 543 ventes similaires pour une estimation précise' },
      { title: 'Rapport détaillé', description: 'Vous recevez votre estimation (basse/moyenne/haute) avec recommandations' },
      { title: 'Accompagnement', description: 'Un expert vous contacte pour affiner et optimiser la valorisation' }
    ],
    faq: [
      {
        question: 'Comment est calculée l\'estimation de mon entreprise ?',
        answer: 'Nous analysons: chiffre d\'affaires (N-3, N-2, N-1), résultat net, EBITDA, actifs (matériel, stock, locaux), nombre de salariés, certifications, zone géographique et 543 ventes comparables dans notre base.'
      },
      {
        question: 'L\'estimation est-elle vraiment gratuite ?',
        answer: 'Oui, 100% gratuite et sans engagement. Aucune carte bancaire requise. Nous sommes rémunérés uniquement si vous vendez via notre plateforme (2% de success fee).'
      },
      {
        question: 'Quelle est la précision de l\'estimation ?',
        answer: 'Notre marge d\'erreur moyenne est de ±8% grâce à notre base de 543 transactions réelles. Nous fournissons une fourchette (basse/moyenne/haute) pour refléter les variations du marché.'
      }
    ],
    ctaPrimary: 'Lancer mon estimation gratuite',
    ctaSecondary: 'Voir un exemple d\'estimation'
  },
  {
    slug: 'ceder-entreprise-travaux-publics',
    title: 'Céder entreprise travaux publics',
    searchVolume: 780,
    mainKeyword: 'ceder entreprise travaux publics',
    relatedKeywords: ['vendre entreprise tp', 'cession société génie civil', 'transmission entreprise vrd'],
    heroTitle: 'Cédez votre entreprise de travaux publics',
    heroDescription: 'Spécialistes de la cession d\'entreprises de TP: terrassement, VRD, génie civil, canalisation. Acheteurs qualifiés du secteur.',
    benefits: [
      'Acheteurs spécialisés TP vérifiés',
      'Valorisation tenant compte du matériel lourd',
      'Expertise en cession de carnets marchés publics',
      'Accompagnement transfert agréments',
      'Success fee adaptée aux grosses structures',
      'Confidentialité renforcée'
    ],
    steps: [
      { title: 'Audit TP', description: 'Évaluation spécifique: matériel roulant, agréments, carnets marchés publics' },
      { title: 'Matching ciblé', description: 'Mise en relation avec repreneurs spécialisés TP et génie civil' },
      { title: 'Due diligence', description: 'Vérification complète: DICT, agrément préfecture, marchés en cours' },
      { title: 'Transfert', description: 'Accompagnement transfert agréments et notification donneurs d\'ordre' }
    ],
    faq: [
      {
        question: 'Comment valoriser le matériel TP (pelles, niveleuses, etc.) ?',
        answer: 'Nous faisons appel à des experts en matériel TP pour une valorisation précise selon l\'état, l\'âge, les heures et le marché de l\'occasion. Valeur nette comptable + valeur de marché.'
      },
      {
        question: 'Les marchés publics en cours sont-ils transférables ?',
        answer: 'Oui, les marchés publics sont transférables au repreneur sous réserve d\'agrément de la collectivité. Nous gérons l\'ensemble des notifications et validations nécessaires.'
      },
      {
        question: 'Qu\'advient-il des agréments et certifications TP ?',
        answer: 'Les agréments préfectoraux et certifications TP doivent être re-demandés par le repreneur. Nous l\'accompagnons dans toutes ces démarches administratives.'
      }
    ],
    ctaPrimary: 'Estimer mon entreprise TP',
    ctaSecondary: 'Parler à un expert TP'
  },
  {
    slug: 'transmission-entreprise-batiment',
    title: 'Transmission entreprise bâtiment',
    searchVolume: 650,
    mainKeyword: 'transmission entreprise batiment',
    relatedKeywords: ['transmission familiale btp', 'succession entreprise batiment', 'passage relais btp'],
    heroTitle: 'Transmission d\'entreprise de bâtiment réussie',
    heroDescription: 'Préparez et réussissez la transmission de votre entreprise BTP. Accompagnement complet: familial, salarié ou externe.',
    benefits: [
      'Accompagnement transmission familiale',
      'Rachat par salariés (LBO, LMBO)',
      'Optimisation fiscale donation-cession',
      'Valorisation tenant compte pacte Dutreil',
      'Formation du repreneur incluse',
      'Clause earn-out possible'
    ],
    steps: [
      { title: 'Diagnostic transmission', description: 'Analyse de votre situation et du meilleur mode de transmission' },
      { title: 'Préparation', description: 'Mise en ordre: comptabilité, certifications, contrats, organisation' },
      { title: 'Choix repreneur', description: 'Sélection: membre famille, salarié clé ou repreneur externe qualifié' },
      { title: 'Accompagnement', description: 'Formation repreneur, passage relais progressif, support post-transmission' }
    ],
    faq: [
      {
        question: 'Transmission familiale ou vente externe ?',
        answer: 'Transmission familiale: avantages fiscaux (Pacte Dutreil), continuité, mais nécessite un repreneur compétent dans la famille. Vente externe: meilleur prix, plus de choix, mais fiscalité standard.'
      },
      {
        question: 'Comment transmettre à un salarié sans apport ?',
        answer: 'Possibilité de LBO/LMBO où le salarié rachète avec un crédit garanti par les actifs de l\'entreprise. Ou earn-out: paiement échelonné sur les bénéfices futurs.'
      },
      {
        question: 'Combien de temps pour préparer une transmission ?',
        answer: 'Idéalement 2-3 ans pour optimiser fiscalité et rentabilité, former le repreneur, mettre en ordre tous les documents. Possible en 6-12 mois en situation d\'urgence.'
      }
    ],
    ctaPrimary: 'Préparer ma transmission',
    ctaSecondary: 'Simuler la fiscalité'
  },
  {
    slug: 'vendre-entreprise-sans-salarie',
    title: 'Vendre société sans salarié',
    searchVolume: 670,
    mainKeyword: 'vendre societe sans salarie',
    relatedKeywords: ['vendre auto-entrepreneur btp', 'cession artisan seul', 'vendre fonds artisan'],
    heroTitle: 'Vendez votre entreprise artisanale sans salarié',
    heroDescription: 'Spécialistes de la vente d\'entreprises artisanales BTP sans salarié. Valorisation de votre savoir-faire et clientèle.',
    benefits: [
      'Valorisation du fonds artisanal',
      'Vente de la clientèle et réputation',
      'Transfert des certifications (RGE, Qualibat)',
      'Accompagnement transfert matériel',
      'Clause de non-concurrence',
      'Formation du repreneur par vos soins'
    ],
    steps: [
      { title: 'Valorisation fonds', description: 'Évaluation: CA récurrent, clientèle fidèle, réputation, certifications' },
      { title: 'Recherche repreneur', description: 'Artisan cherchant à s\'installer ou développer son activité' },
      { title: 'Transfert progressif', description: 'Présentation clients, transfert savoir-faire, compagnonnage 3-6 mois' },
      { title: 'Finalisation', description: 'Signature, paiement, clause non-concurrence, accompagnement post-vente' }
    ],
    faq: [
      {
        question: 'Peut-on vendre une entreprise sans salarié ?',
        answer: 'Oui, on vend le fonds artisanal: clientèle, réputation, certifications, matériel, véhicules. Valeur basée sur le CA récurrent et la fidélité clients.'
      },
      {
        question: 'Comment valoriser mon entreprise sans salarié ?',
        answer: 'Généralement 30-50% du CA annuel pour une entreprise sans salarié, selon: récurrence clients (contrats entretien), certifications (RGE), matériel, zone géographique, réputation.'
      },
      {
        question: 'Dois-je former le repreneur ?',
        answer: 'Fortement recommandé et valorisant. Un accompagnement de 3-6 mois (compagnonnage) rassure le repreneur et justifie un prix plus élevé. Clause standard dans 80% des cessions.'
      }
    ],
    ctaPrimary: 'Estimer mon fonds artisanal',
    ctaSecondary: 'Voir des exemples de vente'
  }
];

export const sellerLongTail = [
  { slug: 'vendre-entreprise-maconnerie', title: 'Vendre entreprise maçonnerie', sector: 'Maçonnerie' },
  { slug: 'ceder-societe-plomberie-chauffage', title: 'Céder société plomberie chauffage', sector: 'Plomberie-Chauffage' },
  { slug: 'vendre-entreprise-electricite-generale', title: 'Vendre entreprise électricité générale', sector: 'Électricité' },
  { slug: 'cession-cabinet-architecte', title: 'Cession cabinet architecte', sector: 'Architecture' },
  { slug: 'vendre-societe-couverture-zinguerie', title: 'Vendre société couverture zinguerie', sector: 'Couverture' },
  { slug: 'ceder-entreprise-carrelage', title: 'Céder entreprise carrelage', sector: 'Carrelage' },
  { slug: 'vendre-societe-peinture-ravalement', title: 'Vendre société peinture ravalement', sector: 'Peinture' },
  { slug: 'transmission-entreprise-menuiserie', title: 'Transmission entreprise menuiserie', sector: 'Menuiserie' },
  { slug: 'vendre-entreprise-terrassement', title: 'Vendre entreprise terrassement', sector: 'Terrassement' },
  { slug: 'ceder-societe-demolition', title: 'Céder société démolition', sector: 'Démolition' }
];
