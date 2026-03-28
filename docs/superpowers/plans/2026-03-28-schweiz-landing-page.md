# schweiz.danhealingarts.com — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Astro-Seite für schweiz.danhealingarts.com bauen — deutsche Landing Page für Daniels 4 Schweizer Wochenendkurse, deploy-ready auf Hetzner/Coolify.

**Architecture:** Eine einzelne statische Astro-Seite (`output: 'static'`). Jede Section ist ein eigenes `.astro`-Component. Tailwind v3 mit dem Stitch-Design-System (Farben als Custom-Tokens). Kein Backend — Formular nutzt `mailto:`. Dockerfile für Coolify-Deploy.

**Tech Stack:** Astro 4, Tailwind CSS v3, Google Fonts (Fraunces + Outfit), Vanilla JS für Nav-Scroll-Effekt, Dockerfile (nginx:alpine)

---

## File Map

```
~/code/DanHealingArts/
├── astro.config.mjs              ← Astro config, static output, tailwind integration
├── package.json                  ← Dependencies
├── tailwind.config.mjs           ← Design tokens aus DESIGN.md
├── tsconfig.json                 ← Astro standard
├── .gitignore
├── Dockerfile                    ← nginx:alpine, static build für Coolify
├── public/
│   └── images/
│       └── .gitkeep              ← Placeholder (echte Fotos kommen von Daniel)
└── src/
    ├── layouts/
    │   └── Layout.astro          ← HTML-Shell, Google Fonts, Meta-Tags
    ├── components/
    │   ├── Nav.astro             ← Sticky Nav, transparent→solid on scroll
    │   ├── Hero.astro            ← 55/45 asymmetrisches Split-Layout
    │   ├── Methode.astro         ← Zentrierter Text-Block
    │   ├── FuerWen.astro         ← 2-Spalten-Grid (Praktizierende / Persönlich)
    │   ├── Module.astro          ← Asymmetrisches 2×2 Grid, alle 4 Kurse
    │   ├── Testimonials.astro    ← Placeholder-State (Daniel liefert)
    │   ├── UeberDaniel.astro     ← Bio + Statistiken
    │   ├── Kontakt.astro         ← Formular → mailto:
    │   └── Footer.astro          ← Links, Impressum, Copyright
    └── pages/
        └── index.astro           ← Assembliert alle Components
```

---

## Task 1: Astro-Projekt initialisieren + Tailwind konfigurieren

**Files:**
- Create: `~/code/DanHealingArts/package.json`
- Create: `~/code/DanHealingArts/astro.config.mjs`
- Create: `~/code/DanHealingArts/tailwind.config.mjs`
- Create: `~/code/DanHealingArts/tsconfig.json`
- Create: `~/code/DanHealingArts/.gitignore`

- [ ] **Schritt 1: Astro-Projekt erstellen**

```bash
cd ~/code/DanHealingArts
npm create astro@latest . -- --template minimal --no-install --no-git
```

Erwarteter Output: Astro-Projekt-Dateien werden erstellt (`astro.config.mjs`, `package.json`, `tsconfig.json`, `src/pages/index.astro`).

- [ ] **Schritt 2: Dependencies installieren**

```bash
cd ~/code/DanHealingArts
npm install
npm install -D @astrojs/tailwind tailwindcss
```

- [ ] **Schritt 3: `astro.config.mjs` schreiben**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
});
```

- [ ] **Schritt 4: `tailwind.config.mjs` mit Design-Tokens schreiben**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'canvas':      '#F8F5F0',
        'parchment':   '#FDFBF7',
        'umber':       '#2C1F14',
        'stone':       '#8B7355',
        'sage':        '#4A6741',
        'forest':      '#334F2B',
        'linen':       'rgba(210,200,185,0.4)',
        'surface-lo':  '#F6F3EE',
        'surface-mid': '#F0EDE9',
        'surface-hi':  '#EBE8E3',
        'surface-dim': '#DCDAD5',
        'text-main':   '#2C1F14',
        'text-muted':  '#8B7355',
      },
      fontFamily: {
        serif:  ['Fraunces', 'Georgia', 'serif'],
        sans:   ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '1.5rem',
        'btn':  '0.5rem',
      },
      maxWidth: {
        'page': '1320px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Schritt 5: `.gitignore` erstellen**

```
node_modules/
dist/
.astro/
.env
.DS_Store
```

- [ ] **Schritt 6: Build testen**

```bash
cd ~/code/DanHealingArts
npm run build
```

Erwarteter Output: `dist/` Ordner wird erstellt, kein Fehler.

- [ ] **Schritt 7: Git init + erster Commit**

```bash
cd ~/code/DanHealingArts
git init
git add astro.config.mjs package.json package-lock.json tailwind.config.mjs tsconfig.json .gitignore
git commit -m "feat: init Astro project with Tailwind design tokens"
```

---

## Task 2: Layout.astro — HTML-Shell mit Fonts + Meta

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Schritt 1: `src/layouts/Layout.astro` schreiben**

```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Somatische Tiefenmassage & Faszien Release — Wochenendkurse Zürich',
  description = 'Lerne präzise Faszienarbeit mit somatischer Präsenz. 4 Wochenendkurse in Zürich mit Daniel Wendt. Einzeln buchbar, je 420 CHF.',
} = Astro.props;
---

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>

    <!-- Google Fonts -->
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

