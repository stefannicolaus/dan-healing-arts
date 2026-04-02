import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Erfahrungsberichte',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Vorname oder vollständiger Name der Person',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Herkunft',
      description: 'z.B. "USA", "Deutschland", "Finnland"',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Zitat',
      description: 'Der Erfahrungsbericht — so wie es die Person geschrieben hat',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      description: 'Optional — Profilbild der Person',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
    },
  },
})
