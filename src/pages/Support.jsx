import { PrimaryButton, Img } from '../components/Primitives'
import { Eyebrow, SectionH2, CheckList, FeatureRow } from '../components/PageParts'
import Ticker from '../components/Ticker'
import {
  supportHero, supportRows, supportChangelog, supportHelpCenter, supportCta,
} from '../data/support'

/* /support — original measures 5,290px at 1440 with 11 h2s and 15 unique
   images. Five alternating copy/media rows; the fourth swaps its photo for
   an inline release list, and the fifth ends in a link rather than a CTA. */
export default function Support() {
  return (
    <>
      {/* Hero: H1 at y=195, subhead 351, CTA 420, over a 1903x507 band. */}
      <section className="hero-cream relative overflow-hidden pt-[56px]">
        <img src={supportHero.backdrop} alt="" aria-hidden="true" decoding="async"
             className="pointer-events-none absolute inset-x-0 top-[220px] hidden h-[507px]
                        w-full max-w-none object-cover xl:block" />
        <div className="relative z-10 mx-auto max-w-[1040px] px-5 pb-24 text-center">
          <h1 className="mx-auto max-w-[900px] font-display font-bold tracking-[-0.059em] text-ink
                         text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                         xl:text-[68px] xl:leading-[68px]">
            {supportHero.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-body text-muted">{supportHero.sub}</p>
          <PrimaryButton className="mt-8 h-[48px]">{supportHero.cta}</PrimaryButton>
        </div>
      </section>

      <Ticker />

      {/* y=963 / 1542 / 2121 — the first three rows. */}
      <div className="flex flex-col gap-24 pt-24 xl:gap-[140px] xl:pt-[140px]">
        {supportRows.map((r) => <FeatureRow key={r.title} {...r} />)}
      </div>

      {/* y=2660 — same row rhythm, but the media column is a release list. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto grid max-w-content items-center gap-10 xl:grid-cols-2 xl:gap-16">
          <div className="max-w-[520px]">
            <Eyebrow>{supportChangelog.eyebrow}</Eyebrow>
            <SectionH2 size={48} className="mt-3">{supportChangelog.title}</SectionH2>
            <h2 className="mt-5 max-w-[500px] text-[17px] font-normal leading-[23.8px] text-muted">
              {supportChangelog.intro}
            </h2>
            <CheckList items={supportChangelog.items} className="mt-8" />
            <a href="#" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-link-blue hover-color">
              {supportChangelog.link}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <ul className="flex flex-col gap-3">
            {supportChangelog.releases.map((r) => (
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

      {/* y=3275 — closes with a link rather than a button. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto grid max-w-content items-center gap-10 xl:grid-cols-2 xl:gap-16">
          <div className="order-2 flex justify-center xl:order-1">
            <Img src={supportHelpCenter.img} w={supportHelpCenter.imgW} h={supportHelpCenter.imgH}
                 radius={10} alt="" fit="contain" className="max-w-full" />
          </div>
          <div className="order-1 max-w-[520px] xl:order-2">
            <Eyebrow>{supportHelpCenter.eyebrow}</Eyebrow>
            <SectionH2 size={48} className="mt-3">{supportHelpCenter.title}</SectionH2>
            <h2 className="mt-5 max-w-[500px] text-[17px] font-normal leading-[23.8px] text-muted">
              {supportHelpCenter.intro}
            </h2>
            <CheckList items={supportHelpCenter.items} className="mt-8" />
            <a href="#" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-link-blue hover-color">
              {supportHelpCenter.link}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* y=3858 — closing band, 1440x464. */}
      <section className="relative overflow-hidden px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <SectionH2 size={48} className="mx-auto max-w-[760px]">{supportCta.h2}</SectionH2>
          <p className="mx-auto mt-5 max-w-[560px] text-body text-muted">{supportCta.sub}</p>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
          <img src={supportCta.art} alt="" aria-hidden="true" loading="lazy" decoding="async"
               className="mx-auto mt-12 h-[352px] w-[568px] max-w-full object-contain" />
        </div>
      </section>
    </>
  )
}
