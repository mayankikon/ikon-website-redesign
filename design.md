# design.md — Agave (useagave.com) UI design system

Captured 2026-09-22 from the live site via computed styles. This is a **design-system
spec** (tokens, layout rules, component anatomy) for reuse — not a copy of Agave's
copy, imagery, or brand marks.

## Implementation update

The Ikon homepage now follows the live Agave page architecture as well as these
tokens. The current implementation is in `styles-agave.css` and uses:

- a persistent announcement ribbon plus dark navigation stack;
- full-bleed section bands with content held to a centered 1280px measure;
- 90px-scale desktop display type with Geist as the licensed-font substitute;
- 18px × 36px primary CTA padding and square corners;
- alternating copy/product-visual bands instead of a conventional card grid;
- a dedicated dark, gridded proof section for headline metrics;
- one editorial case study at a time with accessible carousel controls;
- responsive white mobile navigation modeled on Agave's compact menu.

Interaction details adapt MIT patterns reviewed on 21st.dev: directional arrows
cycle through a clipped viewport instead of simply shifting, carousel controls
use compact icon motion and a numeric progress indicator, and touch users can
swipe testimonials. Menu enter/exit motion follows Emil Kowalski's timing model
(220ms enter, 160ms exit, ease-out). All motion is disabled under
`prefers-reduced-motion`.

