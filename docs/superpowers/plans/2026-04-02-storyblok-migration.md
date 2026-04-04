# Storyblok Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate DanHealingArts from Sanity CMS to Storyblok, enabling a visual editor where Daniel and Stefan can click directly on the live website to edit text, images, and page sections.

**Architecture:** Astro fetches content from Storyblok at build time via the `@storyblok/astro` SDK. Each page section (Hero, Methode, Module, Testimonials etc.) becomes a Storyblok "Component" (called a Block). Pages are built as Storyblok Stories. A webhook triggers a Coolify rebuild on Storyblok publish. The existing Sanity setup remains untouched until Storyblok is confirmed working.

**Tech Stack:** Astro 4.x (static), @storyblok/astro, Storyblok Management API (for seeding content), Tailwind CSS, Hetzner/Coolify deploy

---

## File Structure

**New files:**
- `src/lib/storyblok.ts` — Storyblok client + helper functions (replaces `src/lib/sanity.ts` role)
- `src/storyblok/` — one `.astro` component per Storyblok block (mirrors existing components)
  - `src/storyblok/HeroBlock.astro`
  - `src/storyblok/MethodeBlock.astro`
  - `src/storyblok/WasEntwickelstBlock.astro`
  - `src/storyblok/ErfahrungsraumBlock.astro`
  - `src/storyblok/ModuleBlock.astro`
  - `src/storyblok/TestimonialsBlock.astro`
  - `src/storyblok/UeberDanielBlock.astro`
  - `src/storyblok/ParallaxBlock.astro`
  - `src/storyblok/StatsBlock.astro`
  - `src/storyblok/EnHeroBlock.astro`
  - `src/storyblok/EnTrainingsBlock.astro`
  - `src/storyblok/Page.astro` — root renderer that maps blocks to components

**Modified files:**
- `astro.config.mjs` — add Storyblok integration
- `src/pages/index.astro` — fetch from Storyblok instead of Sanity
- `src/pages/en.astro` — fetch from Storyblok instead of Sanity
- `.env` (new) — STORYBLOK_TOKEN

**Untouched:** `src/lib/sanity.ts`, `src/lib/queries.ts`, `cms/` folder — keep Sanity running as fallback until confirmed working.

---

## Task 1: Install Storyblok SDK + configure Astro

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Create: `.env`
- Create: `src/lib/storyblok.ts`

- [ ] **Step 1: Get the Storyblok API token**

  Go to app.storyblok.com → Dan Healing Arts Space → Settings → Access Tokens.
  Copy the **Preview token** (for development) and the **Public token** (for production).

- [ ] **Step 2: Create .env file**

  ```bash
  # /Users/stefan/code/DanHealingArts/.env
  STORYBLOK_TOKEN=your_preview_token_here
  PUBLIC_STORYBLOK_TOKEN=your_preview_token_here
  ```

  Also add `.env` to `.gitignore` if not already there:
  ```bash
  echo ".env" >> /Users/stefan/code/DanHealingArts/.gitignore
  ```

- [ ] **Step 3: Install the Storyblok Astro package**

  ```bash
  cd /Users/stefan/code/DanHealingArts && npm install @storyblok/astro
  ```

  Expected: package added to node_modules, no errors.

- [ ] **Step 4: Configure Storyblok in astro.config.mjs**

  ```js
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
  import tailwind from '@astrojs/tailwind';
  import storyblok from '@storyblok/astro';

  export default defineConfig({
    output: 'static',
    integrations: [
      tailwind(),
      storyblok({
        accessToken: import.meta.env.STORYBLOK_TOKEN,
        components: {
          hero_block: 'storyblok/HeroBlock',
          methode_block: 'storyblok/MethodeBlock',
          was_entwickelst_block: 'storyblok/WasEntwickelstBlock',
          erfahrungsraum_block: 'storyblok/ErfahrungsraumBlock',
          module_block: 'storyblok/ModuleBlock',
          testimonials_block: 'storyblok/TestimonialsBlock',
          ueber_daniel_block: 'storyblok/UeberDanielBlock',
          parallax_block: 'storyblok/ParallaxBlock',
          en_hero_block: 'storyblok/EnHeroBlock',
          en_trainings_block: 'storyblok/EnTrainingsBlock',
        },
        apiOptions: {
          region: 'eu',
        },
      }),
    ],
  });
  ```

