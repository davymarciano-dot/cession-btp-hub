export interface BuyerKeyword {
  slug: string;
  title: string;
  searchVolume: number;
  mainKeyword: string;
  relatedKeywords: string[];
  heroTitle: string;
  heroDescription: string;
  availableCount: number;
  averagePrice: string;
  filters: string[];
  benefits: string[];
  steps: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
}

export const buyerKeywords: BuyerKeyword[] = [
  {
    slug: 'entreprise-btp-a-vendre',
    title: 'Entreprise BTP à vendre',
    searchVolume: 4800,
    mainKeyword: 'entreprise btp a vendre',
    relatedKeywords: ['société batiment à reprendre', 'acheter entreprise construction', 'reprise entreprise btp'],
    heroTitle: '342 entreprises BTP à reprendre',
    heroDescription: 'Trouvez l\'entreprise BTP idéale parmi 342 opportunités vérifiées. Maçonnerie, plomberie, électricité, couverture...',
    availableCount: 342,
    averagePrice: '650000',
    filters: ['Secteur d\'activité', 'Localisation', 'Budget', 'Nombre de salariés', 'Certifications'],
    benefits: [
      '342 entreprises BTP à vendre',
      'Toutes vérifiées et qualifiées',
      'Achetez avec RGE, Qualibat, QualiPAC',
      'Accompagnement financement bancaire',
      'Support juridique reprise',
      'Matching automatique IA'
    ],
    steps: [
      { title: 'Définir votre projet', description: 'Secteur, localisation, budget, taille cible' },
      { title: 'Recevoir des matchs', description: 'Notre IA vous propose les meilleures opportunités' },
      { title: 'Visiter et analyser', description: 'Rendez-vous avec vendeurs, audit comptable et technique' },
      { title: 'Finaliser l\'achat', description: 'Négociation, financement, signature avec notre support' }
    ],
    faq: [
      {
        question: 'Combien coûte une entreprise BTP ?',
        answer: 'Le prix moyen est de 650 000€. Fourchette: 200k€ (artisan sans salarié) à 2M€+ (grosse structure). La valorisation dépend du CA, rentabilité, actifs, certifications et zone géographique.'
      },
      {
        question: 'Puis-je acheter sans apport ?',
        answer: 'Un apport de 20-30% est généralement requis par les banques. Possibilité de LBO (rachat avec crédit garanti par l\'entreprise) pour les bonnes structures. Dispositifs Nacre et ACRE pour créateurs.'
      },
      {
        question: 'Les certifications sont-elles transférables ?',
        answer: 'Oui, RGE, Qualibat, QualiPAC sont transférables au repreneur qui justifie des qualifications requises. Délai de transfert: 2-4 mois. Nous vous accompagnons dans toutes les démarches.'
      },
      {
        question: 'Combien de temps pour reprendre une entreprise BTP ?',
        answer: 'En moyenne 3-6 mois: recherche (1-2 mois), négociation et due diligence (1-2 mois), financement et signature (1-2 mois). Possible en 2 mois si financement déjà en place.'
      }
    ],
    ctaPrimary: 'Voir les 342 entreprises',
    ctaSecondary: 'Créer mon profil acheteur'
  },
  {
    slug: 'entreprise-plomberie-a-vendre',
    title: 'Entreprise plomberie à vendre',
    searchVolume: 1800,
    mainKeyword: 'entreprise plomberie a vendre',
    relatedKeywords: ['société plomberie chauffage à reprendre', 'achat entreprise plombier', 'reprise plomberie'],
    heroTitle: '156 entreprises de plomberie à reprendre',
    heroDescription: 'Reprenez une entreprise de plomberie-chauffage avec certifications RGE et QualiPAC. De 200k€ à 1.5M€.',
    availableCount: 156,
    averagePrice: '450000',
    filters: ['Certifications RGE/QualiPAC', 'Départements', 'CA', 'Effectifs', 'Spécialités'],
    benefits: [
      '156 entreprises de plomberie à vendre',
      '78% avec certification RGE',
      'CA moyen 850k€',
      'Carnets de contrats d\'entretien',
      'Clientèle particuliers et professionnels',
      'Transfert des agréments gaz'
    ],
    steps: [
      { title: 'Sélectionner', description: 'Filtrez par zone, CA, certifications RGE/QualiPAC' },
      { title: 'Auditer', description: 'Vérifiez carnets contrats, matériel, véhicules, certifications' },
      { title: 'Négocier', description: 'Prix, clause non-concurrence, période accompagnement vendeur' },
      { title: 'Reprendre', description: 'Transfert RGE, présentation aux clients, formation' }
    ],
    faq: [
      {
        question: 'Quel CA pour une entreprise de plomberie ?',
        answer: 'CA moyen: 850k€. Fourchette: 300k€ (artisan solo) à 2M€+ (équipe 10+ salariés). Prix de vente: 0.4x à 0.6x le CA selon rentabilité et actifs.'
      },
      {
        question: 'La certification RGE est-elle obligatoire ?',
        answer: 'Pas obligatoire mais fortement recommandée. 60% des clients particuliers demandent RGE pour bénéficier des aides (MaPrimeRénov\', CEE). Sans RGE, vous perdez ces marchés.'
      },
      {
        question: 'Comment valoriser les contrats d\'entretien ?',
        answer: 'Les contrats récurrents (entretien chaudières, dépannage) sont très valorisés: +20-30% sur le prix. Ils garantissent un CA prévisible et une trésorerie stable.'
      }
    ],
    ctaPrimary: 'Voir les 156 entreprises',
    ctaSecondary: 'Alerte plomberie'
  },
  {
    slug: 'entreprise-maconnerie-a-vendre',
    title: 'Entreprise maçonnerie à vendre',
    searchVolume: 1400,
    mainKeyword: 'entreprise maconnerie a vendre',
    relatedKeywords: ['société maçonnerie à reprendre', 'achat entreprise maçon', 'reprise gros oeuvre'],
    heroTitle: '187 entreprises de maçonnerie à reprendre',
    heroDescription: 'Reprenez une entreprise de maçonnerie-gros œuvre Qualibat. CA moyen 1.25M€. Marchés publics et privés.',
    availableCount: 187,
    averagePrice: '680000',
    filters: ['Qualibat', 'Régions', 'CA', 'Effectifs', 'Type travaux'],
    benefits: [
      '187 entreprises de maçonnerie à vendre',
      '85% certifiées Qualibat',
      'Carnets marchés publics',
      'Matériel et véhicules inclus',
      'Équipes qualifiées en place',
      'CA moyen 1.25M€'
    ],
    steps: [
      { title: 'Identifier', description: 'Entreprises Qualibat avec carnets marchés publics' },
      { title: 'Analyser', description: 'Audit: carnets, matériel, certifications, équipes' },
      { title: 'Financer', description: 'Montage financier adapté (apport + crédit professionnel)' },
      { title: 'Démarrer', description: 'Transfert Qualibat, notification marchés, prise en main' }
    ],
    faq: [
      {
        question: 'Faut-il être maçon pour reprendre ?',
        answer: 'Pas obligatoire si vous avez un chef de chantier qualifié. Mais expérience BTP recommandée pour gérer l\'activité, les chantiers et les équipes efficacement.'
      },
      {
        question: 'Les marchés publics en cours ?',
        answer: 'Transférables au repreneur avec notification et validation de la collectivité. Nous gérons les démarches. Les marchés représentent souvent 40-60% du CA.'
      },
      {
        question: 'Quel apport pour racheter ?',
        answer: 'Apport minimum 25-30% du prix. Pour 680k€: prévoir 170-200k€ d\'apport. Le reste financé par crédit professionnel garanti par les actifs de l\'entreprise.'
      }
    ],
    ctaPrimary: 'Voir les 187 entreprises',
    ctaSecondary: 'Guide reprise maçonnerie'
  },
  {
    slug: 'petite-entreprise-btp-a-vendre',
    title: 'Petite entreprise BTP à vendre',
    searchVolume: 780,
    mainKeyword: 'petite entreprise btp a vendre',
    relatedKeywords: ['entreprise btp sans salarié', 'artisan btp à reprendre', 'micro entreprise batiment'],
    heroTitle: '156 petites entreprises BTP à reprendre',
    heroDescription: 'Reprenez une petite structure BTP (0-5 salariés). Budget 150k€ à 500k€. Installation ou développement.',
    availableCount: 156,
    averagePrice: '320000',
    filters: ['Sans salarié / 1-5 salariés', 'Budget <500k€', 'Secteur', 'Département', 'Avec/sans matériel'],
    benefits: [
      '156 petites entreprises à vendre',
      'Budget accessible 150-500k€',
      'Apport réduit (30-50k€ possible)',
      'Installation rapide',
      'Formation vendeur incluse',
      'Clientèle fidèle constituée'
    ],
    steps: [
      { title: 'Choisir', description: 'Artisan solo ou petite équipe selon votre projet' },
      { title: 'Évaluer', description: 'Clientèle récurrente, matériel, certifications, réputation' },
      { title: 'Financer', description: 'Apport réduit + aides Nacre/ACRE + crédit artisan' },
      { title: 'S\'installer', description: 'Formation 3-6 mois, présentation clients, passage relais' }
    ],
    faq: [
      {
        question: 'Combien pour reprendre un artisan BTP ?',
        answer: 'Prix moyen: 320k€. Fourchette: 150k€ (sans salarié, peu de matériel) à 500k€ (5 salariés, matériel complet, certifications). Souvent 30-50% du CA annuel.'
      },
      {
        question: 'Quel apport minimum ?',
        answer: 'Apport de 20-30% recommandé (ex: 50-100k€ pour 320k€). Aides Nacre jusqu\'à 10k€ et ACRE (exonération charges). Prêt d\'honneur 15-50k€ sans garantie possible.'
      },
      {
        question: 'Formation par le vendeur ?',
        answer: 'Généralement 3-6 mois de compagnonnage: présentation clients, transmission savoir-faire, gestion quotidienne. Clause standard et très valorisante pour la reprise.'
      }
    ],
    ctaPrimary: 'Voir les petites structures',
    ctaSecondary: 'Simuler mon financement'
  },
  {
    slug: 'entreprise-btp-a-vendre-paris',
    title: 'Entreprise BTP à vendre Paris',
    searchVolume: 890,
    mainKeyword: 'entreprise btp a vendre paris',
    relatedKeywords: ['société batiment paris', 'entreprise construction ile de france', 'btp paris vente'],
    heroTitle: '78 entreprises BTP à reprendre à Paris',
    heroDescription: 'Reprenez une entreprise BTP en Île-de-France. Paris et proche couronne. CA moyen 1.2M€.',
    availableCount: 78,
    averagePrice: '890000',
    filters: ['Arrondissement', 'Secteur BTP', 'CA', 'Certifications', 'Type clientèle'],
    benefits: [
      '78 entreprises BTP à vendre - région parisienne',
      'Marchés très dynamiques',
      'Prix moyen 890k€',
      'Clientèle haut de gamme',
      'Carnets bien remplis',
      'Rénovation et construction neuve'
    ],
    steps: [
      { title: 'Localiser', description: 'Paris intramuros ou proche couronne selon budget' },
      { title: 'Sélectionner', description: 'Type travaux: rénovation haut de gamme, construction, second œuvre' },
      { title: 'Vérifier', description: 'Carnets, références clients, équipes qualifiées' },
      { title: 'Acquérir', description: 'Financement adapté marché parisien, signature, reprise' }
    ],
    faq: [
      {
        question: 'Pourquoi les prix sont plus élevés à Paris ?',
        answer: 'Marché parisien très porteur: forte demande, prix m² élevés, clientèle aisée, marges supérieures. Prix entreprises: +30-50% vs province pour performances équivalentes.'
      },
      {
        question: 'Quel type de chantiers à Paris ?',
        answer: 'Rénovation haut de gamme (60%), construction neuve (20%), second œuvre luxe (15%), marchés publics (5%). Clientèle exigeante avec budgets confortables.'
      },
      {
        question: 'Faut-il habiter Paris pour reprendre ?',
        answer: 'Pas obligatoire mais fortement recommandé. Présence terrain nécessaire pour relation clients, chantiers, équipes. Possibilité manager à distance si équipe autonome en place.'
      }
    ],
    ctaPrimary: 'Voir entreprises Paris',
    ctaSecondary: 'Créer alerte Paris/IDF'
  }
];

export const buyerLongTail = [
  { slug: 'societe-electricite-a-reprendre', title: 'Société électricité à reprendre', count: 134 },
  { slug: 'cabinet-architecte-a-reprendre', title: 'Cabinet architecte à reprendre', count: 45 },
  { slug: 'entreprise-couverture-a-vendre', title: 'Entreprise couverture à vendre', count: 98 },
  { slug: 'societe-carrelage-a-reprendre', title: 'Société carrelage à reprendre', count: 67 },
  { slug: 'entreprise-peinture-a-vendre', title: 'Entreprise peinture à vendre', count: 143 },
  { slug: 'societe-menuiserie-a-reprendre', title: 'Société menuiserie à reprendre', count: 112 },
  { slug: 'entreprise-chauffage-a-vendre', title: 'Entreprise chauffage à vendre', count: 89 },
  { slug: 'entreprise-btp-a-vendre-lyon', title: 'Entreprise BTP à vendre Lyon', count: 54 },
  { slug: 'entreprise-btp-a-vendre-marseille', title: 'Entreprise BTP à vendre Marseille', count: 42 },
  { slug: 'entreprise-btp-urgent', title: 'Entreprise BTP à vendre urgent', count: 23 }
];
