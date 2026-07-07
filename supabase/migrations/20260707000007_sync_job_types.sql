-- Update ai_job_configs job_types to match WORKFLOW_DAG

UPDATE public.ai_job_configs SET job_type = 'customer_personas' WHERE job_type = 'personas';
UPDATE public.ai_job_configs SET job_type = 'marketing_strategy' WHERE job_type = 'strategy';
UPDATE public.ai_job_configs SET job_type = 'seo_strategy' WHERE job_type = 'seo';
UPDATE public.ai_job_configs SET job_type = 'content_generation' WHERE job_type = 'content';
