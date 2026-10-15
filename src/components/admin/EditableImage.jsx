import { useState, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import { Camera, Loader2 } from 'lucide-react'

export default function EditableImage({
  targetType = 'section',
  targetKey = 'home:hero',
  field = 'image_url',
  src,
  alt = 'School image',
  className = '',
  style = {},
  isBackground = false,
  children,
}) {
  const { isEditMode, uploadImage, registerLiveEdit } = useContent()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleTriggerUpload = (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const publicUrl = await uploadImage(file, 'general')
      registerLiveEdit(targetType, targetKey, field, publicUrl)
    } catch (err) {
      alert(`Image upload error: ${err.message}`)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  if (!isEditMode) {
    if (isBackground) {
      return (
        <div className={className} style={{ ...style, backgroundImage: `url(${src})` }}>
          {children}
        </div>
      )
    }
    return <img src={src} alt={alt} className={className} style={style} />
  }

  return (
    <div className="visual-editable-image-wrap">
      {isBackground ? (
        <div className={className} style={{ ...style, backgroundImage: `url(${src})` }}>
          {children}
        </div>
      ) : (
        <img src={src} alt={alt} className={className} style={style} />
      )}

      {/* Upload button overlay */}
      <button
        type="button"
        onClick={handleTriggerUpload}
        disabled={isUploading}
        className="visual-image-overlay-btn"
        title="Click to change this image (uploads to Supabase Storage)"
      >
        {isUploading ? (
          <>
            <Loader2 size={16} className="spin-icon" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Camera size={16} />
            <span>Change Photo</span>
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelected}
      />
    </div>
  )
}
