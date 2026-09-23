/* Content for the clone.
   Structural text (nav labels, section headings, button labels, tab names)
   is kept verbatim because its character length is what the layout
   measurements in CLONE_SPEC depend on.
   Body copy and testimonials are WRITTEN FOR THIS CLONE, matched to the
   original's measured character count and line count so blocks occupy the
   same boxes. Named customer quotes on the original are replaced with
   neutral, unattributed copy. */

export const nav = [
  { label: 'Platform',             width: 56 },
  { label: 'Switch to Playground', width: 142 },
  { label: 'Built for',            width: 52 },
  { label: 'Resources',            width: 71 },
]

export const menus = {
  /* Panel sizes, row boxes and icon tints are all measured on the live
     original with the menu actually open (a synthetic hover does not open
     it - the panel only mounts on a real pointer move).
       Platform             667x381  r10  pad10
       Switch to Playground 620x370  r10  pad10
       Built for            881x271  r20  pad10
       Resources            683x320  r20  pad10
     Icon tints are the live --21h8s6 custom property, not eyedropped. */
  'Platform': {
    kind: 'two-col', panelH: 381, radius: 10,
    leftWidth: 337, rightWidth: 300,
    left: [
      { title: 'Finances',              desc: "Your program's entire financial picture.", icon: 'finances',   tone: '#1EBD66', to: '/solutions/billing' },
      { title: 'Marketing',             desc: 'Capture more leads, grow your enrollment.', icon: 'marketing',  tone: '#FC5F35' },
      { title: 'Operations',            desc: 'Run your program with ease.',               icon: 'operations', tone: '#066DFE' },
      { title: 'AI Child Care Employee', desc: 'Get more done without adding staff.',      icon: 'ai',         tone: '#B805FF', to: '/solutions/ai' },
    ],
    right: [
      { label: 'Billing', to: '/solutions/billing', icon: 'billing',  tone: '#1EBD66' },
      { label: 'Expenses', to: '/solutions/expenses', icon: 'expenses', tone: '#1EBD66' },
      { label: 'Payroll', to: '/solutions/payroll', icon: 'payroll',  tone: '#1EBD66' },
      { label: 'Subsidy', to: '/solutions/subsidy', icon: 'subsidy',  tone: '#1EBD66' },
    ],
  },
  'Switch to Playground': {
    kind: 'promo', panelH: 370, radius: 10,
    leftWidth: 350,
    left: [
      { title: 'Why Playground', to: '/why-playground',       desc: 'The best childcare management platform.', icon: 'guides',    tone: '#066DFE' },
      { title: 'About', to: '/about',                desc: 'The team behind Playground',              icon: 'careers',   tone: '#066DFE' },
      { title: 'Customer Stories', to: '/customers',     desc: 'Trusted by thousands of programs',        icon: 'blog',      tone: '#066DFE' },
      { title: 'Support & Onboarding', to: '/support', desc: 'Easy implementation, real people',        icon: 'changelog', tone: '#066DFE' },
    ],
    /* Promo card measured 240x350 with a real 240x232 illustration on top. */
    promoImg: '/assets/img/menu-switch-promo.png',
    promo: 'Switching took a weekend, not a year. Support answered every time.',
  },
  /* NB: the original's "Built for" side-list labels do NOT match their own
     hrefs - "Shared Services" points at /for/owners, "Camps" at
     /for/directors and "Before & After Care" at /for/enrollment-specialist.
     Reproduced as measured rather than "corrected". */
  'Built for': {
    kind: 'cards', panelH: 271, radius: 20,
    /* Three 191x251 cards, each holding a real 200x251 photo. */
    cards: [
      { label: 'Centers', to: '/for/centers', img: '/assets/img/menu-centers.webp' },
      { label: 'Home Based', to: '/for/home-based', img: '/assets/img/menu-homebased.webp' },
      { label: 'Multi-Site & Enterprise', to: '/for/multi-site', img: '/assets/img/menu-multisite.webp' },
    ],
    rightWidth: 258,
    right: [
      { label: 'Head Start',          to: '/for/head-start',          icon: 'generic', tone: '#066DFE' },
      { label: 'Shared Services',     to: '/for/owners',              icon: 'generic', tone: '#066DFE' },
      { label: 'Camps',               to: '/for/directors',           icon: 'generic', tone: '#066DFE' },
      { label: 'Before & After Care', to: '/for/enrollment-specialist', icon: 'generic', tone: '#066DFE' },
    ],
  },
  'Resources': {
    kind: 'two-col', panelH: 320, radius: 20,
    leftWidth: 300, rightWidth: 353,
    left: [
      { title: 'Blog', to: '/blog',      desc: 'Latest content',           icon: 'blog',      tone: '#066DFE' },
      { title: 'Guides', to: '/resources',    desc: 'Free tools and resources', icon: 'guides',    tone: '#066DFE' },
      { title: 'Webinars', to: '/webinars',  desc: 'Our latest webinars',      icon: 'webinars',  tone: '#066DFE' },
      { title: 'Changelog', to: '/changelog', desc: 'View recent updates',      icon: 'changelog', tone: '#066DFE' },
      { title: 'Careers', to: '/careers',   desc: 'Join our mission',         icon: 'careers',   tone: '#066DFE', tag: "WE'RE HIRING!" },
    ],
    right: [
      { label: 'Tuition pricing',          icon: 'generic', tone: '#066DFE' },
      { label: 'Compare billing software', icon: 'generic', tone: '#066DFE' },
      { label: 'AI tools',                 icon: 'generic', tone: '#066DFE' },
      { label: 'Employee benefits',        icon: 'generic', tone: '#066DFE' },
      { label: 'Subsidy reimbursements',   icon: 'generic', tone: '#066DFE' },
    ],
  },
}

