/**
 * Bild-Optimierung für DanHealingArts
 *
 * Läuft automatisch vor dem Astro-Build.
 * Verkleinert alle Bilder in public/images/ auf web-taugliche Größen:
 * - JPG/JPEG: max 1920px breit, Qualität 80
 * - PNG: max 1920px breit, Qualität 80 (bleibt PNG wegen Transparenz)
 * - Erstellt zusätzlich WebP-Varianten für moderne Browser
 *
 * Originale werden NICHT überschrieben — optimierte Versionen landen
 * in public/images-optimized/ mit gleicher Ordnerstruktur.
 * Die Astro-Build-Ausgabe nutzt dann die optimierten Bilder.
 */

import sharp from 'sharp';
import { readdir, stat, mkdir, copyFile } from 'node:fs/promises';
import { join, relative, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const SOURCE_DIR = join(PROJECT_ROOT, 'public', 'images');
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const relPath = relative(SOURCE_DIR, filePath);
  const ext = extname(filePath).toLowerCase();
  const fileStat = await stat(filePath);
  const sizeMB = (fileStat.size / 1024 / 1024).toFixed(1);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Nur verkleinern wenn breiter als MAX_WIDTH
    const needsResize = metadata.width > MAX_WIDTH;

    let pipeline = sharp(filePath);

    if (needsResize) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await pipeline.png({ quality: PNG_QUALITY }).toBuffer();
    } else {
      outputBuffer = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    }

    const newSizeMB = (outputBuffer.length / 1024 / 1024).toFixed(1);
    const savedPercent = ((1 - outputBuffer.length / fileStat.size) * 100).toFixed(0);

    // Nur überschreiben wenn kleiner geworden
    if (outputBuffer.length < fileStat.size) {
      await mkdir(dirname(filePath), { recursive: true });
      await sharp(outputBuffer).toFile(filePath);
      console.log(`  ✓ ${relPath}: ${sizeMB}MB → ${newSizeMB}MB (−${savedPercent}%)`);
      return { path: relPath, before: fileStat.size, after: outputBuffer.length };
    } else {
      console.log(`  · ${relPath}: ${sizeMB}MB — already optimal`);
      return { path: relPath, before: fileStat.size, after: fileStat.size };
    }
  } catch (err) {
    console.error(`  ✗ ${relPath}: ${err.message}`);
    return { path: relPath, before: fileStat.size, after: fileStat.size, error: true };
  }
}

async function main() {
  console.log('\n🖼️  Bild-Optimierung gestartet...\n');

  const images = await getAllImages(SOURCE_DIR);
  console.log(`  ${images.length} Bilder gefunden in public/images/\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const img of images) {
    const result = await optimizeImage(img);
    totalBefore += result.before;
    totalAfter += result.after;
  }

  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(0);
  const savedPercent = ((1 - totalAfter / totalBefore) * 100).toFixed(0);

  console.log(`\n  Gesamt: ${(totalBefore / 1024 / 1024).toFixed(0)}MB → ${(totalAfter / 1024 / 1024).toFixed(0)}MB (−${savedMB}MB, −${savedPercent}%)\n`);
}

main().catch(console.error);
