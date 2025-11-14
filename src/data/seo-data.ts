export const certifications = [
  {
    slug: 'rge',
    name: 'RGE',
    fullName: 'Reconnu Garant de l\'Environnement',
    count: 127,
    description: 'Trouvez votre entreprise RGE (Reconnu Garant de l\'Environnement) à reprendre. Bénéficiez immédiatement des marchés de rénovation énergétique.',
    benefits: [
      'Accès immédiat aux marchés publics',
      'Éligibilité MaPrimeRénov\'',
      'CEE (Certificats d\'Économie d\'Énergie)',
      'Clients particuliers avec aides d\'État'
    ],
    relatedCerts: ['Qualibat', 'QualiPAC', 'Qualifelec'],
    markets: ['Rénovation énergétique', 'Isolation', 'Chauffage', 'Photovoltaïque']
  },
  {
    slug: 'qualibat',
    name: 'Qualibat',
    fullName: 'Qualification Bâtiment',
    count: 89,
    description: 'Reprenez une société Qualibat certifiée. Accédez aux marchés de construction et rénovation avec une qualification reconnue.',
    benefits: [
      'Qualification reconnue dans le bâtiment',
      'Accès aux marchés publics et privés',
      'Garantie de compétence technique',
      'Assurance décennale facilitée'
    ],
    relatedCerts: ['RGE', 'Certibat'],
    markets: ['Gros œuvre', 'Second œuvre', 'Rénovation', 'Construction neuve']
  },
  {
    slug: 'qualifelec',
    name: 'Qualifelec',
    fullName: 'Qualification Électricité',
    count: 64,
    description: 'Entreprises d\'électricité certifiées Qualifelec à vendre. Qualification reconnue pour tous travaux électriques.',
    benefits: [
      'Qualification électricité reconnue',
      'Travaux photovoltaïques autorisés',
      'Bornes de recharge électrique',
      'Installations électriques certifiées'
    ],
    relatedCerts: ['RGE', 'QualiPV'],
    markets: ['Électricité générale', 'Photovoltaïque', 'Domotique', 'Bornes recharge']
  },
  {
    slug: 'qualipac',
    name: 'QualiPAC',
    fullName: 'Qualification Pompe à Chaleur',
    count: 52,
    description: 'Sociétés QualiPAC à reprendre. Spécialistes des pompes à chaleur et systèmes thermodynamiques.',
    benefits: [
      'Installation pompes à chaleur',
      'Accès aux aides MaPrimeRénov\'',
      'Marché en forte croissance',
      'Clients particuliers et professionnels'
    ],
    relatedCerts: ['RGE', 'Qualibat'],
    markets: ['Pompes à chaleur', 'Géothermie', 'Aérothermie', 'Climatisation']
  }
];

export const metiers = [
  {
    slug: 'plombier-chauffagiste',
    name: 'Plombier Chauffagiste',
    count: 156,
    certifications: ['RGE', 'QualiPAC', 'Qualibat'],
    description: 'Entreprises de plomberie-chauffage RGE à vendre. Activités variées : installation, dépannage, rénovation énergétique.',
    averagePrice: '450000',
    averageCA: '850000',
    markets: ['Plomberie sanitaire', 'Chauffage', 'Climatisation', 'Rénovation énergétique']
  },
  {
    slug: 'electricien',
    name: 'Électricien',
    count: 134,
    certifications: ['Qualifelec', 'RGE', 'QualiPV'],
    description: 'Sociétés d\'électricité Qualifelec à reprendre. Électricité générale, photovoltaïque, domotique.',
    averagePrice: '380000',
    averageCA: '720000',
    markets: ['Électricité générale', 'Photovoltaïque', 'Domotique', 'Tableaux électriques']
  },
  {
    slug: 'couvreur',
    name: 'Couvreur',
    count: 98,
    certifications: ['Qualibat', 'RGE'],
    description: 'Entreprises de couverture Qualibat à vendre. Couverture traditionnelle, isolation toiture, zinguerie.',
    averagePrice: '520000',
    averageCA: '950000',
    markets: ['Couverture', 'Zinguerie', 'Isolation toiture', 'Charpente']
  },
  {
    slug: 'macon',
    name: 'Maçon',
    count: 187,
    certifications: ['Qualibat'],
    description: 'Sociétés de maçonnerie Qualibat à reprendre. Gros œuvre, rénovation, construction neuve.',
    averagePrice: '680000',
    averageCA: '1250000',
    markets: ['Gros œuvre', 'Fondations', 'Murs porteurs', 'Rénovation']
  },
  {
    slug: 'menuisier',
    name: 'Menuisier',
    count: 112,
    certifications: ['Qualibat', 'RGE'],
    description: 'Entreprises de menuiserie à vendre. Menuiserie bois, PVC, aluminium, isolation.',
    averagePrice: '420000',
    averageCA: '780000',
    markets: ['Fenêtres', 'Portes', 'Volets', 'Isolation']
  },
  {
    slug: 'peintre',
    name: 'Peintre',
    count: 143,
    certifications: ['Qualibat'],
    description: 'Sociétés de peinture à reprendre. Peinture intérieure, extérieure, décoration.',
    averagePrice: '320000',
    averageCA: '580000',
    markets: ['Peinture intérieure', 'Peinture extérieure', 'Revêtements', 'Décoration']
  },
  {
    slug: 'isolation-thermique',
    name: 'Isolation Thermique',
    count: 76,
    certifications: ['RGE', 'Qualibat'],
    description: 'Entreprises d\'isolation RGE à vendre. Isolation intérieure, extérieure, combles.',
    averagePrice: '480000',
    averageCA: '890000',
    markets: ['Isolation combles', 'ITE', 'ITI', 'Soufflage']
  },
  {
    slug: 'photovoltaique',
    name: 'Photovoltaïque',
    count: 54,
    certifications: ['RGE', 'QualiPV', 'Qualifelec'],
    description: 'Sociétés photovoltaïques RGE QualiPV à reprendre. Installation panneaux solaires.',
    averagePrice: '620000',
    averageCA: '1100000',
    markets: ['Panneaux solaires', 'Ombrières', 'Autoconsommation', 'Revente']
  }
];

