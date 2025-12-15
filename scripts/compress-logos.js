#!/usr/bin/env node

/**
 * 🖼️ SCRIPT DE COMPRESSION DES LOGOS CESSIONBTP
 * 
 * Usage: 
 * 1. npm install sharp
 * 2. node scripts/compress-logos.js
 * 
 * Ce script compresse automatiquement tous les logos et favicon
 * pour améliorer les performances du site (SEO + UX mobile)
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const OPTIMIZATIONS = [
  {
    input: 'public/favicon.png',
    outputs: [
      { path: 'public/favicon-optimized.png', width: 32, height: 32, format: 'png' },
      { path: 'public/favicon-48.png', width: 48, height: 48, format: 'png' },
      { path: 'public/favicon-96.png', width: 96, height: 96, format: 'png' },
    ]
  },
  {
    input: 'public/images/logo-cessionbtp.png',
    outputs: [
      { path: 'public/images/logo-cessionbtp-optimized.png', width: 400, format: 'png', quality: 80 },
      { path: 'public/images/logo-cessionbtp-optimized.webp', width: 400, format: 'webp', quality: 80 },
      { path: 'public/images/logo-cessionbtp-200.webp', width: 200, format: 'webp', quality: 80 },
    ]
  },
  {
    input: 'public/images/logo-cessionbtp-hd.png',
    outputs: [
      { path: 'public/images/logo-cessionbtp-hd-optimized.png', width: 600, format: 'png', quality: 85 },
      { path: 'public/images/logo-cessionbtp-hd-optimized.webp', width: 600, format: 'webp', quality: 85 },
    ]
  },
  {
    input: 'src/assets/logo-cessionbtp.png',
    outputs: [
      { path: 'src/assets/logo-cessionbtp-optimized.png', width: 400, format: 'png', quality: 80 },
      { path: 'src/assets/logo-cessionbtp-optimized.webp', width: 400, format: 'webp', quality: 80 },
    ]
  },
  {
    input: 'src/assets/logo-cessionbtp-final.png',
    outputs: [
      { path: 'src/assets/logo-cessionbtp-final-optimized.png', width: 400, format: 'png', quality: 80 },
      { path: 'src/assets/logo-cessionbtp-final-optimized.webp', width: 400, format: 'webp', quality: 80 },
    ]
  }
];

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeImage(config) {
  const { input, outputs } = config;
  
  try {
    const inputSize = await getFileSize(input);
    console.log(`\n📸 Processing: ${input} (${formatSize(inputSize)})`);
    
    const image = sharp(input);
    
    for (const output of outputs) {
      let pipeline = image.clone();
      
      // Resize
      if (output.width && output.height) {
        pipeline = pipeline.resize(output.width, output.height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
      } else if (output.width) {
        pipeline = pipeline.resize(output.width, null, { withoutEnlargement: true });
      }
      
      // Format conversion
      if (output.format === 'webp') {
        pipeline = pipeline.webp({ quality: output.quality || 80 });
      } else if (output.format === 'png') {
        pipeline = pipeline.png({ compressionLevel: 9, palette: true });
      }
      
      await pipeline.toFile(output.path);
      
      const outputSize = await getFileSize(output.path);
      const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
      
      console.log(`   ✅ ${output.path}`);
      console.log(`      Size: ${formatSize(outputSize)} (${savings}% reduction)`);
    }
  } catch (error) {
    console.error(`   ❌ Error processing ${input}:`, error.message);
  }
}

async function main() {
  console.log('🚀 CessionBTP Logo Optimization Script');
  console.log('=====================================\n');
  
  console.log('⚠️  Prerequisites: npm install sharp\n');
  
  let totalInputSize = 0;
  let totalOutputSize = 0;
  
  for (const config of OPTIMIZATIONS) {
    await optimizeImage(config);
  }
  
  console.log('\n=====================================');
  console.log('✨ Optimization complete!');
  console.log('\n📋 Next steps:');
  console.log('   1. Update index.html to use favicon-optimized.png');
  console.log('   2. Update components to use -optimized.webp images');
  console.log('   3. Delete original large files after testing');
}

main().catch(console.error);
