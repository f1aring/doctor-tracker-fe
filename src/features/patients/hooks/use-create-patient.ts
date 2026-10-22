"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patientService } from "@/services/patient.service";

import { patientKeys } from "../queries/patient-query-keys";

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patientService.create,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: patientKeys.all,
      }),
  });
}
