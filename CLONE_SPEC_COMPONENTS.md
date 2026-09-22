Source: https://www.tryplayground.com/

# Playground — Component Anatomy Spec (Deep Pass 2)

Companion to `CLONE_SPEC.md`. That file covers page-level geometry, the section map, the type scale,
the colour census and per-viewport section heights. **This file covers component internals**: box model,
internal padding, gaps, child sizes, radii, shadows, and per-text-node computed typography — plus a
re-measured motion inventory that **corrects several claims in pass 1**.

Everything below was sampled live with Playwright against the production site at 1440x900 unless a
different viewport is named. `y` values are absolute document offsets at 1440. Nothing is estimated;
anything unmeasurable is flagged **NOT MEASURABLE**.

---

## 0. CORRECTIONS TO PASS 1 — read this first

Pass 1 got these wrong or incomplete. Build from **this** file where they disagree.

| # | Pass 1 said | Actually measured |
|---|---|---|
| 1 | Feature grids are "3 columns x 394.66px" | They are **3-column grids with mixed column spans**. Every grid contains 805.33px cards (span 2) and one contains a 1215.98px card (span 3). See §1. |
| 2 | Feature card image is a child in flow | The image is an **absolutely-positioned full-bleed layer covering the entire card**, `inset:0`, `z-index:0`, `object-fit:contain`. Text is a separate `z-index:2` overlay. There is no "image height" or "gap between image and text". See §1. |
| 3 | Hero eyebrow pill is a "rounded outline pill" | It is a **filled** pill: `background #EEF5FF`, `border-radius 61px`, `padding 6px 6px 6px 12px`, **no border**, text `#183390`. See §9. |
| 4 | Footer links are Inter 13px/18.2px 400 -0.3px | Footer **nav** links are Inter **15px/21.9px, 500, -0.36px, `#79716B`**. Only the **legal row** is 13px/18.2px/400/-0.3px — and it is **white** (`#FFFFFF`), because it sits on the illustration band. See §8. |
| 5 | "8 elements parked at opacity 0 / scale(0.8) resolve to 1 on scroll" — a fade+scale scroll reveal | **False.** Those 4 `scale(0.8) opacity:0` chips **never resolve**. Sampled for 1.65s after scrolling fully into view: still `opacity:0, matrix(0.8,0,0,0.8,0,0)`. They are **hover/press-state background layers** behind text links, not scroll reveals. See §10. |
| 6 | Scroll reveal exists on the page | **There is no scroll reveal anywhere.** Feature cards, "Built for" tiles and section H2s were sampled at 40-45ms intervals across 1.6-1.7s while being scrolled into view: `opacity` stayed `1` and `transform` stayed `none` for the entire series, and their pre-scroll state was already `opacity:1 / transform:none`. Do **not** build a fade-in-on-scroll. See §10. |
| 7 | Hero tab stage: "all 7 screenshots sit at opacity 1 simultaneously; the active one is selected by the rail's translate" | **Wrong mechanism.** There are 7 stage layers; the active one is `opacity:1`, the rest are `opacity:0 / z-index:1`. Clicking a tab **crossfades** them over **~310ms** with complementary opacity (sum stays 1.0). No translate, no rail transform. Full sampled curve in §10. |
| 8 | Container is a fixed 1256 shell / 1216 inner | The container is **fluid**: `width:100%` with a 20px side padding, clamped to a **1256px max** only at viewport >= 1280. Between 810 and 1279 the section is full-viewport-width with 20px gutters. See §11. |
| 9 | "Built for" tile padding 40px | **Confirmed** 40px, and the title sits at the **top-left**, not the bottom. Plus an undocumented 28x28 arrow icon at top-right, inset 20px. See §2. |
| 10 | Timeline "Day one" pill is in the timeline card row | It is **not**. It lives inside a separate **966x275 `#F2F4F7` r16 preview pane at y=10726**, below the three cards. The cards themselves contain no pill. See §4. |

---

## 1. Feature cards (sections 7 / 8 / 9 / 10)

### 1.1 The grid is a span grid, not a 3-up

All four grids are identical containers:

```
display: grid;
grid-template-columns: 394.656px 394.672px 394.656px;   /* = 3 x (1216 - 32) / 3 */
grid-template-rows: 480px 480px;
gap: 16px;
width: 1216px;  height: 976px;  padding: 0;
```

Measured cell placement (x, y, w x h) — the 805.33px cards span **2** columns
(`394.66*2 + 16 = 805.33`) and the 1215.98px card spans **3**:

| Grid (y) | Section | Cells |
|---|---|---|
| **3495.44** | 7 Marketing | `112,3495 805.33x480` *(span 2)* — "Don't let another lead slip through the cracks"<br>`933.33,3495 394.66x480` — "Predictive Enrollment"<br>`112,3991 394.66x480` — "Child care websites built for enrollment"<br>`522.66,3991 805.33x480` *(span 2)* — "Less paper, less work" |
| **4947.03** | 8 Finances | `112,4947 805.33x480` *(span 2)* — "Payment collection on autopilot"<br>`933.33,4947 394.66x480` — quote card "I cut 4 systems down into just 1"<br>`112,5443 394.66x480` — "Make subsidized billing a breeze"<br>`522.66,5443 394.67x480` — "Automatic expense tracking"<br>`933.33,5443 394.66x480` — "Fast, accurate, and effortless payroll…" |
| **6395.84** | 9 Operations | `112,6396 805.33x480` *(span 2)* — "Strengthen relationships with families…"<br>`933.33,6396 394.66x480` — "Attendance"<br>`112,6892 394.66x480` — "Learning"<br>`522.66,6892 394.67x480` — "Food program"<br>`933.33,6892 394.66x480` — "Reporting" |
| **7844.66** | 10 Camber AI | `112,7845 805.33x480` *(span 2)* — "Never miss a lead"<br>`933.33,7845 394.66x480` — "Instant answers for staff and families"<br>`112,8341 1215.98x480` *(span 3, own row)* — "Do more with the team you have" |

So the layout rule is: **row 1 = [span 2][span 1]**, **row 2 = [span 1][span 2]** (marketing) or
**[1][1][1]** (finances/ops) or **[span 3]** (camber). Every card is exactly **480px tall**.

### 1.2 Standard card anatomy (verbatim from the DOM walk)

Measured on `394.66x480` at y=3991 ("Child care websites built for enrollment"), identical at y=7845:

```
<div>                          394.66x480   position:relative            (grid item wrapper, no styles)
  <a>                          394.66x480   background:#FBFAF9  border-radius:12px
                                            display:flex  gap:0  justify-content:flex-start
                                            align-items:flex-start  overflow:hidden
                                            padding:0  border:none  box-shadow:NONE
    <div>  TEXT COLUMN         385x480      padding:0 0 24px            (note: 385, NOT 394.66)
                                            display:flex  flex-direction:column
                                            justify-content:space-between  align-items:flex-start
      <div>                    385x152.91   padding:32px 32px 0
                                            display:flex  flex-direction:column  gap:12px
                                            overflow:hidden  z-index:2
        <div><h3>              288.89x43.19 Inter 18px/21.6px 500 ls -0.36px  #1C1917  text-align:start
        <div><p>               321x65.72    Inter 15px/21.9px 500 ls -0.36px  #6A7074  text-align:start
    <div>  IMAGE LAYER         394.66x480   position:absolute  inset:0  z-index:0
                                            display:flex  gap:10px  justify-content:center  align-items:center
      <div>                    394.66x480   position:absolute  inset:0
        <img>                  394.66x480   object-fit:contain  overflow:clip
```

Key facts for Build:
- **No card padding, no card border, no card shadow.** Only `background:#FBFAF9` + `border-radius:12px` + `overflow:hidden`.
- The **image bleeds the full card** (`position:absolute; inset:0; object-fit:contain`) and sits **behind** the text (`z-index:0` vs `z-index:2`). The illustration artwork itself carries its own whitespace so it reads as "inset" — do not add padding to fake that.
- The text block is **385px** wide (not 394.66) and is padded `32px 32px 0`, giving a **32px inset** on top/left/right and a **24px** bottom pad on the column wrapper.
- Title-to-description gap is **12px** (the flex `gap` on the 385x152.91 box).
- H3 measures **288.89px** wide (constrained), the paragraph **321px** wide.
- Text/image stacking order means an `<a>` wraps the entire card; the whole card is one link.

### 1.3 Span-2 card (805.33x480) — adds a testimonial slot

Identical chrome to §1.2, but the text column is still **385px** and a second block is added under it:

