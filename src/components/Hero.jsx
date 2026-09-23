import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { heroTabs } from '../data/content'
import { PrimaryButton, Placeholder, Img } from './Primitives'

const Stars = () => (
  <span className="flex items-center gap-[2px]" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F5A524">
        <path d="m12 17.3-6.2 3.7 1.7-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.5 4.8 1.7 7z" />
      </svg>
    ))}
  </span>
)

/* Tab icons - generic glyphs standing in for the original's inline SVGs. */
const TabIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.8" aria-hidden="true" className="shrink-0">
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 9h18" />
  </svg>
)

const Arrow = ({ dir, onClick }) => (
  <button
    onClick={onClick}
    aria-label={dir === 'l' ? 'Previous' : 'Next'}
    className="hidden md:grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[50px]"
    style={{ background: 'rgba(68,25,6,0.04)' }}
  >
    <span className="grid h-9 w-9 place-items-center rounded-[40px] bg-white shadow-warm">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"
           style={{ transform: dir === 'l' ? 'rotate(180deg)' : 'none' }}>
        <path d="M6 3.5 10.5 8 6 12.5" stroke="#1C1917" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </button>
)

const TAB_IMG = {
  Attendance: '/assets/img/tab-attendance.webp',
  Billing: '/assets/img/tab-billing.webp',
  Communication: '/assets/img/tab-communication.webp',
  Registration: '/assets/img/tab-registration.webp',
  Paperwork: '/assets/img/tab-paperwork.webp',
  Payroll: '/assets/img/tab-payroll.webp',
  AI: '/assets/img/tab-ai.png',
}

/* Six-layer stacked shadow read verbatim off the original's thumb. */
const THUMB_SHADOW = [
  'rgba(0,0,0,0.04) 0px 0px 0px 1px',
  'rgba(0,0,0,0.04) 0px 1px 1px 0.5px',
  'rgba(0,0,0,0.04) 0px 3px 3px 1.5px',
  'rgba(0,0,0,0.04) 0px 6px 6px -3px',
  'rgba(0,0,0,0.04) 0px 12px 12px -6px',
  'rgba(0,0,0,0.04) 0px 24px 24px -12px',
].join(', ')

