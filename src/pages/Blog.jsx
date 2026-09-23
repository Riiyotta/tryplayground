import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2 } from '../components/PageParts'
import { useState } from 'react'
import { blogIndex } from '../data/feeds'

/* /blog — the original groups 213 posts under category headings with a
   "See all" link per group. The first 8 per category are rendered here (see
   feeds.js); the page states that rather than implying a full archive. */
export default function Blog() {
  /* The original carries a category filter bar the clone was missing
     entirely - measured at y=453, starting x=225, a single row of "All" plus
     the seven category names at 14px/rgb(39,42,46) separated by small
     dividers. The clone had no bar and instead used the category names as
     section headings scattered down the page (y=973/1721/2470). */
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All'
    ? blogIndex.categories
    : blogIndex.categories.filter((c) => c.name === filter)

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

      <nav aria-label="Filter by category" className="px-5 pt-10">
        <ul className="mx-auto flex max-w-content flex-wrap items-center gap-x-5 gap-y-2">
          {/* The original's bar lists All + the first six categories only and
              fits on one row at y=453 - it does not enumerate all thirteen.
              The rest stay reachable by scrolling to their section. */}
          {['All', ...blogIndex.categories.map((c) => c.name).filter((n) => n !== 'Latest').slice(0, 6)].map((name, i) => (
            <li key={name} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden="true" className="text-[12px] text-black/30">/</span>}
              <button
                onClick={() => setFilter(name)}
                aria-current={filter === name ? 'true' : undefined}
                className={`text-[14px] leading-[17px] hover-color
                            ${filter === name
                              ? 'font-medium text-[#272A2E]'
                              : 'text-muted hover:text-[#272A2E]'}`}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-16 px-5 pt-16 xl:gap-24">
        {shown.map((cat) => (
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