- [ ] **Schritt 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add Layout with Google Fonts and meta tags"
```

---

## Task 3: Nav.astro — Sticky Navigation

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Schritt 1: `src/components/Nav.astro` schreiben**

```astro
---
---

<nav
  id="main-nav"
  class="fixed top-0 w-full z-50 transition-all duration-300 py-5 px-6 md:px-12"
>
  <div class="max-w-page mx-auto flex justify-between items-center">
    <a href="#" class="font-serif font-black text-xl text-forest tracking-tight">
      Dan Healing Arts
    </a>
    <div class="hidden md:flex items-center gap-10">
      <a href="#methode" class="text-forest font-medium hover:text-sage transition-colors">Die Methode</a>
      <a href="#module" class="text-forest font-medium hover:text-sage transition-colors">Module</a>
      <a href="#ueber" class="text-forest font-medium hover:text-sage transition-colors">Über Daniel</a>
      <a href="#kontakt" class="inline-flex items-center px-6 py-2.5 bg-forest text-white rounded-btn font-medium hover:bg-sage transition-colors">
        Anmelden
      </a>
    </div>
    <!-- Mobile menu button -->
    <button id="menu-btn" class="md:hidden text-forest p-2" aria-label="Menü öffnen">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
  <!-- Mobile dropdown -->
  <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 w-full bg-canvas border-t border-stone/20 px-6 py-6 flex flex-col gap-5">
    <a href="#methode" class="text-forest font-medium">Die Methode</a>
    <a href="#module" class="text-forest font-medium">Module</a>
    <a href="#ueber" class="text-forest font-medium">Über Daniel</a>
    <a href="#kontakt" class="inline-flex justify-center px-6 py-3 bg-forest text-white rounded-btn font-medium">
      Anmelden
    </a>
  </div>
</nav>

<script>
  // Scroll: transparent → solid
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav?.classList.add('bg-canvas/95', 'backdrop-blur-md', 'border-b', 'border-stone/20', 'shadow-sm');
    } else {
      nav?.classList.remove('bg-canvas/95', 'backdrop-blur-md', 'border-b', 'border-stone/20', 'shadow-sm');
    }
  });

  // Mobile menu toggle
  document.getElementById('menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
    document.getElementById('mobile-menu')?.classList.toggle('flex');
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobile-menu')?.classList.add('hidden');
      document.getElementById('mobile-menu')?.classList.remove('flex');
    });
  });
</script>
```

- [ ] **Schritt 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add sticky Nav with scroll effect and mobile menu"
```

---

## Task 4: Hero.astro — Asymmetrisches Split-Layout

**Files:**
- Create: `src/components/Hero.astro`
- Create: `public/images/.gitkeep`

- [ ] **Schritt 1: Placeholder-Ordner für Bilder erstellen**

```bash
mkdir -p ~/code/DanHealingArts/public/images
touch ~/code/DanHealingArts/public/images/.gitkeep
```

- [ ] **Schritt 2: `src/components/Hero.astro` schreiben**

