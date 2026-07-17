import { getBillingMetrics, getPaginatedSubscriptions } from '@/lib/billing';
import { BillingMetricsCards } from './billing-metrics-cards';
import { SubscriptionsTable } from './subscriptions-table';
import { RefreshButton } from '@/components/refresh-button';
import { revalidatePath } from 'next/cache';

import { MRRChart } from './mrr-chart';
import { FailedPayments } from './failed-payments';

export default async function BillingPage(props: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const search = searchParams.search || '';

  const metrics = await getBillingMetrics();
  const { subscriptions, totalPages } = await getPaginatedSubscriptions({ page: currentPage, search });

  async function refreshData() {
    'use server';
    revalidatePath('/billing', 'page');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Billing & Subscriptions</h1>
          <p className="text-sm text-zinc-500">Monitor platform revenue, plans, and customer subscriptions.</p>
        </div>
        <form action={refreshData}>
          <RefreshButton />
        </form>
      </div>

      <BillingMetricsCards metrics={metrics} />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <MRRChart data={metrics.chartData} />
        </div>
        <div className="col-span-1">
          <FailedPayments failedPayments={metrics.failedPayments} />
        </div>
      </div>

      <div className="mt-8">
        <SubscriptionsTable 
          subscriptions={subscriptions}
          currentPage={currentPage}
          totalPages={totalPages}
          initialSearch={search}
        />
      </div>
    </div>
  );
}
