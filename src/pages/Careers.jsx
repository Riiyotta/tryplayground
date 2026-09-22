import { PrimaryButton, Img } from '../components/Primitives'
import { Eyebrow, SectionH2, Intro } from '../components/PageParts'
import {
  careersHero, careersMission, careersLoved, careersTiming, careersLife,
  careersValues, careersPerks, careersOffices, careersProcess,
} from '../data/careers'

/* /careers — original measures 12,158px at 1440 with 17 h2s. */
export default function Careers() {
  return (
    <>
      <section className="hero-cream pt-[56px]">
        <div className="mx-auto max-w-content px-5 pb-16 text-center">
          <Eyebrow>{careersHero.eyebrow}</Eyebrow>
          {/* The original opens this page with an h2 and carries no h1 at all.
              Rendered as an h1 here at the same measured size (60/66 w700) so
              the page has exactly one top-level heading, which the original's
              own markup does not provide. */}
          <h1 className="mx-auto mt-4 max-w-[860px] font-display font-bold tracking-[-0.06em] text-ink
                         text-[34px] leading-[36px] md:text-[48px] md:leading-[52.8px]
                         xl:text-[60px] xl:leading-[66px]">
            {careersHero.h2}
          </h1>
          <Intro className="mx-auto mt-5 max-w-[560px]">{careersHero.sub}</Intro>
          <PrimaryButton className="mt-8 h-[48px]">See open roles</PrimaryButton>
          <div className="mt-12 flex flex-wrap items-end justify-center gap-4">
            {careersHero.photos.map((p) => (
              <Img key={p.src} src={p.src} w={p.w} h={p.h} radius={12} alt="" fit="cover" />
            ))}
          </div>
        </div>
      </section>

      {/* y=1186 */}
      <section className="relative overflow-hidden px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <SectionH2 size={48} className="mx-auto max-w-[680px]">{careersMission.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[620px]">{careersMission.body}</Intro>
          <Img src={careersMission.art} w="full" h={505} radius={12} alt="" fit="contain"
               className="mx-auto mt-12 max-w-[928px]" />
        </div>
      </section>

      {/* y=2146 — the review wall, shared with /about. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <SectionH2 size={48}>{careersLoved.h2}</SectionH2>
          <ul className="mt-10 grid gap-4 text-left md:grid-cols-2 xl:grid-cols-3">
            {careersLoved.reviews.map((r) => (
              <li key={r} className="rounded-card border border-rule bg-white p-6
                                     text-[16px] leading-[24px] text-body-alt">{r}</li>
            ))}
          </ul>
          <img src={careersLoved.investor} alt="Kleiner Perkins" loading="lazy" decoding="async"
               className="mx-auto mt-12 h-[25px] w-[238px] object-contain opacity-70" />
        </div>
      </section>

      {/* y=2748 */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-[760px] rounded-card bg-surface px-8 py-14 text-center">
          <SectionH2 size={48}>{careersTiming.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[620px]">{careersTiming.body}</Intro>
        </div>
      </section>

      {/* y=3278 */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <SectionH2 size={48}>{careersLife.h2}</SectionH2>
          <Intro className="mx-auto mt-5 max-w-[560px]">{careersLife.sub}</Intro>
          <blockquote className="mx-auto mt-12 max-w-[760px] font-display text-[24px] font-bold
                                 leading-[32px] tracking-[-0.02em] text-ink xl:text-[32px] xl:leading-[40px]">
            {careersLife.quote}
          </blockquote>
        </div>
      </section>

      {/* y=4858 */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">{careersValues.h2}</SectionH2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {careersValues.items.map((v) => (
              <div key={v.t} className="rounded-card border border-rule bg-white p-8">
                <h3 className="text-[18px] font-medium leading-[21.6px] text-ink">{v.t}</h3>
                <p className="mt-3 text-[16px] leading-[24px] text-muted">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* y=5627 — perks. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">{careersPerks.h2}</SectionH2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {careersPerks.items.map((p) => (
              <div key={p.t} className="rounded-card bg-surface p-6">
                <h3 className="text-[16px] font-medium leading-[22px] text-ink">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-[21px] text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* y=6581 — offices. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="mx-auto max-w-[680px] text-center">
            {careersOffices.h2}
          </SectionH2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {careersOffices.items.map((o) => (
              <div key={o.city} className="overflow-hidden rounded-card bg-surface">
                <Img src={o.img} w="full" h={300} radius={0} alt="" fit="cover" />
                <div className="p-8">
                  <h3 className="font-display text-[24px] font-bold tracking-[-0.03em] text-ink">
                    {o.city}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[24px] text-muted">{o.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring process + closing CTA. */}
      <section className="px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionH2 size={48}>{careersProcess.h2}</SectionH2>
          <ol className="mt-10 flex flex-col gap-4 text-left">
            {careersProcess.steps.map((s, i) => (
              <li key={s} className="flex gap-4 rounded-card border border-rule bg-white p-6">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent
                                 text-[14px] font-semibold text-white">{i + 1}</span>
                <span className="text-[16px] leading-[24px] text-body-alt">{s}</span>
              </li>
            ))}
          </ol>
          <PrimaryButton className="mt-10 h-[48px]">See open roles</PrimaryButton>
        </div>
      </section>
    </>
  )
}
