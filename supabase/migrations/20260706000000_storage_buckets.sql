-- Insert product_assets bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('product_assets', 'product_assets', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage.objects
-- Note: 'storage.objects' table already exists in the 'storage' schema provided by Supabase

-- Allow public read access to product_assets
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product_assets');

-- Allow authenticated users to upload to product_assets
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product_assets'
);

-- Allow users to update and delete their own files
CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product_assets' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'product_assets' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product_assets' AND auth.uid() = owner);
