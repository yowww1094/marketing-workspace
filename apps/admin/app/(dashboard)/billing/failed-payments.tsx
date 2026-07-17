'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@marketing-workspace/ui/components/ui/table';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { SubscriptionView } from '@/lib/billing';

export function FailedPayments({ failedPayments }: { failedPayments: SubscriptionView[] }) {
  return (
    <Card className="shadow-sm border-zinc-200 w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Recent Failed Payments</CardTitle>
        <CardDescription>Canceled or past due subscriptions</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {failedPayments.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-500">
            No failed payments found.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {failedPayments.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="font-medium text-zinc-900 truncate max-w-[150px]">
                      {sub.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="capitalize text-xs">
                      {sub.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500 text-sm whitespace-nowrap">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
