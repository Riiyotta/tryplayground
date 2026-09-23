# How the Playground homepage clone was built

A record of how this project reached its current state, following the same
method as the other clones in this workspace: measure the live site first,
write the numbers down, download the real assets, build section by section,
then verify against the original rather than against the last commit.

**Result:** React 18 + Vite 5 + Tailwind v3, the full desktop homepage,
43 assets stored locally, no console errors, no horizontal scroll at
1440 / 768 / 390, and page height within 0.4% of the original at 1440.

---

## 1. Tools

| Tool | Used for |
|---|---|
| Playwright (global install) + headless Chromium | Measuring the original and driving the clone. |
| `curl` | Downloading assets, each one checked with `file` afterwards. |
| Python | Curve fitting and batch-editing components. |
| Vite dev server | Running the clone on port 5183. |

Two environment notes that cost time and are worth recording:

- The global Playwright expects a Chromium build number that is not the one
  installed, so every harness script passes `executablePath` explicitly at
  `chromium_headless_shell-1243`.
- The original polls continuously, so `waitUntil: 'networkidle'` never
  resolves. All measurement uses `domcontentloaded` + a fixed settle wait.

---

## 2. The measurement traps in this site

This site is Framer-rendered, and three separate false readings came out of
that. All three produced confident, plausible, wrong numbers, so they are
recorded here rather than quietly fixed.

**Trap 1 — a synthetic hover does not open the mega menu.**
Playwright's `hover()` and a dispatched `mouseenter` both leave the menu
closed. An early pass "measured" all four menus and got byte-identical
800x409 panels at y=115 for every one of them — that is the hero copy block,
not a dropdown. Four different menus returning the same number is the tell.
Driving a real `mouse.move()` to the trigger's centre opens it: the DOM grows
2016 -> 2117 nodes and the real panel appears.

**Trap 2 — a CSS inventory misses most of the motion.**
Sweeping every element's computed style finds only four transition rules on
the whole page and zero `@keyframes`:

| Uses | Property | Duration | Easing |
|---|---|---|---|
| 45 | `color` | 0.2s | `cubic-bezier(.44,0,.56,1)` |
| 3 | `background-color` | 0.5s | `cubic-bezier(.22,1,.36,1)` |
| 1 | `left, top` | 0.5s | `cubic-bezier(.22,1,.36,1)` |
| 1 | `left, transform` | 0.5s | `cubic-bezier(.22,1,.36,1)` |

That inventory is real but incomplete: the hero rail is animated by Framer
Motion in JS, so `getComputedStyle` cannot see it at all. Sampling element
boxes over time instead — rather than reading their styles — found the thumb
moving in **40 of 40 idle samples**. Measuring the same thing two ways is what
separated the two readings, and it is the only reason the tab motion below was
found.

**Trap 3 — measuring the inner text node instead of the control.**
Selecting by text content lands on a 22px-tall transparent `<div>`, which
reports `transition: all 0s` and no background, making an animated control
look static. The interactive box is an ancestor; the harness has to climb to
it before believing anything.

---

## 3. The hero tab rail

The largest correction in this pass. The rail looked finished and was not.

**The active state is not a background.** The original paints a *separate*
absolutely-positioned white thumb behind the labels and slides it. The clone
had `bg-white` on the active button, so the highlight teleported.

Measured on the thumb:

- 36px tall, radius 70px, `position: absolute`, `left: 4px` at rest.
- A six-layer stacked shadow, copied verbatim into `THUMB_SHADOW`.
- On a click, `left` jumps to its final value instantly while the *rendered*
  box eases there — so it is a transform/spring animation, not a `left`
  transition.

rAF-sampling a click on Payroll gave the curve. Motion starts ~120ms after the
click, runs 301ms, settles at 421ms, and interpolates x **and width** together
(288/128 -> 968/94). Progress reads .001 / .116 / .440 / .802 / .985 / 1.0 —
symmetric, so ease-in-out, not ease-out. Fitting candidates:

| Candidate | RMSE |
|---|---|
| `cubic-bezier(.65,0,.35,1)` | **0.054** |
| `cubic-bezier(.4,0,.2,1)` | 0.126 |
| `cubic-bezier(0,0,.2,1)` | 0.253 |
| `cubic-bezier(.25,1,.5,1)` | 0.322 |
| `cubic-bezier(.22,1,.36,1)` (ease-move) | 0.360 |

