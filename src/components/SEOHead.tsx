import { Helmet } from "react-helmet-async";
import { siteConfig, pageSEO, organizationSchema } from "@/config/seo-config";

interface SEOHeadProps {
  page: keyof typeof pageSEO;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  schema?: any;
}

const SEOHead = ({ 
  page, 
  customTitle, 
  customDescription, 
  customImage,
  schema 
}: SEOHeadProps) => {
  const pageData = pageSEO[page];
  
  const title = customTitle || pageData.title;
  const description = customDescription || pageData.description;
  const canonical = pageData.canonical;
  const keywords = pageData.keywords;
  const ogImage = customImage || siteConfig.ogImage;

  return (
    <Helmet>
      {/* BASIC META TAGS */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* OPEN GRAPH (Facebook, LinkedIn) */}
      <meta property="og:type" content={siteConfig.type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />
      
      {/* TWITTER CARD */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@cessionbtp" />
      
      {/* ADDITIONAL SEO */}
      <meta name="author" content={siteConfig.author} />
      <meta name="publisher" content={siteConfig.publisher} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* LANGUAGE & REGION */}
      <meta httpEquiv="content-language" content="fr" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      
      {/* MOBILE */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#FF6B35" />
      
      {/* SCHEMA.ORG JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* ORGANIZATION SCHEMA (sur toutes les pages) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
