import { useParams } from 'react-router-dom'
import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2, CheckList, Faq, TestimonialBand } from '../components/PageParts'
import Ticker from '../components/Ticker'
import { forPages } from '../data/forPages'
import NotFound from './NotFound'

/* Shared renderer for /for/{centers,home-based,multi-site,head-start}.
   Measurement showed these four share a shape - hero, wide feature sections,
   FAQ, CTA - so they are data-driven rather than four near-identical files.
   Sections without artwork on the original render as a centred copy block,
   which is how the original lays them out. */
/* The third support card is a miniature changelog. Measured verbatim from
   /for/directors at y=8040-8250: five rows, 300x46, r10px, alternating on a
   #F2F1F0 fill with the third row white. */
const SUPPORT_RELEASES = [
  { t: 'Added Food programs', v: '4.1', d: '3/21/25' },
  { t: 'Improved navigation', v: '4.2', d: '4/3/25' },
  { t: 'New Quickbooks connector', v: '4.3', d: '4/18/25' },
  { t: 'Faster attendance check-in', v: '4.4', d: '5/2/25' },
  { t: 'Subsidy report exports', v: '4.5', d: '5/20/25' },
]

export default function ForPage() {
  const { slug } = useParams()
  const page = forPages[slug]
  if (!page) return <NotFound />

  return (
    <>
      <section className="hero-cream relative overflow-hidden pt-[56px]">
        <img src={page.backdrop} alt="" aria-hidden="true" decoding="async"
             className="pointer-events-none absolute inset-x-0 top-[340px] hidden h-[507px] w-full
                        max-w-none object-cover xl:block" />
        <div className="relative z-10 mx-auto grid max-w-content items-center gap-10 px-5 pb-20
                        xl:grid-cols-[1fr_409px] xl:gap-16">
          <div className="max-w-[640px]">
            <h1 className="font-display font-bold tracking-[-0.059em] text-ink
                           text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                           xl:text-[68px] xl:leading-[68px]">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-[520px] text-body text-muted">{page.sub}</p>
            <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
          </div>
          <Img src={page.shot} w={409} h={547} radius={14} alt="" fit="contain"
               className="mx-auto max-w-full" />
        </div>
      </section>

      <Ticker />

      {/* A customer-story band before the main feature rows - measured on
          multi-site at y=2727, only present when the page data has one. */}
      {page.story1 && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto max-w-content">
            <div className="mb-8 flex justify-center">
              <Img src={page.story1.logo} w={page.story1.logoW} h={page.story1.logoH}
                   alt="" fit="contain" />
            </div>
            <div className="grid items-center gap-10 xl:grid-cols-2 xl:gap-16">
              <div className="relative mx-auto aspect-[450/456] w-full max-w-[450px]">
                <img src={page.story1.portrait} alt="" loading="lazy" decoding="async"
                     className="absolute inset-[10.5%] h-[79%] w-[79%] object-cover" />
                <img src={page.story1.frame} alt="" aria-hidden="true" loading="lazy" decoding="async"
                     className="absolute inset-0 z-10 h-full w-full object-contain" />
              </div>
              <div className="max-w-[520px]">
                <SectionH2>{page.story1.title}</SectionH2>
                <p className="mt-6 text-[18px] font-medium leading-[26px] text-ink">
                  {page.story1.quote}
                </p>
                {page.story1.img && (
                  /* flex-wrap + min-w-0 on the Img: without them a 362px-wide
                     image plus caption text won't shrink inside a 390px
                     viewport and pushes document.scrollWidth out by ~46px -
                     confirmed as the actual (not the ticker, which was a red
                     herring) cause of a real horizontal-scroll bug here. */
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Img src={page.story1.img} w={page.story1.imgW} h={page.story1.imgH}
                         radius={10} alt="" fit="contain" className="min-w-0 max-w-full" />
                    {page.story1.caption && (
                      <p className="text-[15px] font-medium text-muted">{page.story1.caption}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-24 pt-24 xl:gap-[140px] xl:pt-[140px]">
        {page.sections.map((s, i) => (
          s.img ? (
            <section key={s.title} className="px-5">
              <div className={`mx-auto grid max-w-content items-center gap-10 xl:grid-cols-2 xl:gap-16
                               ${s.flip ? 'xl:[&>*:first-child]:order-2' : ''}`}>
                <div className="max-w-[520px]">
                  <SectionH2>{s.title}</SectionH2>
                  {s.intro && (
                    <p className="mt-5 max-w-[500px] text-[17px] leading-[23.8px] text-muted">
                      {s.intro}
                    </p>
                  )}
                  {s.items && <CheckList items={s.items} className="mt-8" />}
                </div>
                <div className="flex justify-center">
                  <Img src={s.img} w={s.imgW} h={s.imgH} radius={10} alt="" fit="contain"
                       className="max-w-full" />
                </div>
              </div>
            </section>
          ) : (
            <section key={s.title} className="px-5">
              <div className="mx-auto max-w-[760px] text-center">
                <SectionH2>{s.title}</SectionH2>
                {s.intro && (
                  <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[23.8px] text-muted">
                    {s.intro}
                  </p>
                )}
                {s.items && (
                  <div className="mx-auto mt-8 max-w-[520px] text-left">
                    <CheckList items={s.items} />
                  </div>
                )}
              </div>
            </section>
          )
        ))}
      </div>

      {/* y=8932 on multi-site — a 2x2 API/MCP capability grid, a different
          shape from the alternating rows above. */}
      {page.apiGrid && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto max-w-content text-center">
            <SectionH2 className="mx-auto max-w-[720px]">{page.apiGrid.title}</SectionH2>
            <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-[23.8px] text-muted">
              {page.apiGrid.intro}
            </p>
            <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
              {page.apiGrid.cards.map((c) => (
                <div key={c.t} className="flex flex-col gap-4 rounded-card border border-rule bg-white p-6">
                  {c.img && (
                    <Img src={c.img} w="full" h={180} radius={8} alt="" fit="cover" />
                  )}
                  <div>
                    <h3 className="text-[18px] font-medium leading-[21.6px] text-ink">{c.t}</h3>
                    <p className="mt-2 text-[15px] leading-[22px] text-muted">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* y=10455 on multi-site — a second customer band, same shape as
          story1 but reusing the shared TestimonialBand for the simpler
          single-quote case. */}
      {page.story2 && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto max-w-content">
            <div className="mb-8 flex justify-center">
              <Img src={page.story2.logo} w={page.story2.logoW} h={page.story2.logoH}
                   alt="" fit="contain" />
            </div>
            <TestimonialBand
              h2={page.story2.title}
              frame={page.story2.frame}
              portrait={page.story2.portrait}
              items={[{ quote: page.story2.quote, name: '', role: '' }]}
            />
          </div>
        </section>
      )}

      {/* y=10910 on multi-site — the Camber capability grid, same shape as
          /solutions/ai's aiSkills. */}
      {page.aiBand && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto max-w-content">
            <SectionH2 className="mx-auto max-w-[760px] text-center">{page.aiBand.title}</SectionH2>
            <p className="mx-auto mt-5 max-w-[680px] text-center text-[17px] leading-[23.8px] text-muted">
              {page.aiBand.intro}
            </p>
            <div className="mt-12 grid gap-4 xl:grid-cols-3">
              {page.aiBand.cards.map((c) => (
                <article key={c.title} className="flex flex-col overflow-hidden rounded-card bg-surface">
                  <Img src={c.img} w="full" h={320} radius={0} alt="" fit="contain" />
                  <div className="flex flex-col gap-3 p-8">
                    <h3 className="text-[18px] font-medium leading-[21.6px] text-ink">{c.title}</h3>
                    <p className="text-[15px] leading-[22px] text-body-alt">{c.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* y=7254 on /for/directors — an image + copy + link band offering the
          Savings Club. Measured: image 603x352 at x=112, heading at the same
          y as the image top, so the two columns are top-aligned, not centred. */}
      {page.savingsClub && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto grid max-w-content items-center gap-10 xl:grid-cols-2 xl:gap-16">
            <Img src="/assets/for/savings-club.png" w={603} h={352} alt="" fit="contain"
                 className="max-w-full" />
            <div className="max-w-[520px]">
              <SectionH2>Get access to the Playground Savings Club</SectionH2>
              <p className="mt-5 text-lead text-muted">
                Playground customers get 10–40% off the supplies they already buy
                with the exclusive Savings Club.
              </p>
              <a href="#" className="mt-6 inline-flex items-center gap-1 text-body font-medium
                                     text-ink hover-color">
                See how it works
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* y=7746 on /for/directors — a centred heading + intro over three
          315x540 cards (r12px, bg #FBFAF9) at x=216/563/909, i.e. a 3-col
          grid on the 1216 container with a 32px gutter. Card 1 carries the
          support-rating badge, card 2 is copy-only, card 3 is a release list.
          Card CTAs sit at a shared y=8467, so the body area is fixed-height
          and the link is pinned to the card bottom. */}
      {page.support && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto max-w-content text-center">
            <SectionH2 className="mx-auto max-w-[760px]">{page.support.title}</SectionH2>
            <p className="mx-auto mt-5 max-w-[620px] text-lead text-muted">{page.support.intro}</p>
            <div className="mt-12 grid gap-8 text-left xl:grid-cols-3">
              {page.support.cards.map((c, i) => (
                <div key={c.title}
                     className="flex flex-col rounded-card bg-surface p-8 xl:h-[540px]">
                  <div className="flex min-h-[150px] flex-1 items-start justify-center">
                    {i === 0 && (
                      <img src="/assets/for/support-badge.png" alt="" loading="lazy"
                           decoding="async" width={259} height={120}
                           className="h-auto w-[259px] max-w-full" />
                    )}
                    {i === 2 && (
                      <ul className="w-full space-y-2">
                        {SUPPORT_RELEASES.map((r) => (
                          <li key={r.t}
                              className="flex items-center justify-between rounded-[10px]
                                         bg-[#F2F1F0] px-4 py-3">
                            <span className="text-footer font-medium text-[rgba(28,25,23,0.6)]">{r.t}</span>
                            <span className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold leading-[16.8px] text-[#867F7A]">{r.v}</span>
                              <span className="text-[12px] font-medium leading-[16.2px] text-[rgba(121,113,107,0.6)]">{r.d}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <h3 className="text-feature font-medium text-[rgba(0,0,0,0.9)]">{c.title}</h3>
                  <p className="mt-2 text-small text-[rgba(121,113,107,0.9)]">{c.desc}</p>
                  {c.primary ? (
                    <PrimaryButton className="mt-6 h-[40px] self-start">{c.cta}</PrimaryButton>
                  ) : (
                    <a href="#" className="mt-6 inline-flex h-[40px] items-center justify-center
                                           self-start rounded-btn bg-btn-secondary px-5 text-body
                                           font-medium text-ink hover-color">
                      {c.cta}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* y=5674 on /for/head-start - a 2x2 tile grid under a 48px heading.
          Tile headings measure 18px/w500 at x=198/758 on the 1216 container,
          rows at y=5904 and y=6149, i.e. a 245px row pitch. */}
      {page.tileGrid && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto max-w-content">
            <SectionH2 className="max-w-[760px]">{page.tileGrid.title}</SectionH2>
            <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
              {page.tileGrid.tiles.map((t) => (
                <div key={t.t}>
                  <h3 className="text-feature font-medium text-ink">{t.t}</h3>
                  <p className="mt-3 text-small text-muted">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* y=7332 - a 32px pull-quote with attribution beneath. */}
      {page.pullQuote && (
        <section className="px-5 pt-24 xl:pt-[140px]">
          <div className="mx-auto max-w-[860px] text-center">
            <blockquote className="font-display text-[24px] font-bold leading-[30px]
                                   tracking-[-0.03em] text-ink xl:text-[32px] xl:leading-[35.2px]">
              &ldquo;{page.pullQuote.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-body font-medium text-ink">{page.pullQuote.who}</p>
            <p className="text-small text-muted">{page.pullQuote.role}</p>
          </div>
        </section>
      )}

      {/* FAQ — on these pages NO row ships open (row 1 measures 598x44, the
          question only), so none is defaulted open here. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">FAQs</SectionH2>
          <div className="mt-10"><Faq items={page.faq} openFirst={false} /></div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <h3 className="mx-auto max-w-[680px] font-display text-[30px] font-bold leading-[33px]
                         tracking-[-0.06em] text-ink xl:text-[48px] xl:leading-[52.8px]">
            {page.cta}
          </h3>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
        </div>
      </section>
    </>
  )
}
