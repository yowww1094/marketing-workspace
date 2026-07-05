-- Create custom types
CREATE TYPE product_status AS ENUM ('draft', 'processing', 'completed', 'failed');
CREATE TYPE workflow_status AS ENUM ('pending', 'running', 'completed', 'failed');
CREATE TYPE job_status AS ENUM ('pending', 'running', 'completed', 'failed');

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status product_status NOT NULL DEFAULT 'draft',
  
  -- Basic Info
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT,
  features TEXT[] DEFAULT '{}',
  unique_selling_points TEXT[] DEFAULT '{}',
  product_url TEXT,
  
  -- Brand
  brand_name TEXT,
  brand_story TEXT,
  brand_voice TEXT,
  brand_personality TEXT,
  brand_values TEXT[] DEFAULT '{}',
  
  -- Target Audience & Market
  target_audience_age TEXT,
  target_audience_gender TEXT,
  target_audience_interests TEXT[] DEFAULT '{}',
  target_audience_pain_points TEXT[] DEFAULT '{}',
  buying_motivations TEXT[] DEFAULT '{}',
  target_country TEXT,
  target_language TEXT,
  target_currency TEXT,
  
  -- Competitors & Goals
  known_competitors TEXT[] DEFAULT '{}',
  competitor_urls TEXT[] DEFAULT '{}',
  business_goals TEXT[] DEFAULT '{}',
  
  -- AI Outputs
  ai_product_analysis JSONB,
  ai_market_research JSONB,
  ai_competitor_analysis JSONB,
  ai_customer_personas JSONB,
  ai_positioning JSONB,
  ai_value_proposition JSONB,
  ai_marketing_strategy JSONB,
  ai_seo_strategy JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create workflows table
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  status workflow_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- e.g., 'market_research', 'positioning'
  status job_status NOT NULL DEFAULT 'pending',
  dependencies TEXT[] DEFAULT '{}', -- Job types that must complete before this runs
  result JSONB,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_workflows_updated_at
BEFORE UPDATE ON workflows
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER set_jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
