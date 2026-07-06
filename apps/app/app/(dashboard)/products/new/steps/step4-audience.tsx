'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Textarea } from '@marketing-workspace/ui/components/ui/textarea';

export function Step4Audience() {
  const { register, control } = useFormContext<CreateProductInput>();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Target Audience
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Who are you building this for? The more specific, the better the AI can tailor the marketing.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="target_audience_age" className="text-[14px] font-medium text-[#0c0c0e]">
            Age Range (Optional)
          </Label>
          <Input
            id="target_audience_age"
            placeholder="e.g. 25-34"
            {...register('target_audience_age')}
            className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="target_audience_gender" className="text-[14px] font-medium text-[#0c0c0e]">
            Gender (Optional)
          </Label>
          <Input
            id="target_audience_gender"
            placeholder="e.g. All, Female, Male"
            {...register('target_audience_gender')}
            className="bg-[#f6f6f9] border-[#e2e2ea] h-[40px] rounded-[8px] text-[14px]"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="target_audience_interests" className="text-[14px] font-medium text-[#0c0c0e]">
          Interests & Hobbies (Optional)
        </Label>
        <Controller
          name="target_audience_interests"
          control={control}
          render={({ field }) => (
            <Textarea
              id="target_audience_interests"
              placeholder="e.g. Technology, Fitness, Sustainable living..."
              className="bg-[#f6f6f9] border-[#e2e2ea] min-h-[80px] rounded-[8px] text-[14px] resize-y"
              value={Array.isArray(field.value) ? field.value.join('\n') : ''}
              onChange={(e) => field.onChange(e.target.value.split('\n'))}
            />
          )}
        />
        <p className="text-[12px] text-[#6e6e85] mt-1">Enter each interest on a new line.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="target_audience_pain_points" className="text-[14px] font-medium text-[#0c0c0e]">
          Pain Points (Optional)
        </Label>
        <Controller
          name="target_audience_pain_points"
          control={control}
          render={({ field }) => (
            <Textarea
              id="target_audience_pain_points"
              placeholder="What problems does your audience struggle with? e.g. Lack of time, High costs..."
              className="bg-[#f6f6f9] border-[#e2e2ea] min-h-[80px] rounded-[8px] text-[14px] resize-y"
              value={Array.isArray(field.value) ? field.value.join('\n') : ''}
              onChange={(e) => field.onChange(e.target.value.split('\n'))}
            />
          )}
        />
        <p className="text-[12px] text-[#6e6e85] mt-1">Enter each pain point on a new line.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="buying_motivations" className="text-[14px] font-medium text-[#0c0c0e]">
          Buying Motivations (Optional)
        </Label>
        <Controller
          name="buying_motivations"
          control={control}
          render={({ field }) => (
            <Textarea
              id="buying_motivations"
              placeholder="Why would they buy? e.g. Social status, Saving money, Convenience..."
              className="bg-[#f6f6f9] border-[#e2e2ea] min-h-[80px] rounded-[8px] text-[14px] resize-y"
              value={Array.isArray(field.value) ? field.value.join('\n') : ''}
              onChange={(e) => field.onChange(e.target.value.split('\n'))}
            />
          )}
        />
        <p className="text-[12px] text-[#6e6e85] mt-1">Enter each motivation on a new line.</p>
      </div>
    </div>
  );
}
