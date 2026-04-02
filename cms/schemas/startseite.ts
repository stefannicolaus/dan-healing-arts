import { defineType, defineField } from 'sanity'

export const startseite = defineType({
  name: 'startseite',
  title: 'Startseite',
  type: 'document',
  groups: [
    { name: 'hero', title: '1 · Hero' },
    { name: 'methode', title: '2 · Die Methode' },
    { name: 'parallax1', title: '3 · Parallax-Bild 1' },
    { name: 'entwickelst', title: '4 · Was du entwickelst' },
    { name: 'erfahrungsraum', title: '5 · Der Erfahrungsraum' },
    { name: 'ueber', title: '6 · Über Daniel' },
    { name: 'parallax2', title: '7 · Parallax-Bild 2' },
    { name: 'kontakt', title: '8 · Kontakt' },
  ],
  fields: [

    // ─── 1 · HERO ───────────────────────────────────────────────
    defineField({
      name: 'hero_headline',
      title: 'Hauptüberschrift',
      description: 'Die große Überschrift ganz oben auf der Seite',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hero_subtext',
      title: 'Untertext',
      description: 'Erklärungstext unter der Überschrift',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'hero_cta_text',
      title: 'Button-Text',
      description: 'z.B. "Kurse ansehen"',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'hero_bild',
      title: 'Hintergrundbild',
      description: 'Großes Bild im Hintergrund — Querformat, mindestens 1920×1080px',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // ─── 2 · METHODE ────────────────────────────────────────────
    defineField({
      name: 'methode_label',
      title: 'Label (klein über der Überschrift)',
      description: 'z.B. "Philosophie"',
      type: 'string',
      group: 'methode',
    }),
    defineField({
      name: 'methode_heading',
      title: 'Überschrift',
      type: 'string',
      group: 'methode',
    }),
    defineField({
      name: 'methode_paragraphs',
      title: 'Texte',
      description: 'Jeder Eintrag = ein Absatz',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'methode',
    }),
    defineField({
      name: 'methode_highlight',
      title: 'Hervorgehobener Satz',
      description: 'Wird fett/grün dargestellt',
      type: 'string',
      group: 'methode',
    }),

    // ─── 3 · PARALLAX 1 ─────────────────────────────────────────
    defineField({
      name: 'parallax_1',
      title: 'Parallax-Bild 1',
      description: 'Großes Bild zwischen den Sektionen — Querformat',
      type: 'image',
      options: { hotspot: true },
      group: 'parallax1',
    }),

    // ─── 4 · WAS DU ENTWICKELST ─────────────────────────────────
    defineField({
      name: 'entwickelst_label',
      title: 'Label',
      type: 'string',
      group: 'entwickelst',
    }),
    defineField({
      name: 'entwickelst_heading',
      title: 'Überschrift',
      type: 'string',
      group: 'entwickelst',
    }),
    defineField({
      name: 'entwickelst_bild',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      group: 'entwickelst',
    }),
    defineField({
      name: 'entwickelst_paragraphs',
      title: 'Texte',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'entwickelst',
    }),
    defineField({
      name: 'entwickelst_highlight',
      title: 'Hervorgehobener Satz',
      type: 'string',
      group: 'entwickelst',
    }),

    // ─── 5 · ERFAHRUNGSRAUM ─────────────────────────────────────
    defineField({
      name: 'erfahrungsraum_label',
      title: 'Label',
      type: 'string',
      group: 'erfahrungsraum',
    }),
    defineField({
      name: 'erfahrungsraum_heading',
      title: 'Überschrift',
      type: 'string',
      group: 'erfahrungsraum',
    }),
    defineField({
      name: 'erfahrungsraum_bild',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      group: 'erfahrungsraum',
    }),
    defineField({
      name: 'erfahrungsraum_paragraphs',
      title: 'Texte',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'erfahrungsraum',
    }),
    defineField({
      name: 'erfahrungsraum_highlight',
      title: 'Hervorgehobener Satz',
      type: 'string',
      group: 'erfahrungsraum',
    }),

    // ─── 6 · ÜBER DANIEL ────────────────────────────────────────
    defineField({
      name: 'ueber_heading',
      title: 'Überschrift',
      type: 'string',
      group: 'ueber',
    }),
    defineField({
      name: 'ueber_bild',
      title: 'Portrait-Foto',
      type: 'image',
      options: { hotspot: true },
      group: 'ueber',
    }),
    defineField({
      name: 'ueber_paragraphs',
      title: 'Bio-Texte',
      description: 'Jeder Eintrag = ein Absatz in der Biografie',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      group: 'ueber',
    }),
    defineField({
      name: 'ueber_stats',
      title: 'Statistiken (Zahlen)',
      description: 'Die 3 Kennzahlen unter der Biografie',
      type: 'array',
      group: 'ueber',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'zahl', title: 'Zahl', description: 'z.B. "22+"', type: 'string' }),
          defineField({ name: 'label', title: 'Beschriftung', description: 'z.B. "Ausbildungen"', type: 'string' }),
        ],
        preview: {
          select: { title: 'zahl', subtitle: 'label' },
        },
      }],
    }),

    // ─── 7 · PARALLAX 2 ─────────────────────────────────────────
    defineField({
      name: 'parallax_2',
      title: 'Parallax-Bild 2',
      description: 'Großes Bild vor dem Kontaktbereich — Querformat',
      type: 'image',
      options: { hotspot: true },
      group: 'parallax2',
    }),

    // ─── 8 · KONTAKT ────────────────────────────────────────────
    defineField({
      name: 'kontakt_heading',
      title: 'Überschrift',
      description: 'z.B. "Anmeldung & Kontakt"',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'kontakt_subtext',
      title: 'Untertext',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'kontakt_email',
      title: 'Kontakt-Email',
      type: 'string',
      group: 'kontakt',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Startseite' }),
  },
  __experimental_actions: ['update', 'publish'],
})
