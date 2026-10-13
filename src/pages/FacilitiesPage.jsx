import { images } from '../data'

export default function FacilitiesPage({ onNavigate }) {
  const facilityList = [
    {
      title: 'Digital & Physical Library',
      desc: 'Extensive repository of fiction, non-fiction, encyclopedias, and CBC course texts, along with cozy reading areas.',
      tag: 'Academic Resource',
    },
    {
      title: 'Modern ICT & Coding Laboratory',
      desc: 'High-speed broadband internet, individual workstations, projectors, and educational software for digital fluency.',
      tag: 'STEM & Technology',
    },
    {
      title: 'Integrated Science & Practical Lab',
      desc: 'Equipped with microscopes, measurement instruments, and safe experimentation benches for hands-on learning.',
      tag: 'Practical Learning',
    },
    {
      title: 'Dining Hall & Modern Kitchen',
      desc: 'Hygienic, certified catering facilities serving fresh, well-balanced meals prepared with ingredients from local farms.',
      tag: 'Nutrition & Catering',
    },
    {
      title: 'Standard Sports Grounds & Pitches',
      desc: 'Dedicated football field, running track, volleyball and netball courts, and safe play facilities for early learners.',
      tag: 'Physical Fitness',
    },
    {
      title: 'Lush Green Gardens & Outdoor Classrooms',
      desc: 'Serene, clean grounds surrounded by indigenous trees that promote tranquility, clean fresh air, and focused study.',
      tag: 'Campus Environment',
    },
    {
      title: 'Dedicated Transport Depot & Fleet',
      desc: 'Modern, well-maintained school buses providing punctual transit across Kitale Town, Saboti, and neighbouring centers.',
      tag: 'Mobility & Safety',
    },
    {
      title: 'Health Unit & Resident Nurse Sickbay',
      desc: 'Comfortable recovery beds, basic first aid, and continuous medical supervision under a certified nurse.',
      tag: 'Healthcare & Wellness',
    },
  ]

  return (
    <div className="subpage facilities-page">
      <section className="subpage-hero">
        <div className="subpage-hero-bg" style={{ backgroundImage: `url(${images.campus})` }} />
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-link">About</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Campus Facilities</span>
          </nav>
          <span className="eyebrow blue">Purpose-Built Infrastructure</span>
          <h1>World-Class Campus Facilities</h1>
          <p className="subpage-lead">
            Every corner of Mt. Elgon Academy has been designed to stimulate intellectual curiosity,
            foster healthy physical play, and provide a secure, inspiring home for learners.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow red">Learning & Living Spaces</span>
            <h2>State-of-the-Art Infrastructure</h2>
            <p>Explore the spaces that provide an enriching learning journey for our learners every day.</p>
          </div>

          <div className="facility-cards-grid">
            {facilityList.map((f) => (
              <div key={f.title} className="facility-detail-card">
                <div className="facility-card-top">
                  <span className="facility-pill">{f.tag}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="tour-cta-banner">
            <div>
              <h3>Would you like to tour our campus in person?</h3>
              <p>We welcome prospective parents for guided campus visits Mondays through Fridays.</p>
            </div>
            <button type="button" onClick={() => onNavigate('contact')} className="btn btn-white">
              Schedule a Campus Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
