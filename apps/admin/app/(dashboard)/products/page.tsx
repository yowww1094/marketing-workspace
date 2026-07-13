import { getPaginatedProducts } from '@/lib/products';
import { ProductsTable } from './products-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

  const { products, total } = await getPaginatedProducts({ page, search });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Products</h1>
        <p className="text-sm text-zinc-500">Monitor all AI-generated products and their owners.</p>
      </div>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader>
          <CardTitle>Platform Products</CardTitle>
          <CardDescription>View all products currently managed inside the workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable 
            products={products} 
            total={total} 
            currentPage={page} 
            searchQuery={search} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
