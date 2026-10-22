import { apiClient } from "@/lib/api-client";

import type {
  ApiResponse,
  PaginatedResponse,
} from "@/types";

import type {
  CreateDoctorPayload,
  Doctor,
  DoctorQueryParams,
  UpdateDoctorPayload,
} from "@/features/doctors/types/doctor.types";

export const doctorService = {
  async getAll(params: DoctorQueryParams) {
    const { data } = await apiClient.get<
      ApiResponse<PaginatedResponse<Doctor>>
    >("/doctors", {
      params,
    });

    return data.data;
  },

  async getById(id: string) {
    const { data } = await apiClient.get<ApiResponse<Doctor>>(
      `/doctors/${id}`,
    );

    return data.data;
  },

  async create(payload: CreateDoctorPayload) {
    const { data } = await apiClient.post<ApiResponse<Doctor>>(
      "/doctors",
      payload,
    );

    return data.data;
  },

  async update(id: string, payload: UpdateDoctorPayload) {
    const { data } = await apiClient.patch<ApiResponse<Doctor>>(
      `/doctors/${id}`,
      payload,
    );

    return data.data;
  },

  async delete(id: string) {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/doctors/${id}`,
    );

    return data;
  },
};
