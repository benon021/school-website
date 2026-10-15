import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const defaultSettings = {
  school_name: 'Mt. Elgon Academy',
  motto: 'Excellence in Christian Values & Holistic Education',
  primary_phone: '+254 700 000 000',
  secondary_phone: '+254 711 000 000',
  email: 'info@mtelgonacademy.ac.ke',
  admissions_email: 'admissions@mtelgonacademy.ac.ke',
  location: 'Central Trans Nzoia, Kitale Town, Saboti Constituency, Kenya',
  term_dates: 'Term 2: May 6th - August 2nd',
  hero_headline: "Empowering Tomorrow's Leaders Through Holistic Education",
  hero_subheadline: 'A premier co-educational institution in Trans Nzoia, offering exceptional academic excellence and sound Christian morals.',
  hero_image: '',
  facebook_url: '',
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)
  const [announcements, setAnnouncements] = useState([])
  const [pageSections, setPageSections] = useState({})
  const [gallery, setGallery] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [supabaseStatus, setSupabaseStatus] = useState(
    isSupabaseConfigured ? 'connecting' : 'not_configured'
  )

  const fetchContent = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setIsLoading(false)
      setSupabaseStatus('not_configured')
      return
    }

    try {
      setIsLoading(true)

      // Fetch settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)

      if (settingsError) {
        console.warn('Supabase site_settings error:', settingsError.message)
        setSupabaseStatus('error')
      } else if (settingsData && settingsData.length > 0) {
        setSettings({ ...defaultSettings, ...settingsData[0] })
        setSupabaseStatus('connected')
      } else {
        setSupabaseStatus('connected')
      }

      // Fetch announcements
      const { data: announcementsData } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })

      if (announcementsData) {
        setAnnouncements(announcementsData)
      }

      // Fetch page sections
      const { data: sectionsData } = await supabase
        .from('page_sections')
        .select('*')

      if (sectionsData) {
        const sectionsMap = {}
        sectionsData.forEach((s) => {
          const key = `${s.page_key}:${s.section_key}`
          sectionsMap[key] = s
        })
        setPageSections(sectionsMap)
      }

      // Fetch gallery
      const { data: galleryData } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false })

      if (galleryData) {
        setGallery(galleryData)
      }
    } catch (err) {
      console.error('Error fetching dynamic content from Supabase:', err)
      setSupabaseStatus('error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  // Helper: get page section with fallback
  const getSection = (pageKey, sectionKey, fallback = {}) => {
    const key = `${pageKey}:${sectionKey}`
    return pageSections[key] || fallback
  }

  // Update Settings
  const updateSettings = async (newSettings) => {
    if (!isSupabaseConfigured) {
      setSettings((prev) => ({ ...prev, ...newSettings }))
      return { success: true, localOnly: true }
    }

    try {
      const payload = {
        ...settings,
        ...newSettings,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('site_settings')
        .upsert(payload)
        .select()

      if (error) throw error

      if (data && data[0]) {
        setSettings(data[0])
      } else {
        setSettings(payload)
      }
      return { success: true }
    } catch (err) {
      console.error('Error updating settings:', err)
      return { success: false, error: err.message }
    }
  }

  // Save / Update Page Section
  const savePageSection = async (pageKey, sectionKey, fields) => {
    const key = `${pageKey}:${sectionKey}`
    const updated = {
      page_key: pageKey,
      section_key: sectionKey,
      ...fields,
      updated_at: new Date().toISOString()
    }

    if (!isSupabaseConfigured) {
      setPageSections((prev) => ({ ...prev, [key]: updated }))
      return { success: true, localOnly: true }
    }

    try {
      const { data, error } = await supabase
        .from('page_sections')
        .upsert(updated, { onConflict: 'page_key,section_key' })
        .select()

      if (error) throw error

      setPageSections((prev) => ({ ...prev, [key]: data ? data[0] : updated }))
      return { success: true }
    } catch (err) {
      console.error('Error saving page section:', err)
      return { success: false, error: err.message }
    }
  }

  // Upload an image to Supabase Storage bucket 'school-media'
  const uploadImage = async (file, folder = 'uploads') => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured yet. Please add your credentials in .env.local')
    }

    const fileExt = file.name.split('.').pop()
    const cleanFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
    const filePath = `${folder}/${cleanFileName}`

    const { error: uploadError } = await supabase.storage
      .from('school-media')
      .upload(filePath, file, { cacheControl: '3600', upsert: true })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabase.storage
      .from('school-media')
      .getPublicUrl(filePath)

    const publicUrl = publicUrlData.publicUrl

    // Add to gallery_items table as well
    await supabase.from('gallery_items').insert({
      title: file.name.replace(/\.[^/.]+$/, ''),
      category: folder,
      image_url: publicUrl,
    })

    await fetchContent()
    return publicUrl
  }

  // Announcements helpers
  const saveAnnouncement = async (announcement) => {
    if (!isSupabaseConfigured) {
      const item = { ...announcement, id: Date.now().toString(), created_at: new Date().toISOString() }
      setAnnouncements((prev) => [item, ...prev])
      return { success: true, localOnly: true }
    }

    try {
      const { error } = await supabase.from('announcements').upsert(announcement)
      if (error) throw error
      await fetchContent()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const deleteAnnouncement = async (id) => {
    if (!isSupabaseConfigured) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id))
      return { success: true }
    }

    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id)
      if (error) throw error
      await fetchContent()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return (
    <ContentContext.Provider
      value={{
        settings,
        announcements,
        pageSections,
        gallery,
        isLoading,
        supabaseStatus,
        isSupabaseConfigured,
        getSection,
        updateSettings,
        savePageSection,
        uploadImage,
        saveAnnouncement,
        deleteAnnouncement,
        refreshContent: fetchContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