```astro
---
---

<section class="max-w-page mx-auto px-6 md:px-12 pt-28 pb-16 md:pt-36 md:pb-24">
  <div class="flex flex-col md:flex-row items-center gap-10 lg:gap-20">

    <!-- Bild: 55% -->
    <div class="w-full md:w-[55%] shrink-0">
      <div class="rounded-card overflow-hidden aspect-[4/5] md:aspect-[3/4] bg-surface-mid">
        <!-- Echtes Foto von Daniel kommt hier rein -->
        <!-- Ersetze src mit Daniels echtem Bodywork-Foto -->
        <img
          src="/images/daniel-bodywork.jpg"
          alt="Daniel Wendt bei der somatischen Körperarbeit — Hände auf Gewebe, ruhig und präzise"
          class="w-full h-full object-cover"
          onerror="this.style.display='none'"
        />
        <!-- SVG Placeholder falls kein Foto vorhanden -->
        <div class="w-full h-full bg-surface-hi flex items-center justify-center absolute inset-0">
          <span class="text-stone/40 font-sans text-sm">Foto folgt</span>
        </div>
      </div>
    </div>

    <!-- Text: 45% -->
    <div class="w-full md:w-[45%] flex flex-col items-start">
      <h1 class="font-serif font-black text-forest text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-7">
        Berührung, die nicht zwingt, sondern lauscht und antwortet.
      </h1>
      <p class="font-sans text-stone text-xl md:text-2xl font-light leading-relaxed mb-10">
        Somatische Tiefenmassage &amp; Faszien Release — Wochenendkurse in Zürich
      </p>
      <a
        href="#module"
        class="inline-flex items-center px-10 py-4 bg-forest text-white rounded-btn font-medium text-lg hover:bg-sage transition-colors duration-200"
      >
        Kurse ansehen
      </a>
    </div>

  </div>
</section>
```

- [ ] **Schritt 3: Commit**

```bash
git add src/components/Hero.astro public/images/.gitkeep
git commit -m "feat: add Hero section with asymmetric 55/45 layout"
```

---

## Task 5: Methode.astro + FuerWen.astro

**Files:**
- Create: `src/components/Methode.astro`
- Create: `src/components/FuerWen.astro`

- [ ] **Schritt 1: `src/components/Methode.astro` schreiben**

```astro
---
---

<section id="methode" class="bg-surface-lo py-24 md:py-32">
  <div class="max-w-[820px] mx-auto px-6 text-center">
    <span class="font-sans font-bold tracking-[0.2em] uppercase text-xs text-sage mb-5 block">
      Philosophie
    </span>
    <h2 class="font-serif font-black text-forest text-4xl md:text-5xl mb-12 tracking-tight">
      Die Methode
    </h2>
    <div class="space-y-6 font-sans text-lg md:text-xl text-stone leading-[1.8]">
      <p>
        Eine achtsame, tiefgehende Form der Körperarbeit, in der präzise Faszienarbeit
        mit somatischer Präsenz verbunden wird. Im Zentrum steht das Lauschen, Fühlen
        und Begreifen der Sprache des Gewebes — Berührung, die nicht »macht«, sondern
        wahrnimmt und antwortet.
      </p>
      <p>
        Die somatische Tiefenmassage kombiniert Faszien-Release, Tiefengewebsmassage
        und Energiearbeit mit langsam fließenden, schrittweise tiefer gehenden Griffen.
        Der Therapeut orientiert sich an den individuellen Reaktionen des Nervensystems.
      </p>
      <p>
        Neben körperlicher Entspannung können auch emotionale Themen durch achtsame
        Begleitung adressiert werden.
      </p>
    </div>
  </div>
</section>
```

- [ ] **Schritt 2: `src/components/FuerWen.astro` schreiben**

```astro
---
---

<section class="py-24 md:py-32 max-w-page mx-auto px-6 md:px-12">
  <div class="grid md:grid-cols-2 gap-8 lg:gap-16">

    <div class="p-10 md:p-14 bg-parchment rounded-card">
      <h3 class="font-serif font-bold text-forest text-3xl mb-5">
        Für Praktizierende
      </h3>
      <p class="font-sans text-stone text-lg leading-[1.75]">
        Massagetherapeuten, Yogalehrer, Physiotherapeuten und Körperarbeiter, die
        ihre Techniken vertiefen wollen. Lerne präzise Faszientechniken mit
        somatischer Präsenz — und integriere eine Dimension, die reine Technik
        übersteigt.
      </p>
    </div>

    <div class="p-10 md:p-14 bg-parchment rounded-card">
      <h3 class="font-serif font-bold text-forest text-3xl mb-5">
        Für dich persönlich
      </h3>
      <p class="font-sans text-stone text-lg leading-[1.75]">
        Menschen, die tiefer in sich selbst fühlen wollen. Wer emotionale Muster
        über den Körper lösen möchte. Wer Körperarbeit nicht nur als Technik,
        sondern als Begegnung erleben will — mit sich selbst und mit anderen.
      </p>
    </div>

  </div>
</section>
```

