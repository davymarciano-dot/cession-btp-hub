export interface MetierComplete {
  slug: string;
  name: string;
  category: 'gros-oeuvre' | 'second-oeuvre' | 'specialite' | 'service' | 'tp';
  marketSize: string;
  avgPrice: string;
  avgRevenue: string;
  avgMargin: string;
  multiple: string;
  certifications: string[];
  description: string;
  qualifications: string[];
  avgBacklog: string;
}

export const metiersComplete: MetierComplete[] = [
  // GROS OEUVRE
  {
    slug: 'maconnerie',
    name: 'Maçonnerie',
    category: 'gros-oeuvre',
    marketSize: '25 milliards €',
    avgPrice: '680000',
    avgRevenue: '1250000',
    avgMargin: '11%',
    multiple: '0.5-0.6x EBITDA',
    certifications: ['Qualibat', 'RGE'],
    description: 'La maçonnerie représente le cœur du gros œuvre avec une croissance stable de 3% par an.',
    qualifications: ['CAP/BEP Maçonnerie', '3 ans expérience minimum', 'Qualibat 2111'],
    avgBacklog: '4-6 mois'
  },
  {
    slug: 'charpente',
    name: 'Charpente',
    category: 'gros-oeuvre',
    marketSize: '8 milliards €',
    avgPrice: '520000',
    avgRevenue: '950000',
    avgMargin: '13%',
    multiple: '0.5-0.7x EBITDA',
    certifications: ['Qualibat', 'RGE'],
    description: 'La charpente bénéficie du renouveau du bois dans la construction.',
    qualifications: ['CAP Charpentier', 'Qualibat 2362'],
    avgBacklog: '3-5 mois'
  },
  {
    slug: 'couverture',
    name: 'Couverture',
    category: 'gros-oeuvre',
    marketSize: '12 milliards €',
    avgPrice: '520000',
    avgRevenue: '950000',
    avgMargin: '14%',
    multiple: '0.6-0.7x EBITDA',
    certifications: ['Qualibat', 'RGE'],
    description: 'La couverture est portée par la rénovation énergétique des toitures.',
    qualifications: ['CAP Couvreur', 'Qualibat 3211'],
    avgBacklog: '2-4 mois'
  },
  {
    slug: 'terrassement',
    name: 'Terrassement',
    category: 'gros-oeuvre',
    marketSize: '15 milliards €',
    avgPrice: '890000',
    avgRevenue: '1800000',
    avgMargin: '10%',
    multiple: '0.4-0.5x EBITDA',
    certifications: ['Qualibat'],
    description: 'Le terrassement est essentiel à tout projet de construction.',
    qualifications: ['CACES engins', 'Expérience 5 ans'],
    avgBacklog: '6-9 mois'
  },
  
  // SECOND OEUVRE
  {
    slug: 'plomberie',
    name: 'Plomberie',
    category: 'second-oeuvre',
    marketSize: '15 milliards €',
    avgPrice: '450000',
    avgRevenue: '850000',
    avgMargin: '12%',
    multiple: '0.5-0.6x EBITDA',
    certifications: ['RGE', 'QualiPAC', 'PGN', 'PGP'],
    description: 'La plomberie est un secteur stable avec forte demande en rénovation.',
    qualifications: ['CAP Plombier', 'RGE', 'Attestation gaz'],
    avgBacklog: '2-3 mois'
  },
  {
    slug: 'electricite',
    name: 'Électricité',
    category: 'second-oeuvre',
    marketSize: '18 milliards €',
    avgPrice: '420000',
    avgRevenue: '780000',
    avgMargin: '15%',
    multiple: '0.5-0.7x EBITDA',
    certifications: ['Qualifelec', 'RGE', 'QualiPV', 'IRVE'],
    description: 'L\'électricité est boostée par la mobilité électrique et le photovoltaïque.',
    qualifications: ['CAP Électricien', 'Qualifelec'],
    avgBacklog: '3-4 mois'
  },
  {
    slug: 'chauffage',
    name: 'Chauffage',
    category: 'second-oeuvre',
    marketSize: '14 milliards €',
    avgPrice: '480000',
    avgRevenue: '890000',
    avgMargin: '13%',
    multiple: '0.6-0.7x EBITDA',
    certifications: ['RGE', 'QualiPAC', 'QualiBois'],
    description: 'Le chauffage est en pleine transition énergétique.',
    qualifications: ['CAP Chauffagiste', 'RGE', 'QualiPAC'],
    avgBacklog: '2-3 mois'
  },
  {
    slug: 'carrelage',
    name: 'Carrelage',
    category: 'second-oeuvre',
    marketSize: '6 milliards €',
    avgPrice: '320000',
    avgRevenue: '580000',
    avgMargin: '16%',
    multiple: '0.5-0.6x EBITDA',
    certifications: ['Qualibat'],
    description: 'Le carrelage reste incontournable dans la finition.',
    qualifications: ['CAP Carreleur', 'Qualibat 4421'],
    avgBacklog: '1-2 mois'
  },
  {
    slug: 'peinture',
    name: 'Peinture',
    category: 'second-oeuvre',
    marketSize: '8 milliards €',
    avgPrice: '320000',
    avgRevenue: '580000',
    avgMargin: '14%',
    multiple: '0.5-0.6x EBITDA',
    certifications: ['Qualibat'],
    description: 'La peinture est essentielle en rénovation et construction neuve.',
    qualifications: ['CAP Peintre', 'Qualibat 2151'],
    avgBacklog: '1-2 mois'
  },
  {
    slug: 'menuiserie',
    name: 'Menuiserie',
    category: 'second-oeuvre',
    marketSize: '10 milliards €',
    avgPrice: '420000',
    avgRevenue: '780000',
    avgMargin: '12%',
    multiple: '0.5-0.6x EBITDA',
    certifications: ['Qualibat', 'RGE'],
    description: 'La menuiserie bénéficie de la rénovation énergétique.',
    qualifications: ['CAP Menuisier', 'RGE', 'Qualibat 3511'],
    avgBacklog: '3-4 mois'
  },
  
  // SPECIALITES
  {
    slug: 'isolation',
    name: 'Isolation',
    category: 'specialite',
    marketSize: '9 milliards €',
    avgPrice: '480000',
    avgRevenue: '890000',
    avgMargin: '15%',
    multiple: '0.6-0.7x EBITDA',
    certifications: ['RGE', 'Qualibat'],
    description: 'L\'isolation thermique est portée par les aides d\'État.',
    qualifications: ['RGE', 'Qualibat 7131'],
    avgBacklog: '2-4 mois'
  },
  {
    slug: 'photovoltaique',
    name: 'Photovoltaïque',
    category: 'specialite',
    marketSize: '5 milliards €',
    avgPrice: '620000',
    avgRevenue: '1100000',
    avgMargin: '18%',
    multiple: '0.6-0.8x EBITDA',
    certifications: ['RGE', 'QualiPV', 'Qualifelec'],
    description: 'Le photovoltaïque connaît une croissance explosive.',
    qualifications: ['QualiPV', 'Habilitation électrique'],
    avgBacklog: '4-6 mois'
  },
  {
    slug: 'ravalement',
    name: 'Ravalement',
    category: 'specialite',
    marketSize: '7 milliards €',
    avgPrice: '450000',
    avgRevenue: '820000',
    avgMargin: '13%',
    multiple: '0.5-0.6x EBITDA',
    certifications: ['Qualibat'],
    description: 'Le ravalement de façade est obligatoire tous les 10 ans à Paris.',
    qualifications: ['Qualibat 2122'],
    avgBacklog: '3-5 mois'
  },
  
  // SERVICES
  {
    slug: 'architecte',
    name: 'Architecte',
    category: 'service',
    marketSize: '4 milliards €',
    avgPrice: '380000',
    avgRevenue: '450000',
    avgMargin: '25%',
    multiple: '0.8-1.2x EBITDA',
    certifications: ['Ordre des Architectes'],
    description: 'Les cabinets d\'architecture ont des marges élevées.',
    qualifications: ['Diplôme État Architecte', 'Inscription Ordre'],
    avgBacklog: '6-12 mois'
  },
  {
    slug: 'bureau-etudes',
    name: 'Bureau d\'études',
    category: 'service',
    marketSize: '6 milliards €',
    avgPrice: '520000',
    avgRevenue: '680000',
    avgMargin: '22%',
    multiple: '0.7-1x EBITDA',
    certifications: [],
    description: 'Les bureaux d\'études sont indispensables aux projets complexes.',
    qualifications: ['Ingénieur structure', 'Logiciels métier'],
    avgBacklog: '8-12 mois'
  }
];

export const villesFrance = [
  'paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'strasbourg',
  'montpellier', 'bordeaux', 'lille', 'rennes', 'reims', 'saint-etienne',
  'toulon', 'grenoble', 'dijon', 'angers', 'nimes', 'clermont-ferrand',
  'villeurbanne', 'le-mans', 'aix-en-provence', 'brest', 'tours', 'limoges',
  'amiens', 'perpignan', 'metz', 'besancon', 'orleans', 'rouen', 'mulhouse',
  'caen', 'nancy', 'avignon', 'poitiers', 'versailles', 'cannes', 'antibes'
];
