import { defineType, defineField } from 'sanity'

export const retreat = defineType({
  name: 'retreat',
  title: 'Retreat-Seiten',
  type: 'document',
  groups: [
    { name: 'hero', title: '🖼 Hero — Kopfbereich' },
    { name: 'sections', title: '📝 Abschnitte' },
    { name: 'pricing', title: '💰 Preise' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // Interner Name
    defineField({
      name: 'slug',
      title: 'Interne Kennung',
      description: 'z.B. "portugal", "mazunte" — wird für die URL verwendet',
      type: 'slug',
      options: { source: 'hero_heading' },
      validation: Rule => Rule.required(),
    }),

    // SEO
    defineField({
      name: 'page_title',
      title: 'Seiten-Titel (Browser-Tab)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'page_description',
      title: 'Meta-Beschreibung (Google-Vorschau)',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),

    // HERO
    defineField({
      name: 'hero_badge',
      title: 'Badge / Ort',
      description: 'z.B. "Portugal", "Mazunte, Mexico"',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_heading',
      title: 'Hauptüberschrift (H1)',
      description: 'Die große Überschrift im Hero-Bereich',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'hero_subheading',
      title: 'Unterüberschrift',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_dates',
      title: 'Datum',
      description: 'z.B. "12.–17. Oktober 2026"',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_image',
      title: 'Hero-Bild',
      description: 'Großes Bild im Kopfbereich — am besten Querformat, mindestens 1920×1080px',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'hero_paragraphs',
      title: 'Einleitungstexte',
      description: 'Texte unter der Überschrift — jeder Eintrag ist ein eigener Absatz',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'hero',
    }),
    defineField({
      name: 'hero_cta_text',
      title: 'Button-Text',
      description: 'z.B. "Jetzt bewerben"',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_cta_href',
      title: 'Button-Link',
      description: 'z.B. "mailto:danhealingarts@gmail.com"',
      type: 'string',
      group: 'hero',
    }),

    // ABSCHNITTE
    defineField({
      name: 'sections',
      title: 'Inhaltsabschnitte',
      description: 'Jeder Abschnitt hat ein Bild + Text. Reihenfolge per Drag & Drop ändern.',
      type: 'array',
      group: 'sections',
      of: [
        defineField({
          name: 'section',
          title: 'Abschnitt',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Überschrift',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Bild',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'paragraphs',
              title: 'Texte',
              description: 'Jeder Eintrag = ein Absatz',
              type: 'array',
              of: [{ type: 'text', rows: 3 }],
            }),
            defineField({
              name: 'reversed',
              title: 'Bild rechts (statt links)?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Abschnitt ohne Titel' }),
          },
        }),
      ],
    }),

    // PREISE
    defineField({
      name: 'pricing_heading',
      title: 'Preisbereich — Überschrift',
      type: 'string',
      group: 'pricing',
    }),
    defineField({
      name: 'pricing_cards',
      title: 'Preiskarten',
      description: 'Early Bird + Regular Preis — je eine Karte',
      type: 'array',
      group: 'pricing',
      of: [
        defineField({
          name: 'card',
          title: 'Preiskarte',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Name', type: 'string' }),
            defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'early_price', title: 'Early Bird Preis (€)', type: 'number' }),
            defineField({ name: 'early_label', title: 'Early Bird Label', type: 'string' }),
            defineField({ name: 'early_deadline', title: 'Early Bird Deadline', type: 'string' }),
            defineField({ name: 'regular_price', title: 'Regulärer Preis (€)', type: 'number' }),
            defineField({ name: 'regular_label', title: 'Reguläres Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', price: 'regular_price' },
            prepare: ({ title, price }) => ({ title: title || 'Preiskarte', subtitle: price ? `€${price}` : '' }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero_heading',
      subtitle: 'hero_badge',
      media: 'hero_image',
    },
  },
})
