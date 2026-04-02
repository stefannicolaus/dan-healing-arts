# Pages CMS — Alle Seiten editierbar (Texte + Bilder)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alle 15 Seiten von DanHealingArts vollständig via Pages CMS editierbar machen — Texte, Bilder, Preise, Daten. Daniel braucht keinen Code-Zugriff mehr.

**Architecture:** Alle Seiteninhalte werden in YAML-Dateien in `src/content/` extrahiert. Astro-Komponenten lesen per `getEntry()` aus YAML. `.pages.yml` registriert alle neuen Felder mit deutschen Labels. Pages CMS zeigt ein strukturiertes Formular pro Seite.

**Tech Stack:** Astro Content Collections (type: 'data'), YAML, Pages CMS (.pages.yml), Zod-Schemas in config.ts

---

## Datei-Übersicht

**Neu erstellen:**
- `src/content/pages/zurich-methode.yaml` — Methode-Sektion
- `src/content/pages/zurich-entwickelst.yaml` — "Was du entwickelst" Sektion
- `src/content/pages/zurich-erfahrungsraum.yaml` — Erfahrungsraum Sektion
- `src/content/pages/zurich-ueber.yaml` — Über Daniel (DE)
- `src/content/pages/en.yaml` — Englische Startseite
- `src/content/pages/about-dan.yaml` — About Dan
- `src/content/pages/about-the-work.yaml` — About the Work
- `src/content/pages/sessions.yaml` — Private Sessions (EN)
- `src/content/pages/massage.yaml` — Einzelsitzungen (DE)
- `src/content/pages/contact.yaml` — Kontakt
- `src/content/pages/dates.yaml` — Upcoming Dates (Header-Texte)
- `src/content/retreats/portugal.yaml` — Portugal Retreat
- `src/content/retreats/mazunte.yaml` — Mazunte Retreat
- `src/content/retreats/spain.yaml` — Spain Retreat
- `src/content/retreats/tulum.yaml` — Tulum Retreat
- `src/content/retreats/level-1.yaml` — Level 1 Übersicht
- `src/content/retreats/level-2.yaml` — Level 2 Übersicht

**Modifizieren:**
- `src/content/config.ts` — neue Schemas hinzufügen
- `src/data/trainings.ts` → `src/content/trainings/` (als Collection)
- `src/components/ZurichMethode.astro`
- `src/components/ZurichWasEntwickelst.astro`
- `src/components/ZurichErfahrungsraum.astro`
- `src/components/ZurichUeberDaniel.astro`
- `src/pages/en.astro`
- `src/pages/about-dan.astro`
- `src/pages/about-the-work.astro`
- `src/pages/sessions.astro`
- `src/pages/massage.astro`
- `src/pages/contact.astro`
- `src/pages/dates.astro`
- `src/pages/portugal.astro`
- `src/pages/mazunte.astro`
- `src/pages/spain.astro`
- `src/pages/tulum.astro`
- `src/pages/level-1.astro`
- `src/pages/level-2.astro`
- `.pages.yml` — alle neuen Content-Bereiche registrieren

---

## Task 1: Schemas in config.ts erweitern

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Schritt 1: Neue Schemas hinzufügen**

```typescript
// src/content/config.ts — vollständig ersetzen
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
const sectionText = z.object({
  label: z.string(),
  heading: z.string(),
  paragraphs: z.array(z.string()),
  highlight: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const zurichSektionen = defineCollection({
  type: 'data',
  schema: sectionText,
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
      heading: z.string().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      reversed: z.boolean().optional(),
      paragraphs: z.array(z.string()),
      highlight: z.string().optional(),
    })).optional(),
    stats: z.array(z.object({
      number: z.string(),
      label: z.string(),
    })).optional(),
  }),
});

// Pricing Card Schema (wiederverwendbar)
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

// Retreat-Seiten (portugal, mazunte, spain, tulum)
const retreats = defineCollection({
  type: 'data',
  schema: z.object({
    page_title: z.string(),
    page_description: z.string(),
    og_image: z.string(),
    hero: z.object({
      location_badge: z.string(),
      heading: z.string(),
      subtitle: z.string(),
      level_text: z.string(),
      level_href: z.string(),
      dates: z.string(),
      image: z.string(),
      imageAlt: z.string(),
    }),
    video: z.object({
      youtube_id: z.string(),
      title: z.string(),
    }).optional(),
    sections: z.array(z.object({
      id: z.string(),
      heading: z.string().optional(),
      image: z.string(),
      imageAlt: z.string(),
      reversed: z.boolean().optional(),
      paragraphs: z.array(z.string()),
      show_apply_button: z.boolean().optional(),
    })),
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
  }),
});

// Trainings (ersetzt data/trainings.ts)
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
```

- [ ] **Schritt 2: Build testen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -20
```

Erwartet: Build noch clean (neue Collections ohne Dateien erzeugen keine Fehler)

- [ ] **Schritt 3: Commit**

```bash
cd ~/code/DanHealingArts && git add src/content/config.ts && git commit -m "feat: add content collection schemas for all pages"
```

---

## Task 2: Zürich Sub-Komponenten → YAML

**Files:**
- Create: `src/content/zurichSektionen/methode.yaml`
- Create: `src/content/zurichSektionen/entwickelst.yaml`
- Create: `src/content/zurichSektionen/erfahrungsraum.yaml`
- Create: `src/content/zurichSektionen/ueber.yaml`
- Modify: `src/components/ZurichMethode.astro`
- Modify: `src/components/ZurichWasEntwickelst.astro`
- Modify: `src/components/ZurichErfahrungsraum.astro`
- Modify: `src/components/ZurichUeberDaniel.astro`

- [ ] **Schritt 1: methode.yaml erstellen**

```yaml
# src/content/zurichSektionen/methode.yaml
label: Philosophie
heading: Die Methode
paragraphs:
  - "Berührung kann mehr sein als das Lösen von Spannung. Sie kann zu einem Raum werden, in dem der Körper beginnt, sich selbst zu zeigen."
  - "Die somatische Tiefenmassage ist eine ganzheitliche Form der Körperarbeit, die sich an den individuellen Bedürfnissen des Nervensystems orientiert. Faszien-Release, Tiefengewebsmassage und die achtsame Begleitung innerer Prozesse fließen dabei auf natürliche Weise zusammen."
  - "Im Zentrum steht ein feines Wahrnehmen dessen, was im Gewebe spürbar wird — und die Fähigkeit, darauf zu antworten. Durch langsame, präzise und tiefergehende Berührung entsteht ein Kontakt, der dem Gewebe Zeit lässt, sich zu öffnen — nicht durch Druck oder Kraft allein, sondern durch ein feines, differenziertes Eingehen auf das, was sich zeigt."
  - "Diese Art zu arbeiten schafft Vertrauen im Körper. Sie kann nicht nur tiefe körperliche Entspannung ermöglichen, sondern auch Räume öffnen, in denen sich emotionale Prozesse zeigen und integrieren dürfen."
highlight: "Eine Methode für alle, die Berührung wirklich verstehen und verkörpern möchten."
```

- [ ] **Schritt 2: entwickelst.yaml erstellen**

```yaml
# src/content/zurichSektionen/entwickelst.yaml
label: Ausbildung
heading: Was du in dieser Ausbildung entwickelst
image: /images/zurich-entwickelst.jpg
imageAlt: Praktizierende bei der somatischen Körperarbeit — Lernen durch direkte Erfahrung
paragraphs:
  - "In dieser Ausbildungsreihe lernst du die Grundlagen tiefgehender Körperarbeit im Kontakt mit Muskeln und Faszien. Du entwickelst ein feines Verständnis dafür, wie Berührung im Gewebe und im Nervensystem wirkt — unmittelbar erfahrbar und differenziert spürbar."
  - "Über gezielte Berührung öffnet sich auch der Zugang zu emotionalen Prozessen. Es entsteht ein sicherer, geschützter Raum, in dem du lernst, Spannungen wahrzunehmen, Gefühle zu halten und ihnen Ausdruck zu geben."
  - "Ein zentraler Teil ist auch die Arbeit am eigenen Körperbewusstsein: Wie kannst du als Gebender aus der Entspannung heraus arbeiten? Wie findest du Stabilität, während du andere hältst? Du lernst, über dein eigenes Bewegungssystem ergonomisch, mühelos und im Flow zu bleiben."
highlight: "So entsteht nicht nur technisches Können, sondern eine verkörperte, unmittelbar anwendbare Qualität von Präsenz und Berührung."
```

- [ ] **Schritt 3: erfahrungsraum.yaml erstellen**

```yaml
# src/content/zurichSektionen/erfahrungsraum.yaml
label: Selbsterfahrung
heading: Der Erfahrungsraum
image: /images/fuer-persoenlich.jpg
imageAlt: Sharing Circle — gemeinsames Erleben und Reflektieren in der Ausbildung
paragraphs:
  - "Die Ausbildung verbindet praktische Körperarbeit mit einem tiefen Selbsterfahrungsprozess. Jeder Tag beginnt mit kurzen Einheiten aus Yoga und Atemarbeit, die den Körper auf die anschließende Faszien- und Tiefengewebsarbeit einstimmen und die Wahrnehmung verfeinern."
  - "Ein wesentlicher Teil der Ausbildung ist die direkte Erfahrung — im Geben und im Empfangen. Dieser Rhythmus wirkt regulierend auf dein Nervensystem und vertieft dein Verständnis von Berührung."
  - "In täglichen Sharing Circles entsteht Raum, das Erlebte zu teilen, zu reflektieren und im Kreis zu halten."
