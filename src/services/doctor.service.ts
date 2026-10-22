import {
  apiClient,
} from "@/lib/api-client";

import type {
  ApiResponse,
  PaginatedResponse,
} from "@/types";

import type {
  Doctor,
  DoctorQueryParams,
} from "@/features/doctors/types/doctor.types";

export const doctorService = {
  async getAll(
    params: DoctorQueryParams
  ) {
    const response =
      await apiClient.get<
        ApiResponse<
          PaginatedResponse<Doctor>
        >
      >("/doctors", {
        params,
      });

    return response.data.data;
  },

  async getById(id: string) {
    const response =
      await apiClient.get<
        ApiResponse<Doctor>
      >(`/doctors/${id}`);

    return response.data.data;
  },
};