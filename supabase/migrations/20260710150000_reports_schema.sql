-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL DEFAULT 0,
    storage_path TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for reports table
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reports"
ON public.reports FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports"
ON public.reports FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reports"
ON public.reports FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Insert reports bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('reports', 'reports', false)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage.objects (reports bucket)
CREATE POLICY "Users can view their own reports files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'reports' AND auth.uid() = owner);

CREATE POLICY "Users can upload their own reports files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'reports' AND auth.uid() = owner);

CREATE POLICY "Users can update their own reports files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'reports' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'reports' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own reports files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'reports' AND auth.uid() = owner);
