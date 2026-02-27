"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  // We use useState to ensure the QueryClient is only created ONCE per browser session
  // This avoids re-creating the client on every re-render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: 1000 * 60 * 5, // 5 minutes
            staleTime: Number.POSITIVE_INFINITY, // 5 minutes
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
