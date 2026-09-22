Source: https://www.tryplayground.com/

# Asset Manifest — tryplayground.com

Measured from `performance.getEntriesByType('resource')`, every `<img>` (incl. `srcset`), `<video>`,
`<svg>`, and every CSS `background-image` at 1440×900 after a full-page lazy-load scroll.

**Totals:** 229 resource entries · **86 `<img>` nodes → 44 unique images** · **0 `<video>` elements** ·
40 inline `<svg>` nodes · 6 CSS background-images (all inline `data:image/svg+xml`) ·
**8 real font files**.

Request hosts: `framerusercontent.com` (134), `www.youtube.com` (38), `www.google.com` (11),
`api.vector.co` (8), `googleads.g.doubleclick.net` (7), `fonts.gstatic.com` (6),
`app.framerstatic.com` (6), `www.googletagmanager.com` (5), `bat.bing.com` (5), `analytics.google.com` (4).

Classification legend:
**(a)** safe to download/use locally · **(b)** brand mark → replace with placeholder at identical size ·
**(c)** brand photography/illustration → replace with placeholder at identical size ·
**(d)** icon.

---

## (a) Safe to download and use locally

### Fonts actually loaded
| File | Family | License | Action |
|---|---|---|---|
| `framerusercontent.com/assets/d3tHnaQIAeqiE5hGcRw4mmgWYU.woff2` | Inter subset | **SIL OFL 1.1** | Safe — self-host Inter from Google Fonts / rsms.me instead of hotlinking |
| `framerusercontent.com/assets/ksvR4VsLksjpSwnC2fPgHRNMw.woff2` | Inter subset | SIL OFL 1.1 | Safe |
| `framerusercontent.com/assets/1ZFS7N918ojhhd0nQWdj3jz4w.woff2` | Inter subset | SIL OFL 1.1 | Safe |
| `framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2` | Inter subset | SIL OFL 1.1 | Safe |
| `framerusercontent.com/assets/MKvefGr4cOY8imXQ9vCpY4vHuUY.woff2` | **CircularXX TT** subset | **Commercial (Lineto)** | **DO NOT copy** — substitute (see below) |
| `framerusercontent.com/assets/DXD0Q7LSl7HEvDzucnyLnGBHM.woff2` | CircularXX TT subset | Commercial | DO NOT copy |
| `framerusercontent.com/assets/GNc9P40b4381nIzOrde5Q7Ti3U.woff2` | CircularXX TT subset | Commercial | DO NOT copy |
| `framerusercontent.com/assets/Mbh5hf6G9D4fngqt5Wh5xtK7Zk.woff2` | CircularXX TT subset | Commercial | DO NOT copy |
| `fonts.gstatic.com/s/roboto/v48/KFO7Cnq…woff2` ×2 | Roboto | Apache 2.0 | Loaded by the embedded YouTube player, **not used by page text** — skip |

**CircularXX TT substitution:** all display headings (68/60/48/32px, weight 700, tracking −0.06em) use
CircularXX TT Bold. It is a paid Lineto face. Replace with a geometric grotesque and keep the em-relative
tracking from CLONE_SPEC §2 so line counts hold. Best open matches: **Inter Display**, **Manrope**,
**Poppins**. Two more CircularXX cuts appear on exactly one element each — CircularXX TT Medium
(announcement bar, 13px) and CircularXX TT Book ("10 min" badge, 16px).

**Declared but never rendered — do not fetch:** `Fragment Mono`, `Geist Mono`, `Permanent Marker`,
`Inter Variable`, `Inter Display`, `CircularXX TT Black`, `CircularXX TT Black Italic`,
`CircularXX TT Bold Italic`, `CircularXX TT Regular`, `CircularXX TT Italic`, and every
`* Placeholder` variant (Framer FOUT shims). 23 families are declared; only 4 CircularXX/Inter cuts render.

### Structural / decorative
| Asset | Notes |
|---|---|
| 6 × CSS `background-image` | All inline `data:image/svg+xml` chevrons — 16×16 (nav dropdown carets, y=68), 16×18 (y=2735), 19×19 (y=5114). Safe: regenerate as your own SVG. |
| 40 × inline `<svg>` | Arrow glyphs, star ratings, tab icons, chevrons. Safe: substitute any icon set. |

---

## (b) Brand marks — replace with placeholders at identical dimensions

