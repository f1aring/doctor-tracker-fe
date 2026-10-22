"use client";

import {
  useState,
  type ReactNode,
} from "react";

import {
  QueryClientProvider,
} from "@tanstack/react-query";

import { Provider as ReduxProvider } from "react-redux";

import {
  ReactQueryDevtools,
} from "@tanstack/react-query-devtools";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import {
  createQueryClient,
} from "@/lib/query-client";

import { makeStore } from "@/store";

interface ProvidersProps {
  children: ReactNode;
}

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({
  children,
}: StoreProviderProps) {
  const [store] = useState(() => makeStore());

  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
}

export function Providers({
  children,
}: ProvidersProps) {
  const [queryClient] = useState(() =>
    createQueryClient()
  );

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}

          <Toaster
            richColors
            position="top-right"
          />
        </ThemeProvider>

        {process.env.NODE_ENV ===
          "development" && (
          <ReactQueryDevtools
            initialIsOpen={false}
          />
        )}
      </QueryClientProvider>
    </StoreProvider>
  );
}
