import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Leaf, Sun, Waves, Wind, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EntrepriseCardWrapper from "@/components/EntrepriseCardWrapper";
import FAQItem from "@/components/FAQItem";
import { useCachedListings } from "@/hooks/useCachedListings";
import { pagesMetiersSpecifiques, faqEnergiesRenouvelables, serviceEnergiesRenouvelablesSchema } from "@/config/seo-config-metiers-specifiques";

const EnergiesRenouvelables = () => {
  const seoData = pagesMetiersSpecifiques.energiesRenouvelables;
  const { data: listings, isLoading } = useCachedListings();
  
  const renewableListings = listings?.filter(
    (listing) =>
      listing.secteur_activite?.toLowerCase().includes("photovoltaïque") ||
      listing.secteur_activite?.toLowerCase().includes("solaire") ||
      listing.secteur_activite?.toLowerCase().includes("pompe") ||
      listing.secteur_activite?.toLowerCase().includes("isolation") ||
      listing.secteur_activite?.toLowerCase().includes("thermique") ||
      listing.secteur_activite?.toLowerCase().includes("chauffage") ||
      listing.certifications?.toString().toLowerCase().includes("rge")
  ) || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqEnergiesRenouvelables.map(faq => ({
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
                <Leaf className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {seoData.h1}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Plateforme n°1 pour acheter ou vendre une entreprise énergies renouvelables. 
                Photovoltaïque, pompes à chaleur, biomasse, éolien. +80 entreprises RGE disponibles.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/estimer">
                    <Calculator className="w-5 h-5" />
                    Estimation Gratuite
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/vendre">Vendre mon entreprise ENR</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Énergies Renouvelables : Le Secteur le Plus Prometteur pour 2025
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le secteur des énergies renouvelables connaît une croissance sans précédent de <strong>25 à 35% par an</strong> selon les sous-secteurs. 
                La RE2020, l'interdiction des chaudières fossiles en 2026, et l'objectif de neutralité carbone 2050 créent une demande massive. 
                En 2024, le gouvernement investit 9 milliards d'euros par an dans MaPrimeRénov pour accélérer la transition énergétique. 
                Les entreprises ENR certifiées RGE captent 70% du marché car elles donnent accès aux aides d'État (jusqu'à 20 000€ par chantier).
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Reprendre une entreprise énergies renouvelables existante présente des avantages majeurs : certification RGE immédiate 
                (évite 12-18 mois), portefeuille clients récurrents, réseau de fournisseurs établi, et carnets de commandes pleins sur 6-12 mois. 
                Les marges nettes du secteur ENR sont excellentes : 15-20% en moyenne, contre 8-12% dans le BTP traditionnel. 
                Le <strong>retour sur investissement est atteint en 3-4 ans</strong> pour une reprise bien structurée.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                La valorisation varie selon le sous-secteur : Photovoltaïque (0.6x-1.5x CA), Pompes à Chaleur (0.5x-1.3x CA), 
                Isolation Thermique (0.4x-0.9x CA), Biomasse/Éolien (0.7x-1.4x CA). Les entreprises RGE bénéficient systématiquement 
                d'une prime de valorisation de 20-30%. Exemple : une société multi-énergies (PV + PAC) avec 800k€ de CA, RGE, 
                et 17% de marge se valorise entre 600k€ et 1M€. CessionBTP vous accompagne avec estimation IA gratuite, 
                matching acheteur-vendeur intelligent, et seulement 2% de success fee.
              </p>

              <div className="grid md:grid-cols-4 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Sun className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Photovoltaïque</h3>
                    <p className="text-sm text-muted-foreground">
                      +25%/an, marché le plus dynamique
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Waves className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Pompe à Chaleur</h3>
                    <p className="text-sm text-muted-foreground">
                      +30%/an, chaudières gaz interdites 2026
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Wind className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Isolation ITE</h3>
                    <p className="text-sm text-muted-foreground">
                      RE2020, aides jusqu'à 75€/m²
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Biomasse</h3>
                    <p className="text-sm text-muted-foreground">
                      Chauffage bois, forte demande rurale
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
              Entreprises Énergies Renouvelables Disponibles
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des annonces...</p>
              </div>
            ) : renewableListings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renewableListings.slice(0, 12).map((listing) => (
                  <EntrepriseCardWrapper key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    Aucune entreprise ENR disponible actuellement.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/acheter">Voir toutes les entreprises</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {renewableListings.length > 12 && (
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
                FAQ - Achat Entreprise Énergies Renouvelables
              </h2>
              <div className="space-y-4">
                {faqEnergiesRenouvelables.map((faq, index) => (
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
                Estimez Votre Entreprise ENR Gratuitement
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Valorisation IA adaptée à votre sous-secteur ENR. Prime RGE +20-30%. 
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
                  <Link to="/contact">Parler à un Expert ENR</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnergiesRenouvelables;