So `.ease-tab` is a third motion token, roughly 5x closer than reusing
`ease-move` would have been. The thumb measures its target from the live DOM
(`offsetLeft` / `offsetWidth` under a `ResizeObserver`) rather than from a
table of widths, so it stays correct through a font swap or a resize.

**The rail also auto-advances, which a previous pass recorded as false.**
A comment in `Hero.jsx` claimed "the rail does NOT auto-advance", from a
sample that watched a CSS transform that was never going to change. Watching
the thumb's box while fully idle shows a clean ~4s step:

```
  Billing -> Communication -> Registration -> Paperwork -> Payroll -> AI
        +3751   +4063   +4010   +4011   +4016 ms      then wraps to Attendance
```

Hovering the rail for 9s does **not** pause it — Billing -> Communication ->
Registration advanced on the same cadence with the pointer held over the
track — so the timer is unconditional. It is still cleared and restarted on an
explicit click so a manual pick gets its full dwell.

**The stage does not cross-fade.** All seven screenshots sit at the same
coordinates inside an `overflow: hidden` 964x525 box, all at opacity 1, with
no transform and no transition; the original swaps the `src`. So the stage is
an instant switch and only the thumb animates.

Clone vs original after the rebuild:

| | original | clone |
|---|---|---|
| rest | x=288 w=128 | x=288 w=129 |
| settle | 421ms | 417ms |
| final | x=968 w=94 | x=973 w=97 |
| auto-advance | ~4000ms | 3988 / 3989 / 4054 / 3989 / 3987ms |

Intermediate frames were checked explicitly, so this is a verified slide and
not two matching endpoints with a jump between them.

---

## 4. The mega menus

Measured with the menus genuinely open (see Trap 1). All four panel boxes now
match the original exactly:

| Menu | Panel | Radius | Rows |
|---|---|---|---|
| Platform | 667x381 | 10px | 4 x 337x60 + 4 x 260x50 |
| Switch to Playground | 620x370 | 10px | 4 x 348x60 + a 240x350 promo |
| Built for | 881x271 | 20px | 3 x 191x251 cards + 4 x 238x50 |
| Resources | 683x320 | 20px | 5 x 300x60 + 5 x 310x50 |

All four use `padding: 10px` and a 10px inter-column gap.

**The icons were the missing piece.** Each row's 40x40 white chip (radius
8.58px) holds a real 24x24 inline SVG. The clone was drawing a flat coloured
square. Framer drives every glyph from three CSS custom properties, read off
the live nodes:

```
--21h8s6   the tint
--1m6trwb  fill-opacity 0.2
--pgex8v   stroke-width 1.5
```

So each glyph is a translucent fill plus a full-opacity 1.5px stroke in the
same hue — which is why a solid block read as wrong even at the right size.
Reading `--21h8s6` also replaced the eyedropped tones with live values, and
caught one that was simply wrong:

| Row | was | measured |
|---|---|---|
| Finances / Billing / Expenses / Payroll / Subsidy | `#1EBD66` | `rgb(30,189,102)` — same |
| Marketing | `#FC5F35` | `rgb(252,95,53)` — same |
| AI Child Care Employee | `#B805FF` | `rgb(184,5,255)` — same |
| Operations | `#4290FE` | **`#066DFE`** |
| every Resources row | (none) | `#066DFE` |

Glyphs are redrawn on the measured 24x24 grid in `MenuIcons.jsx` rather than
copied path-for-path from the original's artwork.

**Four real images were missing** and are now downloaded: the 240x232
illustration on the "Switch to Playground" promo card, and the three 200x251
photos behind the "Built for" cards. Each was verified with `file` — one
arrives as PNG data under a `.webp` name, which is harmless since browsers
sniff content, but it means a size check alone would not have caught a saved
error page.

---

## 5. What is deliberately not built

Measured and confirmed absent on the original, so building it would be
invention rather than cloning:

- **No scroll reveal.** `CLONE_SPEC.md` §7 describes a fade + scale-from-0.8
  reveal. Re-measuring found **zero** off-screen elements parked at
  `opacity: 0` or a non-`none` transform. §7 appears to have misread four
  parked `opacity:0 / scale(.8)` *hover* chips, which never resolve on scroll.
  `Reveal` is a passthrough and the `delay` props at its call sites are dead.
