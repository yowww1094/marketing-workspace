'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';

export function Step7Market() {
  const { register } = useFormContext<CreateProductInput>();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Target Market
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Define the geographical and linguistic focus of your marketing.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="target_country" className="text-[14px] font-medium text-[#0c0c0e]">
          Target Country (Optional)
        </Label>
        <Input
          id="target_country"
          placeholder="e.g. United States, Global"
          {...register('target_country')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="target_language" className="text-[14px] font-medium text-[#0c0c0e]">
          Language (Optional)
        </Label>
        <Input
          id="target_language"
          placeholder="e.g. English, Spanish"
          {...register('target_language')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="target_currency" className="text-[14px] font-medium text-[#0c0c0e]">
          Currency (Optional)
        </Label>
        <Input
          id="target_currency"
          placeholder="e.g. USD, EUR"
          {...register('target_currency')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
      </div>
    </div>
  );
}
