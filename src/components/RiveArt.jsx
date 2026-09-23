import { useEffect, useRef, useState } from 'react'
import { useRive } from '@rive-app/react-canvas'

/* The right-hand visual on the wide feature cards is NOT DOM on the original.
   Every one of them is a Rive WebGL2 animation painted into a single <canvas>
   sized to the whole card (measured 1610x960 backing store at 805x480 CSS,
   790x960 at 395x480). There are no rows, pills, avatars or <img> elements to
   read, which is why a DOM sweep of these cards returns nothing and why an
   earlier pass rendered them as empty boxes.

   Each file was mapped to its card by blocking one .riv at a time and seeing
   which card's canvas stopped mounting - load order alone is ambiguous
   because they arrive in pairs.

   Playing only while on screen keeps several WebGL contexts from running at
   once; browsers cap them and the later cards would otherwise drop out. */
export default function RiveArt({ src, className = '', label }) {
  const wrap = useRef(null)
  const [seen, setSeen] = useState(false)

  const { RiveComponent, rive } = useRive({
    src,
    autoplay: false,
    // The artboards are authored to fill the card edge to edge.
    layout: undefined,
  })

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setSeen(e.isIntersecting),
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!rive) return
    if (seen) rive.play()
    else rive.pause()
  }, [rive, seen])

  return (
    <div ref={wrap} className={`absolute inset-0 z-0 ${className}`}
         role="img" aria-label={label}>
      <RiveComponent className="h-full w-full" />
    </div>
  )
}