export const heroTabs = [
  'Attendance', 'Billing', 'Communication', 'Registration',
  'Paperwork', 'Payroll', 'AI',
]

/* 5 partner marks, duplicated ~9x on the original to make the marquee loop.
   Real logos, downloaded from the original and served locally; `name` is the
   original's own alt text, kept as the accessible name. Sizes are the
   measured display dimensions, so the marquee loop length is unchanged. */
export const tickerLogos = [
  { w: 179, h: 54, name: 'The Weston School Early Childhood Education', src: '/assets/img/logo-weston.png' },
  { w: 176, h: 40, name: 'Child Development Consortium of Los Angeles',  src: '/assets/img/logo-cdcla.png' },
  { w: 103, h: 36, name: 'Gan Sinai Early Learning Center',              src: '/assets/img/logo-gansinai.png' },
  { w: 119, h: 31, name: 'Yakima Valley Memorial',                       src: '/assets/img/logo-yakima.png' },
  { w: 103, h: 30, name: 'St. John Lutheran Church',                     src: '/assets/img/logo-stjohn.png' },
]

/* Feature grids: 3 columns x 394.66px, gap 16px, container 1216px.
   Titles kept verbatim (length drives wrapping); descriptions rewritten
   to the measured character counts. */
export const marketingFeatures = [
  { span: 2, title: "Don't let another lead slip through the cracks", img: '/assets/img/feat-enrollment.webp',
    desc: 'Capture interested families, track every interaction, and scale enrollment — at one location or fifty.' },
  { span: 1, title: 'Predictive Enrollment', img: '/assets/img/feat-ai-funnel.webp',
    desc: 'Forecast future openings and maximize capacity with smart planning tools.' },
  { span: 1, title: 'Child care websites built for enrollment', img: '/assets/img/feat-website.webp',
    desc: 'We build your site to drive enrollment. A proven design that grows search traffic and turns visits into tours.' },
  { span: 2, title: 'Less paper, less work', img: '/assets/img/feat-subsidy.webp',
    desc: 'Say goodbye to paper — and much of the work — with fully digital registration packets that families finish on a phone.' },
]

