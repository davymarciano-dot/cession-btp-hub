import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sellerKeywords } from '@/data/seo-seller-keywords';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, TrendingUp, Clock, Shield, Award, Users, ChevronRight } from 'lucide-react';

const SellerKeywordPage = () => {
  const { slug } = useParams();
  const keyword = sellerKeywords.find(k => k.slug === slug);

  if (!keyword) {
    return <div>Page non trouvée</div>;
  }

  return (
    <>
      <Helmet>
        <title>{keyword.title} - Vente en 45j • 2% commission | CessionBTP</title>
        <meta name="description" content={`${keyword.heroDescription} Estimation gratuite 48h. ${keyword.benefits[0]}.`} />
        <meta name="keywords" content={`${keyword.mainKeyword}, ${keyword.relatedKeywords.join(', ')}`} />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-20 -right-20 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-accent rounded-full blur-3xl -bottom-20 -left-20 animate-pulse"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <TrendingUp className="w-4 h-4 mr-2" />
                {keyword.searchVolume} recherches/mois
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {keyword.heroTitle}
              </h1>
              
              <p className="text-xl mb-8 opacity-90">
                {keyword.heroDescription}
              </p>
              
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold">543</div>
                  <div className="text-sm opacity-75">Ventes réussies</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold">45j</div>
                  <div className="text-sm opacity-75">Délai moyen</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold">2%</div>
                  <div className="text-sm opacity-75">Success fee</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" asChild>
                  <Link to="/estimer">
                    {keyword.ctaPrimary} →
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 text-lg" asChild>
                  <Link to="/ressources">
                    {keyword.ctaSecondary}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Pourquoi choisir CessionBTP ?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {keyword.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 bg-card p-6 rounded-lg shadow-sm border">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-card-foreground font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Comment ça marche ?
              </h2>
              <div className="space-y-6">
                {keyword.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-card p-6 rounded-lg border">
                      <h3 className="text-xl font-bold mb-2 text-card-foreground">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">45 jours</div>
                  <div className="text-sm text-muted-foreground">Délai moyen</div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Sécurisé</div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <Award className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">Taux de réussite</div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <Users className="w-12 h-12 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">1,234</div>
                  <div className="text-sm text-muted-foreground">Acheteurs actifs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Questions fréquentes
              </h2>
              <div className="space-y-4">
                {keyword.faq.map((faq, i) => (
                  <details key={i} className="bg-card p-6 rounded-lg shadow-sm border group">
                    <summary className="font-semibold cursor-pointer text-card-foreground flex justify-between items-center">
                      {faq.question}
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guide complet */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <h2>{keyword.title} : Le guide complet 2024</h2>
                
                <h3>Pourquoi vendre votre entreprise BTP maintenant ?</h3>
                <p>
                  Le marché de la cession d'entreprises BTP est actuellement très dynamique avec 
                  {keyword.searchVolume} recherches mensuelles pour "{keyword.mainKeyword}". 
                  Les repreneurs sont nombreux et qualifiés, créant un environnement favorable aux vendeurs.
                </p>

                <h3>Les étapes clés pour réussir votre vente</h3>
                <ol>
                  {keyword.steps.map((step, i) => (
                    <li key={i}>
                      <strong>{step.title}</strong>: {step.description}
                    </li>
                  ))}
                </ol>

                <h3>Optimiser la valorisation de votre entreprise</h3>
                <p>
                  Pour maximiser le prix de vente de votre entreprise BTP:
                </p>
                <ul>
                  <li>Mettez en ordre votre comptabilité et vos certifications (RGE, Qualibat)</li>
                  <li>Constituez et valorisez votre carnet de commandes</li>
                  <li>Documentez vos processus et votre savoir-faire</li>
                  <li>Fidélisez vos clients clés avec des contrats cadres</li>
                  <li>Formez une équipe autonome et compétente</li>
                </ul>

                <h3>Fiscalité de la cession</h3>
                <p>
                  La plus-value de cession d'entreprise est soumise au régime des plus-values 
                  professionnelles. Plusieurs dispositifs d'exonération existent selon l'âge, 
                  la durée de détention et le montant de la cession. Un accompagnement fiscal 
                  est essentiel pour optimiser votre imposition.
                </p>

                <h3>Témoignages de vendeurs</h3>
                <p>
                  "Vendu en 38 jours grâce à CessionBTP. L'estimation était précise et les 
                  acheteurs vraiment qualifiés. Le support juridique m'a énormément aidé." 
                  - Jean M., entreprise de maçonnerie (78)
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prêt à vendre votre entreprise BTP ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Obtenez votre estimation gratuite en 48h et accédez à 1,234 acheteurs qualifiés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" asChild>
                <Link to="/estimer">
                  {keyword.ctaPrimary} →
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 text-lg" asChild>
                <Link to="/vendre">
                  Publier mon annonce
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SellerKeywordPage;
