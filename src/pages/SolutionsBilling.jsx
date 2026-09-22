import { Link } from 'react-router-dom'
import { PrimaryButton, Img } from '../components/Primitives'
import {
  Eyebrow, SectionH2, Intro, FeatureRow, LinkCard, Faq,
  TestimonialBand, ArticleRail,
} from '../components/PageParts'
import Ticker from '../components/Ticker'
import {
  billingHero, billingIntro, billingRows, billingCardGroups,
  billingRelated, billingFaq, billingCta,
  billingTestimonials, billingArticles,
} from '../data/billing'

/* /solutions/billing — the original measures 12,955px at 1440 with 34
   headings and 40 unique images, all of which are downloaded and served
   locally from /assets/img/billing/. Section y-positions from the recon are
   noted inline so a later pass can re-check them. */
export default function SolutionsBilling() {
  return (
    <>
      {/* Hero: H1 68/68 at y=216, subhead at 440, CTA at 509. The classroom
          illustration is a full-bleed 1903x507 band behind the 409x547 card. */}
      <section className="hero-cream relative overflow-hidden pt-[56px]">
        <img src={billingHero.backdrop} alt="" aria-hidden="true" decoding="async"
             className="pointer-events-none absolute inset-x-0 top-[340px] hidden h-[507px] w-full
                        max-w-none object-cover xl:block" />
        <div className="relative z-10 mx-auto grid max-w-content items-center gap-10 px-5 pb-20
                        xl:grid-cols-[1fr_409px] xl:gap-16">
          <div className="max-w-[640px]">
            <h1 className="font-display font-bold tracking-[-0.059em] text-ink
                           text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                           xl:text-[68px] xl:leading-[68px]">
              {billingHero.h1}
            </h1>
            <p className="mt-6 max-w-[520px] text-body text-muted">{billingHero.sub}</p>
            <PrimaryButton className="mt-8 h-[48px]">{billingHero.cta}</PrimaryButton>
          </div>
          <Img src={billingHero.shot} w={409} h={547} radius={14} alt=""
               fit="contain" className="mx-auto max-w-full" />
        </div>
      </section>

      {/* Partner marquee repeats here on the original at y=969. */}
      <Ticker />

      {/* y=1238 — intro band: H2 60px, lead, four labels, then the cream
          807x443 panel holding the 829x451 transactions shot. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 className="mx-auto max-w-[760px] text-center">
            {billingIntro.h2}
          </SectionH2>
          <Intro className="mx-auto mt-5 max-w-[620px] text-center">
            {billingIntro.lead}
          </Intro>
          <ul className="mx-auto mt-10 flex max-w-[760px] flex-wrap justify-center gap-x-10 gap-y-3">
            {billingIntro.labels.map((l) => (
              <li key={l} className="text-[16px] font-medium leading-[24px] text-ink">{l}</li>
            ))}
          </ul>
          <div className="relative mx-auto mt-12 flex max-w-[807px] items-center justify-center
                          overflow-hidden rounded-card">
            <img src={billingIntro.panel} alt="" aria-hidden="true" loading="lazy" decoding="async"
                 className="h-[443px] w-full object-cover" />
            <img src={billingIntro.shot} alt="" loading="lazy" decoding="async"
                 className="absolute left-1/2 top-1/2 w-[92%] max-w-[829px] -translate-x-1/2
                            -translate-y-1/2 rounded-card object-contain" />
          </div>
        </div>
      </section>

      {/* y=2075 / 2766 / 3472 / 5038 — alternating copy/media rows. */}
      {/* y=2075 / 2766 / 3472 — first three rows, then the testimonial band
          at y=4341, then the fourth row at y=5038. */}
      <div className="flex flex-col gap-24 pt-24 xl:gap-[140px] xl:pt-[140px]">
        {billingRows.slice(0, 3).map((r) => <FeatureRow key={r.title} {...r} />)}
      </div>

      <TestimonialBand {...billingTestimonials} />

      <div className="flex flex-col gap-24 pt-24 xl:gap-[140px] xl:pt-[140px]">
        {billingRows.slice(3).map((r) => <FeatureRow key={r.title} {...r} />)}
      </div>

      {/* y=6051 / 7503 / 8978 — card groups. Cards measured 277x119 r10. */}
      <div className="flex flex-col gap-24 pt-24 xl:gap-[140px] xl:pt-[140px]">
        {billingCardGroups.map((g) => (
          <section key={g.h2} className="px-5">
            <div className="mx-auto max-w-content">
              <div className="mx-auto max-w-[760px] text-center">
                <Eyebrow>{g.eyebrow}</Eyebrow>
                <SectionH2 className="mt-3">{g.h2}</SectionH2>
                <Intro className="mt-5">{g.intro}</Intro>
              </div>
              {g.shots && (
                <div className="mt-12 grid grid-cols-2 gap-4 xl:grid-cols-4">
                  {g.shots.map((s) => (
                    <Img key={s} src={s} w="full" h={480} radius={12} alt="" fit="contain" />
                  ))}
                </div>
              )}
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {g.cards.map((c) => <LinkCard key={c.title} {...c} />)}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* y=9614 — sibling solutions. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="mx-auto max-w-[680px] text-center">
            {billingRelated.h2}
          </SectionH2>
          <div className="mx-auto mt-10 grid max-w-[1100px] gap-4 md:grid-cols-3">
            {billingRelated.links.map((l) => (
              <Link key={l.title} to={l.to}
                    className="flex flex-col gap-2 rounded-[10px] border border-rule bg-white p-6
                               transition-colors duration-200 ease-color hover:bg-surface">
                <span className="text-[18px] font-medium leading-[21.6px] text-ink">{l.title}</span>
                <span className="text-[15px] leading-[21px] text-muted">{l.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* y=10148 — FAQ. Rows toggle independently; row 1 ships open. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">FAQs</SectionH2>
          <div className="mt-10"><Faq items={billingFaq} /></div>
        </div>
      </section>

      <ArticleRail {...billingArticles} />

      {/* y=11306 — closing CTA over the 1584x452 illustration, with the three
          audience tiles at y=11583. */}
      <section className="relative overflow-hidden px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <h3 className="mx-auto max-w-[680px] font-display text-[30px] font-bold leading-[33px]
                         tracking-[-0.06em] text-ink xl:text-[48px] xl:leading-[52.8px]">
            {billingCta.h3}
          </h3>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
          <div className="mt-14 flex flex-wrap items-end justify-center gap-8">
            {billingCta.tiles.map((t) => (
              <figure key={t.label} className="flex flex-col items-center gap-3">
                <Img src={t.img} w={t.w} h={t.h} radius={12} alt={t.label} fit="contain" />
                <figcaption className="text-[15px] font-medium text-ink">{t.label}</figcaption>
              </figure>
            ))}
          </div>
          <img src={billingCta.art} alt="" aria-hidden="true" loading="lazy" decoding="async"
               className="pointer-events-none mx-auto mt-12 hidden h-[452px] w-full max-w-none
                          object-contain xl:block" />
        </div>
      </section>
    </>
  )
}