export const financeFeatures = [
  { span: 2, title: 'Payment collection on autopilot', img: '/assets/img/feat-enrollment.webp',
    desc: 'Set mandatory autopay for families so you can stop chasing late payments and focus on the work.' },
  { span: 1, title: 'Make subsidized billing a breeze', img: '/assets/img/feat-subsidy.webp',
    desc: 'Automatically reconcile subsidy ledgers — and get more accurate reporting than ever' },
  { span: 1, title: 'Automatic expense tracking', img: '/assets/img/feat-ai-funnel.webp',
    desc: 'Pre-build budgets for responsible spend and eliminate manual expense reporting.' },
  { span: 1, title: 'Fast, accurate, and effortless payroll designed for child care', img: '/assets/img/feat-payroll.webp',
    desc: "Pay your staff with full service payroll, tax filing, and time tracking tools built in." },
]

export const opsFeatures = [
  { span: 2, title: 'Attendance', img: '/assets/img/feat-enrollment.webp',   desc: 'Simple, compliant check in/out for any childcare program' },
  { span: 1, title: 'Communication', img: '/assets/img/feat-ai-chat.webp', desc: 'Streamline communication, and track daily activities' },
  { span: 1, title: 'Learning', img: '/assets/img/feat-learning.webp',
    desc: 'Create, organize, and document learning in one seamless flow—from activity planning to family updates.' },
  { span: 1, title: 'Food program', img: '/assets/img/feat-food.webp',  desc: 'Simple meal recording, automatic CACFP reports, and easy menu planning.' },
  { span: 1, title: 'Reporting', img: '/assets/img/feat-ai-funnel.webp',
    desc: 'Report on anything in your program with 100s of premade reports and the ability to build your own.' },
]

export const aiFeatures = [
  { span: 2, title: 'Never miss a lead', img: '/assets/img/feat-ai-call.webp',
    desc: 'The agent answers 24/7, qualifies families, and logs every inquiry in your CRM' },
  { span: 1, title: 'Instant answers for staff and families', img: '/assets/img/feat-ai-chat.webp',
    desc: 'Trained on your handbook, SOPs, and state licensing — so every question gets a consistent, correct answer.' },
  { span: 3, title: 'Do more with the team you have', img: '/assets/img/feat-ai-funnel.webp',
    desc: 'Ask it to draft messages, issue refunds, reconcile subsidies, and build reports — right from your inbox.' },
]

/* "Built for" tiles: 3 x 313.33px, gap 10px, container 960px, tile 313x380,
   bg #FBFAF9, radius 12px, padding 40px. Titles verbatim. */
export const builtForTiles = [
  { title: 'Centers',               imgH: 380 },
  { title: 'Home based',            imgH: 380 },
  { title: 'Multi-site',            imgH: 380 },
  { title: 'Before and After Care', imgH: 380 },
  { title: 'Camps',                 imgH: 380 },
  { title: 'Head Start',            imgH: 380 },
]

/* Testimonials. The original attributes these to named real customers.
   Replaced here with neutral, unattributed copy at matching length so the
   carousel geometry is unchanged. */
export const testimonials = [
  { quote: 'We consolidated four separate systems into one and finally stopped reconciling spreadsheets by hand.', role: 'Owner, multi-site program' },
  { quote: 'Setting up a new school takes an afternoon now. That made expanding to three campuses realistic.', role: 'Director of operations' },
  { quote: 'Families complete the whole enrollment packet on their phone before the tour is over.', role: 'Center director' },
  { quote: 'Our late payments dropped sharply once autopay became the default for every family.', role: 'Finance lead' },
]

export const pullQuotes = [
  'Interested families now get a reply the same day, every time',
  'Parents finished the online paperwork packet without a single call.',
  'Delinquent payments fell by more than ninety percent.',
  'Families tell us the daily app is why they chose our program',
]

