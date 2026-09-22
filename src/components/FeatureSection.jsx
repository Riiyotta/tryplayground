import { Reveal, Placeholder, Img } from './Primitives'

/* Shared layout for sections 7-10 ("marketing", "finances", "operations",
   "AI"). Measured: container 1216px, feature grid 3 x 394.66px with a 16px
   gap, collapsing to a single column at <=768 (which is why these sections
   roughly triple in height on mobile).
   Section padding: 180px desktop -> 96px at <=768. */
export default function FeatureSection({
  id, heading, intro, lead, features, mediaH = 480, tone = 'grey', headingSize = 'h2',
  band = false, headingW = 760, padTop = 180, eyebrow = '', padBottom = 0,
  cardH = [683, 661],
}) {
  /* Section pt measured per section at 1440: 0 for marketing, 180 for the
     rest. Collapses to 96px at <=768 per CLONE_SPEC s10. */
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
                 aria-hidden="true" className="shrink-0 text-eyebrow">
              <path d="M3 11v2a1 1 0 0 0 1 1h2l4 3V7L6 10H4a1 1 0 0 0-1 1Z" />
              <path d="M15 9a3.5 3.5 0 0 1 0 6" />
            </svg>
            <span className="text-caption font-medium text-eyebrow">
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
            <p className="mx-auto mt-5 max-w-[501px] text-center text-body text-muted">{intro}</p>
          </Reveal>
        )}

        <Reveal delay={120} className="mt-5 flex justify-center">
          <a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium leading-6 text-accent hover-color">
            Platform Overview
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>

        {/* Measured (recon §1.1): the grid is 3-col with MIXED SPANS, not a
            uniform 3-up. 805.33px cards span 2 columns, one spans all 3.
            grid-template-columns: 394.656 394.672 394.656; rows 480px; gap 16. */}
        <div className="mt-1 grid grid-cols-1 gap-4 xl:grid-cols-3 xl:grid-rows-2 xl:[grid-auto-rows:480px]">
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
              {f.img ? (
                <Img src={f.img} w="full" h="100%" alt="" fit="contain"
                     className="absolute inset-0 z-0" style={{ height: '100%' }} />
              ) : (
                <Placeholder w="full" h={mediaH} radius={0} tone={tone} label=""
                             className="absolute inset-0 !h-full" />
              )}
              {/* Text column: 385px wide, padded 32px 32px 0, title->desc gap 12px. */}
              <div className="relative z-[2] flex max-w-[385px] flex-col gap-3 px-8 pt-8">
                <h3 className="max-w-[289px] text-feature font-medium text-ink">{f.title}</h3>
                <p className="max-w-[321px] text-small font-medium text-body-alt">{f.desc}</p>
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
