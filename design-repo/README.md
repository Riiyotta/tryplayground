# tryplayground clone — design-repo

A curated, versioned, machine-validated design system extracted from the
`tryplayground` clone (a marketing-site reconstruction of the real, live
company Playground, tryplayground.com — see the compliance note below). This
lets an LLM generate new on-brand pages against real measured tokens and
section contracts instead of inventing colors, copy, or structure.

## Real counts (recomputed from disk, not carried over from a draft)

- **23 routes**, **15 templates**, **30 sections**, **9 primitives**, **7 components**.
- Every count above is independently recomputed by `extraction/verify_all.py`'s
  `MANIFEST_COUNTS_RECOMPUTE` check against `templates/templates.json` and the
  real files in `sections/`, and compared against `registry.manifest.json`'s
  `counts` block — not hand-typed and trusted.

## Compliance: this is a real company's site

Playground is a real, live business. This clone's own `NOTICE.md` (project
root, one level up) already documents that `public/assets/` — including five
named customer organizations' logos and photographs of identifiable children,
teachers and named individuals — is gitignored and never committed, for
exactly this reason. `assets/asset-roles.json` in this design-repo carries the
same posture into every generated page: `customer-logo`, `customer-photo` and
`product-screenshot` roles are all `must-not-fabricate` — no generator using
this design-repo may produce a logo, photo, or product screenshot that could
be mistaken for a real Playground asset.

## Layout

```
design-repo/
  registry.manifest.json     status, counts, allowlist version, approval flags
  tokens/{00-foundation,10-semantic,20-component,30-layout,themes,llm}/
  assets/asset-roles.json    closed asset-role enum + AI-generation/licensing guidance
  primitives/ · components/ · sections/
  templates/templates.json   one entry per real page shape, mapped 1:1 to all 23 routes
  compatibility/graph.json   rhythm rules, each with severity: error|warn, named exceptions
  schema/{pagespec.schema.json, example.pagespec.json, semantic_validate.py, tests/}
  extraction/{measured-values.json, verify_all.py}
```

## Provenance

Built primarily from real groundwork already present in the project root:
`ia.json`/`IA.md`/`matrix.csv` (23 routes × 15 templates × 30 sections, each
with a real `implementedBy` component reference), `tailwind.config.js` (every
foundation token value, each with the original author's own measured
usage-count comment), and `src/data/*.js` / `src/pages/*.jsx` / `src/components/*.jsx`
(real copy and real motion implementations, e.g. `useParallax.js`,
`Ticker.jsx`, `RiveArt.jsx`). Full citation trail in
`extraction/measured-values.json`.

No dark theme exists — confirmed by a repo-wide grep for a `dark:` Tailwind
variant and for any theme-toggle component, both absent from `src/`.
`tokens/themes/light.json` is the only theme instance.

## Verification

Run all four mandatory checks:

```bash
python3 -c "
import json
from jsonschema import Draft7Validator
schema = json.load(open('schema/pagespec.schema.json'))
instance = json.load(open('schema/example.pagespec.json'))
errors = list(Draft7Validator(schema).iter_errors(instance))
print(f'{len(errors)} schema errors')
"
python3 schema/tests/adversarial_test.py
python3 extraction/verify_all.py
```

See `CHANGELOG.md` for the self-containment and zip-cleanliness verification
results from the build session.
