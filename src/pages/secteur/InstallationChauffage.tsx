import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Flame, TrendingUp, Award, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EntrepriseCardWrapper from "@/components/EntrepriseCardWrapper";
import FAQItem from "@/components/FAQItem";
import { useCachedListings } from "@/hooks/useCachedListings";
import { pagesMetiersSpecifiques, faqPompeAChaleur, serviceEnergiesRenouvelablesSchema } from "@/config/seo-config-metiers-specifiques";

const InstallationChauffage = () => {
  const seoData = pagesMetiersSpecifiques.installationChauffage;
  const { data: listings, isLoading } = useCachedListings();
  
  const heatingListings = listings?.filter(
    (listing) =>
      listing.secteur_activite?.toLowerCase().includes("chauffage") ||
      listing.secteur_activite?.toLowerCase().includes("thermique") ||
      listing.secteur_activite?.toLowerCase().includes("pompe") ||
      listing.secteur_activite?.toLowerCase().includes("chaudière") ||
      listing.description_activite?.toLowerCase().includes("chauffage")
  ) || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqPompeAChaleur.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonical} />
        <script type="application/ld+json">
          {JSON.stringify(serviceEnergiesRenouvelablesSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Flame className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {seoData.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Vendez ou achetez une entreprise d'installation de chauffage. Pompes à chaleur, chaudières, 
                solaire thermique. Entreprises RGE prioritaires. CA moyen 500k€.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/estimer">
                    <Calculator className="w-5 h-5" />
                    Estimation Gratuite
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/vendre">Vendre mon entreprise</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Marché Installation Chauffage : Opportunités 2025
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le secteur de l'installation de chauffage est en pleine mutation. Avec l'interdiction des chaudières au gaz neuves 
                à partir de 2026 et les objectifs RE2020, le marché se réoriente massivement vers les <strong>solutions thermiques renouvelables</strong> : 
                pompes à chaleur (+30%/an), solaire thermique, biomasse, et systèmes hybrides. Les entreprises d'installation de chauffage 
                traditionnelles qui ne se transforment pas perdent 40% de leur activité d'ici 2027.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Reprendre une entreprise de chauffage déjà certifiée RGE (QualiPAC, Qualibois) vous donne un <strong>avantage compétitif immédiat</strong> : 
                accès aux aides MaPrimeRénov (jusqu'à 11 000€ pour une PAC), portefeuille clients existant à convertir vers le renouvelable, 
                et contrats de maintenance récurrents (SAV représente 20-30% du CA). La certification RGE prend 12-18 mois à obtenir, 
                d'où l'intérêt stratégique d'acheter une société déjà qualifiée.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                La valorisation d'une entreprise d'installation de chauffage varie selon son positionnement : 
                Chauffage traditionnel (0.3x-0.6x CA), Multi-énergies avec RGE (0.5x-1.2x CA), Spécialiste PAC/Renouvelable (0.6x-1.4x CA). 
                Une entreprise avec 500k€ de CA, certifiée RGE, positionnée sur les PAC et le solaire thermique, avec 35% du CA en maintenance, 
                se valorise entre 400k€ et 700k€. CessionBTP vous accompagne avec estimation IA gratuite et 2% de success fee.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Transition Énergétique</h3>
                    <p className="text-sm text-muted-foreground">
                      Chaudières gaz interdites 2026, PAC +30%/an
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">RGE Obligatoire</h3>
                    <p className="text-sm text-muted-foreground">
                      QualiPAC, Qualibois pour aides État
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">SAV Récurrent</h3>
                    <p className="text-sm text-muted-foreground">
                      Maintenance = 20-30% du CA, marges élevées
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              Entreprises Installation Chauffage Disponibles
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des annonces...</p>
              </div>
            ) : heatingListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heatingListings.slice(0, 9).map((listing) => (
                  <EntrepriseCardWrapper key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune entreprise chauffage disponible pour le moment.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/acheter">Voir toutes les entreprises</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {heatingListings.length > 9 && (
              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link to="/acheter">Voir plus d'annonces</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
                FAQ - Achat Entreprise Installation Chauffage
              </h2>
              <div className="space-y-4">
                {faqPompeAChaleur.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Estimez Votre Entreprise Chauffage Gratuitement
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Valorisation IA adaptée (0.3x-1.4x CA selon positionnement RGE). 
                Accompagnement transition énergétique, success fee 2%.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/estimer">
                    <Calculator className="w-5 h-5" />
                    Estimation Gratuite
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Parler à un Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InstallationChauffage;
