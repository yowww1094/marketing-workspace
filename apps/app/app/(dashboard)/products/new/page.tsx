import { createClient } from '@marketing-workspace/auth/server';
import { redirect } from 'next/navigation';
import { WizardClient } from './wizard-client';

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // TODO: Verify if user is on Free tier and already has 1 product
  // For now, we will pass the user to the WizardClient

  return (
    <div className="flex-1 bg-white relative h-full flex flex-col">
      <div className="bg-white min-h-full relative w-full flex-1">
        <WizardClient userId={user.id} />
      </div>
    </div>
  );
}
