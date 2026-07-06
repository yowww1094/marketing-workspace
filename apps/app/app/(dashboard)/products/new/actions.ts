'use server';

import { createClient } from '@marketing-workspace/auth/server';
import { CreateProductSchema, CreateProductInput } from '@marketing-workspace/validation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProductAction(data: CreateProductInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // 1. Verify billing limits
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan_id')
    .eq('user_id', user.id)
    .single();

  const plan = subscription?.plan_id || 'free';

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (plan === 'free' && (count ?? 0) >= 1) {
    throw new Error('Free tier is limited to 1 product. Please upgrade to Pro.');
  }

  if (plan === 'pro' && (count ?? 0) >= 10) {
    throw new Error('Pro tier is limited to 10 products per billing cycle.');
  }

  // 2. Validate input
  const validated = CreateProductSchema.parse(data);

  // 3. Insert product
  const { data: product, error } = await supabase
    .from('products')
    .insert({
      user_id: user.id,
      status: 'processing',
      // Basic Info
      name: validated.name,
      category: validated.category,
      description: validated.description,
      price: validated.price,
      features: validated.features,
      unique_selling_points: validated.unique_selling_points,
      product_url: validated.product_url,
      
      // Brand
      brand_name: validated.brand_name,
      brand_story: validated.brand_story,
      brand_voice: validated.brand_voice,
      brand_personality: validated.brand_personality,
      brand_values: validated.brand_values,
      
      // Target Audience & Market
      target_audience_age: validated.target_audience_age,
      target_audience_gender: validated.target_audience_gender,
      target_audience_interests: validated.target_audience_interests,
      target_audience_pain_points: validated.target_audience_pain_points,
      buying_motivations: validated.buying_motivations,
      target_country: validated.target_country,
      target_language: validated.target_language,
      target_currency: validated.target_currency,
      
      // Competitors & Goals
      known_competitors: validated.known_competitors,
      competitor_urls: validated.competitor_urls,
      business_goals: validated.business_goals,
    })
    .select('id')
    .single();

  if (error || !product) {
    console.error('Failed to insert product:', error);
    throw new Error('Failed to create product');
  }

  // 4. Insert initial workflow
  const { error: wfError } = await supabase
    .from('workflows')
    .insert({
      product_id: product.id,
      status: 'pending',
    });

  if (wfError) {
    console.error('Failed to create workflow:', wfError);
    // Continue anyway or fail? Let's just log it for now.
  }

  revalidatePath('/products');
  return product.id;
}
