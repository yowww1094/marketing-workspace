export type JobType = 
  | 'image_analysis'
  | 'product_extraction'
  | 'market_research'
  | 'competitor_analysis'
  | 'customer_personas'
  | 'positioning'
  | 'marketing_strategy'
  | 'seo_strategy'
  | 'content_generation';

export interface JobDefinition {
  type: JobType;
  name: string;
  dependencies: JobType[];
}

export const WORKFLOW_DAG: JobDefinition[] = [
  { type: 'image_analysis', name: 'Image Analysis', dependencies: [] },
  { type: 'product_extraction', name: 'Product Feature Extraction', dependencies: [] },
  { type: 'market_research', name: 'Market Research', dependencies: ['product_extraction'] },
  { type: 'competitor_analysis', name: 'Competitor Analysis', dependencies: ['market_research'] },
  { type: 'customer_personas', name: 'Customer Personas', dependencies: ['market_research'] },
  { type: 'positioning', name: 'Positioning & Value Proposition', dependencies: ['competitor_analysis', 'customer_personas'] },
  { type: 'marketing_strategy', name: 'Marketing Strategy', dependencies: ['positioning'] },
  { type: 'seo_strategy', name: 'SEO Strategy', dependencies: ['marketing_strategy'] },
  { type: 'content_generation', name: 'Content Generation', dependencies: ['marketing_strategy', 'seo_strategy'] },
];
