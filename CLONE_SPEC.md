Source: https://www.tryplayground.com/

# Playground (tryplayground.com) — Clone Build Spec

All values below were measured live with Playwright via `getComputedStyle` / `getBoundingClientRect` at
1440x900, 768x900 and 390x844. Nothing here is estimated unless explicitly flagged "NOT MEASURABLE".

**Platform note:** the original is a **Framer** site. Class names are generated (`framer-xxxxxx`) and carry no
semantic meaning — do not try to reproduce them. There are only 2 real `<section>` elements in the whole
document; the page is a flat stack of 15 sibling `<div>`s inside the Framer root. Build with semantic
`<section>` elements; match the **geometry**, not the DOM shape.

Page title: `Child Care Management Software & App | Playground`

## 0. Global measurements

| Property | 1440 | 768 | 390 |
|---|---|---|---|
| Document height | **13967px** | 21479px | 20633px |
| `document.scrollWidth` | 1440 | 768 | 390 (no horizontal overflow at any width) |
| Page background | `rgb(255,255,255)` on body + Framer root | same | same |

- Content column max width: **1256px** (section box), inner content grid **1216px**, section side padding
  `20px`. At 1440 that puts section boxes at `x=92`.
- Narrower special containers: hero text column **800px**, "Built for" section **1000px** (inner 960),
  final CTA card **960px**.
- Container width frequency (elements 700–1440px wide): 805px (41), 1216px (28), 1440px (24), 964px (21),
  800px (8), 1256px (7).
