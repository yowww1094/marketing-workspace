'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button 
      type="button" 
      onClick={handleRefresh}
      variant="outline" 
      className="gap-2 bg-white" 
      disabled={isPending}
    >
      <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
      {isPending ? 'Refreshing...' : 'Refresh Data'}
    </Button>
  );
}