- **No hover effect** on the "Built for" tiles or the feature cards —
  `transition: all 0s`, and nothing changes on hover.
- **No auto-advance** on the testimonial carousel.
- **No lift** on the primary CTA — transform, shadow and size are identical
  base vs hovered.

Substitutions kept on purpose: the Playground wordmark and favicon, and the
five partner logos in the marquee, remain placeholder marks. Those five are
named third-party organisations — customers of Playground, not Playground's
own brand — so their logos are not reproduced. Testimonial quotes are neutral
and unattributed rather than quoting named real customers.

Those slots used to render as anonymous grey boxes, which is indistinguishable
from a failed image load; the page has in fact reported **0 broken images** at
every viewport throughout. `Placeholder` now states what is missing: a dashed
edge, the organisation's name drawn in where it fits, an
`aria-label` of `"<name> (placeholder)"`, and a `data-placeholder` attribute
that the verification harness can select on. Page height is unchanged at
13,908px, so the marquee geometry and loop length still match.

The mega-menu glyphs in `MenuIcons.jsx` are in the same category and are worth
naming explicitly: they are **original drawings**, not the original's icon
artwork. What was measured from the live site and reproduced faithfully is
their *specification* — the 24x24 grid, `fill-opacity: 0.2`, `stroke-width:
1.5`, and the per-row tint from `--21h8s6`. The shapes themselves were drawn
for this clone to that spec.

---

## 6. Verification

Re-run after every change, against the running dev server:

```
1440px  height=13908  overflow=false  imgs=43  broken=0  errors=0
768px   height=20935  overflow=false  imgs=43  broken=0  errors=0
390px   height=21169  overflow=false  imgs=43  broken=0  errors=0
```

Menus open and close on real hover, all four at their measured size with real
artwork and zero broken images. Hero tabs switch on click and auto-advance on
the measured cadence. `npm run build` succeeds.

A note on the broken-image count: an early checker reported three broken
images at 768 and 390 by counting `naturalWidth === 0`. Those were
`hidden xl:block` elements that are never fetched at those widths. The check
now filters to images with a non-zero box before judging them.

**Known gap.** At 390px the page is 102.6% of the original's height. The
richer timeline cards cost vertical space when the grid collapses to one
column. Desktop is 99.6%.


---

## 7. Routing, and the first inner page

The clone was a single page; the original is **861 URLs**. Added
`react-router-dom` with a shared `Layout` (header + `<Outlet/>` + footer) and
a `ScrollToTop`, so nav and footer mount once rather than per page. Anything
not yet built falls through to a real 404 rather than rendering a half-right
page.

### The sitemap does not collapse the way it looks like it should

The obvious read is "21 solutions pages = 1 template x 21". That is false, and
measuring two pages in the same group is what showed it:

| | height | h2 count |
|---|---|---|
| `/solutions/billing` | 12,955px | 20 |
| `/solutions/payroll` | 8,052px | 13 |
| `/for/centers` | 9,227px | 7 |
| `/for/camps` | 7,943px | 17 |

Pages within a group are bespoke. So each page is measured and built on its
own, and shared *components* (`PageParts.jsx`) are what gets reused, not a
page-level template.

### Asset pipeline

`dl.cjs` reads a page's measured image manifest and downloads every asset into
`public/assets/img/<page>/`, named `<alt-slug>__<framer-hash>.<ext>`. The hash
keys a reuse index, so an asset shared between pages is fetched once. Every
file is checked with `file` after download and deleted if it is not real image
data - a saved error page has a plausible size and would otherwise sit there
looking fine. Billing: **40/40 downloaded, 0 failed, 4.3MB.**

Per the site owner's instruction this pass downloads everything, including the
named customer logos and photography that earlier passes had substituted. The
five partner marks in the homepage marquee are now the real logos.

### /solutions/billing

Built from measurement: 34 headings with their type scale, 40 images with
their boxes, the section padding, the FAQ, and the full copy.

Two findings worth keeping:

- **The FAQ rows toggle independently.** Opening row 2 while row 1 was open
  left both open, so it is not a single-open accordion. Row 1 ships open.
