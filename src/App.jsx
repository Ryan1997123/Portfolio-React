import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LanguageProvider } from './lib/LanguageContext'
import { HomePage } from './pages/home-page'
import { ContactPage, WorkPage } from './pages/simple-pages'
import { Analytics } from '@vercel/analytics/react'

const LazyCaseStudyPage = lazy(() =>
  import('./pages/case-study-page').then(({ CaseStudyPage }) => ({
    default: CaseStudyPage,
  })),
)
const LazyPhotographyPage = lazy(() =>
  import('./pages/photography-page').then(({ PhotographyPage }) => ({
    default: PhotographyPage,
  })),
)
const LazyAboutPage = lazy(() =>
  import('./pages/about-page').then(({ AboutPage }) => ({
    default: AboutPage,
  })),
)
function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search])

  return null
}

export function AppRoutes({
  AboutPageComponent = LazyAboutPage,
  CaseStudyPageComponent = LazyCaseStudyPage,
  PhotographyPageComponent = LazyPhotographyPage,
}) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={null}>
              <AboutPageComponent />
            </Suspense>
          }
        />
        <Route path="/work" element={<WorkPage />} />
        <Route
          path="/work/:slug"
          element={
            <Suspense fallback={null}>
              <CaseStudyPageComponent />
            </Suspense>
          }
        />
        <Route
          path="/photography"
          element={
            <Suspense fallback={null}>
              <PhotographyPageComponent />
            </Suspense>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Analytics />
    </LanguageProvider>
  )
}

export default App
