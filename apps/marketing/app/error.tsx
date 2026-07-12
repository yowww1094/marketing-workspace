'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { reportErrorAction } from './actions/report-error';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast.error('Something went wrong. Our team has been notified.');
    reportErrorAction({ message: error.message, stack: error.stack }, 'error');
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 px-4 text-center">
      <div className="bg-destructive/10 p-4 rounded-full">
        <AlertCircle className="size-10 text-destructive" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
        <p className="text-muted-foreground max-w-[500px]">
          We apologize for the inconvenience. An unexpected error has occurred and our team has been automatically notified.
        </p>
      </div>
      <div className="flex gap-4 pt-4">
        <Button onClick={() => window.location.reload()} variant="outline">
          Refresh Page
        </Button>
        <Button onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
