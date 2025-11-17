import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generateAllSeoPages } from '@/utils/seoPageGenerator';

const Sitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  const generateSitemap = () => {
    const baseUrl = 'https://cessionbtp.fr';
    const today = new Date().toISOString().split('T')[0];
    const pages = generateAllSeoPages();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
    <image:image>
      <image:loc>${baseUrl}/images/logo-cessionbtp-hd.png</image:loc>
      <image:title>CessionBTP - Plateforme de cession d'entreprises BTP</image:title>
    </image:image>
  </url>
  <url>
    <loc>${baseUrl}/vendre</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/entreprises</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/estimer</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/tarifs</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  
  <!-- SEO Pages dynamiques (${pages.length} pages) -->
`;

    pages.forEach(page => {
      xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>
`;
    });

    xml += `</urlset>`;

    setSitemapXml(xml);
  };

  const downloadSitemap = () => {
    if (!sitemapXml) return;
    
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap-complete.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const pages = generateAllSeoPages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Générateur de sitemap XML ultra-optimisé</h1>
            <p className="text-muted-foreground text-lg">
              {pages.length} pages SEO générées automatiquement pour domination Google
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button 
              onClick={generateSitemap}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Générer le sitemap complet
            </Button>
            
            {sitemapXml && (
              <Button 
                onClick={downloadSitemap}
                variant="outline"
                size="lg"
              >
                Télécharger sitemap.xml
              </Button>
            )}
          </div>

          {sitemapXml && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Sitemap généré ({pages.length} pages)</h2>
              <pre className="p-5 bg-muted overflow-auto max-h-[600px] rounded-lg border text-sm">
                {sitemapXml}
              </pre>
            </div>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sitemap;
