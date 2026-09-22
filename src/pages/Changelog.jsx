import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2 } from '../components/PageParts'
import { changelogIndex } from '../data/feeds'

/* /changelog — the original measures 64,018px with 204 entries, lazy-loading
   far past what one viewport reports. The 24 most recent are rendered, which
   matches the page's own "Our latest releases" framing; the count is stated
   rather than implied. */
export default function Changelog() {
  return (
    <>
      <section className="hero-cream pt-[56px]">
        <div className="mx-auto max-w-content px-5 pb-16 text-center">
          <h1 className="font-display font-bold tracking-[-0.059em] text-ink
                         text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                         xl:text-[68px] xl:leading-[68px]">
            {changelogIndex.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-body text-muted">{changelogIndex.sub}</p>
        </div>
      </section>

      <section className="px-5 pt-16">
        <div className="mx-auto max-w-[900px]">
          {/* Wraps at narrow widths: `shrink-0` on the note kept it beside
              the heading and pushed the page sideways at 390px. */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <SectionH2 size={48} className="!text-[28px] !leading-[32px] xl:!text-[40px] xl:!leading-[44px]">
              {changelogIndex.heading}
            </SectionH2>
            <p className="text-[14px] text-muted">{changelogIndex.note}</p>
          </div>

          <ol className="mt-10 flex flex-col gap-10">
            {changelogIndex.entries.map((e) => (
              <li key={e.t} className="border-t border-rule pt-8 first:border-0 first:pt-0">
                {e.date && (
                  <p className="text-[14px] font-medium leading-[20px] text-muted">{e.date}</p>
                )}
                <h3 className="mt-2 font-display text-[20px] font-bold leading-[26px]
                               tracking-[-0.02em] text-ink">
                  {e.t}
                </h3>
                {e.img && (
                  <Img src={e.img} w="full" h={455} radius={12} alt="" fit="cover"
                       className="mt-5 max-w-[590px]" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <SectionH2 size={48} className="mx-auto max-w-[680px]">
            Book a demo and simplify every corner of your business
          </SectionH2>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
        </div>
      </section>
    </>
  )
}
