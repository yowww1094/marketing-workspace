'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Textarea } from '@marketing-workspace/ui/components/ui/textarea';

export function Step1ProductInfo() {
  const { register, formState: { errors } } = useFormContext<CreateProductInput>();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Product Information
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Provide the foundational details about your product. This helps our AI generate accurate and relevant insights.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-[14px] font-medium text-[#0c0c0e]">
          Product Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="e.g. Acme Super Widget"
          {...register('name')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category" className="text-[14px] font-medium text-[#0c0c0e]">
          Category <span className="text-red-500">*</span>
        </Label>
        <Input
          id="category"
          placeholder="e.g. Software as a Service, Electronics, Apparel..."
          {...register('category')}
          className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
        />
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description" className="text-[14px] font-medium text-[#0c0c0e]">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what your product does, who it serves, and what makes it unique..."
          {...register('description')}
          className="bg-[#f6f6f9] border-[#e2e2ea] min-h-[102px] rounded-[8px] text-[14px] resize-y"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="price" className="text-[14px] font-medium text-[#0c0c0e]">
            Price (Optional)
          </Label>
          <Input
            id="price"
            placeholder="e.g. $49.99/mo"
            {...register('price')}
            className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="product_url" className="text-[14px] font-medium text-[#0c0c0e]">
            Product URL (Optional)
          </Label>
          <Input
            id="product_url"
            placeholder="https://example.com/product"
            {...register('product_url')}
            className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
          />
          {errors.product_url && <p className="text-red-500 text-xs mt-1">{errors.product_url.message}</p>}
        </div>
      </div>
    </div>
  );
}
