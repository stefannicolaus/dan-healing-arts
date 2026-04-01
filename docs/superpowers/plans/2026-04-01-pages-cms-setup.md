# Pages CMS Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Daniel Wendt kann Kurstermine, Hero-Text und Testimonials selbst über einen Browser-Editor (Pages CMS) ändern — ohne Code, ohne GitHub-Account, ohne Stefan.

**Architecture:** Content wird aus hardcodierten Astro-Komponenten in YAML-Dateien (Astro Content Collections) ausgelagert. Pages CMS liest/schreibt diese YAML-Dateien direkt über GitHub. Ein Coolify-Webhook löst nach jedem Commit automatisch einen Neubau aus.

**Tech Stack:** Astro Content Collections (YAML), Pages CMS (pagescms.org), GitHub (stefannicolaus/dan-healing-arts), Coolify Webhook, nginx auf Hetzner

---

## File Map

| Aktion | Datei | Zweck |
|--------|-------|-------|
| Modify | `src/content/config.ts` | `courses` + `hero` Collection hinzufügen |
| Create | `src/content/courses/modul-1.yaml` | Kurs-Daten Modul 1 |
| Create | `src/content/courses/modul-2.yaml` | Kurs-Daten Modul 2 |
| Create | `src/content/courses/modul-3.yaml` | Kurs-Daten Modul 3 |
| Create | `src/content/courses/modul-4.yaml` | Kurs-Daten Modul 4 |
| Create | `src/content/hero/zurich.yaml` | Hero-Texte Startseite |
| Modify | `src/components/ZurichModule.astro` | getCollection('courses') statt hardcoded Array |
| Modify | `src/components/ZurichHero.astro` | Props aus hero Collection |
| Modify | `src/pages/index.astro` | hero Collection laden + an ZurichHero übergeben |
| Create | `pages.config.yml` | Pages CMS Konfiguration (Root des Repos) |

---

## Task 1: content/config.ts erweitern

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Schritt 1: config.ts öffnen und `courses` + `hero` Collection ergänzen**

```typescript
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
```

- [ ] **Schritt 2: Build prüfen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -5
```

Erwartetes Ergebnis: Build schlägt fehl mit "Collection 'courses' has no entries" oder ähnlich — das ist korrekt, da die YAML-Dateien noch fehlen. Kein Syntax-Fehler = Task 1 erledigt.

- [ ] **Schritt 3: Committen**

```bash
cd ~/code/DanHealingArts && git add src/content/config.ts && git commit -m "feat: add courses and hero content collections"
```

---

## Task 2: courses YAML-Dateien erstellen

**Files:**
- Create: `src/content/courses/modul-1.yaml`
- Create: `src/content/courses/modul-2.yaml`
- Create: `src/content/courses/modul-3.yaml`
- Create: `src/content/courses/modul-4.yaml`

- [ ] **Schritt 1: modul-1.yaml erstellen**

```yaml
nr: "Modul 1"
titel: "Rücken & Nacken"
motto: "Vergangenes loslassen, um voran zu schreiten"
datum: "18.–19. April 2026"
beschreibung: "Der Rücken als zentrales Trage- und Wahrnehmungsorgan — Ort, an dem Aufrichtung, Schutz und Loslassen zusammenwirken. Mit präsenter Berührung alte Muster lösen und Raum für Leichtigkeit schaffen."
schwerpunkte:
  - "Grundlagen der somatischen Tiefenmassage"
  - "Kontaktqualität & Druckwahrnehmung"
  - "Arbeit entlang der Wirbelsäule"
  - "Integration von Rücken, Schultern und Nacken"
  - "Körpermechanik und Eigenwahrnehmung"
