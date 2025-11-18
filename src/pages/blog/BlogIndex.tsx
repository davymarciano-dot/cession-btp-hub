import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogArticles, BlogArticle } from '@/data/blogArticles';
import { blogPostsFullContent } from '@/data/blogPostsContent';
import { UltraCompleteSchemas } from '@/components/seo/UltraCompleteSchemas';
import { AutoInternalLinks } from '@/components/seo/AutoInternalLinks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { value: 'all', label: 'Tous les articles' },
    { value: 'vente', label: 'Vendre' },
    { value: 'reprise', label: 'Reprendre' },
    { value: 'rge', label: 'RGE' },
    { value: 'financement', label: 'Financement' }
  ];
  
  const filteredArticles = selectedCategory === 'all' 
    ? blogArticles 
    : blogArticles.filter(a => a.category === selectedCategory);
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Blog CessionBTP</h1>
            <p className="text-xl text-muted-foreground">
              Guides, conseils et actualités sur la transmission d'entreprises BTP
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                variant={selectedCategory === cat.value ? "default" : "outline"}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          
          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* SEO Optimization */}
        <UltraCompleteSchemas page="blog" />
        <AutoInternalLinks currentPage="/blog" maxLinks={6} />
      </div>
      <Footer />
    </>
  );
};

const ArticleCard = ({ article }: { article: BlogArticle }) => {
  const fullContent = blogPostsFullContent[article.slug];
  
  return (
    <Link to={`/blog/${article.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
        {fullContent?.imageUrl && (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={fullContent.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{article.category}</Badge>
            {article.featured && <Badge variant="default">⭐ À la une</Badge>}
          </div>
          
          <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
          
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>{article.readTime} min de lecture</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="text-xs">
              Rédigé par <span className="font-medium text-foreground">{article.author}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogIndex;
