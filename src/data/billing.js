/* /solutions/billing — measured on the original at 1440 (height 12,955px).
   Headings, eyebrows, list items, FAQ questions AND answers are the
   original's own copy, read off the live page; the FAQ answers were captured
   by diffing the page's text before and after opening each row, which is the
   only method that returned all six distinctly (positional selectors kept
   handing back row 1's answer for row 3).
   `img` paths point at assets downloaded from the original — see
   public/assets/img/billing/. */

export const billingHero = {
  h1: 'The easiest way to manage billing for child care',
  sub: 'Automatic billing, flexible payment plans — simpler than any other billing software.',
  cta: 'Get a free demo',
  /* 409x547 r14 dashboard card, over a 1903x507 classroom illustration. */
  shot: '/assets/img/billing/playground-revenue-dashboard-with-__q66XwmXTXbGaSKWHeZziryXxMs.webp',
  backdrop: '/assets/img/billing/illustration-of-a-child-care-class__gOkLwb1Dh5AjSDRi8K54mSRf8A.webp',
}

/* Intro band at y=1238: H2 60px + four labels, over a 807x443 cream panel
   holding a 829x451 transactions screenshot. */
export const billingIntro = {
  h2: 'Simplified child care billing',
  lead: 'Clunky billing makes it hard to run your program. Playground simplifies billing instantly and makes your families happy.',
  labels: [
    'Flexible billing plans',
    'Simplified collection',
    'Robust reporting',
    'Gorgeous, intuitive, & secure family portal',
  ],
  panel: '/assets/img/billing/cream-background-with-subtle-textu__LoFCE1B0M0lrHE4Zj7sAAtEENp4.webp',
  shot:  '/assets/img/billing/transactions__F5n14bhoY180tJNA4fy3KHMLo.webp',
}

/* Four alternating copy/media rows, y=2075 / 2766 / 3472 / 5038. */
export const billingRows = [
  {
    eyebrow: 'Invoicing',
    title: 'Make your billing make sense',
    intro: 'Automated, flexible, fast. Effortless invoicing for child care programs — customize plans, stay organized, and collect on time.',
    items: [
      'Automatic invoices go out without needing to post them manually each period',
      'Future dated invoices so you can easily forecast your revenue without needing an accounting degree',
      'Flexible billing plans that give you and your families the flexibility you need',
      'Attendance based billing by the day, by the hour, or even down to the minute',
      'Discounts, bulk edits, invoice proration, and billing alerts are also all included',
    ],
    img: '/assets/img/billing/playground-billing-screen-for-addi__vRl3XdoybL4QBDLN63ZQSDsWus.webp',
    imgW: 330, imgH: 352, radius: 9,
  },
  {
    eyebrow: 'Automated collections',
    title: 'Don’t let revenue slip through the cracks',
    intro: 'Spend less time chasing down payments and more time running your program. With Playground, families add their preferred payment method and payments collect themselves.',
    items: [
      'Automatically collect application, enrollment, and deposit fees',
      'Reduce missed payments with instant payment failure alerts and automatic payment retries',
      'Cards are automatically updated when expiration dates pass',
      'Keep more money in your pocket and enjoy not being charged chargeback or penalty fees for failed payments',
      "Dispute dashboard to fight back against disputes and collect the money you're owed",
    ],
    img: '/assets/img/billing/playground-family-billing-list-sho__tvkSmc1je9s3akG8r05GeE1So.webp',
    imgW: 346, imgH: 329, radius: 9,
    flip: true,
  },
  {
    eyebrow: 'Recover lost revenue',
    title: 'Stop leaving money on the table for late pickups',
    intro: "Most providers don't enforce their late pickup policy – or spend hours figuring out who owes what. Playground automates it.",
    items: [
      'Automtically logs pickup times and flags policy violations',
      'Applies fees based on your rules – no manual math required',
      'Review, charge, or waive fees in seconds',
      'No more uncomfortable texts, no more missed revenue',
    ],
    img: '/assets/img/billing/playground-billing-screen-showing-__JGlj3wds0BWNxGucCoz1W3pjVRI.webp',
    imgW: 330, imgH: 335, radius: 10,
    quote: {
      text: '"$1,200 collected in late pickup fees the first month we started enforcing with Playground"',
      by: 'Kaitlynn, Boys & Girls Club of the Mountain Empire',
    },
  },
  {
    eyebrow: 'Additional revenue, minimal effort',
    title: 'Turn open spots into extra income, automatically',
    intro: 'Give families flexibility and earn more per classroom – without juggling schedules, payments, or manual tracking.',
    items: [
      'Fill empty spots to maximize daily revenue without any additional overhead',
      'Optionally limit drop-in access to current families',
      'Charge by the hour, day, or based on actual attendance',
    ],
    img: '/assets/img/billing/mobile-drop-in-booking-calendar-sh__BnQxo6FFAwhygphqg7aZMY5n5k4.webp',
    imgW: 510, imgH: 518, radius: 10,
    flip: true,
    quote: {
      text: '"As soon as Playground was implemented, families turned on autopay and our bank account felt the positive impact."',
      by: 'Kaitlynn, Boys & Girls Club',
    },
  },
]

