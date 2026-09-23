# tryplayground.com clone — 21 nav routes built and measured against the live original at 1440/768/390. Structure derived from src/App.jsx (route table), src/pages/* (template composition) and src/data/* (content modules).

Source: tryplayground.com clone — 21 nav routes built and measured against the live original at 1440/768/390. Structure derived from src/App.jsx (route table), src/pages/* (template composition) and src/data/* (content modules).
Status: **measured-from-codebase**
23 routes · 15 templates · 30 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Collection index, Solution — shared renderer, Built-for audience page (plain)) account for 10 of 23 routes (43%). The remaining 13 routes span 12 templates.

| template | routes | share |
|---|---:|---:|
| Collection index | 4 | 17% |
| Solution — shared renderer | 3 | 13% |
| Built-for audience page (plain) | 3 | 13% |
| Built-for audience page (savings club + support band) | 2 | 9% |
| Homepage | 1 | 4% |
| Solution — flagship (billing) | 1 | 4% |
| Solution — AI (Camber) | 1 | 4% |
| Support & onboarding | 1 | 4% |
| Why Playground | 1 | 4% |
| Customer stories index | 1 | 4% |
| About | 1 | 4% |
| Careers | 1 | 4% |
| 404 | 1 | 4% |
| Built-for audience page (support band) | 1 | 4% |
| Built-for audience page (head start — tile grid + pull quote) | 1 | 4% |

## Page chrome

**23 routes carry chrome = `full`** — Homepage, Solution — flagship (billing), Solution — shared renderer, Solution — AI (Camber), Support & onboarding, Why Playground, Customer stories index, About, Careers, Collection index, 404, Built-for audience page (plain), Built-for audience page (savings club + support band), Built-for audience page (support band), Built-for audience page (head start — tile grid + pull quote).

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.header` | CHROME | 15 | 23 | `Header.jsx` | Every route, mounted once by Layout.jsx. |
| `chrome.footer` | CHROME | 15 | 23 | `Sections.jsx > Footer` | Every route, mounted once by Layout.jsx. |
| `chrome.scroll-restore` | CHROME | 15 | 23 | `Layout.jsx > ScrollToTop` | Every route, mounted once by Layout.jsx. |
| `convert.closing-cta` | CONVERT | 13 | 21 | `SolutionPage.jsx / ForPage.jsx / Sections.jsx > FinalCTA` | 21 of the 23 routes. Absent on the 404, and on /why-playground, which ends on its FAQ because its demo CTA sits high up in the two-step form instead. |
| `proof.logo-ticker` | PROOF | 11 | 16 | `Ticker.jsx` | Homepage plus every solutions, for-audience and support route; not on the collection indexes. |
| `feature.alternating-rows` | FEATURE | 11 | 16 | `PageParts.jsx > FeatureRow` | Solutions, for-audience and support templates. |
| `convert.faq` | CONVERT | 8 | 13 | `PageParts.jsx > Faq` | Solutions, for-audience and why-playground templates. |
| `hero.split` | HERO | 6 | 11 | `SolutionPage.jsx / ForPage.jsx / SolutionsBilling.jsx` | The solutions and for-audience templates, which all measured this same split shape. |
| `hero.centered` | HERO | 7 | 10 | `Support.jsx / Customers.jsx / IndexPage.jsx` | Support, customers, why-playground, about, careers, and the collection index pages. |
| `collection.article-rail` | COLLECTION | 3 | 5 | `PageParts.jsx > ArticleRail` | Every solutions template. |
| `feature.audience-tiles` | FEATURE | 4 | 4 | `Sections.jsx > BuiltFor / WhyPlayground.jsx > DemoPicker` | Homepage, /solutions/billing, /customers and /why-playground. |
| `feature.intro-band` | FEATURE | 2 | 4 | `SolutionPage.jsx` | Every solutions template. |
| `convert.sibling-links` | CONVERT | 2 | 4 | `SolutionPage.jsx` | Every solutions template. |
| `collection.card-grid` | COLLECTION | 1 | 4 | `IndexPage.jsx` | /webinars and /resources. |
| `collection.category-feed` | COLLECTION | 1 | 4 | `Blog.jsx` | /blog only. |
| `collection.release-feed` | COLLECTION | 1 | 4 | `Changelog.jsx` | /changelog only. |
| `proof.testimonial-band` | PROOF | 3 | 3 | `PageParts.jsx > TestimonialBand` | Homepage, /solutions/billing and /why-playground. |
| `feature.card-grid` | FEATURE | 3 | 3 | `PageParts.jsx > LinkCard` | /solutions/billing and /solutions/ai, the two hand-built solutions pages. |
| `feature.support-band` | FEATURE | 2 | 3 | `ForPage.jsx` | Three of the seven built-for audience pages: /for/owners, /for/directors and /for/enrollment-specialist. |
| `proof.review-wall` | PROOF | 2 | 2 | `About.jsx / Careers.jsx` | /about and /careers, which share the same review set. |
| `feature.release-list` | FEATURE | 2 | 2 | `Support.jsx / WhyPlayground.jsx` | /support and /why-playground, as an inline proof of weekly shipping. |
| `convert.savings-club` | CONVERT | 1 | 2 | `ForPage.jsx` | Two of the seven built-for audience pages: /for/owners and /for/directors. |
| `hero.home` | HERO | 1 | 1 | `Hero.jsx` | The homepage only — no other route carries the tab rail. |
| `proof.customer-stories` | PROOF | 1 | 1 | `Customers.jsx` | /customers only. |
| `feature.grid-sections` | FEATURE | 1 | 1 | `FeatureSection.jsx` | Homepage only — marketing, finances, operations and AI. |
| `feature.timeline` | FEATURE | 1 | 1 | `Sections.jsx > Timeline` | Homepage only. |
| `convert.demo-form` | CONVERT | 1 | 1 | `WhyPlayground.jsx > DemoPicker` | /why-playground only. |
| `convert.not-found` | CONVERT | 1 | 1 | `NotFound.jsx` | The catch-all route only. |
| `feature.tile-grid` | FEATURE | 1 | 1 | `ForPage.jsx` | One route: /for/head-start only. |
| `proof.pull-quote` | PROOF | 1 | 1 | `ForPage.jsx` | One route: /for/head-start only. |

**18 shared sections** appear in more than one template and belong in a component library.

**12 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.home` | page-local |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.grid-sections` | page-local |
| 6 | PROOF | `proof.testimonial-band` | shared ×3 |
| 7 | FEATURE | `feature.audience-tiles` | shared ×4 |
| 8 | FEATURE | `feature.timeline` | page-local |
| 9 | CONVERT | `convert.closing-cta` | shared ×13 |
| 10 | CHROME | `chrome.footer` | shared ×15 |

### Solution — flagship (billing) — `template.solution-flagship`

1 route · `/solutions/billing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.split` | shared ×6 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.intro-band` | shared ×2 |
| 6 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 7 | PROOF | `proof.testimonial-band` | shared ×3 |
| 8 | FEATURE | `feature.card-grid` | shared ×3 |
| 9 | CONVERT | `convert.sibling-links` | shared ×2 |
| 10 | CONVERT | `convert.faq` | shared ×8 |
| 11 | COLLECTION | `collection.article-rail` | shared ×3 |
| 12 | FEATURE | `feature.audience-tiles` | shared ×4 |
| 13 | CONVERT | `convert.closing-cta` | shared ×13 |
| 14 | CHROME | `chrome.footer` | shared ×15 |

### Solution — shared renderer — `template.solution-standard`

3 routes · `/solutions/expenses`, `/solutions/payroll`, `/solutions/subsidy` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.split` | shared ×6 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.intro-band` | shared ×2 |
| 6 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 7 | CONVERT | `convert.sibling-links` | shared ×2 |
| 8 | CONVERT | `convert.faq` | shared ×8 |
| 9 | COLLECTION | `collection.article-rail` | shared ×3 |
| 10 | CONVERT | `convert.closing-cta` | shared ×13 |
| 11 | CHROME | `chrome.footer` | shared ×15 |

### Solution — AI (Camber) — `template.solution-ai`

1 route · `/solutions/ai` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.centered` | shared ×7 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.card-grid` | shared ×3 |
| 6 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 7 | CONVERT | `convert.faq` | shared ×8 |
| 8 | COLLECTION | `collection.article-rail` | shared ×3 |
| 9 | CONVERT | `convert.closing-cta` | shared ×13 |
| 10 | CHROME | `chrome.footer` | shared ×15 |

### Support & onboarding — `template.support`

1 route · `/support` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.centered` | shared ×7 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 6 | FEATURE | `feature.release-list` | shared ×2 |
| 7 | CONVERT | `convert.closing-cta` | shared ×13 |
| 8 | CHROME | `chrome.footer` | shared ×15 |

### Why Playground — `template.why`

1 route · `/why-playground` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.centered` | shared ×7 |
| 4 | CONVERT | `convert.demo-form` | page-local |
| 5 | FEATURE | `feature.audience-tiles` | shared ×4 |
| 6 | PROOF | `proof.logo-ticker` | shared ×11 |
| 7 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 8 | PROOF | `proof.testimonial-band` | shared ×3 |
| 9 | FEATURE | `feature.release-list` | shared ×2 |
| 10 | CONVERT | `convert.faq` | shared ×8 |
| 11 | CHROME | `chrome.footer` | shared ×15 |

### Customer stories index — `template.customers`

1 route · `/customers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.centered` | shared ×7 |
| 4 | PROOF | `proof.customer-stories` | page-local |
| 5 | PROOF | `proof.logo-ticker` | shared ×11 |
| 6 | FEATURE | `feature.audience-tiles` | shared ×4 |
| 7 | CONVERT | `convert.closing-cta` | shared ×13 |
| 8 | CHROME | `chrome.footer` | shared ×15 |

### About — `template.about`

1 route · `/about` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.centered` | shared ×7 |
| 4 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 5 | PROOF | `proof.review-wall` | shared ×2 |
| 6 | CONVERT | `convert.closing-cta` | shared ×13 |
| 7 | CHROME | `chrome.footer` | shared ×15 |

### Careers — `template.careers`

1 route · `/careers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.centered` | shared ×7 |
| 4 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 5 | PROOF | `proof.review-wall` | shared ×2 |
| 6 | FEATURE | `feature.card-grid` | shared ×3 |
| 7 | CONVERT | `convert.closing-cta` | shared ×13 |
| 8 | CHROME | `chrome.footer` | shared ×15 |

### Collection index — `template.collection-index`

4 routes · `/webinars`, `/resources`, `/blog`, `/changelog` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.centered` | shared ×7 |
| 4 | COLLECTION | `collection.card-grid` | page-local |
| 5 | COLLECTION | `collection.category-feed` | page-local |
| 6 | COLLECTION | `collection.release-feed` | page-local |
| 7 | CONVERT | `convert.closing-cta` | shared ×13 |
| 8 | CHROME | `chrome.footer` | shared ×15 |

### 404 — `template.not-found`

1 route · `/*` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | CONVERT | `convert.not-found` | page-local |
| 4 | CHROME | `chrome.footer` | shared ×15 |

### Built-for audience page (plain) — `template.audience-plain`

3 routes · `/for/centers`, `/for/home-based`, `/for/multi-site` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.split` | shared ×6 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 6 | CONVERT | `convert.faq` | shared ×8 |
| 7 | CONVERT | `convert.closing-cta` | shared ×13 |
| 8 | CHROME | `chrome.footer` | shared ×15 |

### Built-for audience page (savings club + support band) — `template.audience-savings-support`

2 routes · `/for/owners`, `/for/directors` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.split` | shared ×6 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 6 | CONVERT | `convert.savings-club` | page-local |
| 7 | FEATURE | `feature.support-band` | shared ×2 |
| 8 | CONVERT | `convert.faq` | shared ×8 |
| 9 | CONVERT | `convert.closing-cta` | shared ×13 |
| 10 | CHROME | `chrome.footer` | shared ×15 |

### Built-for audience page (support band) — `template.audience-support`

1 route · `/for/enrollment-specialist` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.split` | shared ×6 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 6 | FEATURE | `feature.support-band` | shared ×2 |
| 7 | CONVERT | `convert.faq` | shared ×8 |
| 8 | CONVERT | `convert.closing-cta` | shared ×13 |
| 9 | CHROME | `chrome.footer` | shared ×15 |

### Built-for audience page (head start — tile grid + pull quote) — `template.audience-headstart`

1 route · `/for/head-start` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.header` | shared ×15 |
| 2 | CHROME | `chrome.scroll-restore` | shared ×15 |
| 3 | HERO | `hero.split` | shared ×6 |
| 4 | PROOF | `proof.logo-ticker` | shared ×11 |
| 5 | FEATURE | `feature.alternating-rows` | shared ×11 |
| 6 | FEATURE | `feature.tile-grid` | page-local |
| 7 | PROOF | `proof.pull-quote` | page-local |
| 8 | CONVERT | `convert.faq` | shared ×8 |
| 9 | CONVERT | `convert.closing-cta` | shared ×13 |
| 10 | CHROME | `chrome.footer` | shared ×15 |

## Section reference

### CHROME

_Persistent site furniture rendered once by Layout.jsx and shared by every route._

**`chrome.header`** — Sticky 78px nav bar with the announcement strip above it and the four hover mega-menus (Platform 667x381, Switch 620x370, Built for 881x271, Resources 683x320). Menu targets are the original's own measured hrefs.

· Every route, mounted once by Layout.jsx. · appears on 23 routes · implemented by `Header.jsx`

**`chrome.footer`** — Four-column link footer with the legal row beneath it.

· Every route, mounted once by Layout.jsx. · appears on 23 routes · implemented by `Sections.jsx > Footer`

**`chrome.scroll-restore`** — Resets scroll to top on navigation; a client router otherwise lands the visitor mid-page on the next route.

· Every route, mounted once by Layout.jsx. · appears on 23 routes · implemented by `Layout.jsx > ScrollToTop`

### HERO

_The above-the-fold opening block of a page: headline, subhead, primary CTA and any hero artwork._

**`hero.home`** — Homepage hero: eyebrow pill, 68px H1, subhead, demo CTA, star rating, then the seven-tab product rail whose white thumb slides on cubic-bezier(.65,0,.35,1) and auto-advances every ~4s over a 964x525 screenshot stage.

· The homepage only — no other route carries the tab rail. · appears on 1 routes · implemented by `Hero.jsx`

**`hero.split`** — Two-column inner-page hero: 68px H1, subhead and CTA on the left, a 409x547 product shot on the right, over a full-bleed illustration band.

· The solutions and for-audience templates, which all measured this same split shape. · appears on 11 routes · implemented by `SolutionPage.jsx / ForPage.jsx / SolutionsBilling.jsx`

**`hero.centered`** — Centered hero: H1 and subhead on the cream field with no product shot, optionally over an illustration band or a row of photos.

· Support, customers, why-playground, about, careers, and the collection index pages. · appears on 10 routes · implemented by `Support.jsx / Customers.jsx / IndexPage.jsx`

### PROOF

_Social-proof blocks — customer logos, testimonials, named quotes and review walls._

**`proof.logo-ticker`** — Infinite partner-logo marquee running at a measured 49.7px/s, carrying the five real customer logos.

· Homepage plus every solutions, for-audience and support route; not on the collection indexes. · appears on 16 routes · implemented by `Ticker.jsx`

**`proof.testimonial-band`** — Named-customer quote beside a hand-drawn portrait inset in the 450x456 orange frame, with dot navigation between customers.

· Homepage, /solutions/billing and /why-playground. · appears on 3 routes · implemented by `PageParts.jsx > TestimonialBand`

**`proof.review-wall`** — Grid of short unattributed platform reviews, with a Directors/Families tab pair on /about.

· /about and /careers, which share the same review set. · appears on 2 routes · implemented by `About.jsx / Careers.jsx`

**`proof.customer-stories`** — Featured customer stories — portrait, quote and a stat block — followed by the shorter 'Wall of love' quote grid.

· /customers only. · appears on 1 routes · implemented by `Customers.jsx`

**`proof.pull-quote`** — 32px centred pull-quote with attribution (name + role) beneath, no card chrome.

· One route: /for/head-start only. · appears on 1 routes · implemented by `ForPage.jsx`

### FEATURE

_Product-explanation blocks: alternating copy/media rows, capability cards and check-lists._

**`feature.intro-band`** — Centered band that opens a product page: 60px H2, a 17px sub-headline the original marks up as a second h2, and a row of capability labels.

· Every solutions template. · appears on 4 routes · implemented by `SolutionPage.jsx`

**`feature.alternating-rows`** — Alternating copy/media rows — eyebrow, 48px H2, sub-headline, check-list and an optional pull quote, with the media column flipping side to side.

· Solutions, for-audience and support templates. · appears on 16 routes · implemented by `PageParts.jsx > FeatureRow`

**`feature.card-grid`** — Grids of bordered 277x119 link cards, optionally over a row of product screenshots.

· /solutions/billing and /solutions/ai, the two hand-built solutions pages. · appears on 3 routes · implemented by `PageParts.jsx > LinkCard`

**`feature.grid-sections`** — Homepage product sections: centered eyebrow and H2 over a mixed-span card grid whose cards carry full-bleed artwork.

· Homepage only — marketing, finances, operations and AI. · appears on 1 routes · implemented by `FeatureSection.jsx`

**`feature.timeline`** — Click-activated 30-day timeline: three day cards over a 966x275 growth-curve panel, with a dot and pill that slide along the curve on 500ms cubic-bezier(.22,1,.36,1).

· Homepage only. · appears on 1 routes · implemented by `Sections.jsx > Timeline`

**`feature.audience-tiles`** — Home-Based / Center / Multi-Location tiles, used both as a static row and as the selectable first step of the demo form.

· Homepage, /solutions/billing, /customers and /why-playground. · appears on 4 routes · implemented by `Sections.jsx > BuiltFor / WhyPlayground.jsx > DemoPicker`

**`feature.release-list`** — Compact version/title/date rows standing in for the changelog feed.

· /support and /why-playground, as an inline proof of weekly shipping. · appears on 2 routes · implemented by `Support.jsx / WhyPlayground.jsx`

**`feature.support-band`** — Three-card band (315x540 cards, r12 on #FBFAF9) promoting support/release resources, sharing a CTA baseline.

· Three of the seven built-for audience pages: /for/owners, /for/directors and /for/enrollment-specialist. · appears on 3 routes · implemented by `ForPage.jsx`

**`feature.tile-grid`** — 2x2 tile grid under a 48px heading, tiles at 18px/w500 with a 245px row pitch — a compact features-list variant distinct from the alternating feature rows.

· One route: /for/head-start only. · appears on 1 routes · implemented by `ForPage.jsx`

### COLLECTION

_Repeating card grids and rails driven by a list in src/data — blog, webinars, resources, changelog, article rails._

**`collection.card-grid`** — Grid of cover-plus-title cards driven by a list in src/data, with card geometry measured per page (343x205 landscape for webinars, 181x271 portrait for resources).

· /webinars and /resources. · appears on 4 routes · implemented by `IndexPage.jsx`

**`collection.category-feed`** — Posts grouped under category headings with a 'See all' link per group; capped at 8 posts per category and states the cap on the page.

· /blog only. · appears on 4 routes · implemented by `Blog.jsx`

**`collection.release-feed`** — Dated release entries with a 590x455 screenshot each; capped at the 24 most recent of 204 and states the cap.

· /changelog only. · appears on 4 routes · implemented by `Changelog.jsx`

**`collection.article-rail`** — Horizontally scrolling rail of 309x300 article cards. Its trailing cards sit ~3000px off-screen, so they only load once the rail itself is scrolled.

· Every solutions template. · appears on 5 routes · implemented by `PageParts.jsx > ArticleRail`

### CONVERT

_Blocks whose job is to move the visitor toward a demo: FAQ accordions, sibling-product links and closing CTA bands._

**`convert.faq`** — Question accordion. Rows toggle independently rather than single-open; whether row 1 ships open is measured per page and passed as openFirst.

· Solutions, for-audience and why-playground templates. · appears on 13 routes · implemented by `PageParts.jsx > Faq`

**`convert.sibling-links`** — Cards linking to the other products in the same family, with the current page dropped from the list.

· Every solutions template. · appears on 4 routes · implemented by `SolutionPage.jsx`

**`convert.closing-cta`** — Closing demo band: a 48px H3 and a primary CTA, sometimes over a full-bleed illustration.

· 21 of the 23 routes. Absent on the 404, and on /why-playground, which ends on its FAQ because its demo CTA sits high up in the two-step form instead. · appears on 21 routes · implemented by `SolutionPage.jsx / ForPage.jsx / Sections.jsx > FinalCTA`

**`convert.demo-form`** — Two-step lead form: picking a program-type tile reveals a contact step, which on the original grows the page's text from 4,403 to 5,015 characters.

· /why-playground only. · appears on 1 routes · implemented by `WhyPlayground.jsx > DemoPicker`

**`convert.not-found`** — 404 body: heading, explanation that the page may not be built in this clone, and a link home.

· The catch-all route only. · appears on 1 routes · implemented by `NotFound.jsx`

**`convert.savings-club`** — Image + copy + link band offering the Playground Savings Club discount programme. Top-aligned two-column layout, 603x352 image at x=112.

· Two of the seven built-for audience pages: /for/owners and /for/directors. · appears on 2 routes · implemented by `ForPage.jsx`
