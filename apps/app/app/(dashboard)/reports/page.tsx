import { createClient } from '@marketing-workspace/auth/server';
import { redirect } from 'next/navigation';
import { FileText, Search, Download, Share, Lock, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import Link from 'next/link';

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan_id')
    .eq('user_id', user.id)
    .single();

  const isPro = subscription?.plan_id === 'pro';

  if (!isPro) {
    return (
      <div className="w-full max-w-[1106px] mx-auto h-[600px] flex items-center justify-center">
        <div className="bg-white border border-[#e2e2ea] rounded-2xl p-10 max-w-md text-center shadow-sm">
          <div className="w-16 h-16 bg-[#5b5bd6]/10 text-[#5b5bd6] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#0c0c0e] mb-3">Pro Feature Locked</h2>
          <p className="text-[15px] text-[#6e6e85] mb-8 leading-relaxed">
            Unlock powerful reporting capabilities, including generating, saving, and downloading comprehensive marketing reports.
          </p>
          <div className="flex flex-col gap-4 text-left mb-8">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#5b5bd6]" />
              <span className="text-[14px] text-[#0c0c0e]">Generate & download PDF reports</span>
            </div>
            <div className="flex items-center gap-3">
              <Share className="w-5 h-5 text-[#5b5bd6]" />
              <span className="text-[14px] text-[#0c0c0e]">Share workspaces with your team</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#5b5bd6]" />
              <span className="text-[14px] text-[#0c0c0e]">Keep a history of all generated strategies</span>
            </div>
          </div>
          <Link href="/billing" className="block w-full">
            <Button className="w-full h-12 bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white text-[15px]">
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Fetch reports if Pro
  const { data: reports } = await supabase
    .from('reports')
    .select('*, products(name)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const reportsCount = reports?.length || 0;

  const formatBytes = (bytes: number, decimals = 1) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-[#0c0c0e]">
            Reports
          </h1>
          <p className="text-sm text-[#6e6e85]">
            {reportsCount} {reportsCount === 1 ? 'report' : 'reports'} generated
          </p>
        </div>
        <Button className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white h-9 shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] rounded-lg">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="relative w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e6e85]" />
          <input 
            type="text" 
            placeholder="Search reports..." 
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-[#e2e2ea] bg-[#f6f6f9] text-[14px] outline-none focus:border-[#5b5bd6] focus:ring-1 focus:ring-[#5b5bd6] transition-all"
          />
        </div>
        <div className="flex items-center justify-between px-3 h-9 w-[157px] rounded-lg border border-[#e2e2ea] bg-white text-[14px] text-[#0c0c0e] cursor-pointer">
          <span>All Types</span>
          <ChevronDown className="w-4 h-4 text-[#6e6e85]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-[1px] overflow-hidden">
        <div className="bg-white rounded-[10px] w-full overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f1f5]/30 border-b border-[#e2e2ea]">
                <th className="px-5 py-3 text-[12px] font-semibold text-[#6e6e85] w-[350px]">Report</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-[#6e6e85]">Project</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-[#6e6e85]">Type</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-[#6e6e85]">Date</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-[#6e6e85]">Size</th>
                <th className="px-5 py-3 text-[12px] font-semibold text-[#6e6e85] text-right w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports && reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="border-b border-[#e2e2ea] hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#f1f1f5] flex items-center justify-center shrink-0">
                          <FileText className="w-3.5 h-3.5 text-[#6e6e85]" />
                        </div>
                        <span className="text-[14px] font-medium text-[#0c0c0e] truncate">{report.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[14px] text-[#6e6e85]">
                      {report.products?.name || 'Unknown'}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className="bg-[#f1f1f5] text-[#6e6e85] font-medium text-[12px] hover:bg-[#e2e2ea]">
                        {report.type}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-[12px] text-[#6e6e85]">
                      {formatDate(report.created_at)}
                    </td>
                    <td className="px-5 py-4 text-[12px] text-[#6e6e85]">
                      {formatBytes(report.size_bytes)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-[12px] font-medium text-[#6e6e85] hover:text-[#0c0c0e]">
                          <FileText className="w-3.5 h-3.5 mr-2" />
                          View
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6e6e85] hover:text-[#0c0c0e]">
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6e6e85] hover:text-[#0c0c0e]">
                          <Share className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#f1f1f5] flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#6e6e85]" />
                      </div>
                      <div className="text-[14px] font-medium text-[#0c0c0e]">No reports generated yet</div>
                      <div className="text-[14px] text-[#6e6e85]">Generate your first report from a product's workspace summary.</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
