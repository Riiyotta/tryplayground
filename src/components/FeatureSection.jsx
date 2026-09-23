import { Reveal, Placeholder, Img } from './Primitives'
import RiveArt from './RiveArt'

/* Shared layout for sections 7-10 ("marketing", "finances", "operations",
   "AI"). Measured: container 1216px, feature grid 3 x 394.66px with a 16px
   gap, collapsing to a single column at <=768 (which is why these sections
   roughly triple in height on mobile).
   Section padding: 180px desktop -> 96px at <=768. */
/* The eyebrow is colour-coded per section on the original, not one brand
   orange. Pixel-sampled on the homepage: Marketing rgb(252,95,53),
   Finances rgb(30,189,102), Operations rgb(48,121,255), AI rgb(142,64,204).
   The /solutions pages carry the same coding - billing/payroll/expenses/
   subsidy eyebrows are green rgb(9,168,81), /solutions/ai is the same
   purple. Falls back to the orange token for anything unlisted. */
const EYEBROW_TONE = {
  Marketing: '#FC5F35',
  Finances: '#1EBD66',
  Operations: '#3079FF',
  AI: '#8E40CC',
  Billing: '#09A851',
  Payroll: '#09A851',
  Expenses: '#09A851',
  Subsidy: '#09A851',
}

export default function FeatureSection({
  id, heading, intro, lead, features, mediaH = 480, tone = 'grey', headingSize = 'h2',
  band = false, headingW = 760, padTop = 180, eyebrow = '', padBottom = 0, introW = 501,
  cardH = [683, 661],
}) {
  /* Section pt measured per section at 1440: 0 for marketing, 180 for the
     rest. Collapses to 96px at <=768 per CLONE_SPEC s10. */
  const eyebrowTone = EYEBROW_TONE[eyebrow || id] || undefined

  return (
    <section id={id}
             className={`px-5 pt-24 md:pt-24 ${padTop === 0 ? 'xl:pt-0' : 'xl:pt-[180px]'}
                         ${padBottom ? 'xl:pb-[140px]' : ''}`}>
      <div className="mx-auto max-w-content">
        {/* Eyebrow row measured 1216x48 (gap 6px) directly above the H2.
            The header block is centered on the original — icon + label in the
            brand orange, then a centered H2 and subhead. */}
        <Reveal>
          <div className="flex h-[48px] items-center justify-center gap-[6px]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                 aria-hidden="true" className="shrink-0 text-eyebrow"
                 style={eyebrowTone ? { color: eyebrowTone } : undefined}>
              <path d="M3 11v2a1 1 0 0 0 1 1h2l4 3V7L6 10H4a1 1 0 0 0-1 1Z" />
              <path d="M15 9a3.5 3.5 0 0 1 0 6" />
            </svg>
            <span className="text-caption font-medium text-eyebrow"
                  style={eyebrowTone ? { color: eyebrowTone } : undefined}>
              {eyebrow || id}
            </span>
          </div>
        </Reveal>
        <Reveal>
          <h2 style={{ maxWidth: headingW }} className={`mx-auto text-center font-display font-bold text-ink
            ${headingSize === 'h2'
              ? 'text-[34px] leading-[36px] md:text-[48px] md:leading-[52.8px] xl:text-[60px] xl:leading-[66px] tracking-[-0.06em]'
              : 'text-[32px] leading-[35.2px] tracking-[-0.03em]'}`}>
            {heading}
          </h2>
        </Reveal>

        {lead && (
          <Reveal delay={60}>
            <p className="mx-auto mt-5 max-w-[501px] text-center text-lead font-medium text-ink">{lead}</p>
          </Reveal>
        )}
        {intro && (
          <Reveal delay={60}>
            <p style={{ maxWidth: introW }}
               className="mx-auto mt-5 text-center text-body text-muted">{intro}</p>
          </Reveal>
        )}

        {/* No "Platform Overview" link here. It appears exactly twice on the
            original - in "Get to know" (y=1600) and near the footer (y=9077)
            - never in the four feature sections. Rendering it on all four
            pushed every card grid 36px down. */}

        {/* Measured (recon §1.1): the grid is 3-col with MIXED SPANS, not a
            uniform 3-up. 805.33px cards span 2 columns, one spans all 3.
            grid-template-columns: 394.656 394.672 394.656; rows 480px; gap 16.
            Intro copy ends at +197 from the H2 top and the first card starts
            at +245, so the grid sits 48px below the header block. */}
        <div className="mt-8 grid grid-cols-1 gap-4 xl:mt-12 xl:grid-cols-3 xl:grid-rows-2 xl:[grid-auto-rows:480px]">
          {features.map((f) => (
            <article
              key={f.title}
              style={{ '--ch-sm': `${cardH[0]}px`, '--ch-md': `${cardH[1]}px` }}
              className={`relative flex h-[var(--ch-sm)] flex-col overflow-hidden rounded-card
                          bg-surface md:h-[var(--ch-md)] xl:h-[480px]
                          ${f.span === 3 ? 'xl:col-span-3' : f.span === 2 ? 'xl:col-span-2' : ''}`}
            >
              {/* Image is a full-bleed layer at inset:0, z-index 0, behind the
                  text - object-fit contain, since the artwork carries its own
                  whitespace. No card padding, border or shadow. */}
              {f.rive
                ? <RiveArt src={f.rive} label={f.riveLabel} />
                : f.img && (
                    <Img src={f.img} w="full" h="100%" alt="" fit="contain"
                         className="absolute inset-0 z-0" style={{ height: '100%' }} />
                  )}
              {/* Sticky-note testimonial. Measured 328x290 at the card's
                  left edge, y=+166 from the card top, with the quote inset
                  +38x/+55y at 253px wide. Two marketing cards and the wide
                  finances card carry one. */}
              {f.note && (
                <div className="absolute left-0 top-[166px] z-[1] hidden h-[290px] w-[328px] xl:block">
                  <img src={f.note} alt="" aria-hidden="true" loading="lazy" decoding="async"
                       className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute left-[38px] top-[55px] w-[253px]">
                    <p className="text-[15px] italic leading-[20px] text-ink">“{f.quote}”</p>
                    <p className="mt-3 text-[13px] font-medium leading-[17px] text-ink">{f.who}</p>
                    <p className="text-[13px] leading-[17px] text-muted">{f.role}</p>
                  </div>
                </div>
              )}
              {/* Text column: 385px wide, padded 32px 32px 0, title->desc gap 12px.
                  The story card is the one exception: its heading IS the
                  quote, set at 30px, and it closes with a link. */}
              <div className="relative z-[2] flex max-w-[385px] flex-col gap-3 px-8 pt-8">
                <h3 className={f.story
                  ? 'max-w-[289px] font-display text-[30px] font-bold leading-[34px] tracking-[-0.03em] text-ink'
                  : 'max-w-[289px] text-feature font-medium text-ink'}>
                  {f.story ? `“${f.title}”` : f.title}
                </h3>
                <p className="max-w-[321px] text-small font-medium text-body-alt">{f.desc}</p>
                {f.cta && (
                  <a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium text-accent hover-color">
                    {f.cta}
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Some sections close with a full-bleed media band measured
            1216x480 (e.g. the AI section at y=8340.7). */}
        {band && (
          <Reveal delay={140}>
            <div className="mt-4 h-[220px] md:h-[236px] xl:h-[458px]">
              <Placeholder w="full" h="100%" radius={12} tone={tone} label="" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
