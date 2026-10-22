"use client";

import {
  useState,
  type ReactNode,
} from "react";

import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "@/store";

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
