"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patientService } from "@/services/patient.service";

import { patientKeys } from "../queries/patient-query-keys";
import type { UpdatePatientPayload } from "../types/patient.types";

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePatientPayload;
    }) => patientService.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: patientKeys.all,
      }),
  });
}
