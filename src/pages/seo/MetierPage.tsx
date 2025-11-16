import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { metiers } from '@/data/seo-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, TrendingUp, Euro, Users } from 'lucide-react';

const MetierPage = () => {
  const { slug } = useParams();
  const metier = metiers.find(m => m.slug === slug);

  if (!metier) {
    return <div>Métier non trouvé</div>;
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
        <title>Entreprise {metier.name} à vendre - {metier.count} sociétés disponibles | CessionBTP</title>
        <meta name="description" content={`${metier.description} Prix moyen ${formatPrice(metier.averagePrice)}. ${metier.certifications.join(', ')} certifiées.`} />
        <meta name="keywords" content={`entreprise ${metier.slug} à vendre, société ${metier.name} à reprendre, ${metier.certifications.join(', ')}`} />
      </Helmet>

      <SchemaMarkup 
        type="metier"
        data={{
          name: metier.name,
          price: metier.averagePrice,
          description: metier.description,
          count: metier.count,
          certifications: metier.certifications
        }}
      />

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex gap-2 justify-center mb-4 flex-wrap">
                {metier.certifications.map((cert) => (
                  <Badge key={cert} className="bg-accent text-accent-foreground">
                    <Award className="w-4 h-4 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Entreprise {metier.name} à Reprendre
              </h1>
              
              <p className="text-xl mb-8 opacity-90">
                {metier.count} entreprises {metier.name} à vendre • {metier.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold">{metier.count}</div>
                  <div className="text-sm opacity-75">Entreprises</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold">{formatPrice(metier.averagePrice)}</div>
                  <div className="text-sm opacity-75">Prix moyen</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold">{formatPrice(metier.averageCA)}</div>
                  <div className="text-sm opacity-75">CA moyen</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold">45j</div>
                  <div className="text-sm opacity-75">Délai vente</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/acheter">
                    Reprendre une entreprise {metier.name}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/vendre">
                    Vendre mon entreprise {metier.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Marchés */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Activités et marchés
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {metier.markets.map((market, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-lg border">
                    <TrendingUp className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-semibold text-card-foreground">{market}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guide métier */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <h2>Reprendre une entreprise {metier.name} : Guide 2024</h2>
                
                <h3>Le métier de {metier.name}</h3>
                <p>
                  Le secteur {metier.name} représente un marché dynamique dans le BTP avec 
                  {metier.count} entreprises actuellement en vente. Ces sociétés interviennent 
                  sur : {metier.markets.join(', ')}.
                </p>

                <h3>Certifications requises</h3>
                <p>
                  Les entreprises {metier.name} détiennent généralement les certifications 
                  suivantes : {metier.certifications.join(', ')}. Ces qualifications sont 
                  essentielles pour accéder aux marchés publics et privés.
                </p>

                <h3>Valorisation moyenne</h3>
                <p>
                  Prix moyen : <strong>{formatPrice(metier.averagePrice)}</strong><br />
                  Chiffre d'affaires moyen : <strong>{formatPrice(metier.averageCA)}</strong><br />
                  Multiple de valorisation : entre 0.5x et 0.7x le CA selon la rentabilité
                </p>

                <h3>Critères de sélection</h3>
                <ul>
                  <li>Certifications en cours de validité ({metier.certifications.join(', ')})</li>
                  <li>Carnet de commandes et clients récurrents</li>
                  <li>Équipe qualifiée et matériel adapté</li>
                  <li>Zone géographique et réputation locale</li>
                  <li>Rentabilité et structure financière saine</li>
                </ul>

                <h3>Process de reprise</h3>
                <ol>
                  <li>Identification et sélection des entreprises {metier.name}</li>
                  <li>Analyse financière et technique détaillée</li>
                  <li>Vérification des certifications et qualifications</li>
                  <li>Négociation du prix et des conditions</li>
                  <li>Due diligence complète</li>
                  <li>Signature et transfert des certifications</li>
                  <li>Accompagnement post-cession</li>
                </ol>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {metier.count} entreprises {metier.name} disponibles
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Certifications {metier.certifications.join(' + ')} • Prix moyen {formatPrice(metier.averagePrice)}
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/acheter">
                Voir toutes les entreprises {metier.name} →
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MetierPage;