- [ ] **Schritt 3: Commit**

```bash
git add src/components/Methode.astro src/components/FuerWen.astro
git commit -m "feat: add Methode and FuerWen sections"
```

---

## Task 6: Module.astro — Die 4 Kurse

**Files:**
- Create: `src/components/Module.astro`

- [ ] **Schritt 1: `src/components/Module.astro` schreiben**

```astro
---
const module = [
  {
    nr: 'Modul 1',
    titel: 'Rücken & Nacken',
    motto: 'Vergangenes loslassen, um voran zu schreiten',
    datum: '18.–19. April 2026',
    beschreibung: 'Präzise Faszienarbeit kombiniert mit somatischer Präsenz. Hören, Fühlen und die Sprache des Gewebes verstehen. Berührung, die nicht zwingt, sondern lauscht und antwortet.',
    link: 'https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-1-ruecken-nacken/',
  },
  {
    nr: 'Modul 2',
    titel: 'Bauch, Becken & Beine',
    motto: 'In der Erde verwurzelt ins Gleichgewicht finden',
    datum: '13.–14. Juni 2026',
    beschreibung: 'Erdung und strukturelle Integration. Arbeit an Bauch, Becken und Beinen — Faszientechniken für Psoas und die Verbindung zwischen den Körperzentren.',
    link: 'https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-2-bauch-becken-beine/',
  },
  {
    nr: 'Modul 3',
    titel: 'Brustkorb & Herzraum',
    motto: 'Dem Herzen Raum geben',
    datum: '22.–23. August 2026',
    beschreibung: 'Raum für das Herz schaffen — Einschränkungen im Brustbereich lösen und den Atem frei fließen lassen durch sanfte, aufmerksame Berührung.',
    link: 'https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-3-brustkorb-schulterguertel-arme-herzraum/',
  },
  {
    nr: 'Modul 4',
    titel: 'Gesicht, Kopf & Nacken',
    motto: 'Im Raum der Stille Klarheit finden',
    datum: '17.–18. Oktober 2026',
    beschreibung: 'Feine, sensible Strukturen, in denen sich Wahrnehmung und Identität konzentrieren. Abschlussmodul mit kraniosacralen und myofaszialen Integrationstechniken.',
    link: 'https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-4-gesicht-kopf-nacken-vertiefung/',
  },
];
---

<section id="module" class="py-24 md:py-32 bg-parchment">
  <div class="max-w-page mx-auto px-6 md:px-12">

    <div class="mb-16">
      <h2 class="font-serif font-black text-forest text-4xl md:text-6xl mb-4 tracking-tight">
        Die 4 Module
      </h2>
      <p class="font-sans text-stone text-xl">
        Grundlagen und Vertiefung der somatischen Körperarbeit
      </p>
    </div>

    <!-- Zeile 1: 60% + 40% -->
    <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-6 mb-6">
      {module.slice(0, 2).map((m) => (
        <div class="bg-canvas p-8 md:p-10 rounded-card flex flex-col justify-between min-h-[380px] border border-stone/10 hover:border-stone/30 hover:shadow-md transition-all duration-200">
          <div>
            <span class="font-sans font-bold text-xs tracking-widest uppercase text-sage mb-3 block">
              {m.nr}
            </span>
            <h4 class="font-serif font-bold text-forest text-2xl md:text-3xl mb-2">
              {m.titel}
            </h4>
            <p class="font-sans text-stone/70 text-sm italic mb-5">
              {m.motto}
            </p>
            <p class="font-sans text-stone text-base leading-relaxed mb-6">
              {m.beschreibung}
            </p>
            <div class="flex flex-wrap gap-3 text-sm font-medium text-stone">
              <span class="px-3 py-1.5 bg-surface-lo rounded-full">{m.datum}</span>
              <span class="px-3 py-1.5 bg-surface-lo rounded-full">420 CHF</span>
              <span class="px-3 py-1.5 bg-surface-lo rounded-full">Jupiterhaus Zürich</span>
            </div>
          </div>
          <a
            href={m.link}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-8 self-start inline-flex items-center px-7 py-3 bg-forest text-white rounded-btn font-medium hover:bg-sage transition-colors duration-200"
          >
            Anmelden →
          </a>
        </div>
      ))}
    </div>

    <!-- Zeile 2: 40% + 60% -->
    <div class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6">
      {module.slice(2, 4).map((m) => (
        <div class="bg-canvas p-8 md:p-10 rounded-card flex flex-col justify-between min-h-[380px] border border-stone/10 hover:border-stone/30 hover:shadow-md transition-all duration-200">
          <div>
            <span class="font-sans font-bold text-xs tracking-widest uppercase text-sage mb-3 block">
              {m.nr}
            </span>
            <h4 class="font-serif font-bold text-forest text-2xl md:text-3xl mb-2">
              {m.titel}
            </h4>
            <p class="font-sans text-stone/70 text-sm italic mb-5">
              {m.motto}
            </p>
            <p class="font-sans text-stone text-base leading-relaxed mb-6">
              {m.beschreibung}
            </p>
            <div class="flex flex-wrap gap-3 text-sm font-medium text-stone">
              <span class="px-3 py-1.5 bg-surface-lo rounded-full">{m.datum}</span>
              <span class="px-3 py-1.5 bg-surface-lo rounded-full">420 CHF</span>
              <span class="px-3 py-1.5 bg-surface-lo rounded-full">Jupiterhaus Zürich</span>
            </div>
          </div>
          <a
            href={m.link}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-8 self-start inline-flex items-center px-7 py-3 bg-forest text-white rounded-btn font-medium hover:bg-sage transition-colors duration-200"
          >
            Anmelden →
          </a>
        </div>
      ))}
    </div>

    <p class="mt-12 text-center font-sans text-stone text-sm italic">
      Alle Module einzeln buchbar oder als Gesamtreihe — jeweils 9:30–19:30 Uhr
    </p>

  </div>
</section>
```

