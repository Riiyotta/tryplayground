/* /why-playground — measured on the original at 1440 (height 6,862px).
   Copy is the original's own. The five FAQ answers were captured with the
   before/after text-diff method (see PROCESS.md §7) rather than positional
   selectors, which return a neighbouring row's answer here. */

export const whyHero = {
  h1: 'You could be running your child care program a lot more smoothly',
  sub: 'Playground is the easiest way to enroll more families, forming deeper relationships with your community, and run your program.',
  backdrop: '/assets/img/why-playground/illustration-of-a-laptop-and-noteb__Jc4A8jKQ3PA9gdDeaMxgAtRfDLw.webp',
}

/* y=831 — the demo band leads with the program-type picker. Tiles measured
   198x250 at radius 10 on #F4F2EC; the selected one tints to
   rgba(70,160,219,0.2). Picking one reveals a contact step (page text grows
   4403 -> 5015 chars), so it is a two-step lead form. */
export const whyDemo = {
  h3: 'Book a demo to see why providers are switching.',
  step1: 'First, tell us about yourself. What type of program do you run?',
  step2: "Great! What's the best way we can contact you?",
  tiles: [
    { label: 'Home-Based',     img: '/assets/img/billing/home-based__0kpkGLsFWlTZ3aoeMnKfdyPg.webp' },
    { label: 'Center',         img: '/assets/img/billing/center__HugA0yvcGMsV0FTsxg5phDahg.webp' },
    { label: 'Multi-Location', img: '/assets/img/billing/multi-location__2GRUsS42fqlpqT2x6fNfTQ6Inc.webp' },
  ],
}

/* y=1613 — problem/solution pairs. Left column is the pain, right is what
   Playground replaces it with. */
export const whyProblems = {
  h2: 'The real problems you’re dealing with',
  intro: 'Playground saves you time and money by consolidating your tools & systems so you have one system of record.',
  rows: [
    { problem: 'System Chaos',
      detail: 'Juggling 6+ tools means nothing talks to each other. Info slips through the cracks, and your team wastes hours re-entering the same data.',
      solution: 'Unified system',
      solutionDetail: 'Every task and file in one place. Save valuable hours, prevent confusion, and keep everything in sync.' },
    { problem: 'Revenue Leakage',
      detail: 'Tours don’t get followed up. Families drop off mid-enrollment. Invoices are sent out late. Late fees go uncollected.',
      solution: 'Don’t let another lead slip through the cracks',
      solutionDetail: 'Payment collection on autopilot.' },
    { problem: 'Admin Overload',
      detail: 'Manual processes eat hours. Staff spend their time on forms, not families.',
      solution: 'Registration process with less paper and work',
      solutionDetail: 'Reliable attendance management every day, and simplified subsidy billing.' },
    { problem: 'Workflow Bottlenecks',
      detail: 'Things break down when only one person knows how to do payroll or post tuition. People burn out and knowledge walks out the door.',
      solution: 'Pay staff on time, in compliance',
      solutionDetail: 'Day-to-day communication with families, handled.' },
    { problem: 'Licensing Risk',
      detail: 'No paper trail. No backup plan. When licensing shows up, you’re nervous about fines, violations, or worse.',
      solution: 'Critical reports available in seconds',
      solutionDetail: 'Everything documented and ready when you need it.' },
  ],
}

/* y=3169 — the shared testimonial band (same two customers as billing). */
export const whyTestimonials = {
  h2: 'Hear what customers are saying',
  frame:    '/assets/img/billing/orange-wooden-picture-frame__nue2i7o2sxoI5GXXx889BETVhnM.webp',
  portrait: '/assets/img/billing/hand-drawn-portrait-of-little-mind__GSVegCXP0LxqNC8tcQap7wiLn2E.webp',
  items: [
    { quote: "“We haven't lost a single teacher since starting with Playground. They're the secret to our retention.”",
      name: 'Jermaine Rucker', role: 'Owner at Little Minds Universe' },
    { quote: '“Playground helped us put together a plan so that our parents and teachers felt prepared when we started.”',
      name: 'Dr. Tamar Andrews', role: 'Temple Isaiah Preschool' },
  ],
}

/* y=4006 */
export const whySavings = {
  h2: 'Get access to the Playground Savings Club',
  intro: 'Playground customers get 10–40% off the supplies they already buy with the exclusive Savings Club.',
  link: 'See how it works',
}

/* y=4498 — "Purpose built for ECE" with the weekly release list. */
export const whyEce = {
  h2: 'Purpose built for ECE',
  intro: 'Designed for early child care professionals focused on delivering the best care possible.',
  releases: [
    { v: '4.1',  t: 'Added Food programs',      d: '3/21/25' },
    { v: '4.2',  t: 'Improved navigation',      d: '4/3/25' },
    { v: '4.21', t: 'New Quickbooks connector', d: '4/12/25' },
    { v: '4.22', t: 'Added new report view',    d: '4/22/25' },
  ],
}

/* y=5436 — five questions; answers via the text-diff capture. */
export const whyFaq = [
  { q: 'What makes Playground different from other childcare management software?',
    a: 'Playground is purpose-built for early child care education and consolidates the tools most programs already use into a single system. Instead of juggling separate apps for billing, enrollment, communication, payroll, attendance, and licensing reports, programs use Playground as one system of truth — so information moves between teams without re-entry.' },
  { q: 'Is switching from another childcare management software to Playground difficult?',
    a: "No. Playground's onboarding team transfers your data from your existing childcare management software — billing records, family information, enrollment data, and payment history — as part of implementation. The migration is supported end-to-end so your program keeps operating during the transition without an interruption in service to families." },
  { q: 'How long does it take to switch to Playground?',
    a: 'Implementation timing depends on the size and complexity of your program. The onboarding team handles data migration from your existing system, configures billing rules and tuition plans for how your program operates, and trains staff before you go live. The team manages the entire transition so your program continues running without disruption.' },
  { q: 'What kind of customer support is included with Playground?',
    a: 'Playground includes human-led customer support with an average first response time of 60 seconds. The support team helps directors, owners, and staff with setup, configuration questions, and day-to-day workflow issues — and has been recognized for service quality. Support is part of the platform rather than gated behind a separate tier.' },
  { q: 'How often does Playground release new features and updates?',
    a: 'Playground ships weekly product updates, with new features and improvements driven by direct customer feedback. The full changelog is publicly viewable, so customers can see exactly what has shipped recently — for example, new reporting views, billing improvements, food program tools, and integrations like the QuickBooks connector.' },
]
