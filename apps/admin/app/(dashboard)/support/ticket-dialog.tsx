'use client';

import { SupportTicket } from '@/lib/support';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@marketing-workspace/ui/components/ui/dialog';
import { useState, useTransition } from 'react';
import { replyToTicketAction } from './actions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function TicketDialog({ ticket, onClose }: { ticket: SupportTicket | null, onClose: () => void }) {
  const [replyMessage, setReplyMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!ticket) return null;

  const handleReply = () => {
    if (!replyMessage.trim()) return;
    
    setError(null);
    startTransition(async () => {
      try {
        await replyToTicketAction(ticket.id, replyMessage);
        setReplyMessage('');
        onClose();
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'Failed to send reply');
      }
    });
  };

  return (
    <Dialog open={!!ticket} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[600px] p-6 gap-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">TK-{ticket.id?.split('-')[0]?.toUpperCase() || 'UNKNOWN'}</DialogTitle>
            <span className="px-2 py-1 rounded-[6px] text-xs font-medium bg-[#f1f1f5] text-[#6e6e85]">
              {ticket.status.toUpperCase()}
            </span>
          </div>
          <DialogDescription className="text-[#0c0c0e] font-medium text-base mt-2">
            {ticket.subject}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Reporter Info */}
          <div className="flex items-center gap-4 bg-[#f8f8fb] p-3 rounded-[8px] border border-[#e2e2ea]">
            <div className="h-10 w-10 bg-[#5b5bd6] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {(ticket.guest_name || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{ticket.guest_name || 'Anonymous User'}</span>
              <span className="text-xs text-[#6e6e85]">{ticket.guest_email}</span>
            </div>
          </div>

          {/* Message Body */}
          <div className="bg-white border border-[#e2e2ea] rounded-[8px] p-4 text-sm text-[#333] min-h-[100px] whitespace-pre-wrap">
            {ticket.message}
          </div>

          {/* Reply Area */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-semibold text-[#0c0c0e]">Send Reply</label>
            <textarea
              placeholder="Write your reply here... An email will be sent directly to the user."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="w-full min-h-[120px] p-3 text-sm border border-[#e2e2ea] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#5b5bd6] focus:border-[#5b5bd6] resize-none"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#6e6e85] hover:bg-[#f1f1f5] rounded-[6px] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleReply}
            disabled={isPending || !replyMessage.trim()}
            className="flex items-center gap-2 bg-[#5b5bd6] text-white px-4 py-2 rounded-[6px] text-sm font-medium hover:bg-[#5b5bd6]/90 transition-colors disabled:opacity-50"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Send Reply
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