```
<div> TEXT COLUMN   385x480    padding:0 0 24px  flex column  justify-content:space-between
  <div>             385x152.91 padding:32px 32px 0  gap:12px          (title + desc, as §1.2)
  <div> QUOTE SLOT  328x289.77 z-index:4                              (bottom of the column)
    <div>           328x289.77 flex column gap:10px  justify-content:center  align-items:center
      <div>         253.13x188.51  position:absolute  top:59px left:40.75px right:40.25px bottom:50.77px
                    transform: matrix(0.999391, -0.0348995, 0.0348995, 0.999391, 0, 0)
                                                 /* = rotate(-2deg) — a deliberate tilt */
                    flex column  gap:10px
        <div><h6>   249.11x73.36  Inter 18px/21.6px 500 ls -0.36px  #1C1917
                    "“I no longer worry about not getting back to interested families in time”"
        <div>       248.13x45.19  flex column  gap:3px  justify-content:center  align-items:center
          <p>       247.44x25.41  Inter 14px/16.8px 500 ls -0.36px  #79716B          "Jermaine Rucker"
          <p>       247.44x25.41  Inter 14px/16.8px 500 ls -0.36px  rgba(121,113,107,0.6)
                                                                    "Owner at Little Minds Universe"
      <div>         328x289.77  position:absolute inset:0
        <img>       328x289.77  object-fit:cover   (a paper/sticky-note SVG behind the quote)
```

The tilted quote card is **rotated -2deg** (`matrix(0.999391,-0.0348995,…)` = cos/sin of 2deg).
The span-2 card's own full-bleed image layer still exists at `inset:0, z-index:1`.

### 1.4 Quote card variant (394.66x480, y=4947, "I cut 4 systems down into just 1")

Same `<a>` chrome, but `flex-direction: column` and a shorter text block (186px, not 480):

```
<a>  394.66x480   bg #FBFAF9  r12  flex-direction:column  overflow:hidden
  <div>           394.66x186  flex column justify-content:space-between
    <div>         394.66x186  padding:32px 32px 0  flex column  gap:12px
      <h3>        330.66x67.19  Inter 32px/33.6px 700 ls -0.64px #1C1917
                  "“I cut 4 systems down into just 1”"
      <p>         330.66x43.81  Inter 15px/21.9px 500 ls -0.36px #6A7074
      <div>       113.02x19     flex gap:2px justify-content:center align-items:center
        <p>       92.02x16.8    Inter 14px/16.8px 500 ls -0.36px **#25B179** "Read the story"
        <div>     19x19         (arrow icon)
  <div>           394.66x480   position:absolute inset:0 z-index:1   (image layer)
```

**New colour token: `#25B179` (rgb 37,177,121)** — the "Read the story" green. Not in pass 1's census.

### 1.5 Full-width card (1215.98x480, y=8341)

Identical to §1.2 with `overflow: clip` instead of `hidden`, text block 385x131.31,
and the image layer 1215.98x480 (`object-fit: contain`).

### 1.6 Section eyebrow (above every feature H2)

Sits in a `1216x48` flex row, `padding: 0 0 24px`, `gap: 6px`, centred:
- `Marketing` — Inter **15px/24px, 500, ls -0.45px, `#FC5F35`** (orange), box 68.27x24 at x=697.86, y=3202.63
- The eyebrow colour is **per section** (see §10.2 for the parked hover chip behind it).

---

## 2. "Built for" tiles (313.33x380)

Grid: `960x770`, `display:grid`, `grid-template-columns: 313.328px 313.328px 313.344px`, **gap 10px**,
2 rows, at x=240, y=9254.66. Section shell `1000x1064` at x=220, `padding: 40px 20px 0`,
`display:flex; flex-direction:column; gap:56px`.

Tile anatomy (measured on "Centers", y=9254.66):

```
<div>              313.33x380   (grid item wrapper, no styles)
  <a>              313.33x380   background:#FBFAF9   border-radius:12px
                                padding:40px         (CONFIRMED)
                                display:flex  flex-direction:column  gap:10px
                                justify-content:flex-start  align-items:flex-start
                                overflow:hidden  no border  no shadow
    <div><h2>      233.33x35.2  CircularXX TT Bold 32px/35.2px 700 ls -0.96px #1C1917
                                at x=280, y=9294.66   -> exactly 40px in from tile left AND top
    <div>          313.33x380   position:absolute  inset:0  z-index:1  overflow:hidden
      <div>        313.33x380   position:absolute  inset:0
        <img>      313.33x380   object-fit:cover   overflow:clip
    <div>          28x28        position:absolute  top:20px  left:265.33px  right:20px  bottom:332px
      <svg>        28x28        (arrow glyph, 26.5x26.5 inner <use>)
```

Answers to the brief's questions:
- **The image is a child, not a CSS background** — an `<img>` inside an `absolute; inset:0` layer,
  `object-fit: cover`, `z-index:1`. Note it is z-index **1**, i.e. it paints **above** the default
  stacking of the title; the title is legible only because the artwork's top-left area is empty.
- **The title sits at the TOP**, offset **40px from the tile top and 40px from the tile left** —
  its baseline box top is y=9294.66 vs tile top 9254.66. Its offset from the tile **bottom** is
  `380 - 40 - 35.2 = 304.8px`. Pass 1's implied bottom-anchoring is wrong.
- **Padding 40px: CONFIRMED** on the `<a>`.
- **Undocumented element:** a **28x28 arrow icon** pinned `top:20px; right:20px`.
- Tile gap is **10px** (not 16px). Row pitch 380 + 10 = 390.

---

## 3. Testimonial section (y=2406)

Section shell: `1440x797` at x=0, `padding: 100px 20px 0`, `flex column, gap:10px, align-items:center`.
Inner content block: **1000x499 at x=220, y=2505.63**.

### 3.1 Two-column split

| Column | Box | Notes |
|---|---|---|
| Left (picture) | `506x499` at x=220 | `padding: 0 24px 24px`, `display:flex`, `gap:10px` |
| Right (copy) | `458x498.38` at x=738 | `display:flex; flex-direction:column` |

### 3.2 The picture frame

```
<div>  450.1x455.75  at 248,2515.25   (outer frame, transparent, no radius — the frame edge is in the artwork)
  <img> 450.1x455.75                  object-fit:cover   <- the frame graphic itself
<div>  425x419.75    at 258,2535.25   position:absolute  display:flex gap:10px
  <div> 415x419.75   at 258,2535.25   position:absolute
    <img> 415x419.75                  object-fit:cover   <- the photo
```

So: the **450x456 "frame" is an image**, and the **415x420 photo** is a second absolutely-positioned
image inset **10px left / 20px top** inside it. Neither carries a CSS `border-radius` or `box-shadow` —
the rounded/framed look is baked into the artwork PNG. `NOT MEASURABLE`: the frame artwork's own
corner radius (it is raster, not CSS).

### 3.3 "Watch video" control (overlays the photo)

```
168x42  at 387.56,2722.59   position:absolute
background: rgba(255,255,255,0.5)   border-radius: 50px   padding: 0
display:flex  gap:10px
  <p> 94.28x19.2 at 437.42,2733.98  Inter 16px/19.2px 600 ls -0.16px  **#894726** "Watch video"
```
**New colour token: `#894726` (rgb 137,71,38)** — warm brown, on the translucent white pill.
The pill is a **frosted overlay** (50% white) — pass 1 listed the fill but not the label style.

### 3.4 Quote block + attribution

| Element | Box | Type |
|---|---|---|
| Quote `<p>` (active) | `458x134.38` at 738,2719.63 | Inter **28px/33.6px, 600, ls +0.56px, `#4F4741`** |
| Attribution name `<h2>` | `458x18` at 738,2878 | Inter **15px/18px, 500, ls +0.56px, `#1C1917`** |
| Attribution role `<h2>` | `458x18` at 738,2902 | Inter **15px/18px, 400, ls +0.15px, `#79716B`** |
| Name -> role gap | **6px** (2902 - 2878 - 18 = 6) | on a `flex column, gap:6px` wrapper |
| Quote -> attribution gap | **24px** (wrapper `458x284.38` has `gap:24px`) | |
| Attribution -> CTA gap | **40px** (`458x126` wrapper, `gap:40px`) | |

### 3.5 "Read customer story" button

```
<a>  204.66x44  at 738,2960   background:#E7E6E5   border-radius:8px   padding:0 20px
  <p> 158.66x19.2 at 758,2972.39  Inter 16px/19.2px 500 ls normal  #1C1917
```
(Pass 1 reported 205x44 — confirmed at 204.66x44.)

### 3.6 Carousel mechanism