/* 30-day timeline: 3 x 311.33px, gap 16px, container 966px. */
export const timeline = [
  { day: 'Today',  title: 'Get started', pill: 'Day one. Already running.',
    /* Dot position measured on the 966x275 panel per active card. */
    dot: { x: 29.0, y: 219.4 },
    items: [
      'Upload your roster in five minutes',
      'Connect your bank account in three minutes',
      "Connect your program's phone in one minute",
    ] },
  { day: 'Day 5',  title: 'Get comfortable', pill: "Everything's flowing now.",
    dot: { x: 483.0, y: 152.3 },
    items: [
      'New leads get responses in seconds',
      'Set up billing plans',
      'Configure licensing paperwork expiration dates',
    ] },
  { day: 'Day 30', title: "Ask why you didn't switch years ago",
    pill: 'One app runs your whole program.',
    dot: { x: 937.0, y: 11.1 },
    items: [
      'Only one app admins, teachers, and families use',
      '100% digital paperwork',
      'Forecast upcoming openings in classrooms',
    ] },
]

export const footerColumns = [
  { heading: 'Solutions', links: ['Billing','Expense','Payroll','Subsidies','Marketing','Enrollment','Websites','Paperwork','Branded Experience','Predictive Enrollment','AI','Attendance','Communication','Food programs','Learning','Reporting','API','Integrations'] },
  { heading: 'Built for', links: ['Centers','Multi-site','In-home','Head Start','Shared Services','Before & After Care','Camps','About','Careers','Security'] },
  { heading: 'Resources', links: ['Blog','Why Playground','Savings Club','Early Childhood Investigations','Customer Stories','Help Center','Changelog'] },
  { heading: '', links: ['Log In','Family Sign Up','Apple Store','Google Play'] },
]

export const legalLinks = ['HIPAA Notice of Privacy Practices', 'Privacy', 'Terms of Service', 'Sitemap']

/* Section 5 "Get to know Playground" is an AUTO-ADVANCING ACCORDION, not the
   static link list an earlier pass built. Measured on the live original by
   sampling the six row boxes while idle:
     - exactly one row is expanded at a time, showing a description
     - it advances on a ~5000ms cadence (row changes at t=3648/8648/13647/
       18647, and a second 40s run confirmed 4861/4861/4878ms gaps)
     - collapsed rows are 69px; expanded rows run 152-225px with the copy
     - the expand/collapse transition takes ~375ms
     - the 829x451 media on the right SWAPS per row, changing ~150ms before
       the row itself expands
     - the open row carries a progress rule: a 360x1 track in #F0ECE9 with a
       2px bar in rgb(31,92,247) that fills linearly across the dwell
   "AI Employee" is the one row with NO description and no media of its own
   (it measured 69px even when clicked, and the stage keeps the previous
   image), so it is a plain row that never expands. */
export const getToKnowRows = [
  { label: 'Marketing',   img: '/assets/img/gtk-marketing.webp',
    desc: 'Convert more families with automated lead capture, tour reminders, and personalized email + text campaigns all integrated directly into Playground.' },
  { label: 'Registration', img: '/assets/img/gtk-registration.webp',
    desc: 'Playground makes registration easy, intuitive, and quick for families — no juggling PDFs, forms, and follow-up emails. Our mobile-first experience feels personalized and polished from the first click to the first day.' },
  { label: 'Finances',    img: '/assets/img/gtk-finances.webp',
    desc: 'Playground simplifies billing, payroll, and expense tracking with automatic invoicing, flexible payments, and fast reporting—no spreadsheets or extra logins needed. It also automates subsidy tracking and reconciliation, helping you save time and close your books with confidence.' },
  { label: 'Engagement',  img: '/assets/img/gtk-engagement.webp',
    desc: 'Make your families and staff happier with daily updates, secure messaging, and frictionless communication without juggling multiple apps.' },
  { label: 'Payroll',     img: '/assets/img/gtk-payroll.webp',
    desc: 'Run payroll in minutes, file taxes automatically, and manage time tracking - all in one place, with no extra logins or hidden fees.' },
  { label: 'AI Employee', img: '/assets/img/gtk-marketing.webp', desc: null },
]