- **FAQ answers needed a text diff to extract.** Positional selectors kept
  returning row 1's answer for row 3, because the 538px row wrapper contains
  its siblings' text. Snapshotting every text node before and after opening a
  row, then taking what is new, returned all six distinctly.

First build measured 10,609px against 12,955 (81.9%). The heading diff showed
exactly why, and none of it was padding:

1. the testimonial band at y=4341 (~697px) was missing entirely;
2. "Explore related articles" at y=10703 (~600px) was missing entirely;
3. each row's sub-headline is an `h2` at 17px/23.8 on the original, and I had
   rendered it as a `<p>`, so it was absent from the heading outline.

Fixing all three, then correcting section padding from a guessed 120px to the
measured **140px**, took it to **12,230px (94.4%)** with every heading in the
original's order.

### Two false alarms from my own verification

Both looked like real bugs and were not. Recording them because each cost a
diagnosis cycle, and in both cases my first theory was wrong.

- **"3 broken images."** They are the last cards in the *horizontally*
  scrolling article rail, parked ~3,000px to the right. `loading="lazy"` +
  never revealed = `naturalWidth 0`, which is indistinguishable from broken.
  I first assumed a filename collision from slug truncation; `file` showed all
  six files valid at 249-284KB, and `curl` showed the dev server serving them
  at HTTP 200 with matching byte counts. The checker now sweeps rails
  horizontally as well as the page vertically - and must `scrollIntoView` the
  rail first, because scrolling a rail that is parked off-screen moves
  `scrollLeft` but fetches nothing.
- **"FAQ not toggling."** The probe selected `button[aria-expanded]` and
  clicked index 1 - which is the **Platform nav trigger**, since the mega-menu
  buttons carry the same attribute. Scoped to buttons whose text contains a
  question mark, the accordion behaves correctly.

**Verified:** 1440/768/390 all at 0 broken, 0 console errors, no horizontal
overflow; FAQ toggles independently.


---

## 8. The pages under the nav

The four mega-menus were the natural next scope: hovering each one on the
original and reading its real `href`s gives 21 distinct routes, which is the
site's own idea of what matters.

### The nav's own links do not match their labels

Reading the hrefs rather than assuming them caught something I would otherwise
have "fixed" into a bug. In the "Built for" menu:

| label | actual href |
|---|---|
| Shared Services | `/for/owners` |
| Camps | `/for/directors` |
| Before & After Care | `/for/enrollment-specialist` |

Head Start is the only side-list entry whose label and target agree. These are
reproduced as measured, with a note in `content.js` so a later pass does not
"correct" them.

Menu entries now carry a measured `to`, and the header renders a `<Link>` for
anything with one and a plain anchor for anything without - so an unbuilt
destination cannot silently look navigable.

### Measuring first, to size the job

All 21 routes measured before building any of them:

| route | height | h2 | images |
|---|---|---|---|
| `/for/multi-site` | 14,277 | 28 | 38 |
| `/solutions/billing` | 12,955 | 20 | 41 |
| `/blog` | 12,894 | 28 | 307 |
| `/careers` | 12,158 | 17 | 16 |
| `/for/directors` | 11,165 | 10 | 24 |
| `/resources` | 10,407 | 0 | 46 |
| `/for/owners` | 10,389 | 9 | 22 |
| `/for/centers` | 9,227 | 7 | 23 |
| `/for/head-start` | 9,073 | 22 | 18 |
| `/for/enrollment-specialist` | 8,957 | 7 | 20 |
| `/solutions/expenses` | 8,371 | 12 | 35 |
| `/solutions/subsidy` | 8,229 | 15 | 28 |
| `/solutions/ai` | 8,137 | 8 | 33 |
| `/solutions/payroll` | 8,052 | 13 | 30 |
| `/for/home-based` | 8,001 | 7 | 21 |
| `/about` | 7,689 | 13 | 35 |
| `/why-playground` | 6,862 | 9 | 36 |
| `/customers` | 5,625 | 1 | 27 |
| `/support` | 5,290 | 11 | 15 |
| `/webinars` | 5,113 | 5 | 63 |
| `/changelog` | 4,266 | 2 | 19 |

About 196,000px of page in total.

### Asset dedupe

The hash-keyed reuse index earns its keep once several pages are in: an asset
already on disk under any page folder is matched by its Framer content hash
and re-pointed rather than refetched.

