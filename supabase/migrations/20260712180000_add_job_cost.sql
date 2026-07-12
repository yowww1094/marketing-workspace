-- Add cost column to jobs table to track actual AI inference costs
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS cost NUMERIC DEFAULT 0;
