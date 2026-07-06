'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Textarea } from '@marketing-workspace/ui/components/ui/textarea';

const STANDARD_GOALS = [
  'Increase Sales',
  'Launch Product',
  'Improve SEO',
  'Brand Awareness',
  'Social Media Growth',
  'Email Marketing',
];

export function Step6Goals() {
  const { register, watch, setValue } = useFormContext<CreateProductInput>();
  const currentGoals = watch('business_goals') || [];

  const handleToggleGoal = (goal: string) => {
    if (currentGoals.includes(goal)) {
      setValue('business_goals', currentGoals.filter(g => g !== goal));
    } else {
      setValue('business_goals', [...currentGoals, goal]);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Business Goals
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          What are you trying to achieve? Select from common goals or describe your own.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Label className="text-[14px] font-medium text-[#0c0c0e]">
          Common Goals
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {STANDARD_GOALS.map((goal) => {
            const isSelected = currentGoals.includes(goal);
            return (
              <label 
                key={goal}
                className={`flex items-center p-3 rounded-[8px] border cursor-pointer transition-colors ${
                  isSelected 
                    ? 'border-[#5b5bd6] bg-[#5b5bd6]/5' 
                    : 'border-[#e2e2ea] bg-white hover:bg-[#f6f6f9]'
                }`}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => handleToggleGoal(goal)}
                />
                <div className={`w-4 h-4 rounded-[4px] border mr-3 flex items-center justify-center ${
                  isSelected ? 'border-[#5b5bd6] bg-[#5b5bd6]' : 'border-[#d1d1d6] bg-white'
                }`}>
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-[14px] ${isSelected ? 'text-[#0c0c0e] font-medium' : 'text-[#6e6e85]'}`}>
                  {goal}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-2">
        <Label htmlFor="business_goals_text" className="text-[14px] font-medium text-[#0c0c0e]">
          Other Goals or Detailed Description
        </Label>
        <Textarea
          id="business_goals_text"
          placeholder="Describe any other specific goals, targets, or timelines here..."
          {...register('business_goals_text')}
          className="bg-[#f6f6f9] border-[#e2e2ea] min-h-[120px] rounded-[8px] text-[14px] resize-y"
        />
      </div>
    </div>
  );
}