/* Three card grids at y=6051 / 7503 / 8978. Cards measured 277x119 r10. */
export const billingCardGroups = [
  {
    eyebrow: 'Reporting',
    h2: 'Reports that make your accountant’s day',
    intro: 'Live, updating dashboards & robust reporting so you know exactly what’s happening in your business',
    cards: [
      { title: 'Track finances in real time', desc: 'Live, updating dashboards to track collections, debt, and forecast revenue' },
      { title: 'Play nicely with Quickbooks', desc: 'Import your accounting data into Quickbooks in 30 seconds using Playground’s General Ledger report' },
      { title: 'Match your accounting codes', desc: 'Accounting codes perfectly map into Quickbooks or your accounting software of choice' },
      { title: 'Forecast revenue years into the future and stop flying blind', desc: 'Because payment plans have future dated invoices, you can create predictable revenue forecasts' },
    ],
  },
  {
    eyebrow: 'Enterprise-ready',
    h2: 'Standardize your billing across your enterprise',
    intro: 'Set up guardrails that trickle down to regions & districts or modify settings within regions, tags, or entities.',
    cards: [
      { title: 'Say goodbye to reconciliation nightmares', desc: 'No double entry - instantly account for every dollar with private & third party payer info conveniently in one place' },
      { title: 'Accrue revenue correctly', desc: 'Report against service dates and invoice dates to seamlessly follow best accounting practices.' },
      { title: 'Take the guesswork out of revenue forecasts', desc: 'With future dated invoices, you’ll have predictable revenue models to help make more informed decisions' },
      { title: 'Enterprise wide reporting', desc: 'Aggregate data by region, by tag, or by individual site' },
      { title: 'Close your books faster than ever', desc: 'Once your books are closed, restrict entries in the past to maintain clean reconciled data' },
    ],
    shots: [
      '/assets/img/billing/payouts-table-showing-mercury-bank__kHaBjWfL2Iu6hvMzbtDVFx7Mizw.webp',
      '/assets/img/billing/revenue-chart-card-showing-q3-actu__EkchHN1I0q3GQHcuBGfTIXVa6jo.webp',
      '/assets/img/billing/tag-filter-pills-for-region-date-i__zQj4ZmdgiXtuFDjIs9Jf7IdIoEg.webp',
      '/assets/img/billing/expense-list-showing-starbucks-mea__T449QkOQOo7w8b2IUbLmBE1cDI.webp',
    ],
  },
  {
    eyebrow: 'Family portal',
    h2: 'An intuitive and secure home for families',
    intro: 'Differentiate your program with a gorgeous family portal while also empowering families to self-serve and manage their own account.',
    cards: [
      { title: 'Say goodbye to manually generating each family’s tax statement', desc: 'Families can pull their own end of year statements so you can reclaim your time' },
      { title: 'Meet families wherever they are', desc: 'Accessible via mobile app or on any web browser.' },
      { title: 'Manage payment methods', desc: 'Families can manage their preferred payment methods without needing to involve anyone on your team' },
    ],
    shots: [
      '/assets/img/billing/download-tax-statement-dialog-with__nJ8ywjeiO3jWKwEL5YH3M2ugz0.webp',
      '/assets/img/billing/mobile-playground-app-showing-1-00__DVAURvAVXz9p0TvkPYVS88hZTs8.webp',
      '/assets/img/billing/add-new-payment-method-dialog-with__Zl0266A7FuU0xZPv4DDj70F0cIg.webp',
    ],
  },
]

