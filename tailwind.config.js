/** @type {import('tailwindcss').Config} */
// All values measured from the original at 1440/768/390. See CLONE_SPEC.md.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1917',          // primary ink - headings, card titles (64 uses)
        muted: '#79716B',        // muted body / nav labels (57 uses)
        'body-alt': '#6A7074',   // secondary body, feature descriptions (23)
        slate: '#4A5565',        // timeline copy (9)
        tertiary: '#807E7A',
        'link-blue': '#066DFE',  // phone link
        accent: '#1F5CF7',       // inline links, gradient end
        'accent-start': '#3079FF', // announcement bar, gradient start
        quote: '#4F4741',
        'day-label': '#8A8F98',
        surface: '#FBFAF9',      // card surface (24 uses)
        cream: '#FEF5E4',        // hero gradient stop
        'warm-card': '#F4F2EC',
        'cta-card': '#FAFAFA',
        'warm-neutral': '#F0ECE9',
        'blue-fill': '#CEE7FE',
        'btn-secondary': '#E7E6E5',
        'warm-tint': 'rgba(68,25,6,0.04)', // tab rail track, frames, arrows
        'dark-chip': '#272A2E',
        'grey-fill': '#9AA0A8',
        'blog-surface': '#FBF9F7', // /blog card fill - one channel off the
                                   // global `surface`, and page-local: the
                                   // homepage and /solutions use #FBFAF9.
        rule: '#ECECEC',         // 1px row dividers (measured x3)
        eyebrow: '#FC5F35',      // feature-section eyebrow (pixel-sampled)
        'nav-hover': '#45403D',  // measured nav-link hover target
      },
      fontFamily: {
        // Inter renders on 237 elements (SIL OFL, self-hosted).
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Original uses CircularXX TT Bold (commercial, Lineto) for all display
        // text. Substituted with Manrope - geometric grotesque, similar metrics.
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // role: [size, { lineHeight, letterSpacing }] - tracking kept em-relative
        h1: ['68px', { lineHeight: '68px', letterSpacing: '-0.059em' }],
        h2: ['60px', { lineHeight: '66px', letterSpacing: '-0.06em' }],
        h2sub: ['48px', { lineHeight: '52.8px', letterSpacing: '-0.06em' }],
        h2card: ['32px', { lineHeight: '35.2px', letterSpacing: '-0.03em' }],
        pullquote: ['28px', { lineHeight: '33.6px', letterSpacing: '0.02em' }],
        cardquote: ['32px', { lineHeight: '33.6px', letterSpacing: '-0.02em' }],
        feature: ['18px', { lineHeight: '21.6px', letterSpacing: '-0.02em' }],
        lead: ['17px', { lineHeight: '23.8px', letterSpacing: '-0.02em' }],
        body: ['16px', { lineHeight: '22.4px', letterSpacing: '-0.021em' }],
        bodyslate: ['16px', { lineHeight: '23.2px', letterSpacing: '0' }],
        small: ['15px', { lineHeight: '21.9px', letterSpacing: '-0.024em' }],
        nav: ['14px', { lineHeight: '16.8px', letterSpacing: '0' }],
        caption: ['14px', { lineHeight: '16.8px', letterSpacing: '-0.026em' }],
        footer: ['13px', { lineHeight: '18.2px', letterSpacing: '-0.023em' }],
        announce: ['13px', { lineHeight: '15.6px', letterSpacing: '0' }],
        daylabel: ['13px', { lineHeight: '13px', letterSpacing: '0' }],
      },
      borderRadius: {
        card: '12px',   // dominant radius (50 uses)
        well: '8px',    // /blog + /changelog cards
        panel: '10px',  // nav dropdown
        btn: '8px',     // buttons
        rail: '70px',   // tab rail track
        cta: '20px',
        pill: '999px',
      },
      boxShadow: {
        // measured verbatim from the original
        warm: '0 0.97px 0.97px 0.49px rgba(68,25,6,0.04), 0 2.92px 2.92px 1.46px rgba(68,25,6,0.04), 0 5.83px 5.83px -2.92px rgba(68,25,6,0.04), 0 11.67px 11.67px -5.83px rgba(68,25,6,0.04)',
        btn: '0 1px 1px 0.5px rgba(0,0,0,0.04), 0 3px 3px 1.5px rgba(0,0,0,0.04), 0 6px 6px -3px rgba(0,0,0,0.04), 0 24px 24px -12px rgba(0,0,0,0.04), 0 1px 4px -1px rgba(3,7,18,0.04)',
        panel: '0 0 0 1px rgba(0,0,0,0.04), 0 1px 1px 0.5px rgba(0,0,0,0.04), 0 3px 3px 1.5px rgba(0,0,0,0.04), 0 6px 6px -3px rgba(0,0,0,0.04), 0 12px 12px -6px rgba(0,0,0,0.04)',
        // /blog and /changelog card wells: an INSET shadow on a transparent
        // 8px-radius box, 311 uses on /blog alone. The only inset on the site.
        well: 'inset 0 1px 11px 0 rgba(0,0,0,0.05)',
        // small floating chip (e.g. the /blog read-time pill), 3 uses
        chip: '0 1px 4px 0 rgba(0,0,0,0.08)',
      },
      transitionTimingFunction: {
        // the only two easing curves on the page
        color: 'cubic-bezier(0.44, 0, 0.56, 1)',   // 200ms, 45 uses
        move: 'cubic-bezier(0.22, 1, 0.36, 1)',    // 500ms, position/layout
      },
      maxWidth: {
        shell: '1256px',
        content: '1216px',
        hero: '800px',
        builtfor: '1000px',
        ctacard: '960px',
      },
    },
  },
  plugins: [],
}