highlight: "So entfaltet sich ein geschützter Rahmen, in dem Lernen nicht nur über Technik geschieht, sondern durch unmittelbares Erleben, Resonanz und Integration."
```

- [ ] **Schritt 4: ueber.yaml erstellen**

```yaml
# src/content/zurichSektionen/ueber.yaml
label: Über Daniel
heading: Über Daniel
image: /images/daniel-portrait.jpg
imageAlt: Daniel Wendt — Myofascial Somatic Release Practitioner und Lehrer
paragraphs:
  - "Von Natur aus eher Abenteurer und Entdecker als Philosoph, habe ich in meinem Leben stets nach direkten, deutlich wahrnehmbaren Erfahrungen gesucht. Von Backpacking über Bauarbeit, von Rap-Bühnen über Immobilienfirmen, vom durch die Welt trampen bis hin zur Gründung einer Familie mit zwei wunderbaren Kindern."
  - "Ich fand Freiheit, Frieden und Inspiration, als ich vor über 17 Jahren anfing, tief in die Körperarbeit und Yoga einzutauchen, und konnte nach und nach viele einschränkende Glaubenssätze und konventionelle Normen hinter mir lassen."
  - "In meinen Kursen, Behandlungen, Trainings und Retreats lehre ich eine einzigartige Fusion aus Faszien-Release, Tiefengewebsmassage und Energiearbeit. In einem sicheren Rahmen lade ich dich ein, deinen eigenen Körper als einen unendlichen Erfahrungsraum zu erleben."
  - "Als Lehrer habe ich in über 2.500 Stunden Yogalehrerausbildungen und mehr als 20 Trainings in somatischer Körperarbeit zahlreiche Menschen auf ihrem Weg zum Yogalehrer und Massagetherapeuten begleitet."
stats:
  - zahl: "22+"
    label: Ausbildungen
  - zahl: "2.500+"
    label: Stunden
  - zahl: "17"
    label: Trainingskurse
```

- [ ] **Schritt 5: ZurichMethode.astro auf YAML umstellen**

```astro
---
// src/components/ZurichMethode.astro
import { getEntry } from 'astro:content';
const data = (await getEntry('zurichSektionen', 'methode'))?.data;
if (!data) throw new Error('methode.yaml nicht gefunden');
---

<section id="methode" class="bg-surface-lo py-12 md:py-16">
  <div class="max-w-[820px] mx-auto px-6 text-center">
    <span class="font-sans font-bold tracking-[0.2em] uppercase text-xs text-sage mb-5 block">
      {data.label}
    </span>
    <h2 class="font-serif font-black text-forest text-4xl md:text-5xl mb-12 tracking-tight">
      {data.heading}
    </h2>
    <div class="space-y-6 font-sans text-lg md:text-xl text-stone leading-[1.8] text-left md:text-center">
      {data.paragraphs.map((p) => <p>{p}</p>)}
      {data.highlight && (
        <p class="font-medium text-forest">{data.highlight}</p>
      )}
    </div>
  </div>
</section>
```

- [ ] **Schritt 6: ZurichWasEntwickelst.astro auf YAML umstellen**

```astro
---
// src/components/ZurichWasEntwickelst.astro
import { getEntry } from 'astro:content';
const data = (await getEntry('zurichSektionen', 'entwickelst'))?.data;
if (!data) throw new Error('entwickelst.yaml nicht gefunden');
---

<section class="py-12 md:py-16 px-6 md:px-12 bg-canvas">
  <div class="max-w-page mx-auto">
    <div class="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
      <div class="w-full md:w-[45%] shrink-0">
        <div class="rounded-card overflow-hidden aspect-[4/3]">
          <img src={data.image} alt={data.imageAlt} class="w-full h-full object-cover object-center" />
        </div>
      </div>
      <div class="w-full md:w-[55%]">
        <span class="font-sans font-bold tracking-[0.2em] uppercase text-xs text-sage mb-5 block">{data.label}</span>
        <h2 class="font-serif font-black text-forest text-3xl md:text-4xl mb-8 tracking-tight">{data.heading}</h2>
        <div class="space-y-4 font-sans text-stone text-base md:text-lg leading-[1.75]">
          {data.paragraphs.map((p) => <p>{p}</p>)}
          {data.highlight && <p class="font-medium text-forest">{data.highlight}</p>}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Schritt 7: ZurichErfahrungsraum.astro auf YAML umstellen**

```astro
---
// src/components/ZurichErfahrungsraum.astro
import { getEntry } from 'astro:content';
const data = (await getEntry('zurichSektionen', 'erfahrungsraum'))?.data;
if (!data) throw new Error('erfahrungsraum.yaml nicht gefunden');
---

<section class="py-12 md:py-16 px-6 md:px-12 bg-surface-lo">
  <div class="max-w-page mx-auto">
    <div class="flex flex-col md:flex-row-reverse gap-12 lg:gap-20 items-center">
      <div class="w-full md:w-[45%] shrink-0">
        <div class="rounded-card overflow-hidden aspect-[4/3]">
          <img src={data.image} alt={data.imageAlt} class="w-full h-full object-cover object-center" />
        </div>
      </div>
      <div class="w-full md:w-[55%]">
        <span class="font-sans font-bold tracking-[0.2em] uppercase text-xs text-sage mb-5 block">{data.label}</span>
        <h2 class="font-serif font-black text-forest text-3xl md:text-4xl mb-8 tracking-tight">{data.heading}</h2>
        <div class="space-y-4 font-sans text-stone text-base md:text-lg leading-[1.75]">
          {data.paragraphs.map((p) => <p>{p}</p>)}
          {data.highlight && <p class="font-medium text-forest">{data.highlight}</p>}
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Schritt 8: ZurichUeberDaniel.astro auf YAML umstellen**

```astro
---
// src/components/ZurichUeberDaniel.astro
import { getEntry } from 'astro:content';
const data = (await getEntry('zurichSektionen', 'ueber'))?.data;
if (!data) throw new Error('ueber.yaml nicht gefunden');
---

