"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  useEffect(() => {
    if (session.data && !session.isError) {
      dispatch(setUser(session.data));
      return;
    }

    if (session.isError) {
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
    session.isError,
  ]);

  if (session.isPending || session.isError || !session.data) {
    return <LoadingState message="Verifying your session..." />;
  }

  return children;
}
