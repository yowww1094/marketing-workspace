import { z } from 'zod';

// image_analysis
export const ImageAnalysisSchema = z.object({
  features: z.array(z.string()).describe('Key features or visual elements extracted from the product images'),
  aesthetics: z.string().describe('Description of the visual style, tone, and aesthetic'),
  target_demographic_hints: z.array(z.string()).describe('Hints about the target audience based purely on the visual design'),
  packaging_details: z.string().optional().describe('Details about the product packaging if visible')
});

// product_extraction
export const ProductExtractionSchema = z.object({
  extracted_features: z.array(z.string()),
  core_functionality: z.string(),
  unique_attributes: z.array(z.string())
});

// market_research
export const MarketResearchSchema = z.object({
  market_size: z.string().describe('Estimated market size or growth potential'),
  current_trends: z.array(z.string()).describe('Top current trends in this specific market'),
  target_demographics: z.array(z.object({
    group: z.string(),
    description: z.string()
  })),
  market_gaps: z.array(z.string()).describe('Opportunities or gaps in the current market')
});

// competitor_analysis
export const CompetitorAnalysisSchema = z.object({
  competitors: z.array(z.object({
    name: z.string(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    differentiation: z.string()
  })),
  industry_standard_features: z.array(z.string()),
  our_unique_advantages: z.array(z.string())
});

// personas
export const PersonasSchema = z.object({
  personas: z.array(z.object({
    name: z.string(),
    age_range: z.string(),
    occupation: z.string(),
    pain_points: z.array(z.string()),
    goals: z.array(z.string()),
    buying_triggers: z.array(z.string())
  }))
});

// positioning
export const PositioningSchema = z.object({
  positioning_statement: z.string(),
  value_proposition: z.string(),
  brand_voice: z.string(),
  core_messaging_pillars: z.array(z.object({
    pillar: z.string(),
    description: z.string()
  }))
});

// strategy
export const StrategySchema = z.object({
  recommended_channels: z.array(z.object({
    channel: z.string(),
    rationale: z.string()
  })),
  campaign_ideas: z.array(z.object({
    name: z.string(),
    concept: z.string()
  })),
  kpis: z.array(z.string())
});

// seo
export const SeoSchema = z.object({
  primary_keywords: z.array(z.string()),
  secondary_keywords: z.array(z.string()),
  content_gaps: z.array(z.string()),
  recommended_meta_title: z.string(),
  recommended_meta_description: z.string()
});

// content
export const ContentSchema = z.object({
  landing_page_hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    cta: z.string()
  }),
  email_sequence_ideas: z.array(z.object({
    day: z.number(),
    subject_line: z.string(),
    content_summary: z.string()
  })),
  ad_copy_variations: z.array(z.object({
    platform: z.string(),
    primary_text: z.string(),
    headline: z.string()
  }))
});

// report_generation
export const ReportGenerationSchema = z.object({
  executive_summary: z.string(),
  key_findings: z.array(z.string()),
  next_steps: z.array(z.string())
});

// Map of job_type to its corresponding Zod schema
export const JobSchemas: Record<string, z.ZodType<any>> = {
  image_analysis: ImageAnalysisSchema,
  product_extraction: ProductExtractionSchema,
  market_research: MarketResearchSchema,
  competitor_analysis: CompetitorAnalysisSchema,
  customer_personas: PersonasSchema,
  positioning: PositioningSchema,
  marketing_strategy: StrategySchema,
  seo_strategy: SeoSchema,
  content_generation: ContentSchema,
  report_generation: ReportGenerationSchema
};
