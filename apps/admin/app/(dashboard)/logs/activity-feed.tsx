'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Search, User, Cpu, CreditCard, ShieldAlert, Activity } from 'lucide-react';
import { ActivityEvent } from '@/lib/logs';

export function ActivityFeed({ 
  logs, 
  initialSearch,
}: { 
  logs: ActivityEvent[];
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Debounced search
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (searchTerm === currentSearch) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  const getEventIcon = (type: string) => {
    let Icon = Activity;
    if (type === 'user') Icon = User;
    if (type === 'auth') Icon = ShieldAlert;
    if (type === 'billing') Icon = CreditCard;
    if (type === 'ai') Icon = Cpu;
    if (type === 'admin') Icon = ShieldAlert;

    return (
      <div className="bg-zinc-100 rounded-full h-7 w-7 flex items-center justify-center shrink-0">
        <Icon className="h-3.5 w-3.5 text-zinc-500" />
      </div>
    );
  };

  const getEventBadge = (type: string) => {
    if (type === 'auth') {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">auth</Badge>;
    }
    if (type === 'user') {
      return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">user</Badge>;
    }
    if (type === 'billing') {
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">billing</Badge>;
    }
    if (type === 'ai') {
      return <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-200">ai</Badge>;
    }
    if (type === 'admin') {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">admin</Badge>;
    }
    return <Badge variant="outline" className="text-zinc-500">system</Badge>;
  };

  return (
    <div className="max-w-[1024px] mx-auto w-full">
      <div className="flex items-center gap-3 pt-6 pb-4">
        <div className="relative w-[320px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search events..."
            className="pl-9 h-9 bg-zinc-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5 px-3 py-1.5 shrink-0">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-medium text-emerald-700 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden mt-4">
        {logs.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-sm">
            No events found.
          </div>
        ) : (
          <div className="flex flex-col">
            {logs.map((log) => {
              const time = new Date(log.created_at).toLocaleTimeString('en-US', { hour12: false });
              return (
                <div key={log.id} className="flex gap-4 items-start p-4 border-b border-zinc-200 last:border-0 bg-white">
                  <div className="w-16 shrink-0 pt-1">
                    <span className="text-[11px] font-mono text-zinc-500">{time}</span>
                  </div>
                  
                  {getEventIcon(log.type)}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-zinc-950 capitalize">{log.message}</span>
                      {getEventBadge(log.type)}
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      {log.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
