import { useParams } from 'react-router-dom'
import { PrimaryButton, Img } from '../components/Primitives'
import { SectionH2 } from '../components/PageParts'
import { indexPages } from '../data/indexPages'
import NotFound from './NotFound'

/* Shared renderer for the card-grid index pages (/webinars, /resources).
   Card geometry is measured per page and carried in the data - webinar
   covers are 343x205 landscape, resource covers 181x271 portrait - so the
   grid column count differs between them rather than being hard-coded here. */
export default function IndexPage({ name }) {
  /* The routes are registered at literal paths (/webinars, /resources), so
     useParams carries no slug - the key comes in as a prop, with the param
     kept as a fallback in case this is ever mounted under a :slug route. */
  const { slug } = useParams()
  const page = indexPages[name || slug]
  if (!page) return <NotFound />

  return (
    <>
      <section className="hero-cream pt-[56px]">
        <div className="mx-auto max-w-content px-5 pb-16 text-center">
          <h1 className="mx-auto max-w-[900px] font-display font-bold tracking-[-0.059em] text-ink
                         text-[34px] leading-[34px] md:text-[48px] md:leading-[48px]
                         xl:text-[68px] xl:leading-[68px]">
            {page.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-body text-muted">{page.sub}</p>
        </div>
      </section>

      <section className="px-5 pt-16">
        <div className="mx-auto max-w-content">
          <div className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 ${page.cols}`}>
            {page.items.map((it) => (
              <a key={it.t} href="#" className="group flex flex-col gap-3">
                <div className="overflow-hidden rounded-card bg-surface">
                  <Img src={it.img} w="full" h={page.cardH} radius={0} alt="" fit="cover"
                       className="transition-transform duration-500 ease-move group-hover:scale-[1.03]" />
                </div>
                <p className="text-[16px] font-medium leading-[22px] text-ink
                              transition-colors duration-200 ease-color group-hover:text-accent">
                  {it.t}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-24 xl:pt-[140px]">
        <div className="mx-auto max-w-content text-center">
          <SectionH2 size={48} className="mx-auto max-w-[680px]">{page.cta}</SectionH2>
          <PrimaryButton className="mt-8 h-[48px]">Get a free demo</PrimaryButton>
        </div>
      </section>
    </>
  )
}
