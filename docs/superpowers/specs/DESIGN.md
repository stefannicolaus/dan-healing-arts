# Design System: schweiz.danhealingarts.com

## 1. Visual Theme & Atmosphere

A warm, embodied interface — like stepping into a sunlit bodywork studio with wooden floors, linen towels, and forest light through high windows. The atmosphere is intimate, grounded, and quietly confident. Not clinical, not spa-generic, not wellness-corporate.

- **Density:** 3/10 — Gallery-airy. Generous whitespace. Let the content breathe like tissue releasing under patient hands.
- **Variance:** 6/10 — Asymmetric layouts, offset image placements, left-aligned text blocks. No centered hero.
- **Motion:** 4/10 — Fluid and restrained. Slow fades, gentle parallax. Movements that mirror the quality of somatic work: unhurried, intentional.

The palette is warm Linen and Forest — not cool Zinc. Every color carries warmth. This is a handcrafted practice, not a tech product.

---

## 2. Color Palette & Roles

- **Canvas Cream** (#F8F5F0) — Primary background surface, warm off-white
- **Parchment White** (#FDFBF7) — Card and container fill, lighter layer
- **Deep Umber** (#2C1F14) — Primary text, warm dark brown (not cold charcoal)
- **Warm Stone** (#8B7355) — Secondary text, descriptions, dates, metadata
- **Linen Whisper** (rgba(210,200,185,0.4)) — Borders, subtle structural lines
- **Forest Sage** (#4A6741) — Single accent — CTAs, active states, focus rings, hover indicators. Earthy green, saturation ~45%. No neon variant.
- **Charcoal Overlay** (#1A1208) — Hero overlay when text sits on photography

---

## 3. Typography Rules

- **Display / Headlines:** `Fraunces` — Variable weight serif with warmth and editorial character. Track-tight, weight-driven hierarchy (wght 700–900). Used for H1, H2, section titles. Fraunces carries the organic, human quality of Daniel's work.
- **Body:** `Outfit` — Clean grotesque, relaxed leading (1.7), max 65ch line width, Warm Stone for secondary text
- **Accent / Metadata:** `Outfit` Light — dates, prices, module numbers
- **Scale:** Display 3.5rem → H2 2rem → H3 1.25rem → Body 1.0625rem → Small 0.875rem
- **Banned:** Inter, Times New Roman, Georgia, Garamond, Palatino. No screaming oversized display text. No gradient text effects.

---

## 4. Component Stylings

- **Primary Button (CTA):** Forest Sage fill (#4A6741), Parchment White text. Rounded corners 0.5rem. No outer glow. Tactile -1px translate + slight shadow deepen on active. Padding: 0.875rem 2rem.
- **Ghost Button:** 1.5px Forest Sage border, Deep Umber text, transparent fill. Same hover: Forest Sage fill, Parchment text.
- **Module Cards:** Warm Linen border (1px), Parchment White fill, corner radius 1.5rem. Generous padding 2rem. Subtle diffused shadow (0 4px 24px rgba(44,31,20,0.06)). On hover: border deepens to Warm Stone, shadow lifts slightly. NOT 3 equal columns — use asymmetric 2+2 grid or horizontal scroll on mobile.
- **Contact Form Inputs:** Label above input (never floating), Linen Whisper border, focus ring Forest Sage. Error text below in warm red. Clean, no shadow on idle state.
- **Testimonial Quote Block:** Large opening quotation mark in Forest Sage, Fraunces italic for quote text, Outfit small caps for name/profession. Warm Stone background tint.
- **Stat Numbers:** Fraunces Bold, oversized (4rem+), Deep Umber. Inline with Outfit body context.

---

## 5. Layout Principles

- **Hero:** Asymmetric split — large portrait photography occupies left 55%, text block right 45% with generous padding. Never centered. Headline left-aligned.
- **Sections:** Max-width 1320px, centered, with horizontal padding clamp(1.5rem, 5vw, 5rem)
- **Module Cards:** 2×2 asymmetric grid — first row: 1 wide card (60%) + 1 narrow (40%). Second row reversed. On mobile: single column stack.
- **Testimonials:** Horizontal scroll or 2-column offset grid. NOT 3 equal columns.
- **Spacing System:** Section vertical gaps `clamp(4rem, 10vw, 8rem)`. Internal component gaps `clamp(1.5rem, 3vw, 2.5rem)`.
- **No overlapping elements** — every element occupies clean spatial zone.
- **Full-height sections:** `min-h-[100dvh]` only. Never `h-screen`.

---

## 6. Motion & Interaction

- **Scroll reveals:** Fade-up with slight Y-translation (0 → -12px). Staggered cascade for lists and cards (80ms delay per item). `opacity: 0 → 1`, `transform: translateY(12px) → 0`.
- **Spring Physics:** stiffness 80, damping 18 — slow, weighty, intentional. Mirrors the quality of somatic touch.
- **Hero image:** Slow Ken Burns parallax (scale 1.0 → 1.04 over 8s infinite, ease in-out). Perpetual, subtle, breathing.
- **Module cards:** On hover — border lifts, shadow softens forward, 200ms ease-out. No bounce.
- **CTA Button:** Pulse-breath micro-loop (scale 1.0 → 1.015 → 1.0, 3s infinite ease-in-out) when idle in viewport.
- **Performance:** All animations via `transform` and `opacity` only. Never animate layout properties.

---

## 7. Anti-Patterns (Banned)

- No emojis anywhere
- No `Inter` font
- No generic serifs: Times New Roman, Georgia, Garamond, Palatino
- No pure black (#000000) — Deep Umber (#2C1F14) only
- No neon glows or outer glow shadows
- No oversaturated accents (Forest Sage stays ≤ 45% saturation)
- No gradient text on headlines
- No custom mouse cursors
- No overlapping elements
- No 3-column equal card layout
- No centered Hero section
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Holistic Journey", "Transform Your Life", "Next-Level"
- No filler text: "Scroll to explore", "Swipe down", bouncing chevrons
- No broken image placeholders — use Daniel's actual photos or warm SVG placeholders
- No cold grays (Zinc/Slate) — warm Linen palette throughout
- No spa-corporate aesthetic: no white marble, no gold accents, no lotus icons
- No wellness-startup clichés: no gradient orbs, no abstract blobs, no frosted glass cards
