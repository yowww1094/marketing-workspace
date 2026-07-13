'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@marketing-workspace/ui/components/ui/table';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminProductView } from '@/lib/products';

interface ProductsTableProps {
  products: AdminProductView[];
  total: number;
  currentPage: number;
  searchQuery: string;
}

export function ProductsTable({ products, total, currentPage, searchQuery }: ProductsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);
  
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Only push if the search actually changed to avoid initial mount push
      if (search !== searchQuery) {
        router.push(`/products?q=${encodeURIComponent(search)}&page=1`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, searchQuery]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`/products?q=${encodeURIComponent(searchQuery)}&page=${newPage}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>;
      default:
        return <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 capitalize">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search by product name..." 
            className="pl-9 bg-zinc-50/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-zinc-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-zinc-900">{product.name}</TableCell>
                  <TableCell className="text-zinc-500">{product.category}</TableCell>
                  <TableCell className="text-zinc-500">{product.owner_email}</TableCell>
                  <TableCell className="text-zinc-500">
                    {new Date(product.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing <span className="font-medium">{((currentPage - 1) * perPage) + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * perPage, total)}</span> of{' '}
            <span className="font-medium">{total}</span> products
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
