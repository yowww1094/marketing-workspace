'use client';

import { SupportTicket } from '@/lib/support';
import { cn } from '@marketing-workspace/ui/utils';
import { formatDistanceToNow } from 'date-fns';
import { TicketDialog } from './ticket-dialog';
import { useState } from 'react';
import { Eye } from 'lucide-react';

export function SupportTable({ tickets, total, currentPage }: { tickets: SupportTicket[], total: number, currentPage: number }) {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const getBadgeStyles = (type: string, value: string) => {
    if (type === 'type') {
      switch (value) {
        case 'bug_report': return 'bg-red-50 text-red-700 border-red-200';
        case 'feature_request': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'billing_issue': return 'bg-green-50 text-green-700 border-green-200';
        case 'question': return 'bg-purple-50 text-purple-700 border-purple-200';
        default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      }
    }
    if (type === 'priority') {
      switch (value) {
        case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
        case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'low': return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      }
    }
    return 'bg-zinc-100 text-zinc-700 border-zinc-200';
  };

  return (
    <>
      <div className="w-full">
        <table className="w-full text-left text-[13px] text-[#0c0c0e]">
          <thead className="bg-[#f8f8fb] text-[#6e6e85] text-[11px] uppercase tracking-wider font-semibold border-b border-[#e2e2ea]">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e2ea]">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-[#6e6e85]">
                  No tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[#f8f8fb] transition-colors">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    TK-{ticket.id?.split('-')[0]?.toUpperCase() || 'UNKNOWN'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {ticket.guest_name || 'Anonymous User'}
                  </td>
                  <td className="px-4 py-3 max-w-[300px] truncate">
                    {ticket.subject}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={cn("px-2 py-1 rounded-[6px] text-[10px] font-semibold border", getBadgeStyles('type', ticket.type))}>
                      {ticket.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={cn("px-2 py-1 rounded-[6px] text-[10px] font-semibold border", getBadgeStyles('priority', ticket.priority))}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-[#6e6e85]">
                    {ticket.status}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[#6e6e85]">
                    {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => setSelectedTicket(ticket)}
                      className="p-1.5 text-[#6e6e85] hover:text-[#0c0c0e] hover:bg-[#e2e2ea] rounded-[6px] transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TicketDialog 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
      />
    </>
  );
}
