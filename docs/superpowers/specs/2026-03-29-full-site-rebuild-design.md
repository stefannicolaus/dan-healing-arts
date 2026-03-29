# Dan Healing Arts — Full Site Rebuild

**Datum:** 2026-03-29
**Ziel:** danhealingarts.com komplett von Wix auf Astro migrieren, Design der schweiz.danhealingarts.com als Basis
**Hosting:** Hetzner/Coolify auf schweiz.danhealingarts.com (bestehender Server)
**Stack:** Astro + Tailwind CSS
**Sprache:** Englisch (wie Hauptseite)

---

## Seitenstruktur

| Seite | Pfad | Template | Content-Status |
|-------|------|----------|----------------|
| Home | `/` | Eigenes Layout | Von Wix übernehmen |
| About the Work | `/about-the-work` | Content-Seite | Von Wix übernehmen |
| Level 1 | `/level-1` | Training-Seite | Von Wix übernehmen |
| Level 2 | `/level-2` | Training-Seite | Von Wix übernehmen |
| Dates | `/dates` | Übersichts-Seite | Aus allen Standorten aggregiert |
| About Dan | `/about-dan` | Content-Seite | Von Wix übernehmen |
| Contact | `/contact` | Formular-Seite | Von Wix übernehmen |
| Zürich | `/zurich` | Modular-Template | Von Schweiz-Seite (existiert bereits) |
| Portugal | `/portugal` | Retreat-Template | Vollständig (siehe unten) |
| Mazunte | `/mazunte` | Retreat-Template | Vollständig (siehe unten) |
| Spain | `/spain` | Retreat-Template | Nur Location + "Coming soon" |
| Tulum | `/tulum` | Retreat-Template | Nur Location + "Coming soon" |

**Nicht migriert:** Level 3 (weggelassen), "Kopie von Level 1" (Wix-Duplikat), "Book Online" (durch Apply-Links ersetzt)

---

## Navigation

**Desktop:** Logo links, Menüpunkte horizontal:
Home | About this work | Level 1 | Level 2 | Dates | About Dan | Contact

**Dates** hat ein Dropdown mit den Standorten: Zürich, Portugal, Mazunte, Spain, Tulum

**Mobil:** Hamburger-Menü (wie Schweiz-Seite: halbtransparenter Hintergrund mit Blur-Effekt beim Scrollen)

**Instagram-Icon** rechts neben Navigation

---

## Design-Grundlage

Von der Schweiz-Seite übernommen:
- **Farben:** Warmer Cream-Hintergrund (`canvas`), erdige Stone-Akzente
- **Typografie:** Serif (Überschriften, poetischer Ton) + Sans-Serif (Body)
- **Layout:** Zentrierter Content, viel Weißraum, bewusst ruhig
- **Navigation:** Sticky, halbtransparent beim Scrollen (`backdrop-blur-md`)
- **Stimmung:** Meditativ, geerdet, körperlich

**21st.dev-Ergänzungen** (wo sinnvoll):
- Hero-Varianten für visuellen Impact
- Pricing-/Zimmer-Karten für die Retreat-Seiten
- Testimonial-Karten mit optionalem Foto
- Foto-Galerie/Carousel-Komponente
- Feature-Grid für "What You'll Learn" / "What You'll Receive"

---

## Template 1: Retreat-Landingpage (Portugal, Mazunte, später Spain, Tulum)

Jede Retreat-Seite ist eine eigenständige Landingpage mit folgendem Aufbau. **Testimonials sind KEINE eigene Sektion, sondern Trenner zwischen den Content-Sektionen.** Jeder Testimonial-Trenner hat einen optionalen Foto-Platz (Bild + Zitat nebeneinander wenn Foto vorhanden, nur Text zentriert wenn nicht).

### Sektionsreihenfolge

#### 1. Hero
- Vollbreites Venue-Bild mit Standort-Name als Overlay (groß, weiß, Versalien)
- Promo-Video (YouTube Embed) darunter oder als Alternative zum Bild
- Training-Titel: "The Essence of Deep Touch"
- Untertitel: "A Myofascial Somatic Liberation Training - Level 1" (Level 1 verlinkt auf /level-1)
- Datum + Ort
- Beschreibung: "A 7-day immersive training in fascia release, deep tissue massage and nervous system attunement."
- CTA-Button: "Apply for the Training" → /contact

