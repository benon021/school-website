import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

export function Brand({ onNavigate }) {
  const handleClick = (e) => {
    e.preventDefault()
    if (onNavigate) onNavigate('home')
    else window.location.hash = '#home'
  }

  return (
    <a
      href="#home"
      onClick={handleClick}
      className="brand"
      aria-label="Mt. Elgon Academy Primary School home"
    >
      <span className="crest" aria-hidden="true">
        MEA
      </span>
      <span className="brand-text">
        <strong>Mt. Elgon Academy</strong>
        <span>Primary School</span>
      </span>
    </a>
  )
}

export default function Navbar({ activePage = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isSchoolLifeActive = ['transport', 'boarding', 'cocurricular'].includes(activePage)
  const [dropdownOpen, setDropdownOpen] = useState(isSchoolLifeActive)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-expand if active page is a school-life subpage
  useEffect(() => {
    if (isSchoolLifeActive) {
      setDropdownOpen(true)
    }
  }, [activePage, isSchoolLifeActive])

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest('.has-dropdown')) {
        setDropdownOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Lock body scrolling when mobile navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNav = (pageId, e) => {
    if (e) e.preventDefault()
    setMobileMenuOpen(false)
    setDropdownOpen(false)
    if (onNavigate) {
      onNavigate(pageId)
    } else {
      window.location.hash = `#${pageId}`
    }
  }

  const toggleDropdown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDropdownOpen((prev) => !prev)
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <nav className="container" aria-label="Main navigation">
          <Brand onNavigate={onNavigate} />

          <div className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li>
                <a
                  href="#home"
                  className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                  id="nav-home"
                  onClick={(e) => handleNav('home', e)}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#academics"
                  className={`nav-link ${activePage === 'academics' ? 'active' : ''}`}
                  id="nav-academics"
                  onClick={(e) => handleNav('academics', e)}
                >
                  Academics & CBC
                </a>
              </li>

              <li className={`has-dropdown ${dropdownOpen ? 'expanded' : ''}`}>
                <button
                  type="button"
                  className={`nav-link nav-dropdown-trigger ${isSchoolLifeActive ? 'active' : ''}`}
                  id="nav-school-life"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                >
                  <span>School Life</span>
                  <ChevronDown
                    size={16}
                    className={`dropdown-chevron ${dropdownOpen ? 'rotated' : ''}`}
                  />
                </button>

                <div className={`dropdown ${dropdownOpen ? 'show-mobile' : ''}`}>
                  <a
                    href="#transport"
                    className={`dropdown-link ${activePage === 'transport' ? 'active' : ''}`}
                    onClick={(e) => handleNav('transport', e)}
                  >
                    <span className="dropdown-label">
                      <strong>School Transport</strong>
                      <small>Routes & bus service</small>
                    </span>
                  </a>

                  <a
                    href="#boarding"
                    className={`dropdown-link ${activePage === 'boarding' ? 'active' : ''}`}
                    onClick={(e) => handleNav('boarding', e)}
                  >
                    <span className="dropdown-label">
                      <strong>Boarding & Dining</strong>
                      <small>Dormitories & nutrition</small>
                    </span>
                  </a>

                  <a
                    href="#cocurricular"
                    className={`dropdown-link ${activePage === 'cocurricular' ? 'active' : ''}`}
                    onClick={(e) => handleNav('cocurricular', e)}
                  >
                    <span className="dropdown-label">
                      <strong>Sports, Clubs & Trips</strong>
                      <small>Co-curricular champs</small>
                    </span>
                  </a>
                </div>
              </li>

              <li>
                <a
                  href="#facilities"
                  className={`nav-link ${activePage === 'facilities' ? 'active' : ''}`}
                  id="nav-facilities"
                  onClick={(e) => handleNav('facilities', e)}
                >
                  Facilities
                </a>
              </li>

              <li>
                <a
                  href="#admissions"
                  className={`nav-link ${activePage === 'admissions' ? 'active' : ''}`}
                  id="nav-admissions"
                  onClick={(e) => handleNav('admissions', e)}
                >
                  Admissions
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
                  id="nav-about"
                  onClick={(e) => handleNav('about', e)}
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
                  id="nav-contact"
                  onClick={(e) => handleNav('contact', e)}
                >
                  Contact
                </a>
              </li>

              <li className="nav-cta-item">
                <a
                  href="#admissions"
                  className="btn btn-primary btn-sm nav-cta"
                  id="nav-apply"
                  onClick={(e) => handleNav('admissions', e)}
                >
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          <button
            className="menu-toggle"
            id="menu-toggle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