- [ ] **Schritt 2: Commit**

```bash
git add src/components/Module.astro
git commit -m "feat: add Module section with all 4 courses, real dates and Jupiterhaus links"
```

---

## Task 7: Testimonials.astro — Placeholder-Bereich

**Files:**
- Create: `src/components/Testimonials.astro`

- [ ] **Schritt 1: `src/components/Testimonials.astro` schreiben**

```astro
---
// Echte Testimonials kommen von Daniel (Fotos + Quotes + Video-Link)
// Bis dahin: strukturell vorhanden, visuell dezent
const testimonials = [
  {
    quote: 'Die Tiefe der Berührung in diesem Training hat meine Sicht auf Körperarbeit grundlegend verändert. Es geht nicht mehr um Technik, sondern um echte Verbindung.',
    name: 'Teilnehmerin, Modul 1–4',
    beruf: 'Physiotherapeutin',
  },
  {
    quote: 'Daniel schafft einen Raum der Stille und Präsenz, in dem sich der Körper fast wie von selbst öffnet.',
    name: 'Teilnehmer, Modul 2',
    beruf: 'Masseur',
  },
];
---

<section class="py-24 md:py-32 bg-surface-lo overflow-hidden">
  <div class="max-w-page mx-auto px-6 md:px-12">

    <div class="grid md:grid-cols-2 gap-16 items-start">

      <!-- Video Placeholder -->
      <div class="rounded-card overflow-hidden aspect-video bg-surface-dim flex items-center justify-center relative">
        <div class="absolute inset-0 flex items-center justify-center">
          <p class="font-sans text-stone/50 text-sm">Video folgt</p>
        </div>
        <!-- Wenn Daniel das Video liefert:
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID"
          class="w-full h-full"
          allowfullscreen
        ></iframe>
        -->
      </div>

      <!-- Quotes -->
      <div class="space-y-14">
        {testimonials.map((t) => (
          <div class="relative">
            <span class="absolute -top-6 -left-2 font-serif text-7xl text-sage/20 leading-none select-none">"</span>
            <blockquote class="font-serif italic text-forest text-xl md:text-2xl leading-snug pl-4">
              {t.quote}
            </blockquote>
            <cite class="block mt-5 font-sans text-stone text-sm font-bold not-italic pl-4">
              — {t.name}{t.beruf ? `, ${t.beruf}` : ''}
            </cite>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>
```

- [ ] **Schritt 2: Commit**

```bash
git add src/components/Testimonials.astro
git commit -m "feat: add Testimonials section with placeholder state"
```

---

## Task 8: UeberDaniel.astro — Echte Bio

**Files:**
- Create: `src/components/UeberDaniel.astro`

- [ ] **Schritt 1: `src/components/UeberDaniel.astro` schreiben**

