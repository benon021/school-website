-- ==============================================================================
-- MT. ELGON ACADEMY - SUPABASE DATABASE & STORAGE INITIALIZATION SCRIPT
-- ==============================================================================
-- How to run:
-- 1. Go to your Supabase Project Dashboard (https://supabase.com/dashboard)
-- 2. Open the "SQL Editor" in the left sidebar
-- 3. Paste this entire script and click "Run"
-- ==============================================================================

-- 1. SITE SETTINGS TABLE (Single row configuration)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_name TEXT NOT NULL DEFAULT 'Mt. Elgon Academy',
    motto TEXT DEFAULT 'Excellence in Christian Values & Holistic Education',
    primary_phone TEXT DEFAULT '+254 700 000 000',
    secondary_phone TEXT DEFAULT '+254 711 000 000',
    email TEXT DEFAULT 'info@mtelgonacademy.ac.ke',
    admissions_email TEXT DEFAULT 'admissions@mtelgonacademy.ac.ke',
    location TEXT DEFAULT 'Central Trans Nzoia, Kitale Town, Saboti Constituency, Kenya',
    term_dates TEXT DEFAULT 'Term 2: May 6th - August 2nd',
    hero_headline TEXT DEFAULT 'Empowering Tomorrow''s Leaders Through Holistic Education',
    hero_subheadline TEXT DEFAULT 'A premier co-educational institution in Trans Nzoia, offering exceptional academic excellence and sound Christian morals.',
    facebook_url TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ANNOUNCEMENTS / NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    badge TEXT DEFAULT 'Announcement',
    link_url TEXT DEFAULT '',
    is_active BOOLEAN DEFAULT true,
    priority INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PAGE SECTIONS TABLE (Dynamic page text & images)
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_key TEXT NOT NULL,      -- e.g., 'home', 'about', 'boarding', 'academics', 'facilities'
    section_key TEXT NOT NULL,   -- e.g., 'hero', 'intro', 'philosophy', 'dorms', 'catering'
    title TEXT,
    subtitle TEXT,
    body_text TEXT,
    image_url TEXT,
    order_index INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(page_key, section_key)
);

-- 4. MEDIA GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    category TEXT DEFAULT 'general', -- 'campus', 'academics', 'boarding', 'sports', 'facilities'
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- 1. Site Settings Policies
CREATE POLICY "Public site_settings are viewable by everyone" 
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update site_settings" 
ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Announcements Policies
CREATE POLICY "Public announcements are viewable by everyone" 
ON public.announcements FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users have full access to announcements" 
ON public.announcements FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Page Sections Policies
CREATE POLICY "Public page sections are viewable by everyone" 
ON public.page_sections FOR SELECT USING (true);

CREATE POLICY "Authenticated users have full access to page sections" 
ON public.page_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Gallery Items Policies
CREATE POLICY "Public gallery items are viewable by everyone" 
ON public.gallery_items FOR SELECT USING (true);

CREATE POLICY "Authenticated users have full access to gallery items" 
ON public.gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET CREATION (school-media)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('school-media', 'school-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view images
CREATE POLICY "Public Access to school-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'school-media');

-- Authenticated users (admin) can upload images
CREATE POLICY "Authenticated can upload to school-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'school-media');

-- Authenticated users (admin) can update/delete images
CREATE POLICY "Authenticated can modify school-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'school-media');

CREATE POLICY "Authenticated can delete from school-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'school-media');

-- ==============================================================================
-- SEED INITIAL DATA (Matches website defaults)
-- ==============================================================================

-- Seed site settings if empty
INSERT INTO public.site_settings (
    school_name, 
    motto, 
    primary_phone, 
    secondary_phone, 
    email, 
    admissions_email, 
    location,
    term_dates
)
SELECT 
    'Mt. Elgon Academy', 
    'Excellence in Christian Values & Holistic Education',
    '+254 700 000 000', 
    '+254 711 000 000', 
    'info@mtelgonacademy.ac.ke', 
    'admissions@mtelgonacademy.ac.ke', 
    'Central Trans Nzoia, Kitale Town, Saboti Constituency, Kenya',
    'Term 2: May 6th - August 2nd'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- Seed announcement
INSERT INTO public.announcements (title, message, badge, is_active, priority)
VALUES (
    'Admissions Open',
    'Ongoing admissions for Early Years, Junior School, and Upper School. Inquire online or visit campus.',
    'Enrollment',
    true,
    1
);

-- Seed initial page sections
INSERT INTO public.page_sections (page_key, section_key, title, subtitle, body_text, order_index)
VALUES 
('home', 'hero', 'Empowering Tomorrow''s Leaders Through Holistic Education', 'Welcome to Mt. Elgon Academy', 'A premier co-educational institution in Trans Nzoia, offering exceptional academic excellence and sound Christian morals.', 1),
('home', 'about_preview', 'Nurturing Minds, Building Character', 'About Mt. Elgon Academy', 'Founded on strong Christian principles, Mt. Elgon Academy provides a supportive, vibrant environment where every student is challenged to achieve their full potential.', 2),
('boarding', 'overview', 'A Warm, Caring Home Away From Home', 'Boarding Experience', 'Our boarding facilities provide a secure, structured, and caring atmosphere where students develop independence, lifelong friendships, and study discipline.', 1),
('academics', 'overview', 'Academic Excellence & Competence', 'Our Curriculum', 'Delivering rigorous academic standards coupled with modern digital literacy and creative problem-solving.', 1),
('contact', 'visit', 'Visit Our Campus', 'Location & Inquiries', 'We are located in Central Trans Nzoia, easily accessible from Kitale Town. Our admissions office is open Monday to Friday, 8:00 AM to 5:00 PM.', 1)
ON CONFLICT (page_key, section_key) DO NOTHING;
