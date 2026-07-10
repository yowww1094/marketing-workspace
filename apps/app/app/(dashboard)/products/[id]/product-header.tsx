'use client';

import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Download, Edit2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { UpgradeModal } from '../../../../components/upgrade-modal';
import { toast } from 'sonner';

export function ProductHeader({ product, isPro = false }: { product: any, isPro?: boolean }) {
  const isDraft = product.status === 'draft';
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const handleDownload = async () => {
    if (isPro) {
      if (product.status !== 'completed') {
        toast.error('Product must be completed to export report.');
        return;
      }
      try {
        setIsExporting(true);
        const { exportReportAction } = await import('./actions');
        await exportReportAction(product.id, product.name);
        toast.success('Report saved to your Reports dashboard!');
        window.print();
      } catch (error) {
        toast.error('Failed to export report');
        console.error(error);
      } finally {
        setIsExporting(false);
      }
    } else {
      setShowUpgradeModal(true);
    }
  };
  
  return (
    <>
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[14px] text-[#6e6e85] mb-1">
          <Link href="/products" className="hover:text-[#0c0c0e] transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#0c0c0e] font-medium">{product.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-bold text-[#0c0c0e]">{product.name}</h1>
          
          <div className={`px-2.5 py-1 rounded-full text-[12px] font-medium capitalize
            ${product.status === 'draft' ? 'bg-[#f1f1f5] text-[#6e6e85]' : 
              product.status === 'processing' ? 'bg-[#fff4e5] text-[#b26a00]' :
              product.status === 'completed' ? 'bg-[#e5fcf5] text-[#00a36c]' :
              'bg-[#ffe5e5] text-[#d32f2f]'
            }
          `}>
            {product.status}
          </div>
        </div>
        <p className="text-[14px] text-[#6e6e85]">{product.category}</p>
      </div>

      <div className="flex items-center gap-3">
        {isDraft && (
          <Button asChild variant="outline" className="flex items-center justify-center w-24 text-[#0c0c0e] border-[#e2e2ea] hover:bg-[#5b5bd6] hover:text-white">
            <Link href={`/products/${product.id}/edit`}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
        )}
        <Button 
          variant="outline" 
          className="flex items-center justify-center w-32 text-[#0c0c0e] border-[#e2e2ea]" 
          disabled={isDraft || isExporting}
          onClick={handleDownload}
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export Report'}
        </Button>
      </div>
    </div>
    <UpgradeModal 
      open={showUpgradeModal} 
      onOpenChange={setShowUpgradeModal} 
    />
    </>
  );
}
