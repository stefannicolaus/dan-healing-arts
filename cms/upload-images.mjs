/**
 * Lädt alle Bilder aus public/images/ nach Sanity hoch
 * und verknüpft sie mit den richtigen Dokumenten.
 */
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname, basename, relative } from 'path'
import { parse } from 'yaml'

const PROJECT_ID = 'ttf5z41g'
const DATASET = 'production'
const TOKEN = 'skzDoyxPWT2EvCOXYDoI0FJYASAbf3oKToGsTqzRUH0BobbQJGMMQf9L0IXAFs8dO0blxT2IcW6Kej3ZfHV8UtvzjseyZQIu1Vv0h4juXmDjAo4kBU8e7PaeyR9S0GH3O7e6UX1bVPPva7d49qODtmro8TRbbWXmkrB4jbeOd9UArPwxI8M3'
const PUBLIC_DIR = '../public'
const CONTENT_DIR = '../src/content'

function readYaml(path) {
  return parse(readFileSync(path, 'utf8'))
}

function mimeType(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.png') return 'image/png'
  if (ext === '.gif') return 'image/gif'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

// Upload ein Bild zu Sanity, gibt asset._id zurück
async function uploadImage(localPath) {
  const fullPath = join(PUBLIC_DIR, localPath)
  const data = readFileSync(fullPath)
  const filename = basename(localPath)

  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': mimeType(localPath),
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: data,
    }
  )
  const json = await res.json()
  if (!res.ok) throw new Error(`Upload fehlgeschlagen für ${localPath}: ${JSON.stringify(json)}`)
  return json.document._id
}

// Alle Bild-Dateien aus public/images/ sammeln
function collectImages(dir, prefix = '/images') {
  const result = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      result.push(...collectImages(fullPath, `${prefix}/${entry}`))
    } else {
      const ext = extname(entry).toLowerCase()
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        result.push(`${prefix}/${entry}`)
      }
    }
  }
  return result
}

// Sanity-Dokument patchen
async function patch(id, setFields) {
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        mutations: [{
          patch: { id, set: setFields }
        }]
      }),
    }
  )
  const json = await res.json()
  if (!res.ok) throw new Error(`Patch fehlgeschlagen für ${id}: ${JSON.stringify(json)}`)
  return json
}

// Sanity Image Reference bauen
function imgRef(assetId) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

// ─────────────────────────────────────────────────────────
// SCHRITT 1: Alle Bilder hochladen
// ─────────────────────────────────────────────────────────
console.log('📤 Lade Bilder hoch...')
const imagesDir = join(PUBLIC_DIR, 'images')
const allLocalPaths = collectImages(imagesDir)
console.log(`  ${allLocalPaths.length} Bilder gefunden`)

const pathToAsset = {}
let uploaded = 0
let skipped = 0

for (const localPath of allLocalPaths) {
  try {
    const assetId = await uploadImage(localPath)
    pathToAsset[localPath] = assetId
    uploaded++
    if (uploaded % 10 === 0) console.log(`  ${uploaded}/${allLocalPaths.length} hochgeladen...`)
  } catch (err) {
    console.warn(`  ⚠️  Übersprungen: ${localPath} — ${err.message}`)
    skipped++
  }
}
console.log(`✅ ${uploaded} Bilder hochgeladen, ${skipped} übersprungen\n`)

// ─────────────────────────────────────────────────────────
// SCHRITT 2: Startseite patchen
// ─────────────────────────────────────────────────────────
console.log('📝 Patche Startseite...')
{
  const fields = {}
  const map = {
    hero_bild: '/images/general/dan-outside-38.jpg',
    parallax_1: '/images/parallax-1.jpg',
    entwickelst_bild: '/images/zurich-entwickelst.jpg',
    erfahrungsraum_bild: '/images/fuer-persoenlich.jpg',
    ueber_bild: '/images/daniel-portrait.jpg',
    parallax_2: '/images/parallax-2.jpg',
  }
  for (const [field, path] of Object.entries(map)) {
    if (pathToAsset[path]) fields[field] = imgRef(pathToAsset[path])
    else console.warn(`  ⚠️  Bild nicht gefunden: ${path}`)
  }
  await patch('startseite-zurich', fields)
  console.log('✅ Startseite\n')
}

// ─────────────────────────────────────────────────────────
// SCHRITT 3: Retreat-Seiten patchen
// ─────────────────────────────────────────────────────────
console.log('📝 Patche Retreat-Seiten...')
const retreatFiles = readdirSync(join(CONTENT_DIR, 'retreats')).filter(f => f.endsWith('.yaml'))
for (const file of retreatFiles) {
  const slug = basename(file, '.yaml')
  const d = readYaml(join(CONTENT_DIR, 'retreats', file))
  const fields = {}

  // Hero-Bild
  if (d.hero?.image && pathToAsset[d.hero.image]) {
    fields.hero_image = imgRef(pathToAsset[d.hero.image])
  }

  // Section-Bilder
  if (d.sections) {
    d.sections.forEach((s, i) => {
      if (s.image && pathToAsset[s.image]) {
        fields[`sections[_key == "section-${i}"].image`] = imgRef(pathToAsset[s.image])
      }
    })
  }

  // Pricing Card Bilder
  if (d.pricing?.cards) {
    d.pricing.cards.forEach((c, i) => {
      if (c.image && pathToAsset[c.image]) {
        fields[`pricing_cards[_key == "card-${i}"].image`] = imgRef(pathToAsset[c.image])
      }
    })
  }

  if (Object.keys(fields).length > 0) {
    await patch(`retreat-${slug}`, fields)
    console.log(`✅ retreat-${slug}`)
  }
}
console.log()

// ─────────────────────────────────────────────────────────
// SCHRITT 4: Trainings patchen
// ─────────────────────────────────────────────────────────
console.log('📝 Patche Trainings...')
const trainingFiles = readdirSync(join(CONTENT_DIR, 'trainings')).filter(f => f.endsWith('.yaml'))
for (const file of trainingFiles) {
  const slug = basename(file, '.yaml')
  const d = readYaml(join(CONTENT_DIR, 'trainings', file))
  if (d.image && pathToAsset[d.image]) {
    await patch(`training-${slug}`, { image: imgRef(pathToAsset[d.image]) })
    console.log(`✅ training-${slug}`)
  }
}
console.log()

// ─────────────────────────────────────────────────────────
// SCHRITT 5: Seiten patchen (about-dan, sessions, massage etc.)
// ─────────────────────────────────────────────────────────
console.log('📝 Patche Seiten...')
const pageFiles = readdirSync(join(CONTENT_DIR, 'pages')).filter(f => f.endsWith('.yaml'))
for (const file of pageFiles) {
  const slug = basename(file, '.yaml')
  const d = readYaml(join(CONTENT_DIR, 'pages', file))
  const fields = {}

  // Hero-Bild
  if (d.hero?.image && pathToAsset[d.hero.image]) {
    fields.hero_image = imgRef(pathToAsset[d.hero.image])
  }

  // Section-Bilder
  if (d.sections) {
    d.sections.forEach((s, i) => {
      if (s.image && pathToAsset[s.image]) {
        fields[`sections[_key == "section-${i}"].image`] = imgRef(pathToAsset[s.image])
      }
    })
  }

  if (Object.keys(fields).length > 0) {
    await patch(`page-${slug}`, fields)
    console.log(`✅ page-${slug}`)
  }
}

console.log('\n✓ Fertig — alle Bilder sind jetzt im Sanity Editor sichtbar.')
