'use client';

import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Download, Edit2, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function ProductHeader({ product }: { product: any }) {
  const isDraft = product.status === 'draft';
  
  return (
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
          <Button variant="outline" className="text-[#0c0c0e] border-[#e2e2ea]">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
        <Button variant="outline" className="text-[#0c0c0e] border-[#e2e2ea]" disabled={isDraft}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
