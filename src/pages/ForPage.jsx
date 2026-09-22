import { useParams } from 'react-router-dom'
import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2, CheckList, Faq } from '../components/PageParts'
import Ticker from '../components/Ticker'
import { forPages } from '../data/forPages'
import NotFound from './NotFound'

/* Shared renderer for /for/{centers,home-based,multi-site,head-start}.
   Measurement showed these four share a shape - hero, wide feature sections,
   FAQ, CTA - so they are data-driven rather than four near-identical files.
   Sections without artwork on the original render as a centred copy block,
   which is how the original lays them out. */
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