link: "https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-1-ruecken-nacken/"
bild: "/images/modul-1-ruecken-nacken.jpg"
bildAlt: "Hände bei der Faszienarbeit entlang der Wirbelsäule"
bildPos: "object-center"
bildLinks: true
```

- [ ] **Schritt 2: modul-2.yaml erstellen**

```yaml
nr: "Modul 2"
titel: "Bauch, Becken & Beine"
motto: "In der Erde verwurzelt ins Gleichgewicht finden"
datum: "13.–14. Juni 2026"
beschreibung: "Basis und Verwurzelung — die Körperregionen, in denen sich Stabilität, Erdung und Lebenskraft verankern. Arbeit mit Psoas, Iliacus und der Becken umgebenden Muskulatur."
schwerpunkte:
  - "Arbeit mit Beinen, Becken, Hüften (Psoas) und Bauchraum"
  - "Faszienketten der unteren Körperhälfte"
  - "Verbindung von Erdung und Aufrichtung"
  - "Emotionale Regulation durch körperliche Präsenz"
  - "Zentrierung und Stabilität im Geben"
link: "https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-2-bauch-becken-beine/"
bild: "/images/modul-2-bauch-becken-beine.jpg"
bildAlt: "Sanfte Hände im Bereich Bauch und Becken"
bildPos: "object-top"
bildLinks: false
```

- [ ] **Schritt 3: modul-3.yaml erstellen**

```yaml
nr: "Modul 3"
titel: "Brustkorb, Schultergürtel & Arme"
motto: "Dem Herzen Raum geben"
datum: "22.–23. August 2026"
beschreibung: "Der Raum des Herzens, wo Atem, Gefühl und Ausdruck aufeinandertreffen. Einschränkungen im Brustkorb lösen, den Atem frei fließen lassen — Berührung, die zu Beziehung wird."
schwerpunkte:
  - "Arbeit mit Brustkorb, Schultern und Armen"
  - "Öffnung und Mobilisierung des Atemraums"
  - "Emotionale Präsenz und Mitgefühl in der Berührung"
  - "Ausdruckskraft und Verbindung über die Arme"
  - "Berührung als Beziehung"
link: "https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-3-brustkorb-schulterguertel-arme-herzraum/"
bild: "/images/modul-3-herzraum.jpg"
bildAlt: "Hände auf dem Herzraum — Brustkorb-Arbeit"
bildPos: "object-top"
bildLinks: true
```

- [ ] **Schritt 4: modul-4.yaml erstellen**

```yaml
nr: "Modul 4"
titel: "Gesicht, Kopf & Nacken"
motto: "Im Raum der Stille Klarheit finden"
datum: "17.–18. Oktober 2026"
beschreibung: "Feine, sensible Strukturen, in denen sich Wahrnehmung und Identität verdichten. Arbeit an Kiefer, Schädel und craniosacralen Faszien — die Integration des gesamten Lernwegs."
schwerpunkte:
  - "Arbeit mit Gesicht, Kiefer, Kopf und Nacken"
  - "Craniosacrale und myofasziale Integration"
  - "Verbindung zwischen Nervensystem und Gewebe"
  - "Feine Wahrnehmung & subtile Präsenz"
  - "Abschluss und Integration der Ausbildungsreihe"
link: "https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-4-gesicht-kopf-nacken-vertiefung/"
bild: "/images/modul-4-gesicht-kopf.jpg"
bildAlt: "Sanfte Hände am Kopf — craniosacrale Arbeit"
bildPos: "object-top"
bildLinks: false
```

- [ ] **Schritt 5: Build prüfen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -5
```

Erwartetes Ergebnis: Baut durch ODER schlägt fehl weil `hero` Collection noch fehlt. Kein Fehler bei `courses` = korrekt.

- [ ] **Schritt 6: Committen**

```bash
cd ~/code/DanHealingArts && git add src/content/courses/ && git commit -m "feat: add courses YAML content for all 4 modules"
```

---

## Task 3: hero YAML-Datei erstellen

**Files:**
- Create: `src/content/hero/zurich.yaml`

- [ ] **Schritt 1: Verzeichnis und Datei erstellen**

