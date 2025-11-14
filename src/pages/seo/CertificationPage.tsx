import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { certifications, faqByCertification } from '@/data/seo-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, TrendingUp, Award, Users, MapPin } from 'lucide-react';
import { CTAIntermediate } from '@/components/seo/CTAIntermediate';
import { trackPageView } from '@/utils/analytics';

const CertificationPage = () => {
  const { slug } = useParams();
  const cert = certifications.find(c => c.slug === slug);

  useEffect(() => {
    if (cert) {
      trackPageView(window.location.pathname, `Entreprises ${cert.name} à vendre`);
    }
  }, [cert]);

  if (!cert) {
    return <div>Certification non trouvée</div>;
  }

  const faqs = faqByCertification[slug as keyof typeof faqByCertification] || [];

  return (
    <>
      <Helmet>
        <title>Entreprises {cert.name} à vendre - {cert.count} sociétés certifiées | CessionBTP</title>
        <meta name="description" content={`${cert.description} ${cert.count} entreprises ${cert.name} disponibles. Valorisation gratuite, vente en 45 jours.`} />
        <meta name="keywords" content={`entreprise ${cert.slug} à vendre, société ${cert.name} à reprendre, cession ${cert.slug}, reprise entreprise certifiée ${cert.name}`} />
      </Helmet>

      <SchemaMarkup 
        type="certification"
        data={{
          name: cert.name,
          description: cert.description,
          count: cert.count,
          certifications: [cert.name, ...cert.relatedCerts]
        }}
      />

      <Header />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <Breadcrumb 
            items={[
              { label: 'Acheter', href: '/acheter' },
              { label: 'Entreprises certifiées', href: '/acheter' },
              { label: `Certification ${cert.name}` }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                <Award className="w-4 h-4 mr-2" />
                Certification {cert.name}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Entreprises {cert.name} à vendre
              </h1>
              <p className="text-xl mb-4 opacity-90">
                {cert.fullName}
              </p>
              <p className="text-lg mb-8 opacity-80">
                {cert.description}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                  <div className="text-3xl font-bold">{cert.count}</div>
                  <div className="text-sm opacity-75">Entreprises disponibles</div>
                </div>
                <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                  <div className="text-3xl font-bold">45j</div>
                  <div className="text-sm opacity-75">Délai moyen</div>
                </div>
                <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg">
                  <div className="text-3xl font-bold">2%</div>
                  <div className="text-sm opacity-75">Success fee</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/acheter">
                    Voir les {cert.count} entreprises {cert.name}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/vendre">
                    Vendre mon entreprise {cert.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Pourquoi racheter une entreprise certifiée {cert.name} ?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {cert.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card p-6 rounded-lg shadow-sm">
                    <div className="bg-primary/10 p-2 rounded-full shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-card-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Intermédiaire 1 */}
        <div className="container mx-auto px-4">
          <CTAIntermediate variant="listings" metier={cert.slug} location="after-benefits" />
        </div>

        {/* Marchés accessibles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Marchés accessibles avec {cert.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {cert.markets.map((market, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-lg border">
                    <TrendingUp className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-semibold text-card-foreground">{market}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Intermédiaire 2 */}
        <div className="container mx-auto px-4">
          <CTAIntermediate variant="alert" metier={cert.slug} location="after-markets" />
        </div>

        {/* Guide complet */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <h2>Reprendre une entreprise {cert.name} : Le guide complet 2024</h2>
                
                <h3>Qu'est-ce que la certification {cert.name} ?</h3>
                <p>
                  La certification {cert.name} ({cert.fullName}) est une qualification professionnelle 
                  reconnue dans le secteur du BTP. Elle permet aux entreprises d'accéder à des marchés 
                  spécifiques et de bénéficier d'avantages commerciaux significatifs.
                </p>

                <h3>Avantages d'acheter une entreprise déjà certifiée {cert.name}</h3>
                <ul>
                  {cert.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>

                <h3>Certifications complémentaires</h3>
                <p>
                  Les entreprises {cert.name} détiennent souvent d'autres certifications : {' '}
                  {cert.relatedCerts.join(', ')}. Cette multi-certification augmente 
                  considérablement la valeur de l'entreprise et élargit son champ d'intervention.
                </p>

                <h3>Process de reprise</h3>
                <ol>
                  <li>Identification de l'entreprise cible avec certification {cert.name}</li>
                  <li>Audit de la certification et des qualifications</li>
                  <li>Valorisation tenant compte du premium certification</li>
                  <li>Négociation et due diligence</li>
                  <li>Transfert de la certification auprès de l'organisme</li>
                  <li>Accompagnement post-acquisition</li>
                </ol>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Questions fréquentes sur les entreprises {cert.name}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <details key={i} className="bg-card p-6 rounded-lg shadow-sm border">
                      <summary className="font-semibold cursor-pointer text-card-foreground">
                        {faq.question}
                      </summary>
                      <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Internal Links */}
        <InternalLinks
          title="Découvrez aussi"
          links={[
            { label: `Plombiers ${cert.name}`, href: '/plombier-chauffagiste-entreprise-a-vendre', description: `Entreprises de plomberie avec certification ${cert.name}` },
            { label: `Électriciens ${cert.name}`, href: '/electricien-entreprise-a-vendre', description: `Sociétés d'électricité certifiées ${cert.name}` },
            { label: 'Estimer mon entreprise', href: '/estimer', description: 'Valorisation gratuite en 48h' },
            { label: 'Toutes les certifications', href: '/acheter', description: 'Explorer toutes les entreprises certifiées' }
          ]}
        />

        {/* CTA Final */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {cert.count} entreprises {cert.name} disponibles maintenant
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Accédez immédiatement aux marchés {cert.markets[0]} • Délai moyen 45 jours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/acheter">
                  Voir toutes les entreprises {cert.name} →
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/estimer">
                  Estimer mon entreprise {cert.name}
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

export default CertificationPage;
