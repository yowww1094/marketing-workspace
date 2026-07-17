import { Card, CardContent, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { Box, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { AIConfigMetrics } from '@/lib/ai-config';

export function ConfigMetrics({ metrics }: { metrics: AIConfigMetrics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Models</CardTitle>
          <Box className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeModelsCount}</div>
          <p className="text-xs text-zinc-500 mt-1">Unique active AI models</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Platform Latency</CardTitle>
          <Clock className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.avgLatency}</div>
          <p className="text-xs text-zinc-500 mt-1">Across all jobs</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overall Success Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.avgSuccessRate}</div>
          <p className="text-xs text-zinc-500 mt-1">Healthy executions</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Spend</CardTitle>
          <DollarSign className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(metrics as any).totalCost?.toFixed(2) || '0.00'}</div>
          <p className="text-xs text-zinc-500 mt-1">Estimated total cost</p>
        </CardContent>
      </Card>
    </div>
  );
}
