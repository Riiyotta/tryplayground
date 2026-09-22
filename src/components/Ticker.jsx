import { useEffect, useRef, useState } from 'react'
import { tickerLogos } from '../data/content'
import { Placeholder } from './Primitives'

/* Logo ticker. Measured on the original at 49.7px/s, linear, infinite -
   JS-driven there (no @keyframes exist anywhere on the page), reimplemented
   as a CSS marquee. Rather than hard-code a duration, the track width is
   measured at runtime and the duration derived from the measured speed, so
   the px/s matches regardless of how the content lays out. */
const SPEED_PX_PER_SEC = 49.7
const REPEATS = 4

export default function Ticker() {
  const trackRef = useRef(null)
  const [style, setStyle] = useState(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      // one cycle = the width of a single copy of the logo set
      const cycle = el.scrollWidth / REPEATS
      if (!cycle) return
      setStyle({
        '--ticker-distance': `-${cycle}px`,
        '--ticker-duration': `${cycle / SPEED_PX_PER_SEC}s`,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const set = Array.from({ length: REPEATS }).flatMap((_, r) =>
    tickerLogos.map((l, i) => (
      <div key={`${r}-${i}`} className="shrink-0 opacity-70">
        <img src={l.src} alt={l.name} width={l.w} height={l.h} loading="lazy" decoding="async"
             style={{ width: l.w, height: l.h }} className="object-contain" />
      </div>
    ))
  )

  return (
    <section className="pt-10">
      <div className="mx-auto max-w-content px-5">
        <p className="max-w-[334px] text-small text-body-alt">
          Join 500,000+ owners, directors, teachers, and families already on Playground
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden">
        <div ref={trackRef} className="ticker-track flex w-max items-center gap-14" style={style}>
          {set}
        </div>
      </div>
    </section>
  )
}
