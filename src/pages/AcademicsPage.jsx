import { images } from '../data'

export default function AcademicsPage({ onNavigate }) {
  const levels = [
    {
      title: 'Early Years Education (PP1 & PP2)',
      ages: 'Ages 3 to 5 Years',
      desc: 'Our Pre-Primary program focuses on developing foundational literacy, numeracy, creative expression, and social-emotional growth through play and exploration.',
      subjects: [
        'Language Activities (English & Kiswahili)',
        'Mathematical Activities',
        'Psychomotor & Creative Activities',
        'Environmental & Religious Education',
        'Outdoor Play & Sensory Development',
      ],
    },
    {
      title: 'Primary / Middle School (Grade 1 – Grade 6)',
      ages: 'Ages 6 to 11 Years',
      desc: 'Learners build strong conceptual mastery, critical thinking, problem-solving abilities, and digital fluency aligned with the Competency-Based Curriculum (CBC).',
      subjects: [
        'English & Kiswahili Languages',
        'Mathematics & Science & Technology',
        'Agriculture & Nutrition',
        'Social Studies & Christian Religious Education (CRE)',
        'Creative Arts, Music & Physical Education',
        'Indigenous Languages & Digital Literacy',
      ],
    },
    {
      title: 'Junior Secondary School (Grade 7 – Grade 9)',
      ages: 'Ages 12 to 14 Years',
      desc: 'Advanced academic instruction, specialized laboratory practicals, pre-technical competencies, and career mentoring preparing learners for senior school pathways.',
      subjects: [
        'Integrated Science & Health Education',
        'Pre-Technical & Pre-Career Studies',
        'Social Studies & Life Skills',
        'Business Studies & Computer Science',
        'Agriculture & Home Science Practicals',
        'Visual & Performing Arts',
      ],
    },
  ]

  const pillars = [
    {
      title: 'Digital Literacy & Coding',
      desc: 'Every learner engages with interactive ICT tools, basic coding, and educational software in our dedicated computer lab.',
    },
    {
      title: 'Continuous Assessment (KPSEA)',
      desc: 'Comprehensive formative and summative assessments tracking each learner’s individual aptitude and competencies over time.',
    },
    {
      title: 'Reading Culture',
      desc: 'A vibrant library program with weekly reader challenges to foster vocabulary, imagination, and lifelong love for books.',
    },
  ]

  return (
    <div className="subpage academics-page">
      <section className="subpage-hero">
        <div className="subpage-hero-bg" style={{ backgroundImage: `url(${images.about})` }} />
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Academics & CBC</span>
          </nav>
          <span className="eyebrow blue">Competency-Based Curriculum</span>
          <h1>Academic Excellence at Mt. Elgon Academy</h1>
          <p className="subpage-lead">
            Empowering every child with knowledge, character, and practical 21st-century competencies
            grounded in strong Christian values and individual mentorship.
          </p>
        </div>
      </section>

      {/* Curriculum Levels */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow red">Learning Pathways</span>
            <h2>Our Educational Programs</h2>
            <p>From early childhood curiosity to rigorous junior secondary preparation, our classrooms ignite potential.</p>
          </div>

          <div className="academics-grid">
            {levels.map((lvl) => (
              <div key={lvl.title} className="academic-level-card">
                <div className="level-header">
                  <div>
                    <h3>{lvl.title}</h3>
                    <span className="level-age">{lvl.ages}</span>
                  </div>
                </div>
                <p className="level-desc">{lvl.desc}</p>
                <div className="level-subjects">
                  <strong>Core Learning Areas:</strong>
                  <ul>
                    {lvl.subjects.map((sub, i) => (
                      <li key={i}>
                        <span className="bullet-dot" /> <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Pillars */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow blue">Methodology</span>
            <h2>What Makes Our Learning Unique</h2>
            <p>We blend modern technological teaching with time-tested values of discipline and diligence.</p>
          </div>
          <div className="features-grid">
            {pillars.map((p) => (
              <div key={p.title} className="feature-card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="section text-center">
        <div className="container">
          <h2>Ready to secure your child’s academic future?</h2>
          <p style={{ margin: '12px auto 24px', maxWidth: 600 }}>
            Applications are currently being reviewed for Pre-Primary, Primary, and Junior Secondary grades.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => onNavigate('admissions')} className="btn btn-primary">
              Enroll Today
            </button>
            <button type="button" onClick={() => onNavigate('transport')} className="btn btn-glass" style={{ color: 'var(--ink)', borderColor: 'var(--slate-200)' }}>
              Check School Transport
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
