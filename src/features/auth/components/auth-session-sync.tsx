"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import {
  clearUser,
  setUser,
} from "@/store/slices/auth-slice";

import { useMe } from "../hooks/use-me";

export function AuthSessionSync() {
  const dispatch = useAppDispatch();
  const { data, isError } = useMe();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    } else if (isError) {
      dispatch(clearUser());
    }
  }, [data, dispatch, isError]);

  return null;
}
