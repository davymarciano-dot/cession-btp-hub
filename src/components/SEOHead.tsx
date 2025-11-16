import { Helmet } from 'react-helmet-async';
import { siteConfig, pageSEO } from '@/config/seo-config';

interface SEOHeadProps {
  // Page key pour utiliser la config pré-définie
  page?: keyof typeof pageSEO;
  
  // Override des valeurs
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  
  // Schema.org personnalisé
  schema?: Record<string, any> | Record<string, any>[];
  
  // Meta tags additionnels
  noindex?: boolean;
  nofollow?: boolean;
  
  // Open Graph spécifique
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  
  // Twitter Card spécifique
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  
  // Article meta (pour blog posts)
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export const SEOHead = ({
  page,
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  schema,
  noindex = false,
  nofollow = false,
  ogTitle,
  ogDescription,
  ogImage,
  ogType,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterCard = 'summary_large_image',
  publishedTime,
  modifiedTime,
  author,
  tags,
}: SEOHeadProps) => {
  // Récupérer la config de la page si spécifiée
  const pageConfig = page ? pageSEO[page] : null;
  
  // Construire les valeurs finales (priority: props > pageConfig > default)
  const finalTitle = title || pageConfig?.title || siteConfig.description;
  const finalDescription = description || pageConfig?.description || siteConfig.description;
  const finalKeywords = keywords || pageConfig?.keywords || siteConfig.keywords.join(', ');
  const finalCanonical = canonical || pageConfig?.canonical || siteConfig.url;
  const finalImage = image || ogImage || siteConfig.ogImage;
  const finalType = ogType || type || pageConfig?.schema || 'website';
  
  // Open Graph
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalOgImage = ogImage || finalImage;
  
  // Twitter Card
  const finalTwitterTitle = twitterTitle || finalTitle;
  const finalTwitterDescription = twitterDescription || finalDescription;
  const finalTwitterImage = twitterImage || finalImage;
  
  // Robots meta
  const robotsContent = noindex || nofollow 
    ? `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`
    : 'index, follow';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author || siteConfig.author} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      
      {/* Language */}
      <meta name="language" content="French" />
      <meta httpEquiv="content-language" content="fr-FR" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={finalType} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />
      
      {/* Article specific Open Graph tags */}
      {finalType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {finalType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {finalType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {finalType === 'article' && tags && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@cessionbtp" />
      <meta name="twitter:creator" content="@cessionbtp" />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#1a56db" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
