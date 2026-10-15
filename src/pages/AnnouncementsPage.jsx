import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { Bell, Calendar, AlertTriangle, Info, Search } from 'lucide-react'

const defaultAnnouncements = [
  {
    id: 'default-1',
    title: 'Fee Payment Deadline Notice',
    badge: 'Urgent Alert',
    message: 'All parents and guardians are kindly reminded that outstanding school fees for the current term must be settled by Friday this week. Kindly visit the accounts office or use the official school paybill.',
    created_at: '2026-05-10T08:00:00Z',
    priority: 3,
    is_active: true,
  },
  {
    id: 'default-2',
    title: 'Admissions 2025/2026 Ongoing',
    badge: 'Enrollment',
    message: 'Ongoing interviews and registration for Early Years, Primary, and Junior Secondary School. Door-to-stage bus transit routes are open across Kitale, Saboti, and surrounding areas.',
    created_at: '2026-05-08T09:30:00Z',
    priority: 2,
    is_active: true,
  },
  {
    id: 'default-3',
    title: 'Mid-Term Break & Academic Progress Review',
    badge: 'Academic Calendar',
    message: 'Mid-term consultations with class teachers are scheduled for next Friday starting at 9:00 AM. Learner progress evaluation report cards will be presented to parents.',
    created_at: '2026-05-02T10:00:00Z',
    priority: 1,
    is_active: true,
  },
]

export default function AnnouncementsPage({ onNavigate }) {
  const { announcements } = useContent()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const displayList = announcements && announcements.length > 0 ? announcements : defaultAnnouncements

  // Filter & search
  const filteredNotices = displayList.filter((item) => {
    if (!item.is_active && item.is_active !== undefined) return false

    const matchesFilter =
      filter === 'all' ||
      (filter === 'urgent' && (item.badge?.toLowerCase().includes('urgent') || item.badge?.toLowerCase().includes('alert') || item.priority > 2)) ||
      (filter === 'academic' && (item.badge?.toLowerCase().includes('academic') || item.badge?.toLowerCase().includes('exam') || item.badge?.toLowerCase().includes('term'))) ||
      (filter === 'admissions' && (item.badge?.toLowerCase().includes('admiss') || item.badge?.toLowerCase().includes('enroll')))

    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="subpage announcements-page">
      {/* Header Banner */}
      <section className="subpage-hero">
        <div className="container subpage-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="crumb-link">
              Home
            </button>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">School Circulars & Announcements</span>
          </nav>
          <span className="eyebrow red">Official Notice Board</span>
          <h1>School Announcements & Circulars</h1>
          <p className="subpage-lead">
            Stay informed with the latest administrative updates, academic calendars, fee guidelines, and term notices from Mt. Elgon Academy.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          {/* Controls bar: search and filter */}
          <div className="notices-control-bar">
            <div className="notices-filter-pills">
              <button
                type="button"
                className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Notices ({displayList.length})
              </button>
              <button
                type="button"
                className={`filter-pill urgent ${filter === 'urgent' ? 'active' : ''}`}
                onClick={() => setFilter('urgent')}
              >
                <AlertTriangle size={14} /> Urgent Alerts
              </button>
              <button
                type="button"
                className={`filter-pill ${filter === 'academic' ? 'active' : ''}`}
                onClick={() => setFilter('academic')}
              >
                Academic & Events
              </button>
              <button
                type="button"
                className={`filter-pill ${filter === 'admissions' ? 'active' : ''}`}
                onClick={() => setFilter('admissions')}
              >
                Admissions
              </button>
            </div>

            <div className="notices-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search circulars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search announcements"
              />
            </div>
          </div>

          {/* Announcements Grid */}
          <div className="notices-grid">
            {filteredNotices.length === 0 ? (
              <div className="no-notices-found">
                <Info size={40} />
                <h3>No announcements found</h3>
                <p>No notices matched your filter or search criteria.</p>
                <button type="button" onClick={() => { setFilter('all'); setSearchQuery('') }} className="btn btn-secondary">
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredNotices.map((notice) => {
                const isUrgent =
                  notice.badge?.toLowerCase().includes('urgent') ||
                  notice.badge?.toLowerCase().includes('alert') ||
                  notice.priority > 2

                return (
                  <article key={notice.id} className={`notice-card ${isUrgent ? 'urgent-border' : ''}`}>
                    <div className="notice-card-header">
                      <div className="notice-meta">
                        <span className={`notice-badge-pill ${isUrgent ? 'urgent' : ''}`}>
                          {isUrgent && <AlertTriangle size={12} />}
                          {notice.badge || 'School Notice'}
                        </span>
                        <span className="notice-date">
                          <Calendar size={13} />
                          {notice.created_at ? new Date(notice.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                        </span>
                      </div>
                    </div>

                    <h2 className="notice-card-title">{notice.title}</h2>
                    <p className="notice-card-body">{notice.message}</p>

                    <div className="notice-card-footer">
                      {notice.title?.toLowerCase().includes('fee') ? (
                        <button
                          type="button"
                          onClick={() => onNavigate('contact')}
                          className="btn btn-primary btn-sm"
                        >
                          Accounts Office Info
                        </button>
                      ) : notice.title?.toLowerCase().includes('admiss') ? (
                        <button
                          type="button"
                          onClick={() => onNavigate('admissions')}
                          className="btn btn-primary btn-sm"
                        >
                          Apply Online
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onNavigate('contact')}
                          className="btn btn-outline btn-sm"
                        >
                          Inquire with Administration
                        </button>
                      )}
                    </div>
                  </article>
                )
              })
            )}
          </div>

          {/* Quick Notice footer bar */}
          <div className="notice-board-footer-box">
            <div className="box-icon">
              <Bell size={24} />
            </div>
            <div>
              <h3>Have questions about an official circular?</h3>
              <p>For clarifications on fee payments, schedules, or transport queries, reach our front office on <strong>+254 700 000 000</strong>.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="btn btn-secondary"
            >
              Contact School Office
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
