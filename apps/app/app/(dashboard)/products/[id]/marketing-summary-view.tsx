'use client';

import { useState } from 'react';
import { MarketingSummarySidebar, SummarySection } from './marketing-summary-sidebar';
import { ExecutiveSummary } from './sections/executive-summary';
import { MarketResearch } from './sections/market-research';
import { CompetitorAnalysis } from './sections/competitor-analysis';
import { CustomerPersonas } from './sections/customer-personas';
import { Positioning } from './sections/positioning';
import { MarketingStrategy } from './sections/marketing-strategy';
import { SEOStrategy } from './sections/seo-strategy';
import { ContentGeneration } from './sections/content-generation';
import { Share, Download, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Button } from '@marketing-workspace/ui/components/ui/button';

interface MarketingSummaryViewProps {
  product: any;
  workflow: any;
}

export function MarketingSummaryView({ product, workflow }: MarketingSummaryViewProps) {
  const [activeSection, setActiveSection] = useState<SummarySection>('executive_summary');

  // Render the selected section component
  const renderSection = () => {
    switch (activeSection) {
      case 'executive_summary':
        return <ExecutiveSummary product={product} workflow={workflow} />;
      case 'market_research':
        return <MarketResearch product={product} workflow={workflow} />;
      case 'competitor_analysis':
        return <CompetitorAnalysis product={product} workflow={workflow} />;
      case 'customer_personas':
        return <CustomerPersonas product={product} workflow={workflow} />;
      case 'positioning':
        return <Positioning product={product} workflow={workflow} />;
      case 'marketing_strategy':
        return <MarketingStrategy product={product} workflow={workflow} />;
      case 'seo_strategy':
        return <SEOStrategy product={product} workflow={workflow} />;
      case 'content_generation':
        return <ContentGeneration product={product} workflow={workflow} />;
      default:
        return <ExecutiveSummary product={product} workflow={workflow} />;
    }
  };

  return (
    <div className="flex w-full h-full bg-white overflow-hidden">
      {/* Sidebar Navigation */}
      <MarketingSummarySidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header / Breadcrumbs */}
        <div className="h-[64px] border-b border-[#e2e2ea] flex items-center justify-between px-6 shrink-0 bg-white">
          <div className="flex items-center gap-2 text-[14px]">
            <div className="flex items-center justify-center p-1.5 rounded-md text-gray-500 hover:bg-gray-100 cursor-pointer">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 text-[#6e6e85]">
              <span>Products</span>
              <ChevronRight className="w-4 h-4" />
              <span className="truncate max-w-[150px]">{product.name}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium text-[#0c0c0e]">Workspace</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 gap-2 text-[12px]">
              <Share className="w-3.5 h-3.5" />
              Share
            </Button>
            <Button size="sm" className="h-8 gap-2 text-[12px] bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white">
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
          </div>
        </div>

        {/* Scrollable Section Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
