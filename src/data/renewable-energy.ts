export interface RenewableEnergyData {
  slug: string;
  title: string;
  keywords: string[];
  marketSize: string;
  growth: string;
  avgPrice: string;
  certifications: string[];
  description: string;
  marches: string[];
  aides: string[];
  equipements: string[];
  formation: string;
  searchVolume: number;
}

export const renewableEnergies: RenewableEnergyData[] = [
  {
    slug: 'pompe-chaleur',
    title: 'Pompes à Chaleur',
    keywords: ['pompe chaleur', 'pac', 'qualipac', 'rge', 'geothermie', 'aerothermie'],
    marketSize: '3.2 milliards €',
    growth: '+35%',
    avgPrice: '450000',
    certifications: ['RGE QualiPAC', 'QualiPAC Chauffage', 'QualiPAC ECS'],
    description: 'Marché en explosion avec MaPrimeRénov\' et REP 2024. Les pompes à chaleur représentent l\'avenir du chauffage résidentiel et tertiaire.',
    marches: [
      'Résidentiel individuel (65%)',
      'Collectif/Tertiaire (25%)',
      'Industriel (10%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 11,000€',
      'CEE jusqu\'à 4,500€',
      'TVA réduite 5.5%',
      'Eco-PTZ jusqu\'à 50,000€'
    ],
    equipements: ['PAC Air/Air', 'PAC Air/Eau', 'PAC Géothermique', 'PAC Hybride'],
    formation: '5 jours QualiPAC + maintien tous les 2 ans',
    searchVolume: 2500
  },
  {
    slug: 'photovoltaique',
    title: 'Photovoltaïque',
    keywords: ['panneaux solaires', 'photovoltaique', 'qualipv', 'autoconsommation', 'solaire'],
    marketSize: '4.1 milliards €',
    growth: '+42%',
    avgPrice: '520000',
    certifications: ['RGE QualiPV Elec', 'QualiPV Bat', 'QualiSol CESI'],
    description: 'Boom du solaire avec obligation RE2020 et flambée des prix de l\'électricité. Marché résidentiel et tertiaire en forte croissance.',
    marches: [
      'Autoconsommation résidentielle (45%)',
      'Revente totale EDF OA (30%)',
      'Grandes toitures tertiaires (25%)'
    ],
    aides: [
      'Prime autoconsommation jusqu\'à 2,880€',
      'Tarif achat EDF OA garanti 20 ans',
      'TVA réduite 10%',
      'Crédit d\'impôt entreprise'
    ],
    equipements: ['Onduleurs', 'Batteries stockage', 'Monitoring', 'Structure pose'],
    formation: 'QualiPV 5 jours + Habilitation électrique BR + Travaux en hauteur',
    searchVolume: 3100
  },
  {
    slug: 'isolation-thermique-exterieure',
    title: 'Isolation Thermique Extérieure',
    keywords: ['ite', 'isolation exterieure', 'bardage', 'enduit', 'qualibat 7131'],
    marketSize: '2.8 milliards €',
    growth: '+28%',
    avgPrice: '380000',
    certifications: ['Qualibat 7131', 'Qualibat 7132', 'RGE Eco-Artisan'],
    description: 'Marché porté par la rénovation énergétique obligatoire et la lutte contre les passoires thermiques.',
    marches: [
      'Maisons individuelles (40%)',
      'Copropriétés (35%)',
      'Bâtiments publics (25%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 75€/m²',
      'CEE jusqu\'à 50€/m²',
      'Action Logement',
      'Aides locales collectivités'
    ],
    equipements: ['Échafaudages', 'Machine enduit', 'Découpe isolants', 'Outillage spécialisé'],
    formation: 'ETICS + Qualibat + Amiante SS4',
    searchVolume: 1900
  },
  {
    slug: 'renovation-energetique-globale',
    title: 'Rénovation Énergétique Globale',
    keywords: ['renovation globale', 'mon accompagnateur renov', 'audit energetique', 'rge'],
    marketSize: '5.6 milliards €',
    growth: '+45%',
    avgPrice: '680000',
    certifications: ['RGE Études', 'RGE Travaux', 'Audit énergétique'],
    description: 'Marché en explosion avec l\'obligation de rénovation globale et les parcours accompagnés MaPrimeRénov\'.',
    marches: [
      'Maisons individuelles BBC (50%)',
      'Copropriétés fragiles (30%)',
      'Bâtiments tertiaires (20%)'
    ],
    aides: [
      'MaPrimeRénov\' Parcours Accompagné jusqu\'à 63,000€',
      'Bonus sortie passoire 10,000€',
      'Bonus BBC 10,000€',
      'CEE cumulables'
    ],
    equipements: ['Matériel audit', 'Caméra thermique', 'Logiciels calcul'],
    formation: 'FEE Bat + Audit énergétique + Mon Accompagnateur Rénov\'',
    searchVolume: 1600
  },
  {
    slug: 'chauffage-biomasse',
    title: 'Chauffage Biomasse',
    keywords: ['poele bois', 'chaudiere granules', 'qualibois', 'biomasse'],
    marketSize: '1.8 milliards €',
    growth: '+25%',
    avgPrice: '420000',
    certifications: ['RGE QualiBois Air', 'QualiBois Eau', 'QualiBois Module'],
    description: 'Renaissance du bois énergie avec les chaudières à granulés et poêles performants.',
    marches: [
      'Poêles à granulés (45%)',
      'Chaudières biomasse (35%)',
      'Inserts et foyers (20%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 10,000€',
      'CEE bonifiés bois',
      'TVA 5.5%',
      'Prêt avance rénovation'
    ],
    equipements: ['Stock granulés', 'Ramonage professionnel', 'SAV'],
    formation: 'QualiBois 3 jours + Fumisterie',
    searchVolume: 1400
  },
  {
    slug: 'vmc-double-flux',
    title: 'VMC Double Flux',
    keywords: ['vmc double flux', 'ventilation', 'qualite air', 'rge'],
    marketSize: '980 millions €',
    growth: '+32%',
    avgPrice: '320000',
    certifications: ['Qualibat 5412', 'RGE Qualité Air'],
    description: 'Obligation RE2020 et prise de conscience qualité air intérieur.',
    marches: [
      'Maisons neuves BBC (55%)',
      'Rénovation lourde (30%)',
      'Tertiaire bureaux (15%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 4,000€',
      'CEE ventilation',
      'TVA 5.5%'
    ],
    equipements: ['Caisson VMC DF', 'Réseau gaines', 'Bouches extraction'],
    formation: 'Qualibat ventilation + Étanchéité à l\'air',
    searchVolume: 1200
  },
  {
    slug: 'menuiserie-rge',
    title: 'Menuiserie RGE',
    keywords: ['menuiserie rge', 'fenetres', 'portes', 'isolation'],
    marketSize: '3.4 milliards €',
    growth: '+18%',
    avgPrice: '420000',
    certifications: ['RGE Qualibat 3511', 'Qualibat 3521'],
    description: 'Remplacement des menuiseries anciennes pour améliorer l\'isolation thermique et acoustique.',
    marches: [
      'Fenêtres PVC/Alu (60%)',
      'Portes d\'entrée (25%)',
      'Volets roulants (15%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 100€/équipement',
      'CEE menuiseries',
      'TVA 5.5%'
    ],
    equipements: ['Mesures précises', 'Pose qualifiée', 'SAV'],
    formation: 'Qualibat menuiserie + RGE',
    searchVolume: 1100
  },
  {
    slug: 'borne-recharge-irve',
    title: 'Borne de Recharge IRVE',
    keywords: ['borne recharge', 'irve', 'voiture electrique', 'wallbox'],
    marketSize: '1.2 milliards €',
    growth: '+68%',
    avgPrice: '280000',
    certifications: ['IRVE Niveau 1', 'IRVE Niveau 2', 'IRVE Niveau 3', 'Qualifelec IRVE'],
    description: 'Marché explosif avec l\'interdiction des véhicules thermiques en 2035 et obligation RE2020.',
    marches: [
      'Résidentiel individuel (50%)',
      'Copropriétés (30%)',
      'Entreprises/Parking (20%)'
    ],
    aides: [
      'Programme Advenir jusqu\'à 960€',
      'Crédit impôt 75% (300€ max)',
      'TVA 5.5% résidentiel',
      'Subventions locales'
    ],
    equipements: ['Bornes AC/DC', 'Câbles', 'Supervision'],
    formation: 'IRVE P1/P2/P3 + Habilitation électrique',
    searchVolume: 1800
  },
  {
    slug: 'audit-energetique',
    title: 'Audit Énergétique',
    keywords: ['audit energetique', 'dee', 'diagnostic', 'rge etudes'],
    marketSize: '620 millions €',
    growth: '+52%',
    avgPrice: '180000',
    certifications: ['RGE Études', 'Audit énergétique réglementaire'],
    description: 'Obligation d\'audit pour vente passoires thermiques et parcours accompagnés rénovation.',
    marches: [
      'Audits réglementaires vente (40%)',
      'Audits MaPrimeRénov\' (35%)',
      'Audits Tertiaire Décret (25%)'
    ],
    aides: [
      'Forfait audit MaPrimeRénov\' 500€',
      'CEE audit',
      'Pris en charge parcours accompagné'
    ],
    equipements: ['Caméra thermique', 'Logiciels', 'Infiltrométrie'],
    formation: 'Formation audit réglementaire + Logiciels métier',
    searchVolume: 980
  },
  {
    slug: 'chaudiere-biomasse-qualibois',
    title: 'Chaudière Biomasse QualiB ois',
    keywords: ['chaudiere bois', 'chaudiere granules', 'qualibois eau'],
    marketSize: '1.1 milliards €',
    growth: '+29%',
    avgPrice: '390000',
    certifications: ['QualiBois Eau', 'QualiBois Module Eau'],
    description: 'Alternative écologique au gaz avec autonomie et prix stable du combustible bois.',
    marches: [
      'Chaudières à granulés (55%)',
      'Chaudières bûches (30%)',
      'Chaudières mixtes (15%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 10,000€',
      'CEE chaudière biomasse',
      'TVA 5.5%'
    ],
    equipements: ['Silo granulés', 'Installation complète', 'Régulation'],
    formation: 'QualiBois Eau + Fumisterie professionnelle',
    searchVolume: 870
  },
  {
    slug: 'solaire-thermique',
    title: 'Solaire Thermique',
    keywords: ['chauffe eau solaire', 'cesi', 'ssc', 'qualisol'],
    marketSize: '680 millions €',
    growth: '+22%',
    avgPrice: '290000',
    certifications: ['QualiSol CESI', 'QualiSol COMBI', 'QualiSol Collectif'],
    description: 'Production eau chaude sanitaire et chauffage gratuit grâce au soleil.',
    marches: [
      'CESI individuels (50%)',
      'SSC maisons (30%)',
      'Solaire collectif (20%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 4,000€',
      'CEE solaire thermique',
      'TVA 5.5%'
    ],
    equipements: ['Capteurs solaires', 'Ballon stockage', 'Régulation'],
    formation: 'QualiSol CESI 2 jours + Plomberie',
    searchVolume: 720
  },
  {
    slug: 'domotique-batiment',
    title: 'Domotique et GTB',
    keywords: ['domotique', 'gtb', 'smart home', 'pilotage energie'],
    marketSize: '1.4 milliards €',
    growth: '+38%',
    avgPrice: '350000',
    certifications: ['KNX Partner', 'Certifié GTB'],
    description: 'Pilotage intelligent des consommations énergétiques et confort automatisé.',
    marches: [
      'Maisons individuelles (45%)',
      'Tertiaire bureaux (35%)',
      'Collectif logements (20%)'
    ],
    aides: [
      'CEE Domotique',
      'MaPrimeRénov\' régulation',
      'Crédit impôt transition énergétique'
    ],
    equipements: ['Box domotique', 'Capteurs', 'Actionneurs', 'Interface'],
    formation: 'KNX + BMS + Protocoles communication',
    searchVolume: 650
  },
  {
    slug: 'bureau-etudes-thermique',
    title: 'Bureau d\'Études Thermique',
    keywords: ['bureau etudes thermique', 'bet', 're2020', 'bbio'],
    marketSize: '890 millions €',
    growth: '+31%',
    avgPrice: '420000',
    certifications: ['RGE Études', 'Logiciel RT2012/RE2020'],
    description: 'Indispensable pour toute construction neuve et rénovation lourde avec obligations RE2020.',
    marches: [
      'Études RE2020 neuf (50%)',
      'Audits rénovation (30%)',
      'Assistance maîtrise ouvrage (20%)'
    ],
    aides: [
      'Études prises en charge MaPrimeRénov\'',
      'Forfait assistance MOA'
    ],
    equipements: ['Logiciels thermiques', 'Infiltrométrie', 'Thermographie'],
    formation: 'Formation RE2020 + Logiciels + Ingénierie thermique',
    searchVolume: 780
  },
  {
    slug: 'geothermie',
    title: 'Géothermie',
    keywords: ['geothermie', 'pac geothermique', 'sondes', 'forage'],
    marketSize: '520 millions €',
    growth: '+41%',
    avgPrice: '580000',
    certifications: ['QualiForage', 'RGE QualiPAC'],
    description: 'Solution haut de gamme avec meilleur rendement et stabilité température.',
    marches: [
      'Maisons neuves haut de gamme (60%)',
      'Rénovation lourde (25%)',
      'Tertiaire (15%)'
    ],
    aides: [
      'MaPrimeRénov\' jusqu\'à 11,000€',
      'CEE bonifiés',
      'TVA 5.5%',
      'Crédit impôt'
    ],
    equipements: ['Foreuse', 'Sondes géothermiques', 'PAC eau/eau'],
    formation: 'QualiForage + QualiPAC + Forage',
    searchVolume: 560
  },
  {
    slug: 'etancheite-air',
    title: 'Étanchéité à l\'Air',
    keywords: ['etancheite air', 'test infiltrometrie', 'bbio', 're2020'],
    marketSize: '380 millions €',
    growth: '+48%',
    avgPrice: '220000',
    certifications: ['Qualibat 8731', 'Mesureur agréé'],
    description: 'Obligation RE2020 et BBC rénovation avec tests d\'infiltrométrie systématiques.',
    marches: [
      'Tests infiltrométrie (50%)',
      'Traitement ponts thermiques (30%)',
      'Audit étanchéité (20%)'
    ],
    aides: [
      'Pris en charge RE2020',
      'Forfait test BBC'
    ],
    equipements: ['Porte soufflante', 'Mesureur débit', 'Caméra thermique'],
    formation: 'Mesureur infiltrométrie + Qualibat',
    searchVolume: 490
  }
];