| page | downloaded | reused |
|---|---|---|
| billing | 40 | 0 |
| support | 8 | 5 |
| customers | 14 | 11 |
| why-playground | 23 | 12 |
| about | 23 | 10 |

Zero failures; every file `file`-checked as real image data.

### Built so far

| route | clone | original | |
|---|---|---|---|
| `/` | 13,908 | 13,908 | 100% |
| `/solutions/billing` | 12,230 | 12,955 | 94.4% |
| `/why-playground` | 6,085 | 6,862 | 88.7% |
| `/about` | 6,237 | 7,689 | 81.1% |
| `/support` | 5,460 | 5,290 | 103.2% |
| `/customers` | 4,328 | 5,625 | 77.0% |

All at 0 broken images, 0 console errors and no horizontal overflow at
1440 / 768 / 390.

### Interactions found by measuring, not assuming

- **`/why-playground` has a two-step lead form.** The three program-type
  tiles are 198x250 buttons on `#F4F2EC`; the chosen one tints to
  `rgba(70,160,219,0.2)`, and choosing one reveals a contact step - the page's
  text grows from 4,403 to 5,015 characters. Built as two steps.
- **FAQ answers need the text-diff capture** on every page that has them, for
  the same reason as billing. `faqdiff.cjs` generalises it: snapshot every
  leaf text node, open one row, take what is new.
- **`/about` has a Directors / Families tab pair** over its review wall.

### Still to build

`/solutions/{expenses,payroll,subsidy,ai}`, the seven `/for/*` pages,
`/blog`, `/resources`, `/webinars`, `/changelog`, `/careers`.


---

## 9. The solutions pages, and two bugs worth keeping

`/solutions/{expenses,payroll,subsidy}` measured as genuinely sharing the
billing skeleton - hero, alternating feature rows, sibling links, FAQ,
article rail, CTA - so they are one data-driven component
(`SolutionPage.jsx`) rather than three near-identical files. `/solutions/billing`
stays hand-built because it carries a testimonial band and three card grids
the others do not, and `/solutions/ai` differs again. The route order keeps
the specific path ahead of `:slug`.

### FAQ row 1 ships open, so the text diff finds nothing

The diff capture from §7 returned `(none)` for the first question on every one
of these pages. The reason is structural, not a flake: row 1 is already open,
so opening it produces no new text to diff. `faq1.cjs` reads that one row
directly instead. All 18 answers across the three pages came out clean once
the two methods were used together.

### Bug - hand-transcribed asset paths

Four images 404'd because I had copied their paths from a **truncated console
listing** rather than from the manifest: disk had
`...__3KausbUXMb1PCt4bX1iWx5e474E.webp`, the data said
`...__3KausbUXMb1PCt4bX1iWxYFfvk.webp`. The hash is exactly the part that got
cut off.

Fixed by walking `public/assets/img`, indexing every real file by
`(directory, slug-prefix)`, and repairing any referenced path that did not
exist when exactly one candidate matched - **9 paths repaired**, four of them
ones I had not noticed yet. The lesson is to generate paths from the manifest,
never retype them.

### Bug - a measured pixel width is a DESKTOP width

`/solutions/expenses` overflowed at 390px: the hero shot is measured 409px
wide, and `Img` applied that as a fixed width at every viewport, so a 409px
image sat in a 390px window and pushed the page sideways.

Fixed in `Img` rather than per page, since every page using a measured width
had the same latent bug: `maxWidth: 100%` clamps it, and `height: auto` plus an
`aspectRatio` from the measured w/h keeps the art from squashing once the
width is clamped.

**Verified** across all three pages: 0 broken images, 0 console errors, no
horizontal overflow at 1440 / 768 / 390, FAQ rows toggling independently with
row 1 open.


---

## 10. The /for/* pages, and an assumption that would have shipped wrong text

`/for/{centers,home-based,multi-site,head-start}` measured as sharing a shape
- hero, wide feature sections, FAQ, CTA - so they run through one renderer
(`ForPage.jsx`), like the solutions trio.

### Not every accordion ships a row open

§9 established that the `/solutions` FAQs ship row 1 open, and that reading it
needs a different method from the diff. Carrying that assumption to `/for/*`
would have produced a wrong first answer on all four pages.

