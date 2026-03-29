# Dan Healing Arts — Full Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate danhealingarts.com from Wix to Astro on Hetzner, using the existing Schweiz landing page design as basis.

**Architecture:** Astro static site with Content Collections for testimonials, dates, and locations. Two page templates: Modular (Zürich weekends) and Retreat (week-long immersions). Existing Schweiz one-pager becomes the `/zurich` route. New English homepage + all sub-pages built on the same Tailwind design system.

**Tech Stack:** Astro 4, Tailwind CSS 3, Content Collections (YAML/Markdown), Hetzner/Coolify

**Spec:** `docs/superpowers/specs/2026-03-29-full-site-rebuild-design.md`

---

## File Structure

```
src/
  layouts/
    Layout.astro              — MODIFY: make lang configurable (en/de), update meta
    BaseHead.astro            — CREATE: shared <head> with fonts, favicon, OG
  components/
    Nav.astro                 — MODIFY: multi-page nav with dates dropdown
    Footer.astro              — MODIFY: English, global links
    TestimonialDivider.astro  — CREATE: quote + optional photo, used between sections
    PricingCard.astro         — CREATE: room card with photo, prices, apply button
    PhotoGallery.astro        — CREATE: 4-photo grid, responsive 2x2 on mobile
    TextImageSection.astro    — CREATE: reusable text-left/image-right (or reversed)
    YouTubeEmbed.astro        — CREATE: responsive YouTube embed
    TrainingCard.astro        — CREATE: upcoming training card (date, location, link)
    ApplyButton.astro         — CREATE: consistent CTA button → /contact
    # Existing Zürich components stay as-is, renamed with Zurich prefix
    ZurichHero.astro          — RENAME from Hero.astro
    ZurichMethode.astro       — RENAME from Methode.astro
    ZurichFuerWen.astro       — RENAME from FuerWen.astro
    ZurichModule.astro        — RENAME from Module.astro
    ZurichTestimonials.astro  — RENAME from Testimonials.astro
    ZurichUeberDaniel.astro   — RENAME from UeberDaniel.astro
    ZurichKontakt.astro       — RENAME from Kontakt.astro
    Parallax.astro            — KEEP as-is
    StatsDivider.astro        — KEEP as-is
    MarqueeDivider.astro      — KEEP as-is
  pages/
    index.astro               — MODIFY: English homepage (replaces Zürich content)
    zurich.astro              — CREATE: Zürich page (moves old index content here)
    portugal.astro            — CREATE: Retreat template, Portugal content
    mazunte.astro             — CREATE: Retreat template, Mazunte content
    spain.astro               — CREATE: Preview page
    tulum.astro               — CREATE: Preview page
    level-1.astro             — CREATE: Training detail page
    level-2.astro             — CREATE: Training detail page
    about-the-work.astro      — CREATE: Method/philosophy page
    about-dan.astro           — CREATE: Biography page
    dates.astro               — CREATE: All dates overview
    contact.astro             — CREATE: Contact form
content/
  testimonials/               — CREATE: individual .yaml files per testimonial
  config.ts                   — CREATE: Content Collection schemas
public/
  images/
    portugal/                 — CREATE: downloaded from Wix
    mazunte/                  — CREATE: downloaded from Wix
    spain/                    — CREATE: downloaded from Wix
    tulum/                    — CREATE: downloaded from Wix
    general/                  — CREATE: homepage/shared images from Wix
```

---

## Task 1: Download All Wix Images

**Files:**
- Create: `public/images/portugal/*.jpg`
- Create: `public/images/mazunte/*.jpg`
- Create: `public/images/spain/*.jpg`
- Create: `public/images/tulum/*.jpg`
- Create: `public/images/general/*.jpg`
- Create: `scripts/download-images.sh`

- [ ] **Step 1: Create download script**

```bash
#!/bin/bash
# scripts/download-images.sh — Download all images from Wix

cd "$(dirname "$0")/.."

# Portugal images
mkdir -p public/images/portugal
curl -sL "https://static.wixstatic.com/media/6194ac_1f6bc65e94b74dfc8077490e8dde97d7~mv2.jpg" -o public/images/portugal/hero.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_38ac4d54331d4848ab2f1691e270373c~mv2.jpg" -o public/images/portugal/gallery-1.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_bdd84b27980f4d06868aa7281d570a53~mv2.jpg" -o public/images/portugal/gallery-2.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_d90534f04ba44450a422e1dcb56317a3~mv2.jpg" -o public/images/portugal/gallery-3.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_be7e65eca6cf4dfb85c31050f63b8731~mv2.jpg" -o public/images/portugal/gallery-4.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_3f9eb5970ba34ac9b0422a2e2d5aba2e~mv2.jpg" -o public/images/portugal/learning-art.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_2c9b50810d6045ffbf594d813b28350f~mv2.jpg" -o public/images/portugal/training-experience.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_211fb21678bc409e847bbd65cf6602d0~mv2.jpg" -o public/images/portugal/experiential.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_a6ca74565443407aa9eaaa7669e588d1~mv2.jpg" -o public/images/portugal/venue-1.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_bd10fee85c02406a9c907abb8e7f965f~mv2.jpg" -o public/images/portugal/venue-2.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_c477069954bb47269b64f921192754f0~mv2.png" -o public/images/portugal/venue-3.png
curl -sL "https://static.wixstatic.com/media/6194ac_8a0de1b62a6d431fae1cd32fe257d69c~mv2.jpg" -o public/images/portugal/food.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_195731b3c9884c2094088bf74d775f41~mv2.png" -o public/images/portugal/room-dorm.png
curl -sL "https://static.wixstatic.com/media/6194ac_d766eface81b4cce8c447dfea109368e~mv2.jpg" -o public/images/portugal/room-twin-shared.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_86d359daf7634874a4e6a2999093cab7~mv2.jpg" -o public/images/portugal/room-twin-private.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_bca45fbb3f384a439b66b8747bb60a4f~mv2.jpeg" -o public/images/portugal/room-glamping.jpeg

# Mazunte images
mkdir -p public/images/mazunte
curl -sL "https://static.wixstatic.com/media/6f41eb_1cd7c638325a44afb82c6c77d5d2180d~mv2.jpg" -o public/images/mazunte/hero.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_d5083b968f924ba9bd3a51770bcd26ea~mv2.jpg" -o public/images/mazunte/gallery-1.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_455eb75bbe58403a960b0346c1a7d300~mv2.jpg" -o public/images/mazunte/gallery-2.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_bc46fb97aae04061b7408be8bc8d366a~mv2.jpg" -o public/images/mazunte/gallery-3.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_ffcc22ae153349c08d811b22a49c0344~mv2.jpg" -o public/images/mazunte/gallery-4.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_bdeb3b9efd294cdaa1bb376fe35ca87a~mv2.jpg" -o public/images/mazunte/learning-art.jpg
curl -sL "https://static.wixstatic.com/media/6194ac_46b4640dff7a46069d28858cb1887490~mv2.jpg" -o public/images/mazunte/training-experience.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_5c81aaa8a7084ad2b9bee98d2e026cae~mv2.jpg" -o public/images/mazunte/venue-garden.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_19f7ee7f273245be8ad6f434dee11b83~mv2.jpg" -o public/images/mazunte/sunset.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_13bf3ea5da4443e4a83d6acbeb7aa164~mv2.jpg" -o public/images/mazunte/food-1.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_4921804ba9f2492688cb4eae28f8b688~mv2.jpg" -o public/images/mazunte/food-2.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_3134267ebdd04b0ba56513db3873ba00~mv2.jpeg" -o public/images/mazunte/food-3.jpeg
curl -sL "https://static.wixstatic.com/media/6f41eb_6db1df7bad944518a9accd1954e2c530~mv2.jpg" -o public/images/mazunte/food-4.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_ce4172df5ad140b88a7e7d1d615c4e99~mv2.jpg" -o public/images/mazunte/group-photo.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_33ae50b38b954d71a79edfc72bf2a369~mv2.jpg" -o public/images/mazunte/room-triple.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_7d1ee971abec4cd6ba9a3cdc790a887f~mv2.jpg" -o public/images/mazunte/room-twin.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_aa238310bdc44d93a2ffec889994ecad~mv2.jpg" -o public/images/mazunte/room-single.jpg
curl -sL "https://static.wixstatic.com/media/6f41eb_176adeeaaca24bab80ebbdc2c795e67f~mv2.jpg" -o public/images/mazunte/no-lodging.jpg

# General / Logo
mkdir -p public/images/general
curl -sL "https://static.wixstatic.com/media/6f41eb_835d2d5f0042489095ed1f668b290562~mv2.jpg" -o public/images/general/logo-mandala.jpg

echo "Done — $(find public/images -type f | wc -l) images downloaded"
```

