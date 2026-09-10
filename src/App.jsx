import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  AboutPage,
  CaseStudyPage,
  ContactPage,
  HomePage,
  PhotographyPage,
  WorkPage,
} from './pages/portfolio-pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
