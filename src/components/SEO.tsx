import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEO({
  title = "CessionBTP - Achat et Vente d'Entreprises BTP",
  description = "Plateforme n°1 pour acheter et vendre des entreprises du BTP en France. Plus de 500 sociétés de construction à reprendre. Success Fee à partir de 3%, Matching IA, 543 entreprises vendues.",
  image = "/logo-hd.png",
  url = "https://cessionbtp.fr",
  type = "website",
  keywords = "cession entreprise BTP, vendre société construction, acheter entreprise bâtiment, reprise BTP, valorisation entreprise BTP",
  author = "CessionBTP",
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  const fullTitle = title.includes('CessionBTP') ? title : `${title} | CessionBTP`;

  return (
    <Helmet>
      {/* Base Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="CessionBTP" />
      <meta property="og:locale" content="fr_FR" />

      {/* Article specific tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@cessionbtp" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="French" />
      <meta name="revisit-after" content="7 days" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CessionBTP",
          "description": description,
          "url": url,
          "logo": `${url}/logo-hd.png`,
          "image": fullImageUrl,
          "telephone": "+33-1-76-38-02-92",
          "email": "contact@cessionbtp.fr",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR",
            "addressLocality": "Paris"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33-1-76-38-02-92",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": ["French"]
          },
          "sameAs": [
            "https://www.facebook.com/cessionbtp",
            "https://www.linkedin.com/company/cessionbtp",
            "https://twitter.com/cessionbtp"
          ]
        })}
      </script>
    </Helmet>
  );
}
