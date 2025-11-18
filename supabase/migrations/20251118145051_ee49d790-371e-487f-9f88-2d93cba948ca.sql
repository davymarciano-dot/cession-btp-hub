-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all annonces" ON public.annonces;
DROP POLICY IF EXISTS "Admins can update all annonces" ON public.annonces;
DROP POLICY IF EXISTS "Admins can delete all annonces" ON public.annonces;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Add admin policies to annonces table
CREATE POLICY "Admins can view all annonces"
ON public.annonces
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all annonces"
ON public.annonces
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete all annonces"
ON public.annonces
FOR DELETE
USING (has_role(auth.uid(), 'admin'));