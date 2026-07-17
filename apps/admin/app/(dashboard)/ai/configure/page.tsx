import { getAIConfigs } from '@/lib/ai-config';
import { ConfigMetrics } from './config-metrics';
import { ConfigTable } from './config-table';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function AIConfigurationPage() {
  const { configs, metrics } = await getAIConfigs();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/ai">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4 text-zinc-500" />
            <span className="sr-only">Back to AI Operations</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">AI Configuration</h1>
          <p className="text-sm text-zinc-500">Manage AI models, providers, and system prompts per job type.</p>
        </div>
      </div>

      <ConfigMetrics metrics={metrics} />

      <div className="mt-8">
        <ConfigTable configs={configs} />
      </div>
    </div>
  );
}
