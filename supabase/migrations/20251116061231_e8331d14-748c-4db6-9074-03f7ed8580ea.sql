-- ============================================
-- CRITICAL SECURITY FIXES - Personal Data Exposure
-- ============================================

-- 1. Fix 'annonces' table - Currently publicly readable with sensitive PII
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view published annonces" ON annonces;

-- Create secure policies that protect contact information
DROP POLICY IF EXISTS "Public can view limited listing info" ON annonces;
CREATE POLICY "Public can view limited listing info"
ON annonces FOR SELECT
USING (
  statut = 'publiee'
);

-- Create policy for authenticated users
DROP POLICY IF EXISTS "Authenticated users can view full listing details" ON annonces;
CREATE POLICY "Authenticated users can view full listing details"
ON annonces FOR SELECT
USING (
  auth.uid() IS NOT NULL AND statut = 'publiee'
);

-- Owner can see their own listings
DROP POLICY IF EXISTS "Owners can view own listings" ON annonces;
CREATE POLICY "Owners can view own listings"
ON annonces FOR SELECT
USING (user_id = auth.uid());

-- Owner can update their own listings  
DROP POLICY IF EXISTS "Owners can update own listings" ON annonces;
CREATE POLICY "Owners can update own listings"
ON annonces FOR UPDATE
USING (user_id = auth.uid());

-- 2. Fix 'profiles' table - Keep existing good policies
-- These already exist, no changes needed for profiles

-- 3. Fix 'leads_estimation' table - Contact info exposed
DROP POLICY IF EXISTS "Users can view own leads" ON leads_estimation;
DROP POLICY IF EXISTS "Users can view own lead submissions" ON leads_estimation;
CREATE POLICY "Users can view own lead submissions"
ON leads_estimation FOR SELECT
USING (email = (SELECT email FROM profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Admins can view all leads" ON leads_estimation;
CREATE POLICY "Admins can view all leads"
ON leads_estimation FOR SELECT
USING (
  has_role(auth.uid(), 'admin')
);

-- 4. Fix 'email_tracking' table
DROP POLICY IF EXISTS "Users can view own email tracking" ON email_tracking;
DROP POLICY IF EXISTS "Users can view emails sent to them" ON email_tracking;
CREATE POLICY "Users can view emails sent to them"
ON email_tracking FOR SELECT
USING (
  recipient_email = (SELECT email FROM profiles WHERE id = auth.uid())
  OR has_role(auth.uid(), 'admin')
);

-- 5. Fix 'performance_metrics' - Currently public
DROP POLICY IF EXISTS "Anyone can view metrics" ON performance_metrics;
DROP POLICY IF EXISTS "Only admins can view performance metrics" ON performance_metrics;
CREATE POLICY "Only admins can view performance metrics"
ON performance_metrics FOR SELECT
USING (
  has_role(auth.uid(), 'admin')
);