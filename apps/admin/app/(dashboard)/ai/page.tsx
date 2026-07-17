import { getAIOperationsData } from '@/lib/ai-ops';
import { AIMetricsCards } from './ai-metrics-cards';
import { ModelHealthTable } from './model-health-table';
import { GenerationsTable } from './generations-table';
import { RefreshButton } from '@/components/refresh-button';
import { revalidatePath } from 'next/cache';

export default async function AIOperationsPage() {
  const data = await getAIOperationsData();

  async function refreshData() {
    'use server';
    revalidatePath('/ai', 'page');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">AI Operations</h1>
          <p className="text-sm text-zinc-500">Monitor model health, api costs, and generation jobs.</p>
        </div>
        <form action={refreshData}>
          <RefreshButton />
        </form>
      </div>

      <AIMetricsCards 
        totalGenerations={data.totalGenerations} 
        todaysGenerations={data.todaysGenerations}
        todaysFailed={data.todaysFailed}
        tokensSpent={data.tokensSpent}
        estimatedCost={data.estimatedCost}
        avgResponseTime={data.avgResponseTimeStr} 
      />

      <div className="space-y-6">
        <ModelHealthTable models={data.modelHealth} />
        <GenerationsTable 
          activeGenerations={data.activeGenerations} 
          failedGenerations={data.failedGenerations} 
        />
      </div>
    </div>
  );
}
