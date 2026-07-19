'use server';

import { createClient } from '@marketing-workspace/auth/server';
import { z } from 'zod';

const supportSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  type: z.enum(['bug_report', 'feature_request', 'billing_issue', 'account_access', 'general_inquiry', 'other']),
  imageUrls: z.array(z.string()).max(3, "Maximum of 3 images allowed")
});

export async function submitSupportTicketAction(formData: {
  subject: string;
  message: string;
  type: string;
  imageUrls: string[];
}) {
  const supabase = await createClient();
  
  // Verify auth session securely on the server
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in to submit a support ticket.');
  }

  // Validate input
  const parsed = supportSchema.parse(formData);

  // Insert into support_tickets
  const { error } = await supabase
    .from('support_tickets')
    .insert({
      user_id: user.id,
      guest_email: user.email!, // prefilled from session safely
      guest_name: user.user_metadata?.full_name || 'Customer',
      subject: parsed.subject,
      message: parsed.message,
      type: parsed.type,
      priority: 'medium', // Default priority, admin can change later
      status: 'open',
      image_urls: parsed.imageUrls
    });

  if (error) {
    console.error('Support ticket insertion error:', error);
    throw new Error('Failed to submit support ticket. Please try again.');
  }

  return { success: true };
}
