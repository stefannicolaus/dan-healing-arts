import { defineCollection, z } from 'astro:content';

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    location: z.string(),
    quote: z.string(),
    photo: z.string().optional(),
  }),
});

const courses = defineCollection({
  type: 'data',
  schema: z.object({
    nr: z.string(),
    titel: z.string(),
    motto: z.string(),
    datum: z.string(),
    beschreibung: z.string(),
    schwerpunkte: z.array(z.string()),
    link: z.string().url(),
    bild: z.string(),
    bildAlt: z.string(),
    bildPos: z.string(),
    bildLinks: z.boolean(),
  }),
});

const hero = defineCollection({
  type: 'data',
  schema: z.object({
    headline: z.string(),
    subtext: z.string(),
    cta_text: z.string(),
    cta_link: z.string(),
    bild: z.string(),
    bildAlt: z.string(),
  }),
});

export const collections = { testimonials, courses, hero };
