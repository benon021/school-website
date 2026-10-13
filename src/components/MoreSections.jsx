import { useEffect, useRef, useState } from 'react'
import { images, facilities, extras, stats, testimonials, navLinks } from '../data'
import { Brand } from './Navbar'

export function Facilities() {
  return (
    <section className="section" id="facilities">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow red">World-Class Spaces</span>
          <h2>Our Facilities</h2>
          <p>Thoughtfully designed spaces that inspire curiosity, creativity and a love for learning.</p>
        </div>
        <div className="bento">
          {facilities.map(({ title, text, image, span }, i) => (
            <figure
              className={`bento-item reveal ${span ?? ''}`}
              key={title}
              style={{ '--delay': `${i * 100}ms`, margin: 0 }}
            >
              <img src={image} alt={title} loading="lazy" />
              <figcaption className="bento-caption">
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <ul className="extras reveal">
          {extras.map(({ label }) => (
            <li key={label}>
              <span className="bullet-dot" /> {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1600
        const tick = (t) => {
          const p = Math.min((t - start) / dur, 1)
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <strong ref={ref}>
      {n}
      {suffix}
    </strong>
  )
}

export function Performance() {
  return (
    <section className="section performance" id="performance">
      <div className="performance-bg" style={{ backgroundImage: `url(${images.hero})` }} aria-hidden="true" />
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow light">Proven Results</span>
          <h2>Our Performance</h2>
          <p>Consistent academic excellence and a community of families who trust us with their children.</p>
        </div>
        <div className="stats">
          {stats.map((s, i) => (
            <div className="stat reveal" key={s.label} style={{ '--delay': `${i * 100}ms` }}>
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="testimonials">
          {testimonials.map((t, i) => (
            <figure className="testimonial reveal" key={t.name} style={{ '--delay': `${i * 120}ms`, margin: 0 }}>
              <blockquote>{t.quote}</blockquote>
              <figcaption className="author">
                <span className="avatar">{t.name.charAt(0)}</span>
                <span>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="cta-wrap" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta reveal">
          <div className="cta-copy">
            <h2 id="cta-title">Admissions are open for the new term.</h2>
            <p>
              Book a school tour and see why families across Trans Nzoia choose Mt. Elgon Academy. Limited spaces available
              in Early Years and Boarding.
            </p>
            <a href="#contact" className="btn btn-white" id="cta-book">
              Book a Visit
            </a>
          </div>
          <div className="cta-media">
            <img src={images.cta} alt="Colourful stack of books" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer({ onNavigate }) {
  const handleNav = (pageId, e) => {
    if (e) e.preventDefault()
    if (onNavigate) {
      onNavigate(pageId)
    } else {
      window.location.hash = `#${pageId}`
    }
  }

  const subLinks = [
    { label: 'School Transport', id: 'transport' },
    { label: 'Academics & CBC', id: 'academics' },
    { label: 'Boarding & Dining', id: 'boarding' },
    { label: 'Sports, Clubs & Trips', id: 'cocurricular' },
    { label: 'Campus Facilities', id: 'facilities' },
    { label: 'Admissions & Fees', id: 'admissions' },
    { label: 'About Us & History', id: 'about' },
    { label: 'Contact & Location', id: 'contact' },
  ]

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Brand onNavigate={onNavigate} />
            <p>
              A leading mixed-day and boarding primary school in Central Trans Nzoia offering the
              competency-based curriculum (CBC) in a serene, values-driven environment.
            </p>
          </div>

          <div>
            <h4>Sub-Pages & Portals</h4>
            <ul className="footer-links">
              {subLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => handleNav(l.id, e)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Location & Postal</h4>
            <ul className="contact-list">
              <li>
                <span>
                  Central Trans Nzoia in or near Kitale Town, Saboti Constituency, Trans Nzoia County, Kenya
                </span>
              </li>
              <li>P.O. Box – 30200 Kitale, Kenya</li>
              <li>Kitale, Trans-Nzoia County, 30200, Kenya</li>
              <li>Mon – Fri: 7:30am – 5:00pm | Sat: 8:00am – 1:00pm</li>
            </ul>
          </div>

          <div>
            <h4>Stay Updated</h4>
            <p style={{ fontSize: '0.93rem', marginBottom: 14 }}>
              Get school circulars, calendar updates and admission notices directly in your inbox.
            </p>
            <form className="newsletter" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Mt. Elgon Academy newsletter!') }}>
              <label htmlFor="newsletter-email" className="sr-only" style={{ position: 'absolute', left: -9999 }}>
                Email address
              </label>
              <input id="newsletter-email" type="email" placeholder="Your email address" required />
              <button type="submit" id="newsletter-submit" aria-label="submit">
                submit
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mt. Elgon Academy Primary School, Kitale. All rights reserved.</span>
          <a
            href="#home"
            className="to-top"
            id="to-top"
            aria-label="Back to top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Top
          </a>
        </div>
      </div>
    </footer>
  )
}
