import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { renewableEnergies, type RenewableEnergyData } from '@/data/renewable-energy';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { CTAIntermediate } from '@/components/seo/CTAIntermediate';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { trackPageView, trackEvent } from '@/utils/analytics';
import { TrustBadges } from '@/components/TrustBadges';
import TestimonialSection from '@/components/TestimonialSection';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  TrendingUp, 
  Euro, 
  Award, 
  CheckCircle, 
  Zap,
  ThermometerSun,
  Home,
  Factory,
  GraduationCap,
  Gift
} from 'lucide-react';

export const RenewableEnergyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<RenewableEnergyData | null>(null);

  useEffect(() => {
    const energyData = renewableEnergies.find(e => e.slug === slug);
    setData(energyData || null);

    if (energyData) {
      trackPageView(
        window.location.pathname,
        `Entreprise ${energyData.title} RGE à vendre`
      );
    }
  }, [slug]);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
        <Link to="/acheter" className="text-primary hover:underline">
          Voir toutes les annonces
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Entreprises à vendre', href: '/acheter' },
    { label: 'Énergies Renouvelables RGE', href: '/acheter' },
    { label: data.title }
  ];

  return (
    <>
      <Helmet>
        <title>Entreprise {data.title} RGE à Vendre | QualiPAC, QualiPV | CessionBTP</title>
        <meta 
          name="description" 
          content={`Entreprises ${data.title} RGE certifiées à vendre. ${data.description} Prix moyen: ${data.avgPrice}€. Marché: ${data.marketSize}, croissance ${data.growth} par an.`}
        />
        <meta name="keywords" content={data.keywords.join(', ')} />
        <link rel="canonical" href={`https://cessionbtp.fr/entreprise-${data.slug}-a-vendre`} />
      </Helmet>

      <SchemaMarkup 
        type="RenewableEnergy"
        title={`Entreprise ${data.title} RGE à vendre`}
        description={data.description}
      />

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Hero RGE */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 mb-8 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-white text-green-600 hover:bg-white">
                <Leaf className="w-4 h-4 mr-1" />
                RGE Certifié
              </Badge>
              <span className="text-sm opacity-90">Reconnu Garant de l'Environnement</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Entreprise {data.title} RGE à Reprendre
            </h1>
            <p className="text-xl opacity-90">
              Entreprises {data.title} à vendre • Accès immédiat aux aides d'État • Marché en croissance {data.growth} par an
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Home className="w-5 h-5 text-green-600" />
                <p className="text-sm text-muted-foreground">Entreprises RGE</p>
              </div>
              <p className="text-3xl font-bold text-green-600">12+</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-muted-foreground">Croissance/an</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{data.growth}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border-2 border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <Factory className="w-5 h-5 text-orange-600" />
                <p className="text-sm text-muted-foreground">Taille marché</p>
              </div>
              <p className="text-xl font-bold text-orange-600">{data.marketSize}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <p className="text-sm text-muted-foreground">Délai vente</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">45j</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg border-2 border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="w-5 h-5 text-red-600" />
                <p className="text-sm text-muted-foreground">Commission</p>
              </div>
              <p className="text-2xl font-bold text-red-600">2%</p>
            </div>
          </div>

          <CTAIntermediate variant="listings" metier={data.slug} location="hero" />

          {/* Contenu principal */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none dark:prose-invert">
                <h2>Acheter une Entreprise {data.title} RGE : Guide Complet 2024</h2>
                <p className="lead">{data.description}</p>

                <h3 className="flex items-center gap-2">
                  <ThermometerSun className="w-6 h-6" />
                  Marché de la {data.title} en France
                </h3>
                <ul>
                  <li><strong>Taille du marché :</strong> {data.marketSize}</li>
                  <li><strong>Croissance annuelle :</strong> {data.growth}</li>
                  <li><strong>Prix moyen de cession :</strong> {parseInt(data.avgPrice).toLocaleString('fr-FR')}€</li>
                  <li><strong>Nombre de recherches Google :</strong> {data.searchVolume.toLocaleString('fr-FR')}/mois</li>
                </ul>

                <h3>Marchés Accessibles</h3>
                <ul>
                  {data.marches.map((marche, idx) => (
                    <li key={idx}>{marche}</li>
                  ))}
                </ul>

                <h3>Prix de Vente Moyens Entreprise {data.title}</h3>
                <div className="not-prose">
                  <table className="w-full border-collapse bg-card rounded-lg overflow-hidden">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left">Taille</th>
                        <th className="p-3 text-left">CA moyen</th>
                        <th className="p-3 text-left">Effectif</th>
                        <th className="p-3 text-left">Prix vente</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">TPE</td>
                        <td className="p-3">150-300k€</td>
                        <td className="p-3">1-2 salariés</td>
                        <td className="p-3 font-bold">120-250k€</td>
                      </tr>
                      <tr className="border-t bg-green-50 dark:bg-green-950">
                        <td className="p-3">PME</td>
                        <td className="p-3">300k-1M€</td>
                        <td className="p-3">3-8 salariés</td>
                        <td className="p-3 font-bold">350-800k€</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">ETI</td>
                        <td className="p-3">1-3M€</td>
                        <td className="p-3">8-20 salariés</td>
                        <td className="p-3 font-bold">1-2.5M€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Certifications */}
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Certifications Nécessaires
                </h3>
                <ul className="space-y-2">
                  {data.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aides */}
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Aides Mobilisables
                </h3>
                <div className="space-y-3">
                  {data.aides.map((aide, idx) => (
                    <div key={idx} className="bg-muted p-3 rounded">
                      <p className="text-sm">💰 {aide}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formation */}
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Formation Requise
                </h3>
                <p className="text-sm">{data.formation}</p>
              </div>
            </div>
          </div>

          <CTAIntermediate variant="estimate" metier={data.slug} location="mid-page" />

          {/* Équipements */}
          <div className="bg-muted/50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Équipements et Matériel</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.equipements.map((equip, idx) => (
                <div key={idx} className="bg-card p-4 rounded-lg border">
                  <p className="font-medium">{equip}</p>
                </div>
              ))}
            </div>
          </div>

          <TrustBadges />
          <TestimonialSection />

          <CTAIntermediate variant="alert" metier={data.slug} location="bottom" />

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              💡 Le marché RGE explose : +250% en 3 ans
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Profitez de la transition énergétique pour vendre ou acheter au meilleur moment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/vendre"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:shadow-xl transition"
              >
                Vendre mon entreprise RGE
              </Link>
              <Link 
                to="/acheter"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
              >
                Trouver une entreprise RGE
              </Link>
            </div>
          </div>

          <InternalLinks 
            title="Pages liées énergies renouvelables"
            links={[
              {
                label: "Toutes les entreprises RGE",
                href: "/acheter",
                description: "Parcourir l'ensemble des entreprises certifiées RGE"
              },
              {
                label: "Estimer votre entreprise",
                href: "/estimer",
                description: "Estimation gratuite en ligne"
              }
            ]}
          />
        </div>
      </div>
    </>
  );
};