- **4 slides.** All four quote/attribution pairs exist in the DOM simultaneously, stacked
  `position:absolute` at the same coordinates. The active slide is `opacity:1`; the other three are
  `opacity:0`. Measured at page load:
  - `458x101 op:0` — "We are expanding rapidly. The ease of setting up a new school…"
  - `458x101 op:0` — "We want to grow 10 to 20 locations, and we needed a partner…"
  - `495x42 op:0` — *Dr. Tamar Andrews / Temple Isaiah Preschool*
  - `495x42 op:0` — *Katherine Feliz / Owner at Kidz Haven Daycare*
  - `495x42 op:0` — *Nich / COO at The Weston School*
  (Note the inactive attribution blocks are **495** wide vs the active **458** — they are unclamped
  because they are out of flow.)
- **Advance mechanism: opacity crossfade only.** No transform, no slide, no `transition` on the
  elements (`transition: all 0s ease` — Framer drives opacity imperatively per rAF).
- **No visible indicator.** There are no dots, no numeric counter, and no arrow buttons in the
  testimonial block — measured by zone-scanning y 2450-3010 for any element with a background,
  radius or shadow: the only chrome found is the 168x42 "Watch video" pill and the 204.66x44
  "Read customer story" button.
- **NOT MEASURABLE:** whether it auto-advances and on what interval. The stage did not change during a
  ~1.7s observation window; a longer unattended observation was not run. Treat as user-driven
  (the "Read customer story"/"Watch video" controls) and add auto-advance only if visually verified.

---

## 4. Timeline section (y=10025)

### 4.1 Structure top to bottom

```
1400x825.61  at x=20, y=10204.66   flex, gap:10px          (outer)
  1024x825.61 at x=208             flex column, gap:32px   (content)
    650x153.59 at x=395            flex column, gap:0      (header)
      650x48   padding:0 0 24px, flex, gap:6px             (eyebrow row)
        <p> 329x24 at 555.5,10204.66
            Inter 15px/24px 500 ls -0.45px **#066DFE**
            "New software shouldn't take a year to implement"
      650x105.59 <h2> CircularXX TT Bold 48px/52.8px 700 ls -2.88px #1C1917
            "Here's what you can get done with Playground in just 30 days"
    1024x640.02 at x=208, y=10390.25                       (panel wrapper)
      1024x42   flex, gap:12px                             (control row)
        <button> 48x42 at x=666  bg:#FFFFFF  r:10px  border:1px solid #ECECEC  flex
          <svg> 20x20 at 680,10401.25                      (prev)
        <button> 48x42 at x=726  bg:#FFFFFF  r:10px  border:1px solid #ECECEC  flex
          <svg> 20x20 at 740,10401.25  transform: matrix(-1,0,0,1,0,0)   (next — mirrored prev)
      1024x582.02 at y=10448.25
          background: rgba(255,255,255,0.8)    <- translucent white
          border-radius: 20px
          border: 1px solid #ECECEC
          padding: 28px
          display:flex  flex-direction:column  gap:20px
        966x229.02 at x=237, y=10477.25
          display:grid  grid-template-columns: 311.328px 311.328px 311.344px  gap:16px
```

### 4.2 Timeline card anatomy — the cards are `<button>`s (tabs)

```
<button>  311.33x229.02
  background: rgba(6,109,254,0.05)   <- ACTIVE state only; inactive cards are transparent
  border-radius: 14px
  padding: 16px 18px
  display:flex  flex-direction:column  gap:10px
  border: none   box-shadow: none
  transition: background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1)

  <span>  275.33x13   Inter 13px/13px, 500, ls normal, #8A8F98        <- day label
  <span>  275.33x16   Inter 16px/16px, 500, ls normal, #1C1917        <- card title
          (card 3's title wraps to 275.34x32)
  <ul>    275.33x132.02   padding: 0 0 0 18px   display:flex  flex-direction:column  gap:8px
    <li>  257.33x23.2 (1 line) or 257.33x46.41 (2 lines)
          Inter 16px/23.2px, 400, ls normal, **#4A5565**
      <span> 5x5  position:absolute  background:#9AA0A8  border-radius:50%
             left offset -16px from the li (e.g. li at x=273, bullet at x=257)
             vertical offset +8.8px from li top
```

Cards measured:
| # | x | day label | title | list items |
|---|---|---|---|---|
| 1 | 237 | `Today` | `Get started` | "Upload your roster in five minutes" (1L), "Connect your bank account in three minutes" (2L), "Connect your program's phone in one minute" (2L) |
| 2 | 564.33 | `Day 5` | `Get comfortable` | "New leads get responses in seconds" (2L), "Set up billing plans" (1L), "Configure licensing paperwork expiration dates" (2L) |
| 3 | 891.66 | `Day 30` | `Ask why you didn't switch years ago` (2L) | "Only one app admins, teachers, and families use" (2L), "100% digital paperwork" (1L), "Forecast upcoming openings in classrooms" (2L) |

Label -> title gap: `10516.25 - 10493.25 - 13 = 10px` (the flex `gap:10px`).
Title -> list gap: `10542.25 - 10516.25 - 16 = 10px`.

### 4.3 Is there a connecting line/rail between cards?

**No.** The three cards are plain grid items with a 16px gap and nothing between them. Zone-scanning
y 10380-10480 and y 10470-10710 for any element with a background, border or height < 4px returned
only the two 48x42 arrow buttons and the panel itself. There is **no rail, no dots, no connector**.
The "30 days" progression is conveyed purely by the day labels.

### 4.4 The blue "Day one" pill — it is NOT in the cards

Below the card row, inside the same 20px-gap panel:

```
966x275  at x=237, y=10726   background: #F2F4F7   border-radius: 16px   padding: 0
  942x0  at x=249, y=10964   position:absolute   transform: matrix(1,0,0,1,0,18)
    227.9x34  at x=270, y=10964   position:absolute
              background: #066DFE        <- rgb(6,109,254)
              border-radius: 999px
              padding: 9px 16px
              transform: matrix(1,0,0,1,-6.83766,0)     (nudged 6.84px left)
              Inter 16px/16px, 400, #FFFFFF
              "Day one. Already running."
```

So: a **966x275 `#F2F4F7` r16 screenshot-preview pane** sits under the timeline cards, and the blue
pill is an annotation floating over that pane. Pass 1's `228x34 r999 padding 9px 16px` is confirmed
(227.9x34), but its **location was wrong**. New colour token: **`#F2F4F7` (rgb 242,244,247)**.

