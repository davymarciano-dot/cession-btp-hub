import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Sun, TrendingUp, Award, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EntrepriseCard from "@/components/EntrepriseCard";
import FAQItem from "@/components/FAQItem";
import { useCachedListings } from "@/hooks/useCachedListings";
import { pagesMetiersSpecifiques, faqPhotovoltaique, serviceEnergiesRenouvelablesSchema } from "@/config/seo-config-metiers-specifiques";

const PanneauxSolaires = () => {
  const seoData = pagesMetiersSpecifiques.panneauxSolaires;
  const { data: listings, isLoading } = useCachedListings();
  
  // Filtrer les entreprises du secteur solaire/photovoltaïque
  const solarListings = listings?.filter(
    (listing) =>
      listing.secteur_activite?.toLowerCase().includes("photovoltaïque") ||
      listing.secteur_activite?.toLowerCase().includes("solaire") ||
      listing.secteur_activite?.toLowerCase().includes("panneaux") ||
      listing.description_activite?.toLowerCase().includes("photovoltaïque") ||
      listing.description_activite?.toLowerCase().includes("solaire")
  ) || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqPhotovoltaique.map(faq => ({
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
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content="website" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(serviceEnergiesRenouvelablesSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Sun className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {seoData.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Plateforme n°1 pour acheter ou vendre une entreprise d'installation de panneaux solaires photovoltaïques. 
                Plus de 50 sociétés RGE disponibles, CA de 200k€ à 5M€.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/estimer">
                    <Calculator className="w-5 h-5" />
                    Estimation Gratuite IA
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/vendre">Vendre mon entreprise</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Marché de l'Installation de Panneaux Solaires : Opportunité d'Investissement 2025
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le secteur de l'installation de panneaux solaires photovoltaïques connaît une croissance exceptionnelle de <strong>25% par an</strong> depuis 2020. 
                Avec l'objectif de neutralité carbone 2050, l'interdiction des chaudières fossiles en 2026, et les aides massives de l'État (MaPrimeRénov jusqu'à 11 000€), 
                reprendre une entreprise d'installation solaire représente une opportunité d'investissement majeure.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Les entreprises photovoltaïques certifiées RGE (Reconnu Garant de l'Environnement) bénéficient d'une <strong>prime de valorisation de 20-30%</strong>. 
                Cette certification, obligatoire pour que vos clients obtiennent les aides d'État, prend 12 à 18 mois à obtenir. Acheter une société déjà certifiée 
                vous permet d'être opérationnel immédiatement avec un portefeuille clients, des sous-traitants qualifiés, et un historique bancaire solide.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                La valorisation d'une entreprise photovoltaïque se situe généralement entre <strong>0.6x et 1.5x son chiffre d'affaires annuel</strong>. 
                Par exemple, une PME RGE réalisant 600k€ de CA avec 5 salariés et des marges saines se valorisera entre 500k€ et 750k€. 
                Les facteurs clés : certification RGE, récurrence du chiffre d'affaires, carnet de commandes rempli sur 6-12 mois, et réputation locale. 
                Sur CessionBTP, bénéficiez d'une estimation gratuite par IA et d'un accompagnement expert avec seulement 2% de success fee.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Croissance +25%/an</h3>
                    <p className="text-sm text-muted-foreground">
                      Marché en forte expansion, carnets pleins sur 12 mois
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Certification RGE</h3>
                    <p className="text-sm text-muted-foreground">
                      Valorisation +25% pour entreprises qualifiées
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Multiple 0.6x-1.5x CA</h3>
                    <p className="text-sm text-muted-foreground">
                      Valorisation attractive avec ROI sous 4 ans
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              Entreprises Installation Panneaux Solaires à Vendre
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des annonces...</p>
              </div>
            ) : solarListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solarListings.slice(0, 9).map((listing) => (
                  <EntrepriseCard key={listing.id} entreprise={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune entreprise photovoltaïque disponible pour le moment.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/acheter">Voir toutes les entreprises BTP</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {solarListings.length > 9 && (
              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link to="/acheter">Voir toutes les annonces</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
                Questions Fréquentes - Achat Entreprise Panneaux Solaires
              </h2>
              <div className="space-y-4">
                {faqPhotovoltaique.map((faq, index) => (
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Estimez Gratuitement Votre Entreprise Photovoltaïque
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Estimation par IA en 3 minutes. Valorisation adaptée au secteur solaire (multiples 0.6x-1.5x CA).
                Accompagnement expert, success fee 2%.
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

export default PanneauxSolaires;
