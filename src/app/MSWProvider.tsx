'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMsw = async () => {
      // Only run in development and in the browser
      if (
        process.env.NODE_ENV === 'development' &&
        typeof window !== 'undefined'
      ) {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass', // Don't warn about images/fonts
        });
        setMswReady(true);
      }
    };

    initMsw();
  }, []);

  if (!mswReady) {
    return null; // Wait for MSW to start before rendering the app
  }

  return <>{children}</>;
}
