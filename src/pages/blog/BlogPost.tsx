import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const blogArticles = [
  {
    slug: 'vendre-entreprise-btp-2026',
    title: 'Guide 2026 : Vendre son Entreprise BTP',
    metaDescription: 'Découvrez les changements majeurs pour vendre votre entreprise BTP en 2026 : RE2025, MaPrimeRénov, prix moyens par secteur.',
    date: '2025-11-14',
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4">Les changements majeurs en 2026</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>RE2025 : Impact significatif sur les valorisations</li>
        <li>Interdiction des chaudières gaz : Boom des pompes à chaleur</li>
        <li>MaPrimeRénov' augmentée à 15,000€</li>
        <li>Nouvelles normes énergétiques</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Prix moyens 2026 par secteur</h2>
      <div class="overflow-x-auto mb-6">
        <table class="min-w-full border border-border">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-2 text-left">Secteur</th>
              <th class="px-4 py-2 text-left">Prix moyen</th>
              <th class="px-4 py-2 text-left">Évolution</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t border-border">
              <td class="px-4 py-2">Pompe à chaleur</td>
              <td class="px-4 py-2 font-bold">550k€</td>
              <td class="px-4 py-2 text-green-600">+40%</td>
            </tr>
            <tr class="border-t border-border">
              <td class="px-4 py-2">Photovoltaïque</td>
              <td class="px-4 py-2 font-bold">480k€</td>
              <td class="px-4 py-2 text-green-600">+35%</td>
            </tr>
            <tr class="border-t border-border">
              <td class="px-4 py-2">ITE</td>
              <td class="px-4 py-2 font-bold">420k€</td>
              <td class="px-4 py-2 text-green-600">+25%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Comment maximiser votre valorisation</h2>
      <p class="mb-4">
        La valorisation de votre entreprise BTP dépend de plusieurs facteurs clés en 2026 :
      </p>
      <ol class="list-decimal pl-6 space-y-2 mb-6">
        <li>Certification RGE active (+30% de valeur)</li>
        <li>Portefeuille clients diversifié</li>
        <li>Équipements récents et conformes RE2025</li>
        <li>Équipe formée aux nouvelles technologies</li>
      </ol>

      <div class="bg-accent p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-2">💡 Conseil d'expert</h3>
        <p>
          Les entreprises spécialisées dans les énergies renouvelables se vendent 40% plus cher 
          et 2x plus rapidement que les entreprises traditionnelles.
        </p>
      </div>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Guide 2026 : Vendre son Entreprise BTP",
      "datePublished": "2025-11-14",
      "author": {
        "@type": "Organization",
        "name": "CessionBTP"
      },
      "description": "Découvrez les changements majeurs pour vendre votre entreprise BTP en 2026",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://cessionbtp.fr/blog/vendre-entreprise-btp-2026"
      }
    }
  },
  {
    slug: 'certification-rge-valorisation',
    title: 'Certification RGE : +30% de valorisation garantie',
    metaDescription: 'La certification RGE augmente la valeur de votre entreprise BTP de 30%. Découvrez comment l\'obtenir et la rentabiliser.',
    date: '2025-11-10',
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4">Pourquoi la certification RGE est essentielle</h2>
      <p class="mb-4">
        En 2026, la certification RGE (Reconnu Garant de l'Environnement) n'est plus une option mais une nécessité pour maximiser la valeur de votre entreprise BTP.
      </p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Impact sur la valorisation</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>+30% de valeur moyenne à la revente</li>
        <li>Délai de vente réduit de 45%</li>
        <li>Accès aux aides MaPrimeRénov</li>
        <li>Clientèle premium et fidèle</li>
      </ul>

      <div class="bg-primary/10 p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-2">📊 Exemple concret</h3>
        <p>
          Entreprise de plomberie, CA 500k€ :<br/>
          Sans RGE : Valorisation 400k€<br/>
          Avec RGE : Valorisation 520k€<br/>
          <strong>Gain : 120k€</strong>
        </p>
      </div>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Certification RGE : +30% de valorisation garantie",
      "datePublished": "2025-11-10",
      "author": {
        "@type": "Organization",
        "name": "CessionBTP"
      }
    }
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);
  
  if (!article) {
    return <div>Article non trouvé</div>;
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | CessionBTP</title>
        <meta name="description" content={article.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify(article.schema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <time className="text-muted-foreground">
              {new Date(article.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </header>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          <div className="mt-12 p-6 bg-primary/10 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Prêt à vendre votre entreprise BTP ?</h3>
            <p className="mb-4">
              Obtenez une estimation gratuite en 48h et accédez à notre réseau d'acheteurs qualifiés.
            </p>
            <a 
              href="/estimer"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90"
            >
              Estimer mon entreprise →
            </a>
          </div>
        </article>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
