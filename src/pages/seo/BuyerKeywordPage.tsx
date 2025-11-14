import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buyerKeywords } from '@/data/seo-buyer-keywords';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Search, Filter, TrendingUp, Award, MapPin, Euro, Users, Building2, ChevronRight } from 'lucide-react';

const BuyerKeywordPage = () => {
  const { slug } = useParams();
  const keyword = buyerKeywords.find(k => k.slug === slug);

  if (!keyword) {
    return <div>Page non trouvée</div>;
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(parseInt(price));
  };

  return (
    <>
      <Helmet>
        <title>{keyword.title} - {keyword.availableCount} opportunités disponibles | CessionBTP</title>
        <meta name="description" content={`${keyword.heroDescription} Prix moyen ${formatPrice(keyword.averagePrice)}. Accompagnement financement et juridique.`} />
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
                <Building2 className="w-4 h-4 mr-2" />
                {keyword.availableCount} entreprises disponibles
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {keyword.heroTitle}
              </h1>
              
              <p className="text-xl mb-8 opacity-90">
                {keyword.heroDescription}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold">{keyword.availableCount}</div>
                  <div className="text-sm opacity-75">Entreprises</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold">{formatPrice(keyword.averagePrice)}</div>
                  <div className="text-sm opacity-75">Prix moyen</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold">100%</div>
                  <div className="text-sm opacity-75">Vérifiées</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" asChild>
                  <Link to="/acheter">
                    <Search className="w-5 h-5 mr-2" />
                    {keyword.ctaPrimary}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 text-lg" asChild>
                  <Link to="/auth">
                    {keyword.ctaSecondary}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filtres disponibles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <Filter className="w-8 h-8 text-primary" />
                Filtres de recherche disponibles
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {keyword.filters.map((filter, i) => (
                  <div key={i} className="bg-card px-6 py-3 rounded-lg border-2 border-primary/20 hover:border-primary transition-colors">
                    <span className="font-semibold text-card-foreground">{filter}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Pourquoi acheter sur CessionBTP ?
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Comment reprendre une entreprise BTP ?
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

        {/* Key Indicators */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Indicateurs clés du marché
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-sm text-center border">
                  <Euro className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">{formatPrice(keyword.averagePrice)}</div>
                  <div className="text-sm text-muted-foreground">Prix moyen</div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm text-center border">
                  <Users className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">8</div>
                  <div className="text-sm text-muted-foreground">Salariés moyens</div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm text-center border">
                  <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">12%</div>
                  <div className="text-sm text-muted-foreground">Rentabilité moyenne</div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm text-center border">
                  <Award className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-card-foreground mb-1">75%</div>
                  <div className="text-sm text-muted-foreground">Avec certifications</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <h2>{keyword.title} : Guide complet acheteur 2024</h2>
                
                <h3>Le marché en 2024</h3>
                <p>
                  Avec {keyword.searchVolume} recherches mensuelles pour "{keyword.mainKeyword}", 
                  le marché est très actif. Actuellement {keyword.availableCount} entreprises 
                  disponibles sur notre plateforme pour un prix moyen de {formatPrice(keyword.averagePrice)}.
                </p>

                <h3>Critères de sélection essentiels</h3>
                <ul>
                  <li><strong>Chiffre d'affaires</strong>: Analyser les 3 dernières années, tendance et récurrence</li>
                  <li><strong>Rentabilité</strong>: EBITDA minimum 10-15%, marge nette 5-8%</li>
                  <li><strong>Actifs</strong>: Matériel en bon état, locaux adaptés, stock optimisé</li>
                  <li><strong>Certifications</strong>: RGE, Qualibat, QualiPAC valorisent fortement</li>
                  <li><strong>Équipe</strong>: Salariés qualifiés, ancienneté, autonomie</li>
                  <li><strong>Clientèle</strong>: Diversifiée, récurrente, contrats cadres</li>
                  <li><strong>Position</strong>: Zone géographique, réputation, concurrence</li>
                </ul>

                <h3>Financement de l'acquisition</h3>
                <p>
                  Plusieurs solutions pour financer votre achat d'entreprise BTP:
                </p>
                <ul>
                  <li>Apport personnel: 20-30% du prix (ex: {formatPrice((parseInt(keyword.averagePrice) * 0.25).toString())} pour {formatPrice(keyword.averagePrice)})</li>
                  <li>Crédit professionnel: Taux 3-5%, durée 5-7 ans, garanti par actifs</li>
                  <li>LBO: Rachat avec crédit garanti par l'entreprise (structures rentables)</li>
                  <li>Aides: Nacre (10k€), ACRE (exonération charges), prêt d'honneur (15-50k€)</li>
                  <li>Earn-out: Paiement échelonné sur résultats futurs</li>
                </ul>

                <h3>Due diligence : les points à vérifier</h3>
                <ol>
                  <li><strong>Comptabilité</strong>: 3 derniers bilans, liasses fiscales, situations intermédiaires</li>
                  <li><strong>Juridique</strong>: Statuts, assemblées, contrats en cours, litiges</li>
                  <li><strong>Fiscal</strong>: Vérifications URSSAF, impôts, TVA à jour</li>
                  <li><strong>Social</strong>: Contrats salariés, formation, ancienneté, climat</li>
                  <li><strong>Technique</strong>: État matériel, véhicules, locaux, conformité</li>
                  <li><strong>Commercial</strong>: Carnets commandes, références, récurrence clients</li>
                  <li><strong>Certifications</strong>: Validité RGE, Qualibat, audits à venir</li>
                </ol>

                <h3>Témoignages d'acheteurs</h3>
                <p>
                  "J'ai repris une entreprise de plomberie avec RGE trouvée sur CessionBTP. 
                  L'accompagnement financement m'a permis de monter un dossier solide. 
                  Aujourd'hui je tourne à 900k€ de CA avec 15% de marge." 
                  - Thomas R., 34 ans
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trouvez votre entreprise BTP idéale
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {keyword.availableCount} entreprises vérifiées • Prix moyen {formatPrice(keyword.averagePrice)} • Matching IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8" asChild>
                <Link to="/acheter">
                  <Search className="w-5 h-5 mr-2" />
                  Voir toutes les entreprises →
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 text-lg" asChild>
                <Link to="/auth">
                  Créer mon profil acheteur
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

export default BuyerKeywordPage;
