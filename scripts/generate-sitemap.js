#!/usr/bin/env node

/**
 * 🗺️ GÉNÉRATEUR DE SITEMAP DYNAMIQUE
 * Génère un sitemap.xml complet avec toutes les pages statiques et dynamiques
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs').promises;
const path = require('path');

const SITE_URL = 'https://cessionbtp.fr';

// Pages statiques avec priorité et fréquence
const STATIC_PAGES = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/vendre', priority: 0.9, changefreq: 'weekly' },
  { url: '/entreprises', priority: 0.9, changefreq: 'daily' },
  { url: '/estimation', priority: 0.8, changefreq: 'weekly' },
  { url: '/tarifs', priority: 0.7, changefreq: 'monthly' },
  { url: '/comment-ca-marche', priority: 0.7, changefreq: 'monthly' },
  { url: '/faq', priority: 0.6, changefreq: 'monthly' },
  { url: '/equipe', priority: 0.5, changefreq: 'monthly' },
  { url: '/success-stories', priority: 0.6, changefreq: 'weekly' },
  { url: '/matching-ia', priority: 0.6, changefreq: 'monthly' },
  { url: '/lexique-btp', priority: 0.5, changefreq: 'monthly' },
  { url: '/outils-gratuits', priority: 0.6, changefreq: 'monthly' },
  { url: '/blog', priority: 0.7, changefreq: 'daily' },
  { url: '/contact', priority: 0.5, changefreq: 'yearly' },
  { url: '/cgv', priority: 0.3, changefreq: 'yearly' },
  { url: '/mentions-legales', priority: 0.3, changefreq: 'yearly' },
];

// Générer les URLs des métiers (exemple: /metier/electricien)
const METIERS = [
  'electricien', 'plombier', 'chauffagiste', 'climatisation', 'macon',
  'menuisier', 'couvreur', 'peintre', 'carreleur', 'platrerie',
  'isolation', 'panneaux-solaires', 'pompe-chaleur', 'renovation-energetique'
];

// Générer les URLs des départements (exemple: /region/75-paris)
const DEPARTEMENTS = [
  '75-paris', '69-rhone', '13-bouches-du-rhone', '33-gironde', '31-haute-garonne',
  '44-loire-atlantique', '59-nord', '06-alpes-maritimes', '34-herault', '67-bas-rhin'
];

function generateXML(pages) {
  const urls = pages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;
}

async function main() {
  console.log('🗺️  Generating comprehensive sitemap...\n');
  
  const allPages = [
    ...STATIC_PAGES,
    
    // Pages métiers
    ...METIERS.map(metier => ({
      url: `/metier/${metier}`,
      priority: 0.7,
      changefreq: 'weekly'
    })),
    
    // Pages départements
    ...DEPARTEMENTS.map(dept => ({
      url: `/region/${dept}`,
      priority: 0.6,
      changefreq: 'weekly'
    })),
    
    // Pages métiers x départements (top 10 combinaisons)
    { url: '/metier/electricien/75-paris', priority: 0.8, changefreq: 'daily' },
    { url: '/metier/plombier/75-paris', priority: 0.8, changefreq: 'daily' },
    { url: '/metier/chauffagiste/69-rhone', priority: 0.7, changefreq: 'weekly' },
    { url: '/metier/isolation/13-bouches-du-rhone', priority: 0.7, changefreq: 'weekly' },
    { url: '/metier/panneaux-solaires/33-gironde', priority: 0.7, changefreq: 'weekly' },
  ];
  
  const xml = generateXML(allPages);
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  
  await fs.writeFile(outputPath, xml, 'utf-8');
  
  console.log(`✅ Sitemap generated with ${allPages.length} URLs`);
  console.log(`📍 Saved to: ${outputPath}`);
  console.log('\n📊 Breakdown:');
  console.log(`   - Static pages: ${STATIC_PAGES.length}`);
  console.log(`   - Métiers: ${METIERS.length}`);
  console.log(`   - Départements: ${DEPARTEMENTS.length}`);
  console.log(`   - Métiers x Départements: 5`);
}

main().catch(console.error);
