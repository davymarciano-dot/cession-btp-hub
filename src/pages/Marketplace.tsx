import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, FileCheck, CreditCard, Scale, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    category: "Valorisation",
    icon: TrendingUp,
    color: "text-blue-600",
    providers: [
      { id: 1, name: "Expert BTP Valorisation", price: 1500, rating: 4.9, reviews: 127, description: "Valorisation complète entreprise BTP" },
      { id: 2, name: "Cabinet Évaluation Pro", price: 2000, rating: 4.8, reviews: 89, description: "Rapport détaillé + stratégie vente" },
    ]
  },
  {
    category: "Due Diligence",
    icon: FileCheck,
    color: "text-green-600",
    providers: [
      { id: 3, name: "Audit BTP Express", price: 3000, rating: 4.7, reviews: 64, description: "Audit complet juridique & financier" },
      { id: 4, name: "DD Pro Services", price: 5000, rating: 4.9, reviews: 112, description: "Due diligence approfondie 360°" },
    ]
  },
  {
    category: "Financement",
    icon: CreditCard,
    color: "text-purple-600",
    providers: [
      { id: 5, name: "Courtier BTP Financement", price: "2% du prêt", rating: 4.9, reviews: 203, description: "Montage financement + négociation banque" },
      { id: 6, name: "Finance Reprise BTP", price: "1.5% du prêt", rating: 4.8, reviews: 156, description: "Financement acquisition entreprise" },
    ]
  },
  {
    category: "Juridique",
    icon: Scale,
    color: "text-orange-600",
    providers: [
      { id: 7, name: "Maître Dupont - Avocat", price: 350, rating: 5.0, reviews: 78, description: "Conseil juridique cession entreprise" },
      { id: 8, name: "Cabinet Juridique BTP", price: 400, rating: 4.9, reviews: 92, description: "Accompagnement complet transaction" },
    ]
  },
  {
    category: "Comptabilité",
    icon: Calculator,
    color: "text-red-600",
    providers: [
      { id: 9, name: "Expert-Comptable BTP", price: 800, rating: 4.8, reviews: 145, description: "Bilan + optimisation fiscale" },
      { id: 10, name: "Compta Cession Pro", price: 1200, rating: 4.9, reviews: 167, description: "Pack complet transmission" },
    ]
  },
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredServices = selectedCategory
    ? services.filter(s => s.category === selectedCategory)
    : services;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Services Experts pour votre Cession
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trouvez les meilleurs prestataires pour réussir la vente de votre entreprise BTP
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            Tous les services
          </Button>
          {services.map(service => {
            const Icon = service.icon;
            return (
              <Button
                key={service.category}
                variant={selectedCategory === service.category ? "default" : "outline"}
                onClick={() => setSelectedCategory(service.category)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {service.category}
              </Button>
            );
          })}
        </div>

        {/* Services grid */}
        <div className="grid gap-8">
          {filteredServices.map((serviceCategory) => {
            const CategoryIcon = serviceCategory.icon;
            return (
              <div key={serviceCategory.category}>
                <div className="flex items-center gap-3 mb-6">
                  <CategoryIcon className={`h-8 w-8 ${serviceCategory.color}`} />
                  <h2 className="text-3xl font-bold">{serviceCategory.category}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {serviceCategory.providers.map((provider) => (
                    <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl mb-2">{provider.name}</CardTitle>
                            <CardDescription>{provider.description}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="ml-2 whitespace-nowrap">
                            {typeof provider.price === 'number' ? `${provider.price}€` : provider.price}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{provider.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({provider.reviews} avis)
                            </span>
                          </div>
                          <Button>Contacter</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Prestataires */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">
              💼 Vous êtes prestataire BTP ?
            </CardTitle>
            <CardDescription className="text-lg">
              Rejoignez notre réseau et accédez à plus de 10 000 entreprises en cession
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10 000+</div>
                <div className="text-muted-foreground">Entreprises actives</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">20%</div>
                <div className="text-muted-foreground">Commission seulement</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5000€</div>
                <div className="text-muted-foreground">Revenue moyen/mois</div>
              </div>
            </div>
            <Button size="lg" onClick={() => navigate('/auth')}>
              Devenir prestataire partenaire
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
