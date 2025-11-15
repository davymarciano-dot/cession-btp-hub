import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { certifications, metiers, regions } from '@/data/seo-data';
import { sellerKeywords } from '@/data/seo-seller-keywords';
import { buyerKeywords } from '@/data/seo-buyer-keywords';

const Sitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  const generateSitemap = () => {
    const baseUrl = 'https://cessionbtp.fr';
    const today = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/vendre</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/acheter</loc>
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
  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${today}</lastmod>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
  </url>
  
  <!-- Certification pages -->
`;

    certifications.forEach(cert => {
      xml += `  <url>
    <loc>${baseUrl}/entreprise-${cert.slug}-a-vendre</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
`;
    });

    xml += `  
  <!-- Metier pages -->
`;

    metiers.forEach(metier => {
      xml += `  <url>
    <loc>${baseUrl}/${metier.slug}-entreprise-a-vendre</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
`;
    });

    xml += `  
  <!-- Region pages -->
`;

    regions.forEach(region => {
      xml += `  <url>
    <loc>${baseUrl}/entreprise-btp-a-vendre-${region.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
`;
    });

    xml += `  
  <!-- Seller keyword pages -->
`;

    sellerKeywords.forEach(keyword => {
      xml += `  <url>
    <loc>${baseUrl}/${keyword.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
  </url>
`;
    });

    xml += `  
  <!-- Buyer keyword pages -->
`;

    buyerKeywords.forEach(keyword => {
      xml += `  <url>
    <loc>${baseUrl}/${keyword.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>daily</changefreq>
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
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Générateur de Sitemap</h1>
            <p className="text-muted-foreground">
              Générez un sitemap XML pour améliorer le référencement
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button 
              onClick={generateSitemap}
              size="lg"
            >
              Générer le Sitemap
            </Button>
            
            {sitemapXml && (
              <Button 
                onClick={downloadSitemap}
                variant="outline"
                size="lg"
              >
                Télécharger le Sitemap
              </Button>
            )}
          </div>

          {sitemapXml && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Sitemap Généré</h2>
              <pre className="p-5 bg-gray-50 dark:bg-gray-900 overflow-auto max-h-[600px] rounded-lg border">
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
