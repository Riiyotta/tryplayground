/* Mega-menu row icons.

   Measured on the original: each row's 40x40 white chip holds a 24x24 inline
   SVG on a "0 0 24 24" viewBox. Framer drives every glyph from three CSS
   custom properties, read off the live nodes:

     --21h8s6  the tint          (per-row, see TONES below)
     --1m6trwb fill-opacity 0.2  (a soft wash behind the outline)
     --pgex8v  stroke-width 1.5

   So each glyph is a translucent fill plus a full-opacity 1.5px stroke in the
   same hue - not the flat colour block this clone used to render. The shapes
   below are redrawn on that same 24x24 grid rather than copied path-for-path.

   Tints are the live values, not samples:
     Finances / Billing / Expenses / Payroll / Subsidy  rgb(30,189,102)
     Marketing                                          rgb(252,95,53)
     Operations                                         #066dfe
     AI Child Care Employee                             rgb(184,5,255)
     every Resources row                                #066dfe            */

export const TONES = {
  green:  '#1EBD66',
  orange: '#FC5F35',
  blue:   '#066DFE',
  purple: '#B805FF',
}

/* Glyph path sets, drawn on the measured 24x24 box. `f` paths take the 0.2
   wash + stroke; `s` paths are stroke-only detail. */
const GLYPHS = {
  /* Finances - coin */
  finances: { f: ['M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z'],
              s: ['M12 6.75v1.5M12 15.75v1.5', 'M9.75 14.25h3.375a1.875 1.875 0 0 0 0-3.75h-2.25a1.875 1.875 0 0 1 0-3.75H14.25'] },
  /* Marketing - megaphone */
  marketing: { f: ['M13.5 6.5 4.7 3.8a.75.75 0 0 0-.95.72v13.5a.75.75 0 0 0 .95.72l8.8-2.7Z'],
               s: ['M13.5 6.5v11.04', 'M17 9.5a3 3 0 0 1 0 5'] },
  /* Operations - chat bubble */
  operations: { f: ['M12 3.75a8.25 8.25 0 0 0-7.4 11.9l-.8 2.7a.75.75 0 0 0 .93.93l2.7-.8A8.25 8.25 0 1 0 12 3.75Z'],
                s: ['M9 11.25h6M9 14.25h3.75'] },
  /* AI - four-point sparkle */
  ai: { f: ['M12 3.75 13.9 8.9 19.1 10.8 13.9 12.7 12 17.9 10.1 12.7 4.9 10.8 10.1 8.9Z'],
        s: ['M17.6 4.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7Z'] },
  /* Billing - card */
  billing: { f: ['M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75Z'],
             s: ['M3 10.5h18', 'M6.75 14.25h3'] },
  /* Expenses - receipt */
  expenses: { f: ['M4.5 19.5V4.5a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 .75.75v15l-3-1.5-3 1.5-3-1.5-3 1.5Z'],
              s: ['M9 8.25h6M9 12h6'] },
  /* Payroll - banknote */
  payroll: { f: ['M2.25 7.5h19.5v9H2.25Z'],
             s: ['M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z', 'M5.25 10.5v3M18.75 10.5v3'] },
  /* Subsidy - institution */
  subsidy: { f: ['M12 3.75 21 8.25H3Z'],
             s: ['M5.25 8.25v9M9.75 8.25v9M14.25 8.25v9M18.75 8.25v9', 'M3.75 17.25h16.5'] },
  /* Resources set */
  blog: { f: ['M5.25 4.5h9l4.5 4.5v10.5a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75Z'],
          s: ['M14.25 4.5V9h4.5', 'M8.25 13.5h7.5M8.25 16.5h4.5'] },
  guides: { f: ['M4.5 5.25A1.5 1.5 0 0 1 6 3.75h12.75v15H6a1.5 1.5 0 0 0-1.5 1.5Z'],
            s: ['M18.75 18.75v1.5H6', 'M8.25 8.25h7.5'] },
  webinars: { f: ['M3 6.75h12v10.5H3Z'],
              s: ['M15 10.5 21 7.5v9l-6-3Z'] },
  changelog: { f: ['M12 3.75a8.25 8.25 0 1 0 8.25 8.25'],
               s: ['M12 7.5V12l3 1.5', 'M20.25 3.75v4.5h-4.5'] },
  careers: { f: ['M3 8.25h18v10.5a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 18.75Z'],
             s: ['M9 8.25V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.25', 'M3 12.75h18'] },
  /* Generic fallback - rounded square */
  generic: { f: ['M4.5 7.5A3 3 0 0 1 7.5 4.5h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3Z'], s: [] },
}

export default function MenuIcon({ name = 'generic', tone = TONES.green, size = 24 }) {
  const g = GLYPHS[name] || GLYPHS.generic
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         role="presentation" aria-hidden="true" className="shrink-0">
      {g.f.map((d, i) => (
        <path key={`f${i}`} d={d} fill={tone} fillOpacity="0.2"
              stroke={tone} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {g.s.map((d, i) => (
        <path key={`s${i}`} d={d} fill="none" stroke={tone} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  )
}
