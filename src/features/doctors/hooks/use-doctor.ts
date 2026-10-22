"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  doctorService,
} from "@/services/doctor.service";

import {
  doctorKeys,
} from "../queries/doctor-query-keys";

export function useDoctor(
  id: string
) {
  return useQuery({
    queryKey:
      doctorKeys.detail(id),

    queryFn: () =>
      doctorService.getById(id),

    enabled: Boolean(id),
  });
}