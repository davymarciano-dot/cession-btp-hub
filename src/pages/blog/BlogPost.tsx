import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogArticles } from '@/data/blogArticles';
import { blogPostsFullContent } from '@/data/blogPostsContent';

const BlogPost = () => {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);
  const fullContent = slug ? blogPostsFullContent[slug] : null;
  
  if (!article || !fullContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <a href="/blog" className="text-primary hover:underline">Retour au blog</a>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | CessionBTP</title>
        <meta name="description" content={fullContent.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify(fullContent.schema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <time className="text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </header>
          
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: fullContent.content }}
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
