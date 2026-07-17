import { getErrors } from '@/lib/errors';
import { ErrorList } from './error-list';
import { ErrorDetails } from './error-details';
import { RefreshCw, Download, AlertCircle, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export default async function ErrorsPage(props: {
  searchParams: Promise<{ search?: string; level?: string; status?: string; id?: string }>;
}) {
  const searchParams = await props.searchParams;
  
  const { kpis, logs } = await getErrors({
    search: searchParams.search,
    level: searchParams.level,
    status: searchParams.status,
  });

  const selectedLog = logs.find(l => l.id === searchParams.id) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] w-full gap-6">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#0c0c0e] tracking-tight">Error Logs</h1>
          <p className="text-sm text-[#6e6e85] mt-1">Application errors, exceptions, and monitoring alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border-[1.25px] border-[#e2e2ea] rounded-[6px] text-xs font-medium text-[#0c0c0e] hover:bg-zinc-50">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border-[1.25px] border-[#e2e2ea] rounded-[6px] text-xs font-medium text-[#0c0c0e] hover:bg-zinc-50">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">Open Errors</span>
            <AlertCircle className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.openErrors}</span>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">Critical</span>
            <AlertTriangle className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.criticalErrors}</span>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">Resolved (24h)</span>
            <CheckCircle2 className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.resolved24h}</span>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">Error Rate</span>
            <TrendingUp className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.errorRate}</span>
          <div className="absolute bottom-4 right-4 flex items-center gap-1">
            <span className="text-[11px] font-medium text-[#fb2c36]">{kpis.errorRateTrend}</span>
          </div>
        </div>
      </div>

      {/* Main Split Content */}
      <div className="flex gap-5 flex-1 min-h-0">
        <ErrorList logs={logs} />
        <ErrorDetails log={selectedLog} />
      </div>

    </div>
  );
}
