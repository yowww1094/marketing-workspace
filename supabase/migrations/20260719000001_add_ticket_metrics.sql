-- Add columns for metrics
ALTER TABLE public.support_tickets
ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS csat_score INTEGER CHECK (csat_score >= 1 AND csat_score <= 5);

-- Update the existing resolved tickets to have resolved_at = updated_at (if status = resolved)
UPDATE public.support_tickets
SET resolved_at = updated_at
WHERE status = 'resolved' AND resolved_at IS NULL;
