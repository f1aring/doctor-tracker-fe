"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { patientService } from "@/services/patient.service";

import { patientKeys } from "../queries/patient-query-keys";

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: patientKeys.all,
      });
      toast.success("Patient deleted successfully.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
