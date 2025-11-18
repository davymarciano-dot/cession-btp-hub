#!/usr/bin/env node

/**
 * 🖼️ SCRIPT D'OPTIMISATION AUTOMATIQUE DES IMAGES
 * Convertit toutes les images en WEBP + génère des versions responsive
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  inputDirs: ['public/images', 'src/assets'],
  outputDir: 'public/images/optimized',
  formats: ['webp', 'avif'],
  sizes: [320, 640, 768, 1024, 1920],
  quality: {
    webp: 80,
    avif: 70,
    jpeg: 85
  }
};

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, filename) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const basename = path.parse(filename).name;
  
  console.log(`📸 Optimizing: ${filename} (${metadata.width}x${metadata.height})`);
  
  const outputs = [];
  
  // Generate WebP versions
  for (const size of CONFIG.sizes) {
    if (size <= metadata.width) {
      const outputPath = path.join(
        CONFIG.outputDir,
        `${basename}-${size}w.webp`
      );
      
      await image
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: CONFIG.quality.webp })
        .toFile(outputPath);
      
      outputs.push(`${basename}-${size}w.webp`);
    }
  }
  
  // Generate AVIF versions (better compression)
  for (const size of CONFIG.sizes) {
    if (size <= metadata.width) {
      const outputPath = path.join(
        CONFIG.outputDir,
        `${basename}-${size}w.avif`
      );
      
      await image
        .resize(size, null, { withoutEnlargement: true })
        .avif({ quality: CONFIG.quality.avif })
        .toFile(outputPath);
      
      outputs.push(`${basename}-${size}w.avif`);
    }
  }
  
  // Generate blur placeholder (20px wide)
  const placeholderPath = path.join(
    CONFIG.outputDir,
    `${basename}-placeholder.webp`
  );
  
  await image
    .resize(20)
    .webp({ quality: 20 })
    .toFile(placeholderPath);
  
  outputs.push(`${basename}-placeholder.webp`);
  
  return outputs;
}

async function processDirectory(dir) {
  try {
    const files = await fs.readdir(dir);
    const imageFiles = files.filter(f => 
      /\.(jpg|jpeg|png|gif)$/i.test(f)
    );
    
    for (const file of imageFiles) {
      const inputPath = path.join(dir, file);
      await optimizeImage(inputPath, file);
    }
    
    console.log(`✅ Processed ${imageFiles.length} images from ${dir}`);
  } catch (error) {
    console.error(`❌ Error processing ${dir}:`, error.message);
  }
}

async function generateManifest() {
  const manifestPath = path.join(CONFIG.outputDir, 'images-manifest.json');
  const files = await fs.readdir(CONFIG.outputDir);
  
  const manifest = {
    generated: new Date().toISOString(),
    images: files.filter(f => !f.includes('manifest')),
    count: files.length - 1
  };
  
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`📋 Generated manifest with ${manifest.count} optimized images`);
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  // Ensure output directory exists
  await ensureDir(CONFIG.outputDir);
  
  // Process all input directories
  for (const dir of CONFIG.inputDirs) {
    await processDirectory(dir);
  }
  
  // Generate manifest
  await generateManifest();
  
  console.log('\n✨ Image optimization complete!');
  console.log(`📊 Images saved to: ${CONFIG.outputDir}`);
}

main().catch(console.error);
