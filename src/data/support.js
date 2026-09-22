/* /support — measured on the original at 1440 (height 5,290px, 11 h2s).
   Structure is five alternating copy/media rows, so it reuses FeatureRow
   from PageParts rather than introducing a new layout.
   Copy is the original's own, read off the live page. Assets are downloaded
   to /assets/img/support/ (5 of the 13 were already on disk from the billing
   pass and are reused by content hash rather than refetched). */

export const supportHero = {
  h1: 'Switching has never been this simple',
  sub: 'From your first call to your first day live, Playground makes onboarding and support human, fast, and stress-free.',
  cta: 'Get a free demo',
  backdrop: '/assets/img/support/illustration-of-a-fenced-playgroun__w7YYcYgqDKQKDnfDG2JblLX7xs.webp',
}

/* Rows at y=963 / 1542 / 2121 / 2660 / 3275. The 4th has no photo on the
   original - it renders an inline changelog list instead (see supportChangelog). */
export const supportRows = [
  {
    eyebrow: 'Seamless, proven launch plan',
    title: 'Onboarding that feels like a partner, not a project',
    intro: 'Whether you’re migrating from another platform, a spreadsheet, or manilla folders, we’ll get you live without the chaos.',
    items: [
      'Dedicated onboarding manager for every customer',
      'Full data migration — families, billing, attendance, payroll, paperwork — without starting from scratch',
      'Hands on configuration so your setup matches your program’s needs exactly',
      'Template-based onboarding to save time and avoid errors',
    ],
    img: '/assets/img/support/receiving-subsidy__Usv2bfMmmEq8oimp85KWfQ04Ro.webp',
    imgW: 413, imgH: 250, radius: 10,
  },
  {
    eyebrow: "We're there when you need it",
    title: 'Support in seconds, not days',
    intro: 'We’re known for the fastest and friendliest support in child care because you have better things to do than wait on hold.',
    items: [
      'Our average response time is 60 seconds',
      'Real humans who’ve helped thousands of providers switch',
      'Kind, in-depth answers for any user in your program, regardless of role or permission level',
      'Support button in every Playground product for instant chat or self-serve answers',
    ],
    img: '/assets/img/support/receiving-subsidy__LkhRhpWwveRhKdTu3dbtlL7TJI.webp',
    imgW: 295, imgH: 418, radius: 10,
    flip: true,
  },
  {
    eyebrow: 'Helping your business grow',
    title: 'Not just problem solvers — business partners',
    intro: 'Our team doesn’t just fix issues — we’ll share best practices and ideas for making Playground work harder for you.',
    items: [
      'Suggestions on how to use features to save time and grow enrollment',
      'Proven workflows from top-performing centers in your segment',
      'Industry-specific insights from supporting 500,000+ providers, staff, and families',
    ],
    img: '/assets/img/support/receiving-subsidy__SP5rH3jyFayC3uyrIzTBHqMmdJM.webp',
    imgW: 345, imgH: 337, radius: 10,
  },
]

/* y=2660 — "Your software gets better every week". The media column here is
   a list of version rows rather than a screenshot; versions/dates are the
   original's own. */
export const supportChangelog = {
  eyebrow: 'Updates that keep up with your speed',
  title: 'Your software gets better every week',
  intro: 'Because Playground is in the cloud, you’ll always have the newest features automatically, at no extra cost.',
  items: [
    'Automatic free weekly upgrades with brand new features and improvements',
    'Updates informed by real customer feedback, many of which originated as user requests',
    'No downtime or manual installs — just log in and see what’s new',
  ],
  link: 'View recent updates',
  releases: [
    { v: '4.1',  t: 'Added Food programs',      d: '3/21/25' },
    { v: '4.2',  t: 'Improved navigation',      d: '4/3/25' },
    { v: '4.21', t: 'New Quickbooks connector', d: '4/12/25' },
    { v: '4.22', t: 'Added new report view',    d: '4/22/25' },
    { v: '4.3',  t: 'Fix website layout',       d: '5/1/25' },
  ],
}

/* y=3275 — final row, with a link rather than a bullet CTA. */
export const supportHelpCenter = {
  eyebrow: 'Keep yourself unblocked',
  title: 'Answers at your fingertips',
  intro: 'A deep, searchable Help Center with 400+ training videos and step-by-step guides, available anytime.',
  items: [
    'Video walkthroughs, how-to articles, and troubleshooting guides',
    'Search by keyword to find exactly what you need',
    'Always up to date with the latest features and workflows',
  ],
  link: 'View Help Center',
  img: '/assets/img/support/receiving-subsidy__h8b07El906xp3dvLRjyHXfgBjxI.webp',
  imgW: 398, imgH: 298,
}

/* y=3858 — closing band, 1440x464, over a 568x352 playhouse illustration. */
export const supportCta = {
  h2: 'Let’s make your transition the easiest part of your year',
  sub: 'We’ve moved thousands of programs to Playground and we’ll make sure yours is just as smooth.',
  art: '/assets/img/support/illustration-of-a-playhouse-with-a__n5BSry6ZRUTMfoQf1OJFrDU99YE.webp',
}
