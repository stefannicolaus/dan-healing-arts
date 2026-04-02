import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Seiten',
  type: 'document',
  groups: [
    { name: 'hero', title: '🖼 Hero — Kopfbereich' },
    { name: 'content', title: '📝 Inhalt' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Seiten-Kennung',
      description: 'z.B. "about-dan", "sessions", "massage"',
      type: 'slug',
      options: { source: 'hero_heading' },
      validation: Rule => Rule.required(),
    }),
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
      title: 'Badge',
      description: 'Kleines Label über der Überschrift',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_heading',
      title: 'Hauptüberschrift (H1)',
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
      name: 'hero_image',
      title: 'Hero-Bild',
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
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_cta_href',
      title: 'Button-Link',
      type: 'string',
      group: 'hero',
    }),

    // ABSCHNITTE
    defineField({
      name: 'sections',
      title: 'Inhaltsabschnitte',
      description: 'Reihenfolge per Drag & Drop ändern',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'section',
          title: 'Abschnitt',
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Überschrift', type: 'string' }),
            defineField({ name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'paragraphs',
              title: 'Texte',
              type: 'array',
              of: [{ type: 'text', rows: 3 }],
            }),
            defineField({ name: 'highlight', title: 'Hervorgehobener Text', type: 'string' }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Abschnitt ohne Titel' }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero_heading',
      subtitle: 'slug.current',
      media: 'hero_image',
    },
    prepare({ title, subtitle, media }) {
      return { title: title || subtitle, subtitle, media }
    },
  },
})
