# Information architecture

`ia.json` is the **only file here you hand-edit**. `IA.md` and `matrix.csv` are
generated from it and will be overwritten — don't edit those.

```bash
node validate.mjs   # checks the invariants; fix any hard failure before building
node build.mjs      # regenerates IA.md + matrix.csv
```

Every section is described exactly once, in `ia.json`'s `sections` block;
templates only reference sections by id. That's what makes the document
checkable — a section can only drift if it's described twice.

## What the data shows

**The built-for audience pages are not one template — they're four.** The
original ia.json treated all 7 `/for/*` routes as a single template with a
fixed section list. Rebuilding the clone's head-start page (real 7-row +
tile-grid + pull-quote shape, not a spacing tweak) and adding the savings-club
and support bands to owners/directors/enrollment-specialist made that
inaccurate: 3 routes are the plain hero→rows→FAQ→CTA shape, 2 add a savings-club
band and a 3-card support band, 1 adds only the support band, and head-start
alone carries a 2×2 tile grid and a pull-quote that no other route has. Split
into `template.audience-plain`, `-savings-support`, `-support` and `-headstart`
so the section list per template is actually what that route renders.

**Three templates still carry 43% of the routes.** Collection index (4),
the shared solutions renderer (3) and the plain audience page (3) cover 10 of
23 routes. The other 13 routes now span 12 templates — audience pages split
three further ways, plus the 9 fully bespoke ones (homepage, both hand-built
solutions pages, why-playground, customers, about, careers, support, 404).

**18 sections are shared, 12 are page-local.** The 4 new sections
(`convert.savings-club`, `feature.support-band`, `feature.tile-grid`,
`proof.pull-quote`) are all single-use today — support-band is shared across
2 of the 4 new audience variants, the other 3 have exactly one caller. Keep
them page-local in `ForPage.jsx` until a second caller shows up; don't
pre-extract components for a reuse count of 1.

**30 sections now name the component that renders them** via `implementedBy`.
`FEATURE` is still the largest category (9 sections after this pass), which
tracks — most of the site's distinct blocks exist to explain the product.

## One thing not to "fix"

`validate.mjs` reports an informational note on `convert.closing-cta`: its scope
prose contains the numbers 23 and 404, and the computed route count is 21. Both
are correct. 21 of the 23 routes carry the closing CTA; the two that don't are
the 404 and `/why-playground`, which ends on its FAQ because its demo CTA sits
high up in the two-step form. The validator is matching incidental digits in the
sentence, not a real mismatch — don't edit the prose to make the note go away.
