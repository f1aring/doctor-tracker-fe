"use client";

import { useQuery } from "@tanstack/react-query";

import { patientService } from "@/services/patient.service";

import { patientKeys } from "../queries/patient-query-keys";
import type { PatientQueryParams } from "../types/patient.types";

export function usePatients(params: PatientQueryParams) {
  return useQuery({
    queryKey: patientKeys.list(params),
    queryFn: () => patientService.getAll(params),
  });
}
