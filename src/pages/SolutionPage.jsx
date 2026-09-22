import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2, Intro, FeatureRow, Faq, ArticleRail } from '../components/PageParts'
import Ticker from '../components/Ticker'
import { solutionsPages } from '../data/solutions'
import { billingArticles } from '../data/billing'
import NotFound from './NotFound'

/* Shared renderer for /solutions/{expenses,payroll,subsidy}.

   These three genuinely share the /solutions/billing skeleton - hero, feature
   rows, sibling links, FAQ, article rail, CTA - which measurement confirmed
   before this was written. /solutions/billing itself stays a hand-built page
   because it carries extra sections (a testimonial band and three card
   grids) the others do not, and /solutions/ai differs again. Pages in this
   group are bespoke by default; this component covers the three that match. */
export default function SolutionPage() {
  const { slug } = useParams()
  const page = solutionsPages[slug]
  if (!page) return <NotFound />

  return (
    <>
      {/* Hero: H1 68/68 at y=216, subhead 440, over the page's own band. */}
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

      {/* y=1308 — intro band. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <SectionH2 size={48} className="mx-auto max-w-[760px]">{page.intro.h2}</SectionH2>
          <h2 className="mx-auto mt-5 max-w-[680px] text-[17px] font-normal leading-[23.8px] text-muted">
            {page.intro.sub}
          </h2>
          <ul className="mx-auto mt-8 flex max-w-[860px] flex-wrap justify-center gap-x-10 gap-y-3">
            {page.intro.labels.map((l) => (
              <li key={l} className="text-[16px] font-medium leading-[24px] text-ink">{l}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alternating feature rows. */}
      <div className="flex flex-col gap-24 pt-24 xl:gap-[140px] xl:pt-[140px]">
        {page.rows.map((r) => <FeatureRow key={r.title} {...r} />)}
      </div>

      {/* Sibling solutions — the current page is dropped from the list. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="mx-auto max-w-[680px] text-center">
            {page.related.h2}
          </SectionH2>
          <div className="mx-auto mt-10 grid max-w-[1100px] gap-4 md:grid-cols-3">
            {page.related.links.filter((l) => l.to !== `/solutions/${slug}`).map((l) => (
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

      {/* FAQ — rows toggle independently, row 1 open, as measured. */}
      <section className="px-5 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content">
          <SectionH2 size={48} className="text-center">FAQs</SectionH2>
          <div className="mt-10"><Faq items={page.faq} /></div>
        </div>
      </section>

      {/* The article rail is the same set across these pages on the original. */}
      <ArticleRail {...billingArticles} />

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
