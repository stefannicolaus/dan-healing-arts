import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'yaml'

const PROJECT_ID = 'ttf5z41g'
const DATASET = 'production'
const TOKEN = 'skzDoyxPWT2EvCOXYDoI0FJYASAbf3oKToGsTqzRUH0BobbQJGMMQf9L0IXAFs8dO0blxT2IcW6Kej3ZfHV8UtvzjseyZQIu1Vv0h4juXmDjAo4kBU8e7PaeyR9S0GH3O7e6UX1bVPPva7d49qODtmro8TRbbWXmkrB4jbeOd9UArPwxI8M3'
const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`
const C = '../src/content'

const y = (path) => parse(readFileSync(join(C, path), 'utf8'))

const hero = y('hero/zurich.yaml')
const methode = y('zurichSektionen/methode.yaml')
const entwickelst = y('zurichSektionen/entwickelst.yaml')
const erfahrungsraum = y('zurichSektionen/erfahrungsraum.yaml')
const ueber = y('zurichSektionen/ueber.yaml')

const res = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
  body: JSON.stringify({
    mutations: [{
      createOrReplace: {
        _type: 'startseite',
        _id: 'startseite-zurich',
        // Hero
        hero_headline: hero.headline,
        hero_subtext: hero.subtext,
        hero_cta_text: hero.cta_text,
        // Methode
        methode_label: methode.label,
        methode_heading: methode.heading,
        methode_paragraphs: methode.paragraphs,
        methode_highlight: methode.highlight,
        // Was du entwickelst
        entwickelst_label: entwickelst.label,
        entwickelst_heading: entwickelst.heading,
        entwickelst_paragraphs: entwickelst.paragraphs,
        entwickelst_highlight: entwickelst.highlight,
        // Erfahrungsraum
        erfahrungsraum_label: erfahrungsraum.label,
        erfahrungsraum_heading: erfahrungsraum.heading,
        erfahrungsraum_paragraphs: erfahrungsraum.paragraphs,
        erfahrungsraum_highlight: erfahrungsraum.highlight,
        // Über Daniel
        ueber_heading: ueber.heading,
        ueber_paragraphs: ueber.paragraphs,
        ueber_stats: (ueber.stats || []).map((s, i) => ({
          _type: 'object', _key: `stat-${i}`,
          zahl: s.zahl, label: s.label,
        })),
        // Kontakt
        kontakt_heading: 'Anmeldung & Kontakt',
        kontakt_subtext: 'Fragen oder direkte Buchungsanfrage — schreib einfach.',
        kontakt_email: 'danhealingarts@gmail.com',
      }
    }]
  }),
})
const data = await res.json()
if (!res.ok) throw new Error(JSON.stringify(data))
console.log('✅ Startseite importiert — alle 8 Sektionen')
