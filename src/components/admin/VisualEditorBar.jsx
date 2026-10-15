import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useContent } from '../../context/ContentContext'
import RegistriesModal from './RegistriesModal'
import {
  Edit3,
  Eye,
  Save,
  RotateCcw,
  Inbox,
  LayoutDashboard,
  LogOut,
  CheckCircle,
} from 'lucide-react'

export default function VisualEditorBar({ onNavigate }) {
  const { user, logout, isDemoMode } = useAuth()
  const {
    isEditMode,
    toggleEditMode,
    saveAllPendingEdits,
    resetToDefaults,
    hasUnsavedChanges,
    applications,
  } = useContent()

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [registriesOpen, setRegistriesOpen] = useState(false)

  // If not logged in, don't show the floating editor bar
  if (!user) return null

  const handleSave = async () => {
    setIsSaving(true)
    const res = await saveAllPendingEdits()
    setIsSaving(false)
    if (res.success) {
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } else {
      alert(`Error saving changes: ${res.error}`)
    }
  }

  const newAppsCount = applications.filter((a) => a.status === 'New').length

  return (
    <>
      <div className="visual-admin-floating-bar" role="toolbar" aria-label="Visual website editor">
        <div className="bar-left">
          <div className="bar-brand">
            <span className="bar-badge">MEA</span>
            <span className="bar-title">Live Editor</span>
            {isDemoMode && <span className="bar-demo-pill">Preview</span>}
          </div>

          <button
            type="button"
            onClick={toggleEditMode}
            className={`editor-toggle-btn ${isEditMode ? 'active' : ''}`}
            title="Toggle live editing on the webpage"
          >
            {isEditMode ? (
              <>
                <Edit3 size={15} />
                <span>Editing: <strong>ON</strong></span>
              </>
            ) : (
              <>
                <Eye size={15} />
                <span>Edit Mode: <strong>OFF</strong></span>
              </>
            )}
          </button>
        </div>

        <div className="bar-actions">
          {hasUnsavedChanges && (
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="bar-btn save-btn"
              title="Save all changes to Supabase"
            >
              <Save size={15} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          )}

          {saveSuccess && (
            <div className="bar-saved-badge">
              <CheckCircle size={15} />
              <span>Published Live!</span>
            </div>
          )}

          <button
            type="button"
            onClick={resetToDefaults}
            className="bar-btn ghost-btn"
            title="Reset text & photos back to defaults"
          >
            <RotateCcw size={15} />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setRegistriesOpen(true)}
            className="bar-btn inbox-btn"
            title="View Online Registries & Admissions"
          >
            <Inbox size={15} />
            <span>Registries</span>
            {newAppsCount > 0 && <span className="inbox-badge">{newAppsCount}</span>}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="bar-btn ghost-btn"
            title="Go to full admin dashboard"
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="bar-btn logout-icon-btn"
            title={`Sign Out (${user.email})`}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>

      {/* Online Registries / Applications Inbox Modal */}
      <RegistriesModal isOpen={registriesOpen} onClose={() => setRegistriesOpen(false)} />
    </>
  )
}
