/* /solutions/ai — measured on the original at 1440 (height 8,137px).
   Distinct from the other /solutions pages: a three-card capability grid,
   four benefit cards, and a three-step onboarding row, so it gets its own
   page rather than the shared SolutionPage renderer.

   NOTE on the H1: the original renders "Grow your child care program" and
   "faster with AI" as two spans with no space between them, so the accessible
   name reads "programfaster". Reproduced as measured. */

export const aiHero = {
  h1a: 'Grow your child care program',
  h1b: 'faster with AI',
  sub: 'Camber is an AI employee for child care that answers inquiry calls, supports your staff, and handles the daily admin work.',
  backdrop: '/assets/img/sol-ai/illustration-of-office-workers-at-__SOqd7alewBVHuP2rmJ53jzs02n0.png',
}

/* y=1300 — three core skills, each a card with a screenshot. */
export const aiSkills = {
  h2: 'Multiply what your program gets done in a day',
  intro: 'Camber handles daily admin work, captures and converts enrollment leads, and keeps your entire team unblocked.',
  cards: [
    { title: 'Enrollment',
      desc: 'Camber answers inquiry calls, transcribes and summarizes every conversation, creates leads in your CRM, and forecasts upcoming openings.',
      img: '/assets/img/sol-ai/convert-to-lead-form-with-call-rec__UUd3PgARXPOkyRDT05K6my8R00.webp' },
    { title: 'Knowledge',
      desc: 'Camber gives every staff member access to an experienced director who knows your policies, your handbook, and state licensing.',
      img: '/assets/img/sol-ai/camber-ai-answering-a-question-abo__Ca6vXc1OiIawI87eImx2JzyN0vQ.webp' },
    { title: 'Assistant Director',
      desc: "Camber handles the daily requests that eat up a director's time. Draft a notice, issue a refund, build a report, write a lesson plan.",
      img: '/assets/img/sol-ai/camber-ai-suggesting-a-lice-breako__bS7onsEpBmUqztQ30nQAGokKwmA.webp' },
  ],
}

/* y=2514 — four benefit cards. */
export const aiBenefits = {
  h2: 'The extra set of hands you always needed, without the expense',
  lead: 'Get an always-on child care employee for your program.',
  cards: [
    { title: 'Get more done with less',
      desc: 'Camber handles the work you wish you had someone for — answering calls after hours, drafting messages, chasing paperwork.' },
    { title: 'On call 24/7, 365 days a year',
      desc: 'Camber is always there for after-hours inquiry calls, weekend questions, and staff on lunch. No voicemail, no missed leads.' },
    { title: 'Built for child care',
      desc: 'Camber understands state licensing, ratios, enrollment cycles, and how child care programs actually operate.' },
    { title: 'Works inside the system you already use',
      desc: 'Camber is embedded in Playground. No new tabs, no copy-pasting. Your team just works and Camber keeps up.' },
  ],
}

/* y=4068 — trained on your business. */
export const aiTrained = {
  h2: 'Camber is trained specifically on your business, just like a normal employee',
  sub: "Camber can answer questions about your curriculum and philosophy, share your program's history, and follow your talk tracks.",
  callLabel: 'Every call is:',
  callItems: [
    'Transcribed and summarized automatically',
    'Paired with suggested follow-up tasks',
    'Triggered into your marketing automations',
  ],
  img: '/assets/img/sol-ai/camber-ai-call-transcript-with-sug__WfZvDkVPQ51AhqrYottR5p4Pt5c.webp',
}

/* y=4878 — three onboarding steps, each with what you do and what you get. */
export const aiOnboard = {
  h2: 'Onboard Camber today',
  steps: [
    { do: "Connect your program's phone in one minute", get: 'Inquiry calls answered automatically' },
    { do: 'Upload your SOPs and handbook in one minute', get: 'Staff getting immediate answers to their questions' },
    { do: 'Add any current promotions or preferred talk tracks', get: 'Leads created in your CRM automatically' },
  ],
  outcome: 'Hours back every week for your whole team',
  img: '/assets/img/sol-ai/playground-sidebar-with-camber-ai-__thNLuZ8m9hDo46g2z5JuO3wsSM.webp',
}

/* y=5485. Four of the five answers were captured with the text-diff method.
   "What is Camber?" is a collapsed 515x44 row whose answer is NOT present in
   the DOM until expanded, and the expand did not fire under automation - so
   rather than invent one, the question is shipped with a short answer drawn
   from the page's own hero and skills copy, and flagged here as such. */
export const aiFaq = [
  { q: 'What is Camber?',
    a: 'Camber is an AI employee for child care, built into Playground. It answers inquiry calls, supports your staff with instant answers, and handles daily admin work.',
    fromPageCopy: true },
  { q: 'What can Camber do for my child care program?',
    a: 'Camber has three core skills: Enrollment (answers inbound inquiry calls, captures leads, and forecasts openings), Knowledge (gives every staff member instant answers about your policies, SOPs, and state licensing), and Assistant Director (handles billing actions, drafts messages, builds CRM reports, and writes lesson plans).' },
  { q: 'Is Camber a replacement for a real employee?',
    a: 'No. Camber is designed to handle the repeatable, after-hours, and admin-heavy work that pulls directors and staff away from kids and families. It frees your team to focus on relationships, leadership, and care — the parts of the job that need a human.' },
  { q: 'Do I need to use Playground to use Camber?',
    a: "Yes. Camber is embedded directly in Playground, so it has live access to your enrollment, billing, communication, and CRM data. That's what lets it take action — like issuing a refund or creating a lead — instead of just answering questions." },
  { q: 'How long does it take to get Camber set up?',
    a: "Most programs are live in about a week. Day one, you upload your SOPs and handbook and connect your program's phone. By day five, Camber is answering calls and creating leads in your CRM. By day 30, programs typically report hours saved across the team and fewer leads slipping through the cracks." },
]

export const aiCta = 'Book a demo to add a full-time employee, without the payroll.'
