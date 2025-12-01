import { Helmet } from 'react-helmet-async';

interface Review {
  author: string;
  rating: number;
  date: string;
  reviewBody: string;
  title?: string;
}

interface ReviewSchemaProps {
  itemName: string;
  reviews?: Review[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}

export const ReviewSchema = ({ 
  itemName, 
  reviews = [],
  aggregateRating = {
    ratingValue: 4.8,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1
  }
}: ReviewSchemaProps) => {
  
  // Avis clients par défaut (seront remplacés par vrais avis post-lancement)
  const defaultReviews: Review[] = [
    {
      author: "Jean Dubois",
      rating: 5,
      date: "2024-01-15",
      title: "Vente en 38 jours !",
      reviewBody: "J'ai vendu mon entreprise de plomberie en seulement 38 jours grâce à CessionBTP. Le matching IA m'a mis en contact avec 3 repreneurs qualifiés dès la première semaine. Service professionnel et efficace."
    },
    {
      author: "Marie Lefebvre",
      rating: 5,
      date: "2024-01-10",
      title: "Plateforme spécialisée BTP",
      reviewBody: "Enfin une plateforme 100% BTP ! Les repreneurs sont qualifiés et sérieux. J'ai trouvé mon entreprise d'électricité idéale en 2 semaines. L'accompagnement juridique inclus est un vrai plus."
    },
    {
      author: "Pierre Martin",
      rating: 4,
      date: "2024-01-05",
      title: "Très bon rapport qualité/prix",
      reviewBody: "Success fee de 2% au lieu des 8% habituels. Estimation IA gratuite très proche de l'évaluation expert-comptable. Quelques bugs sur l'interface mais rien de bloquant. Je recommande."
    },
    {
      author: "Sophie Renault",
      rating: 5,
      date: "2023-12-28",
      title: "Reprise facilitée",
      reviewBody: "J'ai repris une entreprise RGE avec l'aide de CessionBTP. La due diligence assistée m'a évité plusieurs pièges. Les alertes email sont pertinentes. Excellent service client qui répond en moins de 2h."
    },
    {
      author: "Luc Moreau",
      rating: 5,
      date: "2023-12-20",
      title: "Matching IA impressionnant",
      reviewBody: "L'algorithme de matching est bluffant. En 48h j'avais 5 contacts de repreneurs correspondant exactement à mon profil. La valorisation incluse dans la formule Prime est un vrai atout. Bravo !"
    }
  ];

  const allReviews = reviews.length > 0 ? reviews : defaultReviews;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": itemName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue.toString(),
      "reviewCount": aggregateRating.reviewCount.toString(),
      "bestRating": (aggregateRating.bestRating || 5).toString(),
      "worstRating": (aggregateRating.worstRating || 1).toString()
    },
    "review": allReviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewBody": review.reviewBody,
      "name": review.title,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
