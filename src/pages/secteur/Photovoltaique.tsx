import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Sun, Zap, Award, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EntrepriseCard from "@/components/EntrepriseCard";
import FAQItem from "@/components/FAQItem";
import { useCachedListings } from "@/hooks/useCachedListings";
import { pagesMetiersSpecifiques, faqPhotovoltaique, serviceEnergiesRenouvelablesSchema } from "@/config/seo-config-metiers-specifiques";

const Photovoltaique = () => {
  const seoData = pagesMetiersSpecifiques.photovoltaique;
  const { data: listings, isLoading } = useCachedListings();
  
  const pvListings = listings?.filter(
    (listing) =>
      listing.secteur_activite?.toLowerCase().includes("photovoltaïque") ||
      listing.secteur_activite?.toLowerCase().includes("solaire") ||
      listing.description_activite?.toLowerCase().includes("photovoltaïque")
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
                <Zap className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {seoData.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Trouvez ou vendez une entreprise photovoltaïque rentable. Installateurs RGE qualifiés, 
                valorisation adaptée (0.6x-1.5x CA), +40 opportunités disponibles.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/estimer">
                    <Calculator className="w-5 h-5" />
                    Estimation Gratuite
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/vendre">Vendre mon entreprise PV</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Investir dans une Entreprise Photovoltaïque : Le Guide Complet 2025
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le marché français du photovoltaïque explose avec une croissance de <strong>25% par an</strong>. 
                La France vise 100 GW de capacité solaire installée d'ici 2050 (contre 18 GW aujourd'hui). 
                Les entreprises photovoltaïques RGE (Reconnu Garant de l'Environnement) dominent le marché car elles permettent 
                à leurs clients d'obtenir les aides d'État : MaPrimeRénov (jusqu'à 11 000€), prime CEE, et TVA réduite à 10%.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Acheter une entreprise photovoltaïque existante plutôt que créer présente des avantages majeurs : 
                certification RGE immédiate (évite 18 mois de démarches), portefeuille clients fidélisé, 
                réseau de sous-traitants qualifiés, et historique bancaire facilitant les financements. 
                Le <strong>ROI sur une reprise est atteint 2 fois plus vite</strong> qu'une création (3-4 ans vs 6-8 ans).
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                La valorisation d'une société photovoltaïque dépend de plusieurs facteurs : 
                Certification RGE (+25% de valorisation), chiffre d'affaires (&gt;500k€ = multiples supérieurs), 
                récurrence client (contrats d'entretien), carnet de commandes (idéalement 6-12 mois), 
                et marges nettes (12-18% pour les meilleures). Un installateur PV avec 800k€ de CA, RGE, 
                et 15% de marge se valorise entre 600k€ et 1.1M€. CessionBTP vous accompagne avec estimation IA gratuite et 2% de success fee.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Sun className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">Marché en Boom</h3>
                    <p className="text-sm text-muted-foreground">
                      +25%/an, objectif 100 GW d'ici 2050
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">RGE = Avantage</h3>
                    <p className="text-sm text-muted-foreground">
                      Accès aux aides d'État, valorisation +25%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">ROI 3-4 ans</h3>
                    <p className="text-sm text-muted-foreground">
                      Rentabilité rapide, marges 12-18%
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
              Entreprises Photovoltaïques Disponibles
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des annonces...</p>
              </div>
            ) : pvListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pvListings.slice(0, 9).map((listing) => (
                  <EntrepriseCard key={listing.id} entreprise={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune entreprise photovoltaïque disponible actuellement.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/acheter">Voir toutes les entreprises</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {pvListings.length > 9 && (
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
                FAQ - Achat Entreprise Photovoltaïque
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

        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Vendez Votre Entreprise Photovoltaïque au Meilleur Prix
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Valorisation par IA adaptée au secteur PV (0.6x-1.5x CA). 
                Prime pour certification RGE. Success fee 2%, accompagnement expert.
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

export default Photovoltaique;
