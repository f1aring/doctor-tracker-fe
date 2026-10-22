"use client";

import { useQuery } from "@tanstack/react-query";

import { patientService } from "@/services/patient.service";

import { patientKeys } from "../queries/patient-query-keys";

export function usePatient(id: string) {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: () => patientService.getById(id),
    enabled: Boolean(id),
  });
}
