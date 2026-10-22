export type PatientCondition =
  | "Stable"
  | "Moderate"
  | "Critical";

export interface Patient {
  id: string;
  doctorId: string;
  name: string;
  email: string;
  phone: string;
  condition: PatientCondition;
  createdAt: string;
  updatedAt: string;
}

export interface PatientQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  doctorId?: string;
  condition?: PatientCondition;
  from?: string;
  to?: string;
}

export interface CreatePatientPayload {
  doctorId: string;
  name: string;
  email: string;
  phone: string;
  condition: PatientCondition;
}

export type UpdatePatientPayload =
  Partial<CreatePatientPayload>;