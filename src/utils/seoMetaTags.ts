export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
}

export const generateMetaTags = (page: string, params?: Record<string, string>): MetaTags => {
  const baseUrl = "https://cession-btp-hub.lovable.app";
  
  const metaTags: Record<string, MetaTags> = {
    home: {
      title: "CessionBTP - Plateforme n°1 de Cession d'Entreprises BTP en France",
      description: "Vendez ou achetez votre entreprise BTP en toute sécurité. Plus de 500 sociétés disponibles. Success Fee 2%, Matching IA, accompagnement personnalisé. Estimation gratuite en 48h.",
      keywords: "cession entreprise btp, vendre société construction, acheter entreprise bâtiment, reprise btp, transmission entreprise",
      url: baseUrl,
    },
    
    vendre: {
      title: "Vendre son Entreprise BTP - Estimation Gratuite en 48h | CessionBTP",
      description: "Vendez votre entreprise BTP rapidement et au meilleur prix. Estimation gratuite, matching IA avec acheteurs qualifiés, Success Fee 2%. Accompagnement personnalisé.",
      keywords: "vendre entreprise btp, céder société construction, vente fonds commerce bâtiment, transmission entreprise",
      url: `${baseUrl}/vendre`,
    },
    
    acheter: {
      title: "Entreprises BTP à Vendre - Plus de 500 Opportunités | CessionBTP",
      description: "Découvrez notre sélection d'entreprises BTP à reprendre : maçonnerie, plomberie, électricité, menuiserie... Matching IA, alertes personnalisées.",
      keywords: "entreprises btp à vendre, reprise société construction, opportunités bâtiment, acheter entreprise travaux",
      url: `${baseUrl}/acheter`,
    },
    
    entreprises: {
      title: "Toutes les Entreprises BTP à Vendre en France | CessionBTP",
      description: "Parcourez toutes nos annonces d'entreprises BTP à reprendre. Filtrez par secteur, région, CA. Mise en relation directe avec les vendeurs.",
      keywords: "annonces entreprises btp, sociétés construction à vendre, reprise bâtiment, opportunités btp",
      url: `${baseUrl}/entreprises`,
    },
    
    pricing: {
      title: "Tarifs CessionBTP - Plans et Prix pour Vendre votre Entreprise",
      description: "Découvrez nos formules adaptées à vos besoins. Success Fee uniquement ou accompagnement complet. Transparent, sans surprise.",
      keywords: "tarifs cession entreprise, prix vente société btp, commission cession, success fee",
      url: `${baseUrl}/pricing`,
    },
    
    tarifs: {
      title: "Nos Tarifs - Formules d'Accompagnement à la Cession | CessionBTP",
      description: "Choisissez la formule adaptée à votre projet : Success Fee 2%, Pack Essentiel 4900€, ou Pack Premium 9900€. Transparence garantie.",
      keywords: "tarifs accompagnement cession, prix transmission entreprise btp, formules vente société",
      url: `${baseUrl}/tarifs`,
    },
    
    estimer: {
      title: "Estimation Gratuite de votre Entreprise BTP en 48h | CessionBTP",
      description: "Obtenez une estimation précise et gratuite de votre entreprise BTP sous 48h. Analyse complète, valorisation personnalisée, conseils d'experts.",
      keywords: "estimation entreprise btp, valorisation société construction, évaluation gratuite, prix entreprise bâtiment",
      url: `${baseUrl}/estimer`,
    },
    
    faq: {
      title: "FAQ - Questions Fréquentes sur la Cession d'Entreprises BTP",
      description: "Trouvez les réponses à vos questions sur la vente et l'achat d'entreprises BTP. Processus, délais, fiscalité, accompagnement.",
      keywords: "questions cession entreprise, aide vente société btp, conseils transmission, faq reprise",
      url: `${baseUrl}/faq`,
    },
    
    ressources: {
      title: "Ressources Gratuites - Guides et Outils pour la Cession BTP",
      description: "Accédez à nos guides gratuits, simulateurs, checklist et articles pour réussir votre projet de cession ou reprise d'entreprise BTP.",
      keywords: "guides cession entreprise, outils gratuits btp, ressources transmission, conseils reprise",
      url: `${baseUrl}/ressources`,
    },
    
    'outils-gratuits': {
      title: "Outils Gratuits - Simulateurs et Calculateurs pour Entreprises BTP",
      description: "Utilisez gratuitement nos simulateurs de valorisation, calculateurs de financement et outils d'aide à la décision pour votre projet.",
      keywords: "simulateur valorisation, calculateur financement, outils gratuits btp, aide décision cession",
      url: `${baseUrl}/outils-gratuits`,
    },
    
    'entreprises-rge': {
      title: "Entreprises RGE à Vendre - Spécialistes Énergies Renouvelables",
      description: "Découvrez notre sélection d'entreprises BTP certifiées RGE à reprendre. Spécialistes pompes à chaleur, isolation, photovoltaïque.",
      keywords: "entreprises rge à vendre, sociétés énergies renouvelables, reprise entreprise rge, certification qualipac",
      url: `${baseUrl}/entreprises-rge`,
    },
  };

  // Handle dynamic listing pages
  if (page === 'listing' && params?.id) {
    return {
      title: `Entreprise BTP à Vendre - ${params.title || 'Opportunité'} | CessionBTP`,
      description: params.description || "Découvrez cette opportunité d'acquisition dans le secteur du BTP. CA, effectif, localisation, photos disponibles.",
      keywords: `${params.secteur || 'btp'}, entreprise à vendre, reprise société, ${params.departement || ''}`,
      url: `${baseUrl}/entreprises/${params.id}`,
      image: params.image || `${baseUrl}/logo-hd.png`,
    };
  }

  // Handle blog posts
  if (page === 'blog' && params?.slug) {
    return {
      title: `${params.title || 'Article'} - Blog CessionBTP`,
      description: params.description || "Conseils et actualités sur la cession d'entreprises BTP.",
      keywords: `blog cession btp, conseils transmission, actualités bâtiment, ${params.keywords || ''}`,
      url: `${baseUrl}/blog/${params.slug}`,
      image: params.image || `${baseUrl}/logo-hd.png`,
    };
  }

  return metaTags[page] || metaTags.home;
};

// Generate listing-specific meta tags
export const generateListingMetaTags = (listing: {
  id: string;
  secteur_activite: string;
  departement: string;
  ville: string;
  prix_vente: number;
  ca_n1: number;
  nombre_salaries: number;
  description_activite?: string;
  atouts_principaux?: string;
}): MetaTags => {
  const title = `Entreprise ${listing.secteur_activite} à Vendre - ${listing.ville} (${listing.departement})`;
  const description = `Entreprise ${listing.secteur_activite} à reprendre. CA: ${(listing.ca_n1).toLocaleString()}€, Prix: ${(listing.prix_vente).toLocaleString()}€, ${listing.nombre_salaries} salariés. ${listing.atouts_principaux || listing.description_activite || ''}`.substring(0, 160);
  
  return {
    title,
    description,
    keywords: `entreprise ${listing.secteur_activite} à vendre, reprise ${listing.secteur_activite}, ${listing.ville}, ${listing.departement}`,
    url: `https://cession-btp-hub.lovable.app/entreprises/${listing.id}`,
  };
};
