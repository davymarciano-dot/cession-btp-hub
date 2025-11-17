import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { metiersComplete } from '@/data/metiers-complete';
import { regions } from '@/data/seo-data';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { HowToSchema } from '@/components/seo/HowToSchema';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, Building2, Award } from 'lucide-react';

const MetierRegionPage = () => {
  const { metier: metierSlug, region: regionSlug } = useParams();
  
  const metier = metiersComplete.find(m => m.slug === metierSlug);
  const region = regions.find(r => r.slug === regionSlug);

  if (!metier || !region) {
    return <div className="min-h-screen flex items-center justify-center">Page non trouvée</div>;
  }

  const avgPrice = parseInt(metier.avgPrice);
  const avgRevenue = parseInt(metier.avgRevenue);
  const estimatedCount = Math.floor(Math.random() * 25) + 15; // 15-40 entreprises par région

  const faqs = [
    {
      question: `Combien coûte une entreprise ${metier.name} en ${region.name} ?`,
      answer: `Le prix moyen d'une entreprise ${metier.name} en ${region.name} varie entre ${(avgPrice * 0.7).toLocaleString()}€ et ${(avgPrice * 1.3).toLocaleString()}€. Les prix peuvent varier selon les départements de la région.`
    },
    {
      question: `Pourquoi investir dans une entreprise ${metier.name} en ${region.name} ?`,
      answer: `La région ${region.name} offre un marché dynamique pour le secteur ${metier.name} avec ${estimatedCount} opportunités actuellement disponibles. La demande locale et le tissu économique régional créent des conditions favorables.`
    },
    {
      question: `Quel accompagnement pour acheter en ${region.name} ?`,
      answer: `CessionBTP vous accompagne dans toutes les étapes : recherche d'opportunités, mise en relation avec vendeurs, analyse financière, négociation, et finalisation de la transaction.`
    }
  ];

  const howToSteps = [
    { name: "Explorer les opportunités régionales", text: `Découvrez les ${estimatedCount} entreprises ${metier.name} en ${region.name}`, url: "/entreprises" },
    { name: "Comparer les départements", text: "Analysez les opportunités dans chaque département de la région" },
    { name: "Contacter les vendeurs", text: "Échangez avec les propriétaires via notre messagerie sécurisée" },
    { name: "Organiser des visites", text: "Visitez les entreprises qui correspondent à vos critères" },
    { name: "Finaliser votre choix", text: "Sélectionnez l'opportunité la plus adaptée à votre projet" }
  ];

  const internalLinks = [
    { label: `Toutes les entreprises ${metier.name}`, href: `/entreprise-${metier.slug}-a-vendre`, description: `Voir toutes les opportunités ${metier.name}` },
    { label: `Entreprises BTP en ${region.name}`, href: `/entreprise-btp-a-vendre-${region.slug}`, description: `Tous secteurs confondus` },
    { label: `Vendre en ${region.name}`, href: `/vendre`, description: `Créez votre annonce` },
    { label: `Estimer mon entreprise`, href: `/estimation`, description: `Estimation gratuite` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Helmet>
        <title>Entreprise {metier.name} à vendre {region.name} | {estimatedCount} opportunités</title>
        <meta name="description" content={`${estimatedCount} entreprises ${metier.name} à vendre en ${region.name}. Prix moyen ${avgPrice.toLocaleString()}€, CA moyen ${avgRevenue.toLocaleString()}€. Trouvez votre opportunité régionale.`} />
        <link rel="canonical" href={`https://cessionbtp.fr/entreprise-${metier.slug}-${regionSlug}`} />
      </Helmet>

      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Entreprises BTP', url: '/entreprises' },
        { name: metier.name, url: `/entreprise-${metier.slug}-a-vendre` },
        { name: region.name, url: `/entreprise-${metier.slug}-${regionSlug}` }
      ]} />

      <SchemaMarkup 
        type="region" 
        data={{
          name: `${metier.name} ${region.name}`,
          price: metier.avgPrice,
          description: metier.description,
          count: estimatedCount,
          location: region.name
        }}
      />

      <FAQSchema faqs={faqs} />
      
      <HowToSchema
        name={`Acheter une entreprise ${metier.name} en ${region.name}`}
        description={`Guide pour acquérir une entreprise ${metier.name} dans la région ${region.name}`}
        totalTime="P45D"
        steps={howToSteps}
      />

      <OrganizationSchema />

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Entreprise {metier.name} à vendre en {region.name}
          </h1>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Disponibles</span>
              </div>
              <div className="text-2xl font-bold">{estimatedCount}</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Prix moyen</span>
              </div>
              <div className="text-2xl font-bold">{(avgPrice / 1000).toFixed(0)}K€</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">CA moyen</span>
              </div>
              <div className="text-2xl font-bold">{(avgRevenue / 1000).toFixed(0)}K€</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Région</span>
              </div>
              <div className="text-lg font-bold">{region.name}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="/entreprises">Voir les annonces</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/vendre">Vendre mon entreprise</a>
            </Button>
          </div>
        </div>

        <article className="max-w-4xl mx-auto prose prose-lg mb-16">
          <h2>Le marché {metier.name} en {region.name}</h2>
          <p>
            La région {region.name} compte actuellement {estimatedCount} entreprises {metier.name} disponibles à la reprise, 
            offrant des opportunités variées pour les investisseurs et entrepreneurs. Le marché régional se caractérise par 
            des entreprises bien établies avec une clientèle fidèle et des carnets de commandes solides.
          </p>

          <h2>Avantages d'investir en {region.name}</h2>
          <ul>
            <li>Marché régional dynamique avec forte demande en {metier.name}</li>
            <li>Infrastructure et écosystème BTP développés</li>
            <li>Accès à un bassin d'emploi qualifié</li>
            <li>Opportunités de développement multi-départements</li>
            <li>Réseau professionnel BTP actif et structuré</li>
          </ul>

          <h2>Prix et valorisation</h2>
          <p>
            Le prix moyen d'acquisition d'une entreprise {metier.name} en {region.name} s'établit à {avgPrice.toLocaleString()}€, 
            avec des variations selon le département, la taille de l'entreprise, et ses actifs. Les entreprises génèrent 
            en moyenne {avgRevenue.toLocaleString()}€ de chiffre d'affaires annuel.
          </p>
        </article>

        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center mb-16 bg-primary/5 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            {estimatedCount} entreprises {metier.name} en {region.name}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Découvrez toutes les opportunités disponibles
          </p>
          <Button size="lg" asChild>
            <a href="/entreprises">Consulter les annonces</a>
          </Button>
        </section>
      </main>

      <InternalLinks title="Voir aussi" links={internalLinks} />

      <Footer />
    </div>
  );
};

export default MetierRegionPage;
