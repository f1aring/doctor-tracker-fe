"use client";

import { useEffect, type ReactNode } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { useAppDispatch } from "@/store/hooks";
import { clearUser, setUser } from "@/store/slices/auth-slice";

import { useMe } from "../hooks/use-me";

export function PortalAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const dispatch = useAppDispatch();
  const session = useMe();
  const isUnauthorized =
    axios.isAxiosError(session.error) &&
    session.error.response?.status === 401;

  useEffect(() => {
    if (session.data && !session.isError) {
      dispatch(setUser(session.data));
      return;
    }

    if (isUnauthorized) {
      dispatch(clearUser());
      const redirect = `${pathname}${queryString ? `?${queryString}` : ""}`;
      router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [
    dispatch,
    pathname,
    queryString,
    router,
    session.data,
    isUnauthorized,
    session.isError,
  ]);

  if (session.isPending || (session.isError && isUnauthorized)) {
    return <LoadingState message="Verifying your session..." />;
  }

  if (session.isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <div>
          <h1 className="text-lg font-semibold">Unable to verify your session</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The server may be temporarily unavailable. Try again without signing
            out.
          </p>
        </div>
        <Button
          disabled={session.isFetching}
          onClick={() => void session.refetch()}
          variant="outline"
        >
          {session.isFetching ? "Retrying..." : "Retry"}
        </Button>
      </main>
    );
  }

  if (!session.data) {
    return <LoadingState message="Verifying your session..." />;
  }

  return children;
}
