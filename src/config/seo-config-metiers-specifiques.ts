// Configuration SEO pour pages métiers ultra-spécifiques

export const pagesMetiersSpecifiques = {
  // PANNEAUX SOLAIRES
  panneauxSolaires: {
    title: "Entreprise Panneaux Solaires à Vendre | Installation Photovoltaïque | CessionBTP",
    description: "Achetez ou vendez une entreprise d'installation de panneaux solaires photovoltaïques. +50 sociétés RGE disponibles. CA 200k à 5M€. Estimation gratuite par IA. Success fee 2%.",
    keywords: "entreprise panneaux solaires à vendre, vendre société photovoltaïque, installation solaire à reprendre, entreprise RGE solaire, vente installateur panneaux",
    canonical: "https://cessionbtp.fr/secteur/panneaux-solaires",
    h1: "Entreprises Installation Panneaux Solaires à Vendre en France",
    schema: "Service",
  },

  // PHOTOVOLTAÏQUE
  photovoltaique: {
    title: "Entreprise Photovoltaïque à Vendre | Installateur Solaire RGE | CessionBTP",
    description: "Trouvez ou vendez une entreprise photovoltaïque rentable. Installateurs RGE qualifiés. Valorisation adaptée au secteur solaire (multiples 0.6x-1.5x CA). +40 opportunités.",
    keywords: "entreprise photovoltaïque à vendre, reprendre installateur solaire, vendre entreprise PV, société photovoltaïque RGE, installation photovoltaïque à vendre",
    canonical: "https://cessionbtp.fr/secteur/photovoltaique",
    h1: "Achat & Vente Entreprises Photovoltaïques - Installateurs Solaires RGE",
    schema: "Service",
  },

  // POMPE À CHALEUR
  pompeAChaleur: {
    title: "Entreprise Pompe à Chaleur à Vendre | Installation PAC RGE | CessionBTP",
    description: "Achetez une entreprise d'installation de pompes à chaleur. Sociétés RGE qualifiées, CA 150k à 3M€. Secteur en forte croissance. Estimation gratuite, accompagnement expert.",
    keywords: "entreprise pompe à chaleur à vendre, vendre installateur PAC, société chauffage thermodynamique, entreprise RGE pompe chaleur, installation PAC à reprendre",
    canonical: "https://cessionbtp.fr/secteur/pompe-a-chaleur",
    h1: "Entreprises Installation Pompe à Chaleur à Vendre",
    schema: "Service",
  },

  // ÉNERGIES RENOUVELABLES
  energiesRenouvelables: {
    title: "Entreprise Énergies Renouvelables à Vendre | Solaire, PAC, Biomasse | CessionBTP",
    description: "Plateforme n°1 pour acheter ou vendre une entreprise dans les énergies renouvelables. Photovoltaïque, pompes à chaleur, biomasse, éolien. +80 entreprises RGE disponibles.",
    keywords: "entreprise énergies renouvelables à vendre, vendre société ENR, installation renouvelable à reprendre, entreprise transition énergétique RGE",
    canonical: "https://cessionbtp.fr/secteur/energies-renouvelables",
    h1: "Achat & Vente Entreprises Énergies Renouvelables",
    schema: "Service",
  },

  // CERTIFICATION RGE
  entrepriseRGE: {
    title: "Entreprise RGE à Vendre | Qualification Reconnue Garant Environnement | CessionBTP",
    description: "Achetez une entreprise avec certification RGE. Secteurs : photovoltaïque, pompe à chaleur, isolation, chauffage. Valorisation premium pour entreprises qualifiées. +100 annonces.",
    keywords: "entreprise RGE à vendre, vendre société certifiée RGE, acheter entreprise qualifiée environnement, reprise entreprise RGE photovoltaïque",
    canonical: "https://cessionbtp.fr/certification/rge",
    h1: "Entreprises Certifiées RGE à Vendre - Tous Secteurs",
    schema: "Service",
  },

  // INSTALLATION CHAUFFAGE
  installationChauffage: {
    title: "Entreprise Installation Chauffage à Vendre | Pompe à Chaleur, Solaire | CessionBTP",
    description: "Vendez ou achetez une entreprise d'installation de chauffage. Pompes à chaleur, chaudières, solaire thermique. Entreprises RGE prioritaires. CA moyen 500k€.",
    keywords: "entreprise chauffage à vendre, installation thermique à reprendre, vendre société chauffagiste, entreprise pompe chaleur RGE",
    canonical: "https://cessionbtp.fr/secteur/installation-chauffage",
    h1: "Entreprises Installation Chauffage & Thermique à Vendre",
    schema: "Service",
  },

  // ISOLATION THERMIQUE
  isolationThermique: {
    title: "Entreprise Isolation Thermique à Vendre | ITE, ITI, Combles RGE | CessionBTP",
    description: "Achetez une entreprise d'isolation thermique certifiée RGE. ITE, ITI, isolation combles. Secteur en croissance. Valorisation 0.4x-0.9x CA. +30 opportunités.",
    keywords: "entreprise isolation à vendre, vendre société isolation thermique RGE, ITE à reprendre, isolation combles entreprise vente",
    canonical: "https://cessionbtp.fr/secteur/isolation-thermique",
    h1: "Entreprises Isolation Thermique RGE à Vendre",
    schema: "Service",
  },
};