Iconography comes from [Lucide](https://lucide.dev/icons/) (ISC licensed), inlined
as an SVG `<symbol>` sprite at the top of `index.html` and referenced with `<use>`.
Geometry lives in the sprite; stroke colour and weight live on the `.icon` class, so
icons inherit `currentColor` and can be resized per context. Directional arrows use
`arrow-right` / `arrow-left`; the "why us" pillars use `layers`,
`circle-dollar-sign`, `handshake` and `radar`.

`styles.css` is retained as the earlier design-system interpretation for comparison.

---

## 1. Design character

A "serious-software-for-a-physical-industry" look:

- **Bright white canvas** broken by **full-bleed near-black-navy slabs**.
- **Zero border radius.** Every button, card, chip, input and image is a sharp
  rectangle. This is the single most identity-defining rule of the system.
- **Huge, light-weight display type** with tight negative tracking, set against
  small uppercase monospace eyebrows.
- **One loud accent** (acid green) used sparingly — primary CTA, numerals, icon
  fills, underline rules. Never as a large fill area.
- Generous whitespace; long vertical rhythm; content locked to a wide container.
- Photography is real job-site photography, darkened with a scrim so white type
  sits on it.

---

## 2. Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Default page surface |
| `--ink` | `#000000` | Headings, primary text |
| `--ink-2` | `#333333` | Body copy |
| `--ink-3` | `#6B7280`* | Meta, captions |
| `--surface-dark` | `#050F1D` | Full-bleed dark sections (hero scrim, footer, stats) |
| `--surface-dark-2` | `#0C1B31` | Cards inside dark sections |
| `--surface-dark-3` | `#0F1B2E` | Alt dark card / hover |
| `--surface-soft` | `#F3F7F4` | Tinted section band (barely-green off-white) |
| `--surface-soft-2` | `#F0F3F5` | Neutral section band |
| `--line` | `#E5E5E5` | Hairline borders, dividers |
| `--line-dark` | `rgba(255,255,255,.13)` | Borders on dark |
| `--accent` | `#17CF60` | Primary CTA fill, numerals, icons |
| `--accent-ink` | `#00AC45` | Accent text on light (contrast-safe) |
| `--accent-soft` | `#D1F5DF` | Accent-tinted chips / illustration fills |
| `--accent-wash` | `rgba(23,207,96,.10)` | Hover wash, badge background |
| `--accent-alt` | `#E8F6A0` | Secondary highlight (lime), used rarely |
| `--scrim` | `rgba(0,0,0,.70)` | Overlay on hero photography |

\* interpolated; site uses `#333` at low opacity for meta.

**Rules**
- Accent text on white must use `--accent-ink`, not `--accent` (the bright green
  fails contrast as text).
- Accent buttons are `--accent` fill with **black** label, never white.
- A dark section never contains a light card; it uses `--surface-dark-2` instead.

---

## 3. Typography

Three families, three jobs:

| Role | Family | Fallback stack |
|---|---|---|
| Display / headings | **PP Mori** (geometric grotesk) | `Geist, Arial, sans-serif` |
| Body / UI | **Geist** | `Arial, sans-serif` |
| Eyebrows, labels, data | **Geist Mono** | `ui-monospace, monospace` |

PP Mori is a licensed face. A free substitute with the same geometric,
low-contrast, slightly-condensed feel: **Geist** at weight 500, or
*Schibsted Grotesk / Hanken Grotesk*.

### Scale (desktop, root = 16px)

| Step | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Display / H1 | `71px` (4.45rem) | **400** | `-0.02em` | `1.05` |
| H2 section | `50px` (3.1rem) | **400** | `-0.02em` | `1.05` |
| H3 card | `25px` (1.56rem) | **600** | `-0.02em` | `1.2` |
| Body lg | `18px` | 400 | `0` | `1.55` |
| Body | `16px` | 400 | `0` | `1.6` |
| Small / link | `14px` | **600** | `0` | `1.4` |
| Eyebrow (mono) | `12.5px` | 600 | **`+0.12em`, UPPERCASE** | `1` |
| Stat numeral | `64–80px` | 400 | `-0.03em` | `1` |

**The signature move:** H1 and H2 are weight **400**, not bold. Bold is reserved
for H3 and small UI text. Large + light + tight tracking is what makes it read
as editorial rather than SaaS-generic.

---

## 4. Layout & spacing

- Container: `max-width: 1280px`, side padding `24px` (`clamp(20px, 5vw, 40px)`).
- Section vertical padding: `clamp(72px, 10vw, 140px)`.
- Grid: 12-col mentally; in practice 2-up (`1fr 1fr`), 3-up, and 4-up card rows
  with `1px` hairline gaps rather than large gutters — cards often share borders
  to form a single ruled block.
- Heading block: eyebrow → H2 → 1 paragraph capped at ~`58ch`, left-aligned.
  Section headers are **left-aligned**, not centered.
- Hero: full-viewport photo, scrim, content bottom-left aligned, eyebrow above
  a two-line H1.

Spacing ramp: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 140`.

---

## 5. Components

### Button — primary
```
background: var(--accent);  color: #000;  border-radius: 0;
padding: 14px 28px;  font-size: 16px;  font-weight: 600;
hover: background darkens ~8%;  transition 160ms ease
```

### Button — ghost (on dark)
```
background: transparent;  color: #fff;  border: 1px solid rgba(255,255,255,.3);
padding: 9px 14px;  font-size: 12.5px;  font-weight: 600;  radius: 0
```

### Text link "Learn more"
```
font-size: 14px; weight 600; color: #000;
border-bottom: 1px solid currentColor;  padding-bottom: 3px;
hover: color → var(--accent-ink)
```

### Feature card
Square-cornered, `1px solid var(--line)`, padded `28–32px`, white on white.
Anatomy: small accent glyph → H3 → body → "Learn more" link. Hover lifts the
border to black; no shadow, no transform.

### Eyebrow
Mono, uppercase, `+0.12em` tracking, `--accent-ink` on light / `--accent` on dark.

### Stat block
Mono-ish numeral at 64–80px in `--accent`, hairline rule above, mono caption below.
Arranged 3-up on `--surface-dark`.

### Logo wall
Single row, grayscale logos at ~40% opacity, hairline top/bottom rules.

### Testimonial / case-study card
Left: integration chips (two small bordered mono tags). Then a headline link,
a pull quote in H3-size light type, then name + role in mono.

---

## 6. Motion

- Everything is `160–220ms ease` on color/border only.
- Section content fades up ~16px on scroll-in, staggered ~60ms per item.
- No parallax, no scale-on-hover, no shadows.
- Respect `prefers-reduced-motion: reduce` → disable transforms and fades.

---

## 7. Anti-patterns (things this system never does)

- Rounded corners, pill buttons, box-shadows, glassmorphism.
- Centered section headers.
- Bold (700) display headings.
- Gradient text or gradient buttons.
- More than one accent hue in a single viewport.
