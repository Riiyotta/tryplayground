# QA sweep — all 23 routes

Four independent audits against the live original at 1440/768/390: layout and
padding, typography and colour tokens, links/console/a11y, and motion/hover.
Everything below is measured, not inspected by eye. Status is as of the
commits listed in each row.

The point of recording this is that several findings were **wrong**, and
wrong in ways that would have made the clone worse if applied. Those are in
§5 — they are the most useful part of this document.

---

## 1. Fixed — structure

| What | Where | Detail |
|---|---|---|
| `/for/*` pages ran at 50–70% of the original's height | `src/data/forPages.js` | 14 of 44 sections had no `img`, so `ForPage`'s second branch rendered them as a 250–340px centred copy block instead of the ~930px two-column feature row. Probing the original showed every one of those sections carries artwork. 19 images downloaded and wired in. |
| Three sections missing entirely | `ForPage.jsx`, `forPages.js` | Savings Club band (directors, owners) and the three-card support band (directors, owners, enrollment-specialist). Support cards measured 315×540 at x=216/563/909, r12px on #FBFAF9, CTAs sharing a baseline at y=8467. |
| Four CTA headings had drifted wording | `forPages.js`, `solutions.js` | e.g. clone "Book a demo to see Playground for Head Start." vs original "See what your Head Start program looks like on Playground". |
| "Built for" header overlapped its tile grid | `Sections.jsx` | The original lays the header in two columns (H2 470px at x=240, intro 470px at x=730). The clone stacked them centred and an earlier pass compensated with `xl:mt-[-9px]`, pulling tiles up *over* the intro. |

Heights after: directors .50→.66, owners .53→.73, enrollment .59→.73,
centers .64→.68, home-based .70→.72.

Still short: `/for/head-start` (.55) is structurally different upstream — the
original splits each topic into a heading *plus* a sub-heading h2 (22 h2s vs
the clone's 5) and adds a 4-tile grid and a testimonial. That is a rebuild of
the page's shape, not a spacing fix, and is **not done**.

## 2. Fixed — navigation

1,344 of 1,404 anchors were placeholder `href="#"`, including many pointing
at routes this clone actually serves.

- **Footer** (all 23 routes): links were bare strings with a hardcoded
  `href="#"`. 19 of 39 now route for real; the other 20 stay inert because
  the target page genuinely is not built. An inert anchor is more honest than
  a link to a 404.
- **Mobile nav** (390px): every link rendered `href="#"` even though the menu
  data carries the same measured `to` the desktop panel uses — the mobile
  panel just dropped it. 14 of 16 now work, so the mobile site is no longer
  navigation-dead.
- **Mega-menus** opened on `mouseenter` only, leaving the site's main
  navigation unreachable by keyboard. Click/Enter toggle and Escape close,
  layered on top of the measured hover behaviour.
- **"Built for" tiles** were all `href="#"`; now route to `/for/*`.

Per-route live anchors: `/` 2→27, `/about` 2→22, `/for/directors` 2→21,
`/solutions/billing` 5→24, mobile nav 1→14.

## 3. Fixed — typography and colour

- **~480 elements had `letter-spacing: normal`.** The `fontSize` tokens carry
  correct tracking, but most of the codebase sizes text with arbitrary
  utilities (`text-[15px]`), which set size without tracking. Base-layer
  rules now give those the same em values. Clone now measures 15px −0.36
  ×227 (zero untracked), 16px −0.336 ×77, 17px −0.34 ×29, 18px −0.36 ×39 —
  matching the original at every size.
- **`/blog` category labels** rendered as 32px bold display headings; they
  are 14px/16.8px category tags in rgb(39,42,46) on the original — less than
  half the size. This was the single worst type mismatch found.
- **`/blog` card wells**: the original uses an inset shadow
  (`inset 0 1px 11px rgba(0,0,0,0.05)`, 311 uses, the only inset on the site)
  on an 8px radius over #FBF9F7. The clone had no inset anywhere.

## 4. Fixed — behaviour and a11y

- Rive logged a "no stateMachine specified" warning per card. All eight
  `.riv` files ship `State Machine 1` (verified with `strings` over the
  binaries rather than assumed). All 8 canvases still mount at their exact
  1610×960 / 790×960 backing sizes, zero console output.
- Blog and changelog thumbnails carried `alt=""` beside a title — informative
  images announced as decorative. Now 94/97 and 24/27 described.

## 5. Reported but NOT changed — and why

These are the findings that were wrong. Each would have moved the clone
*away* from the original.

### 5.1 "Every h1 is weight 400 on the original, 700 in the clone"

The original's font family is literally `"CircularXX TT Bold"`. Circular
ships each weight as a separate file, so it asks for weight 400 *of a font
that is already bold* and renders bold. Manrope is a variable family where
weight is a real axis, so 700 is the correct equivalent. Applying the 400
would have made every h1 on the site render thin.

Same for the reported `h2:400` / `h3:500` — those are Circular's Book and
Medium cuts.

**Whenever the two sites load different fonts — the premise of this whole
clone, since CircularXX is commercial — `font-weight` is not comparable
between them.** Recorded as PROCESS.md §13.

### 5.2 "`surface` is off by one channel, should be #FBF9F7"

Page-local, not a token error. Measured: homepage `rgb(251,250,249)` ×24,
`/solutions/billing` ×22, `/for/centers` ×9 — all matching the current
token. Only `/blog` uses `rgb(251,249,247)`, ×311. The finding sampled
`/blog` and generalised. Changing the global token would have broken every
correct card on every other page to fix one. Added as a `blog-surface`
token instead.

### 5.3 "`/about`'s Directors/Families tabs are inert"

True, and correct. Clicking "Families" on the **live original** leaves the
review wall byte-identical (21 reviews, same order). The clone faithfully
reproduces this. "Fixing" it would introduce a difference.

### 5.4 "A 960px container is missing"

It is the final CTA block, which exists. Not a missing section.

## 6. Open

- **`/for/head-start`** needs restructuring to the original's heading +
  sub-heading + tile-grid shape (§1).
- **Missing shadow stacks** beyond the blog well: a 3-layer `rgba(81,81,84)`
  elevated-card stack (52 uses) and `rgba(0,0,0,0.12) 0 1px 4px` (24 uses)
  are still absent. `shadow-warm` is 4 layers against the original's 5.
- **Radius tokens** `16px` and `9px` do not exist; those cards flatten onto
  `card:12px`.
- **Vertical rhythm**: the clone has collapsed onto a uniform ~140px section
  gap. `/for/centers` loses 80–95px before every heading; `/solutions/ai`
  gains 115–150px (the original has an eyebrow label directly above those
  h2s, a structure the clone does not reproduce).
- **Per-page eyebrow colours**: `/support` uses blue `#066DFE` and
  `/solutions/billing` green `#09A851`; the clone renders both as the
  orange `#FC5F35`.
- **Persona tab cards** and `/solutions/billing` feature tiles have wrong
  radius and fill.
- **`/customers`** "Read case study" / "Watch video" buttons have no handler.
- Remaining `href="#"` links whose target pages are genuinely unbuilt.

## 7. Clean

Verified across all 23 routes: zero console errors, zero failed network
requests, zero broken images, no horizontal overflow at 1440/768/390, every
route renders exactly one `<h1>` (including the 404), every non-`#` internal
href resolves, no focus traps in 40 tab presses, every icon-only button has
an `aria-label`, FAQ accordions work on all 13 routes that have one,
carousels and steppers advance and disable correctly at their ends, and no
serif or system-font fallback leaks anywhere.
