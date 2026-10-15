import { useState } from 'react'
import Crest from './Crest'
import { images } from '../data'
import { useContent } from '../context/ContentContext'
import { Bell, ChevronRight } from 'lucide-react'
import EditableText from './admin/EditableText'
import EditableImage from './admin/EditableImage'

export default function HeroSection({ onNavigate }) {
  const { settings, announcements } = useContent()
  const [showMore, setShowMore] = useState(false)

  // Active announcement from Supabase or fallback
  const activeNotice = announcements?.find((a) => a.is_active !== false)
  const noticeLabel = activeNotice?.badge || activeNotice?.title || 'Admissions 2025/2026'
  const noticeBody = activeNotice?.message || 'Ongoing interviews for Early Years, Primary & Junior Secondary • Door-to-stage school transport available across Kitale & Saboti.'

  const storyHighlights = [
    {
      id: 'transport',
      label: 'Transport',
      code: 'TR',
      tag: 'New Routes',
      color: 'hsl(354, 90%, 50%)',
    },
    {
      id: 'academics',
      label: 'Academics',
      code: 'AC',
      tag: 'CBC Tiers',
      color: 'hsl(222, 90%, 54%)',
    },
    {
      id: 'boarding',
      label: 'Boarding',
      code: 'BD',
      tag: 'Pastoral',
      color: 'hsl(224, 60%, 26%)',
    },
    {
      id: 'cocurricular',
      label: 'Sports & Clubs',
      code: 'SP',
      tag: 'Champs',
      color: 'hsl(38, 92%, 50%)',
    },
    {
      id: 'facilities',
      label: 'Facilities',
      code: 'FC',
      tag: 'Campus',
      color: 'hsl(160, 84%, 39%)',
    },
    {
      id: 'admissions',
      label: 'Admissions',
      code: 'AD',
      tag: 'Open 2025',
      color: 'hsl(354, 90%, 50%)',
    },
    {
      id: 'contact',
      label: 'Location',
      code: 'KT',
      tag: 'Kitale',
      color: 'hsl(215, 19%, 35%)',
    },
  ]

  const quickFeatures = [
    {
      id: 'transport',
      title: 'School Transport',
      desc: '4 daily routes across Kitale & Saboti',
    },
    {
      id: 'academics',
      title: 'CBC Curriculum',
      desc: 'PP1 to Junior Secondary Grade 9',
    },
    {
      id: 'boarding',
      title: 'Boarding & Dining',
      desc: 'Homely dorms & 4-meal nutrition',
    },
    {
      id: 'cocurricular',
      title: 'Versatile Champs',
      desc: 'Music Champions, Sports & Scouts',
    },
  ]

  return (
    <section className="hero-profile-section" id="home">

      {/* Background ambient glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* Vibrating Announcement Bar triggering full Announcements Page */}
      <div className="container hero-notice-container">
        <div
          className="hero-notice-banner interactive-alert"
          onClick={() => onNavigate('announcements')}
          role="button"
          tabIndex={0}
          title="Click to see all school announcements"
        >
          <div className="notice-left-wrap">
            <span className="vibrating-bell-wrap" aria-hidden="true">
              <Bell size={16} className="vibrating-bell-icon" />
            </span>
            <span className="notice-badge-chip">{noticeLabel}</span>
            <span className="notice-text-clamp">{noticeBody}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('announcements')
            }}
            className="notice-view-all-btn"
          >
            <span>See Notices</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="container hero-profile-container">
        {/* DESKTOP WELCOME COPY (Visible on larger screens alongside profile card) */}
        <div className="hero-desktop-copy">
          <div className="hero-pill-badge">
            <span>Nurturing Leaders in Central Trans Nzoia • Kitale</span>
          </div>

          <h1>
            Welcome to <span className="accent-text">{settings.school_name || 'Mt. Elgon Academy'}</span>
          </h1>

          <p className="hero-lead">
            {settings.hero_headline || 'More than just a place to get an education — a nurturing Christian-values primary academy where every child is known, cherished, and empowered to excel.'}
          </p>

          <p className="hero-sublead">
            {settings.hero_subheadline || 'Located in Central Trans Nzoia near Kitale Town, Saboti Constituency. Offering CBC curriculum, exceptional boarding facilities, door-to-stage bus transit, and rich co-curricular programs.'}
          </p>

          <div className="hero-actions-row">
            <button
              type="button"
              onClick={() => onNavigate('transport')}
              className="btn btn-secondary"
              id="desktop-transport-btn"
            >
              Explore Bus Routes
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="btn btn-outline"
              id="desktop-contact-btn"
            >
              Visit Kitale Campus
            </button>
          </div>

          {/* Interactive Quick Service Cards */}
          <div className="hero-feature-cards">
            {quickFeatures.map((f) => (
              <button
                type="button"
                key={f.id}
                className="hero-feature-card"
                onClick={() => onNavigate(f.id)}
              >
                <div className="feat-copy">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="hero-stats-strip">
            <div className="strip-stat">
              <strong>98%</strong>
              <span>Top Transition</span>
            </div>
            <div className="strip-div" />
            <div className="strip-stat">
              <strong>25+</strong>
              <span>Years of Excellence</span>
            </div>
            <div className="strip-div" />
            <div className="strip-stat">
              <strong>600+</strong>
              <span>Happy Learners</span>
            </div>
            <div className="strip-div" />
            <div className="strip-stat">
              <strong>15:1</strong>
              <span>Learner-Teacher Ratio</span>
            </div>
          </div>
        </div>

        {/* MOBILE HERO / INSTITUTION PROFILE CARD (Inspired by user screenshot) */}
        <div className="profile-hero-card">
          {/* Top Banner Cover Photo */}
          <div className="profile-cover">
            <img
              src={images.campus}
              alt="Mt. Elgon Academy staff and learners on lush green campus grounds"
              className="cover-img"
              fetchPriority="high"
              decoding="async"
            />
            <div className="cover-overlay" />
            <span className="cover-location-tag">Kitale, Trans Nzoia</span>
          </div>

          {/* Crest Avatar Badge (Cleanly positioned with balanced breathing room) */}
          <div className="profile-avatar-wrap">
            <div className="avatar-circle">
              <Crest size={124} className="avatar-crest" />
            </div>
          </div>

          {/* Profile Details (Card Body) */}
          <div className="profile-body">
            {/* School Name with Verified Badge */}
            <div className="profile-title-row">
              <h2 className="profile-title">Mt. Elgon Academy Primary School, Kitale</h2>
            </div>

            {/* Social / School Meta Metrics Line */}
            <div className="profile-meta-line">
              <span className="meta-stat">
                <strong>2.4K</strong> community
              </span>
              <span className="meta-sep">•</span>
              <span className="meta-stat">
                <strong>100%</strong> transition
              </span>
              <span className="meta-sep">•</span>
              <span className="meta-stat">
                <strong>26</strong> yrs excellence
              </span>
            </div>

            {/* Sub-tags Pill Row */}
            <div className="profile-tags-row">
              <span className="sub-tag">CBC Curriculum</span>
              <span className="sub-tag">Day & Boarding</span>
              <span className="sub-tag">Saboti Constituency</span>
            </div>

            {/* Bio Description with See More */}
            <div className="profile-bio">
              <p>
                We offer a unique blend of educational and extra-curriculum activities to equip and produce
                versatile champs who will lead with integrity and excellence.
                {!showMore && (
                  <button
                    type="button"
                    className="see-more-btn"
                    onClick={() => setShowMore(true)}
                  >
                    ... See more
                  </button>
                )}
              </p>
              {showMore && (
                <div className="bio-expanded">
                  <p>
                    <strong>Physical Location:</strong> Central Trans Nzoia in or near Kitale Town, Saboti
                    Constituency, Trans Nzoia County, Kenya.
                  </p>
                  <p>
                    <strong>Postal Address:</strong> P.O. Box – 30200 Kitale, Kenya.
                  </p>
                  <p>
                    <strong>Motto:</strong> &ldquo;Elimu Ni Nguvu&rdquo; (Education is Power).
                  </p>
                  <button
                    type="button"
                    className="see-more-btn"
                    onClick={() => setShowMore(false)}
                  >
                    Show less
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="profile-cta-buttons">
              <button
                type="button"
                onClick={() => onNavigate('admissions')}
                className="btn btn-profile-primary"
                id="profile-apply-btn"
              >
                Apply for Admission
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="btn btn-profile-secondary"
                id="profile-contact-btn"
              >
                Visit / Contact
              </button>
            </div>

            {/* Story / Sub-Page Highlights Carousel Row */}
            <div className="highlights-section">
              <div className="highlights-header">
                <span>Explore Sub-Pages</span>
                <span className="highlights-hint">Tap to view</span>
              </div>
              <div
                className="highlights-scroll"
                tabIndex={0}
                role="region"
                aria-label="Quick subpage shortcuts"
              >
                {storyHighlights.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className="highlight-bubble"
                    onClick={() => onNavigate(item.id)}
                  >
                    <div className="bubble-ring" style={{ '--ring-accent': item.color }}>
                      <div className="bubble-inner">
                        <span className="bubble-code" style={{ color: item.color, fontWeight: 700, fontSize: '0.85rem' }}>
                          {item.code}
                        </span>
                      </div>
                    </div>
                    <span className="bubble-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