<section id="ueber" class="py-12 md:py-16 max-w-page mx-auto px-6 md:px-12">
  <div class="flex flex-col md:flex-row gap-16 items-center">
    <div class="w-full md:w-2/5 shrink-0">
      <div class="rounded-card overflow-hidden aspect-[4/5] bg-surface-mid relative">
        <img src={data.image} alt={data.imageAlt} class="w-full h-full object-cover" onerror="this.style.display='none'" />
      </div>
    </div>
    <div class="w-full md:w-3/5">
      <h2 class="font-serif font-black text-forest text-4xl md:text-5xl mb-8 tracking-tight">{data.heading}</h2>
      <div class="font-sans text-stone text-lg space-y-5 leading-[1.75] mb-12">
        {data.paragraphs.map((p) => <p>{p}</p>)}
      </div>
      {data.stats && (
        <div class="grid grid-cols-3 gap-4 md:gap-6">
          {data.stats.map((s: {zahl: string, label: string}) => (
            <div>
              <p class="font-serif font-black text-forest text-3xl md:text-5xl mb-1">{s.zahl}</p>
              <p class="font-sans text-stone text-[10px] md:text-xs uppercase tracking-widest font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</section>
```

- [ ] **Schritt 9: Build testen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -20
```

Erwartet: Build clean, alle 4 Zürich-Komponenten nutzen YAML

- [ ] **Schritt 10: Commit**

```bash
cd ~/code/DanHealingArts && git add src/content/zurichSektionen/ src/components/ZurichMethode.astro src/components/ZurichWasEntwickelst.astro src/components/ZurichErfahrungsraum.astro src/components/ZurichUeberDaniel.astro && git commit -m "feat: zürich components now read from YAML"
```

---

## Task 3: Trainings-Daten → Content Collection

**Files:**
- Create: `src/content/trainings/portugal-2026.yaml`
- Create: `src/content/trainings/spain-2026.yaml`
- Create: `src/content/trainings/zuerich-l1a-2026.yaml`
- Create: `src/content/trainings/zuerich-l1b-2026.yaml`
- Create: `src/content/trainings/mazunte-2027.yaml`
- Modify: `src/pages/dates.astro`
- Modify: `src/pages/level-1.astro` (import)
- Delete: `src/data/trainings.ts` (nach Migration)

- [ ] **Schritt 1: YAML-Dateien für alle Trainings erstellen**

```yaml
# src/content/trainings/zuerich-l1a-2026.yaml
title: "Level 1a — Rücken & Nacken"
date: "18–19 April 2026"
location: "Zürich, Switzerland"
level: "Level 1a"
href: "/zurich"
image: "/images/zurich/hero.jpg"
show_on_homepage: true
```

```yaml
# src/content/trainings/spain-2026.yaml
title: "An Evolution of Sensitivity"
date: "10–16 May 2026"
location: "Alpujarra, Spain"
level: "Level 2"
href: "/spain"
image: "/images/spain/hero.jpg"
show_on_homepage: false
```

```yaml
# src/content/trainings/portugal-2026.yaml
title: "The Essence of Deep Touch"
date: "1–7 June 2026"
location: "Near Lisbon, Portugal"
level: "Level 1"
href: "/portugal"
image: "/images/portugal/hero.jpg"
show_on_homepage: true
```

```yaml
# src/content/trainings/zuerich-l1b-2026.yaml
title: "Level 1b — Bauch, Becken, Beine"
date: "13–14 June 2026"
location: "Zürich, Switzerland"
level: "Level 1b"
href: "/zurich"
image: "/images/zurich/hero-l1b.jpg"
show_on_homepage: true
```

```yaml
# src/content/trainings/mazunte-2027.yaml
title: "The Essence of Deep Touch"
date: "24–30 January 2027"
location: "Mazunte, México"
level: "Level 1"
href: "/mazunte"
image: "/images/mazunte/hero.jpg"
show_on_homepage: false
```

- [ ] **Schritt 2: dates.astro auf getCollection umstellen**

```astro
---
// src/pages/dates.astro — nur Frontmatter ändern
import { getCollection } from 'astro:content';
// ... andere imports bleiben gleich ...

const allTrainings = await getCollection('trainings');
const trainings = allTrainings.map(t => t.data).sort((a, b) => {
  // Sortierung nach Jahr (einfach: alphabetisch nach date-String reicht für aktuellen Datenbestand)
  return a.date.localeCompare(b.date);
});
---
```

- [ ] **Schritt 3: level-1.astro Trainings-Import anpassen**

In `src/pages/level-1.astro` den Import ersetzen:
```astro
// VORHER:
import { trainings } from '../data/trainings';
const level1Trainings = trainings.filter(t => ['Level 1', 'Level 1a', 'Level 1b'].includes(t.level));

// NACHHER:
import { getCollection } from 'astro:content';
const allTrainings = await getCollection('trainings');
const level1Trainings = allTrainings
  .map(t => t.data)
  .filter(t => ['Level 1', 'Level 1a', 'Level 1b'].includes(t.level));
```

- [ ] **Schritt 4: data/trainings.ts löschen (erst nach erfolgreichem Build)**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -5
# Nur wenn Build clean:
rm src/data/trainings.ts
npm run build 2>&1 | tail -5
```

- [ ] **Schritt 5: Commit**

```bash
cd ~/code/DanHealingArts && git add src/content/trainings/ src/pages/dates.astro src/pages/level-1.astro && git rm src/data/trainings.ts && git commit -m "feat: trainings data moved to content collection"
```

---

## Task 4: EN-Startseite und About-Dan → YAML

**Files:**
- Create: `src/content/pages/en.yaml`
- Create: `src/content/pages/about-dan.yaml`
- Modify: `src/pages/en.astro`
- Modify: `src/pages/about-dan.astro`

- [ ] **Schritt 1: en.yaml erstellen**

```yaml
# src/content/pages/en.yaml
page_title: "Dan Healing Arts — Learn to Listen with Your Hands"
page_description: "Immersive trainings in deep, slow somatic bodywork — woven with presence, curiosity and care. A professional pathway in fascia-based bodywork."
hero:
  badge: "Dan Healing Arts"
  heading: "Learn to Listen\nwith Your Hands"
  subheading: "Immersive trainings in deep, slow somatic bodywork — woven with presence, curiosity and care. A professional pathway rooted in fascia and deep tissue work that transforms how you touch and how you listen."
  image: "/images/daniel-bodywork.jpg"
  imageAlt: "Daniel Wendt giving a deep somatic bodywork session"
  cta_text: "Explore Trainings"
  cta_href: "/dates"
sections:
  - id: intro
    paragraphs:
      - "Discover the transformative power of deep and slow somatic bodywork, both for giver and receiver, and fully connect to yourself and others - in sessions and in everyday life."
      - "Embark on a profound journey into your own and others' depths, and learn a full-on practical approach to touch and taking care of the human body - on a physical, emotional and energetic level."
      - "Learn to listen, not just with your ears but with your hands and your whole being, and cultivate the ability to create a space of deep mutual connection and trust - with your clients and your loved ones."
      - "Unleash your potential and support others in doing the same, by releasing stuck emotions, stagnant energy and subconscious patterns in the most natural and safe way - at the unique rhythm of the nervous system."
stats:
  - number: "18"
    label: "Years of experience"
  - number: "20+"
    label: "Training courses"
  - number: "2,500+"
    label: "Hours taught"
```

- [ ] **Schritt 2: about-dan.yaml erstellen**

```yaml
# src/content/pages/about-dan.yaml
page_title: "About Dan — Dan Healing Arts"
page_description: "Meet Daniel Wendt — Myofascial Somatic Release Practitioner and teacher with 18 years of experience guiding people to reconnect with their bodies and lives."
hero:
  badge: "Founder & Trainer"
  heading: "Daniel Wendt"
  image: "/images/daniel-portrait.jpg"
  imageAlt: "Daniel Wendt — Dan Healing Arts"
stats:
  - number: "18"
    label: "Years in bodywork & yoga"
  - number: "20+"
    label: "Bodywork training courses"
  - number: "2,500+"
    label: "Hours of yoga teacher training"
sections:
  - id: bio_intro
    paragraphs:
      - "By nature more of an adventurer and explorer than a philosopher, I have always sought direct, clearly perceptible experiences in my life. From backpacking to construction work, from rap stages to real estate companies, from hitchhiking around the world to founding a family with two wonderful children."
      - "I found freedom, peace and inspiration when I started diving deep into bodywork and yoga over 17 years ago, and was gradually able to leave behind many limiting beliefs and conventional norms."
      - "In my courses, treatments, trainings and retreats, I teach a unique fusion of fascia release, deep tissue massage and energy work. In a safe setting I invite you to experience your own body as an infinite space of experience."
  - id: background
    heading: "Training & Background"
    image: "/images/about/dan-teaching.jpg"
    imageAlt: "Daniel Wendt teaching at a bodywork training"
    paragraphs:
      - "Over the past 18 years, Daniel has trained with teachers across traditions — weaving together somatic intelligence, myofascial anatomy, breathwork, and energetic awareness into a single, unified approach."
      - "He has led over 20 professional bodywork training courses internationally, guided thousands of hours of yoga teacher training, and offered private sessions to hundreds of individuals seeking deeper embodiment and release."
      - "His approach is practical, grounded and deeply somatic — always returning to direct experience as the primary teacher."
```

- [ ] **Schritt 3: en.astro Hero-Sektion auf YAML umstellen**

Im Frontmatter von `src/pages/en.astro` hinzufügen:
```astro
import { getEntry } from 'astro:content';
const pageData = (await getEntry('pages', 'en'))?.data;
if (!pageData) throw new Error('en.yaml nicht gefunden');
```

Dann im `<Layout>` die title/description ersetzen:
```astro
<Layout
  lang="en"
  title={pageData.page_title}
  description={pageData.page_description}
  canonicalPath="/"
>
```

Hero-Sektion im Template ersetzen:
```astro
<h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main leading-[1.1] mb-6">
  {pageData.hero.heading.split('\n').map((line, i) => (
    <>{line}{i === 0 && <br />}</>
  ))}
</h1>
<p class="font-sans text-stone text-lg leading-relaxed max-w-lg mb-10">
  {pageData.hero.subheading}
</p>
```

Intro-Paragraphen:
```astro
{pageData.sections?.find(s => s.id === 'intro')?.paragraphs.map((p) => (
  <p class="font-sans text-text-main text-lg md:text-xl leading-relaxed">{p}</p>
))}
```

- [ ] **Schritt 4: about-dan.astro auf YAML umstellen (gleiche Vorgehensweise)**

Im Frontmatter:
```astro
import { getEntry } from 'astro:content';
const pageData = (await getEntry('pages', 'about-dan'))?.data;
if (!pageData) throw new Error('about-dan.yaml nicht gefunden');
```

Layout title/description + Hero heading/badge/image aus `pageData` lesen. Stats-Grid aus `pageData.stats`.

- [ ] **Schritt 5: Build testen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -20
```

- [ ] **Schritt 6: Commit**

```bash
cd ~/code/DanHealingArts && git add src/content/pages/en.yaml src/content/pages/about-dan.yaml src/pages/en.astro src/pages/about-dan.astro && git commit -m "feat: en and about-dan pages read from YAML"
```

---

## Task 5: About-the-Work, Sessions, Massage → YAML

**Files:**
- Create: `src/content/pages/about-the-work.yaml`
- Create: `src/content/pages/sessions.yaml`
- Create: `src/content/pages/massage.yaml`
- Modify: `src/pages/about-the-work.astro`
- Modify: `src/pages/sessions.astro`
- Modify: `src/pages/massage.astro`

- [ ] **Schritt 1: about-the-work.yaml erstellen**

```yaml
# src/content/pages/about-the-work.yaml
page_title: "About the Work — Dan Healing Arts"
page_description: "Myofascial Somatic Liberation — a holistic approach to deep, slow bodywork where presence and sensitivity open space for profound emotional release and transformation."
hero:
  heading: "Myofascial Somatic Liberation"
  subheading: "A holistic approach to deep, slow and nuanced bodywork."
  image: "/images/about/work-hero.jpg"
  imageAlt: "Daniel Wendt practicing myofascial somatic bodywork"
  paragraphs:
    - "Myofascial Somatic Liberation is a holistic approach to deep, slow and nuanced bodywork — where presence, sensitivity and depth open space for profound emotional release and inner transformation."
    - "At its core, this work is a unique and well-balanced blend of myofascial release, deep tissue massage, and energy work. It brings playful ease into therapeutic depth, grounding mystical insight in the physical tissue through a bridge of modern anatomy."
    - "It is a method designed to relieve chronic tension, pain, and deeply held emotional patterns — all while honoring the natural rhythm of your nervous system and supporting your body's primal needs."
    - "This naturally leads us to two essential elements for applying deep touch: slowness and simplicity."
sections:
  - id: slowness
    heading: "The Power of Slowness"
    image: "/images/about/daniel-7165.jpg"
    imageAlt: "Deep slow bodywork session demonstrating the power of presence and slowness"
    reversed: true
    paragraphs:
      - "Slowness is the most powerful tool for guiding the body out of protective patterns and into a parasympathetic state, where rest, regulation, and a deep sense of safety emerge. It invites trust, not only between giver and receiver, but also within the body itself. From that trust, the release of held emotion and stagnant energy unfolds naturally."
      - "At the same time, the body's connective tissue — the fascia — requires time to feel, respond, and reorganize. It opens when it's met with presence. Through slowing down, we give the system space to adapt and unwind. Muscular tension and subtle patterns of resistance begin to soften — not because we push through them, but because we listen."
      - "By allowing the body to set the pace, we are guided into deeper layers that would otherwise remain hidden, creating the conditions for real transformation to occur."
  - id: simplicity
    heading: "The Ease of Simplicity"
    image: "/images/about/massage-25.jpg"
    imageAlt: "Close-up of hands working on the neck demonstrating the ease and simplicity of deep bodywork"
    reversed: false
    paragraphs:
      - "True depth comes not from complexity, but from simplicity and attunement. We don't need to create complicated techniques and sequences or get lost in an over-intellectualized approach to anatomy. Instead, we learn to follow the body's natural structures — muscle pathways, fascial lines, bones, joints, ligaments, and energy channels — which clearly reveal themselves when we slow down, listen, and feel."
      - "This work is never mechanical. It requires moment-to-moment listening, a dance between your hands, your presence, and the subtle intelligence within the body. It's about sensing the unique physical and energetic landscape beneath your hands, and how touching someone also affects you."
parallax_image: "/images/about/learning-banner.jpg"
```

- [ ] **Schritt 2: sessions.yaml erstellen**

```yaml
# src/content/pages/sessions.yaml
page_title: "Somatic Deep Tissue Bodywork — Private Sessions with Daniel Wendt"
page_description: "Deep, slow bodywork with Daniel Wendt. Myofascial work that reaches beyond muscles and fascia — touching the nervous system and emotional body. Zürich & worldwide."
hero:
  badge: "Private Sessions"
  heading: "Touch that listens."
  subheading: "Deep, slow bodywork that reaches beyond muscles and fascia — touching the nervous system and emotional body. Each session is an individual process, held in presence and trust."
  image: "/images/daniel-bodywork.jpg"
  imageAlt: "Daniel Wendt offering private somatic bodywork session"
  cta_text: "Book a Session"
  cta_href: "/contact"
sections:
  - id: what_is
    heading: "What is Somatic Deep Tissue Bodywork?"
    image: "/images/sessions/what-is.jpg"
    imageAlt: "Deep tissue bodywork session — slow, precise touch"
    reversed: false
    paragraphs:
      - "Somatic Deep Tissue Bodywork is a form of deep, slow and emotionally attuned bodywork that works not only with muscles and fascia, but with the nervous system and emotional body."
      - "Sessions integrate myofascial release, deep tissue techniques, breathwork and energetic awareness — meeting each person where they are, at the natural rhythm of their system."
      - "The work invites genuine release — not only of physical tension, but of emotional patterns that have been stored in the tissue over time."
  - id: what_to_expect
    heading: "What to Expect"
    image: "/images/sessions/expect.jpg"
    imageAlt: "Private session space — warm, grounded, held"
    reversed: true
    paragraphs:
      - "Each session is 90 or 120 minutes and begins with a brief conversation to understand what you're carrying and what you need."
      - "You'll be fully clothed or draped, working on a massage table. The session unfolds at a slow, receptive pace — following what emerges rather than following a fixed protocol."
      - "After the session, time is held for integration — to rest, breathe, and allow the work to settle."
  - id: for_whom
    heading: "Who Is This For?"
    image: "/images/sessions/for-whom.jpg"
    imageAlt: "Hands on back — bodywork session"
    reversed: false
    paragraphs:
      - "These sessions are for anyone feeling called to receive deep, presence-based touch — whether you're dealing with chronic tension, emotional overwhelm, a sense of disconnection, or simply a desire to come home to your body."
      - "No prior experience with bodywork is needed. Sessions are open to all genders and backgrounds."
```

- [ ] **Schritt 3: massage.yaml erstellen (DE)**

```yaml
# src/content/pages/massage.yaml
page_title: "Somatische Tiefenmassage — Einzelsitzungen mit Daniel Wendt"
page_description: "Tiefe, langsame Körperarbeit mit Daniel Wendt in Zürich. Myofasziale Arbeit, die Muskeln, Faszien, Nervensystem und den emotionalen Körper erreicht. 90 min / 120 min."
hero:
  badge: "Einzelsitzungen"
  heading: "Berührung, die tief hört."
  subheading: "Eine tiefe, langsame Körperarbeit, die Muskeln, Faszien und das Nervensystem erreicht. Jede Sitzung ist ein individueller Prozess — gehalten in Präsenz und Vertrauen."
  image: "/images/daniel-bodywork.jpg"
  imageAlt: "Daniel Wendt bei der somatischen Tiefenmassage"
  cta_text: "Termin anfragen"
  cta_href: "/contact"
sections:
  - id: was_ist
    heading: "Was ist Somatische Tiefenmassage?"
    image: "/images/massage/was-ist.jpg"
    imageAlt: "Somatische Tiefenmassage — langsame, präzise Berührung"
    reversed: false
    paragraphs:
      - "Die somatische Tiefenmassage ist eine Form tiefer, langsamer und emotional zugewandter Körperarbeit, die nicht nur mit Muskeln und Faszien arbeitet, sondern auch das Nervensystem und den emotionalen Körper erreicht."
      - "Sitzungen integrieren myofasziales Release, Tiefengewebstechniken, Atemarbeit und energetisches Gewahrsein — jede Person dort abholen, wo sie steht, im natürlichen Rhythmus ihres Systems."
      - "Die Arbeit lädt zur echten Lösung ein — nicht nur von körperlicher Spannung, sondern auch von emotionalen Mustern, die sich im Laufe der Zeit im Gewebe festgesetzt haben."
  - id: ablauf
    heading: "Ablauf einer Sitzung"
    image: "/images/massage/ablauf.jpg"
    imageAlt: "Sitzungsraum — warm, geerdet, gehalten"
    reversed: true
    paragraphs:
      - "Jede Sitzung dauert 90 oder 120 Minuten und beginnt mit einem kurzen Gespräch, um zu verstehen, was du trägst und was du brauchst."
      - "Du liegst bekleidet oder abgedeckt auf einer Massageliege. Die Sitzung entfaltet sich in einem langsamen, aufnahmefähigen Tempo — dem folgend, was sich zeigt, anstatt einem festen Protokoll."
      - "Nach der Sitzung wird Zeit für Integration gehalten — um zu ruhen, zu atmen und der Arbeit zu erlauben, sich zu setzen."
  - id: preise
    heading: "Preise & Buchung"
    image: "/images/massage/preise.jpg"
    imageAlt: "Massage Preise und Buchung"
    reversed: false
    paragraphs:
      - "90 Minuten: CHF 180 | 120 Minuten: CHF 230"
      - "Ort: Zürich (genaue Adresse nach Buchungsbestätigung)"
      - "Buchungsanfragen bitte per E-Mail oder über das Kontaktformular."
```

- [ ] **Schritt 4: Alle 3 Astro-Seiten auf YAML umstellen**

Für alle 3 Seiten gleiche Vorgehensweise wie in Task 4:
1. `getEntry('pages', 'about-the-work')` / `'sessions'` / `'massage'` im Frontmatter
2. `page_title` + `page_description` in `<Layout>`-Props
3. Hero-Felder aus `pageData.hero`
4. Sektions-Texte aus `pageData.sections`

- [ ] **Schritt 5: Build testen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -20
```

- [ ] **Schritt 6: Commit**

```bash
cd ~/code/DanHealingArts && git add src/content/pages/ src/pages/about-the-work.astro src/pages/sessions.astro src/pages/massage.astro && git commit -m "feat: about-the-work, sessions, massage read from YAML"
```

---

## Task 6: Retreat-Seiten → YAML (portugal + mazunte)

**Files:**
- Create: `src/content/retreats/portugal.yaml`
- Create: `src/content/retreats/mazunte.yaml`
- Modify: `src/pages/portugal.astro`
- Modify: `src/pages/mazunte.astro`

- [ ] **Schritt 1: portugal.yaml erstellen**

```yaml
# src/content/retreats/portugal.yaml
page_title: "Portugal Retreat — The Essence of Deep Touch | Dan Healing Arts"
page_description: "A 7-day immersive training in fascia release, deep tissue massage and nervous system attunement. Portugal, 1–7 June 2026."
og_image: "/images/portugal/hero.jpg"
hero:
  location_badge: "Portugal · Level 1"
  heading: "The Essence of Deep Touch"
  level_text: "Level 1"
  level_href: "/level-1"
  dates: "Portugal · 1 – 7 June, 2026"
  subtitle: "A 7-day immersive training in fascia release, deep tissue massage and nervous system attunement."
  image: "/images/portugal/hero.jpg"
  imageAlt: "Portugal retreat — The Essence of Deep Touch"
video:
  youtube_id: "6X1a70jgbM0"
  title: "Real moments from the Portugal Training"
sections:
  - id: learning_art
    heading: "Learning the Art of Deep Touch"
    image: "/images/portugal/learning-art.jpg"
    imageAlt: "Learning the art of deep touch — hands-on bodywork"
    reversed: false
    paragraphs:
      - "**The Essence of Deep Touch** is an immersive **professional training in fascia-based bodywork.** It offers the Level 1 training program of the Myofascial Somatic Liberation pathway."
      - "Over the course of a week, you will learn how to offer deep, slow and emotionally attuned massage sessions that work not only with muscles and fascia, but with the nervous system and emotional body."
      - "Alongside learning practical hands-on techniques, you will also receive nourishing touch each day, allowing you to experience the work within your own system."
      - "Through this reciprocal process, the body softens, perception deepens, and a natural understanding begins to emerge of how to support others through touch."
  - id: training_experience
    heading: "The Training Experience"
    image: "/images/portugal/training-experience.jpg"
    imageAlt: "The training experience — somatic bodywork practice"
    reversed: true
    paragraphs:
      - "This training invites you to slow down, listen deeply, and enter the landscape of the body with care and precision."
      - "You'll learn to offer full-body touch that is structurally and anatomically grounded, drawing from myofascial release and deep tissue techniques while remaining sensitive to the nervous system and emotional responses that can unfold through touch."
      - "Alongside these hands-on techniques, the training cultivates the subtle skills of presence, listening and energetic awareness that allow sessions to become deeply restorative and transformative."
      - "During this week you will develop **both the practical skills and the embodied sensitivity needed to begin offering this work to others.**"
  - id: experiential
    heading: null
    image: "/images/portugal/experiential.jpg"
    imageAlt: "Experiential learning — hands-on bodywork practice"
    reversed: false
    show_apply_button: true
    paragraphs:
      - "The learning is highly experiential and hands-on. Each day, you will observe, give, and receive two full bodywork sessions, giving you extensive hands-on practice."
      - "Through this rhythm of practicing and being worked on, your system becomes more receptive and your hands gradually become more refined and precise, learning to respond to what they meet in the body."
      - "Daily practices such as yoga, meditation, breathwork, voice work and ceremonial spaces support integration, allowing what moves through the body to land gently and sustainably."
  - id: field_1
    heading: "The Field We Practice In"
    image: "/images/portugal/field-1.jpg"
    imageAlt: "Bodywork session in the Garden Shala at The Shanti Space, Portugal"
    reversed: false
    paragraphs:
      - "This training takes place within a warm, grounded and playful group field, where learning happens not only through instruction, but through direct experience — through touch, presence and the body's natural capacity to release and reorganize."
      - "It is not only about learning how to touch, but also about remembering how to listen."
  - id: field_2
    heading: null
    image: "/images/portugal/field-2.jpg"
    imageAlt: "Deep bodywork practice session at the Portugal training"
    reversed: true
    paragraphs:
      - "Anatomy is explored directly through touch, learning on the body rather than only through theory. As you work with the structure of the fascia, anatomical understanding becomes increasingly tangible and grounded in your hands."
      - "In this relational space, connection deepens — with your own body, with others, and with the deeper intelligence that lives beneath the surface."
      - "More than simply a training, the week becomes a gradual spiraling process of opening, unwinding and empowerment."
  - id: venue
    heading: "The Space That Holds the Work"
    image: "/images/portugal/venue-1.jpg"
    imageAlt: "The Shanti Space — outdoor venue near Lisbon"
    reversed: true
    paragraphs:
      - "Nestled in nature just 30 minutes from Lisbon, The Shanti Space offers a safe and beautiful container for deep emotional and physical exploration."
      - "Surrounded by rolling hills, quiet walking paths, and open skies, the land itself supports slowing down, sensing inward, and reconnecting with natural rhythms."
      - "The venue, an old Quinta set in a national park, is endowed with beautiful fruit trees, giant oak corks, grape vines, vistas and a stream at the end of the garden."
      - "The Garden Shala is a beautiful converted glass Victorian Greenhouse, a great workshop space along with an incredible outdoor yoga deck overlooking the valley of high trees."
      - "Between sessions, there is space to walk, breathe, integrate, and simply be — allowing the work to settle beyond the mat and table."
      - "Location: [www.theshantispace.com](http://www.theshantispace.com/)"
  - id: nourished
    heading: "Held & Nourished"
    image: "/images/portugal/food.jpg"
    imageAlt: "Nourishing food prepared with care at the Portugal retreat"
    reversed: false
    paragraphs:
      - "Throughout the retreat, you'll be nourished with three daily meals prepared with care, love and vitality by our amazing chef Zoe ([www.wild-delicacies.com](https://www.wild-delicacies.com/))"
      - "The food is nutrition-dense, gluten-free, and designed to support deep physical and emotional work - grounding the nervous system while keeping the body clear, and well-fueled."
      - "Meals are made from fresh, seasonal ingredients and thoughtfully balanced to sustain energy, aid digestion, and support the body's natural rhythms."
      - "Shared meals also become moments of connection and integration - time to rest, digest, and gently transition between inner work and daily life."
  - id: for_whom
    heading: "Who Is This Training For"
    image: "/images/portugal/gallery-3.jpg"
    imageAlt: "Portugal retreat — outdoor training space at The Shanti Space"
    reversed: false
    show_apply_button: true
    paragraphs:
      - "This is for anyone drawn to explore the power of deep, slow and profound emotional bodywork."
      - "It is open to those new to bodywork as well as experienced practitioners who wish to bring more depth, clarity, and presence into their work."
      - "If you are curious about how touch can support emotional release, nervous system regulation, and embodied awareness, and if you value learning through direct experience rather than theory alone, this training offers a supportive place to begin or deepen your path."
      - "**Please note: This training is designed to touch deeply and to be deeply touched. A respectful presence and clear boundaries are essential.**"
what_you_receive:
  heading: "What You'll Receive"
  image: "/images/portugal/gallery-2.jpg"
  imageAlt: "Portugal training — participants in the practice space"
  items:
    - "7 days/ 6 nights accommodation"
    - "3 daily nourishing meals"
    - "Daily bodywork/massage lessons and practice sessions"
    - "Daily yoga, meditation, breathwork, and voice work"
    - "Integration circles, kirtan and ceremonial spaces"
    - "Course manual"
    - "Video recordings of all bodywork sequences"
    - "Certificate of completion"
    - "Pre- and post-retreat support"
pricing:
  heading: "Your Stay at The Shanti Space"
  intro:
    - "A range of comfortable accommodation options are available on-site, allowing you to fully immerse yourself in the retreat experience."
    - "**All options include full participation in the training, meals, and practices.** Also included are the Training Manual, Video Recordings of all bodywork sequences, a Certificate of Completion and a Group Zoom Integration Call."
    - "After your application, I'll personally confirm availability and next steps."
    - "Choose the room option that feels right for you below."
  cards:
    - title: "Spacious Shared Dorm (6 people max.)"
      image: "/images/portugal/room-dorm.png"
      early_price: 1549
      early_label: "Regular"
      early_deadline: "until 30. April 2026"
      regular_price: 1749
      regular_label: "Late Bird from 1. May 2026"
      currency: "€ "
    - title: "Shared Twin Room / shared bathroom"
      image: "/images/portugal/room-twin-shared.jpg"
      early_price: 1699
      early_label: "Early Bird"
      early_deadline: "until 30. April 2026"
      regular_price: 1849
      regular_label: "Regular"
      currency: "€ "
    - title: "Shared Twin Room / private bathroom"
      image: "/images/portugal/room-twin-private.jpg"
      early_price: 1799
      early_label: "Early Bird"
      early_deadline: "until 30. April 2026"
      regular_price: 1949
      regular_label: "Regular"
      currency: "€ "
    - title: "Private Single Glamping Tent / shared bathroom"
      image: "/images/portugal/room-glamping.jpeg"
      early_price: 1999
      early_label: "Early Bird"
      early_deadline: "until 30. April 2026"
      regular_price: 2149
      regular_label: "Regular"
      currency: "€ "
  closing: "Still unsure which option is right for you? Feel free to reach out with any questions."
closing_quote: "This training is an invitation to slow down, to listen, and to reconnect with the intelligence of touch - in yourself and in others. If you feel called, you're warmly welcome to join us."
```

- [ ] **Schritt 2: portugal.astro Frontmatter auf YAML umstellen**

```astro
---
// HINZUFÜGEN im Frontmatter:
import { getEntry } from 'astro:content';
const retreat = (await getEntry('retreats', 'portugal'))?.data;
if (!retreat) throw new Error('portugal.yaml nicht gefunden');
---
```

Dann `<Layout>` props ersetzen:
```astro
<Layout
  lang="en"
  title={retreat.page_title}
  description={retreat.page_description}
  canonicalPath="/portugal"
  ogImage={retreat.og_image}
>
```

Hero-Sektion: alle hardcodierten Texte durch `retreat.hero.heading`, `retreat.hero.dates` etc. ersetzen.

Video-Sektion: `retreat.video?.youtube_id` und `retreat.video?.title`

Sektionen per Map:
```astro
{retreat.sections.map((section) => (
  <FadeIn>
  <section class="py-12 md:py-16 px-6 md:px-12 bg-canvas">
    <div class="max-w-page mx-auto">
      <TextImageSection
        image={section.image}
        imageAlt={section.imageAlt}
        reversed={section.reversed}
      >
        {section.heading && (
          <h2 class="font-serif text-3xl md:text-4xl text-text-main mb-6">{section.heading}</h2>
        )}
        <div class="font-sans text-stone leading-relaxed space-y-4">
          {section.paragraphs.map((p) => <p set:html={p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-main">$1</strong>')} />)}
        </div>
        {section.show_apply_button && <ApplyButton />}
      </TextImageSection>
    </div>
  </section>
  </FadeIn>
))}
```

What You'll Receive + Pricing Cards aus YAML-Daten.

- [ ] **Schritt 3: mazunte.yaml erstellen**

Gleiche Struktur wie portugal.yaml, nur andere Inhalte:
- `location_badge: "Mazunte, Mexico · Level 1"`
- `dates: "Mexico · 24 – 30 January, 2027"`
- `youtube_id: "mB88cuuMA84"`
- `title: "Real moments from the Mazunte Training"`
- Venue-Sektion: Mazunte-spezifisch (direkt aus mazunte.astro extrahieren)
- Pricing: Mazunte-Preise (aus mazunte.astro extrahieren)

- [ ] **Schritt 4: mazunte.astro auf YAML umstellen (gleich wie portugal.astro)**

- [ ] **Schritt 5: Build testen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -20
```

- [ ] **Schritt 6: Commit**

```bash
cd ~/code/DanHealingArts && git add src/content/retreats/ src/pages/portugal.astro src/pages/mazunte.astro && git commit -m "feat: portugal and mazunte retreats read from YAML"
```

---

## Task 7: Retreat-Seiten → YAML (spain + tulum + level-1 + level-2)

**Files:**
- Create: `src/content/retreats/spain.yaml`
- Create: `src/content/retreats/tulum.yaml`
- Create: `src/content/retreats/level-1.yaml`
- Create: `src/content/retreats/level-2.yaml`
- Modify: `src/pages/spain.astro`
- Modify: `src/pages/tulum.astro`
- Modify: `src/pages/level-1.astro`
- Modify: `src/pages/level-2.astro`

- [ ] **Schritt 1: spain.yaml + tulum.yaml erstellen**

Gleiche Struktur wie portugal.yaml. Inhalte direkt aus spain.astro und tulum.astro extrahieren.

Für spain.yaml:
- `page_title`: aus spain.astro `<Layout title=...>`
- `location_badge`: aus Hero-Sektion
- Alle Sektionen mit Texten aus spain.astro
- Pricing: Spain-spezifische Preise

Für tulum.yaml (falls Seite existiert): analog.

- [ ] **Schritt 2: level-1.yaml erstellen**

```yaml
# src/content/retreats/level-1.yaml
page_title: "Level 1: The Essence of Deep Touch — Dan Healing Arts"
page_description: "The foundational training in a professional two-level pathway in fascia-based somatic bodywork. Learn deep touch, myofascial release, and the psycho-emotional language of the body."
hero:
  badge: "Level 1 Training"
  heading: "The Essence of Deep Touch"
  subheading: "The foundational training in a professional two-level pathway in fascia-based somatic bodywork."
  image: "/images/level1/hero.jpg"
  imageAlt: "Level 1 bodywork training participants practicing deep touch"
  paragraphs:
    - "The Essence of Deep Touch is the foundational training in a professional two-level pathway in fascia-based somatic bodywork. It can later be followed by the advanced Level 2 training."
    - "The Training invites you into a grounded, somatic approach to deep, slow bodywork - woven with presence, curiosity and care. It's also a journey of self-exploration, opening space to feel and be felt more deeply."
    - "You'll learn how to work with muscles and fascia through the principles of deep touch, while gaining insight into the emotional qualities stored within different body regions. Physical, energetic, and psycho-emotional layers are all part of the unfolding."
learn_topics:
  - "The foundational principles of deep bodywork through muscle and fascia"
  - "An overview of the key fascial lines and how to access them through touch"
  - "The psycho-emotional language of the body - how different areas hold stories and patterns"
  - "Cultivating connection with yourself to enhance your ability to hold presence and connection with clients throughout a session"
  - "Applying pressure with sensitivity: long, deep, and slow strokes that invite safety and openness for physical and emotional release"
  - "How to read the body, listen with your hands and follow its natural architecture, rhythms, and signals"
  - "Bridging modern anatomy with traditional spiritual wisdom, making subtle energy accessible and tangible"
  - "Using your bodyweight efficiently to offer deep touch in a gentle, sustainable way"
  - "Crafting sessions and sequences for different purpose, tailored for release and healing"
  - "The art of slowing down - not only in treatments, but in life itself"
  - "Hands-on learning about fascia, trigger points, and energy dynamics"
  - "Structured sequences that support intuition, clarity, and creative flow"
body_regions:
  - area: "Upper back, lower back, neck"
    theme: "Looking back on the past to move forward"
  - area: "Legs, feet"
    theme: "Grounding into Mother Earth"
  - area: "Abdomen, hips, pelvis"
    theme: "Unleash your potential"
  - area: "Thorax, chest, shoulders, arms"
    theme: "Expansion of the heart"
  - area: "Head, face, throat, neck"
    theme: "Sky as space in your head"
sections:
  - id: about_level1
    heading: "What is Level 1?"
    image: "/images/level1/practice.jpg"
    imageAlt: "Level 1 participants in practice"
    reversed: false
    paragraphs:
      - "Level 1 — The Essence of Deep Touch — is the entry point into the Myofascial Somatic Liberation pathway. It is a complete training in itself, offering a thorough grounding in fascia-based bodywork and somatic practice."
      - "Whether you are brand new to professional bodywork or are an experienced practitioner looking to deepen your approach, Level 1 offers a rich, embodied foundation."
```

- [ ] **Schritt 3: level-2.yaml erstellen**

Alle Texte, Elements-Daten (Earth/Water/Fire/Air/Space) aus level-2.astro extrahieren:

```yaml
# src/content/retreats/level-2.yaml
page_title: "Level 2: An Evolution of Sensitivity — Dan Healing Arts"
# ... alle Texte aus level-2.astro extrahieren ...
elements:
  - element: "Earth"
    emotion: "Fear"
  - element: "Water"
    emotion: "Sadness"
  - element: "Fire"
    emotion: "Anger"
  - element: "Air"
    emotion: "Joy"
  - element: "Space"
    emotion: "Shame"
```

(SVG-Icons bleiben in der Astro-Komponente hardcodiert — sind kein editierbarer Inhalt)

- [ ] **Schritt 4: Alle 4 Astro-Seiten auf YAML umstellen**

Gleiche Vorgehensweise wie portugal.astro in Task 6.

- [ ] **Schritt 5: Build testen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -20
```

- [ ] **Schritt 6: Commit**

```bash
cd ~/code/DanHealingArts && git add src/content/retreats/ src/pages/spain.astro src/pages/tulum.astro src/pages/level-1.astro src/pages/level-2.astro && git commit -m "feat: spain, tulum, level-1, level-2 read from YAML"
```

---

## Task 8: .pages.yml — alle neuen Felder registrieren

**Files:**
- Modify: `.pages.yml`

- [ ] **Schritt 1: .pages.yml vollständig ersetzen**

```yaml
# .pages.yml
media:
  input: public/images
  output: /images

content:

  # ============================================================
  # ZÜRICH STARTSEITE — Sub-Sektionen
  # ============================================================

  - name: Zürich — Methode-Text
    label: "🏠 Zürich Startseite — Methode"
    path: src/content/zurichSektionen
    filename: methode
    type: file
    fields:
      - { label: "Label (oben)", name: label, widget: string }
      - { label: "Überschrift", name: heading, widget: string }
      - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - { label: "Hervorhebung (letzter Satz)", name: highlight, widget: string, required: false }

  - name: Zürich — Was du entwickelst
    label: "🏠 Zürich Startseite — Was du entwickelst"
    path: src/content/zurichSektionen
    filename: entwickelst
    type: file
    fields:
      - { label: "Label (oben)", name: label, widget: string }
      - { label: "Überschrift", name: heading, widget: string }
      - { label: "Bild", name: image, widget: image }
      - { label: "Bild-Beschreibung (Alt-Text)", name: imageAlt, widget: string }
      - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - { label: "Hervorhebung (letzter Satz)", name: highlight, widget: string, required: false }

  - name: Zürich — Erfahrungsraum
    label: "🏠 Zürich Startseite — Erfahrungsraum"
    path: src/content/zurichSektionen
    filename: erfahrungsraum
    type: file
    fields:
      - { label: "Label (oben)", name: label, widget: string }
      - { label: "Überschrift", name: heading, widget: string }
      - { label: "Bild", name: image, widget: image }
      - { label: "Bild-Beschreibung (Alt-Text)", name: imageAlt, widget: string }
      - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - { label: "Hervorhebung (letzter Satz)", name: highlight, widget: string, required: false }

  - name: Zürich — Über Daniel
    label: "🏠 Zürich Startseite — Über Daniel"
    path: src/content/zurichSektionen
    filename: ueber
    type: file
    fields:
      - { label: "Überschrift", name: heading, widget: string }
      - { label: "Portrait-Bild", name: image, widget: image }
      - { label: "Portrait Alt-Text", name: imageAlt, widget: string }
      - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - name: stats
        label: "Statistiken (3 Zahlen)"
        widget: list
        fields:
          - { label: "Zahl", name: zahl, widget: string }
          - { label: "Bezeichnung", name: label, widget: string }

  # ============================================================
  # ZÜRICH STARTSEITE — Hero (bereits vorhanden, nur Labels verbessern)
  # ============================================================

  - name: Zürich Hero
    label: "🏠 Zürich Startseite — Hauptbild & Titel"
    path: src/content/hero
    filename: zurich
    type: file
    fields:
      - { label: "Hauptüberschrift", name: headline, widget: string }
      - { label: "Untertext", name: subtext, widget: text }
      - { label: "Button-Text", name: cta_text, widget: string }
      - { label: "Button-Link", name: cta_link, widget: string }
      - { label: "Hauptbild", name: bild, widget: image }
      - { label: "Bild-Beschreibung (Alt-Text)", name: bildAlt, widget: string }

  # ============================================================
  # ZÜRICH KURSE (bereits vorhanden)
  # ============================================================

  - name: Zürich Kurse
    label: "📅 Zürich — Kurs-Details (4 Module)"
    path: src/content/courses
    type: collection
    fields:
      - { label: "Nummer", name: nr, widget: string }
      - { label: "Titel", name: titel, widget: string }
      - { label: "Motto", name: motto, widget: string }
      - { label: "Datum", name: datum, widget: string }
      - { label: "Beschreibung", name: beschreibung, widget: text }
      - { label: "Schwerpunkte", name: schwerpunkte, widget: list, field: { label: "Punkt", name: punkt, widget: string } }
      - { label: "Buchungslink", name: link, widget: string }
      - { label: "Bild", name: bild, widget: image }
      - { label: "Bild Alt-Text", name: bildAlt, widget: string }
      - { label: "Bild-Position (z.B. center top)", name: bildPos, widget: string }
      - { label: "Bild links?", name: bildLinks, widget: boolean }

  # ============================================================
  # TRAININGS (Termine-Übersicht)
  # ============================================================

  - name: Termine
    label: "📅 Alle Trainings & Termine"
    path: src/content/trainings
    type: collection
    fields:
      - { label: "Titel", name: title, widget: string }
      - { label: "Datum", name: date, widget: string }
      - { label: "Ort", name: location, widget: string }
      - { label: "Level", name: level, widget: string }
      - { label: "Link (z.B. /portugal)", name: href, widget: string }
      - { label: "Vorschaubild", name: image, widget: image }
      - { label: "Auf Startseite zeigen?", name: show_on_homepage, widget: boolean }

  # ============================================================
  # TESTIMONIALS (bereits vorhanden)
  # ============================================================

  - name: Testimonials
    label: "💬 Testimonials"
    path: src/content/testimonials
    type: collection
    fields:
      - { label: "Name", name: name, widget: string }
      - { label: "Herkunft", name: location, widget: string }
      - { label: "Zitat", name: quote, widget: text }
      - { label: "Foto (optional)", name: photo, widget: image, required: false }

  # ============================================================
  # RETREAT SEITEN
  # ============================================================

  - name: Portugal Retreat
    label: "🌿 Portugal Retreat"
    path: src/content/retreats
    filename: portugal
    type: file
    fields:
      - { label: "Seiten-Titel (Browser-Tab)", name: page_title, widget: string }
      - { label: "Seiten-Beschreibung (Google)", name: page_description, widget: text }
      - { label: "Vorschaubild (Social Media)", name: og_image, widget: image }
      - name: hero
        label: "Hero-Bereich oben"
        widget: object
        fields:
          - { label: "Ort-Badge (z.B. Portugal · Level 1)", name: location_badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Datum (z.B. Portugal · 1 – 7 June, 2026)", name: dates, widget: string }
          - { label: "Untertitel", name: subtitle, widget: text }
          - { label: "Hauptbild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
      - name: video
        label: "Video-Sektion"
        widget: object
        required: false
        fields:
          - { label: "YouTube ID (z.B. 6X1a70jgbM0)", name: youtube_id, widget: string }
          - { label: "Video-Überschrift", name: title, widget: string }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID (intern, nicht ändern)", name: id, widget: string }
          - { label: "Überschrift (leer lassen wenn keine)", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Bild rechts (statt links)?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
          - { label: "Bewerbungs-Button zeigen?", name: show_apply_button, widget: boolean, default: false }
      - name: what_you_receive
        label: "Was du erhältst"
        widget: object
        required: false
        fields:
          - { label: "Überschrift", name: heading, widget: string }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Punkte", name: items, widget: list, field: { label: "Punkt", name: item, widget: string } }
      - name: pricing
        label: "Preise & Unterkunft"
        widget: object
        required: false
        fields:
          - { label: "Überschrift", name: heading, widget: string }
          - { label: "Einleitung (Absätze)", name: intro, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
          - name: cards
            label: "Zimmer-Optionen"
            widget: list
            fields:
              - { label: "Titel", name: title, widget: string }
              - { label: "Zimmer-Foto", name: image, widget: image }
              - { label: "Frühbucher-Preis", name: early_price, widget: number }
              - { label: "Frühbucher-Label", name: early_label, widget: string }
              - { label: "Frühbucher-Frist", name: early_deadline, widget: string }
              - { label: "Regulärer Preis", name: regular_price, widget: number }
              - { label: "Reguläres Label", name: regular_label, widget: string }
          - { label: "Abschluss-Text", name: closing, widget: string, required: false }
      - { label: "Abschluss-Zitat (kursiv, unten)", name: closing_quote, widget: text, required: false }

  - name: Mazunte Retreat
    label: "🌿 Mazunte Retreat"
    path: src/content/retreats
    filename: mazunte
    type: file
    fields:
      - { label: "Seiten-Titel (Browser-Tab)", name: page_title, widget: string }
      - { label: "Seiten-Beschreibung (Google)", name: page_description, widget: text }
      - { label: "Vorschaubild (Social Media)", name: og_image, widget: image }
      - name: hero
        label: "Hero-Bereich oben"
        widget: object
        fields:
          - { label: "Ort-Badge", name: location_badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Datum", name: dates, widget: string }
          - { label: "Untertitel", name: subtitle, widget: text }
          - { label: "Hauptbild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
      - name: video
        label: "Video-Sektion"
        widget: object
        required: false
        fields:
          - { label: "YouTube ID", name: youtube_id, widget: string }
          - { label: "Video-Überschrift", name: title, widget: string }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID (intern)", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Bild rechts?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
          - { label: "Bewerbungs-Button zeigen?", name: show_apply_button, widget: boolean, default: false }
      - name: what_you_receive
        label: "Was du erhältst"
        widget: object
        required: false
        fields:
          - { label: "Überschrift", name: heading, widget: string }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Punkte", name: items, widget: list, field: { label: "Punkt", name: item, widget: string } }
      - name: pricing
        label: "Preise & Unterkunft"
        widget: object
        required: false
        fields:
          - { label: "Überschrift", name: heading, widget: string }
          - { label: "Einleitung", name: intro, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
          - name: cards
            label: "Zimmer-Optionen"
            widget: list
            fields:
              - { label: "Titel", name: title, widget: string }
              - { label: "Zimmer-Foto", name: image, widget: image }
              - { label: "Frühbucher-Preis", name: early_price, widget: number }
              - { label: "Frühbucher-Label", name: early_label, widget: string }
              - { label: "Frühbucher-Frist", name: early_deadline, widget: string }
              - { label: "Regulärer Preis", name: regular_price, widget: number }
              - { label: "Reguläres Label", name: regular_label, widget: string }
      - { label: "Abschluss-Zitat", name: closing_quote, widget: text, required: false }

  - name: Spain Retreat
    label: "🌿 Spain Retreat"
    path: src/content/retreats
    filename: spain
    type: file
    fields:
      - { label: "Seiten-Titel", name: page_title, widget: string }
      - { label: "Seiten-Beschreibung", name: page_description, widget: text }
      - { label: "Vorschaubild", name: og_image, widget: image }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Badge", name: location_badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Datum", name: dates, widget: string }
          - { label: "Untertitel", name: subtitle, widget: text }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Bild rechts?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - name: pricing
        label: "Preise"
        widget: object
        required: false
        fields:
          - { label: "Überschrift", name: heading, widget: string }
          - { label: "Einleitung", name: intro, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
          - name: cards
            label: "Zimmer-Optionen"
            widget: list
            fields:
              - { label: "Titel", name: title, widget: string }
              - { label: "Bild", name: image, widget: image }
              - { label: "Frühbucher-Preis", name: early_price, widget: number }
              - { label: "Frühbucher-Label", name: early_label, widget: string }
              - { label: "Frühbucher-Frist", name: early_deadline, widget: string }
              - { label: "Regulärer Preis", name: regular_price, widget: number }
              - { label: "Reguläres Label", name: regular_label, widget: string }

  - name: Tulum Retreat
    label: "🌿 Tulum Retreat"
    path: src/content/retreats
    filename: tulum
    type: file
    fields:
      - { label: "Seiten-Titel", name: page_title, widget: string }
      - { label: "Seiten-Beschreibung", name: page_description, widget: text }
      - { label: "Vorschaubild", name: og_image, widget: image }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Badge", name: location_badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Datum", name: dates, widget: string }
          - { label: "Untertitel", name: subtitle, widget: text }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Bild rechts?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - name: pricing
        label: "Preise"
        widget: object
        required: false
        fields:
          - { label: "Überschrift", name: heading, widget: string }
          - { label: "Einleitung", name: intro, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
          - name: cards
            label: "Zimmer-Optionen"
            widget: list
            fields:
              - { label: "Titel", name: title, widget: string }
              - { label: "Bild", name: image, widget: image }
              - { label: "Frühbucher-Preis", name: early_price, widget: number }
              - { label: "Frühbucher-Label", name: early_label, widget: string }
              - { label: "Frühbucher-Frist", name: early_deadline, widget: string }
              - { label: "Regulärer Preis", name: regular_price, widget: number }
              - { label: "Reguläres Label", name: regular_label, widget: string }

  # ============================================================
  # LEVEL PAGES
  # ============================================================

  - name: Level 1 Übersicht
    label: "📋 Level 1 — Kurs-Übersicht"
    path: src/content/retreats
    filename: level-1
    type: file
    fields:
      - { label: "Seiten-Titel", name: page_title, widget: string }
      - { label: "Seiten-Beschreibung", name: page_description, widget: text }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Badge", name: badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Untertitel", name: subheading, widget: text }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Einleitungs-Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - name: learn_topics
        label: "Was du lernst (Stichpunkte)"
        widget: list
        field: { label: "Punkt", name: topic, widget: string }
      - name: body_regions
        label: "Körperregionen"
        widget: list
        fields:
          - { label: "Region", name: area, widget: string }
          - { label: "Thema", name: theme, widget: string }

  - name: Level 2 Übersicht
    label: "📋 Level 2 — Kurs-Übersicht"
    path: src/content/retreats
    filename: level-2
    type: file
    fields:
      - { label: "Seiten-Titel", name: page_title, widget: string }
      - { label: "Seiten-Beschreibung", name: page_description, widget: text }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Badge", name: badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Untertitel", name: subheading, widget: text }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Einleitungs-Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - name: elements
        label: "5 Elemente"
        widget: list
        fields:
          - { label: "Element (z.B. Earth)", name: element, widget: string }
          - { label: "Emotion", name: emotion, widget: string }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Bild rechts?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }

  # ============================================================
  # EINZELSEITEN (DE + EN)
  # ============================================================

  - name: Englische Startseite
    label: "🌐 Englische Startseite"
    path: src/content/pages
    filename: en
    type: file
    fields:
      - { label: "Browser-Tab Titel", name: page_title, widget: string }
      - { label: "Google-Beschreibung", name: page_description, widget: text }
      - name: hero
        label: "Hero-Bereich"
        widget: object
        fields:
          - { label: "Badge (oben klein)", name: badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Untertext", name: subheading, widget: text }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Button-Text", name: cta_text, widget: string }
          - { label: "Button-Link", name: cta_href, widget: string }
      - name: sections
        label: "Einleitungs-Texte"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }

  - name: About Dan
    label: "👤 About Dan"
    path: src/content/pages
    filename: about-dan
    type: file
    fields:
      - { label: "Browser-Tab Titel", name: page_title, widget: string }
      - { label: "Google-Beschreibung", name: page_description, widget: text }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Badge", name: badge, widget: string }
          - { label: "Name/Überschrift", name: heading, widget: string }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
      - name: stats
        label: "Zahlen (3 Statistiken)"
        widget: list
        fields:
          - { label: "Zahl", name: number, widget: string }
          - { label: "Bezeichnung", name: label, widget: string }
      - name: sections
        label: "Bio-Sektionen"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image, required: false }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string, required: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }

  - name: About the Work
    label: "🙌 About the Work"
    path: src/content/pages
    filename: about-the-work
    type: file
    fields:
      - { label: "Browser-Tab Titel", name: page_title, widget: string }
      - { label: "Google-Beschreibung", name: page_description, widget: text }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Untertitel (kursiv)", name: subheading, widget: string }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Einleitungs-Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Bild rechts?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }

  - name: Private Sessions (EN)
    label: "💆 Private Sessions (Englisch)"
    path: src/content/pages
    filename: sessions
    type: file
    fields:
      - { label: "Browser-Tab Titel", name: page_title, widget: string }
      - { label: "Google-Beschreibung", name: page_description, widget: text }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Badge", name: badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Untertext", name: subheading, widget: text }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Button-Text", name: cta_text, widget: string }
          - { label: "Button-Link", name: cta_href, widget: string }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image, required: false }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string, required: false }
          - { label: "Bild rechts?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }

  - name: Einzelsitzungen (DE)
    label: "💆 Einzelsitzungen (Deutsch)"
    path: src/content/pages
    filename: massage
    type: file
    fields:
      - { label: "Browser-Tab Titel", name: page_title, widget: string }
      - { label: "Google-Beschreibung", name: page_description, widget: text }
      - name: hero
        label: "Hero"
        widget: object
        fields:
          - { label: "Badge", name: badge, widget: string }
          - { label: "Hauptüberschrift", name: heading, widget: string }
          - { label: "Untertext", name: subheading, widget: text }
          - { label: "Bild", name: image, widget: image }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string }
          - { label: "Button-Text", name: cta_text, widget: string }
          - { label: "Button-Link", name: cta_href, widget: string }
      - name: sections
        label: "Inhalts-Sektionen"
        widget: list
        fields:
          - { label: "ID", name: id, widget: string }
          - { label: "Überschrift", name: heading, widget: string, required: false }
          - { label: "Bild", name: image, widget: image, required: false }
          - { label: "Bild Alt-Text", name: imageAlt, widget: string, required: false }
          - { label: "Bild rechts?", name: reversed, widget: boolean, default: false }
          - { label: "Absätze", name: paragraphs, widget: list, field: { label: "Absatz", name: paragraph, widget: text } }
```

- [ ] **Schritt 2: Build testen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -20
```

- [ ] **Schritt 3: Commit**

```bash
cd ~/code/DanHealingArts && git add .pages.yml && git commit -m "feat: pages.yml registers all content areas for Pages CMS"
```

---

## Task 9: Deploy + Pages CMS Test

**Files:**
- Kein neuer Code — Deploy und Verifikation

- [ ] **Schritt 1: Finaler Build**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -5
```

Erwartet: `✓ Completed in X.XXs.` ohne Fehler

- [ ] **Schritt 2: Deploy auf Hetzner**

```bash
cd ~/code/DanHealingArts && \
npm run build && \
chmod -R a+r dist/images/ && \
rsync -az --delete dist/ root@178.104.15.187:/tmp/dan-dist/ && \
rsync nginx.conf root@178.104.15.187:/tmp/nginx-dan.conf && \
ssh root@178.104.15.187 "docker cp /tmp/dan-dist/. 44bb0dde9718:/usr/share/nginx/html/ && \
  docker cp /tmp/nginx-dan.conf 44bb0dde9718:/etc/nginx/conf.d/default.conf && \
  docker exec 44bb0dde9718 nginx -s reload"
```

- [ ] **Schritt 3: Live-Site prüfen**

```bash
curl -s https://schweiz.danhealingarts.com/ | grep -i "title" | head -3
curl -s https://schweiz.danhealingarts.com/en | grep -i "title" | head -3
curl -s https://schweiz.danhealingarts.com/portugal | grep -i "title" | head -3
```

Erwartet: Alle 3 Seiten antworten mit korrektem `<title>` Tag

- [ ] **Schritt 4: Pages CMS testen**

In app.pagescms.org:
1. Zürich Startseite — Methode-Text öffnen → Absatz bearbeiten → Save → GitHub Commit prüfen
2. Portugal Retreat → Datum ändern → Save → Confirm Commit in GitHub
3. Testimonials → Neues hinzufügen → Save

Erwartet: Jede Änderung erzeugt einen GitHub-Commit in `stefannicolaus/dan-healing-arts`

- [ ] **Schritt 5: Webhook auslösen und Auto-Deploy prüfen**

Nach einem Commit über Pages CMS: Coolify baut und deployed automatisch (via Webhook).
Warten ca. 2-3 Minuten, dann Live-Site prüfen ob die Änderung sichtbar ist.

- [ ] **Schritt 6: Git-Tag setzen**

```bash
cd ~/code/DanHealingArts && git tag -a v2.0-cms-complete -m "All 15 pages editable via Pages CMS" && git push origin main --tags
```

---

## Ergebnis

Nach Abschluss aller Tasks kann Daniel:

| Seite | Editierbar in Pages CMS |
|-------|------------------------|
| Zürich Startseite | ✓ Hero + Methode + Entwickelst + Erfahrungsraum + Über Daniel |
| Zürich Kurse (4 Module) | ✓ Alle Felder |
| Englische Startseite | ✓ Hero + Einleitungstexte |
| About Dan | ✓ Bio + Portrait + Stats |
| About the Work | ✓ Alle Sektionen |
| Private Sessions (EN) | ✓ Alle Sektionen |
| Einzelsitzungen (DE) | ✓ Alle Sektionen |
| Alle Trainings/Termine | ✓ Titel, Datum, Ort, Bild |
| Portugal Retreat | ✓ Alle Texte + Bilder + Preise |
| Mazunte Retreat | ✓ Alle Texte + Bilder + Preise |
| Spain Retreat | ✓ Alle Texte + Bilder + Preise |
| Tulum Retreat | ✓ Alle Texte + Bilder + Preise |
| Level 1 Übersicht | ✓ Alle Texte + Lernziele |
| Level 2 Übersicht | ✓ Alle Texte + Elemente |
| Testimonials | ✓ Bereits vorhanden |

**Was NICHT editierbar ist** (bewusst): HTML-Struktur, Navigation, Formular-Felder, SVG-Icons, Parallax-Bilder (Design-Entscheidung), Footer.
