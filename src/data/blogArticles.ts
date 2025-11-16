export interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  author: string;
  publishedAt: string;
  featured?: boolean;
  content: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    slug: 'guide-complet-vendre-entreprise-btp-2026',
    title: 'Guide Complet 2026 : Vendre son Entreprise BTP en 45 jours',
    excerpt: 'Découvrez la méthode complète pour vendre votre entreprise BTP rapidement et au meilleur prix en 2026.',
    category: 'vente',
    readTime: 15,
    author: 'Sandra Moreau',
    publishedAt: '2025-11-14',
    featured: true,
    content: `
      <h2>Les changements majeurs en 2026</h2>
      <p>L'année 2026 marque un tournant pour le secteur BTP avec l'application complète de la RE2025...</p>
      
      <h3>1. Impact de la RE2025 sur les valorisations</h3>
      <p>Les entreprises certifiées RGE voient leur valorisation augmenter de 30 à 40%...</p>
      
      <h3>2. L'interdiction des chaudières gaz</h3>
      <p>Boom attendu sur les pompes à chaleur avec +40% de demande...</p>
      
      <h3>3. Prix moyens par secteur</h3>
      <table>
        <tr><th>Secteur</th><th>Prix moyen</th><th>Evolution</th></tr>
        <tr><td>Pompe à chaleur</td><td>550k€</td><td>+40%</td></tr>
        <tr><td>Photovoltaïque</td><td>480k€</td><td>+35%</td></tr>
      </table>
    `,
    seo: {
      metaTitle: 'Vendre Entreprise BTP 2026 : Guide Complet | CessionBTP',
      metaDescription: 'Guide complet 2026 pour vendre votre entreprise BTP. Prix, délais, processus.',
      keywords: ['vendre entreprise btp', 'cession btp 2026', 'prix entreprise batiment']
    }
  },
  {
    id: 2,
    slug: 'entreprises-rge-valorisation-record',
    title: 'Entreprises RGE : Valorisation Record en 2026',
    excerpt: 'Pourquoi les entreprises RGE se vendent 40% plus cher',
    category: 'rge',
    readTime: 8,
    author: 'Marc Dubois',
    publishedAt: '2025-11-10',
    content: `
      <h2>Le marché RGE explose</h2>
      <p>Avec MaPrimeRénov' portée à 15,000€ et l'obligation de rénovation...</p>
      
      <h3>Les chiffres clés 2026</h3>
      <ul>
        <li>+40% de valorisation pour les entreprises RGE</li>
        <li>Délai de vente moyen : 45 jours</li>
        <li>Taux de réussite : 95%</li>
      </ul>
    `,
    seo: {
      metaTitle: 'Entreprises RGE : Valorisation +40% en 2026 | CessionBTP',
      metaDescription: 'Découvrez pourquoi les entreprises RGE se vendent 40% plus cher en 2026.',
      keywords: ['entreprise rge', 'valorisation rge', 'certification rge']
    }
  },
  {
    id: 3,
    slug: 'reprendre-entreprise-pompe-chaleur',
    title: 'Reprendre une Entreprise de Pompe à Chaleur : Le Guide',
    excerpt: 'Tout savoir pour réussir la reprise d\'une entreprise PAC',
    category: 'reprise',
    readTime: 10,
    author: 'Sandra Moreau',
    publishedAt: '2025-11-05',
    content: `
      <h2>Opportunité en or 2026</h2>
      <p>Le secteur de la pompe à chaleur explose avec l'interdiction des chaudières gaz...</p>
    `,
    seo: {
      metaTitle: 'Reprendre Entreprise Pompe à Chaleur 2026 | CessionBTP',
      metaDescription: 'Guide complet pour reprendre une entreprise de pompe à chaleur en 2026.',
      keywords: ['reprendre entreprise pac', 'pompe à chaleur', 'reprise btp']
    }
  },
  {
    id: 4,
    slug: 'financement-reprise-entreprise-btp',
    title: 'Financer la Reprise d\'une Entreprise BTP en 2026',
    excerpt: 'Les solutions de financement pour reprendre une entreprise BTP',
    category: 'financement',
    readTime: 15,
    author: 'Laurent Martin',
    publishedAt: '2025-11-01',
    content: `
      <h2>Les solutions de financement 2026</h2>
      <p>Plusieurs options s'offrent aux repreneurs d'entreprises BTP...</p>
    `,
    seo: {
      metaTitle: 'Financement Reprise Entreprise BTP 2026 | CessionBTP',
      metaDescription: 'Découvrez toutes les solutions pour financer la reprise d\'une entreprise BTP.',
      keywords: ['financement reprise btp', 'prêt reprise entreprise', 'financer rachat btp']
    }
  },
  {
    id: 5,
    slug: 'certification-rge-transfert-rachat',
    title: 'Transférer les Certifications RGE lors d\'un Rachat',
    excerpt: 'Comment transférer les certifications RGE lors d\'une reprise',
    category: 'rge',
    readTime: 7,
    author: 'Sophie Laurent',
    publishedAt: '2025-10-28',
    content: `
      <h2>Transfert de certification RGE</h2>
      <p>Le processus de transfert des certifications RGE lors d'un rachat...</p>
    `,
    seo: {
      metaTitle: 'Transfert Certification RGE Rachat Entreprise | CessionBTP',
      metaDescription: 'Guide pour transférer les certifications RGE lors du rachat d\'une entreprise.',
      keywords: ['transfert rge', 'certification rge rachat', 'rge reprise']
    }
  },
  {
    id: 6,
    slug: 'valorisation-entreprise-pompe-chaleur-2026',
    title: 'Entreprises de Pompe à Chaleur : Valorisation Record en 2026',
    excerpt: 'Avec l\'interdiction des chaudières gaz, les entreprises PAC se vendent 40% plus cher.',
    category: 'vente',
    readTime: 10,
    author: 'Marc Dubois',
    publishedAt: '2025-11-12',
    content: `<h2>Le boom des pompes à chaleur</h2><p>Analyse complète du marché PAC en 2026...</p>`,
    seo: {
      metaTitle: 'Valorisation Entreprise Pompe à Chaleur 2026 | CessionBTP',
      metaDescription: 'Les entreprises PAC atteignent des valorisations records en 2026.',
      keywords: ['pompe à chaleur', 'valorisation PAC', 'entreprise chauffage']
    }
  },
  {
    id: 8,
    slug: 'marche-cession-btp-2026-chiffres',
    title: 'Marché de la Cession BTP 2026 : Chiffres et Tendances',
    excerpt: 'Analyse complète du marché de la transmission d\'entreprises BTP en 2026',
    category: 'marche',
    readTime: 10,
    author: 'Laurent Martin',
    publishedAt: '2025-11-05',
    featured: true,
    content: `<h2>État du marché 2026</h2><p>Statistiques et tendances du secteur...</p>`,
    seo: {
      metaTitle: 'Marché Cession BTP 2026 : Chiffres Clés | CessionBTP',
      metaDescription: 'Données complètes sur le marché de la transmission d\'entreprises BTP.',
      keywords: ['marché btp 2026', 'tendances construction', 'statistiques btp']
    }
  },
  {
    id: 9,
    slug: 'erreurs-fatales-vente-entreprise-btp',
    title: '10 Erreurs Fatales à Éviter lors de la Vente de votre Entreprise BTP',
    excerpt: 'Découvrez les 10 erreurs les plus coûteuses (20 000€ à 100 000€) et comment les éviter pour sécuriser votre cession.',
    category: 'conseils',
    readTime: 8,
    author: 'Sandra Moreau',
    publishedAt: '2025-11-01',
    content: '',
    seo: {
      metaTitle: '10 Erreurs Fatales Vente Entreprise BTP | Guide Complet 2026',
      metaDescription: '10 erreurs fatales à éviter lors de la vente de votre entreprise BTP. Chaque erreur coûte 20 000€ à 100 000€. Solutions concrètes.',
      keywords: ['erreurs vente entreprise btp', 'pièges cession entreprise batiment', 'conseils vente entreprise construction']
    }
  },
  {
    id: 10,
    slug: 'vendre-entreprise-plomberie-2026',
    title: 'Vendre son Entreprise de Plomberie : Guide Spécifique 2026',
    excerpt: 'Tout ce qu\'il faut savoir pour vendre une entreprise de plomberie en 2026. Valorisation, RGE, contrats entretien, fiscalité.',
    category: 'secteurs',
    readTime: 12,
    author: 'Sophie Laurent',
    publishedAt: '2025-10-28',
    content: '',
    seo: {
      metaTitle: 'Vendre Entreprise Plomberie 2026 : Guide Complet | CessionBTP',
      metaDescription: 'Guide spécifique pour vendre une entreprise de plomberie en 2026. Valorisation, RGE QualiPAC, contrats entretien, profils acheteurs, fiscalité.',
      keywords: ['vendre entreprise plomberie', 'cession plombier chauffagiste', 'valorisation entreprise plomberie']
    }
  },
  {
    id: 11,
    slug: 'audit-entreprise-btp-avant-achat',
    title: 'Check-list : 47 Points à Vérifier Avant d\'Acheter une Entreprise BTP',
    excerpt: 'L\'audit complet pour sécuriser votre reprise d\'entreprise BTP. 47 points de contrôle essentiels pour éviter les vices cachés et passifs.',
    category: 'reprise',
    readTime: 15,
    author: 'Marc Dubois',
    publishedAt: '2025-11-08',
    featured: true,
    content: '',
    seo: {
      metaTitle: 'Audit Entreprise BTP : 47 Points à Vérifier | CessionBTP',
      metaDescription: '47 points essentiels à vérifier avant de racheter une entreprise BTP. Checklist complète 2026 : documents, finances, RH, matériel. Évitez les pièges fatals.',
      keywords: ['checklist reprise entreprise btp', 'audit achat entreprise batiment', 'due diligence entreprise construction', 'vérifications avant rachat entreprise']
    }
  }
];
