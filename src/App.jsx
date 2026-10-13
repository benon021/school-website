import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import { Pillars, About, SchoolLife, Admissions } from './components/Sections'
import { Facilities, Performance, CTA, Footer } from './components/MoreSections'
import TransportPage from './pages/TransportPage'
import AcademicsPage from './pages/AcademicsPage'
import BoardingPage from './pages/BoardingPage'
import CoCurricularPage from './pages/CoCurricularPage'
import FacilitiesPage from './pages/FacilitiesPage'
import AdmissionsPage from './pages/AdmissionsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import useReveal from './hooks/useReveal'

const VALID_SUBPAGES = [
  'transport',
  'academics',
  'boarding',
  'cocurricular',
  'facilities',
  'admissions',
  'about',
  'contact',
]

function parsePageFromHash() {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase()
  if (!hash || hash === 'home') return 'home'

  if (hash.startsWith('transport')) return 'transport'
  if (hash.startsWith('academic')) return 'academics'
  if (hash.startsWith('board')) return 'boarding'
  if (
    hash.startsWith('cocurricular') ||
    hash.startsWith('sport') ||
    hash.startsWith('club') ||
    hash.startsWith('activities')
  ) {
    return 'cocurricular'
  }
  if (hash.startsWith('facilit')) return 'facilities'
  if (hash.startsWith('admiss') || hash.startsWith('apply') || hash.startsWith('fee')) {
    return 'admissions'
  }
  if (hash.startsWith('about')) return 'about'
  if (hash.startsWith('contact') || hash.startsWith('locat')) return 'contact'

  // Default to home page for any unknown hashes or anchor links
  return 'home'
}

function App() {
  const [currentPage, setCurrentPage] = useState(parsePageFromHash)
  useReveal(currentPage)

  useEffect(() => {
    const handleHash = () => {
      const page = parsePageFromHash()
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigateTo = (pageId) => {
    setCurrentPage(pageId)
    window.location.hash = `#${pageId}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isSubpage = VALID_SUBPAGES.includes(currentPage)

  return (
    <>
      <Navbar activePage={currentPage} onNavigate={navigateTo} />
      <main>
        {!isSubpage && (
          <>
            <HeroSection onNavigate={navigateTo} />
            <Pillars />
            <About />
            <SchoolLife />
            <Admissions />
            <Facilities />
            <Performance />
            <CTA />
          </>
        )}

        {currentPage === 'transport' && <TransportPage onNavigate={navigateTo} />}
        {currentPage === 'academics' && <AcademicsPage onNavigate={navigateTo} />}
        {currentPage === 'boarding' && <BoardingPage onNavigate={navigateTo} />}
        {currentPage === 'cocurricular' && <CoCurricularPage onNavigate={navigateTo} />}
        {currentPage === 'facilities' && <FacilitiesPage onNavigate={navigateTo} />}
        {currentPage === 'admissions' && <AdmissionsPage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}
      </main>
      <Footer onNavigate={navigateTo} />
    </>
  )
}

export default App
