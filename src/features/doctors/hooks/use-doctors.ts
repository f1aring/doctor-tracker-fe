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

import type {
  DoctorQueryParams,
} from "../types/doctor.types";

export function useDoctors(
  params: DoctorQueryParams
) {
  return useQuery({
    queryKey:
      doctorKeys.list(params),

    queryFn: () =>
      doctorService.getAll(params),

    placeholderData: (
      previousData
    ) => previousData,
  });
}