- Breakpoints inferred from measured deltas: **≥1200** desktop, **810–1199** tablet, **≤809** mobile
  (Framer's default set; h1 and section padding change at 768 and again by 390).

### Body / root defaults
`body { font-family: sans-serif; font-size: 12px; color: rgb(0,0,0); background: rgb(255,255,255) }` —
these are Framer's unstyled defaults and are **overridden on every rendered element**. Do not use 12px
sans-serif as your base; use the Inter roles in §2.

---

## 1. Color tokens

Measured by walking every element and tallying computed `color` / `backgroundColor`. Counts below are from
the census restricted to elements that actually render a text node (the naive census is polluted by
`rgb(0,0,238)` ×343 and `rgb(0,0,0)` ×986, which are the **browser default link/text colors on unstyled
Framer wrappers** — they are never visible; ignore them).

### Text colors (by real usage)
| Hex | rgb | Uses | Role |
|---|---|---|---|
| `#1C1917` | rgb(28,25,23) | 64 | **Primary ink** — all headings, card titles, emphasis |
| `#79716B` | rgb(121,113,107) | 57 | **Muted body / secondary** — most paragraph copy, nav labels |
| `#6A7074` | rgb(106,112,116) | 23 | Secondary body (alt grey, feature descriptions) |
| `#4A5565` | rgb(74,85,101) | 9 | Slate body (30-day timeline copy) |
| `#FFFFFF` | rgb(255,255,255) | 8 | On-blue / on-dark text |
| `#807E7A` | rgb(128,126,122) | 6 | Tertiary label grey |
| `#066DFE` | rgb(6,109,254) | 5 | Link blue (phone number in nav) |
| `#1F5CF7` | rgb(31,92,247) | 5 | Accent blue (inline text links e.g. "Platform Overview") |
| `#4F4741` | rgb(79,71,65) | 4 | Testimonial quote brown-grey |
| `rgba(121,113,107,0.6)` | — | 4 | Muted at 60% (testimonial job titles) |
| `#8A8F98` | rgb(138,143,152) | 3 | Timeline day labels |

### Background colors
| Hex | rgb | Uses | Role |
|---|---|---|---|
| `#FFFFFF` | rgb(255,255,255) | 12 | Page base, cards, dropdown panels |
| `#FBFAF9` | rgb(251,250,249) | 24 | **Card surface** — "Built for" tiles, feature cards |
| `#FEF5E4` | rgb(254,245,228) | — | **Hero cream** (gradient stop, see §3) — pixel-verified |
| `#F4F2EC` | rgb(244,242,236) | 3 | Warm card bg (final CTA card area) — pixel-verified |
| `#FAFAFA` | rgb(250,250,250) | — | Final CTA card, 20px radius |
| `#3079FF` | rgb(48,121,255) | 1 | Announcement bar bg + primary button gradient start |
| `#1F5CF7` | rgb(31,92,247) | 8 | Primary button gradient end |
| `#066DFE` | rgb(6,109,254) | 3 | Blue pill (timeline "Day one" chip) |
| `#F0ECE9` | rgb(240,236,233) | 6 | Warm neutral fill |
| `#CEE7FE` | rgb(206,231,254) | 4 | Light blue accent fill |
| `#E7E6E5` | rgb(231,230,229) | — | Secondary button fill ("Read customer story") |
| `rgba(68,25,6,0.04)` | — | 5 | **Warm translucent** — tab rail track, arrow buttons, image frames |
| `#272A2E` | rgb(39,42,46) | 3 | Dark chip |
| `#9AA0A8` | rgb(154,160,168) | 9 | Grey fill |

### Borders (all borders on the page)
- `1px solid rgb(236,236,236)` ×3
- `1px solid rgba(136,136,136,0.1)` ×3
- `3px solid rgb(255,255,255)` ×1 (avatar ring)

Borders are rare — the design separates with background fills and shadow, not strokes.

### Radii (tallied)
`12px` ×50 (**dominant card/image radius**), `50%` ×10 (avatars), `10px` ×9 (dropdown panel),
`40px` ×8, `30px` ×6, `20px` ×5, `6px` ×4, `8px` ×3 (**buttons**), `50px` ×3, `70px` ×3 (tab rail),
`14px` ×3, `9px` ×3, `4px` ×3, `999px` ×2 (pills), `5px` ×2.

### Shadows (verbatim, tallied)
1. **Warm layered (×8)** — used on cards/images:
```
rgba(68,25,6,0.04) 0px 0.97px 0.97px 0.49px, rgba(68,25,6,0.04) 0px 2.92px 2.92px 1.46px,
rgba(68,25,6,0.04) 0px 5.83px 5.83px -2.92px, rgba(68,25,6,0.04) 0px 11.67px 11.67px -5.83px
```
2. **Button shadow (×3)** — primary CTA:
```
rgba(0,0,0,0.04) 0px 1px 1px 0.5px, rgba(0,0,0,0.04) 0px 3px 3px 1.5px,
rgba(0,0,0,0.04) 0px 6px 6px -3px, rgba(0,0,0,0.04) 0px 24px 24px -12px,
rgba(3,7,18,0.04) 0px 1px 4px -1px
```
3. **Panel shadow (×3)** — nav dropdown, adds a hairline ring:
```
rgba(0,0,0,0.04) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 1px 0.5px,
rgba(0,0,0,0.04) 0px 3px 3px 1.5px, rgba(0,0,0,0.04) 0px 6px 6px -3px,
rgba(0,0,0,0.04) 0px 12px 12px -6px
```
4. `rgba(0,0,0,0.18) 0px 2px 8px 0px` ×1, `rgba(40,20,120,0.28) 0px 6px 18px 0px` ×1 (blue chip glow).

---

## 2. Typography

### Fonts actually rendered vs merely declared — IMPORTANT

**23 `@font-face` families are declared** in the stylesheets. Only **2 real families actually render**.
The rest are dead CSS from Framer's shared design system. Declared-but-unused:
`Fragment Mono`, `Geist Mono`, `Permanent Marker`, `Inter Variable`, `Inter Display`,
`CircularXX TT Black`, `CircularXX TT Black Italic`, `CircularXX TT Bold Italic`,
`CircularXX TT Regular`, `CircularXX TT Italic`, plus all the `* Placeholder` variants
(`Inter Placeholder`, `CircularXX TT Bold Placeholder`, etc. — these are Framer's FOUT-metric shims,
not real fonts).

**Do not download or self-host the 21 unused families.** Rendered families, by count of text-rendering
elements:

| Family (computed stack) | Elements | Weights | Sizes seen |
|---|---|---|---|
| `Inter, "Inter Placeholder", sans-serif` | 237 | 400, 500, 600, 700 | 32, 28, 18, 17, 16, 15, 14, 13, 12 |
| `"CircularXX TT Bold", "CircularXX TT Bold Placeholder", sans-serif` | 18 | 700 (and 400 on one node) | 68, 60, 48, 32 |
| `"CircularXX TT Medium", …` | 1 | 500 | 13px (announcement bar only) |
| `"CircularXX TT Book", sans-serif` | 1 | 400 | 16px ("10 min" badge only) |
| `Inter-Medium, Inter, …` | 3 | 500 | 10px |

Only **8 font files** are actually downloaded (framerusercontent `.woff2`) plus a Roboto subset pulled in
by an embedded YouTube/Google widget (not used by the page's own text). See ASSET_MANIFEST.md.

**Substitution guidance:** CircularXX TT is a **commercial licensed face** (Lineto) — it must not be
copied. Replace with a geometric-grotesque of similar metrics. Closest open options: **Inter Display**
(tight tracking), or **Manrope / Poppins**. Because all display text carries heavy negative tracking
(-4px at 68px = **-0.059em**), keep the em-relative tracking below and re-check line counts.
Inter itself is SIL OFL and **safe to self-host**.

### Type roles (measured)

| Role | Font | Size / line-height | Weight | Letter-spacing | Color |
|---|---|---|---|---|---|
| **H1 hero** | CircularXX TT Bold | 68px / 68px (1.0) | 700 | **-4px** (-0.059em) | `#1C1917` |
| **H2 section** | CircularXX TT Bold | 60px / 66px (1.1) | 700 | **-3.6px** (-0.06em) | `#1C1917` |
| **H2 sub-section** | CircularXX TT Bold | 48px / 52.8px (1.1) | 700 | **-2.88px** (-0.06em) | `#1C1917` |
| **H2 card title** | CircularXX TT Bold | 32px / 35.2px (1.1) | 700 | **-0.96px** (-0.03em) | `#1C1917` |
| **Pull-quote** | Inter | 28px / 33.6px (1.2) | 600 | +0.56px | `#4F4741` |
| **Quote (card)** | Inter | 32px / 33.6px | 700 | -0.64px | `#1C1917` |
| **Feature title (H3)** | Inter | 18px / 21.6px (1.2) | 500 | -0.36px | `#1C1917` |
| **Feature title alt** | Inter | 18px / 24px | 500 | -0.45px | `#1C1917` |
| **Lead paragraph** | Inter | 17px / 23.8px (1.4) | 500 | -0.34px | `#1C1917` |
| **Body** | Inter | 16px / 22.4px (1.4) | 400 | -0.34px | `#79716B` |
| **Body (slate)** | Inter | 16px / 23.2px (1.45) | 400 | normal | `#4A5565` |
| **Body small** | Inter | 15px / 21.9px (1.46) | 500 | -0.36px | `#79716B` / `#6A7074` |
| **Inline link** | Inter | 15px / 24px | 500 | -0.45px | `#1F5CF7` |
| **Attribution name** | Inter | 15px / 18px (1.2) | 500 | +0.56px | `#1C1917` |
| **Attribution role** | Inter | 15px / 18px | 400 | +0.15px | `#79716B` |
| **Nav link** | Inter | 14px / 16.8px (1.2) | 500 | normal | `#79716B` |
| **Caption / meta** | Inter | 14px / 16.8px | 500 | -0.36px | `#79716B` (0.6 alpha for roles) |
| **Announcement bar** | CircularXX TT Medium | 13px / 15.6px | 500 | normal | `#FFFFFF` |
| **Footer link** | Inter | 13px / 18.2px (1.4) | 400 | -0.3px | see §8 |
| **Timeline day label** | Inter | 13px / 13px | 500 | normal | `#8A8F98` |
| **Button label** | Inter | 16px / — | 500 | normal | `#FFFFFF` (primary) / `#1C1917` (secondary) |

### Responsive H1
| Viewport | font-size | line-height | letter-spacing | box | align |
|---|---|---|---|---|---|
| 1440 | 68px | 68px | -4px | 800×136 (2 lines), x=320, y=219 | center |
| 768 | 48px | 48px | -3px | 736×96 (2 lines), x=16, y=208 | center |
| 390 | 34px | 34px | -2px | 358×68 (2 lines), x=16, y=208 | center |

---

## 3. Section map (1440px)

15 sibling divs in the Framer root. `y` = absolute document offset, `h` = height.

| # | y | h | width (x) | padding-top / bottom | Content |
|---|---|---|---|---|---|
| 0 | 68 | 13 | 1440 | 0/0 | (sticky nav spacer artifact) |
| 1 | 0 | 1546 | 1440 | 0/0 | **Hero shell** — holds the cream gradient backdrop |
| 2 | 115 | 409 | 800 (x=320) | **56**/0 | Hero copy: eyebrow pill, H1, subhead, CTA, rating |
| 3 | 524 | 673 | 1440 | 0/0 | **Product tab rail + screenshot stage** |
| 4 | 1197 | 166 | 1440 | **40**/0 | **Logo ticker** ("Join 500,000+…") |
| 5 | 1363 | 1043 | 1256 (x=92) | **160**/**180** | "Get to know Playground" + video/automations card |
| 6 | 2406 | 797 | 1440 | **100**/0 | "Hear what customers are saying" — testimonial carousel |
| 7 | 3203 | 1269 | 1256 (x=92) | 0/0 | "Make your marketing as good as the big brands" |
| 8 | 4471 | 1452 | 1256 (x=92) | **180**/0 | "Your centers' entire financial picture" |
| 9 | 5923 | 1449 | 1256 (x=92) | **180**/0 | "Run your program with ease" |
| 10 | 7372 | 1589 | 1256 (x=92) | **180**/**140** | "Meet Camber, the first AI employee…" |
| 11 | 8961 | 1064 | 1000 (x=220) | **40**/0 | "Built for child care programs of all sizes" — 3×2 tiles |
| 12 | 10025 | 1070 | 1440 | **180**/**64** | "Here's what you can get done… in just 30 days" — timeline |
| 13 | 11094 | 492 | 1256 (x=92) | **140**/0 | "Get access to the Playground Savings Club" |
| 14 | 11586 | 672 | 1256 (x=92) | **140**/**140** | "Award-winning customer support…" |
| — | 12258 | 742 | 1440 | — | **Final CTA / demo form** (card 960×662, `#FAFAFA`, radius 20px) |
| — | 13000 | 967 | 1440 | — | **Footer** (bg `#FFFFFF`) |

**Section vertical rhythm:** the dominant top padding is **180px** (×2 at this width, plus 160/140/100/56/40
variants). Use `padding-top: 180px` as the default section spacing at desktop, with 140px for the tighter
trailing sections and 40–64px for rails.

### Grid gaps (tallied)
- Flex gaps: `10px` ×43 (dominant), `20px` ×15, `6px` ×9, `12px` ×8, `16px` ×4, `8px` ×4, `24px` ×4,
  `40px` ×4, `56px` ×2, `32px` ×2.
- **Feature grids: 3 columns × `394.66px`, gap `16px`, container 1216px** (sections 7/8/9/10 at y=3495,
  4947, 6396, 7845).
- **"Built for" grid: 3 × `313.33px`, gap `10px`, container 960px** (y=9255).
- **Timeline grid: 3 × `311.33px`, gap `16px`, container 966px** (y=10477).
- **Savings grid: 2 × `294px`, gap `15px`, container 603px** (y=11955).

---

## 4. Header / navigation (measured)

### Announcement bar
- Element: full-width `<a>`, **1440×37**, at y=0.
- Background: **`rgb(48,121,255)`** (`#3079FF`), pixel-verified.
- Text: `Predictive enrollment is here!` — CircularXX TT Medium, **13px/15.6px, 500, `#FFFFFF`**, centered
  (text box 174×16 at x=623, y=11). Followed by a `→` arrow glyph.
- Two decorative flower images sit in the bar (see manifest): left 200×37 at x=216, right 210×37 at x=1014.

### Nav bar
- Container: **position: sticky**, `top` below the bar, **1440×78** at y=37, `z-index: 10`,
  background **transparent** (no blur, no border, no shadow — it sits over the hero cream).
- Logo: wordmark + slide mark at left, x=216.
- Nav labels (Inter **14px/16.8px, 500, `#79716B`**), all with a chevron affordance:

| Label | chars | x | width |
|---|---|---|---|
| `Platform` | 8 | 465 | 56 |
| `Switch to Playground` | 20 | 549 | 142 |
| `Built for` | 9 | 719 | 52 |
| `Resources` | 9 | 799 | 71 |

- Phone link: `(646) 566-8590` — Inter 14px/500, **`#066DFE`**, x=997, w=109.
- CTA button `Get demo` — **108×39**, radius **8px**, padding `0 20px`, label Inter **16px/500 `#FFFFFF`**,
  background gradient `linear-gradient(rgb(48,121,255) 0%, rgb(31,92,247) 100%)`, button shadow token #2.

### Mega-menu dropdowns (opened with real hover — synthetic `mouseenter` does NOT work here)

Panel chrome (identical for all four): **white `#FFFFFF`, border-radius `10px`, padding `10px`,
display:flex, gap `10px`, overflow:hidden**, panel shadow token #3. Panel top edge at **y=123**;
content starts y=133. Measured card box for the Platform panel: **667×381 at x=167**.

**Platform** — 2 columns. Left column x=177, width **337**, 4 rows of **60px** (no gap; rows at
y=133/193/253/313). Right column x=544, width **260**, 4 rows of **50px** at y=133/184/235/286 (51px pitch).
- Left (title + description each): `Finances / Your program's entire financial picture.`,
  `Marketing / Capture more leads, grow your enrollment.`, `Operations / Run your program with ease.`,
  `AI Child Care Employee / Get more done with…`
- Right: `Billing`, `Expenses`, `Payroll`, `Subsidy`

**Switch to Playground** — left column x=329 width **348**, 4 rows of 60px (y=133/193/253/313);
right promo card x=687, **240×350**.
- `Why Playground / The best childcare management…`, `About / The team behind Playground`,
  `Customer Stories / Trusted by thousands of…`, `Support & Onboarding / Easy implementation…`
- Promo quote: `"We haven't lost a single teacher since st…"`

**Built for** — 3 image cards x=322/523/724, each **191×251**, then a right list x=935 width **238**,
4 rows of 50px at y=167/218/269/320 (51px pitch).
- Cards: `Centers`, `Home Based`, `Multi-Site & Enterprise`
- List: `Head Start`, `Shared Services`, `Camps`, `Before & After Care`

**Resources** — left column x=512 width **300**, **5** rows of 60px (y=133/193/253/313/373);
right list x=842 width **310**, 5 rows of 50px at y=141/192/243/294/345.
- Left: `Blog / Latest content`, `Guides / Free tools and resources`, `Webinars / Our latest webinars`,
  `Changelog / View recent updates`, `Careers / WE'RE HIRING! / Join our mission`
- Right: `Tuition pricing`, `Compare billing software`, `AI tools`, `Employee benefits`,
  `Subsidy reimbursements`

A persistent promo strip sits above the panels at y=171, x=413, **614×28**:
`Arizona, Iowa, Idaho, Kansas, New York and providers have access to Playground at no cost`.

---

## 5. Hero (section 2 + 3)

- Backdrop: the hero shell (1440×1546) paints
  **`linear-gradient(rgb(254,245,228) 64.5376%, rgba(254,245,228,0.08) 100%)`** — a cream field that fades
  to transparent over the bottom third. Pixel-verified top-left = `rgb(254,245,228)`.
- Eyebrow pill: rounded outline pill centered at y≈177, text 13px/15.6px, 570×16 box, copy:
  `Arizona, Iowa, Idaho, Kansas, New York and providers have access to Playground at no cost` (89 chars),
  with a circular blue arrow button at its right end.
- **H1** (44 chars): `Childcare management software directors love` — 800×136, 2 lines, centered, y=219.
- **Subhead** (137 chars, 2 lines, box 640×45, 16px/22.4px):
  `Playground is an all-in-one child care management software that streamlines operations and administration for 5,000+ child care programs.`
- **CTA** `Get a free demo` — **163×48** at x=639, y=444. Radius 8px, padding `0 20px`,
  gradient `linear-gradient(#3079FF 0%, #1F5CF7 100%)` (pixel-sampled center `rgb(68,125,250)`),
  label Inter 16px/500 `#FFFFFF`, button shadow token #2.
- Rating row (y=509): 5 stars + `4.96 stars across 8,000+ reviews` — 13px/13px, box 208×13.
- Decorative illustrations flank the hero at y≈681 (471×480 left, 471×462 right).

### Product tab rail (y=588)
- Track: **872×44** at x=284, background **`rgba(68,25,6,0.04)`**, **border-radius 70px**, padding `4px`,
  `overflow-x: auto`.
- Tabs (7): `Attendance`, `Billing`, `Communication`, `Registration`, `Paperwork`, `Payroll`, `AI`.
  Active tab renders as a white pill with the warm shadow; inactive are muted grey with a leading icon.
- Arrow buttons: outer **44×44** radius 50px `rgba(68,25,6,0.04)` at x=230 and x=1166; inner white
  **36×36** radius 40px at x=234 / x=1170.
- Screenshot stage below: image **964×525**, `object-fit: cover`, **border-radius 12px**, sitting in a
  `980×541` warm frame (`rgba(68,25,6,0.04)`) at x=230, y=656. Seven screenshots are stacked (one per tab).

**Measured behaviour:** the rail's inner track holds a static `translateX(-800px)`; it does **not**
auto-advance. Tab switching is click-driven (plus the arrow buttons). At 768/390 the rail becomes a real
horizontal scroller — `scrollWidth 855` vs `clientWidth 682` (768) / `304` (390). **This overflow-x is
intentional**; keep it scrollable and do not wrap the tabs.

---

## 6. Logo ticker (section 4, y=1197)

- Label (2 lines, 334×44, 15px/21.9px `#6A7074`):
  `Join 500,000+ owners, directors, teachers, and families already on Playground`
- A `<ul>` **1438×60** at y=1302 translating on the X axis.
- **Measured speed:** transform went from `-71.66px` to `-531.65px` across 12 samples spaced ~705ms —
  a steady **≈49.7 px/s** leftward drift, linear, continuously looping.
- It is **JS-driven**: `animation: none` and no `@keyframes` exist anywhere in the document
  (`document.styleSheets` contains **0** `CSSKeyframesRule`). Reimplement as a CSS marquee at 49.7px/s
  (`linear`, `infinite`) or with rAF; content is duplicated so it wraps seamlessly.
- 5 partner logos, each repeated ~9× across the strip (see manifest for dimensions).

---

## 7. Motion inventory

There are **no CSS `@keyframes` and no elements with a computed `animation-name`** on this page
(measured: `animCount = 0`, `keyframes.length = 0`). All motion is JS/Framer-Motion driven via inline
transforms. **51 elements** carry a non-zero `transition-duration`.

### Transition tokens (tallied verbatim)
| Uses | Property | Duration | Easing | Delay |
|---|---|---|---|---|
| **45** | `color` | **0.2s** | `cubic-bezier(0.44, 0, 0.56, 1)` | 0s |
| 3 | `background-color` | **0.5s** | `cubic-bezier(0.22, 1, 0.36, 1)` | 0s |
| 1 | `left, top` | 0.5s, 0.5s | `cubic-bezier(0.22,1,0.36,1)` ×2 | 0s |
| 1 | `top` | 0.5s | `cubic-bezier(0.22, 1, 0.36, 1)` | 0s |
| 1 | `left, transform` | 0.5s, 0.5s | `cubic-bezier(0.22,1,0.36,1)` ×2 | 0s |

So: **hover text colour = 200ms `cubic-bezier(.44,0,.56,1)`**; **layout/position moves = 500ms
`cubic-bezier(.22,1,.36,1)`** (an ease-out-quint). Use those two tokens everywhere.

### Scroll reveal
8 elements were found parked at **`opacity: 0`** with **`transform: scale(0.8)`** (e.g. the
`Platform Overview` link block at y=1603, box 132×27) while off-screen, and resolve to `opacity: 1` /
`scale(1)` once scrolled into view. So the reveal is **fade + scale-up from 0.8**, not a translate-Y.
Elements carrying `will-change: transform` include the hero screenshot stage (964×525) and the nav logo.

**NOT MEASURABLE:** the exact IntersectionObserver threshold and per-item stagger are inside Framer's
minified bundle; `getComputedStyle` cannot expose them. Recommended equivalent: trigger at ~15% visibility,
**400–500ms**, `cubic-bezier(0.22,1,0.36,1)`, ~60–80ms stagger between siblings in a grid.

### Hover
- Nav links / footer links: colour only, 200ms (token above).
- Primary CTA: measured base vs hovered — **background, transform, box-shadow and size were all unchanged**
  (`transform: none`, identical shadow, 108×39 both states). Any CTA hover effect is at most a colour shift;
  do not invent a lift.

### Carousels
- Hero tab stage: all 7 screenshots sit at `opacity: 1` simultaneously in the DOM (stacked, clipped by the
  frame); the active one is selected by the rail's translate. Click/arrow driven, **no auto-advance**
  (sampled over 10.4s: transform constant at `-800px`).
- Testimonial section (y=2406) has `Read customer story` / `Watch video` controls — user-driven.

---

## 8. Final CTA + footer

### Final CTA (y=12258, full-width 1440×742)
- Card: **960×662**, background **`rgb(250,250,250)`**, **border-radius 20px**, centered.
- Heading (H3, 47 chars, 650×106, 2 lines):
  `Book a demo to see why providers are switching.` — CircularXX TT Bold **48px/52.8px, 700, -2.88px**.
- Multi-step inline form. Step 1 prompt (63 chars, 610×26, 18px/26.28px):
  `First, tell us about yourself. What type of program do you run?`
  Step 2 prompt (46 chars): `Great! What's the best way we can contact you?`
  Fine print (142 chars, 12px/14.4px):
  `By requesting a demo, you agree to receive automated text messages from Playground. We'll handle…`
- Three option tiles with images at y=12596: **198×198**, **198×198**, **198×171**
  (`Center`, `Home-Based`, `Multi-Location`).
- A wide illustration spans behind at y=12296, displayed **2111×658** (overflows the viewport by design).
- The partner logo strip repeats at y=12838.

### Footer (y=13000, 1440×967, background `#FFFFFF`)
Inner container **1216px** at y=13000; link block 934px wide starting y=13060.
Footer links: Inter **13px/18.2px, 400, -0.3px**.

Measured columns by x-position:

| x | Column heading + links |
|---|---|
| 380 | **Solutions** — `Billing`, `Expense`, `Payroll`, `Subsidies`, `Marketing`, `Enrollment`, `Websites`, `Paperwork`, `Branded Experience`, `Predictive Enrollment`, `AI`, `Attendance`, `Communication`, `Food programs`, `Learning`, `Reporting`, `API`, `Integrations` |
| 630 | **Built for** — `Centers`, `Multi-site`, `In-home`, `Head Start`, `Shared Services`, `Before & After Care`, `Camps`, then `About`, `Careers`, `Security` |
| 880 | **Resources** — `Blog`, `Why Playground`, `Savings Club`, `Early Childhood Investigations`, `Customer Stories`, `Help Center`, `Changelog` |
| 1070 | `Log In`, `Family Sign Up`, `Apple Store`, `Google Play` |

Left rail (x=130–220) holds the logo, an `Request AI summary of Playground` link (179×42, 15px/21px) and
`Early Childhood Investigations` (185×44).

Legal row at y=13933 (13px/18.2px): `© 2026 Carline Inc. All rights reserved.` (40 chars),
`HIPAA Notice of Privacy Practices` (33 chars), `Privacy`, `Terms of Service`, `Sitemap`.

A full-bleed playground illustration sits at y=13525, displayed **1584×452**.

---

## 9. Verbatim text inventory

### All headings in document order (with measured box + line count)
| y | Tag | Size | Box | Lines | Chars | Text |
|---|---|---|---|---|---|---|
| 219 | H1 | 68 | 800×136 | 2 | 44 | `Childcare management software directors love` |
| 1137 | H5 | 18 | 148×21 | 1 | 16 | `Watch video tour` |
| 1138 | H5 | 16 | 46×18 | 1 | 6 | `10 min` |
| 1523 | H2 | 60 | 348×132 | 2 | 22 | `Get to know Playground` |
| 2506 | H2 | 60 | 458×198 | 3 | 30 | `Hear what customers are saying` |
| 3251 | H2 | 60 | 608×132 | 2 | 45 | `Make your marketing as good as the big brands` |
| 4699 | H2 | 60 | 558×132 | 2 | 38 | `Your centers' entire financial picture` |
| 6151 | H2 | 60 | 468×132 | 2 | 26 | `Run your program with ease` |
| 7600 | H2 | 60 | 750×132 | 2 | 56 | `Meet Camber, the first AI employee build for child care.` |
| 9001 | H2 | 60 | 470×198 | 3 | 42 | `Built for child care programs of all sizes` |
| 10253 | H2 | 48 | 650×106 | 2 | 60 | `Here's what you can get done with Playground in just 30 days` |
| 11234 | H2 | 48 | 603×106 | 2 | 41 | `Get access to the Playground Savings Club` |
| 11726 | H2 | 48 | 603×106 | 2 | 51 | `Award-winning customer support from people who care` |
| 12318 | H3 | 48 | 650×106 | 2 | 47 | `Book a demo to see why providers are switching.` |

**"Built for" tile titles** (H2, 32px/35.2px, 233×35, 1 line each, tile 313×380, bg `#FBFAF9`, radius 12px,
padding 40px): `Centers` (7), `Home based` (10), `Multi-site` (10), `Before and After Care` (21, 2 lines),
`Camps` (5), `Head Start` (10).

**Feature titles (H3, Inter 18px/21.6px, 289–298px wide):**
`Don't let another lead slip through the cracks` (46, 2L), `Predictive Enrollment` (21, 1L),
`Child care websites built for enrollment` (40, 2L), `Less paper, less work` (21, 1L),
`Payment collection on autopilot` (31, 1L), `Make subsidized billing a breeze` (32, 1L),
`Automatic expense tracking` (26, 1L),
`Fast, accurate, and effortless payroll designed for child care` (62, 2L),
`Strengthen relationships with families — and turn them into your biggest fans` (77, 3L),
`Attendance` (10), `Learning` (8), `Food program` (12), `Reporting` (9),
`Never miss a lead` (17, 1L), `Instant answers for staff and families` (38, 2L),
`Do more with the team you have` (30, 1L).

**Pull-quotes (H6, Inter 18px/21.6px, 249×73, 3 lines):**
`"I no longer worry about not getting back to interested families in time"` (73),
`"Our parents jumped for joy when they saw the online paperwork packet."` (71),
`"We achieved a 93% reduction in delinquent payments."` (53),
`"I have families that chose to enroll because of our daily parent app"` (70).

**Testimonial carousel (Inter 28px/33.6px, 458 wide):**
`"We haven't lost a single teacher since starting with Playground. They're the secret to …"` (103, 4L)
— *Jermaine Rucker, Owner at Little Minds Universe*;
`"We are expanding rapidly. The ease of setting up a new school in Playground is unmatche…"` (91, 3L)
— *Dr. Tamar Andrews, Temple Isaiah Preschool*; also *Katherine Feliz, Owner at Kidz Haven Daycare*
and *Nich, COO at The Weston School*;
`"We want to grow 10 to 20 locations, and we needed a partner to help us grow."` (78, 3L).
Card quote (Inter 32px/33.6px, 331×67, 2L): `"I cut 4 systems down into just 1"` (34).

### Body-copy blocks (rewrite to the same length + line count)
| y | Size/LH | Box | Lines | Chars | Copy (truncated) |
|---|---|---|---|---|---|
| 11 | 13/15.6 | 174×16 | 1 | 30 | `Predictive enrollment is here!` |
| 177 | 13/15.6 | 570×16 | 1 | 89 | `Arizona, Iowa, Idaho, Kansas, New York and providers have access to Playground at no cost` |
| 375 | 16/22.4 | 640×45 | 2 | 137 | hero subhead (full text in §5) |
| 509 | 13/13 | 208×13 | 1 | 32 | `4.96 stars across 8,000+ reviews` |
| 1237 | 15/21.9 | 334×44 | 2 | 77 | `Join 500,000+ owners, directors, teachers, and families already on Playground` |
| 1543 | 16/22.4 | 501×45 | 2 | 128 | `Replace multiple broken tools with Playground, the only child care platform designed to …` |
| 3403 | 16/22.4 | 500×45 | 2 | 91 | `Easy marketing automations right on your website. Capture more leads, grow your enrollme…` |
| 3583 | 15/21.9 | 321×66 | 3 | 106 | `Capture interested families, track all interactions, and scale enrollment — at one locat…` |
| 3561 | 15/21.9 | 321×44 | 2 | 73 | `Forecast future openings and maximize capacity with smart planning tools.` |
| 4079 | 15/21.9 | 321×66 | 3 | 119 | `Playground builds your website to drive enrollment. Our proven design grows Google traff…` |
| 4057 | 15/21.9 | 321×66 | 3 | 123 | `Say goodbye to paper — and much of the work — with fully digital registration packets th…` |
| 4851 | 17/23.8 | 501×48 | 2 | 87 | `Say goodbye to a scattered stack of tools and consolidate your finances into one place.` |
| 5013 | 15/21.9 | 321×66 | 3 | 99 | `Set mandatory autopay for families so you can stop chasing late payments and focus on wh…` |
| 5058 | 15/21.9 | 331×44 | 2 | 82 | `Jermaine consolidated his apps into one — and saved time and money while doing so.` |
| 5509 | 15/21.9 | 321×44 | 2 | 83 | `Automatically reconcile subsidy ledgers — and get more accurate reporting than ever` |
| 5509 | 15/21.9 | 331×44 | 2 | 79 | `Pre-build budgets for responsible spend and eliminate manual expense reporting.` |
| 5530 | 15/21.9 | 321×44 | 2 | 90 | `Pay your staff with Playground's full service payroll, tax filing, and time tracking too…` |
| 6303 | 16/22.4 | 501×45 | 2 | 78 | `The entire toolkit, purpose built to make your teachers and families happier.` |
| 6505 | 15/21.9 | 321×44 | 2 | 52 | `Streamline communication, and track daily activities` |
| 6461 | 15/21.9 | 331×44 | 2 | 56 | `Simple, compliant check in/out for any childcare program` |
| 6957 | 15/21.9 | 321×66 | 3 | 123 | `Create, organize, and document learning in one seamless flow—from activity planning to m…` |
| 6957 | 15/21.9 | 321×44 | 2 | 71 | `Simple meal recording, automatic CACFP reports, and easy menu planning.` |
| 6957 | 15/21.9 | 331×66 | 3 | 101 | `Report on anything in Playground with 100s of premade reports and the ability to build c…` |
| 7752 | 16/22.4 | 750×45 | 2 | 192 | `Camber answers inquiry calls, supports your staff, and handles the daily admin work — gi…` |
| 7910 | 15/21.9 | 321×44 | 2 | 75 | `Camber answers 24/7, qualifies families, and logs every inquiry in your CRM` |
| 7932 | 15/21.9 | 321×66 | 3 | 110 | `Camber is trained on your handbook, SOPs, and state licensing — so every question gets a…` |
| 8406 | 15/21.9 | 321×66 | 3 | 109 | `Ask Camber to draft messages, issue refunds, reconcile subsidies, and build reports — ri…` |
| 9021 | 16/22.4 | 470×45 | 2 | 113 | `Playground simplifies child care programs of all sizes, from home-based to centers and m…` |
| 10205 | 15/24 | 329×24 | 1 | 47 | `New software shouldn't take a year to implement` |
| 11360 | 16/22.4 | 501×45 | 2 | 98 | `Playground customers get 10–40% off the supplies they already buy with the exclusive Sav…` |
| 11852 | 16/22.4 | 501×45 | 2 | 69 | `Rated best support in the child care management industry for a reason` |
| 12021 | 17/23.8 | 264×24 | 1 | 32 | `Public and collaborative roadmap` |
| 12060 | 17/23.8 | 264×24 | 1 | 31 | `Help Center with 300+ resources` |

### Buttons (verbatim, with measured box)
| Text | chars | Box | Radius | Padding | Fill | Label |
|---|---|---|---|---|---|---|
| `Get demo` | 8 | 108×39 | 8px | 0 20px | blue gradient | Inter 16/500 `#FFFFFF` |
| `Get a free demo` | 15 | 163×48 | 8px | 0 20px | blue gradient | Inter 16/500 `#FFFFFF` |
| `Read customer story` | 19 | 205×44 | 8px | 0 20px | `rgb(231,230,229)` | Inter 16/500 `#1C1917` |
| `Watch video` | 11 | 168×42 | 50px | — | `rgba(255,255,255,0.5)` | — |
| `Platform Overview` | 17 | 132×27 | 6px | 0 | text link | Inter 15/500 `#1F5CF7` |
| `Day one. Already running.` | 25 | 228×34 | 999px | 9px 16px | `rgb(6,109,254)` | Inter 16/400 `#FFFFFF` |

Timeline chips use Inter 13px/13px `#8A8F98` labels: `Today`, `Day 5`, … (each 275px wide).

---

## 10. Responsive behaviour

### Section geometry by viewport
| # | Section | 1440 h | 768 h | 390 h | pt 1440 → 768/390 |
|---|---|---|---|---|---|
| 2 | Hero copy | 409 | 365 | 379 | 56 → 0 / 0 |
| 3 | Tab rail + stage | 673 | 758 | 449 | — |
| 4 | Logo ticker | 166 | 166 | 166 | 40 → 40 / 40 |
| 5 | Get to know | 1043 | 1239 | 1242 | 160 → **96 / 96** |
| 6 | Testimonials | 797 | 1057 | 697 | 100 → **40 / 40** |
| 7 | Marketing | 1269 | **3020** | **3072** | 0 → 96 / 96 |
| 8 | Finances | 1452 | **3156** | **3164** | 180 → **96 / 96** |
| 9 | Operations | 1449 | **3161** | **3161** | 180 → **96 / 96** |
| 10 | Camber AI | 1589 | 2108 | 2098 | 180 → 180 / 180 |
| 11 | Built for | 1064 | 720 | 705 | 40 → **64 / 64** |
| 12 | 30 days | 1070 | 1126 | 1033 | 180 → 180 / 180 |
| 13 | Savings Club | 492 | 737 | 750 | 140 → **96 / 96** |
| 14 | Support | 672 | 894 | 789 | 140 → **40 / 40** |

**Rules that fall out:**
- Desktop section padding **180/160/140px** collapses to **96px** at ≤768, and to **40–64px** for the
  lighter rails. 180px is retained for sections 10 and 12 at all widths.
- Content sections go full-bleed: width 1256 (x=92) → **768 / 390 (x=0)** with `padding-left: 20px`.
- **Feature grids collapse 3 → 1 column**: `394.66px ×3, gap 16` becomes a single `728px` track at 768 and
  `350px` at 390, gap 16px. This is why sections 7/8/9 roughly **triple in height** on mobile.
- **"Built for" grid stays 3-up at 768** (`212.66px ×3, gap 16px`, container 670) and collapses on 390.
- Savings grid `294×2` → single `728px` / `350px` track, gap 15px.
- Hero text column: 800px fixed → full width minus 16px gutters (736 at 768, 358 at 390).
- **Intentional horizontal scroll:** the hero tab rail (`overflow-x: auto`) has
  `scrollWidth 855` vs `clientWidth 682` (768) and `304` (390). Preserve this rail — it is the only
  horizontal scroller, and `document.scrollWidth` still equals the viewport at every width (no page-level
  overflow).
- Total page height grows from 13967 (1440) to 21479 (768) and 20633 (390).

**NOT MEASURABLE:** the mobile hamburger menu panel. The nav collapses at ≤768, but the trigger is rendered
by Framer as an unlabelled div and a synthetic click did not open a measurable panel in the harness. Build
the mobile menu as a full-screen overlay using the dropdown link sets from §4, and verify against the
original manually.

---

## 11. Reference screenshots
- `reference/original-1440-full.png` — full page, 1440 wide (13967px tall)
- `reference/original-1440-hero.png` — above-the-fold at 1440×900
- `reference/original-390-full.png` — full page, 390 wide (20633px tall)
