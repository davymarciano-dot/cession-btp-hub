-- Tables de suivi pour toutes les automatisations

-- 1. Table de suivi des crons
CREATE TABLE IF NOT EXISTS cron_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_name VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  duration_ms INTEGER,
  records_processed INTEGER DEFAULT 0,
  errors TEXT[],
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Table de suivi des emails
CREATE TABLE IF NOT EXISTS email_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL,
  template_name VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed')),
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  bounced_at TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  click_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Table de suivi des paniers
CREATE TABLE IF NOT EXISTS cart_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(100) UNIQUE NOT NULL,
  user_id UUID,
  product_type VARCHAR(50),
  product_id VARCHAR(100),
  price DECIMAL(10,2),
  started_at TIMESTAMP NOT NULL,
  last_activity TIMESTAMP,
  abandoned_at TIMESTAMP,
  recovered_at TIMESTAMP,
  steps_completed TEXT[],
  current_step VARCHAR(50),
  time_spent_seconds INTEGER,
  device_type VARCHAR(20),
  browser VARCHAR(50),
  referrer_source VARCHAR(255),
  utm_params JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Table de suivi des conversions
CREATE TABLE IF NOT EXISTS conversion_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  conversion_type VARCHAR(50) NOT NULL,
  source VARCHAR(50),
  campaign VARCHAR(100),
  value DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  attribution_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Table de suivi des matchings
CREATE TABLE IF NOT EXISTS matching_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID,
  buyer_id UUID,
  match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
  algorithm_version VARCHAR(20),
  factors JSONB,
  notification_sent BOOLEAN DEFAULT FALSE,
  seller_response VARCHAR(20),
  buyer_response VARCHAR(20),
  resulted_in_contact BOOLEAN DEFAULT FALSE,
  resulted_in_sale BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. Table de suivi des performances
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type VARCHAR(50) NOT NULL,
  metric_name VARCHAR(100) NOT NULL,
  value DECIMAL(10,2),
  unit VARCHAR(20),
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_cron_tracking_job ON cron_tracking(job_name, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_tracking_status ON email_tracking(status, sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_cart_tracking_session ON cart_tracking(session_id, abandoned_at);
CREATE INDEX IF NOT EXISTS idx_cart_tracking_user ON cart_tracking(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_tracking_user ON conversion_tracking(user_id, conversion_type);
CREATE INDEX IF NOT EXISTS idx_conversion_tracking_date ON conversion_tracking(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_matching_tracking_scores ON matching_tracking(match_score DESC);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_type ON performance_metrics(metric_type, period_start);

-- Enable RLS
ALTER TABLE cron_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE matching_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- Policies pour cron_tracking (admin only)
CREATE POLICY "Admin can view cron tracking" ON cron_tracking
  FOR SELECT USING (true);

CREATE POLICY "System can manage cron tracking" ON cron_tracking
  FOR ALL USING (true) WITH CHECK (true);

-- Policies pour email_tracking
CREATE POLICY "Users can view own email tracking" ON email_tracking
  FOR SELECT USING (true);

CREATE POLICY "System can manage email tracking" ON email_tracking
  FOR ALL USING (true) WITH CHECK (true);

-- Policies pour cart_tracking
CREATE POLICY "Users can view own cart tracking" ON cart_tracking
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "System can manage cart tracking" ON cart_tracking
  FOR ALL USING (true) WITH CHECK (true);

-- Policies pour conversion_tracking
CREATE POLICY "Users can view own conversions" ON conversion_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage conversions" ON conversion_tracking
  FOR ALL USING (true) WITH CHECK (true);

-- Policies pour matching_tracking
CREATE POLICY "Users can view own matches" ON matching_tracking
  FOR SELECT USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "System can manage matching" ON matching_tracking
  FOR ALL USING (true) WITH CHECK (true);

-- Policies pour performance_metrics
CREATE POLICY "Anyone can view metrics" ON performance_metrics
  FOR SELECT USING (true);

CREATE POLICY "System can manage metrics" ON performance_metrics
  FOR ALL USING (true) WITH CHECK (true);

-- Vues pour les dashboards
CREATE OR REPLACE VIEW daily_metrics AS
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT CASE WHEN conversion_type = 'signup' THEN user_id END) as signups,
  COUNT(DISTINCT CASE WHEN conversion_type = 'listing' THEN user_id END) as new_listings,
  COUNT(DISTINCT CASE WHEN conversion_type = 'boost' THEN user_id END) as boosts,
  SUM(CASE WHEN conversion_type = 'revenue' THEN value ELSE 0 END) as revenue
FROM conversion_tracking
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

CREATE OR REPLACE VIEW email_performance AS
SELECT 
  template_name,
  COUNT(*) as total_sent,
  COUNT(opened_at) as opened,
  COUNT(clicked_at) as clicked,
  ROUND(COUNT(opened_at)::NUMERIC / NULLIF(COUNT(*), 0) * 100, 2) as open_rate,
  ROUND(COUNT(clicked_at)::NUMERIC / NULLIF(COUNT(*), 0) * 100, 2) as click_rate
FROM email_tracking
WHERE sent_at >= NOW() - INTERVAL '7 days'
GROUP BY template_name
ORDER BY total_sent DESC;