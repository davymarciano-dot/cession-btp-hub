-- Add NDA acceptance tracking to demandes_contact
ALTER TABLE public.demandes_contact
ADD COLUMN nda_signed BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN nda_signed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN nda_ip_address INET,
ADD COLUMN coordinates_revealed BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN coordinates_revealed_at TIMESTAMP WITH TIME ZONE;

-- Add index for faster queries
CREATE INDEX idx_demandes_contact_annonce_statut ON public.demandes_contact(annonce_id, statut);
CREATE INDEX idx_demandes_contact_email ON public.demandes_contact(email_acheteur);