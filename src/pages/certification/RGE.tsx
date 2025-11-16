import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Award, TrendingUp, Shield, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EntrepriseCardWrapper from "@/components/EntrepriseCardWrapper";
import FAQItem from "@/components/FAQItem";
import { useCachedListings } from "@/hooks/useCachedListings";
import { pagesMetiersSpecifiques, faqRGE, serviceEnergiesRenouvelablesSchema } from "@/config/seo-config-metiers-specifiques";

const RGE = () => {
  const seoData = pagesMetiersSpecifiques.entrepriseRGE;
  const { data: listings, isLoading } = useCachedListings();
  
  const rgeListings = listings?.filter(
    (listing) =>
      listing.certifications?.toString().toLowerCase().includes("rge") ||
      listing.secteur_activite?.toLowerCase().includes("photovoltaïque") ||
      listing.secteur_activite?.toLowerCase().includes("pompe") ||
      listing.secteur_activite?.toLowerCase().includes("isolation")
  ) || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqRGE.map(faq => ({
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
                <Award className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {seoData.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Achetez une entreprise avec certification RGE. Photovoltaïque, pompe à chaleur, isolation, chauffage. 
                Valorisation premium +20-30%. +100 annonces disponibles.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/estimer">
                    <Calculator className="w-5 h-5" />
                    Estimation Gratuite
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/vendre">Vendre mon entreprise RGE</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Certification RGE : L'Atout Majeur pour Valoriser Votre Entreprise
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                La certification RGE (Reconnu Garant de l'Environnement) est devenue <strong>indispensable</strong> dans les secteurs 
                photovoltaïque, pompe à chaleur, isolation thermique, et chauffage renouvelable. Sans RGE, vos clients ne peuvent pas obtenir 
                les aides d'État (MaPrimeRénov jusqu'à 20 000€, CEE, TVA réduite), ce qui représente 70% du marché. 
                Les entreprises RGE se valorisent systématiquement <strong>20 à 30% plus cher</strong> que leurs équivalentes non-certifiées.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Obtenir la certification RGE prend entre 12 et 18 mois : formation obligatoire du personnel (5 jours minimum), 
                audit technique, constitution d'un dossier complet, puis maintien de la qualification tous les 4 ans. 
                C'est pourquoi <strong>reprendre une entreprise déjà certifiée RGE</strong> est un avantage stratégique majeur : 
                vous êtes opérationnel immédiatement, avec un portefeuille clients habitués aux aides, et une valorisation supérieure.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Exemple concret de valorisation : une entreprise d'installation de panneaux solaires avec 600k€ de CA non-RGE 
                se valorise entre 300k€ et 400k€. La même entreprise avec certification RGE QualiPV se valorise entre 450k€ et 600k€, 
                soit <strong>+50% de valorisation</strong>. Les secteurs RGE les plus recherchés : photovoltaïque (QualiPV), 
                pompe à chaleur (QualiPAC), isolation thermique (RGE Efficacité Énergétique), chauffage biomasse (Qualibois). 
                CessionBTP référence +100 entreprises RGE disponibles, avec estimation gratuite par IA et 2% de success fee.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Accès Aides État</h3>
                    <p className="text-sm text-muted-foreground">
                      MaPrimeRénov, CEE : jusqu'à 20k€/chantier
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Valorisation +25%</h3>
                    <p className="text-sm text-muted-foreground">
                      Prime systématique pour entreprises RGE
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">12-18 mois gagnés</h3>
                    <p className="text-sm text-muted-foreground">
                      Certification immédiate lors du rachat
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
              Entreprises Certifiées RGE Disponibles
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des annonces...</p>
              </div>
            ) : rgeListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rgeListings.slice(0, 12).map((listing) => (
                  <EntrepriseCardWrapper key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune entreprise RGE disponible actuellement.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/acheter">Voir toutes les entreprises</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {rgeListings.length > 12 && (
              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link to="/acheter">Voir plus d'entreprises RGE</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
                FAQ - Achat Entreprise RGE
              </h2>
              <div className="space-y-4">
                {faqRGE.map((faq, index) => (
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
                Valorisez Votre Entreprise RGE au Maximum
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Estimation IA avec prime RGE +20-30%. Matching acheteurs qualifiés. 
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
                  <Link to="/contact">Parler à un Expert RGE</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RGE;
