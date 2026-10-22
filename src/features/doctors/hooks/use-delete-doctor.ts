"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api-error";
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

    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({
        queryKey:
          doctorKeys.all,
      });
      queryClient.removeQueries({
        queryKey: doctorKeys.detail(id),
      });
      toast.success("Doctor deleted successfully.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}