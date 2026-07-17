'use client';

import { SystemLog } from '@/lib/errors';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@marketing-workspace/ui/utils';

export function ErrorList({ logs }: { logs: SystemLog[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id');

  const getSeverityBadge = (level: string) => {
    switch (level) {
      case 'fatal':
      case 'critical':
        return <span className="bg-[#ffe2e2] text-[#9f0712] border border-[#ffa2a2] px-2 py-0.5 rounded-[4px] text-[10px] font-semibold">critical</span>;
      case 'error':
        return <span className="bg-[#fef2f2] text-[#e7000b] border border-[#ffc9c9] px-2 py-0.5 rounded-[4px] text-[10px] font-medium">error</span>;
      case 'warn':
      case 'warning':
        return <span className="bg-[#fffbeb] text-[#bb4d00] border border-[#fee685] px-2 py-0.5 rounded-[4px] text-[10px] font-medium">warning</span>;
      case 'info':
      default:
        return <span className="bg-[#eff6ff] text-[#1447e6] border border-[#bedbff] px-2 py-0.5 rounded-[4px] text-[10px] font-medium">info</span>;
    }
  };

  return (
    <div className="flex flex-col gap-[6px] h-full overflow-y-auto w-[320px] shrink-0 border-r border-zinc-200 pr-4">
      {logs.map(log => {
        const isSelected = selectedId === log.id;
        // Strip out the timezone for display
        const timeStr = new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const params = new URLSearchParams(searchParams.toString());
        params.set('id', log.id);
        const href = `${pathname}?${params.toString()}`;

        return (
          <Link
            key={log.id}
            href={href}
            className={cn(
              "w-full text-left p-[13.25px] rounded-[12px] border-[1.25px] flex flex-col gap-1 transition-colors",
              isSelected 
                ? "bg-[rgba(91,91,214,0.05)] border-[#5b5bd6]" 
                : "bg-[#f8f8fb] border-[#e2e2ea] hover:bg-zinc-50"
            )}
          >
            <div className="flex items-center justify-between w-full">
              {getSeverityBadge(log.level)}
              <span className="font-mono text-[#6e6e85] text-[10px]">{log.status}</span>
            </div>
            
            <p className="font-medium text-[#0c0c0e] text-[12px] leading-[16.5px] line-clamp-2 mt-1">
              {log.message}
            </p>
            
            <div className="flex items-center gap-2 mt-1 w-full justify-between">
              <span className="font-mono text-[#6e6e85] text-[10px] truncate max-w-[120px]">
                {log.url ? new URL(log.url).pathname : 'system'}
              </span>
              <span className="font-medium text-[#6e6e85] text-[10px]">{timeStr}</span>
            </div>
          </Link>
        );
      })}
      
      {logs.length === 0 && (
        <div className="text-sm text-zinc-500 text-center py-8">
          No errors found
        </div>
      )}
    </div>
  );
}
