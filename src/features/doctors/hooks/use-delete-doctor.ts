"use client";

import axios from "axios";
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
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error(
          "This doctor still has assigned patients. Reassign or remove those patients before deleting the doctor.",
        );
        return;
      }

      toast.error(getApiErrorMessage(error));
    },
  });
}