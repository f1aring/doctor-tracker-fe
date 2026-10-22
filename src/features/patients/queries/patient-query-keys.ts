import type {
  PatientQueryParams,
} from "../types/patient.types";

export const patientKeys = {
  all: ["patients"] as const,

  lists: () =>
    [...patientKeys.all, "list"] as const,

  list: (params: PatientQueryParams) =>
    [...patientKeys.lists(), params] as const,

  details: () =>
    [...patientKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...patientKeys.details(), id] as const,
};