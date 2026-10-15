import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useContent } from '../../context/ContentContext'
import {
  Lock,
  LogOut,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Copy,
  Plus,
  Trash2,
  Save,
  Globe,
  Settings,
  Bell,
  Layers,
  Database,
  ArrowLeft,
  Sparkles
} from 'lucide-react'

export default function AdminPortal({ onBackToSite }) {
  const { user, login, logout, isDemoMode } = useAuth()
  const {
    settings,
    updateSettings,
    announcements,
    saveAnnouncement,
    deleteAnnouncement,
    pageSections,
    savePageSection,
    gallery,
    uploadImage,
    isSupabaseConfigured,
  } = useContent()

  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Admin tabs: 'general' | 'announcements' | 'pages' | 'media' | 'setup'
  const [activeTab, setActiveTab] = useState('general')

  // Edit settings form
  const [settingsForm, setSettingsForm] = useState(settings)
  const [settingsSaved, setSettingsSaved] = useState(false)

  // Announcements form
  const [newNotice, setNewNotice] = useState({
    title: '',
    message: '',
    badge: 'Announcement',
    is_active: true,
  })

  // Page sections editor state
  const [selectedPage, setSelectedPage] = useState('home')
  const [pageForm, setPageForm] = useState({
    title: '',
    subtitle: '',
    body_text: '',
    image_url: '',
  })
  const [pageSaved, setPageSaved] = useState(false)

  // Upload state
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [copiedUrl, setCopiedUrl] = useState('')
  const fileInputRef = useRef(null)

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    const res = await login(email, password)
    setAuthLoading(false)
    if (!res.success) {
      setAuthError(res.error || 'Failed to login')
    }
  }

  // Handle Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault()
    setSettingsSaved(false)
    const res = await updateSettings(settingsForm)
    if (res.success) {
      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
    }
  }

  // Handle Save Page Section
  const handleSavePageSection = async (e) => {
    e.preventDefault()
    setPageSaved(false)
    const res = await savePageSection(selectedPage, 'overview', pageForm)
    if (res.success) {
      setPageSaved(true)
      setTimeout(() => setPageSaved(false), 3000)
    }
  }

  // Handle Create Announcement
  const handleCreateNotice = async (e) => {
    e.preventDefault()
    if (!newNotice.title || !newNotice.message) return
    await saveAnnouncement(newNotice)
    setNewNotice({ title: '', message: '', badge: 'Announcement', is_active: true })
  }

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError('')
    try {
      const url = await uploadImage(file, 'general')
      setCopiedUrl(url)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setUploadError(err.message || 'Image upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  // Copy to clipboard helper
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedUrl(text)
    setTimeout(() => setCopiedUrl(''), 2500)
  }

  // -------------------------------------------------------------
  // RENDER: LOGIN VIEW (if unauthenticated)
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-badge-icon">
              <Lock size={28} />
            </div>
            <h2>School Admin Portal</h2>
            <p>Sign in to update website content, upload images, and manage school notices.</p>
          </div>

          {authError && (
            <div className="admin-alert error">
              <AlertCircle size={18} />
              <span>{authError}</span>
            </div>
          )}

          {!isSupabaseConfigured && (
            <div className="admin-alert info">
              <Sparkles size={18} />
              <div>
                <strong>Supabase credentials not configured yet.</strong>
                <p>You can test with any demo email/password (e.g. <code>admin@school.com</code> / <code>demo123</code>) to preview the portal!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <label>Staff / Admin Email</label>
              <input
                type="email"
                required
                placeholder="admin@mtelgonacademy.ac.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={authLoading} className="admin-btn primary full">
              {authLoading ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="admin-login-footer">
            <button type="button" onClick={onBackToSite} className="admin-text-btn">
              <ArrowLeft size={16} /> Return to Public Website
            </button>
          </div>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // RENDER: LOGGED IN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="admin-dashboard-container">
      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-logo-mark">ME</div>
          <div>
            <h1 className="admin-topbar-title">Mt. Elgon Academy CMS</h1>
            <div className="admin-topbar-status">
              <span className={`status-dot ${isSupabaseConfigured ? 'live' : 'demo'}`} />
              <span>{isSupabaseConfigured ? 'Connected to Supabase' : 'Demo Mode (Local Changes)'}</span>
              {isDemoMode && <span className="demo-tag">Preview Mode</span>}
            </div>
          </div>
        </div>

        <div className="admin-topbar-right">
          <button type="button" onClick={onBackToSite} className="admin-btn secondary">
            <Globe size={16} /> View Website
          </button>
          <button type="button" onClick={logout} className="admin-btn logout">
            <LogOut size={16} /> Sign Out ({user.email})
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="admin-layout">
        {/* Navigation Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button
              className={`admin-nav-item ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <Settings size={18} />
              <span>Site Info & Contacts</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
              onClick={() => setActiveTab('announcements')}
            >
              <Bell size={18} />
              <span>Announcements & Alerts</span>
              {announcements.length > 0 && (
                <span className="count-pill">{announcements.length}</span>
              )}
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'pages' ? 'active' : ''}`}
              onClick={() => setActiveTab('pages')}
            >
              <Layers size={18} />
              <span>Page Text & Sections</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'media' ? 'active' : ''}`}
              onClick={() => setActiveTab('media')}
            >
              <ImageIcon size={18} />
              <span>Media & Image Storage</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'setup' ? 'active' : ''}`}
              onClick={() => setActiveTab('setup')}
            >
              <Database size={18} />
              <span>Database & Setup Guide</span>
            </button>
          </nav>

          <div className="admin-sidebar-footer">
            <p>Need help? Run the provided SQL script in your Supabase dashboard to sync data in seconds.</p>
          </div>
        </aside>

        {/* Workspace Content Area */}
        <main className="admin-main-panel">
          {/* TAB 1: GENERAL SETTINGS */}
          {activeTab === 'general' && (
            <div className="admin-section-card">
              <div className="section-header">
                <div>
                  <h2>General School Info & Contact Details</h2>
                  <p>Changes saved here automatically update the navbar, footer, and contact pages.</p>
                </div>
                {settingsSaved && (
                  <div className="save-badge">
                    <CheckCircle size={16} /> Saved Successfully
                  </div>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="admin-form-grid">
                <div className="form-group full-width">
                  <label>Official School Name</label>
                  <input
                    type="text"
                    value={settingsForm.school_name || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, school_name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label>Motto / Slogan</label>
                  <input
                    type="text"
                    value={settingsForm.motto || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, motto: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Primary Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.primary_phone || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, primary_phone: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Secondary Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.secondary_phone || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, secondary_phone: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Official School Email</label>
                  <input
                    type="email"
                    value={settingsForm.email || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Admissions Inquiries Email</label>
                  <input
                    type="email"
                    value={settingsForm.admissions_email || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, admissions_email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label>Physical Address / Campus Location</label>
                  <input
                    type="text"
                    value={settingsForm.location || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, location: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label>Current Term Dates / Calendar Highlight</label>
                  <input
                    type="text"
                    placeholder="e.g. Term 2: May 6th - August 2nd"
                    value={settingsForm.term_dates || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, term_dates: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label>Home Hero Headline</label>
                  <input
                    type="text"
                    value={settingsForm.hero_headline || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, hero_headline: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label>Home Hero Subtext</label>
                  <textarea
                    rows={3}
                    value={settingsForm.hero_subheadline || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, hero_subheadline: e.target.value })
                    }
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="admin-btn primary">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ANNOUNCEMENTS & TICKER */}
          {activeTab === 'announcements' && (
            <div className="admin-section-card">
              <div className="section-header">
                <div>
                  <h2>Announcements & Urgent Alerts</h2>
                  <p>Publish alerts for holiday closures, admission deadlines, or parent notices.</p>
                </div>
              </div>

              {/* Create Notice Form */}
              <div className="admin-notice-creator">
                <h3>Publish New Announcement</h3>
                <form onSubmit={handleCreateNotice} className="admin-form-grid">
                  <div className="form-group">
                    <label>Badge / Category (e.g. Urgent, Admission, Event)</label>
                    <input
                      type="text"
                      placeholder="e.g. Admission Alert"
                      value={newNotice.badge}
                      onChange={(e) => setNewNotice({ ...newNotice, badge: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Announcement Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Term 2 Interviews Ongoing"
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Full Message Details</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Detailed message or instructions for parents and students..."
                      value={newNotice.message}
                      onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="admin-btn primary">
                      <Plus size={16} /> Publish Announcement
                    </button>
                  </div>
                </form>
              </div>

              {/* List of active announcements */}
              <div className="admin-notice-list">
                <h3>Active & Past Announcements ({announcements.length})</h3>
                {announcements.length === 0 ? (
                  <p className="empty-state">No announcements created yet. Add one above!</p>
                ) : (
                  announcements.map((item) => (
                    <div key={item.id} className="notice-row">
                      <div className="notice-content">
                        <span className="notice-badge">{item.badge || 'Notice'}</span>
                        <h4>{item.title}</h4>
                        <p>{item.message}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteAnnouncement(item.id)}
                        className="admin-btn danger small"
                        title="Delete notice"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PAGE CONTENT CUSTOMIZER */}
          {activeTab === 'pages' && (
            <div className="admin-section-card">
              <div className="section-header">
                <div>
                  <h2>Customize Page Text & Presentation</h2>
                  <p>Select which page and section you want to customize.</p>
                </div>
                {pageSaved && (
                  <div className="save-badge">
                    <CheckCircle size={16} /> Page Updated
                  </div>
                )}
              </div>

              <div className="page-selector-bar">
                {['home', 'about', 'boarding', 'academics', 'facilities', 'contact'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`page-pill ${selectedPage === p ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedPage(p)
                      const existing = pageSections[`${p}:overview`] || {}
                      setPageForm({
                        title: existing.title || '',
                        subtitle: existing.subtitle || '',
                        body_text: existing.body_text || '',
                        image_url: existing.image_url || '',
                      })
                    }}
                  >
                    {p.toUpperCase()} PAGE
                  </button>
                ))}
              </div>

              <form onSubmit={handleSavePageSection} className="admin-form-grid">
                <div className="form-group full-width">
                  <label>Section Heading / Title</label>
                  <input
                    type="text"
                    placeholder="Enter main heading..."
                    value={pageForm.title}
                    onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Section Subtitle / Tagline</label>
                  <input
                    type="text"
                    placeholder="Enter short tagline..."
                    value={pageForm.subtitle}
                    onChange={(e) => setPageForm({ ...pageForm, subtitle: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Body Content / Paragraph</label>
                  <textarea
                    rows={5}
                    placeholder="Write detailed information for this section..."
                    value={pageForm.body_text}
                    onChange={(e) => setPageForm({ ...pageForm, body_text: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Featured Section Image URL (Paste or select from Media Manager)</label>
                  <input
                    type="url"
                    placeholder="https://... image link"
                    value={pageForm.image_url}
                    onChange={(e) => setPageForm({ ...pageForm, image_url: e.target.value })}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="admin-btn primary">
                    <Save size={16} /> Save {selectedPage.toUpperCase()} Section
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: MEDIA & IMAGE MANAGER */}
          {activeTab === 'media' && (
            <div className="admin-section-card">
              <div className="section-header">
                <div>
                  <h2>Media & Image Storage</h2>
                  <p>Upload photos directly to your Supabase Storage bucket (<code>school-media</code>).</p>
                </div>
              </div>

              {/* Upload Drop Area */}
              <div className="upload-dropzone">
                <Upload size={36} />
                <h3>Upload New School Photo</h3>
                <p>Supports JPG, PNG, WEBP images up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                {isUploading && <p className="uploading-hint">Uploading to Supabase Storage...</p>}
                {uploadError && <p className="upload-error">{uploadError}</p>}
                {copiedUrl && (
                  <p className="upload-success">
                    Image uploaded! URL copied: <code>{copiedUrl.substring(0, 50)}...</code>
                  </p>
                )}
              </div>

              {/* Gallery Grid */}
              <div className="media-gallery-section">
                <h3>Uploaded Media Library ({gallery.length} photos)</h3>
                {gallery.length === 0 ? (
                  <p className="empty-state">No images uploaded yet. Use the upload area above to add your first photo.</p>
                ) : (
                  <div className="gallery-admin-grid">
                    {gallery.map((img) => (
                      <div key={img.id} className="gallery-item-card">
                        <img src={img.image_url} alt={img.title || 'Uploaded media'} />
                        <div className="gallery-card-footer">
                          <span className="card-title">{img.title || 'Photo'}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(img.image_url)}
                            className="admin-btn secondary small"
                            title="Copy Image URL"
                          >
                            <Copy size={14} /> Copy URL
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SUPABASE & DATABASE SETUP */}
          {activeTab === 'setup' && (
            <div className="admin-section-card">
              <div className="section-header">
                <div>
                  <h2>Supabase Connection & Database Setup</h2>
                  <p>Verify your connection and set up the cloud database in minutes.</p>
                </div>
              </div>

              <div className="connection-status-box">
                <div className="status-badge-row">
                  <span className={`status-indicator ${isSupabaseConfigured ? 'green' : 'amber'}`} />
                  <strong>
                    {isSupabaseConfigured
                      ? 'Supabase Credentials Detected in .env.local'
                      : 'Missing Supabase Credentials'}
                  </strong>
                </div>
                <p>
                  To connect your real database, create or edit the file <code>.env.local</code> in the project root:
                </p>
                <pre className="code-snippet">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key`}
                </pre>
              </div>

              <div className="sql-instructions-box">
                <h3>Quick Database Setup (One Click)</h3>
                <p>
                  A complete migration script has been created in your project: <code>supabase-setup.sql</code>.
                  Copy and paste it into your <strong>Supabase Dashboard &gt; SQL Editor</strong> and hit <strong>Run</strong>.
                </p>
                <ul>
                  <li>✅ Automatically creates <code>site_settings</code>, <code>announcements</code>, and <code>page_sections</code></li>
                  <li>✅ Creates the <code>school-media</code> public storage bucket with upload policies</li>
                  <li>✅ Seeds initial data matching your current website content</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
