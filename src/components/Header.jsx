import { useState } from 'react'
import { Link } from 'react-router-dom'
import { nav, menus } from '../data/content'
import { LogoMark, PrimaryButton } from './Primitives'
import MenuIcon from './MenuIcons'

/* Menu entries carry a measured `to` from the original's own hrefs. Internal
   ones route client-side; anything without a target stays a plain anchor so
   an unbuilt link cannot silently look navigable. */
function LinkOrA({ to, children, ...rest }) {
  if (to) return <Link to={to} {...rest}>{children}</Link>
  return <a href="#" {...rest}>{children}</a>
}

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"
       className="mt-[1px] opacity-60">
    <path d="M4 6.5 8 10.5l4-4" stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* Panel chrome, measured with the menu genuinely open on the original
   (see MenuIcons.jsx - a synthetic hover never mounts the panel):
     Platform 667x381 r10 | Switch 620x370 r10
     Built for 881x271 r20 | Resources 683x320 r20
   All four use padding 10px and a 10px inter-column gap. */
function Panel({ name }) {
  const m = menus[name]
  if (!m) return null
  const innerH = (m.panelH || 381) - 20

  /* Left row measured 337x60 (348 on Switch, 300 on Resources) with a 40x40
     white icon chip at radius 8.58px holding a 24x24 glyph. */
  const Row = ({ title, desc, tag, icon, tone, w, to }) => (
    <LinkOrA to={to} style={{ width: w }}
       className="flex h-[60px] items-center gap-3 rounded-[8px] px-[10px]
                  transition-colors duration-200 ease-color hover:bg-surface">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8.58px] bg-white"
            aria-hidden="true">
        <MenuIcon name={icon} tone={tone} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-2 text-[14px] font-semibold leading-[17.5px] text-ink">
          {title}
          {tag && (
            <span className="rounded-pill bg-blue-fill px-2 py-[2px] text-[10px] font-semibold tracking-wide text-accent">
              {tag}
            </span>
          )}
        </span>
        {desc && <span className="mt-[2px] text-[12.5px] leading-[17.5px] text-muted">{desc}</span>}
      </span>
    </LinkOrA>
  )

  /* Right column: 50px rows (260 / 238 / 310 wide) each with a 20x20 glyph
     and a trailing arrow, divided by a 1px rule. */
  const SideList = ({ items, w }) => (
    <ul style={{ width: w, minHeight: innerH }}
        className="flex flex-col justify-start rounded-[8px] bg-surface px-3 py-[6px]">
      {items.map((it, i) => {
        const label = typeof it === 'string' ? it : it.label
        return (
          <li key={label} className={i ? 'border-t border-[#F7F6F5]' : ''}>
            <LinkOrA to={it.to}
               className="group flex h-[50px] items-center gap-2 rounded-[8px] px-2 text-[14px]
                          font-medium text-ink hover-color hover:text-muted">
              <MenuIcon name={it.icon} tone={it.tone} size={20} />
              {label}
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                   className="ml-auto text-muted">
                <path d="M3 8h9.5M8.5 4 12.5 8l-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </LinkOrA>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-[25px]">
      <div className="flex gap-[10px] bg-white p-[10px] shadow-panel"
           style={{ borderRadius: m.radius || 10 }}>
        {m.kind === 'two-col' && (
          <>
            <div className="flex flex-col" style={{ width: m.leftWidth, minHeight: innerH }}>
              {m.left.map((r) => <Row key={r.title} {...r} w={m.leftWidth} />)}
            </div>
            <SideList items={m.right} w={m.rightWidth} />
          </>
        )}

        {m.kind === 'promo' && (
          <>
            <div className="flex flex-col" style={{ width: m.leftWidth, minHeight: innerH }}>
              {m.left.map((r) => <Row key={r.title} {...r} w={m.leftWidth} />)}
            </div>
            {/* Promo card 240x350: a real 240x232 illustration over the quote. */}
            <div style={{ width: 240, height: innerH }}
                 className="flex flex-col justify-between overflow-hidden rounded-[8px] bg-surface">
              <img src={m.promoImg} alt="" aria-hidden="true" loading="lazy" decoding="async"
                   className="h-[232px] w-[240px] object-cover" />
              <p className="px-4 pb-4 text-[14px] font-medium leading-[19px] text-ink">
                "{m.promo}"
              </p>
            </div>
          </>
        )}

        {m.kind === 'cards' && (
          <>
            {/* Three 191x251 cards, each a real 200x251 photo with the label
                overlaid at the foot. */}
            {m.cards.map((c) => (
              <LinkOrA key={c.label} to={c.to} style={{ width: 191, height: innerH }}
                 className="group relative flex flex-col justify-end overflow-hidden rounded-[12px]">
                <img src={c.img} alt="" aria-hidden="true" loading="lazy" decoding="async"
                     className="absolute inset-0 h-full w-full object-cover
                                transition-transform duration-500 ease-move group-hover:scale-[1.04]" />
                <span className="absolute inset-x-0 bottom-0 h-1/2
                                 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
                <span className="relative z-10 p-3 text-[14px] font-semibold leading-[17.5px] text-white">
                  {c.label}
                </span>
              </LinkOrA>
            ))}
            <SideList items={m.right} w={m.rightWidth} />
          </>
        )}
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)

  return (
    <header className="relative z-40">
      {/* Announcement bar - measured 1440x37, bg #3079FF, CircularXX Medium
          13px/15.6 white. Decorative flanking illustrations replaced. */}
      <a href="#" className="relative flex h-[37px] items-center justify-center overflow-hidden bg-accent-start">
        <img src="/assets/img/announce-left.webp" alt="" aria-hidden="true" decoding="async"
             className="hidden md:block absolute left-[216px] top-0 h-[37px] w-[200px] object-cover" />
        <span className="relative z-10 font-display text-announce font-medium text-white">
          Predictive enrollment is here! <span aria-hidden="true">→</span>
        </span>
        <img src="/assets/img/announce-right.webp" alt="" aria-hidden="true" decoding="async"
             className="hidden md:block absolute left-[1014px] top-0 h-[37px] w-[210px] object-cover" />
      </a>

      {/* Nav bar - sticky, 78px tall, transparent (sits over the hero cream). */}
      <div className="sticky top-0 z-40 h-[78px] w-full"
           onMouseLeave={() => setOpen(null)}>
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-[216px]">
          <LogoMark />

          <nav className="relative hidden lg:flex items-center gap-2">
            {nav.map(({ label }) => (
              <div key={label} className="relative"
                   onMouseEnter={() => setOpen(label)}>
                {/* The original opens these on hover only, which leaves every
                    menu link unreachable by keyboard - and the mega-menus hold
                    nearly all of the site's real navigation. Click/Enter and
                    Escape are added on top of the measured hover behaviour
                    rather than replacing it, so the pointer experience is
                    unchanged. */}
                <button
                  className={`flex items-center gap-[3px] whitespace-nowrap rounded-pill px-3 py-[6px] text-nav font-medium
                              transition-colors duration-200 ease-color
                              ${open === label ? 'text-nav-hover' : 'text-muted hover:text-nav-hover'}`}
                  aria-expanded={open === label}
                  onClick={() => setOpen((v) => (v === label ? null : label))}
                  onKeyDown={(e) => { if (e.key === 'Escape') setOpen(null) }}
                >
                  {label}
                  <Chevron />
                </button>
              </div>
            ))}
            {open && (
              <div onKeyDown={(e) => { if (e.key === 'Escape') setOpen(null) }}>
                <Panel name={open} />
              </div>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+16465668590"
               className="hidden md:block text-nav font-medium text-link-blue hover-color">
              (646) 566-8590
            </a>
            <PrimaryButton className="h-[39px]">Get demo</PrimaryButton>
            <button onClick={() => setMobile((v) => !v)} aria-label="Menu" aria-expanded={mobile}
                    className="lg:hidden grid h-9 w-9 place-items-center rounded-[8px]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="#1C1917" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu. The original's hamburger panel was NOT measurable
          (Framer renders an unlabelled div), so this is a full-screen
          overlay built from the same link sets - flagged in the README. */}
      {mobile && (
        <div className="lg:hidden fixed inset-0 top-[115px] z-50 overflow-y-auto bg-white px-5 pb-16 pt-4">
          {nav.map(({ label }) => (
            <div key={label} className="border-b border-black/[0.06] py-4">
              <p className="mb-2 text-[15px] font-semibold text-ink">{label}</p>
              <ul className="flex flex-col gap-2">
                {/* These carry the same measured `to` the desktop panel
                    routes on; an earlier pass dropped it here, which left the
                    whole mobile site navigation-dead. Tapping one also closes
                    the panel - otherwise it stays open over the new route. */}
                {(menus[label].left || []).map((r) => (
                  <li key={r.title}>
                    <LinkOrA to={r.to} onClick={() => setMobile(false)}
                             className="text-[14px] text-muted">{r.title}</LinkOrA>
                  </li>
                ))}
                {(menus[label].cards || []).map((c) => (
                  <li key={c.label}>
                    <LinkOrA to={c.to} onClick={() => setMobile(false)}
                             className="text-[14px] text-muted">{c.label}</LinkOrA>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
