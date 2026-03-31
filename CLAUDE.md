# Dan Healing Arts — Projekt-Kontext

**Projekt:** dan-healing-arts
**Website:** danhealingarts.com (Wix, Englisch)
**Instagram:** @dan.healing.arts
**Verzeichnis:** ~/code/DanHealingArts/

---

## WAS IST DAS

Daniel ist Massage-Therapeut und Healing Arts Practitioner. Er bietet:
- Englische Multi-Day Retreats (Marokko, Portugal, Kanada)
- Deutsche Wochenendkurse in der Schweiz (4 Module à 2 Tage)

Stefan hilft Daniel, seine Online-Präsenz mit Claude aufzubauen und zu automatisieren.

---

## MEMORY

@~/code/DanHealingArts/memory/dan-core.md

---

## AKTUELLE PRIORITÄT

Subdomain **schweiz.danhealingarts.com** — deutsche Landing Page für Schweizer Kurse.

Content-Quellen:
- danhealingarts.com (scrapen)
- Google Drive (Daniel teilt)
- Englisches Manual (vollständig)
- Deutsche Teil-Manuals (2 Module)

---

## STACK

- Neue Seite: Astro + Hetzner/Coolify
- Bestehende Seite: Wix (bleibt erstmal)

## BRIEFING-DOKUMENTE LESEN (PFLICHT)

Wenn Daniel ein Briefing-Dokument schickt (Google Doc / .docx):

1. **Datei herunterladen** via `mcp__google-workspace__get_drive_file_download_url`
2. **Bilder extrahieren**: `unzip /pfad/zur/datei.docx "word/media/*" -d /tmp/dan-doc/`
3. **Alle Bilder visuell lesen** (Read tool auf jedes image*.png/jpg) — die Screenshots zeigen welcher Abschnitt welche Änderung bekommt
4. **Text lesen** via `mcp__google-workspace__get_doc_content`
5. **Erst dann** Bilder und Text zusammen interpretieren

**VERBOTEN:** Nur den XML-Text parsen ohne die eingebetteten Screenshots zu sehen. Ohne visuelle Kontrolle der Screenshots werden Foto-Zuordnungen falsch gemacht.

**Fotos:** Immer Originale aus den Google Drive Fotoordnern nehmen — NIE die eingebetteten Screenshots aus dem Dokument (schlechte Qualität). Fotoordner: https://drive.google.com/drive/folders/1Im7Z54V1HWXKQphMWf98KcawOTJMr37X

---

## QC

**URL:** https://schweiz.danhealingarts.com (wenn live)
**Haupt-Website:** https://danhealingarts.com (Wix, extern)
**Seitentyp:** Landing Page (Schweizer Kurse)

**Seiten zu prüfen:**
- Startseite schweiz.danhealingarts.com
- Kurs-Übersicht (4 Module)
- Einzelnes Modul-Detail
- Buchungs-/Kontaktseite
- Mobile Menu

**Besonderheiten:**
- Astro auf Hetzner/Coolify — Dev-Server localhost:4321
- Deutsch (Schweizer Kurse), Hauptseite ist Englisch
- Healing Arts Ästhetik: Warm, ruhig, vertrauenswürdig
- Preise in CHF (nicht EUR)
- Daniel's Brand-Farben/Fonts aus Wix-Seite übernehmen
