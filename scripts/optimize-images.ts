#!/usr/bin/env node
/**
 * 🖼️ Script d'optimisation d'images pour CessionBTP
 * 
 * Fonctionnalités:
 * - Conversion WEBP automatique
 * - Génération de srcset (320, 640, 768, 1024, 1920)
 * - Compression optimisée (quality 80)
 * - Génération de placeholders blur (LQIP)
 * 
 * Usage: npx ts-node scripts/optimize-images.ts
 * ou: npm run optimize-images
 */

import { execSync } from 'child_process';
import { readdirSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

// Configuration
const CONFIG = {
  inputDirs: [
    'src/assets',
    'src/assets/metiers',
    'public/images',
  ],
  outputDir: 'public/images/optimized',
  sizes: [320, 640, 768, 1024, 1280, 1920],
  quality: 80,
  formats: ['webp', 'avif'] as const,
  supportedExtensions: ['.jpg', '.jpeg', '.png', '.gif'],
};

// Vérifier si sharp est installé
function checkDependencies(): boolean {
  try {
    execSync('npx sharp --version', { stdio: 'ignore' });
    return true;
  } catch {
    console.log('⚠️  Sharp non détecté. Installation...');
    console.log('   npm install sharp');
    return false;
  }
}

// Obtenir tous les fichiers images
function getImageFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  
  const files: string[] = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else if (CONFIG.supportedExtensions.includes(extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Générer les commandes d'optimisation
function generateOptimizationCommands(imagePath: string): string[] {
  const name = basename(imagePath, extname(imagePath));
  const commands: string[] = [];
  
  // Créer le dossier de sortie si nécessaire
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Générer pour chaque taille
  for (const width of CONFIG.sizes) {
    // WEBP
    commands.push(
      `npx sharp -i "${imagePath}" -o "${CONFIG.outputDir}/${name}-${width}w.webp" resize ${width} --quality ${CONFIG.quality}`
    );
    
    // AVIF (meilleure compression)
    commands.push(
      `npx sharp -i "${imagePath}" -o "${CONFIG.outputDir}/${name}-${width}w.avif" resize ${width} --quality ${CONFIG.quality - 10}`
    );
  }
  
  // Placeholder LQIP (20px blur)
  commands.push(
    `npx sharp -i "${imagePath}" -o "${CONFIG.outputDir}/${name}-placeholder.webp" resize 20 --quality 30 blur 10`
  );
  
  return commands;
}

// Main
async function main() {
  console.log('🖼️  CessionBTP Image Optimizer');
  console.log('==============================\n');
  
  // Vérifier les dépendances
  if (!checkDependencies()) {
    console.log('\n❌ Installez sharp d\'abord: npm install sharp');
    process.exit(1);
  }
  
  // Collecter les images
  const allImages: string[] = [];
  for (const dir of CONFIG.inputDirs) {
    const images = getImageFiles(dir);
    allImages.push(...images);
    console.log(`📁 ${dir}: ${images.length} images`);
  }
  
  console.log(`\n📊 Total: ${allImages.length} images à optimiser`);
  console.log(`📏 Tailles: ${CONFIG.sizes.join(', ')}px`);
  console.log(`🎨 Formats: ${CONFIG.formats.join(', ')}`);
  console.log(`📊 Qualité: ${CONFIG.quality}%\n`);
  
  if (allImages.length === 0) {
    console.log('✅ Aucune image à optimiser');
    return;
  }
  
  // Créer le dossier de sortie
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Générer les statistiques
  const stats = {
    processed: 0,
    webp: 0,
    avif: 0,
    placeholders: 0,
  };
  
  console.log('🔄 Optimisation en cours...\n');
  
  for (const imagePath of allImages) {
    const name = basename(imagePath);
    console.log(`  📷 ${name}`);
    
    const commands = generateOptimizationCommands(imagePath);
    
    for (const cmd of commands) {
      try {
        // En mode dry-run, juste afficher les commandes
        console.log(`     → ${cmd.split(' ').slice(-1)[0]}`);
        // execSync(cmd, { stdio: 'ignore' });
        
        if (cmd.includes('.webp')) stats.webp++;
        if (cmd.includes('.avif')) stats.avif++;
        if (cmd.includes('placeholder')) stats.placeholders++;
      } catch (error) {
        console.log(`     ❌ Erreur: ${error}`);
      }
    }
    
    stats.processed++;
  }
  
  console.log('\n✅ Optimisation terminée!');
  console.log('📊 Résultats:');
  console.log(`   - Images traitées: ${stats.processed}`);
  console.log(`   - Fichiers WEBP: ${stats.webp}`);
  console.log(`   - Fichiers AVIF: ${stats.avif}`);
  console.log(`   - Placeholders: ${stats.placeholders}`);
  console.log(`   - Total fichiers: ${stats.webp + stats.avif + stats.placeholders}`);
  
  console.log('\n💡 Pour exécuter réellement l\'optimisation,');
  console.log('   décommentez execSync() dans le script.\n');
}

main().catch(console.error);

export { CONFIG, getImageFiles, generateOptimizationCommands };
