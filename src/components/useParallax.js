import { useEffect, useRef, useState } from 'react'

/* Shared scroll-linked vertical offset. Measured on the original by
   rAF-sampling elements' computed transform across scroll (never CSS
   `transition`, which the original does not use here — this is JS/scroll
   driven, so a plain rAF scroll listener is the right match, not a CSS
   scroll-timeline).

   /about's open-letter card: matrix ty runs 46.4 (scrollY=258) -> -63
   (scrollY=1058), holding flat past that — a ~-109px swing over ~800px of
   scroll, i.e. ratio ~-0.136, clamped once the card has fully passed.
   /customers' wall-of-love columns: the middle column moves opposite the
   two flanking columns, offset shrinking from ~27.5px to ~12px as the
   section scrolls through the viewport - i.e. the same mechanic at a
   smaller ratio (~0.015 of distance-from-viewport-center), not a fixed
   scrollY mapping, since the wall sits far down the page.

   `ratio` is px of translateY per px the element's centre sits from the
   viewport's vertical centre; `clampPx` bounds the swing, matching the
   original settling once a section has scrolled well past. */
export function useParallax(ratio, clampPx = 120) {
  const ref = useRef(null)
  const [y, setY] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const tick = () => {
      raf = 0
      const el = ref.current
      if (el) {
        const r = el.getBoundingClientRect()
        const mid = r.top + r.height / 2 - window.innerHeight / 2
        const off = Math.max(-clampPx, Math.min(clampPx, -mid * ratio))
        setY(off)
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [ratio, clampPx])

  return [ref, y]
}
