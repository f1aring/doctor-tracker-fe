"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Application route failed:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-text-secondary">
        We couldn&apos;t load this page. Please try again.
      </p>
      <button
        className="rounded-button bg-primary px-4 py-2 font-medium text-primary-foreground"
        onClick={retry}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}