#### 2. Foto-Galerie
- Überschrift: "Real moments from the [Standort] Training"
- 4 Fotos nebeneinander (responsiv: 2x2 auf mobil)

#### 3. Learning the Art of Deep Touch (Text links, Bild rechts)
- Heading: "Learning the Art of Deep Touch"
- Text: "The Essence of Deep Touch is an immersive professional training in fascia-based bodywork..." (vollständiger Block)
- Link: "→ Learn more about the full Level 1 training" → /level-1
- Bild rechts: Bodywork-Szene

#### 4. The Training Experience (Bild links, Text rechts)
- Heading: "The Training Experience"
- Text: "This training invites you to slow down, listen deeply..." (vollständiger Block)
- Bild links: Training-Szene

#### 5. Experiential Learning (Text links, Bild rechts)
- Text: "The learning is highly experiential and hands-on..." (vollständiger Block)
- CTA-Button: "Apply for the Training" → /contact
- Bild rechts: Yoga/Praxis-Szene

--- Testimonial-Trenner: Rebecca, Canada (optionales Foto) ---

#### 6. The Field We Practice In (Text links, 2 Bilder rechts)
- Heading: "The Field We Practice In" (Tippfehler "Pratice" korrigiert)
- Text: "This training isn't just about learning to touch..." bis "...a spiraling movement of opening, unwinding and empowerment."
- 2 Bilder rechts

--- Testimonial-Trenner: Lasse, Finland (optionales Foto) ---

#### 7. Venue & Location — STANDORTSPEZIFISCH

**Portugal:**
- Heading: "The Space That Holds the Work"
- Text: "Nestled in nature just 30 minutes from Lisbon, The Shanti Space..."
- Link: www.theshantispace.com
- Text: "The Garden Shala is a beautiful converted glass Victorian Greenhouse..."
- 3 Venue-Bilder

**Mazunte:**
- Heading: "The Place That Holds the Work"
- Text: "Set in the tranquil yet vibrant beach town of Mazunte..."
- Untersektion: Bliss Haven Details — "Bliss Haven Retreat Center is tucked into a lush garden..."
- Link: blisshaven.yoga
- Untersektion: Freizeit/Natur — "In the early mornings, during the breaks..."
- Sonnenuntergang-Bild

#### 8. Held & Nourished — STANDORTSPEZIFISCH

**Portugal:**
- Heading: "Held & Nourished"
- Text: "Throughout the retreat, you'll be nourished with three daily meals..."
- Chef: Zoe (www.wild-delicacies.com)
- "nutrition-dense, gluten-free"
- 1 Food-Bild

**Mazunte:**
- Heading: "Held & Nourished"
- Text: "Breakfast and lunch are included each day..."
- Catering: Umami Restaurant (umamisanagus.mx)
- "Dinner is left open so you can explore Mazunte..."
- "communal kitchen available"
- 4 Food-Bilder (2x2 Raster)

--- Testimonial-Trenner: Laura, UK (optionales Foto) ---

#### 9. Who Is This Training For
- Heading: "Who Is This Training For"
- Text: "This is for anyone drawn to explore the power of deep, slow and profound emotional bodywork..." (vollständiger Block)
- Hinweis: "Please note: This training is designed to touch deeply and to be deeply touched. A respectful presence and clear boundaries are essential."
- CTA-Button: "Apply for the Training" → /contact

#### 10. Tagesablauf (von Level 1 ergänzt)
- Heading: "A Day at the Training"
- Tabelle:

| Zeit | Aktivität |
|------|-----------|
| 08:00 | Yoga, breathwork, chanting, sharing |
| 09:15 | Breakfast |
| 10:00 | Massage demo and practice |
| 13:30 | Lunch and break |
| 15:30 | Massage demo and practice |
| 18:30 | Sharing and closing for the day |
| 19:00 | Dinner |
| 20:00 | Different rituals and group activities (optional) |

