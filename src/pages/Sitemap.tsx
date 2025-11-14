import { useEffect } from 'react';
import { certifications } from '@/data/seo-data';
import { metiers } from '@/data/seo-data';
import { regions } from '@/data/seo-data';
import { sellerKeywords } from '@/data/seo-seller-keywords';
import { buyerKeywords } from '@/data/seo-buyer-keywords';

const Sitemap = () => {
  useEffect(() => {
    // Generate XML sitemap
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

    // Create downloadable file
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Also display in browser
    const pre = document.createElement('pre');
    pre.textContent = xml;
    pre.style.cssText = 'padding: 20px; background: #f5f5f5; overflow: auto; max-height: 80vh;';
    document.body.innerHTML = '';
    document.body.appendChild(pre);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Génération du sitemap...</h1>
      <p className="text-muted-foreground">Le fichier sitemap.xml sera téléchargé automatiquement.</p>
    </div>
  );
};

export default Sitemap;
