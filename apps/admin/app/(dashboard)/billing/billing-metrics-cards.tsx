import { Card, CardContent, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { DollarSign, ShieldCheck, UserX, Users } from 'lucide-react';
import { BillingMetrics } from '@/lib/billing';

export function BillingMetricsCards({ metrics }: { metrics: BillingMetrics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total MRR</CardTitle>
          <DollarSign className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.totalMRR.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Monthly Recurring Revenue</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Pro Plans</CardTitle>
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activePro.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Paying customers</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Free Tier</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.freeUsers.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Users on free plan</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Churn / Past Due</CardTitle>
          <UserX className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.churn.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Canceled or failed payments</p>
        </CardContent>
      </Card>
    </div>
  );
}
