-- Tables de tracking complètes

-- Table principale de tracking des événements
CREATE TABLE IF NOT EXISTS events_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id VARCHAR(100),
  event_type VARCHAR(50) NOT NULL,
  event_category VARCHAR(50),
  event_action VARCHAR(100),
  event_label VARCHAR(255),
  event_value DECIMAL(10,2),
  page_url TEXT,
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  device_type VARCHAR(20),
  browser VARCHAR(50),
  ip_address INET,
  country VARCHAR(2),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table de tracking des conversions
CREATE TABLE IF NOT EXISTS conversions_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  conversion_type VARCHAR(50) NOT NULL,
  conversion_value DECIMAL(10,2),
  source VARCHAR(50),
  medium VARCHAR(50),
  campaign VARCHAR(100),
  landing_page TEXT,
  referrer TEXT,
  time_to_convert_seconds INTEGER,
  attribution_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table de tracking des carts (complète)
CREATE TABLE IF NOT EXISTS carts_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cart_id VARCHAR(100) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  product_type VARCHAR(50),
  product_id VARCHAR(100),
  price DECIMAL(10,2),
  discount_applied DECIMAL(10,2),
  steps_completed JSONB DEFAULT '[]',
  last_step VARCHAR(50),
  started_at TIMESTAMP NOT NULL,
  abandoned_at TIMESTAMP,
  recovered_at TIMESTAMP,
  recovery_attempts INTEGER DEFAULT 0,
  recovery_emails_sent INTEGER DEFAULT 0,
  device_info JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table de tracking des emails (complète)
CREATE TABLE IF NOT EXISTS emails_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id VARCHAR(255) UNIQUE,
  user_id UUID REFERENCES auth.users(id),
  recipient_email VARCHAR(255) NOT NULL,
  template_name VARCHAR(50),
  campaign_id VARCHAR(100),
  subject TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  bounced_at TIMESTAMP,
  complained_at TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  clicked_links JSONB DEFAULT '[]',
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table de tracking des vues d'annonces (complète)
CREATE TABLE IF NOT EXISTS listings_views_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES annonces(id),
  viewer_id UUID REFERENCES auth.users(id),
  viewer_type VARCHAR(20),
  session_id VARCHAR(100),
  view_duration_seconds INTEGER,
  scroll_depth_percent INTEGER,
  clicked_contact BOOLEAN DEFAULT FALSE,
  clicked_phone BOOLEAN DEFAULT FALSE,
  source VARCHAR(50),
  device_type VARCHAR(20),
  location_country VARCHAR(2),
  location_city VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table de tracking des comparaisons
CREATE TABLE IF NOT EXISTS comparisons_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id VARCHAR(100),
  compared_listings UUID[] NOT NULL,
  comparison_completed BOOLEAN DEFAULT FALSE,
  resulted_in_contact BOOLEAN DEFAULT FALSE,
  contacted_listing_id UUID,
  time_spent_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table de notifications temps réel
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  type VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour optimisation
CREATE INDEX IF NOT EXISTS idx_events_user_session ON events_tracking(user_id, session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_events_type ON events_tracking(event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_conversions_user ON conversions_tracking(user_id, conversion_type);
CREATE INDEX IF NOT EXISTS idx_carts_abandoned ON carts_tracking(abandoned_at) WHERE abandoned_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_emails_status ON emails_tracking(status, sent_at);
CREATE INDEX IF NOT EXISTS idx_listings_views ON listings_views_tracking(listing_id, created_at);
CREATE INDEX IF NOT EXISTS idx_comparisons_user ON comparisons_tracking(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read, created_at);

-- RLS policies
ALTER TABLE events_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings_views_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies pour events_tracking
CREATE POLICY "Users can view own events" ON events_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert events" ON events_tracking FOR INSERT WITH CHECK (true);

-- Policies pour conversions_tracking
CREATE POLICY "Users can view own conversions" ON conversions_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert conversions" ON conversions_tracking FOR INSERT WITH CHECK (true);

-- Policies pour carts_tracking
CREATE POLICY "Users can view own carts" ON carts_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can manage carts" ON carts_tracking FOR ALL USING (true);

-- Policies pour emails_tracking
CREATE POLICY "Users can view own emails" ON emails_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can manage emails" ON emails_tracking FOR ALL USING (true);

-- Policies pour listings_views_tracking
CREATE POLICY "Listing owners can view their views" ON listings_views_tracking FOR SELECT 
USING (EXISTS (SELECT 1 FROM annonces WHERE annonces.id = listing_id AND annonces.user_id = auth.uid()));
CREATE POLICY "System can insert views" ON listings_views_tracking FOR INSERT WITH CHECK (true);

-- Policies pour comparisons_tracking
CREATE POLICY "Users can view own comparisons" ON comparisons_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert comparisons" ON comparisons_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies pour notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Fonction de tracking
CREATE OR REPLACE FUNCTION track_event(
  p_user_id UUID,
  p_event_type VARCHAR,
  p_event_action VARCHAR,
  p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO events_tracking (
    user_id, 
    event_type, 
    event_action, 
    metadata
  ) VALUES (
    p_user_id,
    p_event_type,
    p_event_action,
    p_metadata
  ) RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vue pour analytics
CREATE OR REPLACE VIEW analytics_overview AS
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN user_id END) as visitors,
  COUNT(DISTINCT CASE WHEN event_type = 'conversion' THEN user_id END) as converters
FROM events_tracking
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;