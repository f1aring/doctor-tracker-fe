"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { authService } from "@/services/auth.service";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/auth-slice";

function getSafeRedirect(value: string | null) {
  if (value?.startsWith("/") && !value.startsWith("//")) {
    const target = new URL(value, "http://doctor-tracker.local");
    const isProtectedRoute = ["/dashboard", "/doctors", "/patients"].some(
      (route) =>
        target.pathname === route ||
        target.pathname.startsWith(`${route}/`),
    );

    if (isProtectedRoute) {
      return `${target.pathname}${target.search}${target.hash}`;
    }
  }

  return "/dashboard";
}

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      dispatch(setUser(user));
      toast.success("Login successful");
      router.replace(
        getSafeRedirect(searchParams.get("redirect")),
      );
      router.refresh();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