**NOT MEASURABLE:** the preview pane's contents change when a different card `<button>` is selected —
the exact per-tab artwork was not enumerated (only tab 1's active state was captured).

---

## 5. "Get to know Playground" (y=1363)

### 5.1 Section shell + heading row

```
1256x1043  at x=92, y=1362.63
  padding: 160px 20px 180px
  display:flex  flex-direction:column  gap:56px
  justify-content:center  align-items:center
  overflow:hidden

  1216x132  at x=112, y=1522.63   display:flex  gap:61px  align-items:center
    348x132   <h2>  CircularXX TT Bold 60px/66px 700 ls -3.6px #1C1917  text-align:left
              "Get to know Playground"
    501x90.81 at x=521, y=1543.22   flex column, gap:12px, justify-content:center
      501x44.81  Inter 16px/22.4px 400 ls -0.34px #79716B
                 "Replace multiple broken tools with Playground, the only child care platform designed to…"
```

**Heading/copy gap is 61px** (an odd value — it is `justify-content` driven, not a token).

### 5.2 Two-column split ratio

Body row: `1216x515` at x=112, y=1710.63.

| Column | x | width | Ratio |
|---|---|---|---|
| Left — accordion rail | 112 | **360px** | 29.6% |
| Right — media card | 521 | **807px** | 66.4% |
| Gutter | — | **49px** (521 - 112 - 360) | 4.0% |

So roughly **30 / 4 / 66**. Express as `grid-template-columns: 360px 1fr; column-gap: 49px`.

### 5.3 Left rail = a 6-row accordion

Six rows at **69px pitch** (y = 1710.63, 1779.63, 1848.63, 1917.63, 1986.63, 2055.63), each `360x69`:

```
360x69
  360x28  at y=+20    display:flex
    332x24 at x=112, y=+22   display:flex  gap:10px
      (30px icon slot: text starts at x=142, i.e. 30px in)
      302x24 <p>  Inter 18px/24px, 500, ls -0.45px, #1C1917
  360x1   progress/divider track   (see §10.4)
```

Rows: `Marketing`, `Registration`, `Finances`, `Engagement`, `Payroll`, `AI Employee`.
Row internal offsets: label box top is **+22px** from row top; the 1px rule is at the row bottom.

### 5.4 The media card — TWO nested frames, not one

Pass 1 recorded "829x451 r12". There is an outer warm frame around it:

```
845x467.48  at x=553, y=1770.63    position:absolute
            background: rgba(68,25,6,0.04)
            border-radius: 20px
            padding: 8px
            display:flex  gap:10px
  829x451.47  at x=561, y=1778.63
            border-radius: 12px
            overflow: hidden
            box-shadow: rgba(68,25,6,0.04) 0 0.97px 0.97px 0.49px,
                        rgba(68,25,6,0.04) 0 2.92px 2.92px 1.46px,
                        rgba(68,25,6,0.04) 0 5.83px 5.83px -2.92px,
                        rgba(68,25,6,0.04) 0 11.67px 11.67px -5.83px    (warm layered token #1)
    <div>   829x451.47  position:absolute  inset:0  border-radius:12px
      <img> 829x451.47  object-fit:cover   McuYywC1ABn6Sy4TPIbxuNd5hc.jpeg (4320x2520 source)
```

And the column it sits in has its own surface: `807x515` at x=521, **background `#FFFBEE`**,
`border-radius:12px`, `display:flex; flex-direction:column; gap:10px`.
**New colour token: `#FFFBEE` (rgb 255,251,238)** — warm cream card surface, not in pass 1's census.

So the stack is: **`#FFFBEE` 807x515 panel** -> **`rgba(68,25,6,0.04)` 845x467 r20 frame, 8px pad**
-> **829x451 r12 image with warm layered shadow**. Note the 845 frame is **wider than the 807 panel**
and is absolutely positioned — it deliberately overhangs to the right by 38px.

### 5.5 "Watch video tour" / "10 min" control

At y≈1124-1160, a 254.03x46 group, `position:absolute`, `transform: matrix(1,0,0,1,-127.016,-23)`
(i.e. centred by a -127/-23 translate, = half its own 254x46 box):

```
254.03x46  at x=592.98, y=1124.63
  32x32   at x=599.98, y=1131.63
          background: #CEE7FE          (rgb 206,231,254)
          border-radius: 100px
          padding: 8px
          display:flex  gap:10px
          -> holds a 20x20 play/arrow <svg> (measured 20x20 at y=1118 in the icon sheet)
  147.89x20.7  at x=638.98, y=1137.27
          <h5> Inter 18px/20.7px, 600, ls normal, **#272A2E**   "Watch video tour"
  46.14x18.41  at x=793.88, y=1138.42
          <h5> **CircularXX TT Book** 16px/18.4px, 400, ls normal, **#898D91**   "10 min"
```

Real box: **254.03x46**, icon circle **32x32 r100 `#CEE7FE` padding 8px**, circle-to-title gap
`638.98 - 599.98 - 32 = 7px`, title-to-"10 min" gap `793.88 - 638.98 - 147.89 = 7.01px`.
**New colour token: `#898D91` (rgb 137,141,145)** for the "10 min" meta.
This is the only place `CircularXX TT Book` is used on the page.

---

## 6. Savings (y=11094) and Support (y=11586)

### 6.1 Savings Club

```
1256x492  at x=92, y=11094.27   padding: 140px 20px 0
          flex column, gap:10px, justify-content:center, align-items:center, overflow:hidden
  1216x352  at x=112, y=11234.27   display:flex  gap:10px  align-items:flex-start
    COPY   603x216.41  at x=112    flex column, gap:12px, align-items:flex-start
      603x170.41  flex column, gap:20px, justify-content:center, align-items:flex-start
        603x105.59 <h2>  CircularXX TT Bold 48px/52.8px 700 ls -2.88px #1C1917
                   "Get access to the Playground Savings Club"
        501x44.81  <p>   Inter 16px/22.4px 400 ls -0.34px #79716B
                   "Playground customers get 10–40% off the supplies they already buy…"
      603x34      at y=11416.67   flex, gap:20px, align-items:center    (button/link row)
    IMAGE  603x352  at x=725      background: #FBFAF9   border-radius: 12px
                                  flex column, gap:10px, justify-content:center, align-items:center
```

**Column split: 603 / 603 with a 10px gap** — but 603 + 603 + 10 = 1216, so it is an exact 50/50.
The image box is a **`#FBFAF9` r12 surface** (pass 1 said "r9" — measured **12px**).
Note the copy column is only 216.41 tall while the image is 352 — `align-items:flex-start` means
they are **top-aligned**, not centred.

### 6.2 Support

```
1256x672  at x=92, y=11586.27   padding: 140px 20px   (symmetric)
  1216x392  at x=112, y=11726.27   display:flex  gap:10px  align-items:flex-start  overflow:hidden
    IMAGE  603x392  at x=112   flex, gap:10px, justify-content:center, align-items:center
      603x392   flex column, gap:10px, centred, overflow:hidden
        603x13  at y=12105.27   flex, gap:20px, centred      (a rating strip under the image)
          251x13 at x=288       flex, gap:6px, centred
    COPY   603x357.8  at x=725
      603x170.41  flex column, gap:20px, justify-content:center, align-items:flex-start
        603x105.59 <h2>  CircularXX TT Bold 48px/52.8px 700 ls -2.88px #1C1917
                   "Award-winning customer support from people who care"
        501x44.81  <p>   Inter 16px/22.4px 400 ls -0.34px #79716B
      603x34      at y=11908.67   flex, gap:20px, align-items:center     (button row)
      603x129.39  at y=11954.67   padding: 28px 0 0
                  display: grid   grid-template-columns: 294px 294px   gap: 15px
```

**Support is the MIRROR of Savings**: image on the LEFT, copy on the RIGHT. Same 603/10/603 split.
Pass 1's "480x369" image box is not what is rendered at 1440 — the image column is **603x392**.

### 6.3 Support feature list (the 294px x 2 grid)

6 items, 2 columns x 3 rows, `gap: 15px`, row pitch **38.8px** (11982.67 -> 12021.47 -> 12060.27):

```
each item:  flex, gap:10px, justify-content:center, align-items:center, overflow:hidden
  20x20   icon wrapper -> <svg> 20x20 -> <use> 16.67x16.67   (icon is 16.67 inside a 20 box)
  <p>     Inter 17px/23.8px, 500, ls -0.34px, #1C1917
```
Icon-to-label gap is **10px** (755 - 725 - 20).

| Row | Left (x=725) | Right (x=1034) |
|---|---|---|
| 1 | `Free data migration` (150.73x23.8) | `Friendly, human support` (189.83x23.8) |
| 2 | `Public and collaborative roadmap` (264x23.8) | `Disponible en español` (172.17x23.8) |
| 3 | `Help Center with 300+ resources` (264x23.8) | *(6th item, off the sampled range)* |

Column 2 starts at x=1034, i.e. `725 + 294 + 15 = 1034`. Confirmed.

---

## 7. Final CTA (y=12258)

### 7.1 The card

```
960x661.88  at x=240, y=12258.27
            background: #FAFAFA
            border-radius: 20px
            padding: 60px 24px 24px
            display:flex  flex-direction:column  gap:32px
            justify-content:center  align-items:flex-start
            box-shadow: rgba(0,0,0,0.02) 0px 7px 9px 0px      <- NEW, not in pass 1
```
**New shadow token: `rgba(0,0,0,0.02) 0 7px 9px 0`** — a very soft single-layer lift on the CTA card.

```
  912x577.88  at x=264, y=12318.27   flex column, gap:20px, centred
    650x105.59 at x=395  <h3>  CircularXX TT Bold 48px/52.8px 700 ls -2.88px #1C1917
                               text-align: **center**
                               "Book a demo to see why providers are switching."
    912x370.28 at y=12443.86  flex column, gap:20px, centred, overflow:clip
      650x370.28 at x=395  border-radius:20px  flex column, gap:10px
        650x370.28   flex column, gap:23px, centred, overflow:clip
          <form>  650x370.28  padding: 0 20px 20px  flex column, gap:20px
            610x350.28 at x=415  flex column, gap:40px, centred
              610x350.28  flex column, gap:20px, align-items:flex-start, z-index:2
```

### 7.2 The multi-step form — actual controls

The form is a **real `<form>`** with `superfields-*` ids (a Framer form plugin). Step 1 is visible;
steps 2+ are rendered at 0x0 until advanced. Measured control inventory:

| Step | Control | Type | Style (when rendered) | Label / copy |
|---|---|---|---|---|
| 1 | prompt `<p>` | — | Inter **18px/26.28px, 500, `#272A2E`**, `text-align:center`, box 610x26.28 at x=415, y=12455.86, wrapper padding `12px 0`, `gap:16px` | `First, tell us about yourself. What type of program do you run?` |
| 1 | progress bar track | `<div>` | 610x10 at x=415, y=12514.14, `background: rgba(187,187,187,0.15)`, `border-radius: 5px`, `overflow:hidden` | — |
| 1 | progress bar fill | `<div>` | **0x10** (0% at step 1), `background: #066DFE`, `border-radius: 5px` | — |
| 1 | tile group | `<label>` 610x250 at y=12544.14 | wraps a hidden `<input type=text>` 610x250 `opacity:0` + 3 `<button>`s | — |
| 1 | option tile x3 | `<button type=button>` | **198x250**, `background:#F4F2EC`, `border-radius:10px`, `padding:24px 0 0`, `flex column, gap:10px`, no border, no shadow | `Home-Based` (x=415), `Center` (x=621), `Multi-Location` (x=827) |
| 1 | tile label | `<span>` | 198x18 at y=12568.14, Inter **18px/18px, 600, ls normal, `#6A7074`**, full tile width (centred) | as above |
| 1 | tile image slot | `<div>` | **198x198** at y=12596.14 | tile 3's inner art renders 198x171.45 at y=12622.69, `object-fit:cover` |
| 2 | prompt `<p>` | — | Inter 18px/26.28px, 500, `#272A2E` | `Great! What's the best way we can contact you?` |
| 2 | first name | `<input type=text>` | Inter 16px/19.2px, 400, `#272A2E` | — |
| 2 | last name | `<input type=text>` | same | — |
| 2 | email | `<input type=email>` | same | — |
| 2 | country code | `<label>` + `<span>`s | `<span>` 18px/18px 400 `🇺🇸` + `<span>` Inter 16px/19.2px 400 `#272A2E` `+1` | — |
| 2 | phone | `<input type=text>` | `padding: 12px`, Inter 16px/19.2px 400 `#272A2E` | — |
| 2 | org name | `<input type=text>` | Inter 16px/19.2px 400 | — |
| 3 | number field x2 | `<input type=number>` | Inter 16px/19.2px 400 `#272A2E` | (child count / classroom count) |
| 3 | state | `<select>` | `background: #F5F4F1`, `border-radius: 8px`, `padding: 12px`, `border: 1px solid rgba(136,136,136,0.15)`, Inter **16px/16px, 400, `#6A7074`** | `Select a state...` + all 50 states |
| — | fine print `<p>` | — | Inter **12px/14.4px, 500, `#888888`** | `By requesting a demo, you agree to receive automated text messages from Playground…` |
| — | fine-print link `<span>` | — | Inter 12px/14.4px, 500, **`#066DFE`** | `privacy statement` |
| — | fine-print trailing `<span>` | — | Inter 12px/14.4px, 500, **`rgba(12,15,18,0.68)`** | `.` |
| — | submit | `<button type=submit>` | `border-radius: 8px`, `padding: 0 20px`, transparent (gradient applied by a child layer) | label `<p>` Inter **14px/16.8px, 600, `#FFFFFF`** `Submit` |
| — | honeypots | 11 x `<input type=text>` 0x0 at x=482, y=12619 + 1 `<input type=hidden>` | — | spam traps — do not render |

New tokens from the form: **`#F5F4F1`** (select fill), **`#888888`** (fine print),
**`rgba(187,187,187,0.15)`** (progress track), **`rgba(12,15,18,0.68)`**.

### 7.3 Option tile spacing

- Tile width **198px**, tiles at x = 415, 621, 827 -> **gap = 8px** (621 - 415 - 198).
- Total row **610px** = 198*3 + 8*2 = 610. Exactly the form's inner width.
- Tile is **250px tall** (pass 1 read the inner 198x198 image slot as the tile). The extra 52px =
  24px top padding + 18px label + 10px gap.
- Tiles 1 and 2 have 198x198 art; tile 3's art renders **198x171.45** (shorter source image,
  top-aligned inside the 198x198 slot at y=12622.69, i.e. 26.55px down).

