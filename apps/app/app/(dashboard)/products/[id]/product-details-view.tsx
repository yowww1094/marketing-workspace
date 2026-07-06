'use client';

export function ProductDetailsView({ product }: { product: any }) {
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

  // We extract business_goals_text from business_goals array if they were merged,
  // or we just render the raw array. Since the schema saves it all in `business_goals` array,
  // we just render it directly.
  return (
    <div className="flex flex-col border border-[#e2e2ea] rounded-[16px] p-6 bg-white shadow-sm w-full">
      <Section title="1. Product Information">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Product Name" value={product.name} />
          <Field label="Category" value={product.category} />
          <Field label="Price" value={product.price} />
          <Field label="Product URL" value={product.product_url} />
        </div>
        <Field label="Description" value={product.description} />
      </Section>

      <Section title="2. Images">
        {/* We would render image_urls here if we saved them to DB. Currently the schema might not have image_urls or we save it to storage. */}
        <p className="text-[14px] text-[#6e6e85]">Image functionality is pending storage integration.</p>
      </Section>

      <Section title="3. Brand Details">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Brand Name" value={product.brand_name} />
          <Field label="Brand Voice" value={product.brand_voice} />
          <Field label="Brand Personality" value={product.brand_personality} />
        </div>
        <Field label="Brand Story" value={product.brand_story} />
      </Section>

      <Section title="4. Target Audience">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Age Range" value={product.target_audience_age} />
          <Field label="Gender" value={product.target_audience_gender} />
        </div>
        <Field label="Interests & Hobbies" value={product.target_audience_interests} />
        <Field label="Pain Points" value={product.target_audience_pain_points} />
        <Field label="Buying Motivations" value={product.buying_motivations} />
      </Section>

      <Section title="5. Competitors & References">
        <Field label="Competitors" value={product.known_competitors} />
      </Section>

      <Section title="6. Business Goals">
        <Field label="Goals" value={product.business_goals} />
      </Section>

      <Section title="7. Target Market">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Target Country" value={product.target_country} />
          <Field label="Language" value={product.target_language} />
          <Field label="Currency" value={product.target_currency} />
        </div>
      </Section>
    </div>
  );
}
