export interface DemoListing {
  id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  revenue: number;
  employees: number;
  created: string;
  description: string;
  image: string;
  badge: string;
  features: string[];
  seller_type: string;
  sector: string;
}

export const demoListings: DemoListing[] = [
  {
    id: 'demo-1',
    title: 'Entreprise de Maçonnerie Générale',
    category: 'masonry',
    sector: 'Maçonnerie',
    location: 'Paris (75)',
    price: 750000,
    revenue: 1200000,
    employees: 8,
    created: '2015',
    description: 'Entreprise familiale de maçonnerie avec 8 ans d\'expérience. Clientèle fidèle, carnet de commandes rempli sur 6 mois.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    badge: 'Coup de cœur',
    features: ['Matériel récent', 'Équipe formée', 'Certifications RGE'],
    seller_type: 'Départ retraite'
  },
  {
    id: 'demo-2',
    title: 'Société de Plomberie-Chauffage',
    category: 'plumbing',
    sector: 'Plomberie',
    location: 'Lyon (69)',
    price: 450000,
    revenue: 800000,
    employees: 5,
    created: '2018',
    description: 'PME spécialisée en installation et dépannage. Contrats de maintenance réguliers. Zone d\'intervention: Grand Lyon.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    badge: 'Urgent',
    features: ['QualiPAC', 'PGN/PGP', 'Véhicules équipés'],
    seller_type: 'Changement d\'activité'
  },
  {
    id: 'demo-3',
    title: 'Électricité Générale & Domotique',
    category: 'electrical',
    sector: 'Électricité',
    location: 'Marseille (13)',
    price: 580000,
    revenue: 950000,
    employees: 6,
    created: '2016',
    description: 'Entreprise moderne spécialisée dans l\'électricité et la domotique haut de gamme. Partenariats avec promoteurs.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    badge: 'Premium',
    features: ['Qualifelec', 'IRVE', 'Domotique KNX'],
    seller_type: 'Développement autre région'
  },
  {
    id: 'demo-4',
    title: 'Entreprise de Peinture et Décoration',
    category: 'painting',
    sector: 'Peinture',
    location: 'Toulouse (31)',
    price: 320000,
    revenue: 650000,
    employees: 4,
    created: '2019',
    description: 'Société spécialisée en travaux de peinture intérieure/extérieure et décoration. Clientèle particuliers et entreprises.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
    badge: 'Rentable',
    features: ['Qualibat', 'Éco-responsable', 'Devis gratuits'],
    seller_type: 'Raisons familiales'
  },
  {
    id: 'demo-5',
    title: 'Carrelage et Revêtements de Sols',
    category: 'tiling',
    sector: 'Carrelage',
    location: 'Nice (06)',
    price: 420000,
    revenue: 720000,
    employees: 5,
    created: '2017',
    description: 'Spécialiste pose de carrelage haut de gamme et pierres naturelles. Clientèle CSP+ sur la Côte d\'Azur.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    badge: 'Haut de gamme',
    features: ['Showroom', 'Stock important', 'Garantie décennale'],
    seller_type: 'Retraite anticipée'
  },
  {
    id: 'demo-6',
    title: 'Menuiserie Aluminium & PVC',
    category: 'carpentry',
    sector: 'Menuiserie',
    location: 'Nantes (44)',
    price: 890000,
    revenue: 1450000,
    employees: 10,
    created: '2012',
    description: 'Atelier de fabrication et pose menuiseries. Machine à commande numérique. Carnets de commandes: 8 mois.',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
    badge: 'Fort potentiel',
    features: ['Atelier 800m²', 'Parc machines récent', 'RGE'],
    seller_type: 'Association pour croissance'
  },
  {
    id: 'demo-7',
    title: 'Charpente Couverture Traditionnelle',
    category: 'roofing',
    sector: 'Couverture',
    location: 'Bordeaux (33)',
    price: 670000,
    revenue: 980000,
    employees: 7,
    created: '2014',
    description: 'Entreprise artisanale spécialisée charpente bois et couverture tuiles. Expertise monuments historiques.',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800',
    badge: 'Expertise rare',
    features: ['Qualibat MH', 'Équipe qualifiée', 'Nacelles'],
    seller_type: 'Succession'
  },
  {
    id: 'demo-8',
    title: 'Terrassement et VRD',
    category: 'earthworks',
    sector: 'Terrassement',
    location: 'Lille (59)',
    price: 1200000,
    revenue: 2100000,
    employees: 12,
    created: '2010',
    description: 'Société de terrassement avec parc matériel complet. Marchés publics et privés. Certifications environnementales.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    badge: 'Leader local',
    features: ['20 engins', 'Marchés publics', 'ISO 14001'],
    seller_type: 'Rapprochement entreprises'
  },
  {
    id: 'demo-9',
    title: 'Isolation Thermique par l\'Extérieur',
    category: 'insulation',
    sector: 'Isolation',
    location: 'Strasbourg (67)',
    price: 540000,
    revenue: 920000,
    employees: 6,
    created: '2016',
    description: 'Spécialiste ITE et rénovation énergétique. Partenariats avec syndics. Éligible aux aides CEE.',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
    badge: 'Marché porteur',
    features: ['RGE', 'Échafaudages', 'Formation continue'],
    seller_type: 'Projet personnel'
  },
  {
    id: 'demo-10',
    title: 'Climatisation et Pompes à Chaleur',
    category: 'hvac',
    sector: 'Climatisation',
    location: 'Montpellier (34)',
    price: 480000,
    revenue: 820000,
    employees: 5,
    created: '2017',
    description: 'Installation et maintenance systèmes de climatisation et PAC. Contrats d\'entretien récurrents.',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800',
    badge: 'Croissance +25%',
    features: ['QualiPAC', 'Attestation fluides', 'SAV 24/7'],
    seller_type: 'Expatriation'
  }
];

export const platformStats = {
  totalListings: "2,847",
  successfulSales: "543",
  totalValue: "127M€",
  avgTime: "45 jours",
  activeRepreners: "2,347",
  satisfactionRate: "95%"
};

export const recentActivities = [
  {
    id: 1,
    action: "vente",
    company: "Entreprise de maçonnerie à Paris",
    amount: 750000,
    timeAgo: "Il y a 2h"
  },
  {
    id: 2,
    action: "inscription",
    company: "Repreneur qualifié",
    region: "Île-de-France",
    timeAgo: "Il y a 3h"
  },
  {
    id: 3,
    action: "estimation",
    company: "Société de plomberie à Lyon",
    timeAgo: "Il y a 5h"
  }
];