### 7.4 Partner logo strip (y=12834)

```
912x62  at x=264, y=12834.14
  912x62   padding: 1px   flex column, gap:20px, align-items:center, overflow:hidden
    910x60  at x=265
      <section> 910x60  display:flex  align-items:center  overflow:hidden  **opacity: 0**
        <ul>  910x60  display:flex  **gap: 40px**  align-items:center  transform: matrix(1,0,0,1,0,0)
          <li> 103x36    at x=265, y=12847.14   cqPAWRzHHrOgT3PU0oKziAFiE.png (306x106)
          <li> 119x31    at x=408, y=12849.64   E5pkbqH4pKnyWysvvxOWruM5c.png (512x128)
          <li> 176x40    at x=567, y=12845.14   QsLg5cbYif12i5x7vnG1ot9ilzQ.png (600x136)
          <li> 103x30    at x=783, y=12850.14   FTj94Po8G1WHDrcAwRhxrsaSU0.png (512x148)
          <li> 179x54.14 at x=926, y=12838.06   rIaknKwWV2O0sGMQismW1o7xrtY.png (433x131)
```
Each `<li>` holds `div > div(absolute inset:0) > img` with `object-fit: cover`, `overflow:hidden`.
The `<section>` is at **opacity 0** at rest — it is the same marquee component as the hero ticker
(§6 of pass 1) and fades in / animates via JS. Gap **40px**, logos vertically centred at ~y=12865.

---

## 8. Footer (y=13000)

### 8.1 Outer structure

```
1216x767.31  at x=112, y=13000.14   display:flex   padding: 60px 16px 40px
  LEFT RAIL   250x136   at x=128, y=13060.14   padding: 0 40px 0 0   flex column, gap:14px
    210x41    flex column, gap:20px
      <a> 146x20   -> <use> 136.21x19.94   (the wordmark, y=13060.17)
    210x81    at y=13115.14
      179x42  flex column, gap:10px        ("Request AI summary of Playground")
      118.5x25 at y=13171.14  flex, gap:21.76px    (app-store / social row)
  LINK BLOCK  934x667.31  at x=378, y=13060.14   display:flex   gap:10px
```

### 8.2 Exact column x-positions and widths

| Col | x | width | Height | Contents |
|---|---|---|---|---|
| 1 | **378** | **239.66** | 667.31 | `Solutions` + 18 links |
| 2 | **627.66** | **239.67** | 433.06 | `Built for` + 7 links, then a second 146x272.34 stack (`About`, `Careers`, `Security`) — the column is `flex column, gap:32px` holding two 14px-gap groups |
| 3 | **877.33** | **185** | 294.25 | `Resources` + 7 links |
| 4 | **1072.33** | **239.67** | 216.81 | app/auth links — `flex column, gap:32px`, first group 239.67x92 `gap:12px` |

Column pitch: 378 -> 627.66 -> 877.33 = **249.67px** (i.e. 239.66 + 10px flex gap).
Column 4 breaks the pitch (1072.33, +195 from col 3) because col 3 is narrower (185).

### 8.3 Heading style vs link style — CORRECTED

| Role | Font | Size / LH | Weight | Letter-spacing | Color |
|---|---|---|---|---|---|
| **Column heading** (`Solutions`, `Built for`, `Resources`) | Inter | **15px / 21px** | **500** | **-0.3px** | **`#222222`** (rgb 34,34,34) |
| **Footer link** | Inter | **15px / 21.9px** | **500** | **-0.36px** | **`#79716B`** |
| **Legal row link** | Inter | **13px / 18.2px** | **400** | **-0.3px** | **`#FFFFFF`** |

Pass 1's "footer links: Inter 13px/18.2px 400 -0.3px" describes only the **legal row**, and it
missed that the legal row is white-on-illustration.

### 8.4 Gap between links

Each link sits in a `<div>` wrapper of height **21.91px**, and the column is `flex column, gap:14px`.
Measured link-box tops in column 1: 13095.14, 13131.05, 13166.95, … -> **35.9px pitch**
(= 21.91 + 14). Heading -> first link: 13095.14 - 13060.14 = **35px**.

Column 1 link order (measured y ascending): `Billing`, `Expense`, `Payroll`, `Subsidies`, `Marketing`,
`Enrollment`, `Websites`, `Paperwork`, `Branded Experience`, `Predictive Enrollment`, `AI`,
`Attendance` (y=13491.11), `Communication` (13527.02), `Food programs` (13562.92),
`Learning` (13598.83), `Reporting` (13634.73), `API`, `Integrations` (13706.55).