```yaml
headline: "Berührung, die nicht zwingt, sondern lauscht und antwortet."
subtext: "Diese Ausbildungsreihe vermittelt eine achtsame, tiefgehende Form der Körperarbeit, in der präzise Faszienarbeit mit somatischer Präsenz verbunden wird — Wochenendkurse in Zürich."
cta_text: "Kurse ansehen"
cta_link: "#module"
bild: "/images/zurich/hero.jpg"
bildAlt: "Daniel Wendt bei der somatischen Körperarbeit — Hände auf Gewebe, ruhig und präzise"
```

- [ ] **Schritt 2: Build prüfen — muss jetzt vollständig durchlaufen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -10
```

Erwartetes Ergebnis: `✓ Completed in X.XXs` ohne Fehler.

- [ ] **Schritt 3: Committen**

```bash
cd ~/code/DanHealingArts && git add src/content/hero/ && git commit -m "feat: add hero content for Zurich landing page"
```

---

## Task 4: ZurichModule.astro auf Content Collection umstellen

**Files:**
- Modify: `src/components/ZurichModule.astro`

- [ ] **Schritt 1: Frontmatter ersetzen**

Den gesamten `---` Block (hardcoded Array) ersetzen durch:

```astro
---
import { getCollection } from 'astro:content';
const moduleData = await getCollection('courses');
// Sortierung nach nr (Modul 1, 2, 3, 4)
const module = moduleData
  .sort((a, b) => a.data.nr.localeCompare(b.data.nr))
  .map(m => m.data);
---
```

Der HTML-Teil der Komponente bleibt **unverändert** — er referenziert `module` als Array, was weiterhin funktioniert.

- [ ] **Schritt 2: Build prüfen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -10
```

Erwartetes Ergebnis: `✓ Completed in X.XXs` ohne Fehler. Kein Unterschied im generierten HTML gegenüber vorher.

- [ ] **Schritt 3: Dev-Server kurz starten und visuell prüfen**

```bash
cd ~/code/DanHealingArts && npm run dev &
sleep 3 && curl -s http://localhost:4321/ | grep -o 'Modul [1-4]' | head -4
```

Erwartetes Ergebnis: `Modul 1`, `Modul 2`, `Modul 3`, `Modul 4` erscheinen alle. Dev-Server danach beenden: `kill %1`

- [ ] **Schritt 4: Committen**

```bash
cd ~/code/DanHealingArts && git add src/components/ZurichModule.astro && git commit -m "refactor: ZurichModule reads from courses content collection"
```

---

## Task 5: ZurichHero.astro auf Props umstellen + index.astro anpassen

**Files:**
- Modify: `src/components/ZurichHero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Schritt 1: ZurichHero.astro — Props definieren**

Den leeren `---` Block ersetzen durch:

```astro
---
interface Props {
  headline: string;
  subtext: string;
  cta_text: string;
  cta_link: string;
  bild: string;
  bildAlt: string;
}
const { headline, subtext, cta_text, cta_link, bild, bildAlt } = Astro.props;
---
```

- [ ] **Schritt 2: ZurichHero.astro — hardcoded Werte durch Props ersetzen**

Im HTML-Teil folgende Ersetzungen vornehmen:

| Alt (hardcoded) | Neu (Prop) |
|-----------------|------------|
| `src="/images/zurich/hero.jpg"` | `src={bild}` |
| `alt="Daniel Wendt bei der somatischen..."` | `alt={bildAlt}` |
| `Berührung, die nicht zwingt...` (h1 Text) | `{headline}` |
| `Diese Ausbildungsreihe vermittelt...` (p Text) | `{subtext}` |
| `href="#module"` (CTA Link) | `href={cta_link}` |
| `Kurse ansehen` (CTA Text) | `{cta_text}` |

- [ ] **Schritt 3: index.astro — hero Collection laden und übergeben**

In `src/pages/index.astro` den bestehenden Import-Block ergänzen:

Nach der Zeile `const allTestimonials = await getCollection('testimonials');` einfügen:

```astro
const heroEntries = await getCollection('hero');
const heroData = heroEntries.find(e => e.id === 'zurich')?.data;
if (!heroData) throw new Error('Hero content for zurich not found');
```

Und den `<ZurichHero />` Aufruf ersetzen durch:

```astro
<ZurichHero
  headline={heroData.headline}
  subtext={heroData.subtext}
  cta_text={heroData.cta_text}
  cta_link={heroData.cta_link}
  bild={heroData.bild}
  bildAlt={heroData.bildAlt}
