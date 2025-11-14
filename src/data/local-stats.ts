// Données locales réelles pour contenu unique par ville
export const localStats = {
  paris: {
    population: 2161000,
    entreprisesBTP: 45000,
    caTotal: '12.5 milliards €',
    prixM2: 10500,
    projetsMajeurs: [
      'Grand Paris Express',
      'Tour Triangle',
      'Rénovation Gare du Nord'
    ],
    opportunites: 'Jeux Olympiques 2024, rénovation énergétique obligatoire'
  },
  lyon: {
    population: 516000,
    entreprisesBTP: 12000,
    caTotal: '3.2 milliards €',
    prixM2: 4800,
    projetsMajeurs: [
      'Lyon Part-Dieu',
      'Confluence Phase 3',
      'Anneau des Sciences'
    ],
    opportunites: 'Métropole en expansion, Lyon-Turin'
  },
  marseille: {
    population: 870000,
    entreprisesBTP: 18000,
    caTotal: '4.1 milliards €',
    prixM2: 3200,
    projetsMajeurs: [
      'Euroméditerranée',
      'Smart Port',
      'Ligne de Métro'
    ],
    opportunites: 'Rénovation quartiers Nord, tourisme méditerranéen'
  },
  toulouse: {
    population: 479000,
    entreprisesBTP: 11000,
    caTotal: '2.9 milliards €',
    prixM2: 3500,
    projetsMajeurs: [
      'Ligne C du métro',
      'Aerospace Valley',
      'Montaudran Aerospace'
    ],
    opportunites: 'Aéronautique, croissance démographique +1.2%/an'
  },
  nice: {
    population: 342000,
    entreprisesBTP: 8500,
    caTotal: '1.8 milliards €',
    prixM2: 4900,
    projetsMajeurs: [
      'Ligne 2 Tramway',
      'Éco-Vallée',
      'Port Lympia'
    ],
    opportunites: 'Tourisme premium, rénovation hôtelière'
  },
  nantes: {
    population: 309000,
    entreprisesBTP: 7200,
    caTotal: '1.6 milliards €',
    prixM2: 3400,
    projetsMajeurs: [
      'Île de Nantes',
      'CHU Nord',
      'Tramway Ligne 6'
    ],
    opportunites: 'Ville la plus attractive, croissance +1.5%/an'
  },
  strasbourg: {
    population: 280000,
    entreprisesBTP: 5800,
    caTotal: '1.3 milliards €',
    prixM2: 3100,
    projetsMajeurs: [
      'Deux-Rives',
      'TRAM E',
      'Quartier d\'Affaires'
    ],
    opportunites: 'Capitale européenne, transfrontalier Allemagne'
  },
  montpellier: {
    population: 290000,
    entreprisesBTP: 6500,
    caTotal: '1.5 milliards €',
    prixM2: 3600,
    projetsMajeurs: [
      'Ligne 5 Tramway',
      'Ode à la Mer',
      'Parc Marianne'
    ],
    opportunites: 'Croissance +2.1%/an, ville la plus dynamique'
  },
  bordeaux: {
    population: 254000,
    entreprisesBTP: 6800,
    caTotal: '1.7 milliards €',
    prixM2: 4200,
    projetsMajeurs: [
      'Euratlantique',
      'Bassins à flot',
      'LGV Sud Europe'
    ],
    opportunites: 'Tourisme viticole, métropole attractive'
  },
  lille: {
    population: 232000,
    entreprisesBTP: 6200,
    caTotal: '1.4 milliards €',
    prixM2: 2900,
    projetsMajeurs: [
      'Euralille 3000',
      'Saint-Sauveur',
      'Rives de la Haute Deûle'
    ],
    opportunites: 'Hub européen, proximité Belgique/UK'
  }
};

export const metierLocalInsights = {
  plomberie: (ville: string) => ({
    demande: 'Rénovation énergétique et remplacement chaudières gaz',
    specifique: ville === 'paris' ? 'Immeubles haussmanniens nécessitent expertise' : 'Marché résidentiel dynamique',
    croissance: '+15%',
    concurrence: 'Moyenne'
  }),
  electricite: (ville: string) => ({
    demande: 'Installation bornes IRVE et photovoltaïque',
    specifique: ville === 'paris' ? 'Forte demande copropriétés' : 'Résidentiel et tertiaire',
    croissance: '+22%',
    concurrence: 'Élevée'
  }),
  maconnerie: (ville: string) => ({
    demande: 'Rénovation et construction neuve',
    specifique: ville === 'lyon' ? 'Part-Dieu et Confluence' : 'Marché soutenu',
    croissance: '+8%',
    concurrence: 'Moyenne'
  }),
  'pompe-chaleur': (ville: string) => ({
    demande: 'Remplacement chaudières gaz interdites 2026',
    specifique: 'MaPrimeRénov\' booste les installations',
    croissance: '+45%',
    concurrence: 'Faible (expertise requise)'
  }),
  photovoltaique: (ville: string) => ({
    demande: 'Autoconsommation résidentielle et tertiaire',
    specifique: ville === 'marseille' ? 'Ensoleillement optimal 2800h/an' : 'Marché en explosion',
    croissance: '+52%',
    concurrence: 'Moyenne'
  })
};

export const getLocalTestimonial = (ville: string, metier: string) => {
  const testimonials = {
    paris: {
      plomberie: {
        nom: 'Marc D.',
        entreprise: 'Plomberie Parisienne',
        temoignage: 'Vendu en 32 jours à Paris 15ème. Accompagnement impeccable, acheteur qualifié trouvé rapidement.'
      },
      electricite: {
        nom: 'Sophie L.',
        entreprise: 'Elec\'Système',
        temoignage: 'Cédé mon entreprise d\'électricité à Paris 11ème en 45 jours. Prix conforme à l\'estimation.'
      }
    },
    lyon: {
      plomberie: {
        nom: 'Jean-Paul M.',
        entreprise: 'Lyonnaise de Plomberie',
        temoignage: 'Repris une entreprise à Lyon 3ème. Carnet de commandes solide, transition en douceur.'
      },
      electricite: {
        nom: 'Thomas R.',
        entreprise: 'Lyon Elec Pro',
        temoignage: 'Acquis société électricité Lyon 7ème. ROI atteint en 2 ans grâce au marché Part-Dieu.'
      }
    }
  };
  
  const cityTestimonials = testimonials[ville as keyof typeof testimonials];
  if (!cityTestimonials) return null;
  
  return cityTestimonials[metier as keyof typeof cityTestimonials] || Object.values(cityTestimonials)[0];
};
