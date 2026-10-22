"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
import { doctorService } from "@/services/doctor.service";

import { doctorKeys } from "../queries/doctor-query-keys";

export function useCreateDoctor() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      doctorService.create,

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey:
          doctorKeys.all,
      });
      toast.success("Doctor created successfully.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}