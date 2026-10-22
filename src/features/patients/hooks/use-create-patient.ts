"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { patientService } from "@/services/patient.service";

import { patientKeys } from "../queries/patient-query-keys";

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patientService.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: patientKeys.all,
      });
      toast.success("Patient created successfully.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