// SCHEMA.ORG SPÉCIFIQUE POUR ÉNERGIES RENOUVELABLES
export const serviceEnergiesRenouvelablesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cession Entreprises Énergies Renouvelables",
  "description": "Plateforme spécialisée dans l'achat et la vente d'entreprises du secteur énergies renouvelables : photovoltaïque, pompes à chaleur, biomasse",
  "provider": {
    "@type": "Organization",
    "name": "CessionBTP"
  },
  "serviceType": "Cession et transmission d'entreprises ENR",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "category": [
    "Photovoltaïque",
    "Pompe à chaleur",
    "Isolation thermique",
    "Chauffage renouvelable",
    "Biomasse",
    "Éolien"
  ],
  "providerMobility": "static",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "89"
  }
};

// FAQ SPÉCIFIQUE PHOTOVOLTAÏQUE
export const faqPhotovoltaique = [
  {
    question: "Combien vaut une entreprise d'installation de panneaux solaires ?",
    answer: "Une entreprise photovoltaïque se valorise généralement entre 0.6x et 1.5x son chiffre d'affaires annuel. Les facteurs clés sont : la certification RGE (prime de 20-30%), le CA (>500k€ = meilleure valorisation), la récurrence client, et le carnet de commandes. Exemple : entreprise RGE avec 600k€ CA = valorisation 500k à 750k€."
  },
  {
    question: "Pourquoi acheter une entreprise photovoltaïque plutôt que créer ?",
    answer: "Reprendre une entreprise solaire existante permet d'avoir immédiatement : la certification RGE (18 mois pour l'obtenir), un portefeuille clients, des sous-traitants qualifiés, un historique bancaire. Le ROI est atteint 2x plus vite qu'une création."
  },
  {
    question: "Quelles certifications RGE sont nécessaires pour une entreprise photovoltaïque ?",
    answer: "Pour installer des panneaux solaires, il faut la qualification RGE 'Pose de systèmes photovoltaïques' (code 5421). Pour obtenir les aides CEE et MaPrimeRénov, cette certification est obligatoire. Les entreprises RGE se valorisent 25% plus cher."
  },
  {
    question: "Quel est le CA moyen d'une entreprise de panneaux solaires en France ?",
    answer: "Le CA moyen se situe entre 300k€ et 1.5M€. Répartition : TPE (1-3 salariés) = 200-400k€, PME (4-10 salariés) = 500k-1.5M€, Moyennes (10-30 salariés) = 1.5M-5M€. Le secteur photovoltaïque croît de 25%/an depuis 2020."
  }
];

