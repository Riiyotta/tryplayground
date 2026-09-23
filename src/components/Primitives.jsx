import { useEffect, useState } from 'react'

/* The original has NO scroll reveal. Deep recon sampled feature cards,
   "Built for" tiles and section H2s at 40-45ms intervals across 1.6-1.7s
   while scrolling them into view: opacity stayed 1 and transform stayed
   none for every sample, and the pre-scroll state was already 1/none.
   (CLONE_SPEC §7 claims a fade+scale reveal - that was a misreading of 4
   parked opacity:0/scale(.8) HOVER chips, which never resolve on scroll.)
   Kept as a passthrough so call sites stay put. */
export function Reveal({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={className}>{children}</Tag>
}

export function PrimaryButton({ children, className = '', style, ...rest }) {
  return (
    <button
      {...rest}
      style={{ background: 'linear-gradient(#3079FF 0%, #1F5CF7 100%)', ...style }}
      className={`inline-flex items-center justify-center rounded-btn px-5
        text-[16px] font-medium leading-none text-white shadow-btn
        transition-[filter] duration-200 ease-color hover:brightness-[1.03] ${className}`}
    >
      {children}
    </button>
  )
}

/* Secondary button - measured 205x44, radius 8px, fill #E7E6E5, ink label. */
export function SecondaryButton({ children, className = '', ...rest }) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-btn bg-btn-secondary px-5
        text-[16px] font-medium leading-none text-ink
        transition-colors duration-200 ease-color hover:bg-[#dedcda] ${className}`}
    >
      {children}
    </button>
  )
}

/* Placeholder standing in for artwork this clone deliberately does not ship
   - chiefly the five partner logos in the marquee, which are named
   third-party organisations rather than Playground's own brand.

   Renders at the EXACT measured display dimensions so every layout
   measurement in CLONE_SPEC still holds. `label` is what is missing; it is
   drawn into the box when it fits and always exposed as the accessible name,
   so a substituted slot is legible as a substitution rather than reading as
   a broken or still-loading image. */
export function Placeholder({
  w, h, radius = 12, label = '', className = '', tone = 'warm', style,
}) {
  const tones = {
    warm:  { bg: '#F0ECE9', fg: '#B9AFA6' },
    cream: { bg: '#FEF5E4', fg: '#CBB68F' },
    blue:  { bg: '#CEE7FE', fg: '#7FA9D8' },
    grey:  { bg: '#FBFAF9', fg: '#C4C0BC' },
  }
  const t = tones[tone] || tones.warm
  const numeric = typeof w === 'number' && typeof h === 'number'
  /* Only draw the caption where there is genuinely room for it; below that
     the glyph alone reads better than clipped text. */
  const showLabel = Boolean(label) && (!numeric || (w >= 96 && h >= 28))
  const glyph = !numeric || (w >= 56 && h >= 44)

  return (
    <div
      role="img"
      aria-label={label ? `${label} (placeholder)` : 'Illustration placeholder'}
      title={label ? `${label} - placeholder` : undefined}
      data-placeholder={label || true}
      className={`relative flex flex-col items-center justify-center gap-1 overflow-hidden ${className}`}
      style={{
        width: w === 'full' ? '100%' : w,
        height: h,
        borderRadius: radius,
        background: t.bg,
        /* A dashed edge is the quickest read that a box is intentional. */
        border: `1px dashed ${t.fg}`,
        ...style,
      }}
    >
      {glyph && (
        <svg width={showLabel ? 20 : 36} height={showLabel ? 20 : 36} viewBox="0 0 24 24"
             fill="none" stroke={t.fg} strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      )}
      {showLabel && (
        <span className="max-w-full truncate px-2 text-center text-[10px] font-medium leading-[12px]"
              style={{ color: t.fg }}>
          {label}
        </span>
      )}
    </div>
  )
}

/* Neutral mark standing in for the Playground wordmark (measured ~136x28). */
export function LogoMark({ className = '' }) {
  return (
    <a href="/" aria-label="Home"
       className={`inline-flex items-center gap-2 ${className}`}
       style={{ height: 28 }}>
      <span className="grid h-7 w-7 place-items-center rounded-[8px]"
            style={{ background: 'linear-gradient(#3079FF 0%, #1F5CF7 100%)' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 11.5 12.5 3v4.2a1 1 0 0 1-.35.76L4 15v-2.8Z" fill="#fff" />
        </svg>
      </span>
      <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-ink">
        Sandlot
      </span>
    </a>
  )
}

/* Global fallback for raw <img> tags.

   `Img` below degrades to a Placeholder on error, but 31 raw <img> tags
   across the pages do not use it - they carry a measured width/height and
   are laid out directly. On a fresh clone `public/assets/` is absent by
   design (see NOTICE.md), so those render as 40 broken icons on the
   homepage alone.

   This listens for image load failures during the capture phase (error does
   not bubble, so a normal listener never sees it) and swaps the element for
   a neutral tinted box at the SAME geometry. Layout is therefore unchanged
   whether or not the assets are present, which is what keeps the measured
   page heights meaningful on a bare checkout. */
export function useMissingAssetFallback() {
  useEffect(() => {
    const paint = (img) => {
      if (img.dataset.fallbackApplied) return
      img.dataset.fallbackApplied = '1'
      const r = img.getBoundingClientRect()
      const cs = getComputedStyle(img)
      /* Keep whatever box the layout already gave the image. */
      img.style.width = cs.width !== 'auto' ? cs.width : `${r.width || 120}px`
      img.style.height = cs.height !== 'auto' ? cs.height : `${r.height || 80}px`
      img.style.background = '#F0ECE9'
      img.style.borderRadius = cs.borderRadius
      img.style.objectFit = 'none'
      /* An inline SVG keeps it a single element - replacing the node would
         break the sibling selectors some sections rely on. */
      img.src =
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" ' +
            'stroke="#B9AFA6" stroke-width="1.5">' +
            '<rect x="3" y="3" width="18" height="18" rx="3"/>' +
            '<circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
        )
    }
    const onError = (e) => {
      const t = e.target
      if (t && t.tagName === 'IMG') paint(t)
    }
    document.addEventListener('error', onError, true)
    /* Catch anything that already failed before this mounted. */
    document.querySelectorAll('img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) paint(img)
    })
    return () => document.removeEventListener('error', onError, true)
  }, [])
}

/* Real downloaded asset. Falls back to the Placeholder box if the file is
   missing, so a failed download degrades to correct geometry rather than a
   broken image. Dimensions are the measured DISPLAY size from CLONE_SPEC. */
export function Img({
  src, w, h, radius = 0, alt = '', fit = 'cover', className = '', style, position,
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <Placeholder w={w} h={h} radius={radius} label={alt} className={className} style={style} />
  }
  return (
    <img
      src={src} alt={alt} loading="lazy" decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={{
        width: w === 'full' ? '100%' : w,
        /* A measured pixel width is the DESKTOP width. Without these two the
           image keeps that width at 390 and pushes the page sideways - which
           is what it did on /solutions/expenses (a 409px hero shot in a 390px
           viewport). maxWidth clamps it; height:auto keeps the aspect ratio
           once the width is clamped, so the art is not squashed. */
        maxWidth: '100%',
        height: typeof w === 'number' ? 'auto' : h,
        aspectRatio: typeof w === 'number' && typeof h === 'number' ? `${w} / ${h}` : undefined,
        borderRadius: radius,
        objectFit: fit,
        objectPosition: position,
        display: 'block',
        ...style,
      }}
    />
  )
}