Measuring the rows directly settled it:

```
y=6957  598x44   len=47   "What does Playground do for child care centers?"
y=7001  598x64   len=62   "How do you run a child care center across ..."
y=7065  598x64   len=55   "What does it take to keep a center licensed?"
```

Row 1 is 44px tall and its text length is 47 - the question and nothing else.
No row ships open here. The first answer came from the ordinary open/close
diff, and `Faq` grew an `openFirst` prop so each page states which behaviour
it measured rather than inheriting a default.

Two bad extractions were caught before they reached the data, both worth
naming because each produced *plausible* text:

- A DOM-proximity walk for the open row returned the **Camber section copy**
  from elsewhere on the page - fluent, on-topic, and completely wrong.
- Scoping strictly to the row element returned **the sibling questions
  concatenated**, because the row wrapper contains them.

An answer that reads well is not evidence it came from the right element.

### Asset paths: generate, never retype

The repair pass from §9 now runs after every page. On `/solutions/ai` it
caught one more truncated path; on `/for/*` it reported **0 to repair**,
because those paths were generated from the manifest rather than copied from
console output.

### Built in this pass

| route | clone | original | |
|---|---|---|---|
| `/solutions/expenses` | 6,737 | 8,371 | 80.5% |
| `/solutions/payroll` | 6,775 | 8,052 | 84.1% |
| `/solutions/subsidy` | 6,612 | 8,229 | 80.4% |
| `/solutions/ai` | 6,286 | 8,137 | 77.3% |
| `/for/centers` | 5,858 | 9,227 | 63.5% |
| `/for/home-based` | 5,625 | 8,001 | 70.3% |
| `/for/multi-site` | 5,384 | 14,277 | 37.7% |
| `/for/head-start` | 4,973 | 9,073 | 54.8% |

All at 0 broken images, 0 console errors, no horizontal overflow at
1440 / 768 / 390.

The `/for/*` percentages are honestly low. The structure, copy and FAQ are the
original's, but several sections on the original carry artwork and sub-layouts
that these render as plain copy blocks - `/for/multi-site` especially, which
is 14,277px with 28 h2s on the original and has a customer-story band and
several card grids not yet built. Recorded here rather than presented as done.


---

## 11. Making the pipeline faster, and finishing the nav

### The speedup theory was wrong; profiling found the real one

The plan was to collapse the 3-4 browser launches per page into one pass.
Benchmarked, that was **18s vs 19s - no gain**. Profiling a single page showed
why:

| step | time |
|---|---|
| browser launch | 179ms |
| navigate | 681ms |
| **fixed settle wait** | **6,002ms** |
| scroll | 1,017ms |
| capture everything | **2ms** |

Launches were never the cost. The flat 6s settle - added because the site
never reaches network-idle - was 75% of every page, and capturing structure,
copy, assets and motion together costs 2ms, so the extra data is free.

Replaced the flat wait with adaptive polling. Content stabilises at
~2,660-2,760ms consistently across page types. One detail makes this
non-trivial: node count *drops* partway through (3,755 -> 1,846 on
/webinars) as Framer hydrates and replaces the server markup, so settling has
to mean "stopped changing", not "waited past a threshold" - a naive shorter
wait captures pre-hydration DOM. Result: **19s -> 15.2s**, verified lossless
(same height, same 58 headings, 0 content differences once heading truncation
is normalised).

### The real bottleneck was the FAQ extraction

Each FAQ answer cost a full launch+settle (~15s), so a 7-question page cost
~105s. `faqall.cjs` loads the page once and walks every row in a single
session: **7/7 answers in 15.1s, a 7x saving** on the part that actually
dominated. It also detects per-page whether a row ships open, since
/solutions opens row 1 and /for/* opens none.

### Judgment calls on the two feed pages

Both were capped rather than reproduced entry-for-entry, and both say so on
the page rather than implying a full archive:

- **/blog** carries 213 posts in 13 categories with 307 covers. Kept the
  first 8 per category (94 posts) - enough to render the real category
  structure and grid without pulling 300+ covers for an index.
- **/changelog** measures **64,018px with 204 entries**, lazy-loading far past
  the 4,266px a single viewport reports. Kept the 24 most recent, matching the
  page's own "Our latest releases" framing.

