import { images } from '../data'

export default function BoardingPage({ onNavigate }) {
  const boardingPillars = [
    {
      title: 'Comfortable Modern Dormitories',
      desc: 'Spacious, well-ventilated dormitories with individual storage lockers, comfortable beds, clean washrooms, and round-the-clock hot water.',
    },
    {
      title: 'Pastoral Care & Matrons',
      desc: 'Experienced resident house masters and matrons provide warm parental supervision, guidance, and emotional support to all boarders.',
    },
    {
      title: 'Wholesome 4-Meal Nutrition',
      desc: 'Nutritious, balanced meals prepared daily by certified chefs. Fresh milk, fruits, proteins, and vegetables sourced directly from local Trans Nzoia farms.',
    },
    {
      title: '24/7 Security & Infirmary',
      desc: 'Gated, securely perimeter-fenced campus with 24-hour security guards, CCTV surveillance, and a resident qualified nurse in our modern school dispensary.',
    },
  ]

  const dailySchedule = [
    { time: '6:00 AM', activity: 'Rising bell, personal hygiene, and room tidying' },
    { time: '6:30 AM – 7:00 AM', activity: 'Morning devotion & inspirational reflection' },
    { time: '7:00 AM – 7:45 AM', activity: 'Hot, hearty breakfast in the dining hall' },
    { time: '8:00 AM – 4:00 PM', activity: 'Formal classes, lessons, practicals, and lunch break' },
    { time: '4:15 PM – 5:30 PM', activity: 'Outdoor games, sports, athletics, clubs, and shower' },
    { time: '6:00 PM – 7:00 PM', activity: 'Nutritious dinner and dining hall fellowship' },
    { time: '7:00 PM – 8:45 PM', activity: 'Supervised evening prep (homework, revision, reading)' },
    { time: '9:00 PM', activity: 'Night prayers and lights out for peaceful rest' },
  ]

  return (
    <div className="subpage boarding-page">
      <section className="subpage-hero">
        <div className="subpage-hero-bg" style={{ backgroundImage: `url(${images.campus})` }} />
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-link">School Life</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Boarding & Dining</span>
          </nav>
          <span className="eyebrow red">Home Away From Home</span>
          <h1>Boarding Life & Pastoral Care</h1>
          <p className="subpage-lead">
            A serene, supportive, and disciplined residential environment in Central Trans Nzoia
            where boys and girls build lifelong friendships, self-reliance, and moral character.
          </p>
        </div>
      </section>

      {/* Boarding Features */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow blue">Residential Experience</span>
            <h2>Nurturing Independence in a Safe Haven</h2>
            <p>Our boarding section is carefully structured to make every learner feel cherished, secure, and inspired.</p>
          </div>
          <div className="features-grid">
            {boardingPillars.map((p) => (
              <div key={p.title} className="feature-card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Routine */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow red">Structured Growth</span>
            <h2>A Typical Day for a Boarder</h2>
            <p>A balanced daily rhythm of spiritual devotion, academics, sports, wholesome meals, and restorative rest.</p>
          </div>

          <div className="schedule-timeline">
            {dailySchedule.map((item, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-desc">{item.activity}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boarding Requirements Checklist */}
      <section className="section">
        <div className="container">
          <div className="requirements-box">
            <div className="req-copy">
              <span className="eyebrow blue">What to Bring</span>
              <h2>Boarding Essentials & Guidelines</h2>
              <p>
                We provide a comprehensive boarding kit checklist to admitted boarders, including school uniform,
                casual wear guidelines, bedding specifications, and personal hygiene supplies.
              </p>
              <ul className="bullet-checks">
                <li>
                  <span className="bullet-dot" /> High-density mattress & branded bed cover provided on campus
                </li>
                <li>
                  <span className="bullet-dot" /> Visiting days scheduled on designated Sundays each month
                </li>
                <li>
                  <span className="bullet-dot" /> Dedicated laundry team keeping uniforms clean and pressed
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('admissions')}
                className="btn btn-primary"
                style={{ marginTop: 16 }}
              >
                Apply for Boarding
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
