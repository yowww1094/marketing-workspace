import { createClient } from '@marketing-workspace/auth/server';
import { redirect } from 'next/navigation';
import { WizardClient } from '../../new/wizard-client';
import { CreateProductInput } from '@marketing-workspace/validation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .eq('user_id', user.id)
    .single();

  if (error || !product) {
    redirect('/products');
  }

  if (product.status !== 'draft') {
    // Only draft products can be edited
    redirect(`/products/${productId}`);
  }

  // Map the database product row to the form's initial data
  const initialData: Partial<CreateProductInput> = {
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price || '',
    features: product.features || [],
    unique_selling_points: product.unique_selling_points || [],
    product_url: product.product_url || '',
    image_urls: product.image_urls || [],
    
    brand_name: product.brand_name || '',
    brand_story: product.brand_story || '',
    brand_voice: product.brand_voice || '',
    brand_personality: product.brand_personality || '',
    brand_values: product.brand_values || [],
    
    target_audience_age: product.target_audience_age || '',
    target_audience_gender: product.target_audience_gender || '',
    target_audience_interests: product.target_audience_interests || [],
    target_audience_pain_points: product.target_audience_pain_points || [],
    buying_motivations: product.buying_motivations || [],
    
    target_country: product.target_country || '',
    target_language: product.target_language || '',
    target_currency: product.target_currency || '',
    
    known_competitors: product.known_competitors || [],
    competitor_urls: product.competitor_urls || [],
    business_goals: product.business_goals || [],
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center bg-white h-screen overflow-y-auto">
      <div className="w-full h-[64px] border-b border-[#e2e2ea] bg-white sticky top-0 z-50 flex items-center px-6">
        <h1 className="text-[16px] font-semibold text-[#0c0c0e]">Edit Draft Product</h1>
      </div>
      <WizardClient userId={user.id} productId={productId} initialData={initialData} />
    </div>
  );
}