| Asset | Natural | Displayed | Position | Notes |
|---|---|---|---|---|
| Playground wordmark + slide logo | — (inline SVG) | ~**136×28** | Nav, x=216 y≈62 | Rendered as inline SVG, not a bitmap. Replace with your own wordmark at the same box. |
| Favicon | — | — | `<head>` | Replace. |
| `rIaknKwWV2O0sGMQismW1o7xrtY.png` | 433×131 | **179×54** | Logo ticker y=1305 **and** y=12838; 9 instances | Customer logo: *The Weston School Early Childhood Education* |
| `QsLg5cbYif12i5x7vnG1ot9ilzQ.png` | 176×39 | **176×40** | y=1312 / y=12845; 9× | *Child Development Consortium of Los Angeles* |
| `cqPAWRzHHrOgT3PU0oKziAFiE.png` | 306×106 | **103×36** | y=1314 / y=12847; 9× | *Gan Sinai Early Learning Center of Temple Sinai* |
| `E5pkbqH4pKnyWysvvxOWruM5c.png` | 512×128 | **119×31** | y=1316 / y=12850; 9× | *Yakima Valley Memorial* |
| `FTj94Po8G1WHDrcAwRhxrsaSU0.png` | 512×148 | **103×30** | y=1317 / y=12850; 9× | *St. John Lutheran Church* |

All logo-ticker marks are `object-fit: cover`, `border-radius: 0`. The strip duplicates the 5 marks ~9×
each to make the 49.7px/s marquee loop seamlessly.

---

## (c) Brand photography / illustration — replace with placeholders at identical dimensions

All are `framerusercontent.com` assets. **Base URL pattern:**
`https://framerusercontent.com/images/<hash>.<ext>?width=<w>&height=<h>` (Framer serves responsive
`srcset` variants; the natural size below is the intrinsic size of the variant actually chosen at 1440).

### Hero product screenshots — 7-tab stage (all `object-fit: cover`, `border-radius: 12px`, y=664)
| File | Natural | Displayed | Tab |
|---|---|---|---|
| `eQlFJ9HZ2I9BHiMteW1TRQQxY.webp` | 963×685 | **964×525** | Attendance — "Playground forecast enrollment view with infants, toddlers, juniors, pre-juniors classrooms" |
| `S8LQwwo6rBItVAlkd1LApKxadA.webp` | 963×706 | **964×525** | Billing — "billing overview with revenue chart, aging balance, alerts" |
| `4mXDMMJ1C9C1p93yrjnC8Vv9mg.webp` | 963×685 | **964×525** | Communication ("Feed") |
| `8g0Xz6o9hPDkEpEHsfjsMqo585Y.webp` | 963×685 | **964×525** | Paperwork |
| `wshatjPlvJVPF2O9fEoUsLZC8k.webp` | 963×685 | **964×525** | Payroll |
| `xkVyBU47fHRkoXDh8oO0MlWgg.webp` | 963×685 | **964×525** | Registration |
| `y5I64nI2tgbmWIhLoW2j3c4fidU.png` | 963×685 | **964×525** | AI |

### Feature screenshots (`object-fit: contain`, radius 0)
| File | Natural | Displayed | y | Alt |
|---|---|---|---|---|
| `fKIVbUT2CcJzPlvhnuGuybdM.webp` | 394×613 | **395×480** | 3495 | Enrollment card showing Adrian Moore enrolled |
| `7fWG5INeBOY7u9L49XqSjPckjuY.webp` | 394×613 | **395×480** | 3991 | Mobile preview of The Robin Nest enrollment |
| `yWNVSlTNJWz6gZYYBGf9R5U4wlk.webp` | 394×613 | **395×480** | 5443 | New subsidy agency dialog with CACFP |
| `n2a934XATVCHhMJyFSeumILDjNw.webp` | 394×613 | **395×480** | 5443 | Payroll list showing employees/contractors |
| `dtuf2oZPka6PTC9bX5BvJaSQ6A.webp` | 394×613 | **395×480** | 6892 | Lesson categories list with stack of books |
| `4TqnlNTABzBE7SkLaguG6izeLls.webp` | 394×613 | **395×480** | 6892 | Meal schedule card (breakfast, lunch…) |
| `uxJ9Vb2nBk3BOu87dYeBhoKhJc.webp` | 394×613 | **395×480** | 7845 | Camber AI answering mixed-age question |
| `OcTdWI6RKF7xkug0xVpA0ddtIgI.webp` | 805×609 | **805×480** | 7845 | Camber AI call workflow with transcript |
| `iDfTfxKeJSHn8h1ogfHfliE7Go.webp` | 1216×608 | **1216×480** | 8341 | AI-generated lead funnel chart |
| `McuYywC1ABn6Sy4TPIbxuNd5hc.jpeg` | 829×483 | **829×451** | 1779 | "Automations" — radius **12px**, `cover` |
| `A6EZ5hUfCpxJw8qriloB5irBqc.webp` | 603×512 | **603×352** | 11234 | "Pay your staff" — radius **9px**, `cover` |

