import { z } from 'zod';

export const CreateProductSchema = z.object({
  // Step 1: Product Info
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  price: z.string().optional(),
  features: z.array(z.string()).default([]),
  unique_selling_points: z.array(z.string()).default([]),
  product_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),

  // Step 2: Images
  // For security and optimization, files are usually handled via FormData or uploaded client-side
  // first. We will track the resulting uploaded file URLs or paths here.
  image_urls: z.array(z.string()).default([]),
  
  // Step 3: Brand
  brand_name: z.string().optional(),
  brand_story: z.string().optional(),
  brand_voice: z.string().optional(),
  brand_personality: z.string().optional(),
  brand_values: z.array(z.string()).default([]),

  // Step 4: Target Audience
  target_audience_age: z.string().optional(),
  target_audience_gender: z.string().optional(),
  target_audience_interests: z.array(z.string()).default([]),
  target_audience_pain_points: z.array(z.string()).default([]),
  buying_motivations: z.array(z.string()).default([]),

  // Step 5: Competitors
  known_competitors: z.array(z.string()).default([]),
  competitor_urls: z.array(z.string().url('Must be a valid URL').or(z.literal(''))).default([]),

  // Step 6: Business Goals
  business_goals: z.array(z.string()).default([]),
  business_goals_text: z.string().optional(),

  // Step 7: Target Market
  target_country: z.string().optional(),
  target_language: z.string().optional(),
  target_currency: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
