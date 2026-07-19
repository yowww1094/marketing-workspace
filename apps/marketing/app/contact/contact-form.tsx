'use client';

import { useState, useTransition } from 'react';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { submitContactFormAction } from './actions';
import { toast } from 'sonner';

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;

    startTransition(async () => {
      try {
        await submitContactFormAction(formData);
        toast.success('Message sent! We will get back to you shortly.');
        formElement.reset();
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-[14px] font-medium text-[#0c0c0e]">First name</label>
          <input required type="text" id="firstName" name="firstName" placeholder="Jane" className="h-11 px-4 rounded-lg border border-[#e2e2ea] text-[14px] focus:outline-none focus:border-[#5b5bd6] focus:ring-1 focus:ring-[#5b5bd6]" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-[14px] font-medium text-[#0c0c0e]">Last name</label>
          <input required type="text" id="lastName" name="lastName" placeholder="Smith" className="h-11 px-4 rounded-lg border border-[#e2e2ea] text-[14px] focus:outline-none focus:border-[#5b5bd6] focus:ring-1 focus:ring-[#5b5bd6]" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px] font-medium text-[#0c0c0e]">Email address</label>
        <input required type="email" id="email" name="email" placeholder="jane@example.com" className="h-11 px-4 rounded-lg border border-[#e2e2ea] text-[14px] focus:outline-none focus:border-[#5b5bd6] focus:ring-1 focus:ring-[#5b5bd6]" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiryType" className="text-[14px] font-medium text-[#0c0c0e]">How can we help you?</label>
        <select required id="inquiryType" name="inquiryType" defaultValue="" className="h-11 px-4 rounded-lg border border-[#e2e2ea] text-[14px] text-[#0c0c0e] bg-white focus:outline-none focus:border-[#5b5bd6] focus:ring-1 focus:ring-[#5b5bd6] cursor-pointer">
          <option value="" disabled>Select an option...</option>
          <option value="sales">Sales & Pricing</option>
          <option value="support">Technical Support</option>
          <option value="question">General Question</option>
          <option value="partnership">Partnership</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[14px] font-medium text-[#0c0c0e]">Message</label>
        <textarea required id="message" name="message" rows={4} placeholder="How can we help?" className="p-4 rounded-lg border border-[#e2e2ea] text-[14px] focus:outline-none focus:border-[#5b5bd6] focus:ring-1 focus:ring-[#5b5bd6] resize-none" />
      </div>

      <Button type="submit" disabled={isPending} className="w-full h-12 bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white rounded-lg mt-2 font-medium">
        {isPending ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  );
}
