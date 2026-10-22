"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center text-sm text-text-secondary"
          role="status"
        >
          Loading application...
        </div>
      }
    >
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </QueryClientProvider>
      </StoreProvider>
    </Suspense>
  );
}
