import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, CheckCircle2, MapPin } from "lucide-react";

const TestimonialSectionEnhanced = () => {
  const testimonials = [
    {
      name: "Marc Lefebvre",
      company: "Plomberie-Chauffage ML",
      location: "Toulouse (31)",
      text: "J'ai d'abord essayé une plateforme généraliste à 250€. 9 mois perdus, 0 contact sérieux. Avec CessionBTP, vendu en 38 jours à un repreneur parfait. Le meilleur investissement de ma vie.",
      rating: 5,
      soldIn: "38 jours",
      price: "420 000€",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marc",
      ca: "580 000€",
      sector: "Plomberie-Chauffage"
    },
    {
      name: "Sophie Durand",
      company: "Maçonnerie Générale SD",
      location: "Lyon (69)",
      text: "L'algorithme de matching m'a connecté avec 3 acheteurs qualifiés en 1 semaine. Vente finalisée en 42 jours au prix demandé. Incroyable efficacité !",
      rating: 5,
      soldIn: "42 jours",
      price: "350 000€",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
      ca: "480 000€",
      sector: "Maçonnerie"
    },
    {
      name: "Jean-Pierre Martin",
      company: "Électricité Industrielle JPM",
      location: "Marseille (13)", 
      text: "Le tableau de bord m'a permis de suivre l'intérêt en temps réel. 127 vues, 8 contacts sérieux, 2 offres. Vendu 15% au-dessus du prix initial !",
      rating: 5,
      soldIn: "35 jours",
      price: "680 000€",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
      ca: "920 000€",
      sector: "Électricité"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold">
            ⭐ 4.9/5 - Plus de 250 avis
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Ils ont vendu en moins de 45 jours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des résultats concrets, des vendeurs satisfaits. Rejoignez les 500+ entrepreneurs qui nous ont fait confiance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2">
              <CardContent className="p-8">
                {/* Header avec photo */}
                <div className="flex items-start mb-6">
                  <Avatar className="h-16 w-16 mr-4 ring-4 ring-primary/10">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-foreground">{testimonial.name}</h4>
                    <p className="text-sm font-semibold text-primary">{testimonial.company}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                
                {/* Stats entreprise */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-xs text-muted-foreground">Secteur</div>
                    <div className="font-semibold text-sm">{testimonial.sector}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">CA annuel</div>
                    <div className="font-semibold text-sm">{testimonial.ca}</div>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">⭐</span>
                  ))}
                </div>
                
                {/* Testimonial */}
                <p className="text-foreground mb-6 italic leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>
                
                {/* Badges de résultat */}
                <div className="space-y-3">
                  <Badge variant="default" className="w-full py-2 bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Vendu {testimonial.price}
                  </Badge>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="flex-1 py-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {testimonial.soldIn}
                    </Badge>
                    <Badge variant="outline" className="flex-1 py-2">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-3xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Prêt à vendre votre entreprise BTP ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Rejoignez les centaines d'entrepreneurs qui nous ont fait confiance et vendez en moins de 45 jours
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="py-2 px-4">
                  ✓ Gratuit jusqu'à la vente
                </Badge>
                <Badge variant="outline" className="py-2 px-4">
                  ✓ Success Fee 2% uniquement
                </Badge>
                <Badge variant="outline" className="py-2 px-4">
                  ✓ Matching IA inclus
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSectionEnhanced;
