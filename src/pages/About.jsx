import { useState } from 'react'
import { useParallax } from '../components/useParallax'
import { Link } from 'react-router-dom'
import { PrimaryButton, SecondaryButton, Img } from '../components/Primitives'
import { SectionH2, Intro } from '../components/PageParts'
import {
  aboutHero, aboutLetter, aboutShift, aboutStats, aboutStory,
  aboutLoved, aboutPodcasts, aboutCards,
} from '../data/about'

/* /about — original measures 7,689px at 1440 with 13 h2s and 35 unique
   images. Section y-positions from the recon are noted inline. */
export default function About() {
  const [letterRef, letterY] = useParallax(-0.136, 63)
  const [tab, setTab] = useState(0)

  return (
    <>
      {/* Hero: H1 at y=534, ringed by 7 photos measured 196-222px square. */}
      <section className="hero-cream relative overflow-hidden pt-[56px]">
        <div className="relative z-10 mx-auto max-w-content px-5 pb-16 pt-16 text-center">
          <h1 className="mx-auto max-w-[860px] font-display font-bold tracking-[-0.059em] text-ink
                         text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                         xl:text-[68px] xl:leading-[68px]">
            {aboutHero.h1}
          </h1>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {aboutHero.photos.map((src, i) => (
              <img key={src} src={src} alt="" aria-hidden="true" loading={i < 3 ? 'eager' : 'lazy'}
                   decoding="async"
                   className="h-[120px] w-[120px] rounded-card object-cover xl:h-[206px] xl:w-[206px]" />
            ))}
          </div>
        </div>
      </section>

      {/* y=916 — the open letter. The card holds a constant 3deg rotation
          (matrix cos/sin(3deg)) while translateY parallaxes: measured
          46.4 -> -63px as the card scrolls through, ratio ~-0.136. Read the
          matrix, not the bounding box - see PROCESS.md s12.2. */}
      <section className="relative overflow-hidden px-5 pt-24 xl:pt-[140px]">
        <img src={aboutLetter.pattern} alt="" aria-hidden="true" loading="lazy" decoding="async"
             className="pointer-events-none absolute inset-x-0 top-0 hidden h-[732px] w-full
                        max-w-none object-cover opacity-60 xl:block" />
        <div className="relative z-10 mx-auto max-w-[760px] text-center">
          <SectionH2 size={48}>{aboutLetter.h2}</SectionH2>
          <div ref={letterRef}
               style={{ transform: `rotate(3deg) translateY(${letterY}px)` }}
               className="mt-10 rounded-card border border-rule bg-white p-8 text-left xl:p-12">
            <p className="text-[17px] font-medium leading-[26px] text-ink">{aboutLetter.salutation}</p>
            {aboutLetter.paras.map((t) => (
              <p key={t} className="mt-5 text-[17px] leading-[26px] text-muted">{t}</p>
            ))}
            <p className="mt-6 text-[17px] font-medium leading-[26px] text-ink">{aboutLetter.closing}</p>
            <Img src={aboutLetter.art} w="full" h={280} radius={12} alt="" fit="contain"
                 className="mt-8" />
          </div>
        </div>
      </section>

      {/* y=2100 */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto grid max-w-content items-center gap-10 xl:grid-cols-2 xl:gap-16">
          <div className="max-w-[520px]">
            <SectionH2 size={48}>{aboutShift.h2}</SectionH2>
            {aboutShift.paras.map((t) => (
              <p key={t} className="mt-5 text-[17px] leading-[26px] text-muted">{t}</p>
            ))}
          </div>
          <Img src={aboutShift.art} w={690} h={427} radius={12} alt="" fit="contain"
               className="mx-auto max-w-full" />
        </div>
      </section>

      {/* y=2497 — stats measured 40px/44 w700. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content rounded-card bg-surface px-6 py-14 text-center">
          <p className="text-[20px] font-semibold leading-[22px] text-ink">{aboutStats.h2}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-12 xl:gap-24">
            {aboutStats.items.map((s) => (
              <div key={s.l}>
                <p className="font-display text-[40px] font-bold leading-[44px] text-ink">{s.v}</p>
                <p className="mt-1 text-[15px] leading-[21px] text-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* y=2866 — origin story; each paragraph emphasises one clause. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-[760px]">
          <SectionH2 size={48} className="text-center">{aboutStory.h2}</SectionH2>
          <div className="mt-10 flex flex-col gap-6">
            {aboutStory.paras.map((p) => {
              const [head, ...rest] = p.t.split(p.em)
              return (
                <p key={p.t} className="text-[18px] leading-[28px] text-muted">
                  {head}
                  <span className="font-semibold text-ink">{p.em}</span>
                  {rest.join(p.em)}
                </p>
              )
            })}
          </div>
        </div>
      </section>

      {/* y=3771 — review wall with a Directors / Families tab pair. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <p className="text-[15px] font-medium text-muted">{aboutLoved.rating}</p>
          <SectionH2 size={48} className="mx-auto mt-4 max-w-[680px]">{aboutLoved.h2}</SectionH2>
          <div className="mt-8 inline-flex gap-1 rounded-rail p-1"
               style={{ background: 'rgba(68,25,6,0.04)' }}>
            {aboutLoved.tabs.map((t, i) => (
              <button key={t} onClick={() => setTab(i)} aria-pressed={i === tab}
                className={`h-9 rounded-rail px-5 text-[14px] font-medium
                            transition-colors duration-200 ease-color
                            ${i === tab ? 'bg-white text-ink shadow-warm' : 'text-muted hover:text-ink'}`}>
                {t}
              </button>
            ))}
          </div>
          {/* Measured 360x290 r16px on white with a 3-layer rgba(81,81,84)
              shadow stack, not the flat bordered card elsewhere on the site. */}
          <ul className="mt-10 grid gap-4 text-left md:grid-cols-2 xl:grid-cols-3">
            {aboutLoved.reviews.map((r) => (
              <li key={r} className="rounded-elevated bg-white p-6 shadow-elevated
                                     text-[16px] leading-[24px] text-body-alt">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* y=4426 */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-[760px]">
          <SectionH2 size={48} className="text-center">{aboutPodcasts.h2}</SectionH2>
          <ul className="mt-10 flex flex-col">
            {aboutPodcasts.items.map((t, i) => (
              <li key={t} className={i ? 'border-t border-rule' : ''}>
                <a href="#" className="flex items-center gap-4 py-5
                                       transition-colors duration-200 ease-color hover:text-accent">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="#fff" aria-hidden="true">
                      <path d="M5 3.5v9l7.5-4.5z" />
                    </svg>
                  </span>
                  <span className="text-[18px] leading-[24px] text-ink">{t}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* y=5278 — two closing cards. */}
      <section className="px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto grid max-w-content gap-6 md:grid-cols-2">
          {aboutCards.map((c) => (
            <div key={c.title}
                 className="flex flex-col items-start rounded-card bg-surface p-8 xl:p-10">
              <h3 className="font-display text-[26px] font-bold leading-[32px] tracking-[-0.03em] text-ink">
                {c.title}
              </h3>
              <p className="mt-4 flex-1 text-[16px] leading-[24px] text-muted">{c.desc}</p>
              <div className="mt-8">
                {c.to
                  ? <Link to={c.to}><SecondaryButton className="h-[44px]">{c.cta}</SecondaryButton></Link>
                  : <PrimaryButton className="h-[44px]">{c.cta}</PrimaryButton>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
