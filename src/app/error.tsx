"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

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
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-xl font-semibold">Unable to load this page</h1>
      <p className="text-muted-foreground">Please try again.</p>
      <Button onClick={retry} type="button">
        Retry
      </Button>
    </div>
  );
}
