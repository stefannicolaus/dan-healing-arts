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

// Zürich Sub-Sektionen
const zurichSektionen = defineCollection({
  type: 'data',
  schema: z.object({
    label: z.string(),
    heading: z.string(),
    paragraphs: z.array(z.string()),
    highlight: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    stats: z.array(z.object({
      zahl: z.string(),
      label: z.string(),
    })).optional(),
  }),
});

// Einzelseiten (pages/)
const pages = defineCollection({
  type: 'data',
  schema: z.object({
    page_title: z.string(),
    page_description: z.string(),
    hero: z.object({
      badge: z.string().optional(),
      heading: z.string(),
      subheading: z.string().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      paragraphs: z.array(z.string()).optional(),
      cta_text: z.string().optional(),
      cta_href: z.string().optional(),
    }),
    sections: z.array(z.object({
      id: z.string(),
      heading: z.string().optional().nullable(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      reversed: z.boolean().optional(),
      paragraphs: z.array(z.string()),
      highlight: z.string().optional(),
      show_apply_button: z.boolean().optional(),
    })).optional(),
    stats: z.array(z.object({
      number: z.string(),
      label: z.string(),
    })).optional(),
    parallax_image: z.string().optional(),
    learn_topics: z.array(z.string()).optional(),
    body_regions: z.array(z.object({
      area: z.string(),
      theme: z.string(),
    })).optional(),
    elements: z.array(z.object({
      element: z.string(),
      emotion: z.string(),
    })).optional(),
  }),
});

// Pricing Card Schema
const pricingCard = z.object({
  title: z.string(),
  image: z.string(),
  early_price: z.number(),
  early_label: z.string(),
  early_deadline: z.string(),
  regular_price: z.number(),
  regular_label: z.string(),
  currency: z.string().default('€ '),
});

// Retreat-Seiten
const retreats = defineCollection({
  type: 'data',
  schema: z.object({
    page_title: z.string(),
    page_description: z.string(),
    og_image: z.string().optional(),
    hero: z.object({
      location_badge: z.string().optional(),
      badge: z.string().optional(),
      heading: z.string(),
      subheading: z.string().optional(),
      subtitle: z.string().optional(),
      level_text: z.string().optional(),
      level_href: z.string().optional(),
      dates: z.string().optional(),
      image: z.string(),
      imageAlt: z.string(),
      paragraphs: z.array(z.string()).optional(),
      cta_text: z.string().optional(),
      cta_href: z.string().optional(),
    }),
    video: z.object({
      youtube_id: z.string(),
      title: z.string(),
    }).optional(),
    sections: z.array(z.object({
      id: z.string(),
      heading: z.string().optional().nullable(),
      image: z.string(),
      imageAlt: z.string(),
      reversed: z.boolean().optional(),
      paragraphs: z.array(z.string()),
      show_apply_button: z.boolean().optional(),
    })).optional(),
    what_you_receive: z.object({
      heading: z.string(),
      image: z.string(),
      imageAlt: z.string(),
      items: z.array(z.string()),
    }).optional(),
    pricing: z.object({
      heading: z.string(),
      intro: z.array(z.string()),
      cards: z.array(pricingCard),
      closing: z.string().optional(),
    }).optional(),
    closing_quote: z.string().optional(),
    learn_topics: z.array(z.string()).optional(),
    body_regions: z.array(z.object({
      area: z.string(),
      theme: z.string(),
    })).optional(),
    elements: z.array(z.object({
      element: z.string(),
      emotion: z.string(),
    })).optional(),
  }),
});

// Trainings (replaces data/trainings.ts)
const trainings = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    level: z.string(),
    href: z.string(),
    image: z.string(),
    show_on_homepage: z.boolean().default(false),
  }),
});

export const collections = {
  testimonials,
  courses,
  hero,
  zurichSektionen,
  pages,
  retreats,
  trainings,
};
