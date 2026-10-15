import { useState, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import { Edit2, Check } from 'lucide-react'

export default function EditableText({
  targetType = 'settings',
  targetKey = 'general',
  field = 'title',
  value = '',
  fallback = '',
  as = 'p',
  className = '',
  style = {},
  children,
}) {
  const { isEditMode, registerLiveEdit } = useContent()
  const [isEditing, setIsEditing] = useState(false)
  const [tempText, setTempText] = useState(value || fallback || '')
  const inputRef = useRef(null)

  const Tag = as
  const displayText = value || fallback || children || ''

  if (!isEditMode) {
    return (
      <Tag className={className} style={style}>
        {displayText}
      </Tag>
    )
  }

  const handleStartEdit = (e) => {
    e.stopPropagation()
    setTempText(displayText)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }

  const handleFinishEdit = () => {
    setIsEditing(false)
    if (tempText !== displayText) {
      registerLiveEdit(targetType, targetKey, field, tempText)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && as !== 'p' && as !== 'textarea') {
      e.preventDefault()
      handleFinishEdit()
    }
  }

  return (
    <div className="visual-editable-container" onClick={(e) => isEditing && e.stopPropagation()}>
      {isEditing ? (
        <div className="visual-inline-editor">
          {as === 'p' || as === 'div' ? (
            <textarea
              ref={inputRef}
              rows={3}
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              onBlur={handleFinishEdit}
              className="inline-textarea-input"
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              onBlur={handleFinishEdit}
              onKeyDown={handleKeyDown}
              className="inline-text-input"
            />
          )}
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              handleFinishEdit()
            }}
            className="inline-save-btn"
            title="Done"
          >
            <Check size={14} />
          </button>
        </div>
      ) : (
        <Tag
          className={`${className} visual-editable-hover`}
          style={style}
          onClick={handleStartEdit}
          title="Click to edit text directly"
        >
          {displayText}
          <span className="visual-edit-pen" aria-hidden="true">
            <Edit2 size={12} />
          </span>
        </Tag>
      )}
    </div>
  )
}
