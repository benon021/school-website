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
import AnnouncementsPage from './pages/AnnouncementsPage'
import AdminPortal from './pages/admin/AdminPortal'
import { ContentProvider } from './context/ContentContext'
import { AuthProvider } from './context/AuthContext'
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
  'announcements',
  'admin',
]

function parsePageFromHash() {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase()
  if (!hash || hash === 'home') return 'home'

  if (hash.startsWith('admin') || hash.startsWith('login') || hash.startsWith('portal')) {
    return 'admin'
  }
  if (
    hash.startsWith('announce') ||
    hash.startsWith('notice') ||
    hash.startsWith('alert') ||
    hash.startsWith('circular')
  ) {
    return 'announcements'
  }
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



function MainApp() {
  const [currentPage, setCurrentPage] = useState(parsePageFromHash)
  const [isNavigating, setIsNavigating] = useState(false)
  useReveal(currentPage)

  const triggerTransition = () => {
    setIsNavigating(true)
    setTimeout(() => setIsNavigating(false), 500)
  }

  useEffect(() => {
    const handleHash = () => {
      const page = parsePageFromHash()
      triggerTransition()
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigateTo = (pageId) => {
    triggerTransition()
    setCurrentPage(pageId)
    window.location.hash = `#${pageId}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // If viewing the Admin CMS Portal, render it standalone
  if (currentPage === 'admin') {
    return <AdminPortal onBackToSite={() => navigateTo('home')} />
  }

  const isSubpage = VALID_SUBPAGES.includes(currentPage)

  return (
    <>
      {/* Route progress indicator for page reload/navigation */}
      <div className={`route-progress-bar ${isNavigating ? 'active' : ''}`} aria-hidden="true" />

      <Navbar activePage={currentPage} onNavigate={navigateTo} />
      <main key={currentPage} className="page-transition-wrap">
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
        {currentPage === 'announcements' && <AnnouncementsPage onNavigate={navigateTo} />}
      </main>
      <Footer onNavigate={navigateTo} />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <MainApp />
      </ContentProvider>
    </AuthProvider>
  )
}
