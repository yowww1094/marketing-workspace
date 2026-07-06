'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductSchema, CreateProductInput } from '@marketing-workspace/validation';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { Step1ProductInfo } from './steps/step1-product-info';
import { Step2Images } from './steps/step2-images';
import { Step3Brand } from './steps/step3-brand';
import { Step4Audience } from './steps/step4-audience';
import { Step5Competitors } from './steps/step5-competitors';
import { Step6Goals } from './steps/step6-goals';
import { Step7Market } from './steps/step7-market';
import { Step8Review } from './steps/step8-review';

import { useRouter } from 'next/navigation';
import { createProductAction } from './actions';

const steps = [
  { id: 1, name: 'Business Info' },
  { id: 2, name: 'Images' },
  { id: 3, name: 'Brand' },
  { id: 4, name: 'Audience' },
  { id: 5, name: 'Competitors' },
  { id: 6, name: 'Goals' },
  { id: 7, name: 'Market' },
  { id: 8, name: 'Review' },
];

export function WizardClient({ userId }: { userId: string }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(CreateProductSchema) as any,
    defaultValues: {
      name: '',
      category: '',
      description: '',
      features: [],
      unique_selling_points: [],
      product_url: '',
      image_urls: [],
      brand_name: '',
      brand_story: '',
      brand_voice: '',
      brand_personality: '',
      brand_values: [],
      target_audience_age: '',
      target_audience_gender: '',
      target_audience_interests: [],
      target_audience_pain_points: [],
      buying_motivations: [],
      known_competitors: [],
      competitor_urls: [],
      business_goals: [],
      target_country: '',
      target_language: '',
      target_currency: '',
    },
    mode: 'onChange'
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof CreateProductInput)[] = [];
    if (currentStep === 1) fieldsToValidate = ['name', 'category', 'description', 'product_url'];
    // TODO: Add field lists for other steps

    const isStepValid = await methods.trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    } else {
      toast.error('Please fill out all required fields correctly.');
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const productId = await createProductAction(data);
      toast.success('Product creation started!');
      router.push(`/products`); // Or redirect to specific product page
    } catch (e: any) {
      toast.error(e.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full pt-[88px] pb-[32px] px-[32px]">
      <div className="w-full max-w-[672px] flex flex-col items-center mb-8">
        {/* Stepper */}
        <div className="flex items-start w-full justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex flex-col items-center gap-1 relative z-10 w-[28px]">
                  <div
                    className={`flex items-center justify-center w-[28px] h-[28px] rounded-full text-[12px] font-semibold transition-colors
                      ${isActive || isCompleted ? 'bg-[#5b5bd6] text-white' : 'bg-[#f1f1f5] text-[#6e6e85]'}
                    `}
                  >
                    {step.id}
                  </div>
                  <span className={`text-[10px] font-medium absolute top-[32px] whitespace-nowrap ${isActive || isCompleted ? 'text-[#5b5bd6]' : 'text-[#6e6e85]'}`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-[1px] bg-[#e2e2ea] mx-2 mt-[-16px]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-[672px] mt-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-[16px] p-[33px] w-full min-h-[400px]">
              {/* Step content will go here */}
              {currentStep === 1 && <Step1ProductInfo />}
              {currentStep === 2 && <Step2Images />}
              {currentStep === 3 && <Step3Brand />}
              {currentStep === 4 && <Step4Audience />}
              {currentStep === 5 && <Step5Competitors />}
              {currentStep === 6 && <Step6Goals />}
              {currentStep === 7 && <Step7Market />}
              {currentStep === 8 && <Step8Review />}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between w-full mt-6">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" onClick={() => window.history.back()} className="text-[#6e6e85]">
                  Cancel
                </Button>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="text-[#0c0c0e] border-[#e2e2ea]">
                    Back
                  </Button>
                )}
                <Button type="button" variant="outline" className="text-[#0c0c0e] border-[#e2e2ea]">
                  Save Draft
                </Button>
              </div>

              {currentStep < steps.length ? (
                <Button type="button" onClick={nextStep} className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white drop-shadow-sm h-[36px] rounded-[8px] px-4">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white drop-shadow-sm h-[36px] rounded-[8px] px-4">
                  {isSubmitting ? 'Generating...' : 'Generate Marketing Workspace'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
