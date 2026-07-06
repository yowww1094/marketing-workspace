'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { AlertTriangle, Pencil } from 'lucide-react';

export function Step8Review() {
  const { getValues } = useFormContext<CreateProductInput>();
  const values = getValues();

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-3 py-4 border-b border-[#e2e2ea] last:border-0">
      <h3 className="text-[14px] font-semibold text-[#0c0c0e]">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );

  const Field = ({ label, value }: { label: string, value: string | string[] | undefined }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[12px] font-medium text-[#6e6e85] uppercase tracking-wider">{label}</span>
        {Array.isArray(value) ? (
          <ul className="list-disc list-inside text-[14px] text-[#0c0c0e]">
            {value.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        ) : (
          <p className="text-[14px] text-[#0c0c0e] whitespace-pre-wrap">{value}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[700px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Review & Generate
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Review the details before we generate your marketing workspace.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-4 flex items-start gap-3 text-amber-800">
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-amber-600" />
        <div className="flex flex-col text-[14px] leading-[20px]">
          <p className="font-semibold text-amber-900">Review your information carefully</p>
          <p>You can still go back and modify your product details before generating the marketing strategy. Once generation begins, the initial product data cannot be changed.</p>
        </div>
      </div>

      <div className="flex flex-col border border-[#e2e2ea] rounded-[16px] p-6 bg-white shadow-sm">
        <Section title="1. Product Information">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Product Name" value={values.name} />
            <Field label="Category" value={values.category} />
            <Field label="Price" value={values.price} />
            <Field label="Product URL" value={values.product_url} />
          </div>
          <Field label="Description" value={values.description} />
        </Section>

        <Section title="2. Images">
          {values.image_urls && values.image_urls.length > 0 ? (
            <div className="flex gap-3 flex-wrap">
              {values.image_urls.map((url, i) => (
                <div key={i} className="w-[80px] h-[80px] border border-[#e2e2ea] rounded-[8px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Product ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-[#6e6e85]">No images uploaded.</p>
          )}
        </Section>

        <Section title="3. Brand Details">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Brand Name" value={values.brand_name} />
            <Field label="Brand Voice" value={values.brand_voice} />
            <Field label="Brand Personality" value={values.brand_personality} />
          </div>
          <Field label="Brand Story" value={values.brand_story} />
        </Section>

        <Section title="4. Target Audience">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Age Range" value={values.target_audience_age} />
            <Field label="Gender" value={values.target_audience_gender} />
          </div>
          <Field label="Interests & Hobbies" value={values.target_audience_interests} />
          <Field label="Pain Points" value={values.target_audience_pain_points} />
          <Field label="Buying Motivations" value={values.buying_motivations} />
        </Section>

        <Section title="5. Competitors & References">
          <Field label="Competitors" value={values.known_competitors} />
        </Section>

        <Section title="6. Business Goals">
          <Field label="Selected Goals" value={values.business_goals} />
          <Field label="Goal Details" value={values.business_goals_text} />
        </Section>

        <Section title="7. Target Market">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Target Country" value={values.target_country} />
            <Field label="Language" value={values.target_language} />
            <Field label="Currency" value={values.target_currency} />
          </div>
        </Section>
      </div>
    </div>
  );
}
