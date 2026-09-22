/* /customers — measured on the original at 1440 (height 5,625px).
   Structure: a hero, four featured customer cards (portrait in the orange
   frame + quote + stat), then a "Wall of love" masonry of short quotes, then
   the shared closing CTA.
   Quotes, names and organisations are the original's own, read off the live
   page. 10 of the 13 assets were already on disk from earlier pages and are
   reused by content hash. */

export const customersHero = {
  h1: 'See how our providers succeed with Playground',
  sub: 'Our customers make more money, simplify their lives, and delight their families.',
}

export const customersFrame = '/assets/img/billing/orange-wooden-picture-frame__nue2i7o2sxoI5GXXx889BETVhnM.webp'

/* Featured stories at y=513 / 1049 / 1530 / 2052. Two carry a portrait. */
export const customersFeatured = [
  {
    name: 'Jermaine Rucker', org: 'Little Minds Universe',
    quote: "“I've recommended Playground to half a dozen other preschools. We absolutely love how it lets parents do so much themselves.”",
    portrait: '/assets/img/customers/hand-drawn-portrait-of-little-mind__v97uOPs7pvLY1uTrWshDYTdUgo.webp',
    video: 'Watch video', cta: 'Read case study',
    stats: [
      { v: '$2,000', l: 'saved monthly' },
      { v: '1 week', l: 'saved for office staff each' },
    ],
  },
  {
    name: 'Kayla Snodgrass', org: "Systems Coordinator, Little Sunshine's Playhouse",
    quote: '“We use Playground for everything now. The enrollment process especially has been a game changer for us.”',
  },
  {
    name: 'Carrie Hoffman', org: 'The Acorn School',
    quote: '“Playground fully replaced our paper registration process. It saved our office staff a full week of work.”',
  },
  {
    name: 'Nich Caughell', org: 'The Weston School',
    quote: '“Across all locations, we’re saving 30 hours a month just on tasks parents can now do themselves.”',
    portrait: '/assets/img/customers/hand-drawn-portrait-of-a-smiling-m__JWjQabDcKu0ZBBcgLU9hS4xzNJM.webp',
    stats: [{ v: '30 hours', l: 'saved each month' }],
  },
  {
    name: 'Kaitlynn Snider', org: 'Boys & Girls Club of the Mountain Empire',
    quote: '“Autopay is one of the best features. As soon as Playground was implemented, families turned on autopay and our bank account felt the positive impact.”',
  },
  {
    name: 'Kaycee Cottone', org: 'IS/ERSEA Director, South Oregon Head Start',
    quote: '“We’ve probably saved the equivalent of two full-time employee salaries by automating and streamlining our processes.”',
  },
]

/* y=2581 — "Wall of love", a masonry of short unattributed-to-role quotes. */
export const customersWall = {
  h2: 'Wall of love',
  items: [
    { q: "Every center runs differently and Playground adapted to that. We’re very pleased with how they've supported us.", by: 'Tiffany Bunker', org: 'St. John Lutheran Church' },
    { q: "Playground is the most customer-friendly system we've used. When we ask for a feature, they make it happen.", by: '', org: 'Southern Oregon Head Start' },
    { q: 'I was a teacher before and when I came back to the office, I’d thought Playground was going to be complicated. It wasn’t.', by: 'Joy Trapani', org: 'Montessori of New Paltz' },
    { q: "Playground's enrollment and billing has saved us at least 25 hours each month. I cannot overstate the difference.", by: 'Denisse Cardenas', org: '' },
  ],
}

/* y=3976 — closing CTA over the classroom band, with the audience tiles. */
export const customersCta = {
  h3: 'Book a demo and start making your families and staff happier',
  backdrop: '/assets/img/billing/illustration-of-a-child-care-class__gOkLwb1Dh5AjSDRi8K54mSRf8A.webp',
  tiles: [
    { label: 'Home-Based',     img: '/assets/img/billing/home-based__0kpkGLsFWlTZ3aoeMnKfdyPg.webp', w: 198, h: 198 },
    { label: 'Center',         img: '/assets/img/billing/center__HugA0yvcGMsV0FTsxg5phDahg.webp',     w: 198, h: 198 },
    { label: 'Multi-Location', img: '/assets/img/billing/multi-location__2GRUsS42fqlpqT2x6fNfTQ6Inc.webp', w: 198, h: 171 },
  ],
}