- [ ] **Step 5: Create the Storyblok client helper**

  ```ts
  // src/lib/storyblok.ts
  import { useStoryblokApi } from '@storyblok/astro';

  export async function getStory(slug: string) {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: import.meta.env.DEV ? 'draft' : 'published',
    });
    return data.story;
  }

  export async function getStories(startsWith: string) {
    const storyblokApi = useStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: startsWith,
      version: import.meta.env.DEV ? 'draft' : 'published',
    });
    return data.stories;
  }

  export function sbImageUrl(filename: string, options?: string): string {
    if (!filename) return '';
    if (options) return `${filename}/m/${options}`;
    return filename;
  }
  ```

- [ ] **Step 6: Verify the dev server starts**

  ```bash
  cd /Users/stefan/code/DanHealingArts && npm run dev
  ```

  Expected: Dev server starts on localhost:4321. Storyblok integration loads. (Pages will still use Sanity data at this point.)

- [ ] **Step 7: Commit**

  ```bash
  cd /Users/stefan/code/DanHealingArts
  git add astro.config.mjs src/lib/storyblok.ts package.json package-lock.json .gitignore
  git commit -m "feat: add @storyblok/astro integration"
  ```

---

## Task 2: Create Storyblok Components (Blocks) in the Dashboard

This task is done entirely in the Storyblok web interface — no code.

- [ ] **Step 1: Open Block Library**

  Go to app.storyblok.com → Dan Healing Arts → Block Library → New Block.

- [ ] **Step 2: Create `hero_block` component**

  Type: Nestable block. Add these fields:
  | Field name | Type |
  |---|---|
  | headline | Text |
  | subtext | Textarea |
  | cta_text | Text |
  | cta_link | Text |
  | bild | Asset |

- [ ] **Step 3: Create `methode_block` component**

  Type: Nestable block. Fields:
  | Field name | Type |
  |---|---|
  | label | Text |
  | heading | Text |
  | paragraphs | Blocks (allow: text_item) |
  | highlight | Text |

  Also create helper block `text_item` with single field `text` (Textarea).

- [ ] **Step 4: Create `was_entwickelst_block` component**

  Type: Nestable block. Fields:
  | Field name | Type |
  |---|---|
  | label | Text |
  | heading | Text |
  | paragraphs | Blocks (allow: text_item) |
  | highlight | Text |
  | bild | Asset |

- [ ] **Step 5: Create `erfahrungsraum_block` component** (same fields as was_entwickelst_block)

  Type: Nestable block. Fields: label, heading, paragraphs (Blocks/text_item), highlight, bild (Asset).

- [ ] **Step 6: Create `module_block` component**

  Type: Nestable block. Fields:
  | Field name | Type |
  |---|---|
  | modules | Blocks (allow: modul_item) |

  Create `modul_item` block with fields: nummer (Text), titel (Text), datum (Text), inhalt (Textarea), preis (Text).

- [ ] **Step 7: Create `testimonials_block` component**

  Type: Nestable block. Fields:
  | Field name | Type |
  |---|---|
  | testimonials | Blocks (allow: testimonial_item) |

  Create `testimonial_item` block with fields: name (Text), location (Text), quote (Textarea), photo (Asset).

- [ ] **Step 8: Create `ueber_daniel_block` component**

  Type: Nestable block. Fields:
  | Field name | Type |
  |---|---|
  | heading | Text |
  | paragraphs | Blocks (allow: text_item) |
  | bild | Asset |
  | stats | Blocks (allow: stat_item) |

  Create `stat_item` block with fields: zahl (Text), label (Text).

