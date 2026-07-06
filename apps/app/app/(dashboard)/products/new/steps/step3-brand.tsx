'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Textarea } from '@marketing-workspace/ui/components/ui/textarea';

export function Step3Brand() {
  const { register, formState: { errors } } = useFormContext<CreateProductInput>();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Brand Details
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Tell us about the brand behind the product.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brand_name" className="text-[14px] font-medium text-[#0c0c0e]">
          Brand Name (Optional)
        </Label>
        <Input
          id="brand_name"
          placeholder="e.g. Acme"
          {...register('brand_name')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brand_story" className="text-[14px] font-medium text-[#0c0c0e]">
          Brand Story (Optional)
        </Label>
        <Textarea
          id="brand_story"
          placeholder="What is the story behind your brand?"
          {...register('brand_story')}
          className="bg-[#f6f6f9] border-[#e2e2ea] min-h-[102px] rounded-[8px] text-[14px] resize-y"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brand_voice" className="text-[14px] font-medium text-[#0c0c0e]">
          Brand Voice (Optional)
        </Label>
        <Input
          id="brand_voice"
          placeholder="e.g. Professional, Playful, Authoritative..."
          {...register('brand_voice')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="brand_personality" className="text-[14px] font-medium text-[#0c0c0e]">
          Brand Personality (Optional)
        </Label>
        <Input
          id="brand_personality"
          placeholder="e.g. Innovative, Trustworthy, Rebel..."
          {...register('brand_personality')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
      </div>
    </div>
  );
}