#### 11. What You'll Receive (Gruppenfoto darüber)
- Gruppenfoto
- Heading: "What You'll Receive"
- Liste:

**Portugal:**
- 7 days/ 6 nights accommodation
- 3 daily nourishing meals
- Daily bodywork/massage lessons and practice sessions
- Daily yoga, meditation, breathwork, and voice work
- Integration circles, kirtan and ceremonial spaces
- Course manual
- Video recordings of all bodywork sequences
- Certificate of completion
- Pre- and post-retreat support

**Mazunte:**
- 7 days/ 6 nights accommodation
- 2 nourishing meals daily
- Daily bodywork/massage lessons and practice sessions
- Daily yoga, meditation, breathwork, and voice work
- Integration circles, kirtan and ceremonial spaces
- Course manual
- Video recordings of all bodywork sequences
- Certificate of completion
- Pre- and post-retreat support

#### 12. Zimmer & Preise — STANDORTSPEZIFISCH
- Heading: "Your Stay at [Venue Name]"
- Einleitungstext: "A range of comfortable accommodation options..."
- "All options include full participation in the training, meals, and practices..."
- "After your application, I'll personally confirm availability and next steps."
- "Choose the room option that feels right for you below."

**Portugal — 4 Pricing Cards:**

| Zimmer | Regular (bis 30.04.2026) | Late Bird (ab 01.05.2026) |
|--------|--------------------------|---------------------------|
| Spacious Shared Dorm (6 people max.) | 1.549 EUR | 1.749 EUR |
| Shared Twin Room / shared bathroom | 1.699 EUR | 1.849 EUR |
| Shared Twin Room / private bathroom | 1.799 EUR | 1.949 EUR |
| Private Single Glamping Tent / shared bathroom | 1.999 EUR | 2.149 EUR |

**Mazunte — 4 Pricing Cards:**

| Zimmer | Early-Bird (bis 30.06.2026) | Regular (ab 01.07.2026) |
|--------|----------------------------|-------------------------|
| Shared Triple Room / Private Bathroom | 1.499 USD | 1.699 USD |
| Shared Twin Room / Private Bathroom | 1.599 USD | 1.799 USD |
| Private Single Studio / Private Bathroom | 1.749 USD | 1.949 USD |
| Program & 2 Daily Meals (No Lodging) | 1.349 USD | 1.499 USD |

Jede Card: Zimmer-Foto oben, Titel, Early-Bird Preis + Datum, Regular Preis + Datum, Button "Apply for this Room" → /contact

Unter den Cards: "Still unsure which option is right for you? Feel free to reach out with any questions. → Get in touch"

#### 13. Practical Details
- Heading: "Practical Details"

**Portugal:**
- Dates: June 1 - 7, 2026
- Arrival: June 1, 15:00
- Departure: June 7, 12:00
- Location: The Shanti Space, near Lisbon, Portugal
- ~30 minutes from Lisbon airport
- Level 1 Training Certificate upon full participation
- Deposit required, cancellation terms during booking

**Mazunte:**
- Dates: January 24 - 30, 2027 (Hero zeigt "23-30" — Korrektur auf 24-30 basierend auf Practical Details)
- Arrival: January 24, 15:00
- Departure: January 30, 13:00
- Location: Bliss Haven Retreat Center, Mazunte, Mexico
- ~60 minutes from Puerto Escondido (PXM) and Huatulco (HUX) airports
- Level 1 Training Certificate upon full participation
- Deposit required, cancellation terms during booking

#### 14. Closing Statement
- Kursiv, zentriert: "This training is an invitation to slow down, to listen, and to reconnect with the intelligence of touch - in yourself and in others. If you feel called, you're warmly welcome to join us."

#### 15. Footer
- (c) 2024 by Dan Healing Arts
- Instagram-Icon → instagram.com/dan.healing.arts

---

## Template 2: Zürich/Modular (bestehende Schweiz-Seite)

Die aktuelle schweiz.danhealingarts.com wird zur `/zurich`-Route. Sektionen bleiben identisch:

