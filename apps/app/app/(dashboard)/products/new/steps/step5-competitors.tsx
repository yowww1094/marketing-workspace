'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Textarea } from '@marketing-workspace/ui/components/ui/textarea';

export function Step5Competitors() {
  const { control } = useFormContext<CreateProductInput>();
  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Competitors
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Who are you competing against? 
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="competitors" className="text-[14px] font-medium text-[#0c0c0e]">
          Competitors & References
        </Label>
        <Controller
          name="known_competitors"
          control={control}
          render={({ field }) => (
            <Textarea
              id="competitors"
              placeholder="Describe your competitors, what makes them good or bad, or paste their website URLs here..."
              className="bg-[#f6f6f9] border-[#e2e2ea] min-h-[150px] rounded-[8px] text-[14px] resize-y"
              value={Array.isArray(field.value) ? field.value.join('\n') : ''}
              onChange={(e) => {
                // Split by newlines, filter out completely empty lines
                const lines = e.target.value.split('\n');
                field.onChange(lines);
              }}
            />
          )}
        />
        <p className="text-[12px] text-[#6e6e85] mt-1">
          Each line will be treated as a separate competitor or note. Feel free to paste URLs or write descriptions.
        </p>
      </div>
    </div>
  );
}
