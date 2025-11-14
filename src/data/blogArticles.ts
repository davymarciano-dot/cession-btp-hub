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
    slug: 'guide-vendre-entreprise-btp-2026',
    title: 'Guide Complet 2026 : Vendre son Entreprise BTP',
    excerpt: 'Tout ce qu\'il faut savoir pour vendre son entreprise BTP en 2026',
    category: 'vente',
    readTime: 12,
    author: 'CessionBTP',
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
    author: 'CessionBTP',
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
    author: 'CessionBTP',
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
    author: 'CessionBTP',
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
    author: 'CessionBTP',
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
  }
];
