'use client';

import { SystemLog } from '@/lib/errors';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@marketing-workspace/ui/components/ui/select';
import { updateErrorStatusAction } from './actions';
import { useTransition } from 'react';
import { Activity, Clock, Globe, Laptop, ShieldAlert, Cpu } from 'lucide-react';

export function ErrorDetails({ log }: { log: SystemLog | null }) {
  const [isPending, startTransition] = useTransition();

  if (!log) {
    return (
      <div className="flex-1 flex items-center justify-center border-[1.25px] border-[#e2e2ea] border-dashed rounded-[12px] bg-[#f8f8fb]/50">
        <div className="text-center flex flex-col items-center">
          <ShieldAlert className="h-8 w-8 text-zinc-300 mb-2" />
          <p className="text-sm font-medium text-zinc-500">Select an error to view details</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: 'open' | 'investigating' | 'resolved') => {
    startTransition(async () => {
      await updateErrorStatusAction(log.id, newStatus);
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white border-[1.25px] border-[#e2e2ea] rounded-[12px] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#e2e2ea] flex items-start justify-between bg-[#f8f8fb]/50">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono bg-white">{log.id.split('-')[0]}</Badge>
            <span className="text-xs text-zinc-500">{new Date(log.created_at).toLocaleString()}</span>
          </div>
          <h2 className="text-lg font-bold text-[#0c0c0e]">{log.message}</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <Select 
            value={log.status} 
            onValueChange={handleStatusChange}
            disabled={isPending}
          >
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-8 overflow-y-auto">
        
        {/* Environment / Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1 p-3 bg-[#f8f8fb] rounded-[8px] border border-[#e2e2ea]">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1"><Activity className="h-3 w-3"/> Level</span>
            <span className="text-sm font-medium text-[#0c0c0e] capitalize">{log.level}</span>
          </div>
          <div className="flex flex-col gap-1 p-3 bg-[#f8f8fb] rounded-[8px] border border-[#e2e2ea]">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1"><Globe className="h-3 w-3"/> Client IP</span>
            <span className="text-sm font-medium text-[#0c0c0e]">{log.client_ip || 'N/A'}</span>
          </div>
          <div className="flex flex-col gap-1 p-3 bg-[#f8f8fb] rounded-[8px] border border-[#e2e2ea]">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1"><Cpu className="h-3 w-3"/> Method</span>
            <span className="text-sm font-medium text-[#0c0c0e]">{log.method || 'SYSTEM'}</span>
          </div>
          <div className="flex flex-col gap-1 p-3 bg-[#f8f8fb] rounded-[8px] border border-[#e2e2ea]">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1"><Laptop className="h-3 w-3"/> User ID</span>
            <span className="text-sm font-medium text-[#0c0c0e] truncate">{log.user_id || 'System'}</span>
          </div>
        </div>

        {/* URL */}
        {log.url && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-[#0c0c0e]">Request URL</h3>
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-[8px] font-mono text-xs text-zinc-600 break-all">
              {log.url}
            </div>
          </div>
        )}

        {/* Stack Trace */}
        {log.stack_trace && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-[#0c0c0e]">Stack Trace</h3>
            <div className="p-4 bg-[#0c0c0e] rounded-[8px] overflow-x-auto">
              <pre className="font-mono text-[11px] text-zinc-300 whitespace-pre-wrap">
                {log.stack_trace}
              </pre>
            </div>
          </div>
        )}

        {/* Additional Metadata */}
        {log.metadata && Object.keys(log.metadata).length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-[#0c0c0e]">Metadata</h3>
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-[8px] overflow-x-auto">
              <pre className="font-mono text-[11px] text-zinc-600">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
