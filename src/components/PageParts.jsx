import { useState } from 'react'
import { Img } from './Primitives'

/* Shared building blocks for the inner pages. Every value here is measured
   on the original at 1440 - see PROCESS.md for how. */

/* Eyebrow measured 17px/23.8 in the brand orange, sitting ~46px above the H2. */
export function Eyebrow({ children }) {
  return (
    <p className="text-[15px] font-medium leading-[21px] text-eyebrow">{children}</p>
  )
}

/* Section H2 measured 60px/66 w700 tracking -0.06em; the smaller variant
   used by the alternating feature rows is 48px/52.8. */
export function SectionH2({ children, size = 60, className = '', style }) {
  const big = size === 60
  return (
    <h2 style={style}
        className={`font-display font-bold tracking-[-0.06em] text-ink
          ${big
            ? 'text-[34px] leading-[36px] md:text-[48px] md:leading-[52.8px] xl:text-[60px] xl:leading-[66px]'
            : 'text-[30px] leading-[33px] md:text-[40px] md:leading-[44px] xl:text-[48px] xl:leading-[52.8px]'}
          ${className}`}>
      {children}
    </h2>
  )
}

/* Intro paragraph under an H2: measured 17px/23.8 in the muted grey. */
export function Intro({ children, className = '' }) {
  return <p className={`text-[17px] leading-[23.8px] text-muted ${className}`}>{children}</p>
}

/* Bulleted feature list. The original uses a small check glyph at 17px rows
   with a 56px vertical rhythm. */
