import type {
  ReactNode,
} from "react";

import {
  AppHeader,
} from "@/components/layout/app-header";

import {
  AppShell,
} from "@/components/layout/app-shell";

import {
  AppSidebar,
} from "@/components/layout/app-sidebar";

import {
  PageContainer,
} from "@/components/layout/page-container";

interface PortalLayoutProps {
  children: ReactNode;
}

export default function PortalLayout({
  children,
}: PortalLayoutProps) {
  return (
    <AppShell>
      <div className="flex min-h-screen">
        <AppSidebar />

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
          "
        >
          <AppHeader />

          <PageContainer>
            {children}
          </PageContainer>
        </div>
      </div>
    </AppShell>
  );
}