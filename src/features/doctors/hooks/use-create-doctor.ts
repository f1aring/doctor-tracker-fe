"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { doctorService } from "@/services/doctor.service";

import { doctorKeys } from "../queries/doctor-query-keys";

export function useCreateDoctor() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      doctorService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          doctorKeys.all,
      });
    },
  });
}