export function CheckList({ items, className = '' }) {
  return (
    <ul className={`flex flex-col gap-4 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
               className="mt-[2px] shrink-0">
            <circle cx="10" cy="10" r="9" fill="#066DFE" fillOpacity="0.12" />
            <path d="m6 10.2 2.6 2.6L14 7.4" stroke="#066DFE" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[16px] leading-[24px] text-body-alt">{t}</span>
        </li>
      ))}
    </ul>
  )
}

/* Alternating copy/media row. Measured: the media column is ~510px and the
   copy column ~500-520px, and the pair sits on a ~566-588px row. */
export function FeatureRow({
  eyebrow, title, intro, items, img, imgW, imgH, radius = 10, flip = false, quote,
}) {
  return (
    <div className={`mx-auto grid max-w-content items-center gap-10 px-5 xl:grid-cols-2 xl:gap-16
                     ${flip ? 'xl:[&>*:first-child]:order-2' : ''}`}>
      <div className="max-w-[520px]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <SectionH2 size={48} className="mt-3">{title}</SectionH2>
        {/* The original marks this sub-headline up as an h2 at 17px/23.8,
            not a paragraph - matched here so the heading outline lines up. */}
        {intro && (
          <h2 className="mt-5 max-w-[500px] text-[17px] font-normal leading-[23.8px] text-muted">
            {intro}
          </h2>
        )}
        {items && <CheckList items={items} className="mt-8" />}
        {quote && (
          <figure className="mt-8 max-w-[460px]">
            <blockquote className="text-[16px] font-medium leading-[24px] text-ink">
              {quote.text}
            </blockquote>
            <figcaption className="mt-2 text-[14px] leading-[20px] text-muted">
              {quote.by}
            </figcaption>
          </figure>
        )}
      </div>
      <div className="flex justify-center">
        <Img src={img} w={imgW} h={imgH} radius={radius} alt="" fit="contain"
             className="max-w-full" />
      </div>
    </div>
  )
}

/* Three/four-up link cards. Measured 277x119 at radius 10, 24 of them on the
   billing page across four grids. */
export function LinkCard({ title, desc }) {
  return (
    <a href="#"
       className="flex min-h-[119px] flex-col gap-2 rounded-[10px] border border-rule bg-white p-5
                  transition-colors duration-200 ease-color hover:bg-surface">
      <h3 className="text-[18px] font-medium leading-[21.6px] text-ink">{title}</h3>
      <p className="text-[15px] leading-[21px] text-muted">{desc}</p>
    </a>
  )
}

/* FAQ accordion. Measured on the original: rows are 538px wide and 64px tall
   collapsed, growing to ~92px when open, and rows toggle INDEPENDENTLY -
   opening one does not close another (verified by opening row 2 while row 1
   stayed open). Row 1 ships open. */
export function Faq({ items, openFirst = true }) {
  const [open, setOpen] = useState(() => (openFirst ? { 0: true } : {}))
  return (
    <ul className="mx-auto w-full max-w-[538px]">
      {items.map((it, i) => {
        const isOpen = Boolean(open[i])
        return (
          <li key={it.q} className={i ? 'border-t border-rule' : ''}>
            <button
              onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-4 py-5 text-left">
              <span className="flex-1 text-[17px] font-medium leading-[23.8px] text-ink">
                {it.q}
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
                   className="mt-[2px] shrink-0 text-muted transition-transform duration-200 ease-color"
                   style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* The answer was conditionally mounted, so opening a row jumped
                in a single frame. The original springs: rAF-sampling
                /for/centers gives 428 -> 447 (210ms) -> 493 (268) -> 513
                (320) -> 519.6 (368), overshooting to 520.37 at 418ms before
                settling at 519.0 by 571ms. Core motion is ~210ms with the
                settle out to ~360ms.

                Kept mounted and animated with grid-rows 0fr/1fr, the same
                technique the "Get to know" accordion uses - it animates to
                the content's natural height without measuring it. ease-tilt
                carries the overshoot; a plain ease-out cannot. */}
            <div className={`grid transition-[grid-template-rows] duration-[360ms] ease-tilt
                             ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pb-5 pr-9 text-[16px] leading-[24px] text-muted">{it.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}


/* Testimonial band — measured ~697px at y=4341 on /solutions/billing.
   The portrait sits inside a painted 450x456 orange frame (same asset the
   homepage uses), with the quote, name and role beside it. Switching between
   customers is user-driven; no auto-advance was measured. */
export function TestimonialBand({ h2, items, frame, portrait }) {
  const [i, setI] = useState(0)
  const t = items[i]
  return (
    <section className="px-5 pt-24 xl:pt-[140px]">
      <div className="mx-auto max-w-content">
        <SectionH2 className="max-w-[560px]">{h2}</SectionH2>
        <div className="mt-12 grid items-center gap-12 xl:grid-cols-2">
          <div className="relative mx-auto aspect-[450/456] w-full max-w-[450px]">
            <img src={portrait} alt="" loading="lazy" decoding="async"
                 className="absolute inset-[10.5%] h-[79%] w-[79%] object-cover" />
            <img src={frame} alt="" aria-hidden="true" loading="lazy" decoding="async"
                 className="absolute inset-0 z-10 h-full w-full object-contain" />
          </div>
          <blockquote className="max-w-[500px]">
            <p className="text-[24px] font-semibold leading-[30px] tracking-[0.02em] text-quote">
              {t.quote}
            </p>
            <footer className="mt-6">
              <p className="text-[15px] font-medium leading-[18px] text-ink">{t.name}</p>
              <p className="text-[15px] leading-[18px] text-muted">{t.role}</p>
            </footer>
            <div className="mt-8 flex gap-2">
              {items.map((_, n) => (
                <button key={n} onClick={() => setI(n)} aria-label={`Testimonial ${n + 1}`}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ease-color
                              ${n === i ? 'bg-ink' : 'bg-black/20'}`} />
              ))}
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

/* "Explore related articles" — a horizontally scrolling rail of 309x300
   cover cards with title, read time and date. Overflow is intentional and
   matches the original, which lets the rail run past the shell gutter. */
export function ArticleRail({ h2, link, items }) {
  return (
    <section className="pt-24 xl:pt-[140px]">
      <div className="mx-auto flex max-w-content items-center justify-between px-5">
        <SectionH2 size={48} className="!text-[32px] !leading-[35.2px]">{h2}</SectionH2>
        <a href="#" className="shrink-0 text-[15px] font-medium text-link-blue hover-color">
          {link}
        </a>
      </div>
      <div className="no-scrollbar mt-8 overflow-x-auto pb-2">
        <div className="mx-auto flex w-max gap-5 px-5">
          {items.map((a) => (
            <a key={a.t} href="#" className="group flex w-[309px] shrink-0 flex-col gap-3">
              <div className="overflow-hidden rounded-card">
                <img src={a.img} alt="" loading="lazy" decoding="async"
                     className="h-[300px] w-[309px] object-cover
                                transition-transform duration-500 ease-move group-hover:scale-[1.03]" />
              </div>
              <p className="text-[16px] font-medium leading-[22px] text-ink">{a.t}</p>
              <p className="text-[14px] leading-[20px] text-muted">{a.read} · {a.date}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
