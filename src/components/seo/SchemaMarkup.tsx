import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'certification' | 'metier' | 'region';
  data: {
    name: string;
    price?: string;
    description: string;
    count?: number;
    certifications?: string[];
    location?: string;
  };
}

export const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Entreprises BTP ${data.name} à vendre`,
    "description": data.description,
    "numberOfItems": data.count || 0,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "BusinessForSale",
          "name": `Entreprise ${data.name}`,
          "description": data.description,
          "price": data.price || "0",
          "priceCurrency": "EUR",
          "category": "Construction BTP",
          "certifications": data.certifications || [],
          "location": data.location ? {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": data.location
            }
          } : undefined,
          "seller": {
            "@type": "Organization",
            "name": "CessionBTP",
            "url": "https://cessionbtp.fr"
          }
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