/* y=9614: three sibling-solution links. */
export const billingRelated = {
  h2: 'Playground helps with the entire financial picture of your program',
  links: [
    { title: 'Expenses', desc: 'Manage and track all other spend', to: '/solutions/expenses' },
    { title: 'Payroll',  desc: 'Pay your staff with ease',          to: '/solutions/payroll' },
    { title: 'Subsidy',  desc: 'Manage third party and agency payers', to: '/solutions/subsidy' },
  ],
}

/* y=10148. Answers captured via the before/after text diff described above. */
export const billingFaq = [
  { q: 'How does the Playground billing portal work?',
    a: 'Playground automates invoicing, payments, and tracking - whether it’s recurring tuition, drop-in care, late pickup fees, or split subsidy payments. Everything syncs in real time and is visible to both staff and families.' },
  { q: 'Is billing included in the Playground subscription?',
    a: 'Yes. All billing tools are included in the core Playground platform.' },
  { q: 'Can billing plans be customized for different programs or schedules?',
    a: 'Yes. Billing plans can be built for full-time, part-time, aftercare, camps, or anything else - with custom rates, schedules, and charges per child, per program, or per family.' },
  { q: 'How do families pay tuition in Playground?',
    a: 'Families can pay via ACH or credit/debit card. Auto-pay is available, and receipts are automatically generated and stored in the family’s portal.' },
  { q: 'Can different charges be split between families and other payers?',
    a: 'Yes. Charges can be split across multiple payers, including subsidy agencies. Each payer sees only their portion, and Playground tracks payments separately.' },
  { q: 'How does Playground handle failed or late payments?',
    a: 'Automatic reminders are sent before and after due dates. If a payment fails, Playground retries it and notifies both staff and families. Late fees can be applied automatically.' },
]

/* y=11306 closing CTA, over a 1584x452 illustration. */
export const billingCta = {
  h3: 'Book a demo to see how you can streamline your billing.',
  art: '/assets/img/billing/illustration-of-a-playground-house__HEnGq0dbBcgJOqhE5fxATYTymhs.webp',
  /* 198px audience tiles at y=11583. */
  tiles: [
    { label: 'Home-Based',     img: '/assets/img/billing/home-based__0kpkGLsFWlTZ3aoeMnKfdyPg.webp', w: 198, h: 198 },
    { label: 'Center',         img: '/assets/img/billing/center__HugA0yvcGMsV0FTsxg5phDahg.webp',     w: 198, h: 198 },
    { label: 'Multi-Location', img: '/assets/img/billing/multi-location__2GRUsS42fqlpqT2x6fNfTQ6Inc.webp', w: 198, h: 171 },
  ],
}


/* y=4341 — testimonial band, ~697px. The original carries two named
   customers with a hand-drawn portrait in a 450x456 orange frame (the same
   frame asset the homepage uses). Names and quotes are the original's own. */
export const billingTestimonials = {
  h2: 'Hear what customers are saying',
  frame:    '/assets/img/billing/orange-wooden-picture-frame__nue2i7o2sxoI5GXXx889BETVhnM.webp',
  portrait: '/assets/img/billing/hand-drawn-portrait-of-little-mind__GSVegCXP0LxqNC8tcQap7wiLn2E.webp',
  items: [
    { quote: "\u201cWe haven't lost a single teacher since starting with Playground. They're the secret to our retention.\u201d",
      name: 'Jermaine Rucker', role: 'Owner at Little Minds Universe' },
    { quote: '\u201cPlayground helped us put together a plan so that our parents and teachers felt prepared when we started.\u201d',
      name: 'Dr. Tamar Andrews', role: 'Temple Isaiah Preschool' },
  ],
}

