import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SEOImage } from "@/components/SEOImage";

const successStories = [
  {
    id: 1,
    entreprise: "Électricité Moderne",
    secteur: "Électricité générale",
    departement: "75",
    montant: "450 000€",
    delai: "32 jours",
    temoignage: "Grâce à CessionBTP, j'ai vendu mon entreprise en un mois. Le matching IA m'a mis en relation avec le repreneur idéal qui cherchait exactement mon profil d'entreprise.",
    vendeur: "Michel D.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    entreprise: "Chauffage Pro Services",
    secteur: "Chauffage et climatisation",
    departement: "69",
    montant: "680 000€",
    delai: "45 jours",
    temoignage: "La valorisation IA était très précise et m'a aidé à fixer le bon prix. L'accompagnement personnalisé a fait toute la différence dans la négociation.",
    vendeur: "Sophie L.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    entreprise: "Isolation Expert",
    secteur: "Isolation thermique",
    departement: "33",
    montant: "320 000€",
    delai: "28 jours",
    temoignage: "En moins d'un mois, j'ai trouvé un repreneur sérieux et motivé. Le processus était simple et transparent du début à la fin.",
    vendeur: "Jean-Paul R.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    entreprise: "Solaire & Avenir",
    secteur: "Photovoltaïque",
    departement: "13",
    montant: "890 000€",
    delai: "38 jours",
    temoignage: "La plateforme m'a permis de toucher des repreneurs qualifiés rapidement. Le système de matching a vraiment ciblé les bons profils.",
    vendeur: "Christine M.",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    entreprise: "Plomberie Nouvelle Génération",
    secteur: "Plomberie sanitaire",
    departement: "31",
    montant: "540 000€",
    delai: "41 jours",
    temoignage: "J'avais essayé avec d'autres plateformes généralistes pendant 2 ans sans succès. Avec CessionBTP, c'était réglé en 6 semaines !",
    vendeur: "Olivier B.",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    entreprise: "Rénovation Premium",
    secteur: "Rénovation générale",
    departement: "59",
    montant: "720 000€",
    delai: "35 jours",
    temoignage: "L'équipe m'a accompagné à chaque étape. La transaction s'est déroulée dans la transparence et la confiance. Je recommande vivement.",
    vendeur: "Marie T.",
    image: "/placeholder.svg"
  }
];

export default function SuccessStories() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  className="mb-6 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Success stories
                </h1>
                <p className="text-xl text-primary-foreground/90">
                  Découvrez comment des chefs d'entreprise BTP ont réussi leur transmission avec CessionBTP
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">500+</div>
                <div className="text-muted-foreground">Transmissions réalisées</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">35 jours</div>
                <div className="text-muted-foreground">Délai moyen de vente</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">95%</div>
                <div className="text-muted-foreground">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">2000+</div>
                <div className="text-muted-foreground">Repreneurs qualifiés</div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8">
                {successStories.map((story) => (
                  <Card key={story.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-2">
                                {story.entreprise}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                                  {story.secteur}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                                  Dép. {story.departement}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <blockquote className="text-muted-foreground italic mb-4 border-l-4 border-primary pl-4">
                            "{story.temoignage}"
                          </blockquote>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-foreground">— {story.vendeur}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Montant de la transaction</div>
                              <div className="text-xl font-bold text-primary">{story.montant}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Délai de vente</div>
                              <div className="text-xl font-bold text-primary">{story.delai}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Prêt à écrire votre propre success story ?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Rejoignez les centaines d'entrepreneurs BTP qui ont réussi leur transmission avec CessionBTP
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vendre">
                  <Button size="lg" className="bg-background text-primary hover:bg-background/90">
                    Vendre mon entreprise
                  </Button>
                </Link>
                <Link to="/estimation">
                  <Button size="lg" variant="secondary">
                    Estimer gratuitement
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
