import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Waves, TrendingUp, Award, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EntrepriseCard from "@/components/EntrepriseCard";
import FAQItem from "@/components/FAQItem";
import { useCachedListings } from "@/hooks/useCachedListings";
import { pagesMetiersSpecifiques, faqPompeAChaleur, serviceEnergiesRenouvelablesSchema } from "@/config/seo-config-metiers-specifiques";

const PompeAChaleur = () => {
  const seoData = pagesMetiersSpecifiques.pompeAChaleur;
  const { data: listings, isLoading } = useCachedListings();
  
  const pacListings = listings?.filter(
    (listing) =>
      listing.secteur_activite?.toLowerCase().includes("pompe") ||
      listing.secteur_activite?.toLowerCase().includes("chauffage") ||
      listing.secteur_activite?.toLowerCase().includes("thermique") ||
      listing.description_activite?.toLowerCase().includes("pompe à chaleur") ||
      listing.description_activite?.toLowerCase().includes("pac")
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
                <Waves className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {seoData.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Achetez une entreprise d'installation de pompes à chaleur. Sociétés RGE qualifiées, 
                CA 150k€ à 3M€, secteur en forte croissance +30%/an.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/estimer">
                    <Calculator className="w-5 h-5" />
                    Estimation Gratuite
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/vendre">Vendre mon entreprise PAC</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Marché des Pompes à Chaleur : L'Opportunité Business 2025
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le marché français des pompes à chaleur connaît une explosion historique avec <strong>+30% de croissance par an</strong>. 
                Trois facteurs majeurs expliquent ce boom : l'interdiction des chaudières au gaz neuves à partir de 2026, 
                les aides d'État massives (MaPrimeRénov jusqu'à 11 000€ pour une PAC), et la RE2020 qui impose des bâtiments bas carbone. 
                En 2024, 800 000 pompes à chaleur ont été installées en France, contre 300 000 en 2020.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Reprendre une entreprise d'installation de pompes à chaleur plutôt que créer offre des avantages décisifs : 
                certification RGE QualiPAC immédiate (économise 12-18 mois de démarches), portefeuille clients récurrents pour le SAV, 
                partenariats avec fournisseurs (Daikin, Mitsubishi, Atlantic), et historique bancaire facilitant le financement. 
                Les entreprises certifiées RGE se valorisent <strong>25% plus cher</strong> que les non-certifiées car elles captent 70% du marché.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                La valorisation d'une société PAC se situe entre <strong>0.5x et 1.3x le chiffre d'affaires annuel</strong>. 
                Une entreprise multi-énergies (PAC air/eau, air/air, géothermie) avec SAV organisé obtient les meilleurs multiples. 
                Exemple concret : une PME RGE avec 800k€ de CA, 6 salariés, et 15% de marge nette se valorise entre 550k€ et 900k€. 
                Les marges nettes moyennes sont de 12-18%, et le ROI sur une reprise est de 3-4 ans. CessionBTP vous accompagne avec 
                estimation IA gratuite et seulement 2% de success fee.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Croissance +30%/an</h3>
                    <p className="text-sm text-muted-foreground">
                      800k PAC installées en 2024, marché explosif
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">RGE QualiPAC</h3>
                    <p className="text-sm text-muted-foreground">
                      Obligatoire pour aides État, valorisation +25%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Marges 12-18%</h3>
                    <p className="text-sm text-muted-foreground">
                      ROI 3-4 ans, rentabilité excellente
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
              Entreprises Pompe à Chaleur Disponibles
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des annonces...</p>
              </div>
            ) : pacListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pacListings.slice(0, 9).map((listing) => (
                  <EntrepriseCard key={listing.id} entreprise={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune entreprise PAC disponible pour le moment.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/acheter">Voir toutes les entreprises</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {pacListings.length > 9 && (
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
                FAQ - Achat Entreprise Pompe à Chaleur
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
                Valorisez Votre Entreprise PAC au Juste Prix
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Estimation IA en 3 minutes. Valorisation 0.5x-1.3x CA selon RGE et marges. 
                Success fee 2%, accompagnement personnalisé.
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

export default PompeAChaleur;