- [ ] **Step 9: Create `parallax_block` component**

  Type: Nestable block. Fields:
  | Field name | Type |
  |---|---|
  | bild | Asset |
  | height | Text (default: "50vh") |

- [ ] **Step 10: Create `en_hero_block` component**

  Type: Nestable block. Fields: badge (Text), heading (Text), subheading (Textarea), cta_text (Text), cta_href (Text), hero_image (Asset).

- [ ] **Step 11: Create `en_trainings_block` component**

  Type: Nestable block. Fields:
  | Field name | Type |
  |---|---|
  | trainings | Blocks (allow: training_item) |

  Create `training_item` block with fields: title (Text), date (Text), location (Text), level (Text), href (Text), status (Single-Option: aktiv/ausgebucht/abgesagt), spots_left (Number), image (Asset).

---

## Task 3: Create Storyblok Stories (Pages) in the Dashboard

Done in Storyblok web interface.

- [ ] **Step 1: Create DE Startseite story**

  Content → New Story → Name: "Startseite", Slug: `startseite`. Add blocks in this order:
  hero_block → methode_block → parallax_block → was_entwickelst_block → erfahrungsraum_block → module_block → testimonials_block → ueber_daniel_block → parallax_block.

  Fill in all German content from the live site (copy from https://schweiz.danhealingarts.com).

- [ ] **Step 2: Create EN page story**

  Content → New Story → Name: "EN Page", Slug: `en`. Add blocks: en_hero_block → en_trainings_block → testimonials_block.

  Fill in English content from https://schweiz.danhealingarts.com/en.

- [ ] **Step 3: Publish both stories**

  Click "Publish" on each story so they are available via the public API.

---

## Task 4: Build Storyblok Astro Block Components

**Files:** Create all files in `src/storyblok/`

- [ ] **Step 1: Create `src/storyblok/HeroBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ZurichHero from '../components/ZurichHero.astro';

  const { blok } = Astro.props;
  ---
  <div {...storyblokEditable(blok)}>
    <ZurichHero
      headline={blok.headline}
      subtext={blok.subtext}
      cta_text={blok.cta_text}
      cta_link={blok.cta_link}
      bild={blok.bild?.filename ?? '/images/general/dan-outside-38.jpg'}
      bildAlt="Daniel Wendt — Dan Healing Arts"
    />
  </div>
  ```

- [ ] **Step 2: Create `src/storyblok/MethodeBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ZurichMethode from '../components/ZurichMethode.astro';

  const { blok } = Astro.props;
  const paragraphs = (blok.paragraphs ?? []).map((p: any) => p.text);
  ---
  <div {...storyblokEditable(blok)}>
    <ZurichMethode
      label={blok.label}
      heading={blok.heading}
      paragraphs={paragraphs}
      highlight={blok.highlight}
    />
  </div>
  ```

- [ ] **Step 3: Create `src/storyblok/WasEntwickelstBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ZurichWasEntwickelst from '../components/ZurichWasEntwickelst.astro';

  const { blok } = Astro.props;
  const paragraphs = (blok.paragraphs ?? []).map((p: any) => p.text);
  ---
  <div {...storyblokEditable(blok)}>
    <ZurichWasEntwickelst
      label={blok.label}
      heading={blok.heading}
      paragraphs={paragraphs}
      highlight={blok.highlight}
      image={blok.bild?.filename}
      imageAlt={blok.label ?? ''}
    />
  </div>
  ```

- [ ] **Step 4: Create `src/storyblok/ErfahrungsraumBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ZurichErfahrungsraum from '../components/ZurichErfahrungsraum.astro';

  const { blok } = Astro.props;
  const paragraphs = (blok.paragraphs ?? []).map((p: any) => p.text);
  ---
  <div {...storyblokEditable(blok)}>
    <ZurichErfahrungsraum
      label={blok.label}
      heading={blok.heading}
      paragraphs={paragraphs}
      highlight={blok.highlight}
      image={blok.bild?.filename}
      imageAlt={blok.label ?? ''}
    />
  </div>
  ```

- [ ] **Step 5: Create `src/storyblok/ModuleBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ZurichModule from '../components/ZurichModule.astro';

  const { blok } = Astro.props;
  ---
  <div {...storyblokEditable(blok)}>
    <ZurichModule modules={blok.modules ?? []} />
  </div>
  ```

- [ ] **Step 6: Create `src/storyblok/TestimonialsBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ZurichTestimonials from '../components/ZurichTestimonials.astro';

  const { blok } = Astro.props;
  ---
  <div {...storyblokEditable(blok)}>
    <ZurichTestimonials testimonials={blok.testimonials ?? []} />
  </div>
  ```

- [ ] **Step 7: Create `src/storyblok/UeberDanielBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ZurichUeberDaniel from '../components/ZurichUeberDaniel.astro';

  const { blok } = Astro.props;
  const paragraphs = (blok.paragraphs ?? []).map((p: any) => p.text);
  ---
  <div {...storyblokEditable(blok)}>
    <ZurichUeberDaniel
      heading={blok.heading}
      paragraphs={paragraphs}
      stats={blok.stats ?? []}
      image={blok.bild?.filename}
    />
  </div>
  ```

- [ ] **Step 8: Create `src/storyblok/ParallaxBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import Parallax from '../components/Parallax.astro';

  const { blok } = Astro.props;
  ---
  <div {...storyblokEditable(blok)}>
    <Parallax
      src={blok.bild?.filename ?? '/images/parallax-1.jpg'}
      height={blok.height ?? '50vh'}
    />
  </div>
  ```

- [ ] **Step 9: Create `src/storyblok/EnHeroBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import ApplyButton from '../components/ApplyButton.astro';

  const { blok } = Astro.props;
  ---
  <section {...storyblokEditable(blok)} class="relative min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-24 bg-canvas">
    <div class="max-w-page mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
      <div>
        <p class="font-sans text-stone text-xs uppercase tracking-[0.25em] mb-6">{blok.badge ?? "Dan Healing Arts"}</p>
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main leading-[1.1] mb-6">{blok.heading}</h1>
        <p class="font-sans text-stone text-lg leading-relaxed max-w-lg mb-10">{blok.subheading}</p>
        <div class="flex flex-wrap gap-4">
          <ApplyButton text={blok.cta_text ?? "Explore Trainings"} href={blok.cta_href ?? "/dates"} />
          <a href="/about-the-work" class="inline-flex items-center px-8 py-3 border border-forest text-forest rounded-btn font-medium hover:bg-forest hover:text-white transition-colors duration-200">About the Work</a>
        </div>
      </div>
      <div class="rounded-lg overflow-hidden">
        <img src={blok.hero_image?.filename ?? "/images/daniel-bodywork.jpg"} alt="Daniel Wendt giving a deep somatic bodywork session" class="w-full h-[500px] md:h-[600px] object-cover" fetchpriority="high" />
      </div>
    </div>
  </section>
  ```

- [ ] **Step 10: Create `src/storyblok/EnTrainingsBlock.astro`**

  ```astro
  ---
  import { storyblokEditable } from '@storyblok/astro';
  import TrainingCard from '../components/TrainingCard.astro';

  const { blok } = Astro.props;
  ---
  <section {...storyblokEditable(blok)} class="py-16 bg-canvas">
    <div class="max-w-page mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(blok.trainings ?? []).map((t: any) => (
          <TrainingCard training={t} />
        ))}
      </div>
    </div>
  </section>
  ```

- [ ] **Step 11: Commit all block components**

  ```bash
  cd /Users/stefan/code/DanHealingArts
  git add src/storyblok/
  git commit -m "feat: add Storyblok block components"
  ```

---

## Task 5: Update Pages to Fetch from Storyblok

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/en.astro`

- [ ] **Step 1: Check that the `startseite` story exists in Storyblok**

  In Storyblok dashboard → Content → confirm "Startseite" story with slug `startseite` is published.

- [ ] **Step 2: Update `src/pages/index.astro`**

  Replace the Sanity imports and data fetching with Storyblok:

  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import Nav from '../components/Nav.astro';
  import Footer from '../components/Footer.astro';
  import StatsDivider from '../components/StatsDivider.astro';
  import FadeIn from '../components/FadeIn.astro';
  import TestimonialDivider from '../components/TestimonialDivider.astro';
  import { StoryblokComponent } from '@storyblok/astro';
  import { getStory } from '../lib/storyblok';

  const story = await getStory('startseite');
  const blocks = story?.content?.body ?? [];

  // Find testimonial divider quotes from testimonials block
  const testimonialsBlock = blocks.find((b: any) => b.component === 'testimonials_block');
  const allTestimonials = testimonialsBlock?.testimonials ?? [];
  const nicoUSA = allTestimonials.find((t: any) => t.name === 'Nico' && t.location?.includes('USA'));
  const ilincaGermany = allTestimonials.find((t: any) => t.name === 'Ilinca' && t.location?.includes('Germany'));
  ---

  <Layout
    lang="de"
    title="Somatische Tiefenmassage & Faszien Release — Wochenendkurse Zürich | Dan Healing Arts"
    description="Lerne präzise Faszienarbeit mit somatischer Präsenz. 4 Wochenendkurse in Zürich mit Daniel Wendt. Einzeln buchbar, je 420 CHF."
    canonicalPath="/"
  >
    <Nav lang="de" />
    <main>
      {blocks.map((blok: any) => (
        <>
          {blok.component === 'testimonials_block' && nicoUSA && (
            <TestimonialDivider
              quote={nicoUSA.quote}
              name={nicoUSA.name}
              location={nicoUSA.location}
              photo={nicoUSA.photo?.filename}
            />
          )}
          <FadeIn>
            <StoryblokComponent blok={blok} />
          </FadeIn>
          {blok.component === 'testimonials_block' && ilincaGermany && (
            <TestimonialDivider
              quote={ilincaGermany.quote}
              name={ilincaGermany.name}
              location={ilincaGermany.location}
              photo={ilincaGermany.photo?.filename}
            />
          )}
          {blok.component === 'methode_block' && <StatsDivider />}
        </>
      ))}
    </main>
    <Footer lang="de" />
  </Layout>
  ```

- [ ] **Step 3: Update `src/pages/en.astro` top section (imports + data)**

  Replace Sanity imports with:

  ```astro
  ---
  import Layout from '../layouts/Layout.astro';
  import Nav from '../components/Nav.astro';
  import Footer from '../components/Footer.astro';
  import StatsDivider from '../components/StatsDivider.astro';
  import FadeIn from '../components/FadeIn.astro';
  import TestimonialDivider from '../components/TestimonialDivider.astro';
  import { StoryblokComponent } from '@storyblok/astro';
  import { getStory } from '../lib/storyblok';

  const story = await getStory('en');
  const blocks = story?.content?.body ?? [];
  const heroBlock = blocks.find((b: any) => b.component === 'en_hero_block');
  ---

  <Layout
    lang="en"
    title={heroBlock?.heading ?? "Dan Healing Arts — Learn to Listen with Your Hands"}
    description="Immersive trainings in deep, slow somatic bodywork — woven with presence, curiosity and care."
    canonicalPath="/"
  >
    <Nav lang="en" />
    <main>
      {blocks.map((blok: any) => (
        <FadeIn>
          <StoryblokComponent blok={blok} />
        </FadeIn>
      ))}
      <StatsDivider />
    </main>
    <Footer lang="en" />
  </Layout>
  ```

- [ ] **Step 4: Run dev server and verify both pages load**

  ```bash
  cd /Users/stefan/code/DanHealingArts && npm run dev
  ```

  Open http://localhost:4321 — should show DE page with Storyblok content.
  Open http://localhost:4321/en — should show EN page with Storyblok content.

- [ ] **Step 5: Run build to confirm static build works**

  ```bash
  cd /Users/stefan/code/DanHealingArts && npm run build
  ```

  Expected: Build succeeds, no TypeScript errors.

- [ ] **Step 6: Commit**

  ```bash
  cd /Users/stefan/code/DanHealingArts
  git add src/pages/index.astro src/pages/en.astro
  git commit -m "feat: migrate DE and EN pages to Storyblok"
  ```

---

## Task 6: Configure Visual Editor Preview URL

- [ ] **Step 1: Set preview URL in Storyblok**

  Storyblok Dashboard → Settings → Visual Editor → Preview URLs.
  Set default preview URL to: `http://localhost:4321`
  (Change to `https://schweiz.danhealingarts.com` after live deploy)

- [ ] **Step 2: Test the visual editor locally**

  In Storyblok dashboard → Content → Startseite → click the eye icon (Preview).
  The visual editor should open with the local dev site on the right side.
  Click on a text element — it should highlight and open an edit panel on the left.

- [ ] **Step 3: Update preview URL to live site**

  After confirming it works locally, change preview URL in Storyblok Settings to:
  `https://schweiz.danhealingarts.com`

---

## Task 7: Set Up Publish Webhook → Coolify Auto-Deploy

- [ ] **Step 1: Get the Coolify webhook URL for DanHealingArts**

  Log into Coolify → DanHealingArts application → Deployments → copy the webhook URL.
  It looks like: `https://coolify.yourdomain.com/api/v1/deploy?uuid=xxx&token=xxx`

- [ ] **Step 2: Add webhook in Storyblok**

  Storyblok → Settings → Webhooks → Add Webhook.
  - Name: "Coolify Deploy"
  - URL: paste the Coolify webhook URL
  - Events: check "story.published"
  - Save.

- [ ] **Step 3: Test the webhook**

  In Storyblok → Content → Startseite → make a small text change → Publish.
  Check Coolify → DanHealingArts → Deployments — a new deploy should start within 30 seconds.
  Verify https://schweiz.danhealingarts.com shows the changed text after deploy finishes.

- [ ] **Step 4: Commit final state**

  ```bash
  cd /Users/stefan/code/DanHealingArts
  git add .
  git commit -m "feat: Storyblok integration complete — visual editor + auto-deploy webhook"
  ```

---

## Task 8: Invite Daniel as Storyblok Editor

- [ ] **Step 1: Invite Daniel**

  Storyblok → Settings → Team → Invite.
  Email: `danhealingarts@gmail.com`
  Role: Editor (can edit and publish content, cannot change schemas)

- [ ] **Step 2: Send Daniel a 2-minute guide**

  Tell Daniel:
  1. Check email → accept Storyblok invite
  2. Go to app.storyblok.com → Dan Healing Arts
  3. Click "Content" → click any story
  4. Click elements directly on the preview to edit
  5. Click "Save" to save draft, "Publish" to go live

---

## Self-Review Notes

- **Spec coverage:** All content types from Sanity (startseite, testimonials, trainings, retreats) are covered. Retreat pages (portugal, mazunte, spain, tulum) are NOT in this plan — they are Sanity-fetched and should be migrated in a separate follow-up plan to keep scope manageable.
- **Sanity fallback:** Sanity code is untouched so retreat pages continue to work during migration.
- **No placeholders:** All code blocks are complete and ready to copy.
- **Token consistency:** `blok.bild?.filename` used consistently throughout — matches Storyblok's Asset field structure.
