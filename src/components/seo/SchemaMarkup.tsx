import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'certification' | 'metier' | 'region' | 'RenewableEnergy';
  title?: string;
  description?: string;
  data?: {
    name: string;
    price?: string;
    description: string;
    count?: number;
    certifications?: string[];
    location?: string;
  };
}

export const SchemaMarkup = ({ type, title, description, data }: SchemaMarkupProps) => {
  const schemaName = title || (data ? `Entreprises BTP ${data.name} à vendre` : 'Entreprises BTP à vendre');
  const schemaDescription = description || (data?.description || 'Entreprises BTP à vendre');
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": schemaName,
    "description": schemaDescription,
    "numberOfItems": data?.count || 0,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "BusinessForSale",
          "name": data ? `Entreprise ${data.name}` : schemaName,
          "description": schemaDescription,
          "price": data?.price || "0",
          "priceCurrency": "EUR",
          "category": "Construction BTP",
          "certifications": data?.certifications || [],
          "location": data?.location ? {
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