```astro
---
const stats = [
  { zahl: '22+', label: 'Ausbildungen' },
  { zahl: '2.500+', label: 'Stunden' },
  { zahl: '17', label: 'Trainingskurse' },
];
---

<section id="ueber" class="py-24 md:py-32 max-w-page mx-auto px-6 md:px-12">
  <div class="flex flex-col md:flex-row gap-16 items-center">

    <!-- Portrait: 40% -->
    <div class="w-full md:w-2/5 shrink-0">
      <div class="rounded-card overflow-hidden aspect-[4/5] bg-surface-mid relative">
        <!-- Echtes Portrait-Foto von Daniel hier einfügen -->
        <img
          src="/images/daniel-portrait.jpg"
          alt="Daniel Wendt — Myofascial Somatic Release Practitioner und Lehrer"
          class="w-full h-full object-cover"
          onerror="this.style.display='none'"
        />
        <div class="w-full h-full flex items-center justify-center absolute inset-0">
          <span class="font-sans text-stone/40 text-sm">Portrait folgt</span>
        </div>
      </div>
    </div>

    <!-- Text: 60% -->
    <div class="w-full md:w-3/5">
      <h2 class="font-serif font-black text-forest text-4xl md:text-5xl mb-8 tracking-tight">
        Über Daniel
      </h2>

      <div class="font-sans text-stone text-lg space-y-5 leading-[1.75] mb-12">
        <p>
          Von Natur aus eher Abenteurer und Entdecker als Philosoph, habe ich in
          meinem Leben stets nach direkten, deutlich wahrnehmbaren Erfahrungen
          gesucht. Von Backpacking über Bauarbeit, von Rap-Bühnen über
          Immobilienfirmen, vom durch die Welt trampen bis hin zur Gründung
          einer Familie mit zwei wunderbaren Kindern.
        </p>
        <p>
          Ich fand Freiheit, Frieden und Inspiration, als ich vor über 15 Jahren
          anfing, tief in die Körperarbeit und Yoga einzutauchen, und konnte nach
          und nach viele einschränkende Glaubenssätze und konventionelle Normen
          hinter mir lassen.
        </p>
        <p>
          In meinen Kursen, Behandlungen, Trainings und Retreats lehre ich eine
          einzigartige Mischung aus Faszien-Release, Tiefengewebsmassage und
          Energiearbeit. In einem sicheren Rahmen lade ich dich ein, deinen
          eigenen Körper als einen unendlichen Erfahrungsraum zu erleben.
        </p>
      </div>

      <!-- Statistiken -->
      <div class="grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <div>
            <p class="font-serif font-black text-forest text-4xl md:text-5xl mb-1">
              {s.zahl}
            </p>
            <p class="font-sans text-stone text-xs uppercase tracking-widest font-bold">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
```

- [ ] **Schritt 2: Commit**

```bash
git add src/components/UeberDaniel.astro
git commit -m "feat: add UeberDaniel with real bio and stats"
```

---

## Task 9: Kontakt.astro + Footer.astro

**Files:**
- Create: `src/components/Kontakt.astro`
- Create: `src/components/Footer.astro`

- [ ] **Schritt 1: `src/components/Kontakt.astro` schreiben**

