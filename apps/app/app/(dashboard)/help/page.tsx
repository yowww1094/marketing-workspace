import { createClient } from '@marketing-workspace/auth/server';
import { SupportForm } from './support-form';
import { redirect } from 'next/navigation';

export default async function HelpPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto py-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0c0c0e] tracking-tight">Help & Support</h1>
        <p className="text-sm text-[#6e6e85] mt-1">
          Have an issue or a question? Fill out the form below and our support team will get back to you.
        </p>
      </div>

      <div className="bg-white border border-[#e2e2ea] rounded-[12px] p-6">
        <SupportForm userEmail={user.email || ''} userId={user.id} />
      </div>
    </div>
  );
}
