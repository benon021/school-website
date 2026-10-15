import { useContent } from '../../context/ContentContext'
import { X, Phone, Mail, User, Calendar, BookOpen, Trash2 } from 'lucide-react'

export default function RegistriesModal({ isOpen, onClose }) {
  const { applications, updateApplicationStatus, deleteApplication } = useContent()

  if (!isOpen) return null

  return (
    <div className="registries-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="registries-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="registries-modal-header">
          <div>
            <h2>Online Admissions & Registries Inbox</h2>
            <p>Direct applications submitted by prospective parents on the website.</p>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="registries-modal-body">
          {applications.length === 0 ? (
            <div className="empty-registries">
              <BookOpen size={48} className="empty-icon" />
              <h3>No Applications Received Yet</h3>
              <p>When parents fill out the Online Admissions form on the website, their details appear here in real-time.</p>
            </div>
          ) : (
            <div className="registries-grid">
              {applications.map((app) => (
                <div key={app.id} className="registry-card">
                  <div className="registry-card-top">
                    <div>
                      <span className={`status-pill ${app.status?.toLowerCase().replace(/\s+/g, '-') || 'new'}`}>
                        {app.status || 'New'}
                      </span>
                      <h3 className="student-name">
                        <User size={16} /> {app.student_name}
                      </h3>
                      <span className="student-grade">
                        Grade: <strong>{app.entry_grade}</strong> • {app.boarding_type} ({app.gender})
                      </span>
                    </div>

                    <div className="status-dropdown-wrap">
                      <select
                        value={app.status || 'New'}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="status-select"
                        aria-label="Application status"
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Interview Scheduled">Status: Interview Scheduled</option>
                        <option value="Admitted">Status: Admitted</option>
                        <option value="Archived">Status: Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="registry-card-details">
                    <div className="detail-item">
                      <span className="detail-label">Parent / Guardian:</span>
                      <strong>{app.parent_name}</strong>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Phone:</span>
                      <a href={`tel:${app.phone}`} className="phone-link">
                        <Phone size={14} /> {app.phone}
                      </a>
                    </div>

                    {app.email && (
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <a href={`mailto:${app.email}`} className="email-link">
                          <Mail size={14} /> {app.email}
                        </a>
                      </div>
                    )}

                    <div className="detail-item">
                      <span className="detail-label">Intake Term:</span>
                      <span>{app.intake_term || 'Term 1'}</span>
                    </div>

                    {app.notes && (
                      <div className="detail-notes">
                        <span className="detail-label">Parent Notes:</span>
                        <p>{app.notes}</p>
                      </div>
                    )}

                    <div className="registry-card-footer">
                      <span className="date-tag">
                        <Calendar size={12} /> {new Date(app.created_at).toLocaleDateString()} at {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete application for ${app.student_name}?`)) {
                            deleteApplication(app.id)
                          }
                        }}
                        className="delete-reg-btn"
                        title="Delete registry"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
