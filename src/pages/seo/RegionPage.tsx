import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { regions } from '@/data/seo-data';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, Building2 } from 'lucide-react';

const RegionPage = () => {
  const { slug } = useParams();
  const region = regions.find(r => r.slug === slug);

  if (!region) {
    return <div>Région non trouvée</div>;
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
        <title>Entreprise BTP à vendre {region.name} - {region.count} sociétés | CessionBTP</title>
        <meta name="description" content={`${region.description} ${region.count} entreprises BTP disponibles. Prix moyen ${formatPrice(region.averagePrice)}.`} />
        <meta name="keywords" content={`entreprise btp ${region.slug} à vendre, société batiment ${region.name} à reprendre, cession ${region.cities.join(', ')}`} />
      </Helmet>

      <SchemaMarkup 
        type="region"
        data={{
          name: region.name,
          price: region.averagePrice,
          description: region.description,
          count: region.count,
          location: region.name
        }}
      />

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
                <MapPin className="w-5 h-5" />
                <span>{region.name}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Entreprises BTP à vendre en {region.name}
              </h1>
              
              <p className="text-xl mb-8 opacity-90">
                {region.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl font-bold">{region.count}</div>
                  <div className="text-sm opacity-75">Entreprises</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl font-bold">{formatPrice(region.averagePrice)}</div>
                  <div className="text-sm opacity-75">Prix moyen</div>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <div className="text-3xl font-bold">{region.departments.length}</div>
                  <div className="text-sm opacity-75">Départements</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/acheter">
                    Voir les {region.count} entreprises
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/vendre">
                    Vendre en {region.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Villes principales */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Principales villes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {region.cities.map((city, i) => (
                  <div key={i} className="flex items-center gap-2 bg-card p-4 rounded-lg border">
                    <Building2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-semibold text-card-foreground">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Départements */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Départements couverts
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {region.departments.map((dept) => (
                  <div key={dept} className="bg-card px-4 py-2 rounded-lg border font-mono font-semibold">
                    {dept}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guide région */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <h2>Reprendre une entreprise BTP en {region.name}</h2>
                
                <h3>Le marché BTP en {region.name}</h3>
                <p>
                  La région {region.name} compte actuellement {region.count} entreprises 
                  BTP en vente, avec un prix moyen de {formatPrice(region.averagePrice)}. 
                  Les principales villes sont : {region.cities.join(', ')}.
                </p>

                <h3>Opportunités par département</h3>
                <p>
                  Les {region.departments.length} départements de la région ({region.departments.join(', ')}) 
                  offrent des opportunités variées selon la densité urbaine et les projets 
                  d'aménagement en cours.
                </p>

                <h3>Secteurs porteurs en {region.name}</h3>
                <ul>
                  <li>Rénovation énergétique et isolation (demande croissante)</li>
                  <li>Plomberie-chauffage (remplacement chaudières)</li>
                  <li>Électricité et photovoltaïque (transition énergétique)</li>
                  <li>Maçonnerie et gros œuvre (construction neuve)</li>
                  <li>Second œuvre et finitions</li>
                </ul>

                <h3>Valorisation des entreprises</h3>
                <p>
                  Le prix moyen d'une entreprise BTP en {region.name} est de {' '}
                  <strong>{formatPrice(region.averagePrice)}</strong>, avec des variations 
                  selon :
                </p>
                <ul>
                  <li>La localisation (grandes villes vs zones rurales)</li>
                  <li>Les certifications détenues (RGE, Qualibat, etc.)</li>
                  <li>Le chiffre d'affaires et la rentabilité</li>
                  <li>La qualité du carnet de commandes</li>
                  <li>L'état du matériel et des équipements</li>
                </ul>

                <h3>Démarches spécifiques à la région</h3>
                <ol>
                  <li>Étude du marché local et de la concurrence</li>
                  <li>Analyse des opportunités par ville et département</li>
                  <li>Vérification des certifications régionales</li>
                  <li>Prise de contact avec les chambres de métiers locales</li>
                  <li>Évaluation des carnets de commandes publics</li>
                </ol>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {region.count} entreprises BTP en {region.name}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {region.cities.join(' • ')} • Prix moyen {formatPrice(region.averagePrice)}
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/acheter">
                Voir toutes les entreprises en {region.name} →
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RegionPage;
