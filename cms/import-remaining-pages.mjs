const PROJECT_ID = 'ttf5z41g'
const DATASET = 'production'
const TOKEN = 'skzDoyxPWT2EvCOXYDoI0FJYASAbf3oKToGsTqzRUH0BobbQJGMMQf9L0IXAFs8dO0blxT2IcW6Kej3ZfHV8UtvzjseyZQIu1Vv0h4juXmDjAo4kBU8e7PaeyR9S0GH3O7e6UX1bVPPva7d49qODtmro8TRbbWXmkrB4jbeOd9UArPwxI8M3'
const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`

const res = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
  body: JSON.stringify({
    mutations: [
      // DATES page
      {
        createOrReplace: {
          _type: 'page',
          _id: 'page-dates',
          slug: { _type: 'slug', current: 'dates' },
          page_title: 'Upcoming Dates — Dan Healing Arts',
          page_description: 'All upcoming Level 1 and Level 2 bodywork trainings with Daniel Wendt.',
          hero_heading: 'Upcoming Trainings',
          hero_paragraphs: [
            'All open trainings for 2026 and 2027 — from weekend modules in Zürich to full immersive retreats in Portugal, Spain and México. Each training is a complete experience in itself; some are part of the two-level pathway.'
          ],
          sections: [],
        }
      },
      // CONTACT page
      {
        createOrReplace: {
          _type: 'page',
          _id: 'page-contact',
          slug: { _type: 'slug', current: 'contact' },
          page_title: 'Contact — Dan Healing Arts',
          page_description: 'Get in touch with Daniel Wendt — apply for a training, ask a question, or simply connect.',
          hero_heading: 'Get in Touch',
          hero_paragraphs: [
            "Whether you'd like to apply for a training, ask a question, or simply connect — I'd love to hear from you."
          ],
          hero_cta_text: 'danhealingarts@gmail.com',
          hero_cta_href: 'mailto:danhealingarts@gmail.com',
          sections: [
            {
              _type: 'section',
              _key: 'contact-info',
              heading: 'Direct Contact',
              paragraphs: [
                'Email: danhealingarts@gmail.com',
                'Instagram: @dan.healing.arts',
                'I typically respond within 1–2 business days. For urgent questions about an upcoming training, feel free to reach out directly on Instagram.',
              ],
            },
            {
              _type: 'section',
              _key: 'mailing-list',
              heading: 'Join the Mailing List for News',
              paragraphs: [
                'Stay updated on upcoming trainings, retreats, and events.',
              ],
            },
          ],
        }
      },
    ]
  }),
})
const data = await res.json()
if (!res.ok) throw new Error(JSON.stringify(data))
console.log('✅ dates + contact importiert')
console.log('ℹ️  zurich — identisch mit Startseite, kein eigenes Dokument nötig')
