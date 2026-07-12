'use client';

import { login } from '@/app/auth/actions';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (searchParams.get('error') === 'unauthorized') {
      toast.error('You do not have permission to access the admin dashboard.');
    }
  }, [state, searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <header className="flex h-14 items-center border-b border-zinc-800 px-6 bg-zinc-950">
        <div className="flex items-center gap-2 font-semibold text-sm text-white">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-zinc-950">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          Admin Platform
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-[384px] space-y-8 p-8 rounded-2xl bg-white border border-zinc-200 shadow-xl">
          <div className="flex flex-col items-center text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              Admin Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in with your admin credentials
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-sm text-zinc-950">Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin@company.com" required className="h-10 rounded-lg bg-zinc-50 border border-zinc-200 focus-visible:ring-zinc-950" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-medium text-sm text-zinc-950">Password</Label>
                </div>
                <Input id="password" name="password" type="password" placeholder="••••••••" required className="h-10 rounded-lg bg-zinc-50 border border-zinc-200 focus-visible:ring-zinc-950" />
              </div>
            </div>
            <Button className="w-full h-11 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg font-medium shadow-sm transition-all" type="submit" disabled={isPending}>
              {isPending ? 'Authenticating...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
