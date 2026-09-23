import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import { Footer } from './Sections'
import { useMissingAssetFallback } from './Primitives'

/* Restores the top of the page on navigation. A client-side router keeps the
   scroll position by default, which lands you mid-page on the next route. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* Shared chrome. The nav and footer are identical across every route on the
   original, so they mount once here rather than per page. */
export default function Layout() {
  /* Keeps the page laid out correctly when public/assets/ is absent, which
     is the default on a fresh clone - see NOTICE.md. */
  useMissingAssetFallback()

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
