import { Helmet } from 'react-helmet-async';

interface ProductSchemaProps {
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  sector: string;
  department: string;
  employees?: number;
  revenue?: number;
}

export const ProductSchema = ({ 
  name, 
  description, 
  price, 
  currency = "EUR",
  image,
  sector,
  department,
  employees,
  revenue
}: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "category": `Entreprise ${sector}`,
    "brand": {
      "@type": "Brand",
      "name": "CessionBTP"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock",
      "url": "https://cessionbtp.fr",
      "seller": {
        "@type": "Organization",
        "name": "CessionBTP"
      },
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/UsedCondition"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Secteur d'activité",
        "value": sector
      },
      {
        "@type": "PropertyValue",
        "name": "Département",
        "value": department
      },
      ...(employees ? [{
        "@type": "PropertyValue",
        "name": "Nombre de salariés",
        "value": employees.toString()
      }] : []),
      ...(revenue ? [{
        "@type": "PropertyValue",
        "name": "Chiffre d'affaires annuel",
        "value": `${revenue} EUR`
      }] : [])
    ],
    ...(image ? { "image": image } : {}),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "12"
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
