import { createClient } from '@marketing-workspace/auth/server';
import { notFound, redirect } from 'next/navigation';
import { ProductWorkspaceClient } from './product-workspace-client';

export default async function ProductWorkspacePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch product
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Fetch workflow
  const { data: workflow } = await supabase
    .from('workflows')
    .select('*, jobs(*)')
    .eq('product_id', product.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return <ProductWorkspaceClient product={product} workflow={workflow} />;
}
