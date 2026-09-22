/* /careers — measured on the original at 1440 (height 12,158px, 17 h2s).
   Copy is the original's own, read off the live page. Photographs of the
   team are downloaded to /assets/img/careers/.

   The two "failed" downloads reported during the asset pass were Bing
   tracking pixels (bat.bing.com, 0x0), not real assets - the `file` check
   rejected them correctly. */

export const careersHero = {
  eyebrow: 'Join now — Make your mark with career-defining work',
  h2: 'Help make excellent child care accessible to all',
  sub: 'At Playground, build something that matters & do career-defining work.',
  photos: [
    { src: '/assets/img/careers/photo-of-three-people-posing-in-fr__RfvnFA7dT7FU9bj3aS67ocEnYU.jpg', w: 349, h: 284 },
    { src: '/assets/img/careers/photo-of-two-people-staffing-a-pla__DI2bRR0iQWhO6mhTBN8cmt4yE.png', w: 230, h: 284 },
    { src: '/assets/img/careers/group-photo-of-people-in-matching-__QGyZLx38VmI5Lpc3PrdM1chdSo.jpg', w: 349, h: 284 },
  ],
}

export const careersMission = {
  h2: 'Building the backbone of modern child care',
  body: 'At Playground, you’ll build tools that simplify life for child care providers — helping programs run smoothly so educators can focus on children.',
  art: '/assets/img/careers/playground-enrollment-roster-showi__FjsiUzCEywEMX8Nxh5zEZ5WmhRg.webp',
  backdrop: '/assets/img/careers/illustration-of-a-child-care-neigh__TEIKhCgg3kKJSZKkEkwDIfG4MGo.webp',
}

/* y=2146 — the same review wall the /about page carries. */
export const careersLoved = {
  h2: 'The platform is loved by',
  reviews: [
    'Playground has the best customer service. The features they offer are mind blowing. It is a thorough program.',
    "The customer service is tremendous, and there's always someone to help me. Honestly, of all the systems I've used, this is the best.",
    'We moved the money we normally spent on chasing families for payments to pay our teachers more money.',
    'Playground was fast, covered almost all my business needs, and was affordable. I probably would not have opened without it.',
    'This is the best app I have found to work with my daycare business. It is so easy to keep track of everything.',
    'My overall experience with Playground has been extremely great. I love that if I have a question someone answers.',
  ],
  investor: '/assets/img/careers/kleiner-perkins-wordmark-logo__bPG3homtJiGXwKZKI99QRY05M.png',
}

export const careersTiming = {
  h2: 'You caught us at a good time',
  body: 'We know that a lot is uncertain when joining an early-stage startup. Nothing in life is guaranteed, but we think the timing here is unusually good.',
}

export const careersLife = {
  h2: 'Life at Playground',
  sub: "Hear from our teammates about what it's like to work at Playground",
  quote: "“I wanted to make an impact in a space that's historically been underserved. My sister is a teacher, so this work is personal.”",
}

export const careersValues = {
  h2: 'Our values drive the actions we take',
  items: [
    { t: 'High agency', d: 'We are high agency people who care a lot about what we do. We all think and act like owners.' },
    { t: 'Craft', d: 'We care deeply about the quality of our work and always strive to build something great.' },
    { t: 'Customer obsession', d: 'We work in child care and we deeply care about the experience of our customers, their staff, and families.' },
  ],
}

/* y=5627 — perks grid. */
export const careersPerks = {
  h2: 'Perks and benefits to help you do your best',
  items: [
    { t: 'Equity for everyone',            d: 'All full-time employees receive equity so you can share in what you help build.' },
    { t: 'Lunch on us',                    d: 'Enjoy lunch on us, adding up to $4,800 per year.' },
    { t: 'Health, dental & vision',        d: 'Comprehensive health, dental, and vision plans to keep you covered.' },
    { t: 'Discounted Child Care Supplies', d: 'Enjoy exclusive discounts on dozens of essential supplies like diapers & wipes.' },
    { t: 'Generous time off',              d: 'Plenty of paid time off so you can rest, recharge, and come back refreshed.' },
    { t: 'Learning budget',                d: 'Get $1,200 a year to spend on courses, books, or conferences that grow your skills.' },
    { t: 'Your ideal setup',               d: 'We’ll set you up with a MacBook and a stipend for your ideal desk setup.' },
  ],
}

/* y=6581 — two offices. */
export const careersOffices = {
  h2: 'Working in office across two incredible cities',
  items: [
    { city: 'New York', d: 'Right in Union Square, we’re surrounded by great food, easy transit, and NYC’s unmatched energy — right above a world-famous bakery.',
      img: '/assets/img/careers/map-view-of-a-child-care-location-__Q3rDrMhYNW5m7dEhFTW1tEIdZIY.png' },
    { city: 'Denver', d: 'Located in the heart of downtown Denver, you are steps away from world-class dining, transit, and the mountains.',
      img: '/assets/img/careers/illustration-of-three-children-run__FhTY1CC9AO6AaIIFwQEbuWU0U.png' },
  ],
}

export const careersProcess = {
  h2: 'How hiring works',
  steps: [
    'Submit your resume and answer a few questions about your experience through the application form.',
    'We pride ourselves on having a high bar for hiring and seek out the best talent.',
  ],
}
