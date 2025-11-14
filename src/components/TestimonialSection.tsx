import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Marc L.",
      company: "Plomberie-Chauffage",
      location: "Toulouse",
      text: "J'ai d'abord essayé une plateforme généraliste à 250€. 9 mois perdus, 0 contact sérieux. Avec CessionBTP, vendu en 38 jours à un repreneur parfait. Le meilleur investissement de ma vie.",
      rating: 5,
      soldIn: "38 jours",
      initials: "ML"
    },
    {
      name: "Sophie D.",
      company: "Maçonnerie Générale",
      location: "Lyon",
      text: "L'algorithme de matching m'a connecté avec 3 acheteurs qualifiés en 1 semaine. Vente finalisée en 42 jours au prix demandé. Incroyable efficacité !",
      rating: 5,
      soldIn: "42 jours",
      initials: "SD"
    },
    {
      name: "Jean-Pierre M.",
      company: "Électricité Industrielle",
      location: "Marseille", 
      text: "Le tableau de bord m'a permis de suivre l'intérêt en temps réel. 127 vues, 8 contacts sérieux, 2 offres. Vendu 15% au-dessus du prix initial !",
      rating: 5,
      soldIn: "35 jours",
      initials: "JPM"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ils ont vendu en moins de 45 jours
          </h2>
          <p className="text-xl text-muted-foreground">
            Des résultats concrets, des vendeurs satisfaits
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">⭐</span>
                  ))}
                </div>
                
                <p className="text-foreground mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  ✓ Vendu en {testimonial.soldIn}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
