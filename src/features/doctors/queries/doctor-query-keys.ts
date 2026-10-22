import type {
  DoctorQueryParams,
} from "../types/doctor.types";

export const doctorKeys = {
  all: ["doctors"] as const,

  lists: () =>
    [...doctorKeys.all, "list"] as const,

  list: (
    params: DoctorQueryParams
  ) =>
    [
      ...doctorKeys.lists(),
      params,
    ] as const,

  details: () =>
    [
      ...doctorKeys.all,
      "detail",
    ] as const,

  detail: (id: string) =>
    [
      ...doctorKeys.details(),
      id,
    ] as const,
};