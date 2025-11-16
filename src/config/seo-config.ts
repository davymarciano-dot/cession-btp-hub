// Configuration SEO centralisée pour CessionBTP
export const SEO_CONFIG = {
  // Configuration de base
  site: {
    name: "CessionBTP",
    url: "https://cessionbtp.fr",
    description: "Plateforme n°1 pour acheter et vendre des entreprises du BTP en France. Plus de 500 sociétés de construction à reprendre. Success Fee 2%, Matching IA, 543 entreprises vendues.",
    logo: "/logo-hd.png",
    email: "contact@cessionbtp.fr",
    phone: "+33-1-76-38-02-92",
    address: {
      country: "FR",
      locality: "Paris"
    }
  },

  // Social media
  social: {
    facebook: "https://www.facebook.com/cessionbtp",
    linkedin: "https://www.linkedin.com/company/cessionbtp",
    twitter: "https://twitter.com/cessionbtp",
    twitterHandle: "@cessionbtp"
  },

  // Meta tags par défaut
  defaultMeta: {
    title: "CessionBTP - Achat et Vente d'Entreprises BTP",
    description: "Plateforme n°1 pour acheter et vendre des entreprises du BTP en France. Plus de 500 sociétés de construction à reprendre. Success Fee 2%, Matching IA, 543 entreprises vendues.",
    keywords: "cession entreprise BTP, vendre société construction, acheter entreprise bâtiment, reprise BTP, valorisation entreprise BTP",
    author: "CessionBTP",
    robots: "index, follow",
    language: "French"
  },

  // Schema.org - Organization
  organizationSchema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CessionBTP",
    url: "https://cessionbtp.fr",
    logo: "https://cessionbtp.fr/logo-hd.png",
    telephone: "+33-1-76-38-02-92",
    email: "contact@cessionbtp.fr",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressLocality: "Paris"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33-1-76-38-02-92",
      contactType: "customer service",
      areaServed: "FR",
      availableLanguage: ["French"]
    },
    sameAs: [
      "https://www.facebook.com/cessionbtp",
      "https://www.linkedin.com/company/cessionbtp",
      "https://twitter.com/cessionbtp"
    ]
  },

  // Schema.org - WebSite
  websiteSchema: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CessionBTP",
    url: "https://cessionbtp.fr",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cessionbtp.fr/acheter?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },

  // Configuration des pages
  pages: {
    home: {
      title: "CessionBTP - Achat et Vente d'Entreprises BTP",
      description: "Plateforme n°1 pour acheter et vendre des entreprises du BTP en France. Plus de 500 sociétés de construction à reprendre. Success Fee 2%, Matching IA, 543 entreprises vendues.",
      keywords: "cession entreprise BTP, vendre société construction, acheter entreprise bâtiment, reprise BTP, valorisation entreprise BTP",
      canonical: "https://cessionbtp.fr"
    },
    acheter: {
      title: "Acheter une Entreprise BTP | +500 Opportunités",
      description: "Découvrez +500 entreprises BTP à vendre en France. Plomberie, électricité, maçonnerie, menuiserie. Accompagnement complet et matching IA personnalisé.",
      keywords: "acheter entreprise BTP, reprise société construction, entreprise bâtiment à vendre",
      canonical: "https://cessionbtp.fr/acheter"
    },
    vendre: {
      title: "Vendre votre Entreprise BTP | Success Fee 2%",
      description: "Vendez votre entreprise BTP avec seulement 2% de success fee. Valorisation gratuite, acheteurs qualifiés, confidentialité garantie.",
      keywords: "vendre entreprise BTP, cession société construction, valorisation entreprise",
      canonical: "https://cessionbtp.fr/vendre"
    },
    estimer: {
      title: "Estimation Gratuite Entreprise BTP | Valorisation en 2 min",
      description: "Obtenez une estimation gratuite et instantanée de votre entreprise BTP. Algorithme IA basé sur +1000 transactions réelles. Résultat immédiat.",
      keywords: "estimation entreprise BTP, valorisation société construction, calculer prix entreprise",
      canonical: "https://cessionbtp.fr/estimer"
    },
    pricing: {
      title: "Tarifs CessionBTP | Success Fee 2% | Sans frais cachés",
      description: "Tarifs transparents : 2% de success fee uniquement à la vente réussie. Pas d'abonnement, pas de frais cachés. Valorisation et matching gratuits.",
      keywords: "tarifs cession entreprise, commission vente BTP, prix vendre entreprise",
      canonical: "https://cessionbtp.fr/tarifs"
    },
    faq: {
      title: "FAQ - Questions Fréquentes | CessionBTP",
      description: "Toutes les réponses à vos questions sur l'achat et la vente d'entreprises BTP. Processus, délais, valorisation, financement.",
      keywords: "questions cession entreprise BTP, FAQ vente société construction",
      canonical: "https://cessionbtp.fr/faq"
    },
    contact: {
      title: "Contact CessionBTP | Accompagnement Personnalisé",
      description: "Contactez nos experts pour un accompagnement personnalisé dans votre projet d'achat ou de vente d'entreprise BTP.",
      keywords: "contact cession BTP, expert vente entreprise construction",
      canonical: "https://cessionbtp.fr/contact"
    }
  },

  // Open Graph par défaut
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "CessionBTP"
  },

  // Twitter Card par défaut
  twitterCard: {
    card: "summary_large_image",
    site: "@cessionbtp"
  },

  // Robots meta
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
} as const;

// Types pour la configuration SEO
export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  image?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

// Helper pour générer les meta tags d'une page
export const getPageSEO = (pageName: keyof typeof SEO_CONFIG.pages): PageSEO => {
  return SEO_CONFIG.pages[pageName];
};

// Helper pour générer le Schema.org d'un listing
export const getListingSchema = (listing: {
  name: string;
  description: string;
  price: number;
  location?: string;
  certifications?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: listing.name,
  description: listing.description,
  offers: {
    "@type": "Offer",
    price: listing.price,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "CessionBTP"
    }
  },
  ...(listing.location && {
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: listing.location
      }
    }
  })
});

// Helper pour générer le Schema.org d'un article de blog
export const getBlogPostSchema = (post: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.publishedTime,
  dateModified: post.modifiedTime || post.publishedTime,
  author: {
    "@type": "Person",
    name: post.author
  },
  publisher: {
    "@type": "Organization",
    name: "CessionBTP",
    logo: {
      "@type": "ImageObject",
      url: "https://cessionbtp.fr/logo-hd.png"
    }
  },
  ...(post.image && {
    image: {
      "@type": "ImageObject",
      url: post.image
    }
  })
});

// Helper pour générer le Schema.org FAQ
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

// Helper pour générer le Schema.org Breadcrumb
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});
