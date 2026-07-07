-- Migration: Create ai_job_configs table and seed it

CREATE TABLE IF NOT EXISTS public.ai_job_configs (
    job_type text PRIMARY KEY,
    provider text NOT NULL,
    model_name text NOT NULL,
    system_prompt text NOT NULL,
    temperature numeric NOT NULL DEFAULT 0.7,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS: Only authenticated users can read. (Admins will edit via direct DB access for now).
ALTER TABLE public.ai_job_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read ai_job_configs" 
ON public.ai_job_configs 
FOR SELECT 
TO authenticated 
USING (true);

CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

-- Trigger for updated_at
CREATE TRIGGER handle_updated_at_ai_job_configs
    BEFORE UPDATE ON public.ai_job_configs
    FOR EACH ROW
    EXECUTE PROCEDURE extensions.moddatetime(updated_at);

-- Initial Seeding
INSERT INTO public.ai_job_configs (job_type, provider, model_name, system_prompt, temperature) VALUES
('image_analysis', 'nvidia', 'meta/llama-3.2-90b-vision-instruct', 'You are an expert product analyst. Extract features, brand tone, aesthetics, and target demographics from the provided product images. Return your analysis as structured JSON.', 0.2),
('market_research', 'openai', 'gpt-4o', 'You are a market researcher. Analyze the product details to identify market trends, size, demographics, and competitive landscape. Return structured JSON.', 0.5),
('competitor_analysis', 'openai', 'gpt-4o', 'You are a competitive analyst. Compare this product against its competitors and identify strengths, weaknesses, opportunities, and unique selling propositions. Return structured JSON.', 0.5),
('personas', 'nvidia', 'meta/llama-3.1-70b-instruct', 'You are an expert consumer psychologist. Create 3 detailed buyer personas for this product based on the market research and competitor analysis. Return structured JSON.', 0.7),
('positioning', 'nvidia', 'meta/llama-3.1-70b-instruct', 'You are a brand strategist. Develop a positioning statement, value proposition, and brand messaging pillars. Return structured JSON.', 0.7),
('strategy', 'nvidia', 'meta/llama-3.1-70b-instruct', 'You are a Chief Marketing Officer. Develop a comprehensive go-to-market strategy, identifying channels, tactics, and KPIs. Return structured JSON.', 0.7),
('seo', 'nvidia', 'meta/llama-3.1-70b-instruct', 'You are an SEO specialist. Generate targeted keywords, meta tags, content gaps, and search intent strategies. Return structured JSON.', 0.5),
('content', 'nvidia', 'meta/llama-3.1-70b-instruct', 'You are a master copywriter. Generate high-converting landing page copy, email sequences, and ad creatives. Return structured JSON.', 0.8),
('report_generation', 'nvidia', 'meta/llama-3.1-70b-instruct', 'You are an executive summary writer. Compile all previous findings into a final cohesive marketing report. Return structured JSON.', 0.5)
ON CONFLICT (job_type) DO UPDATE SET 
    provider = EXCLUDED.provider,
    model_name = EXCLUDED.model_name,
    system_prompt = EXCLUDED.system_prompt,
    temperature = EXCLUDED.temperature;
