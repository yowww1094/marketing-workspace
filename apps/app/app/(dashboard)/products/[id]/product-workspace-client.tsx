'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductHeader } from './product-header';
import { ProductDetailsView } from './product-details-view';
import { WorkspaceModules } from './workspace-modules';
import { MarketingSummaryView } from './marketing-summary-view';
import { StrategyGeneratingView } from './strategy-generating-view';

export function ProductWorkspaceClient({ product, workflow }: { product: any; workflow: any }) {
  const router = useRouter();
  
  // Default to showing the full-screen generating view if it's processing
  const [showGeneratingView, setShowGeneratingView] = useState(product.status === 'processing');
  // Default to false so user always lands on the detail page first
  const [showSummaryView, setShowSummaryView] = useState(false);
  
  const hasFailedJobs = workflow?.jobs?.some((j: any) => j.status === 'failed') || false;
  const isProductProcessing = product.status === 'processing';
  const shouldPoll = isProductProcessing && !hasFailedJobs;

  // We move the polling here so it covers both the full screen view and the modules sidebar
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (shouldPoll) {
      intervalId = setInterval(() => {
        router.refresh();
      }, 10000); // Poll every 10 seconds while processing
    }
    
    // Auto-hide the generating view when it finishes
    if (product.status === 'completed' && showGeneratingView) {
      setShowGeneratingView(false);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [shouldPoll, router, product.status, showGeneratingView]);

  if (showGeneratingView && isProductProcessing) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#f8f8fb] pt-[88px] pb-[32px] px-[32px]">
        <StrategyGeneratingView 
          product={product} 
          workflow={workflow} 
          onContinueInBackground={() => setShowGeneratingView(false)} 
        />
      </div>
    );
  }

  // Final Dashboard when completed AND user wants to view it
  if (product.status === 'completed' && showSummaryView) {
    return (
      <div className="flex flex-col w-[calc(100%+64px)] h-[calc(100vh-88px)] -m-8 bg-white">
        <MarketingSummaryView product={product} workflow={workflow} />
      </div>
    );
  }

  // Normal 2-column layout (Draft mode, or viewing details before opening summary)
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f8f8fb] pt-[88px] pb-[32px] px-[32px]">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6">
        <ProductHeader product={product} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <ProductDetailsView product={product} />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <WorkspaceModules 
              product={product} 
              workflow={workflow} 
              onShowGeneratingView={() => setShowGeneratingView(true)} 
              onShowSummary={() => setShowSummaryView(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