/>
```

- [ ] **Schritt 4: Build prüfen**

```bash
cd ~/code/DanHealingArts && npm run build 2>&1 | tail -10
```

Erwartetes Ergebnis: `✓ Completed in X.XXs` ohne Fehler.

- [ ] **Schritt 5: Hero-Text im Output prüfen**

```bash
grep -o 'Berührung, die nicht zwingt[^<]*' dist/index.html
```

Erwartetes Ergebnis: `Berührung, die nicht zwingt, sondern lauscht und antwortet.`

- [ ] **Schritt 6: Committen**

```bash
cd ~/code/DanHealingArts && git add src/components/ZurichHero.astro src/pages/index.astro && git commit -m "refactor: ZurichHero reads from hero content collection"
```

---

## Task 6: pages.config.yml erstellen

**Files:**
- Create: `pages.config.yml` (im Root des Repos, neben package.json)

- [ ] **Schritt 1: Datei erstellen**

```yaml
media:
  input: public/images
  output: /images

content:
  - name: kurstermine
    label: "Kurstermine & Module"
    type: collection
    path: src/content/courses
    format: yaml
    fields:
      - name: nr
        label: "Modul-Nummer (z.B. Modul 1)"
        type: string
      - name: titel
        label: "Titel"
        type: string
      - name: datum
        label: "Datum (z.B. 18.–19. April 2026)"
        type: string
      - name: beschreibung
        label: "Beschreibung"
        type: text
      - name: link
        label: "Buchungs-Link (jupiterhaus.ch)"
        type: string
      - name: bild
        label: "Bild"
        type: image
      - name: bildAlt
        label: "Bild-Beschreibung (für Barrierefreiheit)"
        type: string
      - name: motto
        label: "Motto (kleiner Kursiv-Text)"
        type: string
      - name: schwerpunkte
        label: "Schwerpunkte (eine pro Zeile)"
        type: rich-text
      - name: bildPos
        label: "Bild-Position (object-center / object-top)"
        type: string
      - name: bildLinks
        label: "Bild links (true) oder rechts (false)"
        type: boolean

  - name: testimonials
    label: "Testimonials (Kundenstimmen)"
    type: collection
    path: src/content/testimonials
    format: yaml
    fields:
      - name: name
        label: "Name"
        type: string
      - name: location
        label: "Herkunft (z.B. USA, Germany)"
        type: string
      - name: quote
        label: "Zitat"
        type: text
      - name: photo
        label: "Foto"
        type: image

  - name: hero
    label: "Startseite — Hauptbild & Text"
    type: file
    path: src/content/hero/zurich.yaml
    format: yaml
    fields:
      - name: headline
        label: "Überschrift (große Schrift oben)"
        type: text
      - name: subtext
        label: "Untertext (kleine Beschreibung)"
        type: text
      - name: cta_text
        label: "Button-Text"
        type: string
      - name: bild
        label: "Hauptbild"
        type: image
      - name: bildAlt
        label: "Bild-Beschreibung (für Barrierefreiheit)"
        type: string
