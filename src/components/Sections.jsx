import { images, pillars, lifeCards, programs } from '../data'

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-content hero-anim">
        <span className="eyebrow light">Welcome to Excellence</span>
        <h1>
          Welcome to <span className="accent">Mt. Elgon</span>
          <br />
          Academy
        </h1>
        <p className="lead">More than just a place to get an education.</p>
        <p className="sub">
          A primary school in Central Trans Nzoia, Kitale, offering the competency-based Kenyan curriculum.
        </p>
        <div className="hero-actions">
          <a href="#admissions" className="btn btn-primary" id="hero-start">
            Start Your Journey
          </a>
          <a href="#about" className="btn btn-glass" id="hero-explore">
            Explore Our School
          </a>
        </div>
      </div>
    </section>
  )
}

export function Pillars() {
  return (
    <section className="section pillars" id="about">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow blue">Shaping the Future</span>
          <h2>What Drives Us</h2>
          <p>Our commitment to excellence is built on five foundational pillars that guide everything we do.</p>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ tone, title, text }, i) => (
            <article className="pillar reveal" key={title} style={{ '--delay': `${i * 90}ms` }}>
              <div className={`pillar-accent-bar ${tone}`} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  const list = ['CBC curriculum', 'Christian values', 'Day & boarding', 'Qualified teachers', 'Safe green campus', 'Holistic growth']
  return (
    <section className="section">
      <div className="container about-split">
        <div className="about-media reveal">
          <div className="main">
            <img src={images.about} alt="Learners working together on a drawing activity in class" loading="lazy" decoding="async" />
          </div>
          <div className="inset">
            <img src={images.campus} alt="Mt. Elgon Academy campus buildings and green lawns" loading="lazy" decoding="async" />
          </div>
          <div className="floating">
            <div>
              <strong>25+ Years</strong>
              <span>of academic excellence</span>
            </div>
          </div>
        </div>

        <div className="about-copy reveal" style={{ '--delay': '150ms' }}>
          <span className="eyebrow red">About Mt. Elgon Academy</span>
          <h2>A place where every child is known, valued and inspired.</h2>
          <p>
            Located in Kitale, Saboti Constituency, Mt. Elgon Academy blends strong academics with character formation.
            Small classes, caring teachers and a beautiful environment give every learner the space to discover
            their gifts and grow into confident leaders.
          </p>
          <ul className="check-list">
            {list.map((item) => (
              <li key={item}>
                <span className="bullet-dot" />
                {item}
              </li>
            ))}
          </ul>
          <a href="#life" className="btn btn-primary" id="about-discover">
            Discover School Life
          </a>
        </div>
      </div>
    </section>
  )
}

export function SchoolLife() {
  return (
    <section className="section" id="life">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow red">Experience Excellence</span>
          <h2>Life at Mt. Elgon Academy</h2>
          <p>Discover the vibrant community and enriching experiences that await your child.</p>
        </div>
        <div className="life-grid">
          {lifeCards.map(({ title, text, image }, i) => {
            const subPageMap = {
              Academics: '#academics',
              'Extra Curricular': '#cocurricular',
              Boarding: '#boarding',
            }
            const href = subPageMap[title] || '#facilities'
            return (
              <article className="life-card reveal" key={title} style={{ '--delay': `${i * 120}ms` }}>
                <div className="life-media">
                  <img src={image} alt={title} loading="lazy" decoding="async" />
                </div>
                <div className="life-body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a href={href} className="link-arrow" id={`life-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                    Learn More
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Admissions() {
  return (
    <section className="section admissions" id="admissions">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow blue">Join Our Community</span>
          <h2>Admission to Mt. Elgon Academy</h2>
          <p>Choose the right program for your child&apos;s age and watch them thrive in our supportive environment.</p>
        </div>
        <div className="program-grid">
          {programs.map(({ tone, title, ages, text, points, image, featured }, i) => (
            <div className="reveal" key={title} style={{ '--delay': `${i * 120}ms` }}>
              <article className={`program ${tone} ${featured ? 'featured' : ''}`} style={{ height: '100%' }}>
                <div className="program-media">
                  <img src={image} alt={`${title} learners`} loading="lazy" decoding="async" />
                  {featured && <span className="tag">Most Popular</span>}
                </div>
                <div className="program-body">
                  <h3>{title}</h3>
                  <span className="ages">{ages}</span>
                  <p>{text}</p>
                  <ul className="points">
                    {points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="link-arrow" id={`apply-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                    Apply Now
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
