'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@marketing-workspace/ui/components/ui/card';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@marketing-workspace/ui/components/ui/table';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { SubscriptionView } from '@/lib/billing';

export function SubscriptionsTable({ 
  subscriptions, 
  currentPage, 
  totalPages,
  initialSearch 
}: { 
  subscriptions: SubscriptionView[];
  currentPage: number;
  totalPages: number;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Debounced search
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (searchTerm === currentSearch) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('search', searchTerm);
        params.set('page', '1'); // Reset to page 1 on new search
      } else {
        params.delete('search');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Card className="shadow-sm border-zinc-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Subscriptions</CardTitle>
            <CardDescription>View all customer subscriptions and statuses.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search by email..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-zinc-200 bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50">
                <TableHead>Customer Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stripe ID</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Period Ends</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-zinc-500">
                    No subscriptions found.
                  </TableCell>
                </TableRow>
              ) : (
                subscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div className="font-medium text-zinc-900">{sub.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`uppercase text-xs ${sub.plan_id === 'pro' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : ''}`}>
                        {sub.plan_id}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className={
                        sub.status === 'active' ? 'bg-emerald-500' :
                        sub.status === 'past_due' ? 'bg-amber-500' : 'bg-red-500'
                      }>
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-mono text-zinc-500">
                        {sub.stripe_subscription_id || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-zinc-500 text-sm">
                      {sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="text-sm text-zinc-500 font-medium px-2">
              Page {currentPage} of {totalPages}
            </div>
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
        )}
      </CardContent>
    </Card>
  );
}
