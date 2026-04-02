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

// HERO (Startseite)
const heroData = readYaml(join(CONTENT_DIR, 'hero/zurich.yaml'))
await mutate([{
  createOrReplace: {
    _type: 'hero',
    _id: 'hero-zurich',
    headline: heroData.headline,
    subtext: heroData.subtext,
    cta_text: heroData.cta_text,
    cta_link: heroData.cta_link,
  }
}])
console.log('✅ Startseite Hero importiert')

// PAGES
const pageFiles = readdirSync(join(CONTENT_DIR, 'pages')).filter(f => f.endsWith('.yaml'))
const pageMutations = pageFiles.map(file => {
  const slug = basename(file, '.yaml')
  const d = readYaml(join(CONTENT_DIR, 'pages', file))
  return {
    createOrReplace: {
      _type: 'page',
      _id: `page-${slug}`,
      slug: { _type: 'slug', current: slug },
      page_title: d.page_title,
      page_description: d.page_description,
      hero_badge: d.hero?.badge,
      hero_heading: d.hero?.heading,
      hero_subheading: d.hero?.subheading,
      hero_paragraphs: d.hero?.paragraphs || [],
      hero_cta_text: d.hero?.cta_text,
      hero_cta_href: d.hero?.cta_href,
      sections: (d.sections || []).map((s, i) => ({
        _type: 'section',
        _key: `section-${i}`,
        heading: s.heading || null,
        paragraphs: s.paragraphs || [],
        highlight: s.highlight || null,
        reversed: s.reversed || false,
      })),
    }
  }
})
await mutate(pageMutations)
console.log(`✅ ${pageFiles.length} Seiten importiert`)

// RETREATS
const retreatFiles = readdirSync(join(CONTENT_DIR, 'retreats')).filter(f => f.endsWith('.yaml'))
const retreatMutations = retreatFiles.map(file => {
  const slug = basename(file, '.yaml')
  const d = readYaml(join(CONTENT_DIR, 'retreats', file))
  return {
    createOrReplace: {
      _type: 'retreat',
      _id: `retreat-${slug}`,
      slug: { _type: 'slug', current: slug },
      page_title: d.page_title,
      page_description: d.page_description,
      hero_badge: d.hero?.location_badge || d.hero?.badge,
      hero_heading: d.hero?.heading,
      hero_subheading: d.hero?.subtitle || d.hero?.subheading,
      hero_dates: d.hero?.dates,
      hero_paragraphs: d.hero?.paragraphs || [],
      hero_cta_text: d.hero?.cta_text,
      hero_cta_href: d.hero?.cta_href,
      sections: (d.sections || []).map((s, i) => ({
        _type: 'section',
        _key: `section-${i}`,
        heading: s.heading || null,
        paragraphs: s.paragraphs || [],
        reversed: s.reversed || false,
      })),
      pricing_heading: d.pricing?.heading,
      pricing_cards: (d.pricing?.cards || []).map((c, i) => ({
        _type: 'card',
        _key: `card-${i}`,
        title: c.title,
        early_price: c.early_price,
        early_label: c.early_label,
        early_deadline: c.early_deadline,
        regular_price: c.regular_price,
        regular_label: c.regular_label,
      })),
    }
  }
})
await mutate(retreatMutations)
console.log(`✅ ${retreatFiles.length} Retreat-Seiten importiert`)

console.log('\n✓ Alle Daten importiert.')
