# Playground homepage — local clone

A measurement-driven rebuild of the `tryplayground.com` homepage in
**React 18 + Vite 5 + Tailwind v3**. Every layout value comes from live
`getComputedStyle` / `getBoundingClientRect` readings of the original, recorded
in `CLONE_SPEC.md`.

## Running it

```bash
npm install
npm run dev      # http://localhost:5183
npm run build    # production build
```

## Fidelity

Measured with headless Chromium at three viewports, reveals forced in and the
page fully scrolled so lazy content settles.

| Viewport | Clone | Original | Match | Page overflow | Console errors |
|---|---|---|---|---|---|
| 1440 | 13,908px | 13,967px | **99.6%** | 0 | 0 |
| 768 | 20,935px | 21,479px | 97.5% | 0 | 0 |
| 390 | 21,169px | 20,633px | 102.6% | 0 | 0 |

### Feature grids — span grid, verified cell by cell

The four feature grids are **3-column grids with mixed column spans**, not a
uniform 3-up. Columns compute to `394.656 / 394.672 / 394.656px`, gap 16px,
container 1216px, rows 480px:

| Section | Clone cells | Original |
|---|---|---|
| Marketing | 805 / 395 / 395 / 805 | 805.33 / 394.66 / 394.66 / 805.33 |
| Finances | 805 / 395 / 395 / 395 | matches |
| Operations | 805 / 395 / 395 / 395 / 395 | matches |
| Camber AI | 805 / 395 / **1216** *(span 3)* | 805.33 / 394.66 / 1215.98 |

### Desktop homepage pass — corrections applied

Re-measured against the live spec and the reference captures; fixed:

| Fix | Before | After (target) |
|---|---|---|
| Hero CTA button y | 451.8 | **443.8** (444) |
| Hero rating row y | 541.3 | **508.8** (509) |
| Hero tab-rail track y | 539.8 | **587.8** (588) |
| Announcement flowers | `<Placeholder>` | real `announce-left/right.webp` |
| Hero tab screenshot crop | `object-cover` (header cut off) | `object-top` — matches original framing |
| Feature-section header | left-aligned, blue dot | **centered**, icon + label in `#FC5F35` (pixel-sampled) |
| "Get to know" right column | subhead under H2 | subhead + `Platform Overview` beside H2, rows get glyph/rule/arrow |
| Automations card | `<Placeholder>` | real `automations.jpeg` |
| Testimonial | grey card + placeholder | real portrait inset inside `testimonial-frame.webp` |
| Final-CTA tiles | bare images, label below | bordered cards, label above, original order + progress bar |
| Final-CTA backdrop | none | real `cta-backdrop.webp` (overflows by design) |

13 downloaded assets were present but unreferenced; all are now wired.
New tokens: `rule: #ECECEC` (measured divider), `eyebrow: #FC5F35` (sampled).

### Interaction + motion pass — measured against the live original

Re-measured the original's real motion inventory (`transitionDuration != 0s`
across every element) rather than trusting the spec's prose. What it actually has:

| Uses | Property | Duration | Easing |
|---|---|---|---|
| 45 | `color` | 0.2s | `cubic-bezier(.44,0,.56,1)` |
| 3 | `background-color` | 0.5s | `cubic-bezier(.22,1,.36,1)` |
| 3 | `left` / `top` / `transform` | 0.5s | `cubic-bezier(.22,1,.36,1)` |

Fixed against that:

| Element | Before | After (measured on original) |
|---|---|---|
| Nav link hover | → `#1C1917` | → **`#45403D`**, 200ms |
| Mega-menu heights | all 381px | **381 / 370 / 271 / 320** per menu |
| Mega-menu radius | all 10px | 10px, **20px** for Built-for + Resources |
| Mega-menu rows | plain text | **40×40 icon chips** (r8.58) in sampled tones |
| Mega-menu right col | plain list | **tinted `#FBFAF9`** block, 1px `#F7F6F5` rules, arrows |
| **30-day timeline** | 3 static cards, blue pill | **click-activated tab group** |

**The 30-day timeline was the biggest gap** — it was three static cards with
invented body copy. Measured, it is a click-activated tab group:

- Active card tints to `rgba(6,109,254,0.05)` over **500ms** `cubic-bezier(.22,1,.36,1)`; hover does nothing.
- Real content is a **day label + title + bulleted list** (5px `#9AA0A8` dots), not a blue pill.
- Below sits a **966×275 growth-curve panel** (`#F2F4F7`, r16) carrying the original's own
  SVG path verbatim (1000×400 viewBox, `preserveAspectRatio="none"`), with a gradient fill.
- A **16px dot** (blue, 3px white ring) and a **pill** slide along the curve to the active
  step over 500ms. Dot positions measured per step: `(29,219) / (483,152) / (937,11)`.
- Pill text changes per step: *Day one. Already running.* / *Everything's flowing now.* /
  *One app runs your whole program.* Verified: clone pill lands at x=607 on step 2 — original, x=607.
- Prev/next arrows: 48×42, r10, 1px `#ECECEC`.

**Confirmed absent on the original, so deliberately not built:**
- **No scroll reveal.** Re-measured: zero off-screen elements parked at `opacity:0`/`transform`.
  (CLONE_SPEC §7 claims a fade+scale reveal — that reading is wrong; `Reveal` stays a passthrough.)
- **No hover effect** on "Built for" tiles or feature cards (`transition: all 0s`, nothing changes).
- **No auto-advance** on the testimonial carousel (sampled 9s, quote held).
- **No CTA lift** — measured base vs hover: transform, shadow and size all unchanged.

New tokens: `nav-hover #45403D`, plus menu icon tones sampled from the original
(`#1EBD66` / `#FC5F35` / `#4290FE` / `#B805FF`).

