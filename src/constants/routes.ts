export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/login",
  },

  DASHBOARD: "/dashboard",

  DOCTORS: {
    ROOT: "/doctors",
    DETAIL: (id: string) => `/doctors/${id}`,
  },

  PATIENTS: {
    ROOT: "/patients",
    DETAIL: (id: string) => `/patients/${id}`,
  },
} as const;