// Mots-clés Google Ads par catégorie
export const googleAdsKeywords = {
  pompeChaleur: {
    budget: 800,
    keywords: [
      { term: "entreprise pompe a chaleur a vendre", cpc: 3.20 },
      { term: "societe qualipac a reprendre", cpc: 2.80 },
      { term: "entreprise pac rge a vendre", cpc: 2.50 },
      { term: "installateur pompe chaleur a reprendre", cpc: 2.10 },
      { term: "entreprise geothermie a vendre", cpc: 1.90 }
    ]
  },
  photovoltaique: {
    budget: 900,
    keywords: [
      { term: "entreprise photovoltaique a vendre", cpc: 3.50 },
      { term: "societe panneaux solaires a reprendre", cpc: 3.10 },
      { term: "entreprise qualipv a vendre", cpc: 2.70 },
      { term: "installateur solaire rge a reprendre", cpc: 2.40 },
      { term: "entreprise energie solaire a vendre", cpc: 2.20 }
    ]
  },
  isolation: {
    budget: 600,
    keywords: [
      { term: "entreprise isolation exterieure a vendre", cpc: 2.60 },
      { term: "societe ite rge a reprendre", cpc: 2.30 },
      { term: "entreprise bardage isolation a vendre", cpc: 2.00 },
      { term: "societe qualibat 7131 a reprendre", cpc: 1.80 },
      { term: "entreprise renovation energetique a vendre", cpc: 2.90 }
    ]
  }
};
