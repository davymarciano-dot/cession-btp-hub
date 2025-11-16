import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Home, TrendingUp, Award, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EntrepriseCard from "@/components/EntrepriseCard";
import FAQItem from "@/components/FAQItem";
import { useCachedListings } from "@/hooks/useCachedListings";
import { pagesMetiersSpecifiques, faqEnergiesRenouvelables, serviceEnergiesRenouvelablesSchema } from "@/config/seo-config-metiers-specifiques";

const IsolationThermique = () => {
  const seoData = pagesMetiersSpecifiques.isolationThermique;
  const { data: listings, isLoading } = useCachedListings();
  
  const isolationListings = listings?.filter(
    (listing) =>
      listing.secteur_activite?.toLowerCase().includes("isolation") ||
      listing.secteur_activite?.toLowerCase().includes("thermique") ||
      listing.secteur_activite?.toLowerCase().includes("ite") ||
      listing.secteur_activite?.toLowerCase().includes("combles") ||
      listing.description_activite?.toLowerCase().includes("isolation")
  ) || [];

  const faqIsolation = [
    {
      question: "Quelle est la valorisation d'une entreprise d'isolation thermique ?",
      answer: "Une entreprise d'isolation thermique se valorise entre 0.4x et 0.9x le CA annuel. Les facteurs clés : certification RGE Efficacité Énergétique (+20% de valorisation), spécialisation ITE (Isolation Thermique par l'Extérieur = meilleure valorisation), volume de chantiers, et taux de récurrence. Une PME RGE avec 600k€ de CA en ITE et combles se valorise entre 350k€ et 500k€."
    },
    {
      question: "Le marché de l'isolation thermique est-il rentable en 2025 ?",
      answer: "Oui, très rentable. Le marché croît de 15-20%/an grâce à la RE2020 qui impose des bâtiments performants, aux aides MaPrimeRénov (jusqu'à 75€/m² pour l'ITE), et à l'obligation de rénovation énergétique des passoires thermiques (DPE F et G). Marges nettes : 12-15%. ROI sur reprise : 4-5 ans."
    },
    {
      question: "Certification RGE obligatoire pour l'isolation thermique ?",
      answer: "Oui, la qualification RGE 'Efficacité Énergétique' est obligatoire pour que vos clients obtiennent MaPrimeRénov et les CEE. Sans RGE, vous perdez 60% du marché résidentiel. La reprise d'une entreprise déjà certifiée évite 12-15 mois de démarches administratives."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqIsolation.map(faq => ({
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
                <Home className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {seoData.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Achetez une entreprise d'isolation thermique certifiée RGE. ITE, ITI, isolation combles. 
                Secteur en croissance +18%/an. Valorisation 0.4x-0.9x CA. +30 opportunités.
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
                Isolation Thermique : Marché Porteur pour 2025-2030
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le marché de l'isolation thermique connaît une croissance soutenue de <strong>15-20% par an</strong>. 
                La RE2020 impose des performances thermiques strictes pour les bâtiments neufs, tandis que l'obligation de rénovation 
                des passoires thermiques (DPE F et G) d'ici 2028 crée une demande massive sur l'existant. 
                Les aides MaPrimeRénov pour l'ITE (Isolation Thermique par l'Extérieur) atteignent jusqu'à <strong>75€/m²</strong>, 
                soit 15 000€ pour une maison de 200m² de façade.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Acheter une entreprise d'isolation thermique déjà certifiée RGE 'Efficacité Énergétique' vous positionne immédiatement 
                sur le marché des aides d'État. Sans RGE, vos clients ne peuvent pas obtenir MaPrimeRénov ni les CEE, ce qui représente 
                60% du marché résidentiel. La certification prend 12-15 mois à obtenir (formation, audit, dossier), d'où l'intérêt 
                stratégique de reprendre une société déjà qualifiée avec un portefeuille clients et des équipes formées.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                La valorisation d'une entreprise d'isolation thermique varie selon sa spécialisation : 
                Isolation combles perdus (0.3x-0.5x CA), Isolation combles aménagés + ITI (0.4x-0.7x CA), 
                ITE spécialisée avec RGE (0.6x-0.9x CA). Une PME avec 600k€ de CA, certifiée RGE, 
                positionnée sur l'ITE et les combles, avec 13% de marge nette, se valorise entre 350k€ et 500k€. 
                Les marges nettes moyennes sont de 12-15%, et le ROI sur une reprise est de 4-5 ans. 
                CessionBTP vous accompagne avec estimation IA gratuite et 2% de success fee.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Marché +18%/an</h3>
                    <p className="text-sm text-muted-foreground">
                      RE2020, DPE F/G à rénover d'ici 2028
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">RGE Essentiel</h3>
                    <p className="text-sm text-muted-foreground">
                      Aides jusqu'à 75€/m² pour ITE avec RGE
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Marges 12-15%</h3>
                    <p className="text-sm text-muted-foreground">
                      ROI 4-5 ans, valorisation 0.4x-0.9x CA
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
              Entreprises Isolation Thermique Disponibles
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des annonces...</p>
              </div>
            ) : isolationListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isolationListings.slice(0, 9).map((listing) => (
                  <EntrepriseCard key={listing.id} entreprise={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune entreprise isolation disponible actuellement.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/acheter">Voir toutes les entreprises</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {isolationListings.length > 9 && (
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
                FAQ - Achat Entreprise Isolation Thermique
              </h2>
              <div className="space-y-4">
                {faqIsolation.map((faq, index) => (
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
                Estimez Votre Entreprise Isolation Gratuitement
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Valorisation IA adaptée ITE/ITI (0.4x-0.9x CA). Prime RGE +20%. 
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

export default IsolationThermique;
