import { Helmet } from 'react-helmet-async';

interface UltraCompleteSchemasProps {
  page: 'home' | 'vendre' | 'acheter' | 'entreprises' | 'estimation' | 'annonce' | 'equipe' | 'success-stories' | 'blog' | 'faq';
  annonceData?: {
    id: string;
    title: string;
    description: string;
    price: number;
    sector: string;
    location: string;
    ca: number;
    employees: number;
    images?: string[];
  };
  articleData?: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
  };
}

export const UltraCompleteSchemas = ({ page, annonceData, articleData }: UltraCompleteSchemasProps) => {
  // 🏢 SCHEMA ORGANIZATION - Affiché sur toutes les pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://cessionbtp.fr/#organization",
    "name": "CessionBTP",
    "url": "https://cessionbtp.fr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cessionbtp.fr/images/logo-cessionbtp-hd.png",
      "width": 600,
      "height": 600
    },
    "description": "Plateforme n°1 de cession et reprise d'entreprises BTP en France. Matching IA, 2000+ repreneurs qualifiés, 500+ transactions réussies.",
    "foundingDate": "2020",
    "founders": [{
      "@type": "Person",
      "name": "Pierre Durand"
    }],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "Paris",
      "postalCode": "75001"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+33-1-XX-XX-XX-XX",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": ["French"],
      "email": "contact@cessionbtp.fr"
    }],
    "sameAs": [
      "https://www.linkedin.com/company/cessionbtp",
      "https://twitter.com/cessionbtp",
      "https://www.facebook.com/cessionbtp"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // 🌐 SCHEMA WEBSITE
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://cessionbtp.fr/#website",
    "url": "https://cessionbtp.fr",
    "name": "CessionBTP",
    "description": "Plateforme de transmission d'entreprises BTP avec matching IA",
    "publisher": {
      "@id": "https://cessionbtp.fr/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cessionbtp.fr/entreprises?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 🏪 SCHEMA LOCAL BUSINESS
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://cessionbtp.fr/#business",
    "name": "CessionBTP",
    "image": "https://cessionbtp.fr/images/logo-cessionbtp-hd.png",
    "url": "https://cessionbtp.fr",
    "telephone": "+33-1-XX-XX-XX-XX",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "Paris"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  // 💼 SCHEMA SERVICE (Pages Vendre/Acheter)
  const serviceSchema = page === 'vendre' || page === 'acheter' ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page === 'vendre' ? "Service de vente d'entreprises BTP" : "Service d'acquisition d'entreprises BTP",
    "description": page === 'vendre' 
      ? "Vendez votre entreprise BTP en 45 jours avec notre matching IA et nos 2000+ repreneurs qualifiés"
      : "Trouvez et reprenez l'entreprise BTP idéale parmi +500 opportunités vérifiées",
    "provider": {
      "@id": "https://cessionbtp.fr/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": page === 'vendre' ? "Formules vendeur" : "Formules acheteur",
      "itemListElement": page === 'vendre' ? [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formule Découverte",
            "description": "30 jours d'essai gratuit"
          },
          "price": "0",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formule Essentiel",
            "description": "3 mois d'annonce optimisée"
          },
          "price": "290",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formule Prime",
            "description": "3 mois avec mise en avant prioritaire"
          },
          "price": "490",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formule Exclusif",
            "description": "3 mois avec agent dédié"
          },
          "price": "990",
          "priceCurrency": "EUR"
        }
      ] : [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formule Gratuite",
            "description": "Consultation illimitée des annonces"
          },
          "price": "0",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formule Contact",
            "description": "5 contacts directs"
          },
          "price": "49",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Formule Pro",
            "description": "Contacts illimités + alertes"
          },
          "price": "99",
          "priceCurrency": "EUR"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  } : null;

  // 🏢 SCHEMA PRODUCT (Page détail annonce)
  const productSchema = page === 'annonce' && annonceData ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://cessionbtp.fr/entreprises/${annonceData.id}`,
    "name": annonceData.title,
    "description": annonceData.description,
    "category": `Entreprise ${annonceData.sector}`,
    "brand": {
      "@type": "Brand",
      "name": "CessionBTP"
    },
    "offers": {
      "@type": "Offer",
      "price": annonceData.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": `https://cessionbtp.fr/entreprises/${annonceData.id}`,
      "seller": {
        "@id": "https://cessionbtp.fr/#organization"
      },
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/UsedCondition"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Secteur d'activité",
        "value": annonceData.sector
      },
      {
        "@type": "PropertyValue",
        "name": "Localisation",
        "value": annonceData.location
      },
      {
        "@type": "PropertyValue",
        "name": "Chiffre d'affaires annuel",
        "value": `${annonceData.ca} EUR`
      },
      {
        "@type": "PropertyValue",
        "name": "Nombre de salariés",
        "value": annonceData.employees.toString()
      }
    ],
    "image": annonceData.images || ["https://cessionbtp.fr/images/logo-cessionbtp-hd.png"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "12"
    }
  } : null;

  // 📝 SCHEMA ARTICLE (Blog posts)
  const articleSchema = page === 'blog' && articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.description,
    "image": articleData.image || "https://cessionbtp.fr/og-image.jpg",
    "datePublished": articleData.datePublished,
    "dateModified": articleData.dateModified || articleData.datePublished,
    "author": {
      "@type": "Person",
      "name": articleData.author,
      "url": "https://cessionbtp.fr/equipe"
    },
    "publisher": {
      "@id": "https://cessionbtp.fr/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://cessionbtp.fr/blog"
    }
  } : null;

  // ❓ SCHEMA FAQ (Page FAQ)
  const faqSchema = page === 'faq' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien coûte la publication d'une annonce ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CessionBTP propose 4 formules : Découverte gratuite (30 jours), Essentiel à 290€ (3 mois), Prime à 490€ (3 mois avec mise en avant), et Exclusif à 990€ (3 mois avec agent dédié)."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps faut-il pour vendre mon entreprise BTP ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Grâce à notre matching IA et nos 2000+ repreneurs qualifiés, le délai moyen de vente est de 45 jours, contre 18-24 mois sur les plateformes généralistes."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne le matching IA ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre algorithme analyse votre profil d'entreprise (secteur, CA, localisation, certifications RGE) et le met en relation avec les repreneurs dont les critères de recherche correspondent parfaitement."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les frais de transaction ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CessionBTP applique une success fee de seulement 2% du montant de la transaction, contre 5-10% chez les cabinets traditionnels. Pas de frais cachés."
        }
      },
      {
        "@type": "Question",
        "name": "Mon annonce reste-t-elle confidentielle ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, vous pouvez choisir le niveau d'anonymat : anonyme complet (aucune info révélée), semi-anonyme (secteur/région uniquement), ou public. Les coordonnées ne sont transmises qu'après signature d'un NDA."
        }
      }
    ]
  } : null;

  // 🎯 SCHEMA HOWTO (Page Vendre/Estimation)
  const howToSchema = (page === 'vendre' || page === 'estimation') ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": page === 'vendre' ? "Comment vendre son entreprise BTP" : "Comment estimer la valeur de son entreprise BTP",
    "description": page === 'vendre' 
      ? "Guide complet pour vendre son entreprise BTP en 5 étapes avec CessionBTP"
      : "Obtenez une estimation précise de votre entreprise BTP en 2 minutes avec notre outil IA",
    "totalTime": page === 'vendre' ? "PT15M" : "PT2M",
    "step": page === 'vendre' ? [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Créer votre compte vendeur",
        "text": "Inscrivez-vous gratuitement sur CessionBTP en 2 minutes",
        "url": "https://cessionbtp.fr/auth"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Remplir le formulaire de vente",
        "text": "Détaillez votre entreprise : activité, finances, équipe, actifs. 15 minutes pour une annonce complète",
        "url": "https://cessionbtp.fr/vendre"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Choisir votre formule",
        "text": "Sélectionnez parmi 4 formules (de gratuit à 990€) selon vos besoins",
        "url": "https://cessionbtp.fr/tarifs"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Recevoir des contacts qualifiés",
        "text": "Notre matching IA vous connecte avec les repreneurs idéaux sous 48-72h",
        "url": "https://cessionbtp.fr/matching-ia"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Finaliser la vente",
        "text": "Échangez avec les acheteurs intéressés et concluez la transaction en 45 jours en moyenne",
        "url": "https://cessionbtp.fr/messages"
      }
    ] : [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Renseigner les informations clés",
        "text": "Secteur d'activité, département, année de création, CA annuel",
        "url": "https://cessionbtp.fr/estimation"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Détailler les finances",
        "text": "Chiffre d'affaires N-1 et N-2, résultats nets, effectifs, dettes",
        "url": "https://cessionbtp.fr/estimation"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Indiquer les certifications",
        "text": "Certification RGE (+10% de valorisation) et partenariats financement (+5%)",
        "url": "https://cessionbtp.fr/estimation"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Recevoir l'estimation IA",
        "text": "Valorisation complète avec fourchette, analyse détaillée, points forts et recommandations",
        "url": "https://cessionbtp.fr/estimation"
      }
    ]
  } : null;

  // 👥 SCHEMA ITEMLIST (Page Entreprises)
  const itemListSchema = page === 'entreprises' ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Entreprises BTP à vendre",
    "description": "Liste des entreprises BTP disponibles à la reprise sur CessionBTP",
    "numberOfItems": 500,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "BusinessForSale",
          "name": "Entreprise Électricité Générale",
          "category": "Électricité",
          "price": "450000",
          "priceCurrency": "EUR"
        }
      }
    ]
  } : null;

  // 🏆 SCHEMA BREADCRUMB (Toutes les pages)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://cessionbtp.fr"
      },
      ...(page !== 'home' ? [{
        "@type": "ListItem",
        "position": 2,
        "name": page === 'vendre' ? "Vendre" : 
                page === 'acheter' ? "Acheter" :
                page === 'entreprises' ? "Entreprises" :
                page === 'estimation' ? "Estimation" :
                page === 'equipe' ? "Notre équipe" :
                page === 'success-stories' ? "Success stories" :
                page === 'blog' ? "Blog" :
                page === 'faq' ? "FAQ" : "Page",
        "item": `https://cessionbtp.fr/${page}`
      }] : [])
    ]
  };

  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Service Schema (Vendre/Acheter) */}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      
      {/* Product Schema (Annonce) */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
      
      {/* Article Schema (Blog) */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {/* FAQ Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {/* HowTo Schema (Vendre/Estimation) */}
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}
      
      {/* ItemList Schema (Entreprises) */}
      {itemListSchema && (
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      )}
    </Helmet>
  );
};