// FAQ POMPE À CHALEUR
export const faqPompeAChaleur = [
  {
    question: "Quelle est la valorisation d'une entreprise d'installation de pompes à chaleur ?",
    answer: "Une entreprise de PAC se valorise entre 0.5x et 1.3x le CA annuel. Prime pour : certification RGE QualiPAC (+25%), multi-énergies (PAC air/eau, air/air, géothermie), SAV organisé. Exemple : entreprise RGE 800k€ CA = 550k à 900k€ de valorisation."
  },
  {
    question: "Le marché de la pompe à chaleur est-il rentable en 2025 ?",
    answer: "Oui, très rentable. Le marché français croît de 30%/an. Facteurs : interdiction chaudières gaz neuves (2026), aides massives (MaPrimeRénov jusqu'à 11 000€), RE2020. Marge nette moyenne : 12-18%. ROI sur reprise : 3-4 ans."
  },
  {
    question: "Certification RGE obligatoire pour installer des pompes à chaleur ?",
    answer: "Oui, la qualification QualiPAC (RGE) est obligatoire pour que les clients obtiennent les aides d'État. Sans RGE, vous perdez 70% du marché. La reprise d'une entreprise déjà certifiée évite 12-18 mois de démarches."
  }
];

// FAQ ÉNERGIES RENOUVELABLES
export const faqEnergiesRenouvelables = [
  {
    question: "Quels types d'entreprises énergies renouvelables sont disponibles à la vente ?",
    answer: "Vous trouverez des entreprises spécialisées en : photovoltaïque (panneaux solaires), pompes à chaleur, isolation thermique, chauffage biomasse, éolien domestique, audit énergétique. La majorité possède la certification RGE."
  },
  {
    question: "Pourquoi investir dans une entreprise énergies renouvelables en 2025 ?",
    answer: "Le secteur ENR croît de 25-35%/an. Facteurs : RE2020, interdiction chaudières fossiles (2026), MaPrimeRénov (9 milliards €/an), objectif neutralité carbone 2050. Les marges sont de 15-20% et les carnets de commandes pleins sur 6-12 mois."
  },
  {
    question: "Quelle est la valorisation moyenne d'une entreprise ENR ?",
    answer: "Multiples selon sous-secteur : Photovoltaïque (0.6x-1.5x CA), PAC (0.5x-1.3x CA), Isolation (0.4x-0.9x CA). Les entreprises RGE bénéficient d'une prime de valorisation de 20-30%. Une société ENR avec 800k€ CA RGE vaut 500k à 1M€."
  }
];

// FAQ RGE
export const faqRGE = [
  {
    question: "Qu'est-ce que la certification RGE et pourquoi est-elle importante ?",
    answer: "RGE (Reconnu Garant de l'Environnement) est une qualification obligatoire pour que vos clients obtiennent les aides d'État (MaPrimeRénov, CEE). Sans RGE, vous perdez 70% du marché. L'obtenir prend 12-18 mois, d'où l'intérêt de reprendre une entreprise déjà certifiée."
  },
  {
    question: "Combien vaut une entreprise RGE comparée à une non-RGE ?",
    answer: "Une entreprise RGE se valorise 20-30% plus cher qu'une équivalente non-certifiée. Exemple : société 600k€ CA non-RGE = 300k€, même société RGE = 400-450k€. La certification apporte sécurité et croissance garantie."
  },
  {
    question: "Quels secteurs nécessitent obligatoirement la certification RGE ?",
    answer: "RGE obligatoire pour : installation panneaux solaires, pompes à chaleur, isolation thermique (ITE, combles), chauffage biomasse, audit énergétique, ventilation double-flux. Tous secteurs éligibles aux aides MaPrimeRénov et CEE."
  }
];

export default {
  pagesMetiersSpecifiques,
  serviceEnergiesRenouvelablesSchema,
  faqPhotovoltaique,
  faqPompeAChaleur,
  faqEnergiesRenouvelables,
  faqRGE
};
