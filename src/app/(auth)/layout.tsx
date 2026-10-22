import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-12">
      <Link className="mb-8 text-xl font-semibold text-primary-800" href="/">
        Doctor Tracker
      </Link>
      {children}
    </main>
  );
}
