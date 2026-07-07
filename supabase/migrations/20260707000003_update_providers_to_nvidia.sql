-- Update all non-NVIDIA jobs to use NVIDIA NIM models
UPDATE public.ai_job_configs 
SET provider = 'nvidia', 
    model_name = 'meta/llama-3.1-70b-instruct' 
WHERE provider = 'openai';