1. Sticky Navigation (jetzt globale Nav mit allen Seiten)
2. Hero (Bild, poetische Headline, CTA)
3. Methode/Philosophie
4. Zwei-Spalten: "Für Praktizierende" / "Für dich persönlich"
5. 4-Module-Raster (Kurskarten mit Datum, Preis 420 CHF, jupiterhaus.ch Buchungslinks)
6. Erfahrungsberichte (2 Zitate)
7. Über Daniel (Portrait, Bio)
8. Kontakt/Anmeldeformular
9. Footer

**Sprache bleibt Deutsch** für die Zürich-Seite (Zielgruppe Deutschschweiz).

---

## Homepage (`/`)

| # | Sektion | Inhalt |
|---|---------|--------|
| 1 | Hero | Großes Bild, "Learn to Listen with Your Hands", Beschreibung der transformativen Kraft tiefer somatischer Körperarbeit, CTA |
| — | Testimonial-Trenner | Ely, UK: "..." |
| 2 | Training Pathway | Überblick Level 1 "The Essence of Deep Touch" + Level 2 "An Evolution of Sensitivity" — Kurzbeschreibungen, Links zu /level-1 und /level-2 |
| 3 | Video-Einblicke | "An Insight into the Bodywork Trainings" — YouTube Embeds (Portugal Sept 2025, México Jan 2023) |
| 4 | Upcoming Trainings | Nächste Termine als Karten: Zürich Level 1a (18.-19. April 2026), Zürich Level 1b (13.-14. Juni 2026), Portugal Level 1 (1.-7. Juni 2026), Mazunte Level 1 (24.-30. Januar 2027) — jede Karte verlinkt auf Standort-Seite |
| — | Testimonial-Trenner | Jane, USA: "..." |
| 5 | About-Teaser | Kurzvorstellung Daniel Wendt, 18 Jahre Erfahrung, Foto, Link zu /about-dan |
| 6 | Contact | Kontaktformular + E-Mail: danhealingarts@gmail.com |
| 7 | Footer | Instagram, Copyright |

---

## Level 1 (`/level-1`)

Vollständiger Content von der Wix-Seite. Testimonials als Trenner verteilt (wie auf der Originalseite):

| # | Sektion | Inhalt |
|---|---------|--------|
| 1 | Intro | "The Essence of Deep Touch is the foundational training..." (vollständiger Textblock) |
| — | Testimonial-Trenner | Nico Akiba, USA |
| 2 | A Practical Approach | "Set in a retreat space surrounded by nature..." |
| — | Testimonial-Trenner | Erika, Lithuania |
| 3 | What You'll Learn | 12-Punkte-Liste (von "The foundational principles..." bis "...Structured sequences that support intuition, clarity, and creative flow") |
| — | Testimonial-Trenner | Paige, USA |
| 4 | Exploring the Body | Days 1–3: Fundamentals / Days 4–6: In Depth + 5 Körperbereiche mit emotionalen Qualitäten |
| — | Testimonial-Trenner | Jili, USA |
| 5 | Yoga, Breathwork, Meditation | Begleitende Praktiken |
| 6 | Sample Day Schedule | Tagesablauf-Tabelle (08:00–20:00) |
| — | Testimonial-Trenner | Rebecca, Canada |
| 7 | Upcoming Trainings | Portugal, Zürich (1a + 1b), Mazunte — mit Links zu Standort-Seiten |

---

## Level 2 (`/level-2`)

Gleiche Struktur wie Level 1 — Content von der Wix Level-2-Seite. Noch zu scrapen bei Implementation.

---

## About the Work (`/about-the-work`)

Vollständiger Methodentext von der Wix-Seite. Noch zu scrapen bei Implementation.

---

## About Dan (`/about-dan`)

Biografie, Qualifikationen, Foto von Daniel Wendt. Noch zu scrapen bei Implementation.

---

## Dates (`/dates`)

Übersichtsseite aller Termine, chronologisch oder nach Standort gruppiert:

| Datum | Ort | Level | Link |
|-------|-----|-------|------|
| 18.-19. April 2026 | Zürich | Level 1a | /zurich |
| 10.-16. Mai 2026 | Spain | Level 2 | /spain |
| 1.-7. Juni 2026 | Portugal | Level 1 | /portugal |
| 13.-14. Juni 2026 | Zürich | Level 1b | /zurich |
| 24.-30. Januar 2027 | Mazunte | Level 1 | /mazunte |

