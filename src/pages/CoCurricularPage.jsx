import { images } from '../data'

export default function CoCurricularPage({ onNavigate }) {
  const sports = [
    { name: 'Football (Soccer)', desc: 'Inter-school leagues and age-grade tournaments on our standard pitch.' },
    { name: 'Athletics & Track', desc: 'Sprints, middle-distance running, and field events fostering fitness.' },
    { name: 'Volleyball & Netball', desc: 'Team sports building coordination, agility, and sportsmanship.' },
    { name: 'Swimming & Fitness', desc: 'Water safety skills and cardiovascular endurance training.' },
    { name: 'Table Tennis & Badminton', desc: 'Indoor racket games developing lightning-fast reflexes.' },
  ]

  const clubs = [
    {
      title: 'Music, Brass Band & Drama',
      desc: 'Regular top performers at Kenya National Music Festivals. Learners master choir singing, traditional instruments, poetry, and stage acting.',
    },
    {
      title: 'Scouting & Girl Guides',
      desc: 'Building self-reliance, wilderness survival skills, leadership badges, and community volunteer service.',
    },
    {
      title: 'Coding & Robotics Club',
      desc: 'Hands-on exploration of block coding, Scratch, robotics kits, and logical problem-solving challenges.',
    },
    {
      title: 'Debating & Public Speaking',
      desc: 'Nurturing confident speakers who articulate ideas persuasively, research global issues, and lead debates.',
    },
    {
      title: 'Chess & Board Games',
      desc: 'Strategic thinking, tactical foresight, and concentration trained through competitive scholastic chess tournaments.',
    },
    {
      title: 'Environmental & Agriculture Club',
      desc: 'Hands-on vegetable farming, tree planting in our school garden, and conservation stewardship for Trans Nzoia.',
    },
  ]

  const trips = [
    {
      title: 'Mt. Elgon National Park & Caves',
      desc: 'Nature exploration, geography fieldwork, and hiking through the scenic foothills and Kitum Cave.',
    },
    {
      title: 'Kitale Nature Museum & Snake Park',
      desc: 'Learning regional biodiversity, ethnography of Western Kenya, and cultural history.',
    },
    {
      title: 'Saiwa Swamp National Park',
      desc: 'Educational visits to observe the endangered Sitatunga antelope and rare aquatic birds in their natural habitat.',
    },
  ]

  return (
    <div className="subpage cocurricular-page">
      <section className="subpage-hero">
        <div className="subpage-hero-bg" style={{ backgroundImage: `url(${images.hero})` }} />
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-link">School Life</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Co-Curricular & Sports</span>
          </nav>
          <span className="eyebrow red">Holistic Development</span>
          <h1>Nurturing Versatile Champions</h1>
          <p className="subpage-lead">
            Beyond academics, Mt. Elgon Academy offers rich sporting, artistic, and leadership activities
            that shape confident, well-rounded learners ready to impact society.
          </p>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow blue">Clubs & Societies</span>
            <h2>Passions Discovered, Talents Nurtured</h2>
            <p>Every learner participates in at least two active clubs, unlocking creative, technological, and civic talents.</p>
          </div>
          <div className="features-grid">
            {clubs.map((c) => (
              <div key={c.title} className="feature-card">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow red">Sports & Athletics</span>
            <h2>Active Bodies, Disciplined Minds</h2>
            <p>Our expansive sports fields host energetic practice and inter-school fixtures coached by professional trainers.</p>
          </div>
          <div className="sports-grid">
            {sports.map((s) => (
              <div key={s.name} className="sport-card">
                <div>
                  <h4>{s.name}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Excursions */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow blue">Outdoor Expeditions</span>
            <h2>Educational Field Trips in Trans Nzoia</h2>
            <p>We believe learning extends beyond classroom walls into the rich cultural and natural landscape of Western Kenya.</p>
          </div>
          <div className="trips-grid">
            {trips.map((t) => (
              <div key={t.title} className="trip-card">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button type="button" onClick={() => onNavigate('admissions')} className="btn btn-primary">
              Join Our Thriving Community
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
