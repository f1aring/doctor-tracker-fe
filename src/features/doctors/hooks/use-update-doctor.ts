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

import type {
  UpdateDoctorPayload,
} from "../types/doctor.types";

interface UpdateDoctorVariables {
  id: string;
  data: UpdateDoctorPayload;
}

export function useUpdateDoctor() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateDoctorVariables) =>
      doctorService.update(
        id,
        data
      ),

    onSuccess: (
      _,
      variables
    ) => {
      queryClient.invalidateQueries({
        queryKey:
          doctorKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey:
          doctorKeys.detail(
            variables.id
          ),
      });
    },
  });
}