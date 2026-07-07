import { createClient } from '@marketing-workspace/auth/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Plus, Package, Search, LayoutGrid, List, ExternalLink, MoreVertical } from 'lucide-react';
import { SearchInput } from './search-input';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage(props: Props) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === 'string' ? searchParams.q : '';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let query = supabase
    .from('products')
    .select('*, workflows(*, jobs(status))')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (q) {
    query = query.or(`name.ilike.%${q}%,category.ilike.%${q}%,description.ilike.%${q}%`);
  }

  const { data: products } = await query;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-[#f0fdf4] text-[#008236] border-[#b9f8cf]">Complete</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-zinc-100 text-muted-foreground border-zinc-200">Draft</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Failed</Badge>;
      case 'processing':
      default:
        return <Badge variant="outline" className="bg-[#eef2ff] text-[#5b5bd6] border-[#e0e7ff]">Active</Badge>;
    }
  };

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Products</h1>
          <p className="text-sm text-muted-foreground">
            {products?.length || 0} total products
          </p>
        </div>
        <Button asChild className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white shadow-sm gap-2 rounded-lg h-9 px-4">
          <Link href="/products/new" className='flex flex-row items-center justify-center'>
            <Plus className="h-4 w-4" />
            New Product
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 py-2">
        <SearchInput />
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#e2e2ea] rounded-lg p-0.5 bg-white">
            <Button variant="ghost" size="icon" className="flex flex-row items-center justify-center h-8 w-8 rounded-md bg-[#f1f1f5] text-zinc-950">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="flex flex-row items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-zinc-950">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="flex flex-col border border-[#e2e2ea] bg-[#f8f8fb] rounded-xl overflow-hidden h-[300px]">
            {/* Card Content Area */}
            <div className="flex flex-col bg-white p-5 flex-1">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5b5bd6]/10 text-[#5b5bd6]">
                  <Package className="h-5 w-5" />
                </div>
                <Button variant="ghost" size="icon" className="flex items-center justify-center h-8 w-8 text-muted-foreground hover:bg-zinc-100 rounded-md -mt-1 -mr-2">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Details */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-zinc-950 leading-tight mb-1 truncate">{product.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{product.category || 'Uncategorized'}</p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                {(() => {
                  const workflow = product.workflows?.[0];
                  
                  if (!workflow) {
                    return (
                      <div className="text-[11px] text-muted-foreground mt-4 mb-2 italic">
                        Strategy not started yet
                      </div>
                    );
                  }

                  const totalJobs = workflow.jobs?.length || 0;
                  const completedJobs = workflow.jobs?.filter((j: any) => j.status === 'completed').length || 0;
                  const progressPercent = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0;

                  return (
                    <>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
                        <span>Progress</span>
                        <span>{completedJobs}/{totalJobs} modules</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#f1f1f5] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#5b5bd6] rounded-full transition-all duration-500 ease-in-out" 
                          style={{ width: `${progressPercent}%` }} 
                        />
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between mt-auto pt-1">
                {getStatusBadge(product.status)}
                <span className="text-[10px] text-muted-foreground">{timeAgo(product.updated_at)}</span>
              </div>
            </div>

            {/* Card Actions Area */}
            <div className="flex gap-2 p-4 bg-[#f8f8fb] border-t border-[#e2e2ea]">
              <Button asChild variant="outline" className="flex-1 bg-[#5b5bd6] border-[#e2e2ea] hover:bg-[#4a4ac0] text-xs h-8 shadow-sm text-white hover:text-white font-medium">
                <Link href={`/products/${product.id}`} className='flex items-center justify-center'>
                  Open Workspace
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon" className=" flex items-center justify-center h-8 w-8 bg-white border-[#e2e2ea] hover:bg-zinc-50 text-muted-foreground shadow-sm">
                <Link href={`/products/${product.id}`} target='_blank'>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-[#e2e2ea] rounded-xl bg-white shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 mb-4">
              <Package className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-950 mb-1">No products found</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              You haven't created any products yet. Get started by clicking the "New Product" button above.
            </p>
            <Button asChild className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white shadow-sm gap-2 rounded-lg mt-4 px-6">
              <Link href="/products/new">
                <Plus className="h-4 w-4" />
                New Product
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
