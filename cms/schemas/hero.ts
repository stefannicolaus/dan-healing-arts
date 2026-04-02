import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Startseite — Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Hauptüberschrift',
      description: 'Die große Überschrift auf der Startseite',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Untertext',
      description: 'Kurzer Erklärungstext unter der Überschrift',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cta_text',
      title: 'Button-Text',
      description: 'z.B. "Jetzt bewerben"',
      type: 'string',
    }),
    defineField({
      name: 'cta_link',
      title: 'Button-Link',
      type: 'string',
    }),
    defineField({
      name: 'bild',
      title: 'Hintergrundbild',
      description: 'Das große Bild im Hero — Querformat, mindestens 1920×1080px',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'bild' },
  },
})
