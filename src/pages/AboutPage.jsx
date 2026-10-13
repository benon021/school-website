import { images } from '../data'

export default function AboutPage({ onNavigate }) {
  const values = [
    { title: 'Excellence (Ubora)', desc: 'Pursuing the highest academic and moral standards in all endeavors.' },
    { title: 'Integrity (Uadilifu)', desc: 'Instilling truthfulness, honesty, and accountability from an early age.' },
    { title: 'Discipline (Nidhamu)', desc: 'Self-mastery and respect for time, teachers, peers, and property.' },
    { title: 'Diligence (Bidii)', desc: 'Encouraging strong work ethic and persistence in the face of challenges.' },
    { title: 'Compassion (Huruma)', desc: 'Promoting kindness, community service, and Christian love.' },
    { title: 'Creativity (Ubunifu)', desc: 'Nurturing innovative problem solving, artistic expression, and curiosity.' },
  ]

  return (
    <div className="subpage about-page">
      <section className="subpage-hero">
        <div className="subpage-hero-bg" style={{ backgroundImage: `url(${images.campus})` }} />
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">About Us</span>
          </nav>
          <span className="eyebrow red">Our Heritage & Calling</span>
          <h1>About Mt. Elgon Academy Primary School</h1>
          <p className="subpage-lead">
            Rooted in the fertile, scenic soils of Central Trans Nzoia near Kitale Town, Mt. Elgon Academy
            has been nurturing leaders of distinction, faith, and academic prowess for over 25 years.
          </p>
        </div>
      </section>

      {/* Vision, Mission, Motto */}
      <section className="section">
        <div className="container">
          <div className="vmm-grid">
            <div className="vmm-card">
              <h3>Our Motto</h3>
              <p className="vmm-highlight">&ldquo;Elimu Ni Nguvu&rdquo; (Education is Power)</p>
              <p>Equipping young minds with knowledge that transforms individual lives, families, and communities.</p>
            </div>

            <div className="vmm-card">
              <h3>Our Vision</h3>
              <p className="vmm-highlight">To be the premier primary learning institution in Western Kenya.</p>
              <p>Recognized for stellar academic performance, strong Christian values, and holistic child development.</p>
            </div>

            <div className="vmm-card">
              <h3>Our Mission</h3>
              <p className="vmm-highlight">Nurturing versatile champions for tomorrow.</p>
              <p>Providing a dynamic, child-centered environment blending quality CBC education, sports, and godly mentorship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Headteacher's Message */}
      <section className="section bg-light">
        <div className="container">
          <div className="split-grid align-center">
            <div className="headteacher-media">
              <img src={images.about} alt="Learners in interactive class" style={{ borderRadius: 16 }} />
              <div className="headteacher-badge">
                <strong>25+ Years</strong>
                <span>Legacy of Academic Distinction</span>
              </div>
            </div>

            <div className="headteacher-copy">
              <span className="eyebrow blue">Leadership Welcome</span>
              <h2>A Word From the School Administration</h2>
              <p>
                &ldquo;Welcome to Mt. Elgon Academy Primary School. Here, every child is embraced as a unique creation
                with divine potential. Our dedicated team of certified educators and support staff work tirelessly to
                ensure our learners not only excel in national assessments like KPSEA, but grow in wisdom, respect,
                and emotional maturity.
              </p>
              <p style={{ marginTop: 12 }}>
                We invite you to join our warm school family and experience the transformative difference of Mt.
                Elgon Academy.&rdquo;
              </p>
              <div style={{ marginTop: 24 }}>
                <strong>The Board of Management & Senior Staff</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)' }}>Mt. Elgon Academy Primary School, Kitale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow red">What Guides Us</span>
            <h2>Our Core Values</h2>
            <p>Six enduring pillars that shape our school culture, student discipline, and everyday interactions.</p>
          </div>

          <div className="features-grid">
            {values.map((v) => (
              <div key={v.title} className="feature-card">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button type="button" onClick={() => onNavigate('contact')} className="btn btn-primary">
              Visit Our School Campus
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
