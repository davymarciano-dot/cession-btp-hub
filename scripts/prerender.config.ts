/**
 * Configuration de prerendering pour CessionBTP
 * Génère des pages HTML statiques pour le SEO
 */

// Pages principales à pré-rendre (haute priorité SEO)
export const MAIN_PAGES = [
  '/',
  '/vendre',
  '/entreprises',
  '/estimer',
  '/tarifs',
  '/blog',
  '/faq',
  '/contact',
  '/mentions-legales',
  '/cgv',
  '/equipe',
  '/success-stories',
  '/matching-ia',
  '/outils-gratuits',
  '/lexique-btp',
  '/entreprises-rge',
  '/ressources',
  '/comment-ca-marche',
];

// Pages secteur énergie renouvelable
export const ENERGY_PAGES = [
  '/secteur/energies-renouvelables',
  '/secteur/photovoltaique',
  '/secteur/panneaux-solaires',
  '/secteur/pompe-a-chaleur',
  '/secteur/isolation-thermique',
  '/secteur/installation-chauffage',
];

// Top 50 métiers BTP (pages les plus recherchées)
export const TOP_METIERS = [
  'electricite',
  'plomberie',
  'chauffage',
  'climatisation',
  'maconnerie',
  'carrelage',
  'peinture',
  'menuiserie',
  'charpente',
  'couverture',
  'isolation',
  'photovoltaique',
  'pompe-a-chaleur',
  'terrassement',
  'demolition',
  'renovation',
  'gros-oeuvre',
  'second-oeuvre',
  'etancheite',
  'ravalement',
  'serrurerie',
  'metallerie',
  'plaquiste',
  'electricien-batiment',
  'chauffagiste',
  'frigoriste',
  'installateur-sanitaire',
  'installateur-thermique',
  'poseur-fenetre',
  'vitrier',
  'paysagiste',
  'jardinier',
  'pisciniste',
  'domotique',
  'alarme-securite',
  'ascenseur',
  'ventilation',
  'vmc',
  'diagnostic-immobilier',
  'geometre',
  'architecte',
  'bureau-etude',
  'coordinateur-securite',
  'maitre-oeuvre',
  'conducteur-travaux',
  'chef-chantier',
  'economiste-construction',
  'dessinateur-projeteur',
  'beton',
  'ferrailleur',
];

// Top 20 villes (marchés les plus actifs)
export const TOP_CITIES = [
  'paris',
  'marseille',
  'lyon',
  'toulouse',
  'nice',
  'nantes',
  'montpellier',
  'strasbourg',
  'bordeaux',
  'lille',
  'rennes',
  'reims',
  'saint-etienne',
  'toulon',
  'le-havre',
  'grenoble',
  'dijon',
  'angers',
  'nimes',
  'villeurbanne',
];

// Top 20 régions/départements
export const TOP_REGIONS = [
  'ile-de-france',
  'auvergne-rhone-alpes',
  'nouvelle-aquitaine',
  'occitanie',
  'hauts-de-france',
  'provence-alpes-cote-azur',
  'grand-est',
  'pays-de-la-loire',
  'normandie',
  'bretagne',
  'bourgogne-franche-comte',
  'centre-val-de-loire',
  '75-paris',
  '69-rhone',
  '13-bouches-du-rhone',
  '33-gironde',
  '31-haute-garonne',
  '59-nord',
  '06-alpes-maritimes',
  '44-loire-atlantique',
];

// Génère les URLs métier-ville pour le top combinaisons
export function generateMetierVilleUrls(): string[] {
  const urls: string[] = [];
  
  // Top 10 métiers × Top 10 villes = 100 pages
  const topMetiers = TOP_METIERS.slice(0, 10);
  const topCities = TOP_CITIES.slice(0, 10);
  
  for (const metier of topMetiers) {
    for (const ville of topCities) {
      urls.push(`/metier/${metier}/${ville}`);
    }
  }
  
  return urls;
}

// Génère les URLs métier-région
export function generateMetierRegionUrls(): string[] {
  const urls: string[] = [];
  
  // Top 10 métiers × Top 10 régions = 100 pages
  const topMetiers = TOP_METIERS.slice(0, 10);
  const topRegions = TOP_REGIONS.slice(0, 10);
  
  for (const metier of topMetiers) {
    for (const region of topRegions) {
      urls.push(`/metier/${metier}/region/${region}`);
    }
  }
  
  return urls;
}

// Génère toutes les URLs à pré-rendre
export function getAllPrerenderUrls(): string[] {
  return [
    ...MAIN_PAGES,
    ...ENERGY_PAGES,
    ...TOP_METIERS.map(m => `/metier/${m}`),
    ...TOP_REGIONS.map(r => `/region/${r}`),
    ...generateMetierVilleUrls(),
    ...generateMetierRegionUrls(),
  ];
}

// Export de la configuration complète
export const prerenderConfig = {
  routes: getAllPrerenderUrls(),
  
  // Options de rendu
  rendererOptions: {
    renderAfterDocumentEvent: 'render-event',
    renderAfterTime: 5000, // 5 secondes max par page
    headless: true,
  },
  
  // Options du serveur
  serverOptions: {
    port: 8080,
  },
  
  // Post-process du HTML
  postProcess: (context: { html: string; route: string }) => {
    // Ajoute un commentaire indiquant que la page est pré-rendue
    context.html = context.html.replace(
      '</head>',
      '<!-- Prerendered by CessionBTP SEO Engine --></head>'
    );
    return context;
  },
};

export default prerenderConfig;
