"use client";

import { useEffect } from "react";

import "./globals.css";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Application failed to render:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground">
            An unexpected error occurred.
          </p>
          <Button onClick={retry} type="button">
            Try Again
          </Button>
        </main>
      </body>
    </html>
  );
}
