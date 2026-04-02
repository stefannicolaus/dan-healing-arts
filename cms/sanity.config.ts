import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

const LIVE_URL = 'https://schweiz.danhealingarts.com'

// Welche URL gehört zu welchem Dokument?
function resolvePreviewUrl(doc: any): string | null {
  switch (doc._type) {
    case 'startseite':
      return LIVE_URL + '/'
    case 'retreat':
      return doc.slug?.current ? `${LIVE_URL}/${doc.slug.current}` : null
    case 'page': {
      const slug = doc.slug?.current
      if (!slug) return null
      // Englische Seite
      if (slug === 'en') return `${LIVE_URL}/en`
      return `${LIVE_URL}/${slug}`
    }
    case 'training':
      return LIVE_URL + '/dates'
    case 'testimonial':
      return LIVE_URL + '/'
    default:
      return null
  }
}

export default defineConfig({
  name: 'dan-healing-arts',
  title: 'Dan Healing Arts — Inhalte verwalten',
  projectId: 'ttf5z41g',
  dataset: 'production',
  plugins: [
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    productionUrl: async (prev, { document }) => {
      const url = resolvePreviewUrl(document)
      return url ?? prev
    },
  },
})
