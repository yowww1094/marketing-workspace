-- Update all NVIDIA models to the requested free model that supports text and vision
UPDATE public.ai_job_configs
SET model_name = 'meta/llama-4-maverick-17b-128e-instruct'
WHERE provider = 'nvidia';
