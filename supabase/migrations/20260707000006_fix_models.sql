UPDATE public.ai_job_configs
SET model_name = 'meta/llama-3.1-70b-instruct'
WHERE provider = 'nvidia';

UPDATE public.ai_job_configs
SET model_name = 'meta/llama-3.2-90b-vision-instruct'
WHERE provider = 'nvidia' AND job_type = 'image_analysis';
