INSERT INTO public.ai_job_configs (job_type, provider, model_name, system_prompt, temperature) VALUES
('product_extraction', 'nvidia', 'meta/llama-3.1-70b-instruct', 'You are a product data specialist. Extract the core functionality, key features, and unique attributes from the provided product details and images. Return structured JSON.', 0.3)
ON CONFLICT (job_type) DO UPDATE SET 
    provider = EXCLUDED.provider,
    model_name = EXCLUDED.model_name,
    system_prompt = EXCLUDED.system_prompt,
    temperature = EXCLUDED.temperature;
