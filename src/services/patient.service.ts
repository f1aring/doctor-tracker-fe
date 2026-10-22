import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
} from "@/types";

import type {
  Patient,
  PatientQueryParams,
  CreatePatientPayload,
  UpdatePatientPayload,
} from "@/features/patients/types/patient.types";

export const patientService = {
  async getAll(params: PatientQueryParams) {
    const { data } = await apiClient.get<
      ApiResponse<PaginatedResponse<Patient>>
    >("/patients", { params });

    return data.data;
  },

  async getById(id: string) {
    const { data } = await apiClient.get<
      ApiResponse<Patient>
    >(`/patients/${id}`);

    return data.data;
  },

  async create(payload: CreatePatientPayload) {
    const { data } = await apiClient.post<
      ApiResponse<Patient>
    >("/patients", payload);

    return data.data;
  },

  async update(
    id: string,
    payload: UpdatePatientPayload
  ) {
    const { data } = await apiClient.patch<
      ApiResponse<Patient>
    >(`/patients/${id}`, payload);

    return data.data;
  },

  async delete(id: string) {
    const { data } = await apiClient.delete<
      ApiResponse<null>
    >(`/patients/${id}`);

    return data;
  },
};