import { createClient } from '@marketing-workspace/auth/server';
import { notFound, redirect } from 'next/navigation';
import { ProductHeader } from './product-header';
import { ProductDetailsView } from './product-details-view';
import { WorkspaceModules } from './workspace-modules';

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

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f8f8fb] pt-[88px] pb-[32px] px-[32px]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6">
        <ProductHeader product={product} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <ProductDetailsView product={product} />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <WorkspaceModules product={product} workflow={workflow} />
          </div>
        </div>
      </div>
    </div>
  );
}
