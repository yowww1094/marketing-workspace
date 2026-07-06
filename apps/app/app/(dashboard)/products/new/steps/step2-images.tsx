'use client';

import { useFormContext } from 'react-hook-form';
import { CreateProductInput } from '@marketing-workspace/validation';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Upload } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export function Step2Images() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<CreateProductInput>();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file) return;
      
      // 1. Security: File size check
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // 2. Security: MIME type check
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('File type must be JPG, PNG, or WebP');
        return;
      }
      
      try {
        // 3. Optimization
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        
        // 4. Preview
        const objectUrl = URL.createObjectURL(compressedFile);
        const currentUrls = watch('image_urls') || [];
        setValue('image_urls', [...currentUrls, objectUrl]);
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Failed to optimize image');
      }
    }
  };

  const imageUrls = watch('image_urls') || [];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Product Images
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          Upload images of your product or packaging. We will automatically optimize them for storage.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[14px] font-medium text-[#0c0c0e]">
          Upload Product Images
        </Label>
        
        <div className="border-2 border-dashed border-[#e2e2ea] bg-[#f6f6f9] rounded-[16px] p-8 flex flex-col items-center justify-center relative hover:bg-[#f1f1f5] transition-colors cursor-pointer">
          <input 
            type="file" 
            accept="image/jpeg,image/png,image/webp" 
            multiple 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="bg-white p-3 rounded-full shadow-sm mb-3">
            <Upload className="w-6 h-6 text-[#5b5bd6]" />
          </div>
          <p className="text-[14px] font-medium text-[#0c0c0e]">Click or drag images here</p>
          <p className="text-[12px] text-[#6e6e85] mt-1">Maximum 5MB per file (JPG, PNG, WebP)</p>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div className="flex gap-4 mt-4 flex-wrap">
          {imageUrls.map((url, i) => (
            <div key={i} className="w-[120px] h-[120px] relative rounded-[8px] overflow-hidden border border-[#e2e2ea]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Uploaded preview" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
