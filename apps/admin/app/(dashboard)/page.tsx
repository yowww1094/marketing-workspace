import { AdminKpi } from '@/components/admin-kpi';
import { UserGrowthChart } from '@/components/charts/user-growth-chart';
import { AIGenerationsChart } from '@/components/charts/ai-generations-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@marketing-workspace/ui/components/ui/card';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { 
  Users, Activity, FolderGit2, Sparkles, 
  CheckCircle2, XCircle, DollarSign, Terminal, 
  Clock, ListTree, Database, RefreshCw 
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Operations Dashboard</h1>
          <p className="text-sm text-zinc-500">Platform metrics and system health overview.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-white">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminKpi
          title="Total Users"
          value="12,493"
          icon={<Users />}
          trend={{ value: "1,234", isPositive: true }}
        />
        <AdminKpi
          title="Active Today"
          value="2,834"
          icon={<Activity />}
          trend={{ value: "12%", isPositive: true, label: "vs yesterday" }}
        />
        <AdminKpi
          title="Projects Created"
          value="45,231"
          icon={<FolderGit2 />}
          trend={{ value: "3,400", isPositive: true }}
        />
        <AdminKpi
          title="MRR"
          value="$124,500"
          icon={<DollarSign />}
          trend={{ value: "$12,400", isPositive: true }}
        />
        
        <AdminKpi
          title="AI Generations"
          value="1.2M"
          icon={<Sparkles />}
          trend={{ value: "150k", isPositive: true }}
        />
        <AdminKpi
          title="Success Rate"
          value="99.8%"
          icon={<CheckCircle2 />}
          trend={{ value: "0.1%", isPositive: true }}
        />
        <AdminKpi
          title="Failed Gens"
          value="2,401"
          icon={<XCircle />}
          trend={{ value: "120", isPositive: false }}
        />
        <AdminKpi
          title="Est. AI Cost"
          value="$4,250"
          icon={<Database />}
          trend={{ value: "$450", isPositive: false }}
        />

        <AdminKpi
          title="API Calls"
          value="8.4M"
          icon={<Terminal />}
          trend={{ value: "1.2M", isPositive: true }}
        />
        <AdminKpi
          title="Avg Response"
          value="240ms"
          icon={<Clock />}
          trend={{ value: "12ms", isPositive: true }}
        />
        <AdminKpi
          title="Queue Depth"
          value="12"
          icon={<ListTree />}
          trend={{ value: "4", isPositive: false, label: "vs 1 hour ago" }}
        />
        <AdminKpi
          title="Token Usage"
          value="4.2B"
          icon={<Database />}
          trend={{ value: "800M", isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly active users over time.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <UserGrowthChart />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>AI Generations</CardTitle>
            <CardDescription>Success vs Failed tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            <AIGenerationsChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Status of core services and external APIs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'OpenAI API', status: 'Operational', latency: '120ms' },
                { name: 'Anthropic API', status: 'Operational', latency: '85ms' },
                { name: 'Vercel Deployment', status: 'Operational', latency: '45ms' },
                { name: 'Supabase Database', status: 'Operational', latency: '12ms' },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>{service.latency}</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-xs font-medium">{service.status}</span>
                  </div>
                </div>
              ))}
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
              {[
                { message: 'User max@company.com upgraded to Pro', time: '2m ago' },
                { message: 'Failed generation in Product #429', time: '15m ago', error: true },
                { message: 'New user signed up: alex@startup.io', time: '1h ago' },
                { message: 'Database backup completed', time: '2h ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${activity.error ? 'bg-red-500' : 'bg-zinc-300'}`} />
                  <div className="space-y-1 text-sm">
                    <p className={activity.error ? 'text-red-600 font-medium' : 'text-zinc-700'}>{activity.message}</p>
                    <p className="text-xs text-zinc-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
