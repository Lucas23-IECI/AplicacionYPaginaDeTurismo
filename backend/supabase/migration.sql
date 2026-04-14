-- ============================================
-- EXPLORA CHILE — Supabase Migration
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================

-- ==========================================
-- 1. TABLAS
-- ==========================================

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Destinations
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION NOT NULL DEFAULT 0,
  lng DOUBLE PRECISION NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Advertisers (linked to auth.users)
CREATE TABLE advertisers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'basico' CHECK (subscription_tier IN ('basico', 'profesional', 'premium')),
  subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE RESTRICT,
  advertiser_id UUID REFERENCES advertisers(id) ON DELETE SET NULL,
  price INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'CLP',
  date_start DATE NOT NULL,
  date_end DATE,
  time_start TIME NOT NULL DEFAULT '09:00',
  time_end TIME,
  address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION NOT NULL DEFAULT 0,
  lng DOUBLE PRECISION NOT NULL DEFAULT 0,
  tag TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  spotlight BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Event Images
CREATE TABLE event_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  type TEXT NOT NULL DEFAULT 'tourist' CHECK (type IN ('tourist', 'advertiser')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FAQ Items
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('tourist', 'advertiser', 'general')),
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User Roles (admin / advertiser)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'advertiser')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- ==========================================
-- 2. INDEXES
-- ==========================================

CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_destination ON events(destination_id);
CREATE INDEX idx_events_advertiser ON events(advertiser_id);
CREATE INDEX idx_events_date_start ON events(date_start);
CREATE INDEX idx_events_featured ON events(featured) WHERE featured = true;
CREATE INDEX idx_events_spotlight ON events(spotlight) WHERE spotlight = true;
CREATE INDEX idx_event_images_event ON event_images(event_id);
CREATE INDEX idx_advertisers_user ON advertisers(user_id);
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_faq_items_active ON faq_items(active, display_order);
CREATE INDEX idx_testimonials_featured ON testimonials(featured) WHERE featured = true;

-- ==========================================
-- 3. UPDATED_AT TRIGGER
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ==========================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertisers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper: check if current user is advertiser
CREATE OR REPLACE FUNCTION is_advertiser()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'advertiser'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper: get advertiser_id for current user
CREATE OR REPLACE FUNCTION get_my_advertiser_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM advertisers
    WHERE user_id = auth.uid()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ---- CATEGORIES (public read, admin write) ----
CREATE POLICY "categories_public_read" ON categories
  FOR SELECT USING (true);

CREATE POLICY "categories_admin_all" ON categories
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- DESTINATIONS (public read, admin write) ----
CREATE POLICY "destinations_public_read" ON destinations
  FOR SELECT USING (true);

CREATE POLICY "destinations_admin_all" ON destinations
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- EVENTS ----
-- Public: read approved events only
CREATE POLICY "events_public_read" ON events
  FOR SELECT USING (status = 'approved');

-- Admin: full access
CREATE POLICY "events_admin_all" ON events
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Advertiser: read own events (any status)
CREATE POLICY "events_advertiser_read_own" ON events
  FOR SELECT USING (advertiser_id = get_my_advertiser_id());

-- Advertiser: insert own events (status must be draft or pending)
CREATE POLICY "events_advertiser_insert" ON events
  FOR INSERT WITH CHECK (
    advertiser_id = get_my_advertiser_id()
    AND status IN ('draft', 'pending')
  );

-- Advertiser: update own events (only draft or rejected)
CREATE POLICY "events_advertiser_update" ON events
  FOR UPDATE USING (
    advertiser_id = get_my_advertiser_id()
    AND status IN ('draft', 'rejected')
  ) WITH CHECK (
    advertiser_id = get_my_advertiser_id()
    AND status IN ('draft', 'pending')
  );

-- ---- EVENT IMAGES ----
CREATE POLICY "event_images_public_read" ON event_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = event_images.event_id AND events.status = 'approved')
  );

CREATE POLICY "event_images_admin_all" ON event_images
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "event_images_advertiser_own" ON event_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_images.event_id
      AND events.advertiser_id = get_my_advertiser_id()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_images.event_id
      AND events.advertiser_id = get_my_advertiser_id()
    )
  );

-- ---- ADVERTISERS ----
-- Admin: full access
CREATE POLICY "advertisers_admin_all" ON advertisers
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Advertiser: read and update own profile
CREATE POLICY "advertisers_own_read" ON advertisers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "advertisers_own_update" ON advertisers
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ---- TESTIMONIALS ----
CREATE POLICY "testimonials_public_read" ON testimonials
  FOR SELECT USING (featured = true);

CREATE POLICY "testimonials_admin_all" ON testimonials
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- NEWSLETTER SUBSCRIBERS ----
-- Anyone can subscribe (insert)
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Admin: full access
CREATE POLICY "newsletter_admin_all" ON newsletter_subscribers
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- CONTACT MESSAGES ----
-- Anyone can send a message (insert)
CREATE POLICY "contact_public_insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Admin: full access
CREATE POLICY "contact_admin_all" ON contact_messages
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- FAQ ITEMS ----
CREATE POLICY "faq_public_read" ON faq_items
  FOR SELECT USING (active = true);

CREATE POLICY "faq_admin_all" ON faq_items
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- USER ROLES ----
-- Users can read their own role
CREATE POLICY "roles_own_read" ON user_roles
  FOR SELECT USING (user_id = auth.uid());

-- Admin: full access
CREATE POLICY "roles_admin_all" ON user_roles
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ==========================================
-- 5. STORAGE BUCKETS
-- ==========================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('event-images', 'event-images', true),
  ('advertiser-logos', 'advertiser-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: event-images
CREATE POLICY "event_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "event_images_auth_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'event-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "event_images_auth_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'event-images'
    AND auth.role() = 'authenticated'
  );

-- Storage policies: advertiser-logos
CREATE POLICY "advertiser_logos_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'advertiser-logos');

CREATE POLICY "advertiser_logos_auth_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'advertiser-logos'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "advertiser_logos_auth_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'advertiser-logos'
    AND auth.role() = 'authenticated'
  );