export default function Hero() {
  const [active, setActive] = useState(0)
  const railRef = useRef(null)
  const tabRefs = useRef([])
  const [thumb, setThumb] = useState({ left: 4, width: 0 })

  /* Measure the active button in rail-local coordinates so the thumb tracks
     real label widths (and stays right after a font swap or a resize). */
  useLayoutEffect(() => {
    const el = tabRefs.current[active], rail = railRef.current
    if (!el || !rail) return
    const set = () => setThumb({ left: el.offsetLeft, width: el.offsetWidth })
    set()
    const ro = new ResizeObserver(set)
    ro.observe(rail); ro.observe(el)
    return () => ro.disconnect()
  }, [active])

  /* ~4000ms measured cadence; wraps AI -> Attendance. `active` is a dependency
     so an explicit click restarts the dwell rather than inheriting a partly
     elapsed tick. */
  useEffect(() => {
    const id = setTimeout(
      () => setActive((i) => (i + 1) % heroTabs.length),
      4000,
    )
    return () => clearTimeout(id)
  }, [active])

  /* The rail DOES auto-advance, on a clean ~4000ms interval.

     An earlier pass recorded the opposite, because a CSS inventory of the
     original finds only 4 transition rules and zero @keyframes - the rail is
     driven by Framer Motion in JS, so getComputedStyle cannot see it. Watching
     the thumb's box while completely idle instead showed it moving in 40 of 40
     samples, stepping Billing -> Communication -> Registration -> Paperwork ->
     Payroll -> AI at +3751/4063/4010/4011/4016ms, then wrapping back to
     Attendance. Sampling it twice - once through CSS, once behaviourally - is
     what separated the two readings.

     Hovering the rail for 9s does NOT pause it (Billing -> Communication ->
     Registration advanced on the same cadence with the pointer held over the
     track), so the timer is unconditional. It is still cleared and restarted
     on an explicit click so a manual pick gets its full dwell. */
  const step = (d) => {
    setActive((i) => Math.min(heroTabs.length - 1, Math.max(0, i + d)))
    railRef.current?.scrollBy({ left: d * 160, behavior: 'smooth' })
  }

  return (
    /* Hero shell paints the cream gradient - measured 1440x1546, fading out
       at 64.5376%. */
    <section className="hero-cream relative overflow-hidden pt-[56px]">
      {/* Decorative hero illustrations, measured 471x480 (left) and 471x462
          (right) at y=681. Replaced with placeholders at identical size. */}
      <div className="pointer-events-none absolute inset-x-0 top-[600px] hidden xl:flex justify-between px-4">
        <Img src="/assets/img/hero-left.webp" w={471} h={480} fit="contain" alt="" />
        <Img src="/assets/img/hero-right.webp" w={471} h={462} fit="contain" alt="" />
      </div>

      {/* Hero copy column measured 800x408.81 at y=115 (pt 56).
          Inner eyebrow/H1/subhead group is 800x248.81 at y=171, gap 20px. */}
      <div className="relative z-10 mx-auto flex max-w-hero flex-col gap-5 px-4 pb-[10px] text-center">
        {/* Eyebrow pill - 13px/15.6, with a circular blue arrow at its end. */}
        {/* Measured 614.1x28 at x=412.9 — the pill hugs its text rather than
            filling the column, so it must not stretch as a flex child. */}
        <a href="#"
           className="flex max-w-full self-center items-center justify-center gap-[10px] overflow-hidden"
           style={{ background: '#EEF5FF', borderRadius: 61, padding: '6px 6px 6px 12px', border: 'none' }}>
          <span className="text-center text-[13px] font-medium leading-[15.6px]"
                style={{ color: '#183390' }}>
            Arizona, Iowa, Idaho, Kansas, New York and providers have access to Playground at no cost
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
               className="shrink-0">
            <path d="M6 3.5 10.5 8 6 12.5" stroke="#183390" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* H1 - 68/68/-0.059em at 1440, 48px at 768, 34px at 390. */}
        <h1 className="mx-auto max-w-hero font-display font-bold text-ink
                       text-[34px] leading-[34px] tracking-[-0.059em]
                       md:text-[48px] md:leading-[48px]
                       xl:text-[68px] xl:leading-[68px]">
          Childcare management software directors love
        </h1>

        <p className="mx-auto max-w-[640px] text-body text-muted">
          Playground is an all-in-one child care management software that streamlines
          operations and administration for 5,000+ child care programs.
        </p>

        {/* CTA button sits at y=444 — 4px below the subhead's 419.8 end once the
            column's 20px gap is counted, so no extra row box. */}
        <div className="mt-[4px] flex items-center justify-center">
          <PrimaryButton className="h-[48px]">Get a free demo</PrimaryButton>
        </div>

        {/* Rating row: text baseline box at y=509, i.e. 17px under the button. */}
        <div className="-mt-[3px] flex items-center justify-center gap-2">
          <Stars />
          <span className="text-daylabel text-muted">4.96 stars across 8,000+ reviews</span>
        </div>
      </div>

      {/* Tab rail - track 872x44, radius 70px, bg rgba(68,25,6,0.04),
          padding 4px. overflow-x is intentional and preserved at <=768. */}
      {/* Rail + stage block measured 980x673 at x=230, y=523.8, gap 24px.
          Row: arrow 44 + track 872 + arrow 44 = 980 with the measured 10px gaps. */}
      {/* Rail block sits immediately after the 408.81px copy column
          (measured top y=523.8 = 115 + 408.81), so no extra top padding. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1012px] flex-col gap-6 px-4 pb-0 pt-[56px]">
      <div className="flex items-center justify-center gap-[10px]">
        <Arrow dir="l" onClick={() => step(-1)} />
        {/* Rail track measured 872x44 at x=284, radius 70px, padding 4px.

            The active state is NOT a background on the button: the original
            paints a separate absolutely-positioned white thumb BEHIND the
            labels and slides it. rAF-sampling a click on Payroll showed x and
            width interpolating together (288/128 -> 968/94) over 301ms,
            settling at 421ms, on cubic-bezier(.65,0,.35,1) (see .ease-tab).
            So the thumb is measured from the live DOM rather than assumed,
            which keeps it correct as the label widths change. */}
        <div ref={railRef}
             className="no-scrollbar relative flex w-[872px] max-w-full shrink gap-[10px] overflow-x-auto rounded-rail p-1"
             style={{ background: 'rgba(68,25,6,0.04)' }}>
          <span aria-hidden="true"
                className="pointer-events-none absolute top-1 z-0 h-9 rounded-rail bg-white
                           transition-[left,width] duration-[300ms] ease-tab"
                style={{ left: thumb.left, width: thumb.width, boxShadow: THUMB_SHADOW,
                         opacity: thumb.width ? 1 : 0 }} />
          {heroTabs.map((t, i) => (
            <button key={t} ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`relative z-10 flex h-9 shrink-0 items-center gap-[6px] whitespace-nowrap
                          rounded-rail px-4 text-[14px] font-medium
                          transition-colors duration-200 ease-color
                          ${i === active ? 'text-ink' : 'text-muted hover:text-ink'}`}>
              <TabIcon />
              {t}
            </button>
          ))}
        </div>
        <Arrow dir="r" onClick={() => step(1)} />
      </div>

      {/* Screenshot stage - image 964x525 radius 12px inside a 980x541 warm
          frame. Seven product screenshots replaced with placeholders. */}
      {/* Stage: 964x525 image radius 12 inside a 980x541 warm frame. */}
      <div>
        <div className="rounded-[14px] p-2" style={{ background: 'rgba(68,25,6,0.04)' }}>
          <div className="relative w-full overflow-hidden rounded-card" style={{ height: 525 }}>
            {heroTabs.map((t, i) => (
              <img
                key={t}
                src={TAB_IMG[t]}
                alt={`${t} view`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 h-full w-full rounded-card object-cover object-top
                           transition-opacity duration-[310ms] ease-color"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
