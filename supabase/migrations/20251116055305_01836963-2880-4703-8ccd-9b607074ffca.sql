-- Fix admin authentication by adding proper role-based RLS policies

-- 1. Add admin-only policies for annonces table
CREATE POLICY "Admins can view all annonces"
ON annonces FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all annonces"
ON annonces FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete all annonces"
ON annonces FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. Restrict overly permissive system policies to admin-only

-- Drop existing overly permissive policies and replace with admin-only
DROP POLICY IF EXISTS "System can manage scores" ON user_scores;
CREATE POLICY "Admins can manage user scores"
ON user_scores FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "System can manage automation logs" ON automation_logs;
CREATE POLICY "Admins can manage automation logs"
ON automation_logs FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "System can write chatbot logs" ON chatbot_logs;
CREATE POLICY "Admins can manage chatbot logs"
ON chatbot_logs FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Users can still write their own chatbot logs
CREATE POLICY "Users can create own chatbot logs"
ON chatbot_logs FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "System can manage subscriptions" ON subscriptions;
CREATE POLICY "Admins can manage subscriptions"
ON subscriptions FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Add admin policies for other sensitive tables

-- Cron tracking - admin only
DROP POLICY IF EXISTS "Admin can view cron tracking" ON cron_tracking;
DROP POLICY IF EXISTS "System can manage cron tracking" ON cron_tracking;
CREATE POLICY "Admins can view cron tracking"
ON cron_tracking FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage cron tracking"
ON cron_tracking FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Email campaigns - restrict to admins
DROP POLICY IF EXISTS "System can manage campaigns" ON email_campaigns;
CREATE POLICY "Admins can manage email campaigns"
ON email_campaigns FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Analytics and tracking tables - keep user access but add admin override
CREATE POLICY "Admins can view all cart tracking"
ON cart_tracking FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all conversions"
ON conversion_tracking FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all events"
ON events_tracking FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Add admin policy for profiles to view all users
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
ON profiles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));