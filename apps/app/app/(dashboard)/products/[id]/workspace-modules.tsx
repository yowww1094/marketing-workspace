'use client';

import { useState } from 'react';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { generateStrategyAction, retryFailedJobsAction } from './actions';
import { toast } from 'sonner';
import { Sparkles, CheckCircle2, Circle, Loader2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@marketing-workspace/ui/components/ui/dialog';

export function WorkspaceModules({ 
  product, 
  workflow,
  onShowGeneratingView
}: { 
  product: any; 
  workflow: any;
  onShowGeneratingView?: () => void;
}) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isDraft = product.status === 'draft';

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setIsDialogOpen(false);
      await generateStrategyAction(product.id);
      toast.success('Marketing strategy generation started!');
      if (onShowGeneratingView) {
        onShowGeneratingView();
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to start generation');
      setIsGenerating(false);
    }
  };

  const handleRetryFailed = async () => {
    try {
      setIsRetrying(true);
      await retryFailedJobsAction(product.id, workflow.id);
      toast.success('Retrying failed jobs...');
      if (onShowGeneratingView) {
        onShowGeneratingView();
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to retry jobs');
    } finally {
      setIsRetrying(false);
    }
  };

  // Mock list of expected jobs according to impl.md Phase 10
  const expectedJobs = [
    { type: 'image_analysis', name: 'Image Analysis' },
    { type: 'product_extraction', name: 'Product Feature Extraction' },
    { type: 'market_research', name: 'Market Research' },
    { type: 'competitor_analysis', name: 'Competitor Analysis' },
    { type: 'customer_personas', name: 'Customer Personas' },
    { type: 'positioning', name: 'Positioning & Value Proposition' },
    { type: 'marketing_strategy', name: 'Marketing Strategy' },
    { type: 'seo_strategy', name: 'SEO Strategy' },
    { type: 'content_generation', name: 'Content Generation' },
  ];

  if (isDraft) {
    return (
      <div className="flex flex-col border border-[#e2e2ea] rounded-[16px] p-6 bg-white shadow-sm w-full sticky top-[112px]">
        <div className="flex flex-col gap-2 mb-6">
          <h3 className="text-[16px] font-semibold text-[#0c0c0e]">Marketing Workspace</h3>
          <p className="text-[14px] text-[#6e6e85]">
            Review your product details on the left. When you&apos;re ready, click below to generate your complete marketing strategy and assets.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              disabled={isGenerating}
              className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white drop-shadow-sm h-[44px] rounded-[8px]"
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Initializing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Marketing Strategy
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <AlertTriangle className="w-6 h-6" />
                <DialogTitle>Confirm Generation</DialogTitle>
              </div>
              <DialogDescription className="text-[14px] leading-relaxed text-[#6e6e85]">
                <strong className="text-[#0c0c0e]">Warning:</strong> After clicking start, there will be no chance to modify your product data. Any misinformation will directly affect the AI marketing strategy.
                <br /><br />
                Please ensure all product details are 100% correct before proceeding. You will not be able to edit this product again.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="text-[#0c0c0e]">
                Cancel, let me review
              </Button>
              <Button onClick={handleGenerate} className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white">
                I am sure, Generate Strategy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // If processing or completed, show the workflow progress
  const jobs = workflow?.jobs || [];
  const hasFailedJobs = jobs.some((j: any) => j.status === 'failed');
  
  return (
    <div className="flex flex-col border border-[#e2e2ea] rounded-[16px] p-6 bg-white shadow-sm w-full sticky top-[112px]">
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-[16px] font-semibold text-[#0c0c0e]">Generation Progress</h3>
        <p className="text-[14px] text-[#6e6e85]">
          Your AI marketing strategy is being generated across the following modules.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {expectedJobs.map((jobDef) => {
          const actualJob = jobs.find((j: any) => j.type === jobDef.type);
          const status = actualJob?.status || 'pending'; // pending, running, completed, failed
          
          return (
            <div key={jobDef.type} className="flex items-center gap-3">
              {status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-[#00a36c]" />
              ) : status === 'running' ? (
                <Loader2 className="w-5 h-5 text-[#b26a00] animate-spin" />
              ) : status === 'failed' ? (
                <XCircle className="w-5 h-5 text-[#ef4444]" />
              ) : (
                <Circle className="w-5 h-5 text-[#e2e2ea] fill-[#f1f1f5]" />
              )}
              <span className={`text-[14px] ${status === 'completed' ? 'text-[#0c0c0e] font-medium' : status === 'failed' ? 'text-[#ef4444] font-medium' : 'text-[#6e6e85]'}`}>
                {jobDef.name}
              </span>
            </div>
          );
        })}
      </div>

      {hasFailedJobs && (
        <div className="mt-6 pt-6 border-t border-[#e2e2ea]">
          <Button 
            onClick={handleRetryFailed} 
            disabled={isRetrying}
            className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white"
          >
            {isRetrying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Retry Failed Jobs
          </Button>
        </div>
      )}

      {product.status === 'processing' && !hasFailedJobs && (
        <div className="mt-6 pt-6 border-t border-[#e2e2ea]">
          <Button variant="outline" className="w-full text-[#0c0c0e] border-[#e2e2ea]" onClick={onShowGeneratingView}>
            Show Generation Timeline
          </Button>
        </div>
      )}

      {product.status === 'completed' && (
        <div className="mt-6 pt-6 border-t border-[#e2e2ea]">
          <Button variant="outline" className="w-full text-[#0c0c0e] border-[#e2e2ea]">
            View Marketing Summary
          </Button>
        </div>
      )}
    </div>
  );
}