---

## Contact (`/contact`)

- Kontaktformular (Name, E-Mail, Nachricht)
- E-Mail: danhealingarts@gmail.com
- Instagram: @dan.healing.arts → instagram.com/dan.healing.arts
- Formular zunächst als mailto, später erweiterbar

---

## Spain (`/spain`) — Vorschau-Seite

- Hero: Location-Bild, "SPAIN"
- Location: Hidden Paradise, Alpujarra-Berge, Granada — Beschreibung, Link zu hiddenparadise.org
- Ankündigung: "Level 2 Training — 10.-16. Mai 2026"
- CTA: "Get in touch" → /contact
- Footer

---

## Tulum (`/tulum`) — Vorschau-Seite

- Hero: Location-Bild, "TULUM"
- Location: Casa Arkaana, Chemuyil bei Tulum — Beschreibung, Link zu casaarkaana.com
- Ankündigung: "Dates to be announced"
- CTA: "Get in touch" → /contact
- Footer

---

## Content Collections (Astro)

### `/content/testimonials/`
Jedes Testimonial als eigene Markdown-Datei:
```yaml
---
name: "Rebecca"
location: "Canada"
photo: "" # optional — Pfad zum Bild, leer = nur Text
quote: "I came into this course knowing basically nothing about massage..."
usedOn: ["portugal", "mazunte", "level-1"] # wo dieses Testimonial angezeigt wird
---
```

### `/content/dates/`
Jeder Termin als eigene Datei:
```yaml
---
title: "Level 1 — Portugal"
level: 1
location: "portugal"
venue: "The Shanti Space"
startDate: "2026-06-01"
endDate: "2026-06-07"
arrivalTime: "15:00"
departureTime: "12:00"
currency: "EUR"
rooms:
  - name: "Spacious Shared Dorm (6 people max.)"
    regularPrice: 1549
    lateBirdPrice: 1749
    earlyBirdDeadline: "2026-04-30"
  - name: "Shared Twin Room / shared bathroom"
    regularPrice: 1699
    lateBirdPrice: 1849
    earlyBirdDeadline: "2026-04-30"
  # ... weitere Zimmer
---
```

### `/content/locations/`
Jeder Standort als eigene Datei mit Venue-Beschreibung, Bildern, Anreise-Infos.

---

## Bilder

Alle Bilder von Wix herunterladen und lokal in `/public/images/` speichern:
- `/public/images/portugal/` — Venue, Training, Food
- `/public/images/mazunte/` — Venue, Training, Food
- `/public/images/spain/` — Location
- `/public/images/tulum/` — Location
- `/public/images/zurich/` — bestehende Bilder
- `/public/images/general/` — Logo, Dan Portrait, Allgemeine Bilder

Alle Wix-URLs sind in den Scrape-Ergebnissen erfasst und werden 1:1 heruntergeladen.

---

## Formulare

- Zunächst statisch: mailto-Link oder einfaches Formular das an danhealingarts@gmail.com sendet
- Später erweiterbar mit Backend/API

---

## Hinweise für Implementation

- **Tippfehler korrigieren:** "The Field We Pratice In" → "Practice"
- **Datumsinkonsistenz Mazunte:** Hero zeigt "23-30 January" aber Practical Details sagt "January 24-30" → verwende 24.-30. Januar 2027
- **Zürich-Seite bleibt Deutsch**, alle anderen Seiten Englisch
- **Wix "Book Online"** wird nicht migriert — Buchung läuft über Apply-Buttons → /contact
- **Copyright:** "(c) 2024 by Dan Healing Arts" — Daniel entscheidet ob Update auf 2026

---

## Testprojekt-Ziele

Diese Migration dient auch als Testprojekt für Stefans Workflows:
- Design-Pipeline: Stitch → 21st.dev → taste-skill → QC
- Astro Content Collections für strukturierte Daten
- Coolify/Hetzner Deployment
- Accessibility + Metadata Skills
- Screenshot-basierte QC (Desktop + Mobil)
