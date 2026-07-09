'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@marketing-workspace/ui/components/ui/dialog';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Lock, Sparkles, Download, Share } from 'lucide-react';
import Link from 'next/link';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden p-0">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            {/* Simple abstract pattern */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,100 100,0 100,100" fill="currentColor" />
            </svg>
          </div>
          
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 relative z-10 backdrop-blur-sm border border-white/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white relative z-10">Pro Feature Locked</h2>
          <p className="text-indigo-100 mt-2 relative z-10 text-[15px]">
            Unlock powerful reporting and sharing capabilities by upgrading your plan.
          </p>
        </div>

        <div className="p-8 flex flex-col gap-6 bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[#0c0c0e]">Export PDF Reports</span>
                <span className="text-[14px] text-[#6e6e85]">Generate beautiful, client-ready PDF reports of your entire marketing strategy.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Share className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-[#0c0c0e]">Share with Team</span>
                <span className="text-[14px] text-[#6e6e85]">Easily copy and share your marketing workspace with stakeholders.</span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-3 mt-2">
            <Link href="/billing" className="w-full">
              <Button className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white h-11 text-[15px]">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full text-[#6e6e85] hover:text-[#0c0c0e]">
              Maybe Later
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
