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
      status: 'draft',
      // Basic Info
      name: validated.name,
      category: validated.category,
      description: validated.description,
      price: validated.price,
      features: validated.features,
      unique_selling_points: validated.unique_selling_points,
      product_url: validated.product_url,
      image_urls: validated.image_urls,
      
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
      business_goals: [
        ...validated.business_goals,
        ...(validated.business_goals_text 
              ? validated.business_goals_text.split('\n').map(l => l.trim()).filter(Boolean) 
              : [])
      ],
    })
    .select('id')
    .single();

  if (error || !product) {
    console.error('Failed to insert product:', error);
    throw new Error('Failed to create product');
  }

  revalidatePath('/products');
  return product.id;
}

export async function updateProductAction(productId: string, data: CreateProductInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // 1. Verify product ownership and status
  const { data: existingProduct, error: fetchError } = await supabase
    .from('products')
    .select('id, status')
    .eq('id', productId)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !existingProduct) {
    throw new Error('Product not found or unauthorized');
  }

  if (existingProduct.status !== 'draft') {
    throw new Error('Only draft products can be edited');
  }

  // 2. Validate input
  const validated = CreateProductSchema.parse(data);

  // 3. Update product
  const { error: updateError } = await supabase
    .from('products')
    .update({
      // Basic Info
      name: validated.name,
      category: validated.category,
      description: validated.description,
      price: validated.price,
      features: validated.features,
      unique_selling_points: validated.unique_selling_points,
      product_url: validated.product_url,
      image_urls: validated.image_urls,
      
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
      business_goals: [
        ...validated.business_goals,
        ...(validated.business_goals_text 
              ? validated.business_goals_text.split('\n').map(l => l.trim()).filter(Boolean) 
              : [])
      ],
      
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)
    .eq('user_id', user.id)
    .eq('status', 'draft');

  if (updateError) {
    console.error('Failed to update product:', updateError);
    throw new Error('Failed to update product');
  }

  revalidatePath('/products');
  revalidatePath(`/products/${productId}`);
  return productId;
}
