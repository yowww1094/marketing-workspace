'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function RefreshButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" className="gap-2 bg-white" disabled={pending}>
      <RefreshCw className={`h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
      {pending ? 'Refreshing...' : 'Refresh Data'}
    </Button>
  );
}
