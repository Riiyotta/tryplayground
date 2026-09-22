import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import FeatureSection from '../components/FeatureSection'
import {
  GetToKnow, Testimonials, BuiltFor, Timeline, Savings, Support, FinalCTA,
} from '../components/Sections'
import {
  marketingFeatures, financeFeatures, opsFeatures, aiFeatures,
} from '../data/content'

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <GetToKnow />
      <Testimonials />

      <FeatureSection
        id="marketing"
        heading="Make your marketing as good as the big brands"
        eyebrow="Marketing"
        headingW={608}
        cardH={[668, 652]}
        padTop={0}
        intro="Easy marketing automations right on your website. Capture more leads, grow your enrollment."
        features={marketingFeatures}
        tone="cream"
      />

      <FeatureSection
        id="finances"
        heading="Your centers' entire financial picture"
        eyebrow="Finances"
        headingW={558}
        cardH={[690, 686]}
        lead="Say goodbye to a scattered stack of tools and consolidate your finances into one place."
        features={financeFeatures}
        tone="grey"
      />

      <FeatureSection
        id="operations"
        heading="Run your program with ease"
        eyebrow="Operations"
        headingW={468}
        cardH={[554, 556]}
        intro="The entire toolkit, purpose built to make your teachers and families happier."
        features={opsFeatures}
        tone="warm"
      />

      <FeatureSection
        id="ai"
        heading="Meet Camber, the first AI employee build for child care."
        eyebrow="AI"
        headingW={750}
        cardH={[480, 480]}
        intro="Camber answers inquiry calls, supports your staff, and handles the daily admin work — giving your team back the hours they spend on the phone and in the inbox."
        features={aiFeatures}
        tone="blue"
        padBottom={140}
      />

      <BuiltFor />
      <Timeline />
      <Savings />
      <Support />
      <FinalCTA />
    </main>
  )
}
