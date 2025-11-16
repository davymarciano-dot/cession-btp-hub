import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogArticles } from '@/data/blogArticles';
import { blogPostsFullContent } from '@/data/blogPostsContent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  // Get similar articles (same category, exclude current)
  const similarArticles = blogArticles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article.title;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
    };
    
    if (platform === 'email') {
      window.location.href = urls[platform];
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{article.title} | CessionBTP</title>
        <meta name="description" content={fullContent.metaDescription} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={fullContent.metaDescription} />
        {fullContent.imageUrl && <meta property="og:image" content={fullContent.imageUrl} />}
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(fullContent.schema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Hero Image */}
          {fullContent.imageUrl && (
            <div className="w-full h-96 rounded-xl overflow-hidden mb-8">
              <img 
                src={fullContent.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              {article.featured && <Badge variant="default">⭐ À la une</Badge>}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center justify-between text-muted-foreground mb-6">
              <div className="flex items-center gap-4">
                <time>
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>{article.readTime} min de lecture</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <span className="text-sm font-medium mr-2">Partager :</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('email')}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert mb-12"
            dangerouslySetInnerHTML={{ __html: fullContent.content }}
          />

          {/* CTA */}
          <div className="my-12 p-8 bg-primary/10 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">Prêt à vendre votre entreprise BTP ?</h3>
            <p className="text-lg mb-6">
              Obtenez une estimation gratuite en 48h et accédez à notre réseau d'acheteurs qualifiés.
            </p>
            <Button asChild size="lg">
              <Link to="/estimer">
                Estimer mon entreprise →
              </Link>
            </Button>
          </div>

          {/* Similar Articles */}
          {similarArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t">
              <h3 className="text-2xl font-bold mb-6">Articles similaires</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {similarArticles.map(similarArticle => {
                  const similarContent = blogPostsFullContent[similarArticle.slug];
                  return (
                    <Link 
                      key={similarArticle.slug} 
                      to={`/blog/${similarArticle.slug}`}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                        {similarContent?.imageUrl && (
                          <div className="w-full h-40 overflow-hidden">
                            <img 
                              src={similarContent.imageUrl} 
                              alt={similarArticle.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <Badge variant="secondary" className="mb-2">
                            {similarArticle.category}
                          </Badge>
                          <h4 className="font-bold mb-2 line-clamp-2">{similarArticle.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {similarArticle.excerpt}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </article>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
