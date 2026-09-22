import { Link } from 'react-router-dom'
import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2, Intro, CheckList, Faq, ArticleRail } from '../components/PageParts'
import Ticker from '../components/Ticker'
import { billingArticles } from '../data/billing'
import {
  aiHero, aiSkills, aiBenefits, aiTrained, aiOnboard, aiFaq, aiCta,
} from '../data/solutionsAi'

/* /solutions/ai — original measures 8,137px at 1440 with 8 h2s and 33 unique
   images. Its shape differs from the other solutions pages (capability cards,
   benefit cards, an onboarding row), so it is built on its own rather than
   through SolutionPage. */
export default function SolutionsAi() {
  return (
    <>
      <section className="hero-cream relative overflow-hidden pt-[56px]">
        <img src={aiHero.backdrop} alt="" aria-hidden="true" decoding="async"
             className="pointer-events-none absolute inset-x-0 top-[300px] hidden h-[501px] w-full
                        max-w-none object-cover xl:block" />
        <div className="relative z-10 mx-auto max-w-content px-5 pb-24 text-center">
          {/* The original renders these as two spans with no space between,
              so the accessible name reads "programfaster". Kept as measured. */}
          <h1 className="mx-auto max-w-[900px] font-display font-bold tracking-[-0.059em] text-ink
                         text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                         xl:text-[68px] xl:leading-[68px]">
            <span>{aiHero.h1a}</span><span className="block">{aiHero.h1b}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-body text-muted">{aiHero.sub}</p>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
        </div>
      </section>

      <Ticker />

      {/* y=1300 — three core skills. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 className="mx-auto max-w-[760px] text-center">{aiSkills.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[680px] text-center">{aiSkills.intro}</Intro>
          <div className="mt-12 grid gap-4 xl:grid-cols-3">
            {aiSkills.cards.map((c) => (
              <article key={c.title}
                       className="flex flex-col overflow-hidden rounded-card bg-surface">
                <Img src={c.img} w="full" h={480} radius={0} alt="" fit="contain" />
                <div className="flex flex-col gap-3 p-8">
                  <h3 className="text-[18px] font-medium leading-[21.6px] text-ink">{c.title}</h3>
                  <p className="text-[15px] leading-[22px] text-body-alt">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* y=2514 — four benefit cards. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 className="mx-auto max-w-[820px] text-center">{aiBenefits.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[560px] text-center">{aiBenefits.lead}</Intro>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {aiBenefits.cards.map((c) => (
              <div key={c.title} className="rounded-card border border-rule bg-white p-8">
                <h3 className="text-[18px] font-medium leading-[21.6px] text-ink">{c.title}</h3>
                <p className="mt-3 text-[16px] leading-[24px] text-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* y=4068 — trained on your business. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto grid max-w-content items-center gap-10 xl:grid-cols-2 xl:gap-16">
          <div className="max-w-[520px]">
            <SectionH2 size={48}>{aiTrained.h2}</SectionH2>
            <h2 className="mt-5 max-w-[500px] text-[17px] font-normal leading-[23.8px] text-muted">
              {aiTrained.sub}
            </h2>
            <p className="mt-8 text-[16px] font-medium text-ink">{aiTrained.callLabel}</p>
            <CheckList items={aiTrained.callItems} className="mt-4" />
          </div>
          <Img src={aiTrained.img} w={600} h={480} radius={12} alt="" fit="contain"
               className="mx-auto max-w-full" />
        </div>
      </section>

      {/* y=4878 — onboarding: what you do, and what you get. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">{aiOnboard.h2}</SectionH2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {aiOnboard.steps.map((s, i) => (
              <div key={s.do} className="flex flex-col gap-4 rounded-card bg-surface p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent
                                 text-[14px] font-semibold text-white">{i + 1}</span>
                <p className="text-[16px] font-medium leading-[22px] text-ink">{s.do}</p>
                <p className="mt-auto text-[15px] leading-[21px] text-muted">{s.get}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[18px] font-medium text-ink">{aiOnboard.outcome}</p>
        </div>
      </section>

      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">FAQs</SectionH2>
          <div className="mt-10"><Faq items={aiFaq} /></div>
        </div>
      </section>

      <ArticleRail {...billingArticles} />

      <section className="px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <h3 className="mx-auto max-w-[680px] font-display text-[30px] font-bold leading-[33px]
                         tracking-[-0.06em] text-ink xl:text-[48px] xl:leading-[52.8px]">
            {aiCta}
          </h3>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
        </div>
      </section>
    </>
  )
}
