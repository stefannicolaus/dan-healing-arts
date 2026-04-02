import { defineType, defineField } from 'sanity'

export const training = defineType({
  name: 'training',
  title: 'Kurstermine',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kursname',
      description: 'z.B. "Zürich Level 1a"',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      description: 'z.B. "18.–19. April 2026"',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ort',
      description: 'z.B. "Zürich, Jupiterhaus"',
      type: 'string',
    }),
    defineField({
      name: 'level',
      title: 'Level',
      description: 'z.B. "Level 1" oder "Level 2"',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'Link zur Kursseite',
      description: 'z.B. "/kurse/zuerich-l1a"',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ Aktiv — Anmeldung offen', value: 'aktiv' },
          { title: '🔴 Ausgebucht', value: 'ausgebucht' },
          { title: '❌ Abgesagt', value: 'abgesagt' },
        ],
        layout: 'radio',
      },
      initialValue: 'aktiv',
    }),
    defineField({
      name: 'spots_left',
      title: 'Freie Plätze',
      description: 'Leer lassen wenn keine Einschränkung',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Kursbild',
      description: 'Bild das auf der Kursübersicht angezeigt wird — einfach reinziehen oder klicken',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'show_on_homepage',
      title: 'Auf Startseite anzeigen?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const emoji = status === 'ausgebucht' ? '🔴 ' : status === 'abgesagt' ? '❌ ' : '✅ '
      return { title: emoji + title, subtitle }
    },
  },
})