### 8.5 Badges and column-4 rows

- A **`#CEE7FE` r4 badge, 37.88x17, padding `2px 4px`** at x=972.86, y=13169.41 — sits inline after
  `Savings Club` in column 3 (a "New"/"Free" chip). Its row wrapper is `133.41x21.91, flex, gap:6px`.
- Column 4 rows are `<a>` **239.67x40, flex, gap:6px** containing a **40x40 `#FFFFFF` r8.58** icon tile
  + a 193.67x40 label stack (`flex column, gap:0`, label box 42.16x18 at +10px).
  Row pitch: 13060.14 -> 13112.14 = **52px** (40 + 12px gap).
  **Radius `8.58px`** is unusual — it is Framer's smoothed-corner approximation; use `8px` or
  `border-radius: 8.58px` verbatim.

### 8.6 Legal row

```
1216x200  at x=112, y=13767.45   padding: 16px   display:flex
  228.03x18.2  at x=128,    y=13933.25    "© 2026 Carline Inc. All rights reserved."
  955.97x18.2  at x=356.03, y=13933.25    display:flex  **gap: 24px**
    99.91x18.2  at x=917.63   "Terms of Service"
    198.72x18.2 at x=1041.53  "HIPAA Notice of Privacy Practices"
    (+ "Privacy", "Sitemap")
```
All legal links: Inter **13px/18.2px, 400, ls -0.3px, `#FFFFFF`**, gap **24px**.
The row is pushed to the bottom of a 200px-tall padded container (content at y=13933 vs box 13767).

### 8.7 Full-bleed illustration band

```
<div>  1584x452  at x=-146.16, y=13525.45   position:absolute   z-index:0
  <div> 1584x452  position:absolute
    <img> 1584x452  object-fit: cover
```
It **overflows the 1440 viewport by 144px on the left** (x = -146.16) and 144px on the right
(-146.16 + 1584 = 1437.84 ≈ 1440). So it is centred and **1.1x viewport width** — implement as
`width: 110vw; left: 50%; transform: translateX(-50%)` or `object-fit:cover` on a 100vw box with
the art scaled to 1584 at this viewport.
The band spans y 13525-13977, i.e. it sits **behind the legal row** (13933) — hence the white links.

---

## 9. Hero eyebrow pill (y=171)

```
<div>  614.13x28  at x=412.94, y=171          (wrapper, no styles)
  <a>  614.13x28  at x=412.94, y=171
       background: **#EEF5FF**  (rgb 238,245,255)
       border-radius: **61px**
       padding: **6px 6px 6px 12px**          <- asymmetric: 12px left, 6px elsewhere
       display:flex  gap:10px  justify-content:center  align-items:center
       overflow:hidden
       **border: none**   **box-shadow: none**
    <div> 570.13x15.59 at x=424.94, y=177.2
      <p> Inter **13px/15.6px, 500, ls normal, #183390**, text-align:center
          "Arizona, Iowa, Idaho, Kansas, New York and providers have access to Playground at no cost"
    <div> 16x16 at x=1005.06, y=177
      <div> 16x16
        <svg> 16x16  ->  <use> 13x13 at x=1006.56, y=178.5
```

Corrections to pass 1:
- It is a **filled** pill (`#EEF5FF`), **not** an outline pill. There is **no border**.
- Text colour is **`#183390`** (deep navy-blue), not the generic muted grey.
- Radius **61px** (not `999px`).
- The "circular blue arrow button at its right end" is **not a button and not blue** — it is a bare
  **16x16 `<svg>`** with a 13x13 `<use>` glyph, no background, no radius, no padding. The 6px right
  padding is what separates it from the pill edge.
- Text-to-icon gap: `1005.06 - 424.94 - 570.13 = 9.99px` = the flex `gap:10px`.

New colour tokens: **`#EEF5FF` (rgb 238,245,255)** and **`#183390` (rgb 24,51,144)**.

---

## 10. MOTION — re-measured by sampling

Method: navigate, wait 3.5-4s for hydration, scroll to top, then scroll the target into view and
sample `getComputedStyle` every 25-45ms for 1.5-7.3s, recording `opacity`, `transform` and
`getBoundingClientRect()`. Series below are the **actual recorded values**.

### 10.1 There is NO scroll reveal — three negative results

**Feature cards, section 7 (5 x 394.66x480 at y=3495):**
Pre-scroll state: all five `opacity:1, transform:none, transition:"all 0s ease"`.
36 samples from t=46ms to t=1664ms while scrolling them into view:
```
t=  46  1 I y720 | 1 I y720 | 1 I y720 | 1 I y720 | 1 I y720
t= 370  1 I y720 | 1 I y720 | 1 I y720 | 1 I y720 | 1 I y720
t= 926  1 I y720 | 1 I y720 | 1 I y720 | 1 I y720 | 1 I y720
t=1664  1 I y720 | 1 I y720 | 1 I y720 | 1 I y720 | 1 I y720
```
(`I` = `transform: none`.) **Constant. No fade, no scale, no translate, no stagger.**

**"Built for" tiles (10 x 313.33x380 at y=9255):** same — 36 samples, all `1 I y721`, unchanged.

**Section H2 "Get access to the Playground Savings Club":** pre `opacity:1, transform:none`;
22 samples t=47..1018ms, all `1 I y720`.

Conclusion: **do not implement scroll-triggered reveals.** Pass 1's recommendation of
"trigger at ~15% visibility, 400-500ms, cubic-bezier(0.22,1,0.36,1), 60-80ms stagger" would be a
visible deviation from the original.

### 10.2 The `scale(0.8) opacity:0` chips are hover layers, NOT reveals

Four elements are parked at `opacity:0; transform: matrix(0.8,0,0,0.8,0,0)`:

| y | box | Sits behind |
|---|---|---|
| 1603 | 132x27 | `Platform Overview` link |
| 9081 | 132x27 | `Platform Overview` link ("Built for" section) — measured `background: #1F5CF7`, `border-radius: 6px`, at x=738.47, y=9080.87 |
| 11420 | 124x27 | Savings Club link row |
| 11912 | 94x27 | Support link row |

Sampled the y=9081 chip for **1651ms across 40 samples** after scrolling it fully into view:
```
t=  42  0 m(0.8,0,0,0.8,0,0) w131.8
t= 414  0 m(0.8,0,0,0.8,0,0) w131.8
t= 993  0 m(0.8,0,0,0.8,0,0) w131.8
t=1651  0 m(0.8,0,0,0.8,0,0) w131.8
```
**It never resolves.** `transition` on it is `all 0s ease`. Its sibling is the visible
`Platform Overview` text (`Inter 15px/24px 500 ls -0.45px #1F5CF7`, box 124.72x24 at x=730, y=9082.47).
So this is a **blue pill background that scales up from 0.8 and fades in on hover/press** — a
`#1F5CF7` r6 chip sized 131.78x27.2 behind a 124.72x24 label. Build it as a hover state, not a reveal.

**NOT MEASURABLE:** the hover-in duration/easing for this chip. Its computed `transition` is `all 0s`,
meaning Framer animates it imperatively per-frame; the values are inside the minified bundle.
A hover on the link did not reproduce it in the harness (the link's own sampled hover showed
colour-only change). Recommend 200ms `cubic-bezier(0.22,1,0.36,1)` to match the page's other token.

### 10.3 Hero tab rail — the stage CROSSFADES (sampled)

Rail: `872x44` at x=284, `border-radius:70px`, background transparent on the outer, with a single
child `872x44, display:flex, overflow-x:auto` holding `Attendance / Billing / Communication /
Registration / Paperwork / Payroll / AI`. The **active pill** is `128x36 at x=288`,
`background:#FFFFFF`, `border-radius:70px`, `padding:0`, with the warm layered shadow.

The stage has **21 measured 964x525 layers** = 7 tabs x 3 nodes each (wrapper / inner / `<img>`).
At rest the active tab's trio is `opacity:1`, the other six are `opacity:0` with `z-index:1`.

Real click on the `Communication` tab, sampled every 25ms:
```
t=   28   slide3=1         slide6=0
t= 3305   slide3=0.998693  slide6=0.00130744     <- transition starts
t= 3333   slide3=0.964307  slide6=0.0356928
t= 3364   slide3=0.877565  slide6=0.122435
t= 3392   slide3=0.813069  slide6=0.186931
t= 3420   slide3=0.646927  slide6=0.353073
t= 3447   slide3=0.451299  slide6=0.548702
t= 3476   slide3=0.355312  slide6=0.644688
t= 3504   slide3=0.188645  slide6=0.811355
t= 3531   slide3=0.0730523 slide6=0.926948
t= 3559   slide3=0.0362304 slide6=0.96377
t= 3587   slide3=0.00140569 slide6=0.998594
t= 3615   slide3=0         slide6=1              <- done
```

