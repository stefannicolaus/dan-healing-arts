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

export const collections = { testimonials };
