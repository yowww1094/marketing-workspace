'use client';

import { useEffect, useRef } from 'react';
import { reportErrorAction } from './actions/report-error';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const hasReported = useRef(false);

  useEffect(() => {
    if (hasReported.current) return;
    hasReported.current = true;

    reportErrorAction({ message: error.message, stack: error.stack }, 'fatal');
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">A critical error occurred</h2>
        <p className="text-muted-foreground mb-4">Our team has been automatically notified.</p>
        <button 
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
