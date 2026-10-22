"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  doctorService,
} from "@/services/doctor.service";

import {
  doctorKeys,
} from "../queries/doctor-query-keys";

export function useDeleteDoctor() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string
    ) =>
      doctorService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          doctorKeys.all,
      });
    },
  });
}