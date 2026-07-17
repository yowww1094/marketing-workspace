import { getPaginatedProducts } from '@/lib/products';
import { ProductsTable } from './products-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';

export default async function ProductsPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const search = searchParams.search || '';

  const { products, total } = await getPaginatedProducts({ page: currentPage, search });

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