```

- [ ] **Schritt 2: Datei validieren — gültiges YAML?**

```bash
cd ~/code/DanHealingArts && python3 -c "import yaml; yaml.safe_load(open('pages.config.yml'))" && echo "YAML valid"
```

Erwartetes Ergebnis: `YAML valid`

- [ ] **Schritt 3: Committen und pushen**

```bash
cd ~/code/DanHealingArts && git add pages.config.yml && git commit -m "feat: add pages.config.yml for Pages CMS" && git push origin main
```

---

## Task 7: Coolify Webhook einrichten

**Ziel:** Jeder GitHub-Push löst automatisch einen Neubau auf Hetzner aus.

- [ ] **Schritt 1: Coolify Webhook-URL ermitteln**

1. Coolify Dashboard öffnen (URL: `http://178.104.15.187:8000` oder der Coolify-Subdomain-URL)
2. Projekt `dan-healing-arts` → Application → **Settings** Tab
3. Abschnitt **"Deploy Webhook"** → URL kopieren (Format: `https://coolify.domain/api/v1/deploy?uuid=XXX&token=YYY`)

- [ ] **Schritt 2: Webhook in GitHub eintragen**

1. GitHub → `stefannicolaus/dan-healing-arts` → Settings → Webhooks → **Add webhook**
2. **Payload URL:** die kopierte Coolify-URL
3. **Content type:** `application/json`
4. **Which events:** `Just the push event`
5. **Active:** ✓ angehakt
6. Klick **Add webhook**

- [ ] **Schritt 3: Webhook testen**

```bash
cd ~/code/DanHealingArts && git commit --allow-empty -m "test: trigger coolify webhook" && git push origin main
```

Dann in Coolify → Deployments prüfen: ein neues Deployment sollte innerhalb von 30 Sekunden erscheinen.

---

## Task 8: Pages CMS verbinden + Daniel einladen

- [ ] **Schritt 1: Pages CMS mit GitHub verbinden**

1. Browser öffnen: [app.pagescms.org](https://app.pagescms.org)
2. **"Sign in with GitHub"** → mit Stefan's GitHub-Account einloggen
3. **"Add repository"** → `stefannicolaus/dan-healing-arts` auswählen
4. Pages CMS liest automatisch `pages.config.yml` ein
5. Prüfen: drei Bereiche sichtbar? "Kurstermine & Module", "Testimonials", "Startseite — Hauptbild & Text"

- [ ] **Schritt 2: Daniel einladen**

1. In Pages CMS → **Settings** → **Collaborators** → **Invite**
2. Email: `danhealingarts@gmail.com`
3. Rolle: **Editor**

Daniel bekommt eine Email mit einem Link — kein GitHub-Account nötig.

- [ ] **Schritt 3: Funktionstest (Stefan macht das selbst)**

1. Als Daniel einloggen (den Email-Link nutzen)
2. "Kurstermine & Module" öffnen → Modul 1 anklicken
3. Datum auf `"TEST — 18.–19. April 2026"` ändern → Speichern
4. In GitHub prüfen: neuer Commit von Pages CMS erscheint
5. In Coolify prüfen: Deployment startet automatisch
6. Nach ~3 Minuten: `schweiz.danhealingarts.com` aufrufen — Test-Datum sichtbar?
7. Datum auf `"18.–19. April 2026"` zurücksetzen → Speichern

---

## Gesamtaufwand

| Task | Schwierigkeit | Geschätzte Zeit |
|------|--------------|-----------------|
| Task 1: config.ts | leicht | 5 min |
| Task 2: courses YAML | leicht | 10 min |
| Task 3: hero YAML | leicht | 5 min |
| Task 4: ZurichModule umstellen | mittel | 15 min |
| Task 5: ZurichHero + index.astro | mittel | 20 min |
| Task 6: pages.config.yml | leicht | 10 min |
| Task 7: Coolify Webhook | manuell | 10 min |
| Task 8: Pages CMS + Einladung | manuell | 10 min |
| **Gesamt** | | **~85 min** |

---

## Was NICHT in diesem Plan ist

- Hero-Bild Datei selbst hochladen (liegt bereits in `public/images/zurich/hero.jpg`)
- Neuer Hetzner-Server für Daniel (Phase 2)
- Cloudflare Setup (Phase 3)
- Andere Seiten (about-dan, level-1, level-2 etc.) — erst wenn Pilot erfolgreich