```astro
---
const module_optionen = [
  'Modul 1 — Rücken & Nacken (18.–19. April)',
  'Modul 2 — Bauch, Becken & Beine (13.–14. Juni)',
  'Modul 3 — Brustkorb & Herzraum (22.–23. August)',
  'Modul 4 — Gesicht, Kopf & Nacken (17.–18. Oktober)',
  'Alle 4 Module',
  'Einzelsitzung',
];
---

<section id="kontakt" class="py-24 md:py-32 bg-surface-lo">
  <div class="max-w-3xl mx-auto px-6">

    <div class="text-center mb-14">
      <h2 class="font-serif font-black text-forest text-4xl md:text-5xl mb-4 tracking-tight">
        Anmeldung & Kontakt
      </h2>
      <p class="font-sans text-stone text-lg">
        Fragen oder direkte Buchungsanfrage — schreib einfach.
      </p>
    </div>

    <form
      action="mailto:danhealingarts@gmail.com"
      method="get"
      enctype="text/plain"
      class="bg-parchment p-8 md:p-14 rounded-card space-y-7"
    >

      <div class="grid md:grid-cols-2 gap-7">
        <div class="flex flex-col gap-2">
          <label class="font-sans text-xs font-bold text-forest uppercase tracking-wider">
            Name *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Vor- und Nachname"
            class="bg-surface-lo border-none rounded-btn py-3.5 px-4 font-sans text-base text-umber focus:ring-2 focus:ring-sage outline-none"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-sans text-xs font-bold text-forest uppercase tracking-wider">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="deine@mail.ch"
            class="bg-surface-lo border-none rounded-btn py-3.5 px-4 font-sans text-base text-umber focus:ring-2 focus:ring-sage outline-none"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-7">
        <div class="flex flex-col gap-2">
          <label class="font-sans text-xs font-bold text-forest uppercase tracking-wider">
            WhatsApp <span class="text-stone font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="tel"
            name="whatsapp"
            placeholder="+41 7x xxx xx xx"
            class="bg-surface-lo border-none rounded-btn py-3.5 px-4 font-sans text-base text-umber focus:ring-2 focus:ring-sage outline-none"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-sans text-xs font-bold text-forest uppercase tracking-wider">
            Welches Modul?
          </label>
          <select
            name="modul"
            class="bg-surface-lo border-none rounded-btn py-3.5 px-4 font-sans text-base text-umber focus:ring-2 focus:ring-sage outline-none"
          >
            {module_optionen.map((opt) => (
              <option value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-sans text-xs font-bold text-forest uppercase tracking-wider">
          Nachricht <span class="text-stone font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          name="nachricht"
          rows="4"
          placeholder="Was möchtest du uns mitteilen?"
          class="bg-surface-lo border-none rounded-btn py-3.5 px-4 font-sans text-base text-umber focus:ring-2 focus:ring-sage outline-none resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full py-4 bg-forest text-white rounded-btn font-bold text-lg hover:bg-sage transition-colors duration-200"
      >
        Nachricht senden
      </button>

    </form>

  </div>
</section>
```

- [ ] **Schritt 2: `src/components/Footer.astro` schreiben**

```astro
---
const jahr = new Date().getFullYear();
---

<footer class="bg-surface-lo border-t border-stone/20 py-16 px-6 md:px-12">
  <div class="max-w-page mx-auto">

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

      <div class="space-y-4">
        <p class="font-serif font-black text-forest text-lg">Dan Healing Arts</p>
        <p class="font-sans text-stone text-sm leading-relaxed max-w-xs">
          Somatische Tiefenmassage & Faszien Release — Wochenendkurse in Zürich
        </p>
        <p class="font-sans text-stone text-sm">
          <a href="mailto:danhealingarts@gmail.com" class="hover:text-forest transition-colors">
            danhealingarts@gmail.com
          </a>
        </p>
      </div>

      <div class="space-y-3">
        <p class="font-sans text-xs font-bold uppercase tracking-[0.18rem] text-forest mb-4">
          Navigation
        </p>
        <a href="#methode" class="block font-sans text-stone text-sm hover:text-forest transition-colors">Die Methode</a>
        <a href="#module" class="block font-sans text-stone text-sm hover:text-forest transition-colors">Module</a>
        <a href="#ueber" class="block font-sans text-stone text-sm hover:text-forest transition-colors">Über Daniel</a>
        <a href="#kontakt" class="block font-sans text-stone text-sm hover:text-forest transition-colors">Anmeldung</a>
      </div>

      <div class="space-y-3">
        <p class="font-sans text-xs font-bold uppercase tracking-[0.18rem] text-forest mb-4">
          Rechtliches
        </p>
        <a href="https://danhealingarts.com" target="_blank" rel="noopener" class="block font-sans text-stone text-sm hover:text-forest transition-colors">
          danhealingarts.com
        </a>
        <a href="#" class="block font-sans text-stone text-sm hover:text-forest transition-colors">Impressum</a>
        <a href="#" class="block font-sans text-stone text-sm hover:text-forest transition-colors">Datenschutz</a>
      </div>

    </div>

    <div class="border-t border-stone/20 pt-8">
      <p class="font-sans text-stone/60 text-xs text-center">
        © {jahr} Dan Healing Arts. Alle Module finden statt im Jupiterhaus Zürich.
      </p>
    </div>

  </div>
</footer>
```

- [ ] **Schritt 3: Commit**

```bash
git add src/components/Kontakt.astro src/components/Footer.astro
git commit -m "feat: add Kontakt form and Footer"
```

---

