import sharp from 'sharp';
import { readdir, stat, writeFile, readFile } from 'fs/promises';
import { join, extname, resolve } from 'path';
import { existsSync } from 'fs';

const IMAGES_DIR = resolve('public/images');
const METADATA_FILE = resolve('.github/scripts/.optimized.json');
const QUALITY = { jpeg: 82, png: 82, webp: 82 };
const MAX_WIDTH = 2400;
const FORCE = process.argv.includes('--force');

// Load previously optimized files
let optimized = {};
if (existsSync(METADATA_FILE) && !FORCE) {
  optimized = JSON.parse(await readFile(METADATA_FILE, 'utf-8'));
}

async function getImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = await getImageFiles(IMAGES_DIR);
let optimizedCount = 0;
let skippedCount = 0;

for (const file of files) {
  const info = await stat(file);
  const key = file.replace(IMAGES_DIR, '');
  const mtime = info.mtimeMs.toString();

  if (optimized[key] === mtime && !FORCE) {
    skippedCount++;
    continue;
  }

  const ext = extname(file).toLowerCase();
  const originalSize = info.size;

  try {
    let img = sharp(file);
    const meta = await img.metadata();

    // Resize if wider than MAX_WIDTH
    if (meta.width > MAX_WIDTH) {
      img = img.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // Compress based on format
    let output;
    if (ext === '.jpg' || ext === '.jpeg') {
      output = await img.jpeg({ quality: QUALITY.jpeg, progressive: true }).toBuffer();
    } else if (ext === '.png') {
      output = await img.png({ quality: QUALITY.png, compressionLevel: 9 }).toBuffer();
    } else if (ext === '.webp') {
      output = await img.webp({ quality: QUALITY.webp }).toBuffer();
    }

    if (output && output.length < originalSize) {
      await writeFile(file, output);
      const saved = ((originalSize - output.length) / originalSize * 100).toFixed(1);
      console.log(`✓ ${key} — ${(originalSize/1024).toFixed(0)}KB → ${(output.length/1024).toFixed(0)}KB (-${saved}%)`);
      optimizedCount++;
      optimized[key] = (await stat(file)).mtimeMs.toString();
    } else {
      console.log(`  ${key} — already optimal`);
      optimized[key] = mtime;
      skippedCount++;
    }
  } catch (err) {
    console.error(`✗ ${key} — ${err.message}`);
  }
}

// Save metadata
await writeFile(METADATA_FILE, JSON.stringify(optimized, null, 2));
console.log(`\nDone: ${optimizedCount} optimized, ${skippedCount} skipped`);
