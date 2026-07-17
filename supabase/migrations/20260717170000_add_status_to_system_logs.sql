-- Add status column to system_logs table
ALTER TABLE public.system_logs ADD COLUMN status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved'));

-- Update existing rows to 'open' if they don't have a status
UPDATE public.system_logs SET status = 'open' WHERE status IS NULL;
