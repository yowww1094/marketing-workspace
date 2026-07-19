'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@marketing-workspace/auth/client';
import imageCompression from 'browser-image-compression';
import { submitSupportTicketAction } from './actions';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  type: z.enum(['bug_report', 'feature_request', 'billing_issue', 'account_access', 'general_inquiry', 'other'] as const, {
    message: 'Please select a topic.',
  }),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Please provide more details in your message.").max(5000),
});

type FormData = z.infer<typeof formSchema>;

export function SupportForm({ userEmail, userId }: { userEmail: string; userId: string }) {
  const [images, setImages] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'general_inquiry',
      subject: '',
      message: ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validImages = newFiles.filter(f => f.type.startsWith('image/'));
      
      if (validImages.length + images.length > 3) {
        toast.error('You can only attach up to 3 images.');
        return;
      }
      
      const oversized = validImages.find(f => f.size > 5 * 1024 * 1024);
      if (oversized) {
        toast.error('Each image must be under 5MB before compression.');
        return;
      }

      setImages(prev => [...prev, ...validImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsUploading(true);
    let uploadedUrls: string[] = [];

    try {
      // 1. Compress & Upload Images
      for (const file of images) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Compress to ~1MB max
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const fileExt = compressedFile.name.split('.').pop() || 'jpg';
        const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('support_assets')
          .upload(fileName, compressedFile, {
            contentType: compressedFile.type,
          });

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
        
        // Save the path to store in the ticket
        uploadedUrls.push(uploadData.path);
      }

      // 2. Submit Action
      startTransition(async () => {
        try {
          await submitSupportTicketAction({
            subject: data.subject,
            message: data.message,
            type: data.type,
            imageUrls: uploadedUrls
          });
          toast.success('Your support ticket has been submitted!');
          reset();
          setImages([]);
        } catch (err: any) {
          toast.error(err.message || 'Failed to submit ticket');
        } finally {
          setIsUploading(false);
        }
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload images');
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      
      {/* Email (Readonly) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#0c0c0e]">Your Email</label>
        <input 
          type="email" 
          value={userEmail} 
          disabled 
          className="w-full px-3 py-2 border border-[#e2e2ea] rounded-[6px] bg-[#f8f8fb] text-[#6e6e85] text-sm cursor-not-allowed"
        />
      </div>

      {/* Topic */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#0c0c0e]">What can we help you with?</label>
        <select 
          {...register('type')}
          className="w-full px-3 py-2 border border-[#e2e2ea] rounded-[6px] text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bd6] focus:border-[#5b5bd6]"
        >
          <option value="general_inquiry">General Inquiry</option>
          <option value="bug_report">Bug Report</option>
          <option value="feature_request">Feature Request</option>
          <option value="billing_issue">Billing Issue</option>
          <option value="account_access">Account Access</option>
          <option value="other">Other</option>
        </select>
        {errors.type && <span className="text-xs text-red-500">{errors.type.message}</span>}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#0c0c0e]">Subject</label>
        <input 
          {...register('subject')}
          placeholder="Brief summary of your issue"
          className="w-full px-3 py-2 border border-[#e2e2ea] rounded-[6px] text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bd6] focus:border-[#5b5bd6]"
        />
        {errors.subject && <span className="text-xs text-red-500">{errors.subject.message}</span>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#0c0c0e]">Message</label>
        <textarea 
          {...register('message')}
          placeholder="Please describe your issue in detail..."
          className="w-full min-h-[150px] px-3 py-2 border border-[#e2e2ea] rounded-[6px] text-sm resize-y focus:outline-none focus:ring-1 focus:ring-[#5b5bd6] focus:border-[#5b5bd6]"
        />
        {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#0c0c0e]">Attachments (Optional)</label>
        <p className="text-xs text-[#6e6e85]">Attach up to 3 images to provide evidence. Max 5MB per image.</p>
        
        <div className="flex items-center gap-4 mt-1">
          <label className="flex items-center gap-2 px-4 py-2 border border-[#e2e2ea] rounded-[6px] text-sm font-medium hover:bg-[#f8f8fb] cursor-pointer transition-colors cursor-pointer text-[#0c0c0e]">
            <ImageIcon className="w-4 h-4 text-[#6e6e85]" />
            Choose Images
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageChange}
              className="hidden" 
              disabled={images.length >= 3 || isUploading || isPending}
            />
          </label>
          <span className="text-xs text-[#6e6e85]">{images.length}/3 attached</span>
        </div>

        {/* Selected Images Preview List */}
        {images.length > 0 && (
          <div className="flex flex-col gap-2 mt-3">
            {images.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-2 border border-[#e2e2ea] rounded-[6px] bg-[#f8f8fb]">
                <span className="text-xs text-[#0c0c0e] truncate max-w-[80%]">{file.name}</span>
                <button 
                  type="button" 
                  onClick={() => removeImage(i)}
                  className="p-1 hover:bg-[#e2e2ea] rounded-md transition-colors"
                  disabled={isUploading || isPending}
                >
                  <X className="w-3.5 h-3.5 text-[#6e6e85]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#e2e2ea] flex justify-end">
        <button
          type="submit"
          disabled={isUploading || isPending}
          className="flex items-center justify-center gap-2 bg-[#5b5bd6] text-white px-6 py-2 rounded-[6px] text-sm font-medium hover:bg-[#5b5bd6]/90 transition-colors disabled:opacity-50 min-w-[140px]"
        >
          {(isUploading || isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
          {isUploading ? 'Uploading...' : isPending ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
    </form>
  );
}
