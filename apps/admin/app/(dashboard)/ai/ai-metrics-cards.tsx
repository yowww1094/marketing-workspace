import { Card, CardContent, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { Sparkles, DollarSign, Clock, Hash, Calendar, AlertTriangle } from 'lucide-react';

export function AIMetricsCards({ 
  totalGenerations,
  todaysGenerations,
  todaysFailed,
  tokensSpent,
  estimatedCost,
  avgResponseTime,
}: { 
  totalGenerations: number;
  todaysGenerations: number;
  todaysFailed: number;
  tokensSpent: number;
  estimatedCost: number;
  avgResponseTime: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
          <Sparkles className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGenerations.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Platform wide</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Generations</CardTitle>
          <Calendar className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todaysGenerations.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Running & completed</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Failed</CardTitle>
          <AlertTriangle className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todaysFailed.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Errors today</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tokens Spent</CardTitle>
          <Hash className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tokensSpent.toLocaleString()}</div>
          <p className="text-xs text-zinc-500 mt-1">Estimated usage</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estimated Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${estimatedCost.toFixed(2)}</div>
          <p className="text-xs text-zinc-500 mt-1">Paid models only</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          <Clock className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgResponseTime}</div>
          <p className="text-xs text-zinc-500 mt-1">Completed jobs</p>
        </CardContent>
      </Card>
    </div>
  );
}
