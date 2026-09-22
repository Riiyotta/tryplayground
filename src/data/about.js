/* /about — measured on the original at 1440 (height 7,689px, 13 h2s).
   Copy is the original's own, read off the live page. The founder-story
   narrative is summarised to its measured line count rather than reproduced
   in full. Assets in /assets/img/about/. */

export const aboutHero = {
  h1: 'Helping child care providers thrive & shine',
  curve: '/assets/img/about/thin-tan-curve-line-decoration__CcwzJafhqNyPonprXnKtGozNCU.svg',
  /* Eight photos ringing the hero, measured 196-222px square. */
  photos: [
    '/assets/img/about/photo-of-children-sitting-on-the-f__Vn5DQft83NPxUB736gcNuuGE.webp',
    '/assets/img/about/photo-of-a-teacher-reading-with-ch__5h8hrII1AMsvzZT6DkhfxBOcAw.webp',
    '/assets/img/about/photo-of-three-children-smiling-in__oYTivvL9QciESzAHxvaFCaevpI.webp',
    '/assets/img/about/photo-of-a-parent-and-child-signin__xK74uTuKd4ctgyLR2NkafehlRg.webp',
    '/assets/img/about/photo-of-a-teacher-reading-a-dinos__fatf9D9tNN5cWZgWGwkGQ0CMmw.webp',
    '/assets/img/about/photo-of-a-teacher-with-a-child-ho__HM3MywCBeONXMyAKiI9tyovvdc.webp',
    '/assets/img/about/photo-of-a-teacher-reading-a-dinos__qy3injEXxzmhRXqA0IYrV9VRGJE.webp',
  ],
}

/* y=916 — an open letter, over the scribble pattern. */
export const aboutLetter = {
  h2: 'Child care providers are heroes to us',
  salutation: 'Dear Child Care Providers,',
  paras: [
    'You pour your hearts into nurturing young minds, juggling endless tasks, and making sure every child feels seen.',
    'You’re the backbone of our communities, supporting families and laying the foundation for lifelong learning.',
    'But child care providers face an uphill battle - mountains of paperwork, rising cost of care, and too little time.',
  ],
  closing: "We're here to help you flip the script.",
  pattern: '/assets/img/about/decorative-pattern-of-light-scribb__1F6MLLMPjpDR3Bpl5JwcUYbWgU.webp',
  art:     '/assets/img/about/email-envelope-with-a-blue-playgro__JpqyuSriovRfvobT1ArvM2akPJs.webp',
}

/* y=2100 */
export const aboutShift = {
  h2: 'A technology shift is happening',
  paras: [
    'For too long, child care programs have been stuck with clunky tools and manual processes, falling behind other industries.',
    'But Playground is flipping the script.',
    'Playground is a proven platform for child care providers to streamline their operations, reclaim their time, and grow.',
  ],
  art: '/assets/img/about/integration-icons-for-payment-acco__C2aIGkmr8tUFJgC6u5PbI7u77g8.webp',
}

/* y=2497 — three stats, measured 40px/44 w700. */
export const aboutStats = {
  h2: 'Difference made since 2019',
  items: [
    { v: '500,000+', l: 'families served' },
    { v: '5,000+',   l: 'programs helped' },
    { v: '50',       l: 'states supported' },
  ],
}

/* y=2866 — origin story. Each paragraph carries one emphasised clause on the
   original, kept here as `em` so the styling can match. */
export const aboutStory = {
  h2: 'How it started',
  paras: [
    { t: 'Child care is in their DNA. Their mom was the director of a center, with grandma working alongside her.', em: 'Child care is in their DNA.' },
    { t: 'But they saw the struggle up close.', em: 'But they saw the struggle up close.' },
    { t: 'The endless spreadsheets, the clunky software, the paperwork mountains. These things were eating up the hours that should have gone to children.', em: 'The endless spreadsheets, the clunky software, the paperwork mountains.' },
    { t: 'Finally, their family had the tool that turned admin chaos into calm. Their family got back hours every week.', em: 'turned admin chaos into calm' },
    { t: 'Word got out, and soon other providers across the country were asking for Playground. What started at one center became the platform helping child care providers nationwide.', em: 'the platform helping child care providers nationwide' },
  ],
}

/* y=3771 — a two-tab review wall (Directors / Families), 4.96 stars. */
export const aboutLoved = {
  h2: 'The all-in-one child care platform is loved by',
  rating: '4.96 stars across 8,000+ reviews',
  tabs: ['Directors', 'Families'],
  reviews: [
    'Playground has the best customer service. The features they offer are mind blowing. It is a thorough program.',
    "The customer service is tremendous, and there's always someone to help me. Honestly, of all the systems I've used, this is the best.",
    'We moved the money we normally spent on chasing families for payments to pay our teachers more money.',
    'Playground was fast, covered almost all my business needs, and was affordable. I probably would not have opened without it.',
    'This is the best app I have found to work with my daycare business. It is so easy to keep track of everything.',
    'My overall experience with Playground has been extremely great. I love that if I have a question someone answers.',
    'The staff and developers have made it such a seamless process and we couldn’t be happier that we switched.',
  ],
}

/* y=4426 — four podcast appearances. */
export const aboutPodcasts = {
  h2: 'Give our leadership team a listen',
  items: [
    'Child Care Conversations',
    'Rockstar Radio with Kris Murray',
    'The Child Care Business Coach',
    "Playground's Family Origin Story From Founders' Mom POV",
  ],
}

/* y=5278 — two closing cards. */
export const aboutCards = [
  { title: 'Make your families and staff happier',
    desc: 'See how you can consolidate your systems and grow your business',
    cta: 'Book a demo', to: null },
  { title: 'Join our mission and make an impact',
    desc: 'Do career-defining work alongside smart, passionate people while building something that matters',
    cta: 'Careers at Playground', to: '/careers' },
]
