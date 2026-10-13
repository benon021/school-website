import { useState } from 'react'
import { images } from '../data'

export default function AdmissionsPage({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    studentName: '',
    gender: 'Boy',
    entryGrade: 'Grade 1',
    boardingType: 'Day Scholar',
    intakeTerm: 'Term 1 (January)',
    notes: '',
  })

  const steps = [
    {
      num: '01',
      title: 'Submit Application or Inquire',
      desc: 'Complete the online application form below or visit our school administration office in Kitale to collect admission documents.',
    },
    {
      num: '02',
      title: 'Learner Assessment & Tour',
      desc: 'Your child will participate in a friendly, age-appropriate baseline assessment while parents take a guided tour of our facilities.',
    },
    {
      num: '03',
      title: 'Offer Letter & Fee Guide',
      desc: 'Successful applicants receive an official Letter of Offer, fee schedule, uniform guidelines, and term commencement calendar.',
    },
    {
      num: '04',
      title: 'Registration & Welcome',
      desc: 'Confirm placement with fee payment, acquire tailored uniforms from the school store, and attend orientation on opening day.',
    },
  ]

  const requirements = [
    'Copy of Learner’s Birth Certificate',
    'Two recent passport-sized photographs',
    'Previous school report cards & assessment records (for Grades 1-8)',
    'Learner’s NEMIS / Assessment number (where applicable)',
    'Duly completed confidential student medical & health history form',
    'Parent / Guardian National ID copy and emergency contact details',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="subpage admissions-page">
      <section className="subpage-hero">
        <div className="subpage-hero-bg" style={{ backgroundImage: `url(${images.hero})` }} />
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Admissions & Enrolment</span>
          </nav>
          <span className="eyebrow red">Join Our Community</span>
          <h1>Admissions at Mt. Elgon Academy</h1>
          <p className="subpage-lead">
            We welcome learners into a nurturing, academically enriching environment where character,
            creativity, and academic excellence go hand in hand.
          </p>
        </div>
      </section>

      {/* Steps to Join */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow blue">Step-by-Step</span>
            <h2>How to Enroll Your Child</h2>
            <p>Our admissions process is straightforward, transparent, and welcoming to all families.</p>
          </div>
          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.num} className="step-card">
                <span className="step-badge">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Fee Info */}
      <section className="section bg-light">
        <div className="container">
          <div className="split-grid">
            <div>
              <span className="eyebrow red">Checklist</span>
              <h2>Required Documents</h2>
              <p style={{ marginBottom: 20 }}>
                Please have the following documentation ready upon receiving an admission offer:
              </p>
              <ul className="bullet-checks">
                {requirements.map((r, i) => (
                  <li key={i}>
                    <span className="bullet-dot" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fee-highlight-card">
              <h3>Fee Structure & Payment</h3>
              <p>
                Our fees are competitive, transparent, and structured per term, covering tuition, learning materials,
                and extracurriculars. Transport and Boarding are billed according to specific zones and requirements.
              </p>
              <div className="payment-modes">
                <div className="pay-channel">
                  <strong>Official M-Pesa Paybill:</strong>
                  <span>Available on admission invoice</span>
                </div>
                <div className="pay-channel">
                  <strong>Bank Direct Deposit:</strong>
                  <span>Kitale Branch accounts provided upon offer</span>
                </div>
              </div>
              <div className="notice-box">
                <span>Sibling discounts and flexible payment plans available upon request.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section className="section" id="application-form">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow red">Online Registration</span>
            <h2>Apply for Admission 2025/2026</h2>
            <p>Fill out the application below. Our registrar in Kitale will contact you within 24 hours.</p>
          </div>

          <div className="admission-form-wrapper">
            {submitted ? (
              <div className="form-success text-center">
                <h3>Application Submitted Successfully!</h3>
                <p>
                  Thank you, <strong>{formData.parentName || 'Parent'}</strong>. We have received the application
                  for <strong>{formData.studentName}</strong> into <strong>{formData.entryGrade}</strong> (
                  {formData.boardingType}). Our Admissions Desk will reach out to you via{' '}
                  <strong>{formData.phone}</strong> with assessment dates.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      parentName: '',
                      phone: '',
                      email: '',
                      studentName: '',
                      gender: 'Boy',
                      entryGrade: 'Grade 1',
                      boardingType: 'Day Scholar',
                      intakeTerm: 'Term 1 (January)',
                      notes: '',
                    })
                  }}
                  style={{ marginTop: 16 }}
                >
                  Submit Another Learner Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="admission-form">
                <div className="form-section-title">
                  Parent / Guardian Information
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="adm-parent">Parent / Guardian Full Name *</label>
                    <input
                      id="adm-parent"
                      type="text"
                      required
                      placeholder="e.g. John Simiyu"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="adm-phone">Telephone / Mobile Number *</label>
                    <input
                      id="adm-phone"
                      type="tel"
                      required
                      placeholder="e.g. 0722 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-section-title" style={{ marginTop: 24 }}>
                  Learner Information
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="adm-child">Learner Full Name *</label>
                    <input
                      id="adm-child"
                      type="text"
                      required
                      placeholder="e.g. Brian Simiyu"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="adm-gender">Gender *</label>
                    <select
                      id="adm-gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="Boy">Boy</option>
                      <option value="Girl">Girl</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="adm-grade">Intended Grade / Class *</label>
                    <select
                      id="adm-grade"
                      value={formData.entryGrade}
                      onChange={(e) => setFormData({ ...formData, entryGrade: e.target.value })}
                    >
                      <option value="Playgroup">Playgroup (Age 3)</option>
                      <option value="PP1">PP1 (Age 4)</option>
                      <option value="PP2">PP2 (Age 5)</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Junior Secondary (Grade 7)">Junior Secondary (Grade 7)</option>
                      <option value="Junior Secondary (Grade 8)">Junior Secondary (Grade 8)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="adm-board">Attendance Type *</label>
                    <select
                      id="adm-board"
                      value={formData.boardingType}
                      onChange={(e) => setFormData({ ...formData, boardingType: e.target.value })}
                    >
                      <option value="Day Scholar">Day Scholar (With Transport option)</option>
                      <option value="Boarding">Boarding Student</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="adm-notes">Special Comments or Dietary/Medical Notes (Optional)</label>
                  <textarea
                    id="adm-notes"
                    rows={3}
                    placeholder="Any specific information you would like the teachers to know..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
                  Submit Formal Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
