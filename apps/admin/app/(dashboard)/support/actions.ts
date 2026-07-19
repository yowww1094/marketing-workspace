'use server';

import { createAdminClient } from '@marketing-workspace/auth/admin';
import { sendSupportReplyEmail } from '@marketing-workspace/email';
import { revalidatePath } from 'next/cache';

export async function replyToTicketAction(ticketId: string, replyMessage: string) {
  const supabase = createAdminClient();

  // 1. Fetch ticket to get email
  const { data: ticket, error: fetchError } = await supabase
    .from('support_tickets')
    .select('guest_email, subject, id')
    .eq('id', ticketId)
    .single();

  if (fetchError || !ticket) {
    throw new Error('Ticket not found or could not be loaded.');
  }

  // 2. Send Email
  try {
    await sendSupportReplyEmail(ticket.guest_email, ticket.subject, replyMessage);
  } catch (emailError: any) {
    console.error('Email failed to send:', emailError);
    throw new Error('Failed to send email reply.');
  }

  // 3. Update Status to resolved
  const { error: updateError } = await supabase
    .from('support_tickets')
    .update({ status: 'resolved' })
    .eq('id', ticketId);

  if (updateError) {
    console.error('Failed to update ticket status:', updateError);
    // Even if status update fails, email was sent. We just throw so UI knows it wasn't fully processed.
    throw new Error('Email sent, but failed to update ticket status.');
  }

  revalidatePath('/support');
  return { success: true };
}
