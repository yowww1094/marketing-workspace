'use client';

import { updatePassword } from '@/app/auth/actions';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Label } from '@marketing-workspace/ui/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const [state, formAction, pending] = useActionState(updatePassword, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-zinc-50">
      <Card className="w-full max-w-sm shadow-sm border-zinc-200">
        <CardHeader>
          <CardTitle className="text-2xl text-zinc-950 font-bold tracking-tight">Update Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-700">New Password</Label>
              <Input id="password" name="password" type="password" required minLength={6} className="border-zinc-200" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white" type="submit" disabled={pending}>
              {pending ? 'Saving...' : 'Save Password'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

