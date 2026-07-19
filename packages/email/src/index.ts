import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || 're_stub_key');

/**
 * Sends a support reply email using Resend
 * @param to The email address of the customer
 * @param subject The original ticket subject
 * @param replyMessage The reply message written by the admin
 */
export async function sendSupportReplyEmail(to: string, subject: string, replyMessage: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email will not be sent to', to);
    // You could return early or just let Resend fail/mock it
  }

  const { data, error } = await resend.emails.send({
    from: 'Marketing Workspace Support <support@marketing-workspace.com>', // Replace with your verified domain
    to: [to],
    subject: `Re: ${subject}`,
    text: replyMessage,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>${replyMessage.replace(/\n/g, '<br/>')}</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666;">
          You are receiving this email regarding your ticket: <strong>${subject}</strong>
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email: ' + error.message);
  }

  return data;
}