Readings:
- **Duration ≈ 310ms** (3305 -> 3615).
- **Complementary crossfade**: outgoing + incoming = 1.0000 at every sample. This is a single
  progress value `t` driving `opacity_out = 1-t`, `opacity_in = t` — not two independent tweens.
- **No translate, no scale.** `transform` stayed `none` on every layer through the whole series
  (the `tfs` channel was empty for all 120 samples).
- **The rail does not move.** Sampled the rail's child transforms throughout: `none` the entire time.
  Pass 1's "the active one is selected by the rail's translate (-800px)" is wrong — the -800px
  translate is a static scroll offset of the overflow container, not a selector mechanism.
- Normalising the progress against `t/310`:
  `0.00 -> 0.001, 0.09 -> 0.036, 0.19 -> 0.122, 0.28 -> 0.187, 0.37 -> 0.353, 0.46 -> 0.549,
   0.55 -> 0.645, 0.64 -> 0.811, 0.73 -> 0.927, 0.82 -> 0.964, 0.91 -> 0.999, 1.00 -> 1.0`
  — slow start, fast middle, slow end: a symmetric **ease-in-out**. Closest standard curve:
  `cubic-bezier(0.44, 0, 0.56, 1)` (the page's own 200ms colour easing token), applied over **310ms**.
  Use `transition: opacity 310ms cubic-bezier(0.44, 0, 0.56, 1)`.

### 10.4 Accordion progress bars (Get to know Playground)

Six `360x1` divider rules at y = 1759, 1828, 1897, 1966, 2035, 2104. Measured as **pairs**:
alternating `opacity:0` / `opacity:1` at identical boxes (a track + a fill stacked). Sampled all
eight matched nodes every 120ms for **7.29 seconds**:
```
t= 121  0 I w360 | 1 I w360 | 0 I w360 | 1 I w360 | 0 I w360 | 1 I w360 | 0 I w360 | 1 I w360
t=3640  0 I w360 | 1 I w360 | 0 I w360 | 1 I w360 | 0 I w360 | 1 I w360 | 0 I w360 | 1 I w360
t=7293  0 I w360 | 1 I w360 | 0 I w360 | 1 I w360 | 0 I w360 | 1 I w360 | 0 I w360 | 1 I w360
```
**Completely static across 7.3s.** These are **not** auto-advancing progress bars; they are
static 1px rules (one visible, one hidden per row — likely an active/inactive pair swapped on click).
The accordion does **not** auto-play. `transition: all 0s ease` on all eight.

### 10.5 Hover — sampled before / during / after

**Nav link (`Resources`)** — box 70.5x17, `transition: color 0.2s cubic-bezier(0.44, 0, 0.56, 1)`:
```
before  color rgb(121, 113, 107)          #79716B
+40ms   color rgb(118, 110, 105)
+80ms   color rgb(103,  96,  91)
+120ms  color rgb( 87,  81,  77)
+160ms  color rgb( 72,  67,  63)
+200ms  color rgb( 69,  64,  61)          <- settled
after   color rgb(121, 113, 107)          (returns on mouse-out)
```
Hover target colour ≈ **`#45403D` (rgb 69,64,61)**. `background`, `transform`, `box-shadow`,
`opacity` and the box size were **unchanged at every sample**.

**Footer link (`Savings Club`)** — box 89.5x19, identical transition and identical colour series
(`121,113,107` -> `118,110,105` -> `103,96,91` -> `87,81,77` -> `72,67,63` -> `69,64,61`).
So nav and footer links share one token.

Normalised against 200ms, the green channel goes `113 -> 110 -> 96 -> 81 -> 67 -> 64` — i.e.
`0.06, 0.35, 0.65, 0.94, 1.0` at t = 0.2, 0.4, 0.6, 0.8, 1.0. That is the measured shape of
`cubic-bezier(0.44, 0, 0.56, 1)`, confirming the declared easing.

**Feature card (`Predictive Enrollment` `<a>`)** — 14 samples over 560ms:
`background`, `color`, `transform`, `box-shadow`, `opacity`, `width`, `height` **all unchanged**.
**No card hover effect.** Do not add a lift, scale, shadow or border on hover.

**Primary CTA (`Get a free demo`)** — `transition: all 0s ease`; 14 samples: no change in
`background`, `color`, `transform`, `box-shadow`, `opacity` or size. **No button hover effect.**
(Confirms pass 1.)

**Timeline card `<button>` (`Get comfortable`)** — `transition: background-color 0.5s
cubic-bezier(0.22, 1, 0.36, 1)`. 14 samples over 560ms with the cursor on it:
`background-color` stayed `rgba(0,0,0,0)`. So the 500ms transition exists but is **reserved for the
selected state**, not hover: clicking sets `rgba(6,109,254,0.05)` over **500ms
`cubic-bezier(0.22,1,0.36,1)`**. Build it as an active/selected transition.

**"Built for" tile hover: NOT MEASURABLE** — the locator detached from the DOM during the hover
sequence (Framer re-renders the tile subtree). Given every other card on the page has no hover
effect, assume none unless visually contradicted.

### 10.6 Motion summary for Build

| Element | Trigger | Property | Duration | Easing |
|---|---|---|---|---|
| Nav / footer links | hover | `color` `#79716B` -> `#45403D` | **200ms** | `cubic-bezier(0.44, 0, 0.56, 1)` |
| Hero tab stage | tab click | `opacity` crossfade (complementary) | **310ms** | `cubic-bezier(0.44, 0, 0.56, 1)` |
| Testimonial slides | control click | `opacity` crossfade | NOT MEASURABLE (not triggered) | assume as above |
| Timeline card | select | `background-color` -> `rgba(6,109,254,0.05)` | **500ms** | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Link hover chip (`#1F5CF7` r6) | hover | `opacity` 0->1 + `scale(0.8)` -> `scale(1)` | NOT MEASURABLE | recommend 200ms `cubic-bezier(0.22,1,0.36,1)` |
| Logo ticker | continuous | `translateX` | 49.7 px/s linear (pass 1) | `linear`, infinite |
| Feature cards / tiles / headings | scroll | **NONE** | — | — |
| Feature cards / buttons | hover | **NONE** | — | — |

Global facts (re-confirmed): **0 `@keyframes` rules**, **0 elements with a computed `animation-name`**.
All motion is Framer-Motion imperative rAF or the two declared CSS transition tokens.

---

## 11. Grid & spacing system

### 11.1 The real spacing scale (frequency tally, every element, 1440px)

**Padding values** (counted per-side, non-zero):
```
20px x52   32px x51   24px x35   40px x24   12px x19   16px x15   2px x14   8px x12
4px x10    1px x10    18px x9    6px x5     180px x5   28px x5    7px x4    48px x4
140px x4   41px x4    64px x2    9px x2     60px x2    56px x1    160px x1  100px x1   80px x1
```

**Gap values** (`row-gap` + `column-gap`, non-zero):
```
10px x266  12px x52   6px x40    20px x32   16px x18   8px x14    4px x14   14px x14
24px x8    40px x8    3px x8     32px x8    6.8px x6   56px x4    7px x2    61px x2
49px x2    2px x2     15px x2    23px x2    21.76px x2
```

**Margins: ZERO.** Not a single element on the page has a non-zero, non-auto margin on any side.
The entire layout is built from flex/grid `gap` + container `padding`. Build it the same way —
never reach for margins.

**The scale is 4px-based**, with a strong 8px sub-rhythm. Ranked by real usage:

| Tier | Values | Where |
|---|---|---|
| **Micro** | `2, 3, 4, 6, 8` | icon insets, badge padding (`2px 4px`), tight label stacks, attribution `gap:6px`, timeline list `gap:8px`, CTA tile `gap:8px` |
| **Core (dominant)** | **`10, 12, 16, 20, 24, 32, 40`** | `10px` is the single most common gap on the page (266 uses) — Framer's default. `12px` = title/desc gap. `16px` = all feature/timeline grid gaps. `20px` = section side padding + panel gaps. `24px` = card bottom pad, legal-row gap. `32px` = card text inset + footer column groups. `40px` = "Built for" tile padding, logo strip gap. |
| **Layout** | `48, 56, 60, 64, 80, 100, 140, 160, 180` | section vertical padding; `56px` is the section header->body gap |
| **Off-scale (do not generalise)** | `41, 49, 61, 6.8, 7, 15, 21.76, 23, 18` | one-off Framer `justify-content` artifacts and icon nudges. `49px`/`61px` are the Get-to-know column gutter and heading gap; `18px` is the timeline card horizontal padding and list indent; `15px` is the support feature grid gap. |

Recommended CSS custom properties:
```
--s-1: 4px;   --s-2: 8px;   --s-3: 12px;  --s-4: 16px;  --s-5: 20px;
--s-6: 24px;  --s-8: 32px;  --s-10: 40px; --s-12: 48px; --s-14: 56px;
--s-16: 64px; --s-20: 80px; --s-25: 100px; --s-35: 140px; --s-40: 160px; --s-45: 180px;
--gap-framer: 10px;   /* Framer's default gap — used 266x, keep it as its own token */
```

### 11.2 Radii tally

```
12px x50   50% x10    10px x9    40px x8    30px x6    20px x5    6px x4    8px x3
50px x3    70px x3    14px x3    9px x3     4px x3     999px x2   5px x2    8.58px x2
61px x1    100px x1   16px x1    "0px 0px 12px 12px" x1
```
`12px` is the universal card/image radius. `20px` = large panels (CTA card, timeline panel, GTK
outer frame). `14px` = timeline card. `10px` = CTA option tile + dropdown panel + timeline arrows.
`8px` = buttons. `61px` / `70px` / `50px` / `999px` / `100px` = pills.

### 11.3 Container system — it is FLUID, not fixed

Measured across 11 viewport widths. The "shell" is the section container (the one carrying
`padding: <vertical> 20px <vertical>`); the "inner" is the content row.

| Viewport | doc scrollWidth | Shell w @ x | Inner (grid) w @ x | Feature grid columns | Card w |
|---|---|---|---|---|---|
| **1440** | 1440 | **1256 @ 92** | **1216 @ 112** | `394.656 394.672 394.656` gap 16 | 805.3 |
| **1280** | 1280 | **1256 @ 12** | **1216 @ 32** | `394.656 394.672 394.656` gap 16 | 805.3 |
| **1200** | 1200 | **1200 @ 0** | **1160 @ 20** | `376 376 376` gap 16 | 768 |
| **1100** | 1100 | **1100 @ 0** | **1060 @ 20** | `342.656 342.672 342.656` gap 16 | 701.3 |
| **1024** | 1024 | **1024 @ 0** | **984 @ 20** | `317.328 317.328 317.344` gap 16 | 650.7 |
| **900** | 900 | **900 @ 0** | **860 @ 20** | `422 422` gap 16 **(2 col)** | 860 |
| **810** | 810 | **810 @ 0** | **770 @ 20** | `770` gap 16 **(1 col)** | 770 |
| **768** | 768 | **768 @ 0** | **728 @ 20** | `728` gap 16 (1 col) | 728 |
| **600** | 600 | **600 @ 0** | **560 @ 20** | `560` gap 16 (1 col) | 560 |
| **480** | 480 | **480 @ 0** | **440 @ 20** | `440` gap 16 (1 col) | 440 |
| **390** | 390 | **390 @ 0** | **350 @ 20** | `350` gap 16 (1 col) | 350 |

**The rule:**
```css
.section {                       /* the "shell" */
  width: 100%;
  max-width: 1256px;             /* only binds at viewport >= 1280 */
  margin-inline: auto;
  padding-inline: 20px;
}
.section > .inner {              /* the "content row" — 1256 - 2*20 */
  width: 100%;
  max-width: 1216px;
}
```
At >= 1280 the shell clamps to 1256 and centres (x=12 at 1280, x=92 at 1440).
Below 1280 the shell is **100vw** and the inner is **100vw - 40px**.
**The gutter is a constant 20px at every viewport from 390 to 1440.** There is no gutter step-down.

### 11.4 Breakpoints (derived from the measured deltas)

| Breakpoint | What changes |
|---|---|
| **>= 1280** | Shell clamps to `max-width: 1256`. Feature grid columns freeze at 394.656px. |
| **1024 – 1279** | Shell = 100vw. Feature grid stays **3 columns**, columns fluid (317 -> 394). |
| **810 – 1023** | Feature grid -> **2 columns** at ~900 (`422 422`), then **1 column** at 810. Doc height jumps 14019 (1024) -> 15537 (900) -> 21472 (810). The 1-col collapse is the big reflow. |
| **<= 809** | Feature grid = **1 column**, full inner width. H1 48px. Hero text column = `100vw - 32px` (x=16). |
| **<= 767** | H1 drops to **34px/34px, ls -2px** (measured identical at 600, 480 and 390 — so the H1 breakpoint is between 768 and 600, and `48px` holds from 768 to 810). |

Measured H1 scale: `68px/68px ls -4px` at >= 1024 (box 800x136, 2 lines);
`48px/48px ls -3px` at 768-900 (box = 100vw - 32, 2 lines);
`34px/34px ls -2px` at <= 600 (box = 100vw - 32, 2 lines).

**Note:** the H1 stays at its 800px cap down to 1024 (x = 112 at 1024, 320 at 1440) and only then
goes fluid — it is a separate 800px-max column, not the 1216 grid.

Section vertical padding by viewport (measured on the Get-to-know shell):
`160px 20px 180px` at >= 1024 -> `96px 20px 180px` at <= 810. The logo ticker shell goes
`100px 20px 0` (>= 1024) -> `72px 20px 0` (900) -> `40px 20px 0` (<= 810).

Document heights: 13967 (1440, 1280), 14034 (1200), 14012 (1100), 14019 (1024),
15537 (900), 21472 (810), 21479 (768), 20758 (600), 20887 (480), 20878 (390).
`scrollWidth === viewport` at **every** width — no page-level horizontal overflow anywhere.

---

## 12. New tokens introduced by this pass

Add these to the palette in `CLONE_SPEC.md` §1.

| Token | Value | Used by |
|---|---|---|
| `--c-pill-hero-bg` | `#EEF5FF` rgb(238,245,255) | hero eyebrow pill fill (§9) |
| `--c-pill-hero-fg` | `#183390` rgb(24,51,144) | hero eyebrow pill text (§9) |
| `--c-cream-panel` | `#FFFBEE` rgb(255,251,238) | Get-to-know media column surface (§5.4) |
| `--c-preview-pane` | `#F2F4F7` rgb(242,244,247) | timeline preview pane (§4.4) |
| `--c-green-link` | `#25B179` rgb(37,177,121) | "Read the story" on the quote card (§1.4) |
| `--c-orange-eyebrow` | `#FC5F35` rgb(252,95,53) | section eyebrow "Marketing" (§1.6) |
| `--c-brown-on-frost` | `#894726` rgb(137,71,38) | "Watch video" label on the frosted pill (§3.3) |
| `--c-meta-grey` | `#898D91` rgb(137,141,145) | "10 min" badge (§5.5) |
| `--c-fineprint` | `#888888` | CTA form fine print (§7.2) |
| `--c-select-bg` | `#F5F4F1` | CTA form `<select>` fill (§7.2) |
| `--c-heading-footer` | `#222222` | footer column headings (§8.3) |
| `--c-hover-ink` | `#45403D` rgb(69,64,61) | measured link hover target (§10.5) |
| `--c-progress-track` | `rgba(187,187,187,0.15)` | CTA form progress bar (§7.2) |
| `--c-timeline-active` | `rgba(6,109,254,0.05)` | selected timeline card (§4.2) |
| `--sh-cta-card` | `rgba(0,0,0,0.02) 0 7px 9px 0` | final CTA card (§7.1) |

---

## 13. Unmeasurable items (explicit)

1. **Testimonial auto-advance interval** — the stage did not change during the observation window
   and no timer is exposed to `getComputedStyle`. (§3.6)
2. **Timeline preview-pane artwork per tab** — only tab 1 (`Today`) was captured; switching tabs
   swaps the 966x275 pane contents, contents not enumerated. (§4.4)
3. **Hover-chip (`scale(0.8)` pill) in/out duration and easing** — computed `transition` is
   `all 0s ease`; Framer animates it imperatively. (§10.2)
4. **"Built for" tile hover** — the element detaches from the DOM mid-hover (Framer re-render),
   so before/during/after could not be sampled. (§10.5)
5. **Testimonial frame artwork corner radius** — baked into the raster PNG, not CSS. (§3.2)
6. **The 6th Support feature-list item** — fell outside the sampled y-range. (§6.3)
7. **CTA form steps 2 and 3 rendered geometry** — those controls exist in the DOM but are sized
   0x0 until the user advances; only their computed type/fill/radius could be read, not their
   laid-out boxes. (§7.2)
