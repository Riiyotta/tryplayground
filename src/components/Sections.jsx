import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  testimonials, builtForTiles, timeline, footerColumns, legalLinks, tickerLogos,
  getToKnowRows,
} from '../data/content'
import { Reveal, Placeholder, PrimaryButton, SecondaryButton, Img } from './Primitives'
import MenuIcon from './MenuIcons'

/* Per-row glyph + tint, reusing the measured mega-menu icon set. */
const ROW_ICON = {
  Marketing:     { icon: 'marketing',  tone: '#FC5F35' },
  Registration:  { icon: 'guides',     tone: '#79716B' },
  Finances:      { icon: 'finances',   tone: '#1EBD66' },
  Engagement:    { icon: 'blog',       tone: '#79716B' },
  Payroll:       { icon: 'payroll',    tone: '#79716B' },
  'AI Employee': { icon: 'ai',         tone: '#B805FF' },
}

/* Dwell per row, measured at ~4861-5000ms on the original. */
const GTK_DWELL = 5000

/* Section 5 - "Get to know Playground". Padding 160px -> 96px at <=768. */
export function GetToKnow() {
  const [active, setActive] = useState(0)
  /* Unconditional ~5000ms advance, wrapping at the end. `active` is a
     dependency so an explicit click restarts the dwell rather than
     inheriting a partly-elapsed tick. */
  useEffect(() => {
    const id = setTimeout(
      () => setActive((i) => (i + 1) % getToKnowRows.length),
      GTK_DWELL,
    )
    return () => clearTimeout(id)
  }, [active])

  return (
    <section className="px-5 pt-24 pb-[180px] md:pt-[160px] md:pb-[126px]">
      <div className="mx-auto max-w-shell">
        {/* Measured: text column 360px at x=112, media 829x451 at x=561, so
            the column gap is 89px. Not a symmetric 2-up grid - that made the
            section 252px short. */}
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-[89px]">
          <div className="xl:w-[360px] xl:shrink-0">
            <Reveal>
              <h2 className="max-w-[348px] font-display font-bold tracking-[-0.06em] text-ink
                             text-[34px] leading-[36px] md:text-[48px] md:leading-[52.8px] xl:text-[60px] xl:leading-[66px]">
                Get to know Playground
              </h2>
            </Reveal>
            {/* At <=768 the subhead stays under the H2; at xl it moves to the
                right column beside the heading, as measured on the original. */}
            <Reveal delay={60}>
              <p className="mt-5 max-w-[501px] text-body text-muted xl:hidden">
                Replace multiple broken tools with Playground, the only child care platform
                designed to make your teachers and families happier.
              </p>
            </Reveal>
            <Reveal delay={115}>
              {/* Accordion, not a link list — see getToKnowRows in content.js
                  for the measured cadence and the progress-rule spec.
                  Rows are 360px wide and 69px tall when collapsed. */}
              <ul className="mt-10 hidden w-[360px] flex-col xl:flex">
                {getToKnowRows.map((row, i) => {
                  const on = i === active
                  const ic = ROW_ICON[row.label] || { icon: 'generic', tone: '#79716B' }
                  return (
                    <li key={row.label} className="relative">
                      <button type="button" onClick={() => setActive(i)}
                              aria-expanded={on}
                              className="group w-full text-left">
                        <span className="flex h-[69px] items-center gap-3 text-[18px] font-medium text-ink">
                          <MenuIcon name={ic.icon} tone={ic.tone} size={18} />
                          <span className={on ? '' : 'hover-color group-hover:text-muted'}>
                            {row.label}
                          </span>
                          <span className="ml-auto grid h-[26px] w-[26px] shrink-0 place-items-center
                                           rounded-full border border-rule text-muted
                                           transition-colors duration-200 group-hover:border-ink group-hover:text-ink">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor"
                                    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </span>
                        {/* Expanded copy. Height is animated via a grid-rows
                            trick so the row can transition to its natural
                            height rather than a hard-coded one. */}
                        {row.desc && (
                          <span className={`grid transition-[grid-template-rows] duration-[375ms] ease-move
                                            ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                            <span className="overflow-hidden">
                              <span className="block pb-4 text-[15px] leading-[22px] text-muted">
                                {row.desc}
                              </span>
                            </span>
                          </span>
                        )}
                      </button>
                      {/* 360x1 rule in #F0ECE9; the open row overlays a 2px
                          bar in rgb(31,92,247) that fills linearly across
                          the dwell (measured -360 -> 0 at 7.2px/100ms). */}
                      <span aria-hidden="true"
                            className="relative block h-px w-full overflow-hidden rounded-[40px]"
                            style={{ background: '#F0ECE9' }}>
                        {on && (
                          <span key={active}
                                className="gtk-bar absolute inset-y-0 left-0 block h-[2px] w-full"
                                style={{ background: 'rgb(31,92,247)' }} />
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              {/* "Watch video tour" / "10 min" control. The original mounts a
                  YouTube embed on click - not reproduced here. */}
              <button className="mt-8 flex items-center gap-3 rounded-[50px] bg-white/50 px-5 py-[10px] shadow-warm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="#fff" aria-hidden="true">
                    <path d="M5 3.5v9l7.5-4.5z" />
                  </svg>
                </span>
                <span className="text-feature font-medium text-ink">Watch video tour</span>
                <span className="font-display text-[16px] text-muted">10 min</span>
              </button>
            </Reveal>
          </div>
          <div className="xl:w-[845px] xl:shrink-0">
            {/* Right column opens with the subhead + overview link (xl only),
                sitting level with the H2 as measured on the original. */}
            <Reveal delay={60}>
              <div className="hidden xl:block">
                <p className="max-w-[501px] text-body text-muted">
                  Replace multiple broken tools with Playground, the only child care platform
                  designed to make your teachers and families happier.
                </p>
                <a href="#" className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-link-blue">
                  Platform Overview
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor"
                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </Reveal>
            <Reveal delay={100} className="xl:mt-[52px]">
            {/* Media row measured 1216x515: a 360px tab list on the left and an
                807x515 stage on the right holding the 829x451 card. */}
            {/* The stage swaps with the open row — measured changing ~150ms
                before the row itself expands, so it leads rather than lags.
                Measured: an 845x467 warm frame (rgba(68,25,6,0.04), radius
                20, padding 8) holding the 829x451 image at radius 12. */}
            <div className="relative h-[620px] overflow-hidden rounded-[20px] p-2 md:h-[660px] xl:h-[467px] xl:w-[845px]"
                 style={{ background: 'rgba(68,25,6,0.04)' }}>
              {getToKnowRows.map((row, i) => (
                <img key={row.label} src={row.img} alt=""
                     loading={i === 0 ? 'eager' : 'lazy'} decoding="async"
                     className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-card
                                object-cover transition-opacity duration-[310ms] ease-color"
                     style={{ opacity: i === active ? 1 : 0 }} />
              ))}
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Section 6 - testimonial carousel. User-driven (no auto-advance measured).
   Quotes are neutral and unattributed - see content.js. */
export function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials[i]
  /* pt 100 desktop -> 40 mobile (measured). */
  return (
    <section className="px-5 pt-10 md:pt-10 xl:pt-[100px]">
      <div className="mx-auto max-w-shell">
        <Reveal>
          <h2 className="max-w-[458px] font-display font-bold tracking-[-0.06em] text-ink
                         text-[34px] leading-[36px] md:text-[48px] md:leading-[52.8px] xl:text-[60px] xl:leading-[66px]">
            Hear what customers are saying
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 xl:grid-cols-2">
          <Reveal>
            {/* orange picture frame 450x456 holding a 415x420 portrait */}
            {/* 450x456 orange frame with the portrait inset inside its border.
                No card behind it — it sits directly on the section background. */}
            {/* Hovering the frame rotates it 2deg, settling ~340ms with a
                slight overshoot — see .ease-tilt. The measured matrix is
                pure rotation (its scale terms are cos2deg = 0.999391), so
                the 450 -> 465.6 growth the original reports is just the
                rotated bounding box, NOT an additional scale. Adding one
                over-sized the frame to 481.8. The frame also carries a
                "Watch video" control over the portrait. */}
            <button type="button"
                    className="group relative mx-auto block aspect-[450/456] w-full max-w-[450px]
                               origin-center transition-transform duration-[340ms] ease-tilt
                               hover:rotate-2">
              {/* Portrait sits inside the painted border (~10.5% inset). */}
              <img src="/assets/img/testimonial-portrait.webp" alt=""
                   loading="lazy" decoding="async"
                   className="absolute inset-[10.5%] h-[79%] w-[79%] object-cover" />
              <img src="/assets/img/testimonial-frame.webp" alt="" aria-hidden="true"
                   loading="lazy" decoding="async"
                   className="absolute inset-0 z-10 h-full w-full object-contain" />
              <span className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2
                               items-center gap-2 rounded-pill bg-white/90 px-4 py-[10px] shadow-warm
                               backdrop-blur-sm">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#8A4B2A" aria-hidden="true">
                  <path d="M5 3.5v9l7.5-4.5z" />
                </svg>
                <span className="text-[15px] font-medium" style={{ color: '#8A4B2A' }}>Watch video</span>
              </span>
            </button>
          </Reveal>

          <Reveal delay={80}>
            <blockquote className="max-w-[458px]">
              <p className="text-[24px] font-semibold leading-[30px] tracking-[0.02em] text-quote
                            xl:text-pullquote">
                “{t.quote}”
              </p>
              <footer className="mt-6">
                <p className="text-[15px] font-medium leading-[18px] text-ink">Verified customer</p>
                <p className="text-[15px] leading-[18px]" style={{ color: 'rgba(121,113,107,0.6)' }}>
                  {t.role}
                </p>
              </footer>
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <SecondaryButton className="h-[44px]">Read customer story</SecondaryButton>
              <div className="flex gap-2">
                {testimonials.map((_, n) => (
                  <button key={n} onClick={() => setI(n)} aria-label={`Testimonial ${n + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors duration-200 ease-color
                                ${n === i ? 'bg-ink' : 'bg-black/20'}`} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Section 11 - "Built for". Grid 3 x 313.33px, gap 10px, container 960px.
   Tiles 313x380, bg #FBFAF9, radius 12px, padding 40px.
   Stays 3-up at 768, collapses at 390. */
export function BuiltFor() {
  /* Section 11 measured pt=40px at 1440 (64px at 768/390). */
  return (
    <section className="px-5 pt-16 md:pt-10">
      {/* Section box 1000px (x=220); inner tile grid is 960px so the three
          tiles compute to 313.33px with a 10px gap, as measured. */}
      <div className="mx-auto max-w-[960px]">
        {/* Two columns at xl, NOT a centered stack: the H2 measures 470px at
            x=240 and the intro 470px at x=730, sitting beside it (intro top
            9021 vs H2 top 9001). Stacking them centred is what forced the
            -9px pull that was overlapping the intro with the tile grid. */}
        <div className="xl:flex xl:items-start xl:gap-[14px]">
          <Reveal className="xl:w-[470px] xl:shrink-0">
            <h2 className="mx-auto max-w-[470px] text-center font-display font-bold tracking-[-0.06em] text-ink
                           text-[34px] leading-[36px] md:text-[48px] md:leading-[52.8px]
                           xl:mx-0 xl:text-left xl:text-[60px] xl:leading-[66px]">
              Built for child care programs of all sizes
            </h2>
          </Reveal>
          <Reveal delay={60} className="xl:w-[470px] xl:shrink-0 xl:pt-5">
            <p className="mx-auto mt-5 max-w-[470px] text-center text-body text-muted
                          xl:mx-0 xl:mt-0 xl:text-left">
              Playground simplifies child care programs of all sizes, from home-based
              providers to centers and multi-site organizations.
            </p>
          </Reveal>
        </div>

        {/* Tile grid starts 254px below the H2 top on the original.
            Stays 3-up at 768 (measured 212.66px x3, container 670). At 390 it
            collapses but the tiles shrink so the section stays ~705px tall. */}
        <div className="mt-6 grid grid-cols-3 gap-[10px] xl:mt-[56px]">
          {builtForTiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              {/* Tile measured 313.33x380 flat, bg #FBFAF9, radius 12, padding 40. */}
              {/* Tile 380px at desktop; at <=768 the measured grid is 670x298.6
                  over two rows with a 10px gap => ~144px per tile. */}
              <Link to={t.to} className="group relative flex h-[225px] flex-col justify-end overflow-hidden rounded-card
                                     bg-surface p-4 md:h-[235px] md:p-5 xl:h-[380px] xl:p-10">
                <Img src={`/assets/img/tile-${i + 1}.${i === 4 ? 'jpg' : 'webp'}`}
                     w="full" h="100%" alt=""
                     className="absolute inset-0" style={{ height: '100%' }} />
                {/* Fixed two-line box so a title that wraps ("Before and After
                    Care") keeps its first line on the same baseline as the
                    single-line titles beside it. */}
                <h3 className="relative z-10 flex h-[2lh] max-w-[233px] items-end font-display text-[15px]
                               font-bold leading-tight text-ink md:text-[16px] xl:text-h2card">{t.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* The original's own growth curve, verbatim from its inline SVG
   (1000x400 viewBox, preserveAspectRatio="none"). */
const CURVE =
  'M0.00 320.00 L15.63 319.73 L31.25 319.12 L46.88 318.24 L62.50 317.13 L78.13 315.80 L93.75 314.28 L109.38 312.56 L125.00 310.67 L140.63 308.60 L156.25 306.37 L171.88 303.97 L187.50 301.41 L203.13 298.70 L218.75 295.84 L234.38 292.84 L250.00 289.69 L265.63 286.39 L281.25 282.97 L296.88 279.40 L312.50 275.70 L328.13 271.87 L343.75 267.91 L359.38 263.82 L375.00 259.60 L390.63 255.26 L406.25 250.80 L421.88 246.22 L437.50 241.51 L453.13 236.69 L468.75 231.74 L484.38 226.68 L500.00 221.51 L515.63 216.22 L531.25 210.82 L546.88 205.30 L562.50 199.67 L578.13 193.94 L593.75 188.09 L609.38 182.14 L625.00 176.07 L640.63 169.90 L656.25 163.62 L671.88 157.24 L687.50 150.76 L703.13 144.17 L718.75 137.47 L734.38 130.67 L750.00 123.78 L765.63 116.77 L781.25 109.67 L796.88 102.47 L812.50 95.17 L828.13 87.77 L843.75 80.27 L859.38 72.68 L875.00 64.99 L890.63 57.20 L906.25 49.31 L921.88 41.33 L937.50 33.25 L953.13 25.08 L968.75 16.81 L984.38 8.45 L1000.00 0.00'

/* Section 12 - 30-day timeline. Grid 3 x 311.33px, gap 16px, container 966px.
   Padding 180px retained at all widths. */
export function Timeline() {
  const [day, setDay] = useState(0)
  const t = timeline[day]
  /* Panel is 966x275; the curve SVG uses a 1000x400 viewBox with
     preserveAspectRatio="none", so dot coords are stored in panel px. */
  const PANEL_W = 966, PANEL_H = 275

  return (
    <section className="px-5 pt-[180px] pb-16">
      <div className="mx-auto max-w-[966px]">
        {/* Subhead sits ABOVE the H2 on the original. */}
        <p className="mx-auto max-w-[329px] text-center text-[15px] leading-6 text-body-alt">
          New software shouldn't take a year to implement
        </p>
        <h2 className="mx-auto mt-4 max-w-[650px] text-center font-display text-[32px] font-bold leading-[36px]
                       tracking-[-0.06em] text-ink md:text-h2sub">
          Here's what you can get done with Playground in just 30 days
        </h2>

        {/* Prev/next arrows: 48x42, radius 10, 1px #ECECEC, white. */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => setDay((i) => Math.min(timeline.length - 1, Math.max(0, i + d)))}
              aria-label={d < 0 ? 'Previous step' : 'Next step'}
              disabled={d < 0 ? day === 0 : day === timeline.length - 1}
              className="grid h-[42px] w-[48px] place-items-center rounded-[10px] border border-rule
                         bg-white transition-opacity duration-200 ease-color
                         disabled:opacity-40 hover:bg-surface"
            >
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                   style={{ transform: d < 0 ? 'rotate(180deg)' : 'none' }}>
                <path d="M3 8h9.5M8.5 4 12.5 8l-4 4" stroke="#1C1917" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* Outer bordered container holding the cards + chart. */}
        <div className="mt-6 rounded-[20px] border border-rule bg-white p-4 md:p-6">
          {/* Click-activated tabs. Active card = rgba(6,109,254,0.05),
              transitioning background-color over 500ms cubic-bezier(.22,1,.36,1).
              Hover does nothing on the original. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {timeline.map((c, i) => (
              <button
                key={c.day}
                onClick={() => setDay(i)}
                aria-pressed={i === day}
                className="flex flex-col items-start gap-2 rounded-[14px] px-[18px] py-4 text-left
                           transition-[background-color] duration-500 ease-move"
                style={{ background: i === day ? 'rgba(6,109,254,0.05)' : 'transparent' }}
              >
                <span className="text-daylabel font-medium text-day-label">{c.day}</span>
                <span className="text-[16px] font-medium leading-[16px] text-ink">{c.title}</span>
                <ul className="mt-1 flex flex-col gap-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-bodyslate text-slate">
                      {/* 5px dot, measured rgb(154,160,168). */}
                      <span aria-hidden="true"
                            className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-grey-fill" />
                      {it}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* Growth-curve panel: 966x275, bg #F2F4F7, radius 16. The curve is
              the original's own path (1000x400 viewBox, preserveAspectRatio
              none). The dot + pill slide to the active step over 500ms. */}
          <div className="relative mt-4 overflow-hidden rounded-[16px] bg-[#F2F4F7]"
               style={{
                 aspectRatio: `${PANEL_W} / ${PANEL_H}`,
                 /* faint chart grid behind the curve */
                 backgroundImage:
                   'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),' +
                   'linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
                 backgroundSize: '48px 34px',
               }}>
            <svg viewBox="0 0 1000 400" preserveAspectRatio="none"
                 className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="jct-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgb(127,177,255)" />
                  <stop offset="100%" stopColor="rgb(6,109,254)" />
                </linearGradient>
                <linearGradient id="jct-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(6,109,254)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="rgb(6,109,254)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${CURVE} L 1000 400 L 0 400 Z`} fill="url(#jct-fill)" stroke="none" />
              <path d={CURVE} fill="none" stroke="url(#jct-line)" strokeWidth="4"
                    strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* 16px dot, blue with a 3px white ring, centred on the curve. */}
            <span
              aria-hidden="true"
              className="absolute z-10 h-4 w-4 rounded-full border-[3px] border-white bg-link-blue
                         transition-[left,top] duration-500 ease-move"
              style={{
                left: `${(t.dot.x / PANEL_W) * 100}%`,
                top: `${(t.dot.y / PANEL_H) * 100}%`,
                transform: 'translate(-50%,-50%)',
              }}
            />
            {/* Pill rides under the dot, clamped inside the panel. */}
            <div
              className="absolute z-10 whitespace-nowrap rounded-pill bg-link-blue px-4 py-[9px]
                         text-[16px] leading-none text-white transition-[left,top] duration-500 ease-move"
              style={{
                left: `${(t.dot.x / PANEL_W) * 100}%`,
                top: `${((t.dot.y + 34) / PANEL_H) * 100}%`,
                transform: `translateX(${day === 0 ? '-6px' : day === 1 ? '-50%' : '-90%'})`,
              }}
            >
              {t.pill}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Section 13 - Savings Club. Grid 2 x 294px, gap 15px, container 603px. */
export function Savings() {
  return (
    <section className="px-5 pt-24 pb-16 md:pt-[140px] md:pb-0">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-col items-start gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-[50px]">
          <div>
            <Reveal>
              <h2 className="max-w-[603px] font-display text-[32px] font-bold leading-[36px]
                             tracking-[-0.06em] text-ink md:text-h2sub">
                Get access to the Playground Savings Club
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-5 max-w-[501px] text-body text-muted">
                Playground customers get 10–40% off the supplies they already buy through
                the exclusive Savings Club, at no extra cost.
              </p>
            </Reveal>
          </div>
          <Reveal delay={80} className="xl:w-[603px] xl:shrink-0">
            {/* measured 603x352 at x=725 */}
            <Img src="/assets/img/savings.webp" w="full" h={352} radius={9} alt="" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Section 14 - Support. Padding 140px -> 40px at <=768. */
export function Support() {
  /* pt measured 140 desktop -> 40 @768 -> 96 @390; pb 140 -> 64 mobile. */
  return (
    <section className="px-5 pt-24 pb-16 md:pt-10 md:pb-16 xl:pt-[140px] xl:pb-[163px]">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-col items-start gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-[50px]">
          <Reveal className="xl:w-[480px] xl:shrink-0">
            {/* measured 480x369 at x=173.5 - media sits on the left */}
            <Img src="/assets/img/support.webp" w="full" h={369} radius={12} alt="" />
          </Reveal>
          <div>
            <Reveal>
              <h2 className="max-w-[603px] font-display text-[32px] font-bold leading-[36px]
                             tracking-[-0.06em] text-ink md:text-h2sub">
                Award-winning customer support from people who care
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-5 max-w-[501px] text-body text-muted">
                Rated best support in the child care management industry for a reason
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="mt-8 flex flex-col gap-3">
                <li className="text-lead font-medium text-ink">Public and collaborative roadmap</li>
                <li className="text-lead font-medium text-ink">Help Center with 300+ resources</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Final CTA - card 960x662, bg #FAFAFA, radius 20px. Multi-step inline form
   on the original; rendered here as step 1 with the three program tiles. */
export function FinalCTA() {
  /* Section measured 1440x741.9; card 960x661.9 at x=240, radius 20, #FAFAFA.
     Card top sits 38px into the section (y=12296.3 illustration behind it). */
  return (
    <section className="relative overflow-hidden px-5 py-10 xl:h-[742px] xl:py-10">
      {/* Classroom backdrop 2111x658 behind the card — overflows the viewport
          by design, matching the original (manifest y=12296). */}
      <img src="/assets/img/cta-backdrop.webp" alt="" aria-hidden="true"
           loading="lazy" decoding="async"
           className="pointer-events-none absolute left-1/2 top-0 hidden w-[2111px]
                      max-w-none -translate-x-1/2 select-none xl:block" />
      <div className="relative z-10 mx-auto max-w-ctacard rounded-cta bg-cta-card p-6 md:p-14 xl:h-[662px]">
        <Reveal>
          <h3 className="mx-auto max-w-[650px] text-center font-display text-[32px] font-bold
                         leading-[36px] tracking-[-0.06em] text-ink md:text-h2sub">
            Book a demo to see why providers are switching.
          </h3>
        </Reveal>
        <Reveal delay={60}>
          <p className="mx-auto mt-6 max-w-[610px] text-center text-feature leading-[26.28px] text-ink">
            First, tell us about yourself. What type of program do you run?
          </p>
        </Reveal>

        {/* Step-1-of-2 progress bar: 610px track, ~50% filled, above the tiles. */}
        <div className="mx-auto mt-8 h-[6px] w-full max-w-[610px] overflow-hidden rounded-full bg-btn-secondary">
          <div className="h-full w-1/2 rounded-full bg-accent" />
        </div>

        {/* Bordered option cards — label sits ABOVE the artwork, which is
            bottom-anchored inside the card, in the original's order. */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {[
            { label: 'Home-Based', img: '/assets/img/opt-home.webp' },
            { label: 'Center', img: '/assets/img/opt-center.webp' },
            { label: 'Multi-Location', img: '/assets/img/opt-multi.webp' },
          ].map((o, i) => (
            <Reveal key={o.label} delay={i * 70}>
              <button className="flex h-[150px] w-[140px] flex-col overflow-hidden rounded-card
                                 border border-rule bg-white pt-4 transition-colors duration-200
                                 hover:border-accent md:h-[250px] md:w-[198px]">
                <span className="px-2 text-[15px] font-medium text-muted md:text-[17px]">{o.label}</span>
                <img src={o.img} alt="" aria-hidden="true" loading="lazy" decoding="async"
                     className="mt-auto h-[96px] w-full object-cover object-bottom md:h-[170px]" />
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <PrimaryButton className="h-[48px]">Get a free demo</PrimaryButton>
        </div>

        <p className="mx-auto mt-6 max-w-[610px] text-center text-[12px] leading-[14.4px] text-muted">
          By requesting a demo, you agree to receive automated text messages. We'll handle
          your information according to our privacy policy. Message and data rates may apply.
        </p>
      </div>

      {/* partner strip repeats below the CTA on the original (y=12838, inside
          the 741.9px section box - so it must not add extra height here) */}
      <div className="pointer-events-none mx-auto mt-6 flex max-w-content flex-wrap items-center justify-center gap-10 opacity-60">
        {tickerLogos.map((l, i) => (
          <img key={i} src={l.src} alt={l.name} width={l.w} height={l.h} loading="lazy" decoding="async"
            style={{ width: l.w, height: l.h }} className="object-contain" />
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Footer measured 1440x967 at y=13000. The link block starts at y=13060
          and the full-bleed illustration band (1584x452) sits BELOW it at
          y=13525.5 - not above, which is what pushed the tail 520px long. */}
      <div className="mx-auto max-w-content px-5 pb-0 pt-[60px] xl:h-[515px] xl:overflow-hidden">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-[15px] leading-[21px] text-muted hover-color hover:text-ink">
              Request AI summary of Playground
            </a>
            <a href="#" className="text-[15px] leading-[21px] text-muted hover-color hover:text-ink">
              Early Childhood Investigations
            </a>
          </div>

          {footerColumns.map((col, i) => (
            <div key={i}>
              {col.heading && (
                <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-wide text-ink">
                  {col.heading}
                </h4>
              )}
              <ul className="flex flex-col gap-[6px]">
                {/* Labels whose page this clone actually serves route for
                    real; the rest stay inert anchors rather than pretending
                    to navigate somewhere that does not exist. */}
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to}
                            className="text-small font-medium text-muted hover-color hover:text-ink">
                        {l.label}
                      </Link>
                    ) : (
                      <a href="#" className="text-small font-medium text-muted hover-color hover:text-ink">
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/[0.06] pt-6">
          <span className="text-footer text-white/90">© 2026 Sandlot Inc. All rights reserved.</span>
          {legalLinks.map((l) => (
            <a key={l} href="#" className="text-footer text-white/90 hover-color hover:text-white">{l}</a>
          ))}
        </div>
      </div>

      {/* full-bleed playground illustration - measured 1584x452 at y=13525.5 */}
      <Img src="/assets/img/footer-band.webp" w="full" h={220} alt=""
           className="md:!h-[452px]" style={{ height: 220 }} />
    </footer>
  )
}