## Task 10: index.astro — Alles zusammenbauen

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Schritt 1: `src/pages/index.astro` schreiben**

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Methode from '../components/Methode.astro';
import FuerWen from '../components/FuerWen.astro';
import Module from '../components/Module.astro';
import Testimonials from '../components/Testimonials.astro';
import UeberDaniel from '../components/UeberDaniel.astro';
import Kontakt from '../components/Kontakt.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Nav />
  <main>
    <Hero />
    <Methode />
    <FuerWen />
    <Module />
    <Testimonials />
    <UeberDaniel />
    <Kontakt />
  </main>
  <Footer />
</Layout>
```

- [ ] **Schritt 2: Build ausführen und prüfen**

```bash
cd ~/code/DanHealingArts
npm run build
```

Erwarteter Output: `dist/index.html` erstellt, kein Fehler. Build-Größe < 1MB.

- [ ] **Schritt 3: Dev-Server starten und visuell prüfen**

```bash
npm run dev
```

Öffne `http://localhost:4321` — alle Sections sichtbar?

- [ ] **Schritt 4: Playwright Screenshots (Desktop + Mobile)**

```bash
npx playwright screenshot --viewport-size="1440,900" "http://localhost:4321" /tmp/dan-final-desktop.png
npx playwright screenshot --viewport-size="390,844" "http://localhost:4321" /tmp/dan-final-mobile.png
```

- [ ] **Schritt 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble all sections in index.astro"
```

---

## Task 11: Dockerfile für Coolify-Deploy

**Files:**
- Create: `Dockerfile`

- [ ] **Schritt 1: `Dockerfile` schreiben**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- [ ] **Schritt 2: `nginx.conf` schreiben**

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

- [ ] **Schritt 3: Docker Build lokal testen**

```bash
cd ~/code/DanHealingArts
docker build -t dan-healing-arts .
docker run -p 8080:80 dan-healing-arts
```

Öffne `http://localhost:8080` — Seite lädt korrekt?

- [ ] **Schritt 4: Commit**

```bash
git add Dockerfile nginx.conf
git commit -m "feat: add Dockerfile and nginx config for Coolify deploy"
```

---

## Task 12: GitHub Repo + Coolify Setup

**Files:** keine neuen Dateien

- [ ] **Schritt 1: GitHub Remote erstellen und pushen**

```bash
cd ~/code/DanHealingArts
gh repo create dan-healing-arts --private --source=. --remote=origin --push
```

- [ ] **Schritt 2: Coolify — neue App anlegen**

In Coolify (178.104.15.187:8000):
- New Resource → Docker Build → GitHub Repo `dan-healing-arts`
- Branch: `main`
- Dockerfile path: `./Dockerfile`
- Domain: `schweiz.danhealingarts.com`
- Port: `80`

- [ ] **Schritt 3: Deploy triggern**

```bash
# Nach dem Setup in Coolify — UUID aus der Coolify UI kopieren
curl -s "http://178.104.15.187:8000/api/v1/deploy?uuid=<COOLIFY_UUID>" \
  -H "Authorization: Bearer 34|4140dc1a1b2a699456ab4184ce45c091aaafa9fb03cd6b30bee1105735697e3ec8173c750bf828c8"
```

- [ ] **Schritt 4: DNS prüfen**

```bash
dig schweiz.danhealingarts.com A
# Erwarteter Output: 178.104.15.187
```

- [ ] **Schritt 5: Live-Screenshot**

```bash
npx playwright screenshot --viewport-size="1440,900" "https://schweiz.danhealingarts.com" /tmp/dan-live.png
```

---

## Spec-Coverage Check

| Anforderung | Task |
|-------------|------|
| Nav sticky + scroll-effect | Task 3 |
| Hero 55/45 asymmetrisch | Task 4 |
| Die Methode zentriert | Task 5 |
| Für wen 2-Spalten | Task 5 |
| 4 Module mit echten Daten + Jupiterhaus-Links | Task 6 |
| Testimonials Placeholder | Task 7 |
| Über Daniel echte Bio + Stats | Task 8 |
| Kontaktformular mit allen Feldern | Task 9 |
| Footer | Task 9 |
| Responsive Mobile | Tailwind responsive-Klassen in allen Tasks |
| Static Build | Task 1 (output: 'static') |
| Dockerfile Coolify-ready | Task 11 |
| Google Fonts Fraunces + Outfit | Task 2 |
| Design-Tokens aus DESIGN.md | Task 1 |
| Deutschen Content aus Quellen | Tasks 4–9 |

Alle Anforderungen abgedeckt. ✓
