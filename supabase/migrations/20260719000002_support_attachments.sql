-- Add image_urls to support_tickets
ALTER TABLE public.support_tickets
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

-- Create support_assets bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('support_assets', 'support_assets', false)
ON CONFLICT (id) DO NOTHING;

-- RLS for support_assets
CREATE POLICY "Users can upload their own support assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'support_assets' AND auth.uid() = owner);

CREATE POLICY "Users can view their own support assets"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'support_assets' AND auth.uid() = owner);

CREATE POLICY "Admins can view all support assets"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'support_assets' AND auth.jwt() ->> 'role' = 'admin');