### Illustrations (hand-drawn brand style, all `object-fit: cover`, radius 0)
| File | Natural | Displayed | y | Alt |
|---|---|---|---|---|
| `wy3uuIj5u4LlJJh2VTGrGvsY3Q.webp` | 487×74 | **200×37** | 0 | Blue/orange wildflowers — announcement bar, left (x=216) |
| `sR1N0WFcjoSWa8WiSExbZCFRvc.webp` | 227×30 | **210×37** | 0 | Blue forget-me-nots — announcement bar, right (x=1014) |
| `xGtSgBNbiuapehB7kPtQS86GrCY.webp` | 471×478 | **471×480** | 681 | Child reading next to a bookshelf — hero left |
| `AibnIx7loBXJleb47Ocbg8qpy8.webp` | 470×462 | **471×462** | 690 | Child reading next to a bookshelf — hero right |
| `nue2i7o2sxoI5GXXx889BETVhnM.webp` | 662×669 | **450×456** | 2515 | Orange wooden picture frame (testimonial) |
| `v97uOPs7pvLY1uTrWshDYTdUgo.webp` | 449×464 | **415×420** | 2535 | Hand-drawn portrait of Little Minds owner Jermaine |
| `9lvti4q8JOii6CU4G3OT5pG8A3A.webp` | 313×438 | **313×380** | 9255 | Large red brick school building |
| `cw21lZ7u1ks36LLfKwOq4po6Uio.webp` | 313×412 | **313×380** | 9255 | (no alt) |
| `tBxphUqVTMCyoSIJWhjvneMeeo.webp` | 313×250 | **313×380** | 9255 | Two child care apartment buildings |
| `AGJ4uNSSxk8mrFgWReC3opSns.webp` | 313×367 | **313×380** | 9645 | Child care center with a yard |
| `ECQB4L5SC0IGUugaRhcGCZC8RmA.jpg` | 313×419 | **313×380** | 9645 | Wooden playhouse with red roof |
| `pPo7auHtivG6OjYt1uBitVEgps.webp` | 313×382 | **313×380** | 9645 | Wooden playhouse with red roof |
| `6FmfuHdAINowokIvglRd3jQkkAo.webp` | 479×368 | **480×369** | 11726 | Father and daughter building together |
| `gOkLwb1Dh5AjSDRi8K54mSRf8A.webp` | 2163×626 | **2111×658** | 12296 | Child care classroom — final CTA backdrop (**overflows viewport by design**) |
| `HEnGq0dbBcgJOqhE5fxATYTymhs.webp` | 1585×184 | **1584×452** | 13525 | Playground house with slide — footer full-bleed band |

### Final-CTA option tiles (`object-fit: cover`)
| File | Natural | Displayed | y | Label |
|---|---|---|---|---|
| `HugA0yvcGMsV0FTsxg5phDahg.webp` | 1440×1440 | **198×198** | 12596 | Center |
| `0kpkGLsFWlTZ3aoeMnKfdyPg.webp` | **4292×4292** | **198×198** | 12596 | Home-Based (heavily oversized source) |
| `2GRUsS42fqlpqT2x6fNfTQ6Inc.webp` | 1662×1440 | **198×171** | 12623 | Multi-Location |

---

## (d) Icons

| Asset | Natural | Displayed | Count | Where |
|---|---|---|---|---|
| `nmIJYGYREipMEYZv7prJfXtaE.svg` | 326×288 | **328×290** | 2 | y=3662, y=4158 — cream note paper pinned with a clip |
| `Js8wRvV1hhWLO7Fd0bBlU3ML0.svg` | 326×287 | **328×289** | 1 | y=5114 — cream note paper variant |
| `VilhoqmMljNsbWch0LkGeh5Ulcg.svg` | 326×287 | **328×289** | 1 | y=6563 — cream note paper variant |
| Inline `<svg>` ×40 | — | 16–24px typical | 40 | Tab-rail icons (Attendance/Billing/Communication/Registration/Paperwork/Payroll/AI), nav chevrons, arrow circles, 5-star rating row, footer app-store badges |
| `data:image/svg+xml` backgrounds ×6 | — | 16×16, 16×18, 19×19 | 6 | Nav dropdown carets (y=68 ×4), y=2735, y=5114 |

These are generic UI glyphs — substitute freely from an open icon set (Lucide, Heroicons, Phosphor) at the
same box sizes.

---

## Not assets (tracking / third-party — do not reproduce)

`bat.bing.com/action/0?...` (2 zero-size tracking pixels rendered as `<img>`), Google Tag Manager
(`GTM-NP5CRKV`), `analytics.google.com`, `googleads.g.doubleclick.net`, `api.vector.co`,
`app.framerstatic.com` (Framer runtime). The 38 `www.youtube.com` requests come from an embedded video
player behind the "Watch video tour" / "10 min" control in section 5 — **there is no `<video>` element on
the page**; the embed is lazy-mounted on click.
