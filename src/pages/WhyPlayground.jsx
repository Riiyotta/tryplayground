import { useState } from 'react'
import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2, Intro, Faq, TestimonialBand } from '../components/PageParts'
import Ticker from '../components/Ticker'
import {
  whyHero, whyDemo, whyProblems, whyTestimonials, whySavings, whyEce, whyFaq,
} from '../data/whyPlayground'

/* Program-type picker. Tiles measured 198x250 r10 on #F4F2EC; the selected
   tile tints to rgba(70,160,219,0.2). Choosing one reveals a contact step -
   on the original the page's text grows 4403 -> 5015 characters - so this is
   a two-step form rather than a static row of links. */
function DemoPicker() {
  const [pick, setPick] = useState(null)
  return (
    <div className="mx-auto max-w-[760px] text-center">
      <p className="text-[17px] leading-[23.8px] text-muted">
        {pick ? whyDemo.step2 : whyDemo.step1}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {whyDemo.tiles.map((t) => {
          const on = pick === t.label
          return (
            <button key={t.label} onClick={() => setPick(on ? null : t.label)}
              aria-pressed={on}
              style={{ background: on ? 'rgba(70,160,219,0.2)' : '#F4F2EC' }}
              className="flex h-[250px] w-[198px] flex-col items-center justify-end gap-3
                         rounded-[10px] pt-6 transition-colors duration-200 ease-color">
              <Img src={t.img} w={150} h={150} radius={8} alt="" fit="contain" />
              <span className={`text-[18px] font-semibold ${on ? 'text-ink' : 'text-muted'}`}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
      {pick && (
        <form className="mx-auto mt-8 flex max-w-[460px] flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="you@yourprogram.com"
                 aria-label="Work email"
                 className="h-[48px] rounded-btn border border-rule px-4 text-[16px]
                            text-ink outline-none focus:border-accent" />
          <PrimaryButton className="h-[48px]">Get a free demo</PrimaryButton>
        </form>
      )}
    </div>
  )
}

/* /why-playground — original measures 6,862px at 1440. */
export default function WhyPlayground() {
  return (
    <>
      <section className="hero-cream relative overflow-hidden pt-[56px]">
        <img src={whyHero.backdrop} alt="" aria-hidden="true" decoding="async"
             className="pointer-events-none absolute inset-x-0 top-0 hidden h-[727px] w-full
                        max-w-none object-cover opacity-90 xl:block" />
        <div className="relative z-10 mx-auto max-w-content px-5 pb-16 text-center">
          <h1 className="mx-auto max-w-[900px] font-display font-bold tracking-[-0.059em] text-ink
                         text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                         xl:text-[68px] xl:leading-[68px]">
            {whyHero.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-body text-muted">{whyHero.sub}</p>
        </div>
      </section>

      {/* y=831 — demo band with the two-step picker. */}
      <section className="px-5 pt-16">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="mx-auto max-w-[680px] text-center">
            {whyDemo.h3}
          </SectionH2>
          <div className="mt-10"><DemoPicker /></div>
        </div>
      </section>

      <Ticker />

      {/* y=1613 — problem / solution pairs. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 className="mx-auto max-w-[680px] text-center">{whyProblems.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[620px] text-center">{whyProblems.intro}</Intro>
          <ul className="mt-12 flex flex-col gap-4">
            {whyProblems.rows.map((r) => (
              <li key={r.problem}
                  className="grid gap-4 rounded-card border border-rule bg-white p-6 md:grid-cols-2 md:gap-8">
                <div>
                  <p className="text-[15px] font-semibold text-eyebrow">{r.problem}</p>
                  <p className="mt-2 text-[16px] leading-[24px] text-muted">{r.detail}</p>
                </div>
                <div className="rounded-[10px] bg-surface p-5">
                  <p className="text-[15px] font-semibold text-accent">{r.solution}</p>
                  <p className="mt-2 text-[16px] leading-[24px] text-body-alt">{r.solutionDetail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TestimonialBand {...whyTestimonials} />

      {/* y=4006 */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content rounded-card bg-surface px-6 py-14 text-center">
          <SectionH2 size={48} className="mx-auto max-w-[620px]">{whySavings.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[560px]">{whySavings.intro}</Intro>
          <a href="#" className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-link-blue hover-color">
            {whySavings.link}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* y=4498 */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 className="mx-auto max-w-[620px] text-center">{whyEce.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[560px] text-center">{whyEce.intro}</Intro>
          <ul className="mx-auto mt-10 flex max-w-[620px] flex-col gap-3">
            {whyEce.releases.map((r) => (
              <li key={r.v}
                  className="flex items-center gap-4 rounded-[10px] border border-rule bg-white px-5 py-4">
                <span className="w-[46px] shrink-0 text-[15px] font-semibold text-accent">{r.v}</span>
                <span className="flex-1 text-[15px] font-medium text-ink">{r.t}</span>
                <span className="shrink-0 text-[14px] text-muted">{r.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* y=5436 */}
      <section className="px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">FAQs</SectionH2>
          <div className="mt-10"><Faq items={whyFaq} /></div>
        </div>
      </section>
    </>
  )
}
