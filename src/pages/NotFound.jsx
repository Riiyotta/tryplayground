import { Link } from 'react-router-dom'
import { PrimaryButton } from '../components/Primitives'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-center px-5 py-32 text-center">
      <p className="text-caption font-medium text-eyebrow">404</p>
      <h1 className="mt-4 max-w-[620px] font-display text-[48px] font-bold leading-[52.8px]
                     tracking-[-0.06em] text-ink">
        We couldn't find that page
      </h1>
      <p className="mt-5 max-w-[501px] text-body text-muted">
        The page you're looking for may have moved, or it hasn't been built in this
        clone yet.
      </p>
      <Link to="/" className="mt-8">
        <PrimaryButton className="h-[48px]">Back to home</PrimaryButton>
      </Link>
    </section>
  )
}
