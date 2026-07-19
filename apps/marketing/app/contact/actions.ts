'use server';

import { createClient } from '@marketing-workspace/auth/server';

export async function submitContactFormAction(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const inquiryType = formData.get('inquiryType') as string;
  const message = formData.get('message') as string;

  if (!email || !message || !inquiryType) {
    throw new Error('Please fill in all required fields.');
  }

  // Map the inquiry type to the allowed DB enum values
  let dbType = 'general_inquiry';
  if (inquiryType === 'sales') dbType = 'sales';
  if (inquiryType === 'partnership') dbType = 'partnership';
  if (inquiryType === 'support') dbType = 'bug_report';
  if (inquiryType === 'question') dbType = 'general_inquiry';

  const guestName = [firstName, lastName].filter(Boolean).join(' ') || 'Anonymous';
  const subject = `[Contact Form] ${inquiryType.toUpperCase()} inquiry from ${guestName}`;

  const supabase = await createClient();

  const { error } = await supabase
    .from('support_tickets')
    .insert({
      guest_email: email,
      guest_name: guestName,
      subject: subject,
      message: message,
      type: dbType,
      priority: 'medium',
      status: 'open',
      image_urls: []
    });

  if (error) {
    console.error('Contact form error:', error);
    throw new Error('Failed to submit message. Please try again later.');
  }

  return { success: true };
}
