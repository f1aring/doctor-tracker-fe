export type PatientCondition =
  | "stable"
  | "moderate"
  | "critical";

export interface Patient {
  id: string;

  doctorId: string;

  name: string;

  email?: string;

  phone?: string;

  condition: PatientCondition;

  dateOfBirth?: string;

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