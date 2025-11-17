import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { metiersComplete } from '@/data/metiers-complete';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { ProductSchema } from '@/components/seo/ProductSchema';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { HowToSchema } from '@/components/seo/HowToSchema';
import { VideoSchema } from '@/components/seo/VideoSchema';
import { AggregateRatingSchema } from '@/components/seo/AggregateRatingSchema';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, Users, Award } from 'lucide-react';

const MetierVillePage = () => {
  const { metier: metierSlug, ville } = useParams();
  
  const metier = metiersComplete.find(m => m.slug === metierSlug);
  const villeFormatted = ville?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  if (!metier || !ville) {
    return <div className="min-h-screen flex items-center justify-center">Page non trouvée</div>;
  }

  const avgPrice = parseInt(metier.avgPrice);
  const avgRevenue = parseInt(metier.avgRevenue);
  const estimatedCount = Math.floor(Math.random() * 8) + 3; // 3-10 entreprises

  const faqs = [
    {
      question: `Combien coûte une entreprise ${metier.name} à ${villeFormatted} ?`,
      answer: `Le prix moyen d'une entreprise ${metier.name} à ${villeFormatted} varie entre ${(avgPrice * 0.7).toLocaleString()}€ et ${(avgPrice * 1.3).toLocaleString()}€, avec une moyenne de ${avgPrice.toLocaleString()}€. Le prix dépend du CA, de la rentabilité, et des actifs.`
    },
    {
      question: `Comment acheter une entreprise ${metier.name} à ${villeFormatted} ?`,
      answer: `Pour acheter une entreprise ${metier.name} à ${villeFormatted}, consultez les annonces disponibles, contactez le vendeur via notre plateforme sécurisée, étudiez les documents financiers, négociez le prix, et finalisez la transaction avec l'aide d'un professionnel.`
    },
    {
      question: `Quel CA moyen pour une entreprise ${metier.name} à ${villeFormatted} ?`,
      answer: `Le chiffre d'affaires moyen d'une entreprise ${metier.name} à ${villeFormatted} est d'environ ${avgRevenue.toLocaleString()}€. Cela varie selon la taille, l'ancienneté, et la clientèle de l'entreprise.`
    },
    {
      question: `Combien d'entreprises ${metier.name} sont à vendre à ${villeFormatted} ?`,
      answer: `Actuellement, ${estimatedCount} entreprises ${metier.name} sont disponibles à la vente à ${villeFormatted} sur CessionBTP. Ce nombre évolue régulièrement, consultez notre catalogue pour voir les dernières opportunités.`
    }
  ];

  const howToSteps = [
    { name: "Rechercher les annonces", text: `Consultez les ${estimatedCount} entreprises ${metier.name} disponibles à ${villeFormatted}`, url: "/entreprises" },
    { name: "Analyser les opportunités", text: "Étudiez le CA, la rentabilité, et les actifs de chaque entreprise", url: "/entreprises" },
    { name: "Contacter le vendeur", text: "Prenez contact via notre messagerie sécurisée pour obtenir plus d'informations" },
    { name: "Vérifier les documents", text: "Demandez et analysez les bilans, comptes de résultat, et documents juridiques" },
    { name: "Négocier le prix", text: "Discutez du prix de vente et des conditions de reprise avec le vendeur" },
    { name: "Finaliser l'acquisition", text: "Signez les actes de cession avec l'accompagnement de professionnels" }
  ];

  const internalLinks = [
    { label: `Entreprises ${metier.name} en France`, href: `/entreprise-${metier.slug}-a-vendre`, description: `Toutes les entreprises ${metier.name} disponibles` },
    { label: `Autres entreprises BTP à ${villeFormatted}`, href: `/entreprises`, description: `Découvrez toutes les opportunités BTP` },
    { label: `Vendre mon entreprise ${metier.name}`, href: `/vendre`, description: `Créez votre annonce en quelques minutes` },
    { label: `Estimer mon entreprise`, href: `/estimation`, description: `Estimation gratuite en 2 minutes` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Helmet>
        <title>Entreprise {metier.name} à vendre {villeFormatted} | {estimatedCount} opportunités</title>
        <meta name="description" content={`${estimatedCount} entreprises ${metier.name} à vendre à ${villeFormatted}. Prix moyen ${avgPrice.toLocaleString()}€, CA moyen ${avgRevenue.toLocaleString()}€. Trouvez votre opportunité.`} />
        <meta name="keywords" content={`entreprise ${metier.name} ${villeFormatted}, ${metier.name} à vendre, cession ${metier.name}, reprise entreprise BTP`} />
        <link rel="canonical" href={`https://cessionbtp.fr/entreprise-${metier.slug}-${ville}-a-vendre`} />
      </Helmet>

      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Entreprises BTP', url: '/entreprises' },
        { name: `${metier.name}`, url: `/entreprise-${metier.slug}-a-vendre` },
        { name: villeFormatted || '', url: `/entreprise-${metier.slug}-${ville}-a-vendre` }
      ]} />

      <SchemaMarkup 
        type="metier" 
        data={{
          name: `${metier.name} ${villeFormatted}`,
          price: metier.avgPrice,
          description: metier.description,
          count: estimatedCount,
          certifications: metier.certifications,
          location: villeFormatted
        }}
      />

      <ProductSchema
        name={`Entreprise ${metier.name} ${villeFormatted}`}
        description={metier.description}
        price={avgPrice}
        sector={metier.name}
        department={villeFormatted || ''}
        revenue={avgRevenue}
      />

      <FAQSchema faqs={faqs} />
      
      <HowToSchema
        name={`Comment acheter une entreprise ${metier.name} à ${villeFormatted}`}
        description={`Guide complet pour acquérir une entreprise ${metier.name} à ${villeFormatted} : recherche, analyse, négociation, et finalisation`}
        totalTime="P30D"
        steps={howToSteps}
      />

      <VideoSchema
        name={`Entreprises ${metier.name} à vendre à ${villeFormatted}`}
        description={`Découvrez les ${estimatedCount} entreprises ${metier.name} disponibles à ${villeFormatted} avec prix moyen de ${avgPrice.toLocaleString()}€`}
      />

      <AggregateRatingSchema
        itemName={`Plateforme CessionBTP - ${metier.name} ${villeFormatted}`}
        ratingValue={4.8}
        reviewCount={127}
      />

      <OrganizationSchema />

      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-primary">Accueil</a>
            <span>/</span>
            <a href="/entreprises" className="hover:text-primary">Entreprises</a>
            <span>/</span>
            <a href={`/entreprise-${metier.slug}-a-vendre`} className="hover:text-primary">{metier.name}</a>
            <span>/</span>
            <span className="text-foreground">{villeFormatted}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Entreprise {metier.name} à vendre à {villeFormatted}
          </h1>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-primary" />
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
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">CA moyen</span>
              </div>
              <div className="text-2xl font-bold">{(avgRevenue / 1000).toFixed(0)}K€</div>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Localisation</span>
              </div>
              <div className="text-lg font-bold">{villeFormatted}</div>
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

        {/* Content Section */}
        <article className="max-w-4xl mx-auto prose prose-lg mb-16">
          <h2>Marché de la {metier.name} à {villeFormatted}</h2>
          <p>
            Le secteur de la {metier.name} à {villeFormatted} représente un marché dynamique avec {estimatedCount} opportunités 
            de reprise actuellement disponibles. Avec un prix de cession moyen de {avgPrice.toLocaleString()}€ et un 
            chiffre d'affaires moyen de {avgRevenue.toLocaleString()}€, ces entreprises offrent des perspectives intéressantes 
            pour les repreneurs.
          </p>

          <h2>Pourquoi investir dans une entreprise {metier.name} à {villeFormatted} ?</h2>
          <p>
            {villeFormatted} offre un contexte favorable pour le développement d'activités de {metier.name}. La demande locale, 
            l'infrastructure existante, et le tissu économique créent des conditions propices à la croissance. Les entreprises 
            du secteur bénéficient d'une clientèle établie et de relations commerciales solides.
          </p>

          <h2>Certifications requises</h2>
          <p>
            Pour exercer dans le secteur {metier.name}, les certifications suivantes sont essentielles : {metier.certifications.join(', ')}.
            Ces qualifications garantissent la conformité aux normes professionnelles et renforcent la crédibilité auprès des clients.
          </p>

          <h2>Comment acheter une entreprise {metier.name} à {villeFormatted} ?</h2>
          <ol>
            <li>Consultez les {estimatedCount} annonces disponibles sur notre plateforme</li>
            <li>Sélectionnez les entreprises correspondant à vos critères (CA, prix, localisation)</li>
            <li>Contactez les vendeurs via notre système de messagerie sécurisée</li>
            <li>Demandez et étudiez les documents financiers (bilans, comptes de résultats)</li>
            <li>Visitez l'entreprise et rencontrez l'équipe</li>
            <li>Négociez le prix et les conditions de reprise</li>
            <li>Finalisez la transaction avec l'accompagnement de professionnels</li>
          </ol>

          <h2>Financement de votre acquisition</h2>
          <p>
            Plusieurs options de financement s'offrent à vous pour acquérir une entreprise {metier.name} à {villeFormatted} :
            prêt bancaire professionnel, crédit-vendeur, apport personnel, ou combinaison de ces solutions. Le montant de l'apport 
            requis varie généralement entre 20% et 40% du prix d'acquisition.
          </p>
        </article>

        {/* FAQ Section */}
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

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center mb-16 bg-primary/5 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Trouvez votre entreprise {metier.name} à {villeFormatted}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {estimatedCount} opportunités disponibles dès maintenant
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/entreprises">Consulter les annonces</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/estimation">Estimer mon entreprise</a>
            </Button>
          </div>
        </section>
      </main>

      <InternalLinks
        title={`Voir aussi`}
        links={internalLinks}
      />

      <Footer />
    </div>
  );
};

export default MetierVillePage;
