'use client';

import { requestPasswordReset } from '@/app/auth/actions';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success('Password reset link sent to your email.');
    }
  }, [state]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-zinc-50">
      <Card className="w-full max-w-sm shadow-sm border-zinc-200">
        <CardHeader>
          <CardTitle className="text-2xl text-zinc-950 font-bold tracking-tight">Reset Password</CardTitle>
          <CardDescription>
            Enter your email and we will send you a reset link.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-700">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required className="border-zinc-200" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white" type="submit" disabled={pending}>
              {pending ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link href="/login" className="underline underline-offset-4 hover:text-zinc-950 transition-colors">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