### Two small fixes found by verification, not by reading code

- **/changelog overflowed at 390px.** A `shrink-0` note beside the heading
  refused to shrink and pushed the page sideways. Now wraps.
- **/careers had no `h1`.** The original opens with an `h2` and carries no
  `h1` at all. Reproduced faithfully at first, then promoted to `h1` at the
  same measured size - a page needs exactly one top-level heading even where
  the original's markup does not provide one. Noted in the component.

Also worth recording: several asset downloads reported as "failed" across
these pages were **Bing tracking pixels** (`bat.bing.com`, 0x0). The `file`
check rejected them correctly; zero real assets were missing.

### All 21 nav routes, verified

Every route below: 0 broken images, 0 console errors, no horizontal overflow
at 1440 / 768 / 390, correct `h1`, shared header and footer, and a real 404
for anything unbuilt.

| route | clone | original | |
|---|---|---|---|
| `/` | 13,908 | 13,908 | 100% |
| `/solutions/billing` | 12,230 | 12,955 | 94% |
| `/support` | 5,460 | 5,290 | 103% |
| `/why-playground` | 6,085 | 6,862 | 89% |
| `/solutions/payroll` | 6,775 | 8,052 | 84% |
| `/about` | 6,167 | 7,689 | 80% |
| `/solutions/expenses` | 6,737 | 8,371 | 80% |
| `/solutions/subsidy` | 6,612 | 8,229 | 80% |
| `/solutions/ai` | 6,286 | 8,137 | 77% |
| `/customers` | 4,328 | 5,625 | 77% |
| `/for/home-based` | 5,625 | 8,001 | 70% |
| `/for/centers` | 5,858 | 9,227 | 63% |
| `/for/enrollment-specialist` | 5,288 | 8,957 | 59% |
| `/for/head-start` | 4,973 | 9,073 | 55% |
| `/for/owners` | 5,510 | 10,389 | 53% |
| `/careers` | 6,471 | 12,158 | 53% |
| `/for/directors` | 5,529 | 11,165 | 50% |
| `/webinars` | 6,691 | 5,113 | 131% |
| `/for/multi-site` | 5,384 | 14,277 | 38% |
| `/blog` | 11,099 | 12,894 | capped on purpose |
| `/changelog` | 16,313 | 64,018 | capped on purpose |

The percentages below ~70% are honest gaps, not rounding: structure, copy and
FAQ are the original's, but several sections that carry bespoke artwork and
sub-layouts on the original render as plain copy blocks here.
`/for/multi-site` is the weakest - 28 h2s on the original, with a
customer-story band and card grids not built.

---

## 12. Static-looking sections that are actually stateful

The four bugs reported against the homepage in this pass shared one root
cause worth recording: **a section that looks static in a screenshot can be
stateful in the DOM**, and the methods in §8 will not catch it.

### 12.1 "Get to know" was an accordion, built as a link list

The six rows were built as six `<a>` links. They are in fact an
auto-advancing accordion. The tell was not visual — a screenshot of either
version looks like a list of six labels. What exposed it was sampling the six
row *boxes* on a timer while leaving the page completely idle:

| t (ms) | open row | its height |
|-------:|----------|-----------:|
| 0      | Marketing    | 176 |
| 3648   | Registration | 202 |
| 8648   | Finances     | 226 |
| 13647  | Engagement   | 153 |
| 18647  | Payroll      | 153 |

Collapsed rows hold at 69px. The gaps are ~5000ms (a second 40s run measured
4861/4861/4878), the expand transition runs ~375ms, and the 829x451 stage
image swaps *~150ms before* the row expands — the media leads, it does not
lag.

Two details only direct measurement would have given:

- **The progress rule.** The open row carries a 360x1 track in `#F0ECE9`
  under a 2px bar in `rgb(31,92,247)`. The bar's element is 720px wide —
  twice the track — and is translated from -360 to 0. Sampling it showed a
  flat 7.2px per 100ms, i.e. exactly linear across the 5000ms dwell, with no
  easing at all.
- **"AI Employee" never expands.** Every other row has a description. This
  one measured 69px even when clicked directly, and the stage kept the
  previous image. Building it "consistently" with the others would have
  invented a row state the original does not have.

### 12.2 A rotation read as a scale

