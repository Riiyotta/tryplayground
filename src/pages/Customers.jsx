import { PrimaryButton, SecondaryButton, Img } from '../components/Primitives'
import { SectionH2 } from '../components/PageParts'
import Ticker from '../components/Ticker'
import {
  customersHero, customersFeatured, customersWall, customersCta, customersFrame,
} from '../data/customers'

/* /customers — original measures 5,625px at 1440. A hero, six customer
   stories (two of which carry a portrait inside the 450x456 orange frame and
   a stat block), the "Wall of love" quote grid at y=2581, then the shared
   closing CTA at y=3976. */
export default function Customers() {
  return (
    <>
      <section className="hero-cream pt-[56px]">
        <div className="mx-auto max-w-content px-5 pb-16 text-center">
          <h1 className="mx-auto max-w-[860px] font-display font-bold tracking-[-0.06em] text-ink
                         text-[34px] leading-[36px] md:text-[48px] md:leading-[52.8px]
                         xl:text-[60px] xl:leading-[66px]">
            {customersHero.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-body text-muted">{customersHero.sub}</p>
        </div>
      </section>

      {/* Featured stories. The two with a portrait run as a two-column row;
          the rest are quote cards, as measured. */}
      <section className="px-5 pt-16 xl:pt-[80px]">
        <div className="mx-auto flex max-w-content flex-col gap-16 xl:gap-[100px]">
          {customersFeatured.map((c) => (
            c.portrait ? (
              <div key={c.name} className="grid items-center gap-10 xl:grid-cols-2 xl:gap-16">
                <div className="relative mx-auto aspect-[450/456] w-full max-w-[450px]">
                  <img src={c.portrait} alt="" loading="lazy" decoding="async"
                       className="absolute inset-[10.5%] h-[79%] w-[79%] object-cover" />
                  <img src={customersFrame} alt="" aria-hidden="true" loading="lazy" decoding="async"
                       className="absolute inset-0 z-10 h-full w-full object-contain" />
                </div>
                <blockquote className="max-w-[520px]">
                  <p className="text-[15px] font-medium leading-[18px] text-ink">{c.name}</p>
                  <p className="text-[15px] leading-[18px] text-muted">{c.org}</p>
                  <p className="mt-5 text-[24px] font-semibold leading-[30px] tracking-[0.02em] text-quote">
                    {c.quote}
                  </p>
                  {c.stats && (
                    <div className="mt-8 flex flex-wrap gap-10">
                      {c.stats.map((s) => (
                        <div key={s.l}>
                          <p className="font-display text-[40px] font-bold leading-[44px] text-ink">{s.v}</p>
                          <p className="mt-1 max-w-[180px] text-[14px] leading-[20px] text-muted">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {c.cta && <SecondaryButton className="h-[44px]">{c.cta}</SecondaryButton>}
                    {c.video && (
                      <button className="flex items-center gap-2 text-[15px] font-medium text-link-blue hover-color">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent">
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="#fff" aria-hidden="true">
                            <path d="M5 3.5v9l7.5-4.5z" />
                          </svg>
                        </span>
                        {c.video}
                      </button>
                    )}
                  </div>
                </blockquote>
              </div>
            ) : null
          ))}

          {/* Quote-only stories, two up. */}
          <div className="grid gap-6 md:grid-cols-2">
            {customersFeatured.filter((c) => !c.portrait).map((c) => (
              <blockquote key={c.name}
                          className="flex flex-col rounded-card border border-rule bg-white p-8">
                <p className="flex-1 text-[18px] font-medium leading-[26px] text-ink">{c.quote}</p>
                <footer className="mt-6">
                  <p className="text-[15px] font-medium leading-[18px] text-ink">{c.name}</p>
                  <p className="text-[15px] leading-[18px] text-muted">{c.org}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* y=2581 — Wall of love. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 className="text-center">{customersWall.h2}</SectionH2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {customersWall.items.map((w) => (
              <blockquote key={w.q}
                          className="flex flex-col rounded-card bg-surface p-6">
                <p className="flex-1 text-[16px] leading-[24px] text-body-alt">{w.q}</p>
                <footer className="mt-5">
                  {w.by && <p className="text-[14px] font-medium leading-[18px] text-ink">{w.by}</p>}
                  {w.org && <p className="text-[14px] leading-[18px] text-muted">{w.org}</p>}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      {/* y=3976 — closing CTA. */}
      <section className="relative overflow-hidden px-5 pb-24 pt-24 xl:pt-[140px]">
        <img src={customersCta.backdrop} alt="" aria-hidden="true" loading="lazy" decoding="async"
             className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[658px] w-full
                        max-w-none object-cover xl:block" />
        <div className="relative z-10 mx-auto max-w-content text-center">
          <SectionH2 size={48} className="mx-auto max-w-[680px]">{customersCta.h3}</SectionH2>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
          <div className="mt-14 flex flex-wrap items-end justify-center gap-8">
            {customersCta.tiles.map((t) => (
              <figure key={t.label} className="flex flex-col items-center gap-3">
                <Img src={t.img} w={t.w} h={t.h} radius={12} alt={t.label} fit="contain" />
                <figcaption className="text-[15px] font-medium text-ink">{t.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
