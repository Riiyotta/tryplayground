import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SolutionsBilling from './pages/SolutionsBilling'
import Support from './pages/Support'
import Customers from './pages/Customers'
import WhyPlayground from './pages/WhyPlayground'
import About from './pages/About'
import SolutionPage from './pages/SolutionPage'
import SolutionsAi from './pages/SolutionsAi'
import ForPage from './pages/ForPage'
import IndexPage from './pages/IndexPage'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import Changelog from './pages/Changelog'

/* The original is 861 URLs, but they are not one template per group: two
   pages in the same group measure very differently (/solutions/billing is
   12,955px with 20 h2s, /solutions/payroll 8,052px with 13), so each page
   here is built and measured on its own rather than generated from a shared
   shell. Routes are added as their page is built; anything not yet built
   falls through to NotFound rather than rendering a half-right page. */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/solutions/billing" element={<SolutionsBilling />} />
          <Route path="/support" element={<Support />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/why-playground" element={<WhyPlayground />} />
          <Route path="/about" element={<About />} />
          {/* billing and ai are hand-built (own shapes); the rest share a renderer */}
          <Route path="/solutions/ai" element={<SolutionsAi />} />
          <Route path="/solutions/:slug" element={<SolutionPage />} />
          <Route path="/for/:slug" element={<ForPage />} />
          <Route path="/webinars" element={<IndexPage name="webinars" />} />
          <Route path="/resources" element={<IndexPage name="resources" />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
