import { Helmet } from 'react-helmet-async';

interface AggregateRatingSchemaProps {
  itemName: string;
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
}

export const AggregateRatingSchema = ({ 
  itemName, 
  ratingValue = 4.8, 
  reviewCount = 127,
  bestRating = 5 
}: AggregateRatingSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Service",
      "name": itemName,
      "provider": {
        "@type": "Organization",
        "name": "CessionBTP"
      }
    },
    "ratingValue": ratingValue,
    "bestRating": bestRating,
    "reviewCount": reviewCount
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
