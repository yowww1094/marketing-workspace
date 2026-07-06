'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';

export function Step8Review() {
  const { getValues } = useFormContext<CreateProductInput>();
  const values = getValues();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Review & Generate
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Review the details before we generate your marketing workspace.
        </p>
      </div>

      <div className="flex flex-col gap-4 border border-[#e2e2ea] rounded-[16px] p-6 bg-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-[12px] font-semibold text-[#6e6e85] uppercase tracking-wider mb-1">Product Name</h3>
            <p className="text-[14px] text-[#0c0c0e]">{values.name || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="text-[12px] font-semibold text-[#6e6e85] uppercase tracking-wider mb-1">Category</h3>
            <p className="text-[14px] text-[#0c0c0e]">{values.category || 'Not provided'}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-[12px] font-semibold text-[#6e6e85] uppercase tracking-wider mb-1">Description</h3>
          <p className="text-[14px] text-[#0c0c0e] whitespace-pre-wrap">{values.description || 'Not provided'}</p>
        </div>

        {/* In a real implementation, you'd list out all values from all steps here. */}
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm mt-4">
          All collected values from steps 1-7 will be summarized here in the final view.
        </div>
      </div>
    </div>
  );
}
