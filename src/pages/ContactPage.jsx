import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { images } from '../data'

export default function ContactPage({ onNavigate }) {
  const [sent, setSent] = useState(false)
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="subpage contact-page">
      <section className="subpage-hero">
        <div className="subpage-hero-bg" style={{ backgroundImage: `url(${images.campus})` }} />
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Contact & Location</span>
          </nav>
          <span className="eyebrow red">Get in Touch</span>
          <h1>Contact Mt. Elgon Academy</h1>
          <p className="subpage-lead">
            We are always delighted to hear from prospective families, current parents, and community partners.
            Visit our campus or reach out via the details below.
          </p>
        </div>
      </section>

      {/* Main Info Split */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Information Side */}
            <div className="contact-details-box">
              <span className="eyebrow blue">Direct Details</span>
              <h2>School Location & Postal Info</h2>
              <p style={{ marginBottom: 24 }}>
                Conveniently situated in Central Trans Nzoia near Kitale Town, providing a calm, green haven for
                focused education.
              </p>

              <div className="contact-card-list">
                <div className="contact-item-card">
                  <div>
                    <strong>Physical Location</strong>
                    <p>
                      Central Trans Nzoia in or near Kitale Town,
                      <br />
                      Saboti Constituency, Trans Nzoia County, Kenya
                    </p>
                  </div>
                </div>

                <div className="contact-item-card">
                  <div>
                    <strong>Postal Address</strong>
                    <p>P.O. Box – 30200 Kitale, Kenya</p>
                  </div>
                </div>

                <div className="contact-item-card">
                  <div>
                    <strong>Regional Details</strong>
                    <p>
                      City: <strong>Kitale</strong>
                      <br />
                      County: <strong>Trans-Nzoia County</strong>
                      <br />
                      Postal Code: <strong>30200</strong>
                      <br />
                      Country: <strong>Kenya</strong>
                    </p>
                  </div>
                </div>

                <div className="contact-item-card">
                  <div>
                    <strong>Office & Visitor Hours</strong>
                    <p>
                      Monday – Friday: 7:30 AM – 5:00 PM
                      <br />
                      Saturday: 8:00 AM – 1:00 PM (Admissions Desk)
                      <br />
                      Sunday: Closed for Worship & Family Rest
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Message Form */}
            <div className="contact-form-box">
              {sent ? (
                <div className="form-success text-center">
                  <div className="icon-badge blue" style={{ margin: '0 auto 16px' }}>
                    <CheckCircle size={32} />
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you, <strong>{contactData.name || 'Friend'}</strong>. Our administration desk at Mt.
                    Elgon Academy has received your inquiry. We will contact you back promptly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setSent(false)
                      setContactData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'General Inquiry',
                        message: '',
                      })
                    }}
                    style={{ marginTop: 16 }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="transport-form">
                  <h3>Send Us an Inquiry</h3>
                  <div className="form-group">
                    <label htmlFor="c-name">Your Full Name *</label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      placeholder="e.g. David Wafula"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-phone">Telephone / Mobile Number *</label>
                    <input
                      id="c-phone"
                      type="tel"
                      required
                      placeholder="e.g. 0712 345 678"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-subject">Subject *</label>
                    <select
                      id="c-subject"
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Admissions & Placement">Admissions & Placement</option>
                      <option value="School Transport Query">School Transport Query</option>
                      <option value="Boarding Enrolment">Boarding Enrolment</option>
                      <option value="Schedule Campus Tour">Schedule Campus Tour</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-message">Your Message *</label>
                    <textarea
                      id="c-message"
                      required
                      rows={4}
                      placeholder="How can we assist you and your child today?"
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
