-- Create demandes_contact table for secure contact requests
CREATE TABLE public.demandes_contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  annonce_id UUID NOT NULL REFERENCES public.annonces(id) ON DELETE CASCADE,
  email_acheteur TEXT NOT NULL,
  telephone_acheteur TEXT NOT NULL,
  nom_acheteur TEXT NOT NULL,
  message TEXT NOT NULL,
  statut TEXT NOT NULL DEFAULT 'pending' CHECK (statut IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.demandes_contact ENABLE ROW LEVEL SECURITY;

-- Buyers can create contact requests
CREATE POLICY "Buyers can create contact requests"
ON public.demandes_contact
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Buyers can view their own requests
CREATE POLICY "Buyers can view own requests"
ON public.demandes_contact
FOR SELECT
TO authenticated
USING (email_acheteur = auth.email());

-- Sellers can view requests for their listings
CREATE POLICY "Sellers can view requests for their listings"
ON public.demandes_contact
FOR SELECT
TO authenticated
USING (
  annonce_id IN (
    SELECT id FROM public.annonces WHERE user_id = auth.uid()
  )
);

-- Sellers can update status of requests for their listings
CREATE POLICY "Sellers can update requests for their listings"
ON public.demandes_contact
FOR UPDATE
TO authenticated
USING (
  annonce_id IN (
    SELECT id FROM public.annonces WHERE user_id = auth.uid()
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_demandes_contact_updated_at
BEFORE UPDATE ON public.demandes_contact
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();