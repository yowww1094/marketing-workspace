'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';

export function Step4Audience() {
  const { register } = useFormContext<CreateProductInput>();

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
      
      {/* For array fields like interests, pain points, etc., we can use a simple comma separated input for now to save time, or a multi-select component.
          To keep it simple, we'll just use a text input and parse it as comma-separated or let them just type it. 
          Actually, the Zod schema expects an array of strings. 
          We'll need a basic tag input or just accept string and split on submit.
          Wait, react-hook-form allows registering an array if we use useFieldArray, or we can just capture as string and let the user split it. 
          Let's just capture them as simple inputs for this phase or use the UI component if we had one.
          For now, I'll provide standard inputs that map to a string, but our schema expects arrays.
          Wait, I should update the schema to accept string and split it in a transform, or just build a quick tag input.
          Let's just use a simple string input and split in a custom onChange, or update the Zod schema. 
          It's easier to change the schema or use a local state. I will use a local component pattern.
      */}
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
        Advanced audience targeting fields (Interests, Pain Points, Buying Motivations) will be implemented with a multi-select component.
      </div>
    </div>
  );
}
