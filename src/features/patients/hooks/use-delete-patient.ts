"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patientService } from "@/services/patient.service";

import { patientKeys } from "../queries/patient-query-keys";

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: patientKeys.all,
      }),
  });
}
