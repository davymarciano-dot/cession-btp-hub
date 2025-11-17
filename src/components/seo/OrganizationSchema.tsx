import { Helmet } from 'react-helmet-async';

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CessionBTP",
    "url": "https://cessionbtp.fr",
    "logo": "https://cessionbtp.fr/images/logo-cessionbtp-hd.png",
    "description": "Plateforme n°1 de cession et reprise d'entreprises BTP en France. Matching IA, 2000+ repreneurs qualifiés, 500+ transactions réussies.",
    "sameAs": [
      "https://www.linkedin.com/company/cessionbtp",
      "https://twitter.com/cessionbtp",
      "https://www.facebook.com/cessionbtp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-1-XX-XX-XX-XX",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": "French"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
      "addressLocality": "Paris"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
