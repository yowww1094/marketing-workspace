import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Plus, TrendingUp, Package } from 'lucide-react';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { createClient } from '@marketing-workspace/auth/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  const activeProductsCount = products?.length || 0;
  const reportsGeneratedCount = products?.filter(p => p.status === 'completed').length || 0;
  
  // Abstract KPIs for Phase 1
  const aiInsightsCount = (reportsGeneratedCount * 15) + (activeProductsCount * 3);
  const hoursSavedCount = (reportsGeneratedCount * 10) + (activeProductsCount * 2);

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

  const firstName = user.user_metadata?.first_name || 'there';

  return (
    <div className="w-full max-w-[1106px] mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            Good morning, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's what's happening across your workspace.
          </p>
        </div>
        <Button asChild className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white shadow-sm gap-2 rounded-lg">
          <Link href="/products/new">
            <Plus className="h-4 w-4" />
            New Product
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Active Products</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-950">{activeProductsCount}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            <p className="text-xs font-medium text-emerald-600">Total</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Reports Generated</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-950">{reportsGeneratedCount}</p>
          <p className="text-xs text-muted-foreground">Completed products</p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            <p className="text-xs font-medium text-emerald-600">All time</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">AI Insights</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-950">{aiInsightsCount}</p>
          <p className="text-xs text-muted-foreground">Generated points</p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            <p className="text-xs font-medium text-emerald-600">Active metrics</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Hours Saved</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-950">{hoursSavedCount}h</p>
          <p className="text-xs text-muted-foreground">Estimated time saved</p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            <p className="text-xs font-medium text-emerald-600">By using AI</p>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Products */}
        <div className="col-span-2 rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-zinc-950">Recent Products</h2>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground font-medium">
              View all &rarr;
            </Button>
          </div>
          
          {products && products.length > 0 ? (
            <div className="divide-y divide-zinc-200">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5b5bd6]/10 text-[#5b5bd6]">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-950">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category || 'Uncategorized'} &middot; Updated {timeAgo(product.updated_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end gap-1">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100">
                        <div 
                          className="h-full w-full bg-[#5b5bd6]" 
                          style={{ width: product.status === 'completed' ? '100%' : product.status === 'draft' ? '20%' : '50%' }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {product.status === 'completed' ? '13/13 modules' : product.status === 'draft' ? 'Draft' : 'Processing...'}
                      </span>
                    </div>
                    {getStatusBadge(product.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 mb-4">
                <Package className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-950 mb-1">No products yet</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Create your first product to start generating your AI marketing workspace and content.
              </p>
              <Button className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Product
              </Button>
            </div>
          )}
        </div>

        {/* This Week / Chart Area Placeholder */}
        <div className="col-span-1 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col">
          <h2 className="text-sm font-semibold text-zinc-950 mb-4">This Week</h2>
          <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
            <TrendingUp className="h-8 w-8 text-zinc-300 mb-2" />
            <p className="text-xs text-muted-foreground">Activity Chart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
