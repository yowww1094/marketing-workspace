import { getPaginatedTickets, getSupportKPIs } from '@/lib/support';
import { SupportTable } from './support-table';
import { MailOpen, Clock, CheckCircle2, Star, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@marketing-workspace/ui/utils';

export default async function SupportPage(props: {
  searchParams: Promise<{ page?: string; search?: string; type?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const typeFilter = searchParams.type || 'all';

  const [kpis, { tickets, total }] = await Promise.all([
    getSupportKPIs(),
    getPaginatedTickets({ page, search, type: typeFilter }),
  ]);

  const filterTabs = [
    { label: 'All Tickets', value: 'all' },
    { label: 'Bug Reports', value: 'bug_report' },
    { label: 'Feature Requests', value: 'feature_request' },
    { label: 'Billing', value: 'billing_issue' },
  ];

  return (
    <div className="flex flex-col w-full gap-6">
      
      {/* Header */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-[#0c0c0e] tracking-tight">Support Center</h1>
          <p className="text-sm text-[#6e6e85] mt-1">Customer support tickets, feedback, and bug reports</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0c0c0e] text-white px-3 py-2 rounded-[6px] text-xs font-medium hover:bg-[#0c0c0e]/90 transition-colors">
          <Plus className="h-4 w-4" />
          New Ticket
        </button>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">Open Tickets</span>
            <MailOpen className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-2xl font-bold text-[#0c0c0e]">{kpis.openTickets}</span>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">Avg Response Time</span>
            <Clock className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-2xl font-bold text-[#0c0c0e]">{kpis.avgResponseTime}</span>
          <p className="text-[10px] text-[#6e6e85] mt-1">{kpis.avgResponseChange}</p>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">Resolved Today</span>
            <CheckCircle2 className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-2xl font-bold text-[#0c0c0e]">{kpis.resolvedToday}</span>
          <p className="text-[10px] text-[#6e6e85] mt-1">{kpis.openTickets > 0 ? '+3 vs avg' : 'On track'}</p>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#6e6e85]">CSAT Score</span>
            <Star className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-2xl font-bold text-[#0c0c0e]">{kpis.csatScore}</span>
          <p className="text-[10px] text-[#6e6e85] mt-1">{kpis.csatChange}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = typeFilter === tab.value;
            return (
              <Link
                key={tab.value}
                href={`/support?type=${tab.value}`}
                className={cn(
                  "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors border border-transparent",
                  isActive 
                    ? "bg-[#5b5bd6]/10 text-[#5b5bd6]" 
                    : "text-[#6e6e85] hover:bg-[#f1f1f5] hover:text-[#0c0c0e]"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#6e6e85]" />
          <form>
            <input type="hidden" name="type" value={typeFilter} />
            <input
              name="search"
              defaultValue={search}
              placeholder="Search tickets..."
              className="pl-9 pr-4 py-2 text-sm border border-[#e2e2ea] rounded-[6px] w-[220px] focus:outline-none focus:ring-1 focus:ring-[#5b5bd6] focus:border-[#5b5bd6]"
            />
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#e2e2ea] rounded-[12px] bg-white overflow-hidden">
        <SupportTable tickets={tickets} total={total} currentPage={page} />
      </div>

    </div>
  );
}
