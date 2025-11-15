import { useNavigate } from 'react-router-dom';
import { demoListings } from '@/data/demo-listings';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const DemoListings = () => {
  const navigate = useNavigate();

  const handleViewListing = (listingId: string) => {
    navigate(`/entreprises/${listingId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {demoListings.map(listing => (
        <Card key={listing.id} className="overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative">
            <img 
              src={listing.image} 
              alt={listing.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            {listing.badge && (
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                {listing.badge}
              </Badge>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{listing.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{listing.location}</p>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Prix</p>
                <p className="font-bold text-green-600">
                  {(listing.price / 1000).toFixed(0)}K€
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">CA annuel</p>
                <p className="font-bold">
                  {(listing.revenue / 1000).toFixed(0)}K€
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Effectif</p>
                <p className="font-semibold">{listing.employees} salariés</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Création</p>
                <p className="font-semibold">{listing.created}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {listing.features.map((feature, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {listing.description}
            </p>
            
            <Button 
              onClick={() => handleViewListing(listing.id)}
              className="w-full"
            >
              Voir les détails →
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DemoListings;
