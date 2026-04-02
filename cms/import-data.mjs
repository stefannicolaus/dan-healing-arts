import { readFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'
import { parse } from 'yaml'

const PROJECT_ID = 'ttf5z41g'
const DATASET = 'production'
const TOKEN = 'skzDoyxPWT2EvCOXYDoI0FJYASAbf3oKToGsTqzRUH0BobbQJGMMQf9L0IXAFs8dO0blxT2IcW6Kej3ZfHV8UtvzjseyZQIu1Vv0h4juXmDjAo4kBU8e7PaeyR9S0GH3O7e6UX1bVPPva7d49qODtmro8TRbbWXmkrB4jbeOd9UArPwxI8M3'
const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`

const CONTENT_DIR = '../src/content'

function readYaml(filePath) {
  return parse(readFileSync(filePath, 'utf8'))
}

function readDir(dir) {
  return readdirSync(dir).filter(f => f.endsWith('.yaml'))
}

async function mutate(mutations) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(data))
  return data
}

async function importCollection(type, dir, transform) {
  const files = readDir(join(CONTENT_DIR, dir))
  const mutations = files.map(file => {
    const slug = basename(file, '.yaml')
    const data = readYaml(join(CONTENT_DIR, dir, file))
    const doc = { _type: type, _id: `${type}-${slug}`, ...transform(data, slug) }
    return { createOrReplace: doc }
  })
  const result = await mutate(mutations)
  console.log(`✅ ${type}: ${files.length} Einträge importiert`)
  return result
}

// TRAININGS
await importCollection('training', 'trainings', (d, slug) => ({
  title: d.title,
  date: d.date,
  location: d.location,
  level: d.level,
  href: d.href,
  status: d.status || 'aktiv',
  spots_left: d.spots_left,
  show_on_homepage: d.show_on_homepage || false,
}))

// TESTIMONIALS
await importCollection('testimonial', 'testimonials', (d, slug) => ({
  name: d.name,
  location: d.location,
  quote: d.quote,
}))

console.log('\n✓ Import abgeschlossen.')