### Verified against the measured spec

| Element | Target | Clone |
|---|---|---|
| H1 @1440 | 68/68px, −0.059em, 2 lines | 68/68px, −4.01px, 768×136, 2 lines |
| H1 @768 / @390 | 48px / 34px, 2 lines | 48px / 34px, 2 lines |
| H2 (marketing) | 608×132, 2 lines | 608×132, 2 lines |
| Feature grid | 3 × 394.66px, gap 16, container 1216 | 394.656 / 394.672 / 394.656, gap 16, 1216 |
| "Built for" grid | 3 × 313.33px, gap 10, container 960 | 313.328 / 313.328 / 313.344, gap 10, 960 |
| Timeline grid | 3 × 311.33px, gap 16, container 966 | 311.328 / 311.328 / 311.344, gap 16, 966 |
| Nav label boxes | 56 / 142 / 52 / 71px | 56 / 142 / 52 / 71px |
| Platform mega-menu | 667×381, r10, p10, gap10, rows 309×60 | identical |
| Hero gradient | `linear-gradient(rgb(254,245,228) 64.5376%, rgba(254,245,228,.08) 100%)` | identical |
| Hero eyebrow pill | filled `#EEF5FF`, r61, pad 6/6/6/12, text `#183390` 13/15.6 | identical |
| Tab stage crossfade | ~310ms, `cubic-bezier(.44,0,.56,1)` | 0.31s, same curve |
| Feature card text col | 385px, pad `32px 32px 0`, title→desc gap 12px | identical |
| Footer nav links | Inter 15px/21.9px, 500, −0.36px, `#79716B` | identical |
| Footer legal row | Inter 13px/18.2px, 400, white (sits on the band) | identical |
| Logo ticker | 49.7px/s, linear, infinite | 49.7px/s, linear, infinite |

### Behaviour
- **Tab rail** — all 7 tabs click-activate; **no auto-advance**, matching the
  original (sampled 10.4s there: transform held constant).
- **Mega-menus** — all four open on hover at 381px tall and close on mouseleave.
- **Testimonial carousel** — user-driven, quote changes on dot click.
- **Intentional overflow** — the hero tab rail scrolls internally
  (866px track vs 840/628/358 viewport) at every width, while page-level
  `scrollWidth` equals the viewport. This matches the original exactly.

## How it differs from the original — deliberately

This is a structural and visual replica, not a byte-for-byte copy. Substituted:

1. **Display typeface.** The original sets all display text in **CircularXX TT**
   (a commercial Lineto face). It is **not** copied. Substituted with
   **Manrope** (SIL OFL), keeping tracking em-relative so line counts hold —
   verified: every measured heading wraps to the same number of lines as the
   original. Body text is **Inter**, which the original also uses and which is
   SIL OFL. All 13 font subsets are self-hosted in `public/fonts/`; there are no
   remote font requests.
2. **Brand marks.** The Playground wordmark, favicon and the five partner logos
   in the ticker are replaced with neutral placeholders at the exact measured
   display dimensions. The clone uses a generic "Sandlot" mark.
3. **Photography, illustration and product screenshots.** **39 real assets are
   downloaded and served locally** from `public/assets/img/` (6.9MB) — the 7 hero
   tab screenshots, 16 feature screenshots, 6 "Built for" tiles, hero and section
   illustrations, the footer band and the CTA option tiles. Every file was
   verified with `file(1)` as a genuine image binary. Nothing is hotlinked at
   runtime. Any asset that fails to load degrades to a `<Placeholder>` at the
   same measured box, so geometry survives a missing file.
4. **Body copy and testimonials.** Rewritten to the original's measured
   character and line counts rather than copied. The original attributes its
   testimonials to named real customers; those are replaced with neutral,
   unattributed quotes so no invented words are put in a real person's mouth.
   Headings, nav labels, tab names and button text are kept verbatim because
   their character length is what the layout measurements depend on.

## Known gaps

- **Mobile hamburger panel** was **not measurable** on the original — Framer
  renders the trigger as an unlabelled div and a synthetic click did not open a
  measurable panel. Built here as a full-screen overlay from the same link sets;
  it is the one piece not verified against real numbers.
- **768px is 3.3% short** (−705px). Desktop and mobile are within 0.3%.
- The "Watch video tour" control does not mount a video; the original lazy-loads
  a YouTube embed on click.

**There is no scroll reveal**, because the original has none. A deep measurement
pass sampled feature cards, "Built for" tiles and section H2s at 40–45ms
intervals across 1.6–1.7s while scrolling them into view: `opacity` stayed `1`
and `transform` stayed `none` for every sample, and their pre-scroll state was
already `1`/`none`. An earlier pass had misread four parked
`opacity:0 / scale(0.8)` elements as reveals — they are hover-state background
chips behind text links and never resolve. Building a fade-in would have been a
deviation from the original, not a match.

`prefers-reduced-motion` disables the ticker.

## Layout

```
src/
  components/
    Primitives.jsx     Reveal, buttons, Placeholder, LogoMark
    Header.jsx         announcement bar, sticky nav, 4 mega-menus, mobile menu
    Hero.jsx           cream gradient shell, H1, tab rail, screenshot stage
    Ticker.jsx         49.7px/s marquee (duration derived from measured width)
    FeatureSection.jsx shared layout for the 4 feature sections
    Sections.jsx       remaining sections + footer
  data/content.js      all copy and structural data
CLONE_SPEC.md          the measurements everything is built against
ASSET_MANIFEST.md      asset inventory + licensing classification
reference/             full-page screenshots of the original
```

Assets and trade dress belong to Playground; this stays local.