/* y=10703 — "Explore related articles", ~600px. A horizontally scrolling rail
   of 12 cards; each card is a 309x300 cover plus title, read time and date.
   Titles/dates are the original's own index data. */
export const billingArticles = {
  h2: 'Explore related articles',
  link: 'Browse all blogs',
  items: [
    { t: 'Child Care Tuition Prices in New Hampshire 2026: County Breakdown by Age and Center Types', read: '5 min read',  date: 'Sep 11, 2026', img: '/assets/img/billing/a-child-care-facility-in-new-hamps__pmIjFuSMELDwFnm1dUx9ff12C7o.webp' },
    { t: 'Child Care Tuition Prices in Oklahoma 2026: County Breakdown by Age and Center Types',      read: '15 min read', date: 'Sep 9, 2026',  img: '/assets/img/billing/a-child-care-center-based-in-oklah__ZAxVIgYQuM8X5lfdPz5aqXHV9FA.webp' },
    { t: 'Child Care Tuition Prices in Kansas 2026: County Breakdown by Age and Center Types',        read: '20 min read', date: 'Sep 8, 2026',  img: '/assets/img/billing/a-woman-plays-with-three-children-__7NGVJAbbeX4A8SI0nyO4U3NP6c.webp' },
    { t: 'Child Care Tuition Prices in Wyoming 2026: County Breakdown by Age and Center Types',       read: '7 min read',  date: 'Sep 8, 2026',  img: '/assets/img/billing/in-some-wyoming-counties-average-a__vu9x1N7X0ct88BzvjaLo08cLBQ.webp' },
    { t: 'Child Care Tuition Prices in Michigan 2026: County Breakdown by Age and Center Types',      read: '16 min read', date: 'Sep 4, 2026',  img: '/assets/img/billing/the-outside-of-a-child-care-center__pIc3kLdoMvGOTqA6SFXDqnmum70.webp' },
    { t: 'Child Care Tuition Prices in Colorado 2026: County Breakdown by Age and Center Types',      read: '13 min read', date: 'Sep 3, 2026',  img: '/assets/img/billing/the-outside-of-a-child-care-center__KpWZtRPpSsT0oZulCbBSoytPl0.webp' },
    { t: 'Child Care Tuition Prices in Utah 2026: County Breakdown by Age and Center Types',          read: '8 min read',  date: 'Aug 28, 2026', img: '/assets/img/billing/an-image-of-the-outside-of-a-child__SNZ7wEwEkbSfrkqHAmYtmT6X5c.webp' },
    { t: 'Child Care Tuition Prices in Minnesota 2026: County Breakdown by Age and Center Types',     read: '17 min read', date: 'Aug 13, 2026', img: '/assets/img/billing/the-outside-of-a-child-care-provid__9MPxjYdXXUH2HQ5sGe4nlbru9g.webp' },
    { t: 'Child Care Tuition Prices in Florida 2026: County Breakdown by Age and Center Types',       read: '12 min read', date: 'Aug 4, 2026',  img: '/assets/img/billing/the-outside-of-a-child-care-center__vpdZnPJFptXMuOuuO124FWLmHYk.webp' },
    { t: 'Child Care Tuition Prices in North Carolina 2026: County Breakdown by Age and Center Types',read: '19 min read', date: 'Aug 2026',     img: '/assets/img/billing/the-outside-of-a-child-care-center__e23RXXW6wszwYpvetjJ2uznjCU.webp' },
    { t: 'Child Care Tuition Prices in Tennessee 2026: County Breakdown by Age and Center Types',     read: '18 min read', date: 'Aug 2026',     img: '/assets/img/billing/the-outside-of-a-child-care-center__YkWJp8hPSwRv9QxNb8dRrQ0lMCM.webp' },
    { t: 'Child Care Tuition Prices in Virginia 2026: County Breakdown by Age and Center Types',      read: '24 min read', date: 'Aug 2026',     img: '/assets/img/billing/the-outside-of-a-child-care-center__ioSXTa2BbFxXiOmvv8jNCaGvTRg.webp' },
  ],
}