The testimonial video frame tilts on hover. rAF-sampling it gave:

```
matrix(0.999391, 0.0348995, -0.0348995, 0.999391, 0, 0)
```

and a box growing 450x456 -> 465.6x471.4. The first fix applied
`rotate(2deg) scale(1.0347)` from those two facts and over-sized the frame to
481.8px.

The matrix says otherwise: its scale terms are 0.999391 = **cos(2°)**. This
is pure rotation. The 15.6px of "growth" is just the rotated bounding box of
an unscaled element. With the scale removed the clone's hover matrix is
digit-for-digit identical to the original's.

Lesson: when a hover both moves and resizes something, read the matrix, not
the bounding box. A `getBoundingClientRect` delta cannot distinguish a scale
from a rotation, and will invite you to apply both.

The curve is a **spring**: the rotation overshoots to 0.035403 at ~343ms
before settling back to 0.0348995. None of the three existing easing tokens
overshoot, so this needed a fourth (`.ease-tilt`).

### 12.3 Measuring one level too high, and one level too low

Both failure directions showed up in the same section:

- **Too low.** Measuring the stage *image* found it filling its immediate
  parent exactly (829x451), which read as "no frame here" — so a frame was
  removed that does exist. It sits one level further up: 845x467, radius 20,
  padding 8, `rgba(68,25,6,0.04)`.
- **Too high.** Climbing from the section's `<h2>` to find its cards never
  reached them — the heading and the card grid are siblings under different
  wrappers, so a containment walk returned `cards: []` on a section that
  visibly has four. Anchoring on absolute Y instead (`heading top` ±span, and
  filter every element in that band) found them immediately.

Prefer **coordinate-banded** queries to DOM-containment walks on Framer
output. The visual grouping and the DOM nesting routinely disagree.

### 12.4 Card grid spans mirror between rows

The marketing grid is not a repeating 2-span/1-span pattern. Measured x
positions are 112 / 523 / 933 with cards of 805 or 395:

```
row 1:  805 @112        395 @933
row 2:  395 @112   805 @523
```

The wide card swaps sides. The earlier build had row 2 the wrong way round,
which is invisible in a thumbnail and obvious at full width.

Finances is a different shape again — five cards, not four — and its second
card is a **customer story**: its heading *is* the quote, set at 30px, and it
closes with a "Read the story" link. It is flagged `story` in the data rather
than forced through the standard card layout.

### 12.5 A cross-fade caught mid-swap is not a design token

A comparison screenshot showed a pink wash around the original's stage that
the clone lacked. It was not a frame color — it was the previous image
cross-fading out, caught mid-transition. The real fill is the same
`rgba(68,25,6,0.04)` warm wash used elsewhere. Screenshots of an
auto-advancing section will regularly catch a transient state; confirm any
"new" color against `getComputedStyle` before encoding it.

## 13. A computed value can be right and still be the wrong thing to copy

A typography QA pass reported that every `h1` on the original computes to
`font-weight: 400` while the clone renders `700`, and recommended dropping
the clone to 400 on eight routes.

The full computed style says why that would have been wrong:

```
font-family: "CircularXX TT Bold", "CircularXX TT Bold Placeholder", sans-serif
font-weight: 400
```

The family *is* the bold cut. Circular ships each weight as a separate file,
so the original asks for weight 400 of a font that is already bold, and it
renders bold. The clone substitutes Manrope, a variable family where weight
is a real axis, so the equivalent is `700`. Copying the 400 would have made
every h1 on the site render thin.

The general trap: a QA sweep compares computed values across two sites, but a
computed value is only meaningful together with the resource it resolves
against. Whenever the two sites load *different* fonts - which is the premise
of this whole clone, since CircularXX is commercial - `font-weight`,
`font-style` and `font-stretch` are not directly comparable. Check the family
name before acting on a weight delta.

The same logic applies to the h2/h3 weight deltas in that report (`h2:400`,
`h3:500` on the original): they are Circular's Book and Medium cuts, not
requests for light text.

This is the second instance of the pattern in §12.2 - a measurement that is
accurate as a number but wrong as an instruction. There the bounding box grew
and the cause was rotation, not scale; here the weight reads 400 and the cause
is the font file, not the intended thickness. Read the whole declaration, not
the one property you came to compare.