- [ ] **Step 2: Run download script**

Run: `cd ~/code/DanHealingArts && bash scripts/download-images.sh`
Expected: All images downloaded, ~35 files across 4 directories.

- [ ] **Step 3: Verify images exist**

Run: `find public/images -type f | wc -l && du -sh public/images`
Expected: ~35+ files, images directory has content.

- [ ] **Step 4: Commit**

```bash
git add scripts/download-images.sh public/images/
git commit -m "feat: download all Wix images for Portugal, Mazunte, and general"
```

---

## Task 2: Content Collections Setup

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/testimonials/*.yaml` (one per testimonial)

- [ ] **Step 1: Create content collection config**

```typescript
// src/content/config.ts
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
```

- [ ] **Step 2: Create all testimonial files**

Create these files in `src/content/testimonials/`:

`rebecca-canada.yaml`:
```yaml
name: "Rebecca"
location: "Canada"
quote: "I came into this course knowing basically nothing about massage and left feeling entirely confident. Within a few days of completing it I was taking appointments and receiving exceptional reviews. Daniel takes you through this experience at a great pace, meets you wherever you are, giving more attention if required. I left with a new understanding for the importance of slowing down, in all ways of life."
```

`lasse-finland.yaml`:
```yaml
name: "Lasse"
location: "Finland"
quote: "I was blown away by the deeper inner effects that this training immersion gave me. The techniques and style we learned were exactly what I was always looking for but never had found a practitioner who could teach and work in this profound and connected way. Dan's energy and style of teaching are both so comfortably connectable. He's approachable as an equal friend and also holds the authority of the most skilful maestro of his art."
```

`laura-uk.yaml`:
```yaml
name: "Laura"
location: "UK"
quote: "I arrived simply to learn how to give a somatic massage, but I left with so much more. The training opened a deep inner process and reconnected me with something timeless within myself. I cannot recommend this course highly enough. I've already signed up for Level 2, knowing this is not just a training — it's a path I want to continue walking."
```

`nico-usa.yaml`:
```yaml
name: "Nico Akiba"
location: "USA"
quote: "Far more than a run-through of techniques, this course provided us true felt experiences of giving and receiving deep releases every day. It left me not only confident but also excited to offer bodywork in a way that feels good for both giver and receiver, inspired by Dan's signature blend of connection, simplicity, intuition, joy, resonance and grounding."
```

`erika-lithuania.yaml`:
```yaml
name: "Erika"
location: "Lithuania"
quote: "This retreat, set in lush nature, became a haven for learning and growth. I delved into the wisdom of somatic bodywork and massage, embracing the simplicity that guided me toward profound discoveries. It exceeded my expectations, allowing me to create deep connections, feel the energy flow and uncover answers that had long eluded me."
```

`paige-usa.yaml`:
```yaml
name: "Paige"
location: "USA"
quote: "What inspired me most was the intimacy and direct approach to learn to touch and give massage. We learned about the complex fascia system and muscular anatomy through practicing in presence, spending the majority of the course actually hands on! I discovered so much, far beyond my initial expectations and am very grateful that the learning took place in a safe, sacred and joyful space."
```

`jili-usa.yaml`:
```yaml
name: "Jili"
location: "USA"
quote: "This training was a true blessing and treat. I am blown away by my experience. Dan combined his abundant wisdom with the perfect amount of flow, playfulness and structure to create a truly special experience. The techniques and lessons learned in the training go deeper and beyond just a massage training. They help you create a better connection to yourself, others and the world around you."
```

`ely-uk.yaml`:
```yaml
name: "Ely"
location: "UK"
quote: "The training was one of the most profound experiences of my life. Daniel creates a space of such depth, safety and authenticity that transformation happens naturally."
```

`jane-usa.yaml`:
```yaml
name: "Jane"
location: "USA"
quote: "Daniel's teaching style is unlike anything I've experienced. The way he weaves together anatomy, energy work, and emotional awareness creates a truly holistic understanding of the body."
```

Note: Ely and Jane quotes are from the homepage — scrape verbatim text during implementation if these placeholders differ from the original.

- [ ] **Step 3: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds with no errors about content collections.

- [ ] **Step 4: Commit**

```bash
git add src/content/
git commit -m "feat: add content collections with testimonial data"
```

---

## Task 3: Shared Components

**Files:**
- Create: `src/components/TestimonialDivider.astro`
- Create: `src/components/PricingCard.astro`
- Create: `src/components/PhotoGallery.astro`
- Create: `src/components/TextImageSection.astro`
- Create: `src/components/YouTubeEmbed.astro`
- Create: `src/components/TrainingCard.astro`
- Create: `src/components/ApplyButton.astro`

- [ ] **Step 1: Create TestimonialDivider component**

```astro
---
// src/components/TestimonialDivider.astro
interface Props {
  quote: string;
  name: string;
  location: string;
  photo?: string;
}

const { quote, name, location, photo } = Astro.props;
---

<section class="py-16 md:py-24 bg-surface-lo">
  <div class="max-w-page mx-auto px-6 md:px-12">
    {photo ? (
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <img
          src={photo}
          alt={`${name}, ${location}`}
          class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shrink-0"
        />
        <div>
          <div class="text-forest text-5xl font-serif leading-none mb-4">&ldquo;</div>
          <blockquote class="text-lg md:text-xl text-text-main/80 italic leading-relaxed font-serif">
            {quote}
          </blockquote>
          <p class="mt-6 text-stone font-medium">— {name}, {location}</p>
        </div>
      </div>
    ) : (
      <div class="max-w-3xl mx-auto text-center">
        <div class="text-forest text-5xl font-serif leading-none mb-4">&ldquo;</div>
        <blockquote class="text-lg md:text-xl text-text-main/80 italic leading-relaxed font-serif">
          {quote}
        </blockquote>
        <p class="mt-6 text-stone font-medium">— {name}, {location}</p>
      </div>
    )}
  </div>
</section>
```

- [ ] **Step 2: Create PricingCard component**

```astro
---
// src/components/PricingCard.astro
interface Props {
  title: string;
  image: string;
  earlyPrice: number;
  earlyLabel: string;
  earlyDeadline: string;
  regularPrice: number;
  regularLabel: string;
  currency: string;
  applyLink?: string;
}

const {
  title,
  image,
  earlyPrice,
  earlyLabel,
  earlyDeadline,
  regularPrice,
  regularLabel,
  currency,
  applyLink = '/contact',
} = Astro.props;
---

<div class="bg-white rounded-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
  <img src={image} alt={title} class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="font-serif text-lg text-text-main mb-4">{title}</h3>
    <div class="space-y-3 mb-6">
      <div>
        <p class="text-2xl font-serif text-forest">{earlyPrice} {currency}</p>
        <p class="text-sm text-stone">{earlyLabel} {earlyDeadline}</p>
      </div>
      <div class="border-t border-stone/20 pt-3">
        <p class="text-xl font-serif text-text-main/70">{regularPrice} {currency}</p>
        <p class="text-sm text-stone">{regularLabel}</p>
      </div>
    </div>
    <a
      href={applyLink}
      class="block text-center px-6 py-3 bg-forest text-white rounded-btn font-medium hover:bg-sage transition-colors"
    >
      Apply for this Room
    </a>
  </div>
</div>
```

- [ ] **Step 3: Create PhotoGallery component**

```astro
---
// src/components/PhotoGallery.astro
interface Props {
  images: { src: string; alt: string }[];
  caption?: string;
}

const { images, caption } = Astro.props;
---

<section class="py-12 md:py-16">
  <div class="max-w-page mx-auto px-6 md:px-12">
    {caption && (
      <p class="text-center text-stone text-sm mb-6">{caption}</p>
    )}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {images.map((img) => (
        <img
          src={img.src}
          alt={img.alt}
          class="w-full aspect-[4/3] object-cover rounded-lg"
        />
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create TextImageSection component**

```astro
---
// src/components/TextImageSection.astro
interface Props {
  image: string;
  imageAlt: string;
  reversed?: boolean;
}

const { image, imageAlt, reversed = false } = Astro.props;
---

<section class="py-16 md:py-24">
  <div class={`max-w-page mx-auto px-6 md:px-12 flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}>
    <div class="w-full md:w-1/2">
      <img src={image} alt={imageAlt} class="w-full rounded-lg object-cover" />
    </div>
    <div class="w-full md:w-1/2">
      <slot />
    </div>
  </div>
</section>
```

- [ ] **Step 5: Create YouTubeEmbed component**

```astro
---
// src/components/YouTubeEmbed.astro
interface Props {
  videoId: string;
  title?: string;
}

const { videoId, title = 'Video' } = Astro.props;
---

<div class="relative w-full aspect-video rounded-lg overflow-hidden">
  <iframe
    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="absolute inset-0 w-full h-full"
    loading="lazy"
  ></iframe>
</div>
```

- [ ] **Step 6: Create TrainingCard component**

```astro
---
// src/components/TrainingCard.astro
interface Props {
  title: string;
  date: string;
  location: string;
  level: string;
  href: string;
}

const { title, date, location, level, href } = Astro.props;
---

<a href={href} class="block bg-white rounded-card p-6 shadow-sm hover:shadow-md transition-shadow group">
  <p class="text-sm text-stone font-medium uppercase tracking-wider mb-2">{level}</p>
  <h3 class="font-serif text-xl text-text-main group-hover:text-forest transition-colors mb-3">{title}</h3>
  <div class="flex items-center gap-4 text-sm text-stone">
    <span>{date}</span>
    <span class="w-1 h-1 bg-stone/50 rounded-full"></span>
    <span>{location}</span>
  </div>
</a>
```

- [ ] **Step 7: Create ApplyButton component**

```astro
---
// src/components/ApplyButton.astro
interface Props {
  text?: string;
  href?: string;
}

const { text = 'Apply for the Training', href = '/contact' } = Astro.props;
---

<a
  href={href}
  class="inline-flex items-center px-8 py-3 bg-forest text-white rounded-btn font-medium hover:bg-sage transition-colors"
>
  {text}
</a>
```

- [ ] **Step 8: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds (components aren't used yet, but no syntax errors).

- [ ] **Step 9: Commit**

```bash
git add src/components/TestimonialDivider.astro src/components/PricingCard.astro src/components/PhotoGallery.astro src/components/TextImageSection.astro src/components/YouTubeEmbed.astro src/components/TrainingCard.astro src/components/ApplyButton.astro
git commit -m "feat: add shared components for multi-page site"
```

---

## Task 4: Layout + Navigation Refactor

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/components/Nav.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Update Layout.astro for multi-language support**

Replace `src/layouts/Layout.astro` with:

```astro
---
interface Props {
  title?: string;
  description?: string;
  lang?: string;
  canonicalPath?: string;
  ogImage?: string;
}

const {
  title = 'Dan Healing Arts — Learn to Listen with Your Hands',
  description = 'Immersive trainings in fascia-based somatic bodywork with Daniel Wendt. Deep touch, presence, and embodied learning.',
  lang = 'en',
  canonicalPath = '/',
  ogImage = '/images/daniel-bodywork.jpg',
} = Astro.props;

const baseUrl = 'https://schweiz.danhealingarts.com';
const canonicalURL = `${baseUrl}${canonicalPath}`;
const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>

    <link rel="canonical" href={canonicalURL} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={fullOgImage} />
    <meta property="og:site_name" content="Dan Healing Arts" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={fullOgImage} />

    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Outfit:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />

    <style>
      html { scroll-behavior: smooth; }
      body {
        background-color: #F8F5F0;
        color: #2C1F14;
        -webkit-font-smoothing: antialiased;
      }
    </style>
  </head>
  <body class="font-sans">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Rewrite Nav.astro for multi-page navigation**

Replace `src/components/Nav.astro` with:

```astro
---
interface Props {
  lang?: string;
}

const { lang = 'en' } = Astro.props;

const navItems = lang === 'de'
  ? [
      { label: 'Die Methode', href: '/zurich#methode' },
      { label: 'Module', href: '/zurich#module' },
      { label: 'Über Daniel', href: '/about-dan' },
      { label: 'Anmelden', href: '/zurich#kontakt', isButton: true },
    ]
  : [
      { label: 'About this work', href: '/about-the-work' },
      { label: 'Level 1', href: '/level-1' },
      { label: 'Level 2', href: '/level-2' },
      {
        label: 'Dates',
        href: '/dates',
        children: [
          { label: 'Zürich', href: '/zurich' },
          { label: 'Portugal', href: '/portugal' },
          { label: 'Mazunte', href: '/mazunte' },
          { label: 'Spain', href: '/spain' },
          { label: 'Tulum', href: '/tulum' },
        ],
      },
      { label: 'About Dan', href: '/about-dan' },
      { label: 'Contact', href: '/contact', isButton: true },
    ];
---

<nav
  id="main-nav"
  class="fixed top-0 w-full z-50 transition-all duration-300 py-3 px-6 md:px-12"
>
  <div class="max-w-page mx-auto flex justify-between items-center">
    <a href="/" class="flex items-center">
      <img
        src="/images/dan-logo-v2.png"
        alt="Dan Healing Arts"
        class="h-20 w-auto object-contain"
      />
    </a>

    <!-- Desktop nav -->
    <div class="hidden lg:flex items-center gap-8">
      {navItems.map((item) =>
        item.isButton ? (
          <a
            href={item.href}
            class="inline-flex items-center px-6 py-2.5 bg-forest text-white rounded-btn font-medium hover:bg-sage transition-colors"
          >
            {item.label}
          </a>
        ) : item.children ? (
          <div class="relative group">
            <a href={item.href} class="text-forest font-medium hover:text-sage transition-colors flex items-center gap-1">
              {item.label}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <div class="absolute top-full left-0 mt-2 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
              {item.children.map((child) => (
                <a href={child.href} class="block px-4 py-2 text-forest hover:bg-surface-lo transition-colors">
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <a href={item.href} class="text-forest font-medium hover:text-sage transition-colors">
            {item.label}
          </a>
        )
      )}
      <a href="https://www.instagram.com/dan.healing.arts" target="_blank" rel="noopener" class="text-forest hover:text-sage transition-colors" aria-label="Instagram">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
    </div>

    <!-- Mobile menu button -->
    <button id="menu-btn" class="lg:hidden text-forest p-2" aria-label="Menu">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>

  <!-- Mobile dropdown -->
  <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full bg-canvas border-t border-stone/20 px-6 py-6 flex-col gap-4">
    {navItems.map((item) =>
      item.children ? (
        <>
          <a href={item.href} class="text-forest font-medium">{item.label}</a>
          <div class="pl-4 flex flex-col gap-3">
            {item.children.map((child) => (
              <a href={child.href} class="text-stone hover:text-forest transition-colors">{child.label}</a>
            ))}
          </div>
        </>
      ) : item.isButton ? (
        <a href={item.href} class="inline-flex justify-center px-6 py-3 bg-forest text-white rounded-btn font-medium">
          {item.label}
        </a>
      ) : (
        <a href={item.href} class="text-forest font-medium">{item.label}</a>
      )
    )}
  </div>
</nav>

<script>
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav?.classList.add('bg-canvas/95', 'backdrop-blur-md', 'border-b', 'border-stone/20', 'shadow-sm');
    } else {
      nav?.classList.remove('bg-canvas/95', 'backdrop-blur-md', 'border-b', 'border-stone/20', 'shadow-sm');
    }
  });

  document.getElementById('menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
    document.getElementById('mobile-menu')?.classList.toggle('flex');
  });

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobile-menu')?.classList.add('hidden');
      document.getElementById('mobile-menu')?.classList.remove('flex');
    });
  });
</script>
```

- [ ] **Step 3: Update Footer.astro for English multi-page**

Replace `src/components/Footer.astro` with:

```astro
---
interface Props {
  lang?: string;
}

const { lang = 'en' } = Astro.props;
const year = new Date().getFullYear();
---

<footer class="bg-umber text-white/80 py-16 px-6 md:px-12">
  <div class="max-w-page mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
    <div>
      <img src="/images/dan-logo-v2.png" alt="Dan Healing Arts" class="h-16 w-auto mb-4 brightness-0 invert opacity-80" />
      <p class="text-sm leading-relaxed">
        {lang === 'de'
          ? 'Somatische Tiefenmassage & Faszien Release Ausbildung mit Daniel Wendt.'
          : 'Deep somatic bodywork trainings and retreats with Daniel Wendt.'}
      </p>
      <a href="mailto:danhealingarts@gmail.com" class="text-sm text-white/60 hover:text-white transition-colors mt-3 block">
        danhealingarts@gmail.com
      </a>
    </div>
    <div>
      <h3 class="font-serif text-white text-lg mb-4">{lang === 'de' ? 'Navigation' : 'Explore'}</h3>
      <div class="flex flex-col gap-2">
        {lang === 'de' ? (
          <>
            <a href="/zurich#methode" class="text-sm hover:text-white transition-colors">Die Methode</a>
            <a href="/zurich#module" class="text-sm hover:text-white transition-colors">Module</a>
            <a href="/about-dan" class="text-sm hover:text-white transition-colors">Über Daniel</a>
            <a href="/zurich#kontakt" class="text-sm hover:text-white transition-colors">Anmeldung</a>
          </>
        ) : (
          <>
            <a href="/about-the-work" class="text-sm hover:text-white transition-colors">About the Work</a>
            <a href="/level-1" class="text-sm hover:text-white transition-colors">Level 1</a>
            <a href="/level-2" class="text-sm hover:text-white transition-colors">Level 2</a>
            <a href="/dates" class="text-sm hover:text-white transition-colors">Dates</a>
            <a href="/about-dan" class="text-sm hover:text-white transition-colors">About Dan</a>
            <a href="/contact" class="text-sm hover:text-white transition-colors">Contact</a>
          </>
        )}
      </div>
    </div>
    <div>
      <h3 class="font-serif text-white text-lg mb-4">{lang === 'de' ? 'Verbindungen' : 'Connect'}</h3>
      <div class="flex flex-col gap-2">
        <a href="https://www.instagram.com/dan.healing.arts" target="_blank" rel="noopener" class="text-sm hover:text-white transition-colors">
          Instagram @dan.healing.arts
        </a>
        {lang === 'de' && (
          <a href="/" class="text-sm hover:text-white transition-colors">danhealingarts.com (English)</a>
        )}
        {lang === 'en' && (
          <a href="/zurich" class="text-sm hover:text-white transition-colors">Zürich — Deutsche Seite</a>
        )}
      </div>
    </div>
  </div>
  <div class="max-w-page mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40">
    &copy; {year} Dan Healing Arts
  </div>
</footer>
```

- [ ] **Step 4: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro src/components/Nav.astro src/components/Footer.astro
git commit -m "feat: refactor layout and nav for multi-page English site"
```

---

## Task 5: Move Zürich Page

**Files:**
- Rename: `src/components/Hero.astro` → `src/components/ZurichHero.astro` (etc. for all Zürich components)
- Create: `src/pages/zurich.astro`
- Modify: `src/pages/index.astro` (will be replaced in Task 6)

- [ ] **Step 1: Rename all Zürich-specific components**

```bash
cd ~/code/DanHealingArts/src/components
mv Hero.astro ZurichHero.astro
mv Methode.astro ZurichMethode.astro
mv FuerWen.astro ZurichFuerWen.astro
mv Module.astro ZurichModule.astro
mv Testimonials.astro ZurichTestimonials.astro
mv UeberDaniel.astro ZurichUeberDaniel.astro
mv Kontakt.astro ZurichKontakt.astro
```

- [ ] **Step 2: Create zurich.astro page**

```astro
---
// src/pages/zurich.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import ZurichHero from '../components/ZurichHero.astro';
import ZurichMethode from '../components/ZurichMethode.astro';
import Parallax from '../components/Parallax.astro';
import StatsDivider from '../components/StatsDivider.astro';
import ZurichFuerWen from '../components/ZurichFuerWen.astro';
import ZurichModule from '../components/ZurichModule.astro';
import ZurichTestimonials from '../components/ZurichTestimonials.astro';
import ZurichUeberDaniel from '../components/ZurichUeberDaniel.astro';
import ZurichKontakt from '../components/ZurichKontakt.astro';
import Footer from '../components/Footer.astro';
---

<Layout
  lang="de"
  title="Somatische Tiefenmassage & Faszien Release — Wochenendkurse Zürich | Dan Healing Arts"
  description="Lerne präzise Faszienarbeit mit somatischer Präsenz. 4 Wochenendkurse in Zürich mit Daniel Wendt. Einzeln buchbar, je 420 CHF."
  canonicalPath="/zurich"
>
  <Nav lang="de" />
  <main>
    <ZurichHero />
    <StatsDivider />
    <ZurichMethode />
    <Parallax src="/images/parallax-1.jpg" height="50vh" />
    <ZurichFuerWen />
    <ZurichModule />
    <ZurichTestimonials />
    <StatsDivider />
    <ZurichUeberDaniel />
    <Parallax src="/images/parallax-2.jpg" height="50vh" />
    <ZurichKontakt />
  </main>
  <Footer lang="de" />
</Layout>
```

- [ ] **Step 3: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds, `/zurich` route works.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: move Zürich content to /zurich route, rename components"
```

---

## Task 6: English Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Build the English homepage**

Replace `src/pages/index.astro` with:

```astro
---
// src/pages/index.astro — English Homepage
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import TestimonialDivider from '../components/TestimonialDivider.astro';
import TrainingCard from '../components/TrainingCard.astro';
import ApplyButton from '../components/ApplyButton.astro';
import Footer from '../components/Footer.astro';
import { getCollection } from 'astro:content';

const testimonials = await getCollection('testimonials');
const getTestimonial = (slug: string) => {
  const t = testimonials.find(t => t.id === slug);
  return t?.data;
};

const ely = getTestimonial('ely-uk');
const jane = getTestimonial('jane-usa');
---

<Layout canonicalPath="/">
  <Nav />
  <main>
    <!-- Hero -->
    <section class="relative min-h-screen flex items-center pt-24">
      <div class="max-w-page mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-stone text-sm uppercase tracking-widest mb-4">Dan Healing Arts</p>
          <h1 class="font-serif text-4xl md:text-6xl text-text-main leading-tight mb-6">
            Learn to Listen<br />with Your Hands
          </h1>
          <p class="text-lg text-text-main/70 leading-relaxed mb-8 max-w-lg">
            Immersive trainings in deep, slow somatic bodywork — woven with presence, curiosity and care. A professional pathway in fascia-based bodywork that transforms how you touch and how you listen.
          </p>
          <div class="flex flex-wrap gap-4">
            <ApplyButton text="Explore Trainings" href="/dates" />
            <a href="/about-the-work" class="inline-flex items-center px-8 py-3 border border-forest text-forest rounded-btn font-medium hover:bg-forest hover:text-white transition-colors">
              About the Work
            </a>
          </div>
        </div>
        <div>
          <img
            src="/images/daniel-bodywork.jpg"
            alt="Daniel Wendt giving a deep somatic bodywork session"
            class="w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Testimonial: Ely -->
    {ely && <TestimonialDivider quote={ely.quote} name={ely.name} location={ely.location} photo={ely.photo} />}

    <!-- Training Pathway -->
    <section class="py-16 md:py-24">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <p class="text-stone text-sm uppercase tracking-widest mb-4 text-center">Training Pathway</p>
        <h2 class="font-serif text-3xl md:text-4xl text-text-main text-center mb-12">Two Levels of Learning</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="/level-1" class="block bg-white rounded-card p-8 shadow-sm hover:shadow-md transition-shadow group">
            <p class="text-sm text-stone font-medium uppercase tracking-wider mb-2">Level 1</p>
            <h3 class="font-serif text-2xl text-text-main group-hover:text-forest transition-colors mb-4">The Essence of Deep Touch</h3>
            <p class="text-text-main/70 leading-relaxed">
              The foundational training in fascia-based somatic bodywork. Learn to work with muscles and fascia through the principles of deep touch, while gaining insight into the emotional qualities stored within different body regions.
            </p>
          </a>
          <a href="/level-2" class="block bg-white rounded-card p-8 shadow-sm hover:shadow-md transition-shadow group">
            <p class="text-sm text-stone font-medium uppercase tracking-wider mb-2">Level 2</p>
            <h3 class="font-serif text-2xl text-text-main group-hover:text-forest transition-colors mb-4">An Evolution of Sensitivity</h3>
            <p class="text-text-main/70 leading-relaxed">
              The advanced training deepening your practice. Refine your sensitivity, expand your skills, and explore the subtler dimensions of touch, presence, and somatic awareness.
            </p>
          </a>
        </div>
      </div>
    </section>

    <!-- Video Insights -->
    <section class="py-16 md:py-24 bg-surface-lo">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <p class="text-stone text-sm uppercase tracking-widest mb-4 text-center">Insights</p>
        <h2 class="font-serif text-3xl md:text-4xl text-text-main text-center mb-12">An Insight into the Bodywork Trainings</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-mid">
              <!-- Portugal Sept 2025 video — replace VIDEO_ID with actual YouTube ID -->
              <p class="absolute inset-0 flex items-center justify-center text-stone">Video: Portugal Training</p>
            </div>
            <p class="text-sm text-stone mt-3 text-center">Portugal, September 2025</p>
          </div>
          <div>
            <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-mid">
              <!-- México Jan 2023 video — replace VIDEO_ID with actual YouTube ID -->
              <p class="absolute inset-0 flex items-center justify-center text-stone">Video: México Training</p>
            </div>
            <p class="text-sm text-stone mt-3 text-center">México, January 2023</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming Trainings -->
    <section class="py-16 md:py-24">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <p class="text-stone text-sm uppercase tracking-widest mb-4 text-center">Upcoming</p>
        <h2 class="font-serif text-3xl md:text-4xl text-text-main text-center mb-12">Upcoming Trainings</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TrainingCard
            title="Level 1a — Rücken & Nacken"
            date="18–19 April 2026"
            location="Zürich, Switzerland"
            level="Level 1a"
            href="/zurich"
          />
          <TrainingCard
            title="The Essence of Deep Touch"
            date="1–7 June 2026"
            location="Portugal"
            level="Level 1"
            href="/portugal"
          />
          <TrainingCard
            title="Level 1b — Bauch, Becken, Beine"
            date="13–14 June 2026"
            location="Zürich, Switzerland"
            level="Level 1b"
            href="/zurich"
          />
          <TrainingCard
            title="The Essence of Deep Touch"
            date="24–30 January 2027"
            location="Mazunte, México"
            level="Level 1"
            href="/mazunte"
          />
        </div>
        <div class="text-center mt-8">
          <a href="/dates" class="text-forest font-medium hover:text-sage transition-colors">View all dates →</a>
        </div>
      </div>
    </section>

    <!-- Testimonial: Jane -->
    {jane && <TestimonialDivider quote={jane.quote} name={jane.name} location={jane.location} photo={jane.photo} />}

    <!-- About Teaser -->
    <section class="py-16 md:py-24">
      <div class="max-w-page mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 items-center">
        <div class="w-full md:w-2/5">
          <img src="/images/daniel-portrait.jpg" alt="Daniel Wendt" class="w-full rounded-lg object-cover" />
        </div>
        <div class="w-full md:w-3/5">
          <p class="text-stone text-sm uppercase tracking-widest mb-4">About</p>
          <h2 class="font-serif text-3xl md:text-4xl text-text-main mb-6">Daniel Wendt</h2>
          <p class="text-text-main/70 leading-relaxed mb-6">
            With over 18 years of experience in bodywork and yoga, Daniel has guided more than 22 trainings across Germany, Mexico, Portugal, and beyond. His approach weaves together deep tissue work, fascial release, and somatic awareness into an integrated practice rooted in presence and connection.
          </p>
          <a href="/about-dan" class="text-forest font-medium hover:text-sage transition-colors">Read more →</a>
        </div>
      </div>
    </section>

    <!-- Contact Teaser -->
    <section id="contact" class="py-16 md:py-24 bg-surface-lo">
      <div class="max-w-page mx-auto px-6 md:px-12 text-center">
        <h2 class="font-serif text-3xl md:text-4xl text-text-main mb-6">Get in Touch</h2>
        <p class="text-text-main/70 leading-relaxed mb-8 max-w-lg mx-auto">
          Have questions about the trainings or want to apply? Reach out directly.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <ApplyButton text="Contact" href="/contact" />
          <a href="mailto:danhealingarts@gmail.com" class="inline-flex items-center px-8 py-3 border border-forest text-forest rounded-btn font-medium hover:bg-forest hover:text-white transition-colors">
            danhealingarts@gmail.com
          </a>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Verify build and check homepage**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds with both `/` (English) and `/zurich` (German) routes.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro src/pages/zurich.astro
git commit -m "feat: English homepage + Zürich page at /zurich"
```

---

## Task 7: Portugal Retreat Page

**Files:**
- Create: `src/pages/portugal.astro`

This is the largest page — full retreat landing page with all content verbatim from the Wix Portugal page.

- [ ] **Step 1: Create portugal.astro**

Build the complete page using the shared components (TextImageSection, TestimonialDivider, PhotoGallery, PricingCard, ApplyButton) and all verbatim content from the spec. The page follows the exact section order defined in the spec:

1. Hero (fullwidth image + overlay "PORTUGAL", title, date, CTA)
2. PhotoGallery ("Real moments from the Portugal Training", 4 images)
3. TextImageSection: "Learning the Art of Deep Touch" (text left, image right)
4. TextImageSection reversed: "The Training Experience" (image left, text right)
5. TextImageSection: Experiential learning (text left, image right) + ApplyButton
6. TestimonialDivider: Rebecca, Canada
7. "The Field We Practice In" section (corrected from "Pratice")
8. TestimonialDivider: Lasse, Finland
9. "The Space That Holds the Work" — venue section with 3 images, theshantispace.com link
10. "Held & Nourished" — 3 meals, chef Zoe, wild-delicacies.com
11. TestimonialDivider: Laura, UK
12. "Who Is This Training For"
13. "A Day at the Training" — schedule table
14. "What You'll Receive" — group photo + bullet list (7 days, 3 meals, etc.)
15. "Your Stay at The Shanti Space" — 4 PricingCards (EUR, Regular/Late Bird)
16. Practical Details (dates, location, certification, payment)
17. Closing statement (italic)

All text, links, images, and prices must be taken verbatim from the spec section "Template 1: Retreat-Landingpage" with Portugal-specific content.

The page will be ~400 lines of Astro. Build it using the shared components where possible, inline sections where components don't exist yet.

- [ ] **Step 2: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds, `/portugal` route exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/portugal.astro
git commit -m "feat: Portugal retreat landing page with full content"
```

---

## Task 8: Mazunte Retreat Page

**Files:**
- Create: `src/pages/mazunte.astro`

- [ ] **Step 1: Create mazunte.astro**

Same structure as Portugal but with Mazunte-specific content:

**Key differences from Portugal:**
- Hero image: `/images/mazunte/hero.jpg`, overlay "MAZUNTE"
- Date: "24 – 30 January, 2027" (corrected from hero's "23-30")
- Gallery: 4 Mazunte images with caption "Real moments from the Mazunte Training"
- Venue: "The Place That Holds the Work" — Bliss Haven Retreat Center, Mazunte, blisshaven.yoga
- Additional venue subsections: Bliss Haven details, Nature/leisure section, sunset image
- Food: "Held & Nourished" — 2 meals (breakfast + lunch), Umami Restaurant (umamisanagus.mx), dinner open, communal kitchen, 4 food images in 2x2 grid
- "What You'll Receive": 2 meals instead of 3
- Pricing: 4 cards in USD (Early-Bird/Regular), includes "Program & 2 Daily Meals (No Lodging)" option
- Practical Details: January 24-30 2027, Bliss Haven, Puerto Escondido (PXM) / Huatulco (HUX) airports ~60 min
- Group photo: `/images/mazunte/group-photo.jpg` above "What You'll Receive"
- Included: Punta Cometa sunrise excursion mention in venue section

All text verbatim from the spec's Mazunte sections.

- [ ] **Step 2: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds, `/mazunte` route exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/mazunte.astro
git commit -m "feat: Mazunte retreat landing page with full content"
```

---

## Task 9: Spain + Tulum Preview Pages

**Files:**
- Create: `src/pages/spain.astro`
- Create: `src/pages/tulum.astro`

- [ ] **Step 1: Create spain.astro**

```astro
---
// src/pages/spain.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import ApplyButton from '../components/ApplyButton.astro';
import Footer from '../components/Footer.astro';
---

<Layout
  title="Spain — Dan Healing Arts"
  description="Level 2 bodywork training in the Alpujarra mountains of southern Spain. Hidden Paradise retreat center near Granada."
  canonicalPath="/spain"
>
  <Nav />
  <main>
    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-end bg-surface-mid pt-24">
      <div class="absolute inset-0 bg-gradient-to-t from-canvas/80 to-transparent z-10"></div>
      <div class="relative z-20 max-w-page mx-auto px-6 md:px-12 pb-16 w-full">
        <h1 class="font-serif text-5xl md:text-7xl text-text-main uppercase tracking-wider">Spain</h1>
      </div>
    </section>

    <!-- Announcement -->
    <section class="py-16 md:py-24">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <div class="max-w-2xl">
          <p class="text-stone text-sm uppercase tracking-widest mb-4">Coming Soon</p>
          <h2 class="font-serif text-3xl md:text-4xl text-text-main mb-6">An Evolution of Sensitivity — Level 2</h2>
          <p class="text-lg text-text-main/70 leading-relaxed mb-4">10 – 16 May, 2026</p>
        </div>
      </div>
    </section>

    <!-- Location -->
    <section class="py-16 md:py-24 bg-surface-lo">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <h2 class="font-serif text-3xl text-text-main mb-8">Hidden Paradise</h2>
        <div class="max-w-3xl">
          <p class="text-text-main/70 leading-relaxed mb-4">
            Hidden Paradise is a family-run retreat center nestled in the Alpujarra mountains of southern Spain, near Granada. Perched at over 1,000 meters above the Mediterranean, the views stretch all the way to Morocco.
          </p>
          <p class="text-text-main/70 leading-relaxed mb-4">
            Completely off-grid, the center offers two pools, a wood-fired sauna, and two round, temple-like domed spaces for movement and sound work.
          </p>
          <p class="text-text-main/70 leading-relaxed mb-6">
            A place where the land itself holds you — far from the noise, close to what matters.
          </p>
          <a href="https://www.hiddenparadise.org" target="_blank" rel="noopener" class="text-forest font-medium hover:text-sage transition-colors">
            www.hiddenparadise.org →
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 text-center">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <p class="text-text-main/70 leading-relaxed mb-8 max-w-lg mx-auto italic font-serif text-lg">
          Details and pricing will be announced soon. If you're interested, reach out directly.
        </p>
        <ApplyButton text="Get in Touch" href="/contact" />
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Create tulum.astro**

```astro
---
// src/pages/tulum.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import ApplyButton from '../components/ApplyButton.astro';
import Footer from '../components/Footer.astro';
---

<Layout
  title="Tulum — Dan Healing Arts"
  description="Bodywork training at Casa Arkaana, an ecological retreat center in the jungle near Tulum, Mexico."
  canonicalPath="/tulum"
>
  <Nav />
  <main>
    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-end bg-surface-mid pt-24">
      <div class="absolute inset-0 bg-gradient-to-t from-canvas/80 to-transparent z-10"></div>
      <div class="relative z-20 max-w-page mx-auto px-6 md:px-12 pb-16 w-full">
        <h1 class="font-serif text-5xl md:text-7xl text-text-main uppercase tracking-wider">Tulum</h1>
      </div>
    </section>

    <!-- Announcement -->
    <section class="py-16 md:py-24">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <div class="max-w-2xl">
          <p class="text-stone text-sm uppercase tracking-widest mb-4">Coming Soon</p>
          <h2 class="font-serif text-3xl md:text-4xl text-text-main mb-6">Dates to Be Announced</h2>
        </div>
      </div>
    </section>

    <!-- Location -->
    <section class="py-16 md:py-24 bg-surface-lo">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <h2 class="font-serif text-3xl text-text-main mb-8">Casa Arkaana</h2>
        <div class="max-w-3xl">
          <p class="text-text-main/70 leading-relaxed mb-4">
            Casa Arkaana is an ecological retreat center set in the jungle near Chemuyil, between Playa del Carmen and Tulum in the Yucatán Peninsula of Mexico.
          </p>
          <p class="text-text-main/70 leading-relaxed mb-4">
            Run by Maja and Asdrubal, the center focuses on healing arts, conscious transformation, permaculture, and slow living. Just 6 km from pristine beaches and close to cenotes, it offers a deeply nourishing environment for retreat work.
          </p>
          <a href="https://www.casaarkaana.com" target="_blank" rel="noopener" class="text-forest font-medium hover:text-sage transition-colors">
            www.casaarkaana.com →
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonial -->
    <section class="py-16 md:py-24 bg-surface-lo">
      <div class="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div class="text-forest text-5xl font-serif leading-none mb-4">&ldquo;</div>
        <blockquote class="text-lg md:text-xl text-text-main/80 italic leading-relaxed font-serif">
          Casa Arkaana is a place where you can truly slow down and reconnect. The jungle, the cenotes, and the care of Maja and Asdrubal create a container unlike any other.
        </blockquote>
        <p class="mt-6 text-stone font-medium">— Sahil</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 text-center">
      <div class="max-w-page mx-auto px-6 md:px-12">
        <p class="text-text-main/70 leading-relaxed mb-8 max-w-lg mx-auto italic font-serif text-lg">
          Dates will be announced soon. If you're interested in training at Casa Arkaana, reach out directly.
        </p>
        <ApplyButton text="Get in Touch" href="/contact" />
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 3: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds, `/spain` and `/tulum` routes exist.

- [ ] **Step 4: Commit**

```bash
git add src/pages/spain.astro src/pages/tulum.astro
git commit -m "feat: Spain and Tulum preview pages"
```

---

## Task 10: Level 1 Training Page

**Files:**
- Create: `src/pages/level-1.astro`

- [ ] **Step 1: Create level-1.astro**

Full Level 1 page with all content from the Wix scrape, following the section order from the spec:

1. Hero section: "The Essence of Deep Touch" title, "The foundational training in a professional two-level pathway..." intro
2. Full intro text block
3. TestimonialDivider: Nico Akiba, USA
4. "A Practical Approach to Learning in a Natural Environment" — full text
5. TestimonialDivider: Erika, Lithuania
6. "Learn and Embody the Following Topics with Playful Ease" — full 12-point list
7. TestimonialDivider: Paige, USA
8. "Exploring the Body through its Emotional Language" — Days 1-3 / Days 4-6 + 5 body regions
9. TestimonialDivider: Jili, USA
10. "Yoga, Breathwork, Meditation and Voice Activation" — full text
11. "Sample Day Schedule" — table (08:00–20:00)
12. TestimonialDivider: Rebecca, Canada
13. "Upcoming Trainings" — TrainingCards for Portugal, Zürich 1a, Zürich 1b, Mazunte

All text verbatim from the Level 1 scrape. Use TestimonialDivider component with content collection data.

- [ ] **Step 2: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds, `/level-1` route exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/level-1.astro
git commit -m "feat: Level 1 training page with full content"
```

---

## Task 11: Remaining Content Pages (Level 2, About the Work, About Dan, Dates, Contact)

**Files:**
- Create: `src/pages/level-2.astro`
- Create: `src/pages/about-the-work.astro`
- Create: `src/pages/about-dan.astro`
- Create: `src/pages/dates.astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Scrape remaining Wix pages**

Before building, scrape the content from:
- `https://www.danhealingarts.com/level2`
- `https://www.danhealingarts.com/about-the-work`
- `https://www.danhealingarts.com/about-dan`
- `https://www.danhealingarts.com/dates`
- `https://www.danhealingarts.com/contact`

Use firecrawl to get all text, images, and structure from each page.

- [ ] **Step 2: Build level-2.astro**

Same structure as Level 1 — use scraped content. Include TestimonialDividers between sections, all text verbatim.

- [ ] **Step 3: Build about-the-work.astro**

Content page explaining Daniel's method and philosophy. Full text from Wix, styled in the Schweiz design system.

- [ ] **Step 4: Build about-dan.astro**

Biography page: portrait photo, full bio text, qualifications, stats (22+ trainings, 2,500+ hours, 17 courses).

- [ ] **Step 5: Build dates.astro**

Overview page with all upcoming trainings as TrainingCards, grouped chronologically:

```astro
---
// src/pages/dates.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import TrainingCard from '../components/TrainingCard.astro';
import Footer from '../components/Footer.astro';
---

<Layout
  title="Upcoming Dates — Dan Healing Arts"
  description="All upcoming bodywork training dates. Portugal, Zürich, Spain, Mazunte, and Tulum."
  canonicalPath="/dates"
>
  <Nav />
  <main class="pt-32 pb-16">
    <div class="max-w-page mx-auto px-6 md:px-12">
      <h1 class="font-serif text-4xl md:text-5xl text-text-main mb-4">Upcoming Trainings</h1>
      <p class="text-text-main/70 leading-relaxed mb-12 max-w-2xl">
        Find the right training for you. Each location offers a unique setting for deep somatic bodywork learning.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrainingCard
          title="Level 1a — Rücken & Nacken"
          date="18–19 April 2026"
          location="Zürich, Switzerland"
          level="Level 1a"
          href="/zurich"
        />
        <TrainingCard
          title="An Evolution of Sensitivity"
          date="10–16 May 2026"
          location="Alpujarra, Spain"
          level="Level 2"
          href="/spain"
        />
        <TrainingCard
          title="The Essence of Deep Touch"
          date="1–7 June 2026"
          location="Near Lisbon, Portugal"
          level="Level 1"
          href="/portugal"
        />
        <TrainingCard
          title="Level 1b — Bauch, Becken, Beine"
          date="13–14 June 2026"
          location="Zürich, Switzerland"
          level="Level 1b"
          href="/zurich"
        />
        <TrainingCard
          title="The Essence of Deep Touch"
          date="24–30 January 2027"
          location="Mazunte, México"
          level="Level 1"
          href="/mazunte"
        />
      </div>
    </div>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 6: Build contact.astro**

```astro
---
// src/pages/contact.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---

<Layout
  title="Contact — Dan Healing Arts"
  description="Get in touch with Daniel Wendt about bodywork trainings, retreats, and private sessions."
  canonicalPath="/contact"
>
  <Nav />
  <main class="pt-32 pb-16">
    <div class="max-w-page mx-auto px-6 md:px-12">
      <div class="max-w-2xl mx-auto">
        <h1 class="font-serif text-4xl md:text-5xl text-text-main mb-6">Get in Touch</h1>
        <p class="text-text-main/70 leading-relaxed mb-8">
          Whether you'd like to apply for a training, ask a question, or simply connect — I'd love to hear from you.
        </p>

        <form action="mailto:danhealingarts@gmail.com" method="POST" enctype="text/plain" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-text-main mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-4 py-3 bg-white border border-stone/30 rounded-btn text-text-main focus:outline-none focus:border-forest transition-colors"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-text-main mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="w-full px-4 py-3 bg-white border border-stone/30 rounded-btn text-text-main focus:outline-none focus:border-forest transition-colors"
            />
          </div>
          <div>
            <label for="subject" class="block text-sm font-medium text-text-main mb-2">What are you interested in?</label>
            <select
              id="subject"
              name="subject"
              class="w-full px-4 py-3 bg-white border border-stone/30 rounded-btn text-text-main focus:outline-none focus:border-forest transition-colors"
            >
              <option value="">Please select...</option>
              <option value="portugal">Level 1 — Portugal (June 2026)</option>
              <option value="mazunte">Level 1 — Mazunte (January 2027)</option>
              <option value="spain">Level 2 — Spain (May 2026)</option>
              <option value="zurich">Zürich Weekend Modules</option>
              <option value="tulum">Tulum (upcoming)</option>
              <option value="private">Private Session</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-text-main mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              class="w-full px-4 py-3 bg-white border border-stone/30 rounded-btn text-text-main focus:outline-none focus:border-forest transition-colors resize-y"
            ></textarea>
          </div>
          <button
            type="submit"
            class="inline-flex items-center px-8 py-3 bg-forest text-white rounded-btn font-medium hover:bg-sage transition-colors"
          >
            Send Message
          </button>
        </form>

        <div class="mt-12 pt-8 border-t border-stone/20">
          <p class="text-text-main/70 mb-4">You can also reach me directly:</p>
          <div class="space-y-2">
            <a href="mailto:danhealingarts@gmail.com" class="block text-forest hover:text-sage transition-colors">
              danhealingarts@gmail.com
            </a>
            <a href="https://www.instagram.com/dan.healing.arts" target="_blank" rel="noopener" class="block text-forest hover:text-sage transition-colors">
              Instagram @dan.healing.arts
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 7: Verify build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds, all routes exist.

- [ ] **Step 8: Commit**

```bash
git add src/pages/level-2.astro src/pages/about-the-work.astro src/pages/about-dan.astro src/pages/dates.astro src/pages/contact.astro
git commit -m "feat: add Level 2, About the Work, About Dan, Dates, and Contact pages"
```

---

## Task 12: Build + Visual QC

**Files:**
- No new files — verification only

- [ ] **Step 1: Full build**

Run: `cd ~/code/DanHealingArts && npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 2: Start dev server and take screenshots**

Run: `cd ~/code/DanHealingArts && npm run dev`

Take full-page screenshots of every page at Desktop (1440px) and Mobile (390px):
- `/` (Homepage)
- `/zurich`
- `/portugal`
- `/mazunte`
- `/spain`
- `/tulum`
- `/level-1`
- `/dates`
- `/contact`

- [ ] **Step 3: Review screenshots**

Check each screenshot for:
- Navigation works on all pages
- Images load correctly
- Text is readable, no overflow
- Mobile layout doesn't break
- Testimonial dividers appear between correct sections
- Pricing cards display correctly on Portugal + Mazunte
- Footer links are correct

- [ ] **Step 4: Fix any visual issues found**

Address any layout breaks, missing images, or styling inconsistencies.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: visual QC fixes across all pages"
```

---

## Task 13: Deploy to Coolify

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Verify Coolify auto-deploys**

Check that schweiz.danhealingarts.com updates with the new multi-page site.

- [ ] **Step 3: Live verification**

Take screenshots of the live site to confirm deployment worked correctly.

---

## Summary

| Task | What | Pages |
|------|------|-------|
| 1 | Download Wix images | — |
| 2 | Content Collections (testimonials) | — |
| 3 | Shared components (7 new) | — |
| 4 | Layout + Nav + Footer refactor | — |
| 5 | Zürich page (move existing) | `/zurich` |
| 6 | English Homepage | `/` |
| 7 | Portugal retreat page | `/portugal` |
| 8 | Mazunte retreat page | `/mazunte` |
| 9 | Spain + Tulum previews | `/spain`, `/tulum` |
| 10 | Level 1 training page | `/level-1` |
| 11 | Remaining pages (5) | `/level-2`, `/about-the-work`, `/about-dan`, `/dates`, `/contact` |
| 12 | Build + Visual QC | — |
| 13 | Deploy | — |
