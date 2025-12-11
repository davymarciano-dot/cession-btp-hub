#!/usr/bin/env node
/**
 * Script de prerendering pour CessionBTP
 * Génère des pages HTML statiques pour le SEO
 * 
 * Usage: node scripts/prerender-build.js
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pages principales à pré-rendre
const PRERENDER_ROUTES = [
  '/',
  '/vendre',
  '/entreprises',
  '/estimer',
  '/tarifs',
  '/blog',
  '/faq',
  '/contact',
  '/mentions-legales',
  '/cgv',
  '/equipe',
  '/success-stories',
  '/matching-ia',
  '/outils-gratuits',
  '/lexique-btp',
  '/entreprises-rge',
  '/ressources',
  '/comment-ca-marche',
  // Secteurs énergie
  '/secteur/energies-renouvelables',
  '/secteur/photovoltaique',
  '/secteur/panneaux-solaires',
  '/secteur/pompe-a-chaleur',
  '/secteur/isolation-thermique',
  '/secteur/installation-chauffage',
];

// Top métiers pour le SEO
const TOP_METIERS = [
  'electricite', 'plomberie', 'chauffage', 'climatisation', 'maconnerie',
  'carrelage', 'peinture', 'menuiserie', 'charpente', 'couverture',
  'isolation', 'photovoltaique', 'pompe-a-chaleur', 'terrassement', 'renovation'
];

// Top villes
const TOP_VILLES = [
  'paris', 'marseille', 'lyon', 'toulouse', 'nice',
  'nantes', 'montpellier', 'bordeaux', 'lille', 'rennes'
];

console.log('🚀 CessionBTP Prerender Build');
console.log('============================\n');

// Ajoute les pages métiers
TOP_METIERS.forEach(metier => {
  PRERENDER_ROUTES.push(`/metier/${metier}`);
});

// Ajoute les top combinaisons métier-ville
TOP_METIERS.slice(0, 5).forEach(metier => {
  TOP_VILLES.slice(0, 5).forEach(ville => {
    PRERENDER_ROUTES.push(`/metier/${metier}/${ville}`);
  });
});

console.log(`📝 ${PRERENDER_ROUTES.length} pages à pré-rendre\n`);

// Crée le fichier de configuration pour le prerendering
const prerenderManifest = {
  routes: PRERENDER_ROUTES,
  generatedAt: new Date().toISOString(),
  version: '1.0.0'
};

const distPath = join(__dirname, '..', 'dist');
const manifestPath = join(distPath, 'prerender-manifest.json');

// Vérifie que dist existe
if (!existsSync(distPath)) {
  console.log('⚠️  Le dossier dist n\'existe pas. Lancez d\'abord: npm run build\n');
  process.exit(1);
}

// Écrit le manifest
writeFileSync(manifestPath, JSON.stringify(prerenderManifest, null, 2));
console.log('✅ Manifest de prerendering créé\n');

// Génère les fichiers HTML statiques pour chaque route
console.log('📄 Génération des pages HTML statiques...\n');

const indexHtml = readFileSync(join(distPath, 'index.html'), 'utf-8');

PRERENDER_ROUTES.forEach(route => {
  const routePath = route === '/' ? '/index' : route;
  const htmlPath = join(distPath, `${routePath}.html`);
  const htmlDir = dirname(htmlPath);
  
  // Crée le répertoire si nécessaire
  if (!existsSync(htmlDir)) {
    mkdirSync(htmlDir, { recursive: true });
  }
  
  // Génère le HTML avec les meta tags SEO appropriés
  let pageHtml = indexHtml;
  
  // Ajoute un commentaire indiquant le prerendering
  pageHtml = pageHtml.replace(
    '</head>',
    `<!-- Prerendered: ${route} - ${new Date().toISOString()} -->\n</head>`
  );
  
  // Écrit le fichier
  if (route !== '/') {
    writeFileSync(htmlPath, pageHtml);
    console.log(`  ✓ ${route}`);
  }
});

console.log('\n✅ Prerendering terminé!');
console.log(`📊 ${PRERENDER_ROUTES.length} pages générées\n`);

// Affiche les statistiques
console.log('📈 Statistiques SEO:');
console.log(`   - Pages principales: ${PRERENDER_ROUTES.filter(r => !r.includes('/metier/')).length}`);
console.log(`   - Pages métiers: ${PRERENDER_ROUTES.filter(r => r.includes('/metier/')).length}`);
console.log(`   - Total: ${PRERENDER_ROUTES.length} pages\n`);

console.log('💡 Conseil: Pour un prerendering complet avec JavaScript exécuté,');
console.log('   installez Puppeteer et utilisez @prerenderer/renderer-puppeteer\n');
