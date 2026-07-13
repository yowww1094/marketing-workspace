import { AdminKpi } from '@/components/admin-kpi';
import { UserGrowthChart } from '@/components/charts/user-growth-chart';
import { AIGenerationsChart } from '@/components/charts/ai-generations-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@marketing-workspace/ui/components/ui/card';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { 
  Users, Activity, FolderGit2, Sparkles, 
  CheckCircle2, XCircle, DollarSign, Package, 
  Clock, ListTree, Database, RefreshCw 
} from 'lucide-react';
import { getDashboardMetrics, getSystemHealth } from '@/lib/metrics';
import { revalidatePath } from 'next/cache';
import { RefreshButton } from '@/components/refresh-button';

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();
  const health = await getSystemHealth();

  const healthServices = [
    { name: 'Database (Supabase)', ...health.database },
    { name: 'Cache (Redis)', ...health.cache },
    { name: 'Stripe API', ...health.stripe },
    { name: 'AI Orchestrator', ...health.aiOrchestrator },
  ];

  async function refreshData() {
    'use server';
    revalidatePath('/', 'layout');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Operations Dashboard</h1>
          <p className="text-sm text-zinc-500">Platform metrics and system health overview.</p>
        </div>
        <form action={refreshData}>
          <RefreshButton />
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {/* Row 1: Business & Usage */}
        <AdminKpi
          title="Total Users"
          value={metrics.totalUsers.toLocaleString()}
          icon={<Users />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Pro Subscribers"
          value={metrics.proSubscribers.toLocaleString()}
          icon={<DollarSign />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="MRR"
          value={`$${metrics.mrr.toLocaleString()}`}
          icon={<Activity />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Total Products"
          value={metrics.totalProducts.toLocaleString()}
          icon={<Package />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Products (30d)"
          value={metrics.products30d.toLocaleString()}
          icon={<FolderGit2 />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Active Workflows"
          value={metrics.activeWorkflows.toLocaleString()}
          icon={<RefreshCw />}
          trend={{ value: "Live", isPositive: true }}
        />

        {/* Row 2: AI & Performance */}
        <AdminKpi
          title="Total AI Jobs"
          value={metrics.totalJobs.toLocaleString()}
          icon={<Sparkles />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Job Success Rate"
          value={metrics.successRate}
          icon={<CheckCircle2 />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Failed Jobs"
          value={metrics.failedJobs.toLocaleString()}
          icon={<XCircle />}
          trend={{ value: "Live", isPositive: false }}
        />
        <AdminKpi
          title="Avg Processing"
          value={metrics.avgProcessingStr}
          icon={<Clock />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Queue Depth"
          value={metrics.queueDepth.toLocaleString()}
          icon={<ListTree />}
          trend={{ value: "Live", isPositive: true }}
        />
        <AdminKpi
          title="Est. AI Cost"
          value={`$${metrics.totalCost.toFixed(2)}`}
          icon={<Database />}
          trend={{ value: "Live", isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Status of core services and external APIs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthServices.map((service) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'Operational': return 'bg-emerald-500';
                    case 'Degraded': return 'bg-yellow-500';
                    case 'Offline': return 'bg-red-500';
                    default: return 'bg-zinc-300'; // Not Configured
                  }
                };
                
                const getBadgeColor = (status: string) => {
                  switch (status) {
                    case 'Operational': return 'text-emerald-600 bg-emerald-50';
                    case 'Degraded': return 'text-yellow-600 bg-yellow-50';
                    case 'Offline': return 'text-red-600 bg-red-50';
                    default: return 'text-zinc-600 bg-zinc-100'; // Not Configured
                  }
                };

                return (
                  <div key={service.name} className="flex items-center justify-between border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(service.status)}`} />
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span>{service.latency}</span>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getBadgeColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${activity.error ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  <div className="space-y-1 text-sm">
                    <p className={activity.error ? 'text-red-600 font-medium' : 'text-zinc-700'}>{activity.message}</p>
                    <p className="text-xs text-zinc-400">{activity.time}</p>
                  </div>
                </div>
              ))}
              {metrics.recentActivity.length === 0 && (
                <p className="text-sm text-zinc-500 text-center py-4">No recent activity.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly active users over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <UserGrowthChart data={metrics.userGrowthData} />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>AI Generations</CardTitle>
            <CardDescription>Success vs Failed tasks over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <AIGenerationsChart data={metrics.aiGenerationsData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
