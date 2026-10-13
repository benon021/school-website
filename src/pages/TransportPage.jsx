import { useState } from 'react'
import {
  Bus,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle,
  Phone,
  AlertCircle,
  Users,
  Compass,
} from 'lucide-react'
import { images } from '../data'

export default function TransportPage({ onNavigate }) {
  const [selectedRoute, setSelectedRoute] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    studentName: '',
    grade: '',
    pickupLocation: '',
    preferredRoute: 'Route 1: Kitale CBD & Milimani',
  })

  const routes = [
    {
      id: 'route-1',
      name: 'Route 1: Kitale CBD & Milimani Corridor',
      coverage: 'Central Kitale, Milimani, Section 6, Kibomet, Laini Moja',
      stops: [
        'Kitale Town Post Office / CBD (6:30 AM)',
        'Milimani Stage & Residential Area (6:45 AM)',
        'Section 6 Junction (7:00 AM)',
        'Kibomet Roundabout (7:10 AM)',
        'Mt. Elgon Academy Campus (7:25 AM)',
      ],
      eveningDeparture: '4:15 PM from Campus',
      busNumber: 'Bus 01 (33-Seater Executive)',
      minder: 'Madam Faith (Bus Warden)',
    },
    {
      id: 'route-2',
      name: 'Route 2: Saboti & Tuwan Corridor',
      coverage: 'Saboti Center, Muroki, Tuwan, Matisi, Kipsongo',
      stops: [
        'Saboti Town Centre (6:20 AM)',
        'Muroki Market Junction (6:35 AM)',
        'Tuwan Primary Stage (6:50 AM)',
        'Matisi Total / Stage (7:05 AM)',
        'Mt. Elgon Academy Campus (7:25 AM)',
      ],
      eveningDeparture: '4:15 PM from Campus',
      busNumber: 'Bus 02 (40-Seater Coaster)',
      minder: 'Teacher Joseph (Bus Warden)',
    },
    {
      id: 'route-3',
      name: 'Route 3: Kiminini & Sikhendu Line',
      coverage: 'Kiminini Town, Sikhendu, Toll Station, Mitume',
      stops: [
        'Kiminini Market Stage (6:15 AM)',
        'Sikhendu Junction (6:35 AM)',
        'Kitale Airstrip / Toll Station (6:50 AM)',
        'Mitume Estate Stage (7:05 AM)',
        'Mt. Elgon Academy Campus (7:25 AM)',
      ],
      eveningDeparture: '4:15 PM from Campus',
      busNumber: 'Bus 03 (33-Seater Executive)',
      minder: 'Madam Joyce (Bus Warden)',
    },
    {
      id: 'route-4',
      name: 'Route 4: Endebess & Birunda Highway',
      coverage: 'Endebess Center, Matisi North, Birunda, Maili Saba',
      stops: [
        'Endebess Town Centre (6:15 AM)',
        'Birunda Shopping Centre (6:35 AM)',
        'Maili Saba Junction (6:50 AM)',
        'Kitale Club Road (7:05 AM)',
        'Mt. Elgon Academy Campus (7:25 AM)',
      ],
      eveningDeparture: '4:15 PM from Campus',
      busNumber: 'Bus 04 (33-Seater Executive)',
      minder: 'Madam Esther (Bus Warden)',
    },
  ]

  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: 'NTSA Certified & Inspected',
      desc: 'All school buses comply fully with National Transport and Safety Authority standards, fitted with approved speed governors capped at 50 km/h.',
    },
    {
      icon: Users,
      title: 'Dedicated Bus Minders',
      desc: 'Every bus is staffed with a trained, caring female bus warden who assists young children with seatbelts, boarding, and safe handover to parents.',
    },
    {
      icon: Compass,
      title: 'GPS Tracking & Updates',
      desc: 'Real-time GPS tracking ensures route adherence and punctual arrivals, giving parents complete peace of mind each morning and evening.',
    },
    {
      icon: Clock,
      title: 'Punctual Timetable',
      desc: 'Carefully planned morning and afternoon routes ensure learners arrive fresh before morning devotion and return home safely before dusk.',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="subpage transport-page">
      {/* Subpage Banner */}
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
            <span className="crumb-current">School Transport</span>
          </nav>
          <span className="eyebrow red">Safe & Reliable Mobility</span>
          <h1>School Transport Services</h1>
          <p className="subpage-lead">
            Punctual, safe, and comfortable door-to-door and stage pick-up bus service covering Kitale Town,
            Saboti Constituency, and surrounding areas in Trans Nzoia County.
          </p>
          <div className="subpage-badges">
            <span className="badge-pill">
              <Bus size={16} /> 4 Dedicated Routes
            </span>
            <span className="badge-pill">
              <ShieldCheck size={16} /> NTSA Certified Fleet
            </span>
            <span className="badge-pill">
              <Users size={16} /> Qualified Bus Wardens
            </span>
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow blue">Safety First</span>
            <h2>Our Commitment to Child Safety</h2>
            <p>Your child’s safety to and from school is our top priority. We operate modern, rigorously maintained buses.</p>
          </div>
          <div className="features-grid">
            {safetyFeatures.map((feat) => {
              const Icon = feat.icon
              return (
                <div key={feat.title} className="feature-card">
                  <span className="icon-badge red">
                    <Icon size={22} />
                  </span>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Routes Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow red">Trans Nzoia Coverage</span>
            <h2>School Bus Routes & Timetables</h2>
            <p>Select a route below to explore stops, pickup timings, and designated bus wardens.</p>
          </div>

          <div className="routes-container">
            {/* Route Tabs */}
            <div className="route-tabs">
              {routes.map((r, index) => (
                <button
                  type="button"
                  key={r.id}
                  className={`route-tab ${selectedRoute === index ? 'active' : ''}`}
                  onClick={() => setSelectedRoute(index)}
                >
                  <Bus size={18} />
                  <span>{r.name}</span>
                </button>
              ))}
            </div>

            {/* Active Route Details */}
            <div className="route-detail-card">
              <div className="route-header">
                <div>
                  <span className="route-tag">Active Schedule 2025/2026</span>
                  <h3>{routes[selectedRoute].name}</h3>
                  <p className="route-sub">
                    <MapPin size={16} /> Coverage: {routes[selectedRoute].coverage}
                  </p>
                </div>
                <div className="route-meta">
                  <div>
                    <strong>{routes[selectedRoute].busNumber}</strong>
                    <span>Staffed by {routes[selectedRoute].minder}</span>
                  </div>
                </div>
              </div>

              <div className="route-stops-timeline">
                <h4>
                  <Clock size={16} /> Morning Pick-up Sequence:
                </h4>
                <ul className="stops-list">
                  {routes[selectedRoute].stops.map((stop, i) => (
                    <li key={i}>
                      <span className="stop-num">{i + 1}</span>
                      <span className="stop-text">{stop}</span>
                    </li>
                  ))}
                </ul>
                <div className="evening-note">
                  <Clock size={16} /> <strong>Afternoon Drop-off:</strong> Departs campus promptly at 4:15 PM,
                  following the reverse order for each learner&apos;s designated stop.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking / Enrollment Form */}
      <section className="section bg-light" id="book-seat">
        <div className="container">
          <div className="form-split">
            <div className="form-info">
              <span className="eyebrow blue">Enrolment & Inquiries</span>
              <h2>Request School Transport for Your Child</h2>
              <p>
                Spaces on each route are allocated to ensure every learner has a comfortable individual seat with a
                working seatbelt. Complete this quick request and our transport supervisor will confirm seat
                availability.
              </p>
              <ul className="bullet-checks">
                <li>
                  <CheckCircle size={18} /> Flexible one-way or return options available
                </li>
                <li>
                  <CheckCircle size={18} /> Termly transport fees structured by zone
                </li>
                <li>
                  <CheckCircle size={18} /> Direct contact line with bus warden during transit
                </li>
              </ul>
              <div className="help-box">
                <Phone size={20} />
                <div>
                  <strong>Need Immediate Assistance?</strong>
                  <p>Our administration desk in Kitale is open Mon – Fri, 7:30 AM – 5:00 PM.</p>
                </div>
              </div>
            </div>

            <div className="form-card">
              {formSubmitted ? (
                <div className="form-success">
                  <div className="icon-badge blue" style={{ margin: '0 auto 16px' }}>
                    <CheckCircle size={28} />
                  </div>
                  <h3>Transport Request Received!</h3>
                  <p>
                    Thank you, <strong>{formData.parentName || 'Parent'}</strong>. Our Transport Coordinator has
                    received your route request for <strong>{formData.preferredRoute}</strong>. We will contact you
                    shortly to confirm your pickup point and timing.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormData({
                        parentName: '',
                        phone: '',
                        studentName: '',
                        grade: '',
                        pickupLocation: '',
                        preferredRoute: routes[0].name,
                      })
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="transport-form">
                  <h3>Transport Booking Request</h3>
                  <div className="form-group">
                    <label htmlFor="t-parent">Parent / Guardian Full Name</label>
                    <input
                      id="t-parent"
                      type="text"
                      required
                      placeholder="e.g. Mary Wanjala"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="t-phone">Telephone / Mobile Number</label>
                    <input
                      id="t-phone"
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="t-child">Learner&apos;s Name</label>
                      <input
                        id="t-child"
                        type="text"
                        required
                        placeholder="Learner name"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="t-grade">Grade / Class</label>
                      <select
                        id="t-grade"
                        required
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      >
                        <option value="">Select Grade</option>
                        <option value="Playgroup / PP1">Playgroup / PP1</option>
                        <option value="PP2">PP2</option>
                        <option value="Grade 1">Grade 1</option>
                        <option value="Grade 2">Grade 2</option>
                        <option value="Grade 3">Grade 3</option>
                        <option value="Grade 4">Grade 4</option>
                        <option value="Grade 5">Grade 5</option>
                        <option value="Grade 6">Grade 6</option>
                        <option value="Junior Secondary (Grade 7-8)">Junior Secondary (Grade 7-8)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="t-route">Preferred Bus Route</label>
                    <select
                      id="t-route"
                      value={formData.preferredRoute}
                      onChange={(e) => setFormData({ ...formData, preferredRoute: e.target.value })}
                    >
                      {routes.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="t-pickup">Specific Pick-up Stage / Landmark</label>
                    <input
                      id="t-pickup"
                      type="text"
                      required
                      placeholder="e.g. Milimani Catholic Stage, Near Shell"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
                    Submit Transport Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="section text-center">
        <div className="container">
          <h2>Have questions about our other services?</h2>
          <p style={{ margin: '12px auto 24px', maxWidth: 600 }}>
            Explore our curriculum, boarding facilities, or book a guided tour of Mt. Elgon Academy.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => onNavigate('admissions')} className="btn btn-primary">
              Admission Guidelines
            </button>
            <button type="button" onClick={() => onNavigate('home')} className="btn btn-glass" style={{ color: 'var(--ink)', borderColor: 'var(--slate-200)' }}>
              Return to Homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