export const regions = [
  {
    slug: 'ile-de-france',
    name: 'Île-de-France',
    departments: ['75', '77', '78', '91', '92', '93', '94', '95'],
    count: 342,
    averagePrice: '850000',
    description: 'Entreprises BTP à vendre en Île-de-France. Paris, proche et grande couronne.',
    cities: ['Paris', 'Versailles', 'Melun', 'Évry', 'Nanterre', 'Bobigny', 'Créteil', 'Cergy']
  },
  {
    slug: 'auvergne-rhone-alpes',
    name: 'Auvergne-Rhône-Alpes',
    departments: ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
    count: 287,
    averagePrice: '620000',
    description: 'Sociétés BTP à reprendre en Auvergne-Rhône-Alpes. Lyon, Grenoble, Clermont-Ferrand.',
    cities: ['Lyon', 'Grenoble', 'Saint-Étienne', 'Clermont-Ferrand', 'Annecy', 'Chambéry']
  },
  {
    slug: 'paca',
    name: 'Provence-Alpes-Côte d\'Azur',
    departments: ['04', '05', '06', '13', '83', '84'],
    count: 234,
    averagePrice: '720000',
    description: 'Entreprises BTP à vendre en PACA. Marseille, Nice, Toulon, Avignon.',
    cities: ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence', 'Avignon', 'Cannes']
  },
  {
    slug: 'occitanie',
    name: 'Occitanie',
    departments: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
    count: 198,
    averagePrice: '540000',
    description: 'Sociétés BTP à reprendre en Occitanie. Toulouse, Montpellier, Perpignan.',
    cities: ['Toulouse', 'Montpellier', 'Nîmes', 'Perpignan', 'Béziers', 'Albi']
  },
  {
    slug: 'nouvelle-aquitaine',
    name: 'Nouvelle-Aquitaine',
    departments: ['16', '17', '19', '23', '24', '33', '40', '47', '64', '79', '86', '87'],
    count: 223,
    averagePrice: '580000',
    description: 'Entreprises BTP à vendre en Nouvelle-Aquitaine. Bordeaux, Limoges, Poitiers.',
    cities: ['Bordeaux', 'Limoges', 'Poitiers', 'La Rochelle', 'Pau', 'Bayonne']
  },
  {
    slug: 'grand-est',
    name: 'Grand Est',
    departments: ['08', '10', '51', '52', '54', '55', '57', '67', '68', '88'],
    count: 176,
    averagePrice: '490000',
    description: 'Sociétés BTP à reprendre dans le Grand Est. Strasbourg, Metz, Reims.',
    cities: ['Strasbourg', 'Reims', 'Metz', 'Mulhouse', 'Nancy', 'Colmar']
  }
];

export const faqByCertification = {
  rge: [
    {
      question: 'Comment transférer une certification RGE lors d\'un rachat ?',
      answer: 'La certification RGE est liée à l\'entreprise et peut être transférée lors d\'une cession. Le repreneur doit justifier des qualifications professionnelles requises et faire une demande de transfert auprès de l\'organisme certificateur dans les 3 mois suivant la reprise.'
    },
    {
      question: 'Combien coûte une entreprise RGE ?',
      answer: 'Le prix moyen d\'une entreprise RGE varie entre 400 000€ et 1 200 000€ selon le CA, les certifications détenues (Qualibat, QualiPAC, etc.) et la zone géographique. Le premium lié au RGE représente environ 15-25% du prix.'
    },
    {
      question: 'Délai pour obtenir RGE vs racheter une société RGE ?',
      answer: 'Obtenir le RGE prend 6 à 12 mois (formation, audit, constitution dossier). Racheter une société déjà certifiée permet d\'accéder immédiatement aux marchés RGE et aux aides d\'État, avec un ROI bien plus rapide.'
    },
    {
      question: 'Quels travaux sont éligibles avec le RGE ?',
      answer: 'Isolation (combles, murs, planchers), chauffage (pompes à chaleur, chaudières), menuiseries, photovoltaïque, VMC, audit énergétique. Tous les travaux permettant l\'accès aux aides MaPrimeRénov\', CEE, éco-PTZ.'
    }
  ],
  qualibat: [
    {
      question: 'Qu\'est-ce que la qualification Qualibat ?',
      answer: 'Qualibat est la qualification professionnelle du bâtiment délivrée par un organisme indépendant. Elle atteste des compétences techniques et financières de l\'entreprise dans un domaine spécifique.'
    },
    {
      question: 'Combien de temps pour transférer Qualibat ?',
      answer: 'Le transfert de qualification Qualibat lors d\'une reprise prend 2 à 4 mois. Il faut constituer un dossier avec les moyens humains et techniques de l\'entreprise reprise.'
    }
  ]
};
