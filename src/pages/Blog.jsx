import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2 } from '../components/PageParts'
import { blogIndex } from '../data/feeds'

/* /blog — the original groups 213 posts under category headings with a
   "See all" link per group. The first 8 per category are rendered here (see
   feeds.js); the page states that rather than implying a full archive. */
export default function Blog() {
  return (
    <>
      <section className="hero-cream pt-[56px]">
        <div className="mx-auto max-w-content px-5 pb-16 text-center">
          <h1 className="mx-auto max-w-[860px] font-display font-bold tracking-[-0.059em] text-ink
                         text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                         xl:text-[68px] xl:leading-[68px]">
            {blogIndex.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-body text-muted">{blogIndex.sub}</p>
          <p className="mt-3 text-[14px] text-muted">{blogIndex.note}</p>
        </div>
      </section>

      <div className="flex flex-col gap-16 px-5 pt-16 xl:gap-24">
        {blogIndex.categories.map((cat) => (
          <section key={cat.name}>
            <div className="mx-auto max-w-content">
              <div className="flex items-baseline justify-between gap-4">
                {/* These are 14px category labels on the original, not
                    section headings - measured 14px/16.8px, CircularXX TT
                    Book (w450, so 500 in Manrope), rgb(39,42,46), tracking
                    normal. An earlier pass rendered them as 32px h2s, i.e.
                    more than twice their real size. Kept as an h2 for the
                    document outline; only the type is corrected. */}
                <h2 className="font-display text-[14px] font-medium leading-[16.8px]
                               tracking-normal text-[#272A2E]">
                  {cat.name}
                </h2>
                <a href="#" className="shrink-0 text-[15px] font-medium text-link-blue hover-color">
                  See all
                </a>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {cat.posts.map((p) => (
                  <a key={p.t} href="#" className="group flex flex-col gap-3">
                    {/* Measured on the original: an 8px-radius well with an
                        INSET shadow (311 uses, the site's only inset) over
                        #FBF9F7 - a blog-local fill one channel off the global
                        surface token. */}
                    <div className="overflow-hidden rounded-well bg-blog-surface shadow-well">
                      <Img src={p.img} w="full" h={213} radius={0} alt={p.t} fit="cover"
                           className="transition-transform duration-500 ease-move group-hover:scale-[1.03]" />
                    </div>
                    <p className="text-[16px] font-medium leading-[22px] text-ink
                                  transition-colors duration-200 ease-color group-hover:text-accent">
                      {p.t}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

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
