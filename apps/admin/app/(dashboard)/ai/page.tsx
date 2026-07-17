import { getAIOperationsData } from '@/lib/ai-ops';
import { AIMetricsCards } from './ai-metrics-cards';
import { ModelHealthTable } from './model-health-table';
import { GenerationsTable } from './generations-table';
import { RefreshButton } from '@/components/refresh-button';
import { revalidatePath } from 'next/cache';

import { Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@marketing-workspace/ui/components/ui/button';

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
        <div className="flex items-center space-x-3">
          <Link href="/ai/configure">
            <Button variant="outline" size="sm" className="h-9">
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </Button>
          </Link>
          <form action={refreshData}>
            <RefreshButton />
          </form>
        </div>
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
