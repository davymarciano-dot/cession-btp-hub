import { Helmet } from "react-helmet-async";

interface EnhancedSchemasProps {
  type?: 'home' | 'listing' | 'estimation' | 'about';
  listingData?: {
    title: string;
    price: number;
    location: string;
    description: string;
    images?: string[];
    ca: number;
    employees: number;
  };
}

const EnhancedSchemas = ({ type = 'home', listingData }: EnhancedSchemasProps) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CessionBTP",
    "description": "Plateforme N°1 de cession et reprise d'entreprises BTP en France. Matching IA, valorisation gratuite, 2000+ repreneurs qualifiés.",
    "url": "https://cessionbtp.fr",
    "logo": "https://cessionbtp.fr/logo-cessionbtp-hd.png",
    "foundingDate": "2024",
    "founders": [{
      "@type": "Person",
      "name": "Équipe CessionBTP"
    }],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "France"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+33-1-XX-XX-XX-XX",
      "contactType": "customer service",
      "availableLanguage": ["French"],
      "areaServed": "FR"
    }],
    "sameAs": [
      "https://www.linkedin.com/company/cessionbtp",
      "https://twitter.com/cessionbtp",
      "https://www.facebook.com/cessionbtp"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CessionBTP",
    "image": "https://cessionbtp.fr/logo-cessionbtp-hd.png",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "url": "https://cessionbtp.fr",
    "telephone": "+33-1-XX-XX-XX-XX",
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CessionBTP",
    "url": "https://cessionbtp.fr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cessionbtp.fr/entreprises?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Cession et Reprise d'Entreprises BTP",
    "provider": {
      "@type": "Organization",
      "name": "CessionBTP"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "offers": [{
      "@type": "Offer",
      "name": "Formule Essentiel",
      "price": "290",
      "priceCurrency": "EUR",
      "description": "Annonce optimisée pendant 3 mois avec support prioritaire"
    }, {
      "@type": "Offer",
      "name": "Formule Prime",
      "price": "490",
      "priceCurrency": "EUR",
      "description": "Mise en avant prioritaire avec statistiques avancées"
    }, {
      "@type": "Offer",
      "name": "Formule Exclusif",
      "price": "990",
      "priceCurrency": "EUR",
      "description": "Position top garantie avec agent dédié"
    }]
  };

  const listingSchema = listingData ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": listingData.title,
    "description": listingData.description,
    "image": listingData.images || [],
    "offers": {
      "@type": "Offer",
      "price": listingData.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "CessionBTP"
      }
    },
    "additionalProperty": [{
      "@type": "PropertyValue",
      "name": "Chiffre d'affaires",
      "value": `${listingData.ca}€`
    }, {
      "@type": "PropertyValue",
      "name": "Effectif",
      "value": `${listingData.employees} salariés`
    }, {
      "@type": "PropertyValue",
      "name": "Localisation",
      "value": listingData.location
    }]
  } : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Comment fonctionne CessionBTP ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CessionBTP met en relation vendeurs et acheteurs d'entreprises BTP grâce à un algorithme de matching IA. Les vendeurs publient leur annonce, notre IA trouve les meilleurs repreneurs, et nous facilitons les mises en relation."
      }
    }, {
      "@type": "Question",
      "name": "Quel est le délai moyen de vente ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre délai moyen de vente est de 45 jours contre 18-24 mois sur les plateformes généralistes. Nous sommes spécialisés 100% BTP avec 2000+ repreneurs qualifiés actifs."
      }
    }, {
      "@type": "Question",
      "name": "Quels sont les frais de CessionBTP ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formules vendeur : Découverte (Gratuit), Essentiel (290€/3 mois), Prime (490€/3 mois), Exclusif (990€/3 mois). Success fee de seulement 2% à la vente. Formules acheteur : Gratuit, Contact (49€), Pro (99€/mois), Entreprise (299€/mois)."
      }
    }]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment vendre son entreprise BTP sur CessionBTP",
    "description": "Guide étape par étape pour vendre rapidement son entreprise BTP",
    "totalTime": "PT15M",
    "step": [{
      "@type": "HowToStep",
      "name": "Créer votre compte",
      "text": "Inscrivez-vous gratuitement en 2 minutes sur CessionBTP",
      "position": 1
    }, {
      "@type": "HowToStep",
      "name": "Obtenir votre estimation gratuite",
      "text": "Notre IA valorise votre entreprise en fonction de votre CA, secteur et données financières",
      "position": 2
    }, {
      "@type": "HowToStep",
      "name": "Publier votre annonce",
      "text": "Complétez votre annonce détaillée (15 sections) et choisissez votre formule d'abonnement",
      "position": 3
    }, {
      "@type": "HowToStep",
      "name": "Recevoir des matchs qualifiés",
      "text": "Notre IA trouve automatiquement les meilleurs repreneurs correspondant à votre profil",
      "position": 4
    }, {
      "@type": "HowToStep",
      "name": "Finaliser la vente",
      "text": "Échangez avec les acheteurs intéressés et finalisez la transaction en 45 jours en moyenne",
      "position": 5
    }]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      {type === 'home' && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(howToSchema)}
          </script>
        </>
      )}
      {listingSchema && (
        <script type="application/ld+json">
          {JSON.stringify(listingSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default EnhancedSchemas;
