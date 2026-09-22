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

**Three templates carry 61% of the routes.** The built-for audience pages (7),
the collection indexes (4) and the shared solutions renderer (3) cover 14 of 23
routes between them. The other 9 routes each have their own template, so that's
where the per-page build effort actually sits — the homepage, the two hand-built
solutions pages, why-playground, customers, about, careers and the 404.

**17 sections are shared, 9 are page-local.** The shared set is already real
shared code — `PageParts.jsx` and `Primitives.jsx` back most of it. The 9
page-local ones (the homepage hero, timeline and grid sections; the two-step
demo form; the three collection feeds; the customer-story band; the 404 body)
have exactly one caller each and should stay local until a second one appears.

**All 26 sections name the component that renders them** via `implementedBy`, so
this is a map of the code rather than a plan for it. `FEATURE` is the largest
category at 7 sections, which matches a product marketing site — most of the
distinct blocks exist to explain the product.

## One thing not to "fix"

`validate.mjs` reports an informational note on `convert.closing-cta`: its scope
prose contains the numbers 23 and 404, and the computed route count is 21. Both
are correct. 21 of the 23 routes carry the closing CTA; the two that don't are
the 404 and `/why-playground`, which ends on its FAQ because its demo CTA sits
high up in the two-step form. The validator is matching incidental digits in the
sentence, not a real mismatch — don't edit the prose to make the note go away.
