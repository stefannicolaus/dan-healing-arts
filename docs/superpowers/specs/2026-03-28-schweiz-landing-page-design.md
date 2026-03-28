# Design-Spec: schweiz.danhealingarts.com
**Stand:** 2026-03-28
**Ziel:** Deutsche Landing Page für Daniels Schweizer Wochenendkurse auf Subdomain schweiz.danhealingarts.com

---

## Projekt-Kontext

Daniel Wendt ist Myofascial Somatic Release Practitioner & Lehrer. Er bietet 4 Wochenendkurse in Zürich (Jupiterhaus) auf Deutsch an — je 420 CHF, einzeln oder als Reihe buchbar.

Die Seite ist auf Deutsch, weil die Kurse auf Deutsch gehalten werden. Die englische Hauptseite (danhealingarts.com / Wix) bleibt unberührt.

---

## Stack

- **Framework:** Astro (statisch)
- **Hosting:** Hetzner / Coolify (wie Stefan's andere Projekte)
- **Domain:** schweiz.danhealingarts.com (Subdomain, DNS-Eintrag bei danhealingarts.com)

---

## Zielgruppe

Zwei Gruppen, beide werden angesprochen:

1. **Praktiker** — Therapeuten, Yogalehrer, Masseure, Physiotherapeuten → lernen Techniken
2. **Persönliche Entwicklung** — Menschen die tiefer in Körper & Emotionen einsteigen wollen

---

## Seitenstruktur (Story-Flow)

### 1. Hero

**Hintergrundbild:** Daniel bei der Arbeit — Hände auf Gewebe, warm, ruhig, professionell

**Headline:**
> Berührung, die nicht zwingt, sondern lauscht und antwortet.

**Subheadline:**
> Diese Ausbildungsreihe "Somatische Tiefenmassage & Faszien Release" vermittelt eine achtsame, tiefgehende Form der Körperarbeit, in der präzise Faszienarbeit mit somatischer Präsenz verbunden wird — Wochenendkurse in Zürich

**CTA-Button:** "Kurse ansehen" → scrollt zu Modul-Sektion

---

### 2. Die Methode

**Quelle:** Daniels eigene Beschreibung von der Einzelsitzungs-Seite (jupiterhaus.ch)

> Die somatische Tiefenmassage kombiniert Faszien-Release, Tiefengewebsmassage und Energiearbeit mit langsam fließenden, schrittweise tiefer gehenden Griffen. Die Behandlung zielt darauf ab, muskuläre Spannungen zu lösen und Gewebeschichten nachhaltig zu öffnen. Der Therapeut orientiert sich an den individuellen Reaktionen des Nervensystems. Neben körperlicher Entspannung können auch emotionale Themen durch achtsame Begleitung adressiert werden.

---

### 3. Für wen

Zwei Blöcke nebeneinander:

**Für Praktizierende:**
- Massagetherapeuten, Yogalehrer, Physiotherapeuten
- Körperarbeiter die ihre Techniken vertiefen wollen
- Lerne präzise Faszientechniken mit somatischer Präsenz

**Für dich persönlich:**
- Menschen die tiefer in sich selbst fühlen wollen
- Wer emotionale Muster über den Körper lösen möchte
- Wer Körperarbeit nicht nur als Technik, sondern als Begegnung erleben will

---

### 4. Die 4 Module

Vier Cards — je Modul:
- Modulnummer & Körperbereich
- Motto
- Datum
- Preis: 420 CHF
- Kurze Inhaltsbeschreibung
- Link: Jupiterhaus-Anmeldeseite (externe Buchung)

| Modul | Bereich | Motto | Datum |
|-------|---------|-------|-------|
| 1 | Rücken & Nacken | Vergangenes loslassen, um voran zu schreiten | 18.–19. April 2026 |
| 2 | Bauch, Becken & Beine | In der Erde verwurzelt ins Gleichgewicht finden | 13.–14. Juni 2026 |
| 3 | Brustkorb, Schultergürtel & Arme (Herzraum) | Dem Herzen Raum geben | 22.–23. August 2026 |
| 4 | Gesicht, Kopf & Nacken (Vertiefung) | Im Raum der Stille Klarheit finden | 17.–18. Oktober 2026 |

**Hinweis unter den Cards:** Alle Module einzeln buchbar oder als Gesamtreihe (8 Tage = gleichwertiger Inhalt wie ein 5-tägiges Level-1-Retreat)

**Zeiten:** Jeweils 9:30–19:30 Uhr | **Ort:** Jupiterhaus Zürich

---

### 5. Testimonials

**Format:** Bild + Textquote (Deutsch) + 1 eingebettetes Video (Englisch, optional deutsche Untertitel)

- 2–3 Textquotes mit Foto + Name + ggf. Beruf
- 1 Video-Testimonial eingebettet (Daniel stellt bereit)

**Content-Status:** Daniel muss deutsche Testimonial-Texte + Video-Link liefern

---

### 6. Über Daniel

**Quelle:** Daniels deutsche Bio aus "Kurs Zürich.docx"

> Von Natur aus eher Abenteurer und Entdecker als Philosoph, habe ich in meinem Leben stets nach direkten, deutlich wahrnehmbaren Erfahrungen gesucht. Von Backpacking über Bauarbeit, von Rap-Bühnen über Immobilienfirmen, vom durch die Welt trampen bis hin zur Gründung einer Familie mit zwei wunderbaren Kindern, habe ich sowohl unermesslich schöne als auch schwierige und schmerzhafte Zeiten durchlebt.
>
> Ich fand Freiheit, Frieden und Inspiration, als ich vor über 15 Jahren anfing, tief in die Körperarbeit und Yoga einzutauchen, und konnte nach und nach viele einschränkende Glaubenssätze und konventionelle Normen hinter mir lassen.
>
> In meinen Kursen, Behandlungen, Trainings und Retreats lehre ich eine einzigartige Mischung aus Faszien-Release, Tiefengewebsmassage und Energiearbeit. In einem sicheren Rahmen lade ich dich ein, die Schönheit und Wichtigkeit tiefer menschlicher Verbindung zu erkunden und deinen eigenen Körper als einen unendlichen Erfahrungsraum zu erleben, in dem du Kraft tanken und heilen kannst.

**Zahlen:**
- 22+ geleitete Ausbildungen in Deutschland und Mexiko
- 2.500+ Stunden Yogalehrerausbildungen
- 17 Körperarbeit-Trainingskurse

**Foto:** Portrait-Foto von Daniel (von Website oder Instagram)

---

### 7. Kontaktformular

**Felder:**
- Name (Pflicht)
- Email (Pflicht)
- WhatsApp (optional)
- Welches Modul interessiert dich? (Dropdown: Modul 1, Modul 2, Modul 3, Modul 4, Alle Module, Einzelsitzung)
- Nachricht (optional)

**Submit-Button:** "Nachricht senden"

**Nach Absenden:** Bestätigungs-Text (kein Redirect)

**Weiterleitung:** Formular-Daten an danhealingarts@gmail.com

---

## Design-Richtung

- **Ästhetik:** Warm, geerdet, minimal — passend zur bestehenden Dan Healing Arts Brand
- **Farben:** Erdtöne, warmes Weiß/Creme, tiefes Grün oder Dunkelbraun als Akzent
- **Typografie:** Serifenlos für Body, evt. Serif für Headlines — ruhig, nicht klinisch
- **Bilder:** Daniels eigene Fotos (von Website + Instagram) — echte Körperarbeits-Szenen
- **Prototyp:** DESIGN.md für Google Stitch erstellen vor dem Bau

---

## Content noch ausstehend (Daniel liefert)

- [ ] Deutsche Testimonial-Texte mit Foto + Name
- [ ] Video-Testimonial Link (YouTube/Vimeo)
- [ ] Hochauflösende Portraits + Bodywork-Fotos

---

## Externe Links (Buchung)

Alle Module verlinken auf die bestehenden Jupiterhaus-Seiten:
- Modul 1: https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-1-ruecken-nacken/
- Modul 2: https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-2-bauch-becken-beine/
- Modul 3: https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-3-brustkorb-schulterguertel-arme-herzraum/
- Modul 4: https://jupiterhaus.ch/events/somatische-tiefenmassage-faszien-release-modul-4-gesicht-kopf-nacken-vertiefung/
- Einzelsitzungen: https://jupiterhaus.ch/events/einzelsitzungen-somatische-tiefenmassage-faszien-release/

---

## Nächste Schritte — vollständige Design-Pipeline

1. **stitch-skill** → DESIGN.md erstellen (Farben, Fonts, Atmosphäre) → in Google Stitch einfügen → Mockup-Screens → Stefan + Daniel reviewen
2. **21st.dev** → Komponenten aussuchen: Hero, Module-Cards, Testimonials, Kontaktformular, Nav → in `components/` speichern
3. **writing-plans** → Implementierungsplan für Astro-Bau
4. **Astro aufsetzen** auf Hetzner/Coolify
5. **Seite bauen** mit Daniels Content
6. **taste-skill** → Fonts, Spacing, Farben normalisieren
7. **QC** → /fixing-accessibility + /fixing-metadata + Screenshots (1440px + 390px)
8. **DNS** → schweiz.danhealingarts.com einrichten
