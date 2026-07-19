import { getHealthMetrics } from '@/lib/health';
import { RefreshButton } from '@/components/refresh-button';
import { 
  Activity, 
  Clock, 
  Cpu, 
  Database, 
  ListOrdered, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { HealthCards } from './health-cards';

export default async function SystemHealthPage() {
  const metrics = await getHealthMetrics();

  const isDegraded = metrics.queueDepth > 10 || metrics.aiLatencyS > 5;

  return (
    <div className="flex flex-col w-full gap-6">
      
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#0c0c0e] tracking-tight">System Health</h1>
          <p className="text-sm text-[#6e6e85] mt-1">Infrastructure status, latency, and uptime monitoring</p>
        </div>
        <RefreshButton />
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-6 gap-4">
        
        {/* All Services */}
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">All Services</span>
            <CheckCircle2 className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{metrics.operationalServices}/{metrics.totalServices}</span>
        </div>

        {/* Avg API Latency (replaces uptime) */}
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">Avg API Latency</span>
            <Activity className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">
            {Math.round((metrics.dbLatencyMs + metrics.stripe.latencyMs + metrics.resend.latencyMs + metrics.nvidia.latencyMs) / 4)}ms
          </span>
          <div className="absolute bottom-4 right-4 flex items-center gap-1">
            <Activity className="h-2.5 w-2.5 text-[#00a63e]" />
            <span className="text-[11px] font-medium text-[#00a63e]">Live</span>
          </div>
        </div>

        {/* Avg Latency */}
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">Avg Latency</span>
            <Clock className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{metrics.aiLatencyS}s</span>
        </div>

        {/* AI Workers Active */}
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">AI Workers Active</span>
            <Cpu className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{metrics.aiWorkersActive}/12</span>
        </div>

        {/* Total Products (replaces DB Connections) */}
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">Total Products</span>
            <Database className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{metrics.totalProducts}</span>
        </div>

        {/* Queue Depth */}
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">Queue Depth</span>
            <ListOrdered className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{metrics.queueDepth}</span>
        </div>

      </div>

      {/* Warning Banner (Conditional) */}
      {isDegraded && (
        <div className="bg-[#fffbeb] border-[1.25px] border-[#fee685] rounded-[12px] p-4 flex items-center gap-4">
          <AlertTriangle className="h-5 w-5 text-[#bb4d00] shrink-0" />
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-[#973c00]">Degraded performance — AI Worker Pool</h3>
            <p className="text-xs text-[#bb4d00] mt-1">
              AI workers are experiencing elevated latency or high queue depth. Auto-scaling initiated. Users may see slower generation times.
            </p>
          </div>
          <div className="bg-[#fffbeb] border-[1.25px] border-[#fee685] px-3 py-1.5 rounded-full text-xs font-medium text-[#bb4d00]">
            Investigating
          </div>
          <button className="bg-[#0c0c0e] text-white px-3 py-2 rounded-[6px] text-xs font-medium hover:bg-[#0c0c0e]/90 transition-colors">
            View incident
          </button>
        </div>
      )}

      {/* Detailed Service Cards */}
      <HealthCards metrics={metrics} />

    </div>
  );
}
