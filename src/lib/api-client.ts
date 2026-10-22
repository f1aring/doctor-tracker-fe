import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

export const apiClient = axios.create({
  baseURL: "/api/backend",

  withCredentials: true,

  timeout: 10_000,

  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: "/api/backend",
  withCredentials: true,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<void> | null = null;

function isAuthenticationEndpoint(url = "") {
  return ["/auth/login", "/auth/logout", "/auth/refresh"].some((endpoint) =>
    url.endsWith(endpoint),
  );
}

function redirectToLogin() {
  if (
    typeof window === "undefined" ||
    window.location.pathname === "/login"
  ) {
    return;
  }

  const loginUrl = new URL("/login", window.location.origin);
  loginUrl.searchParams.set(
    "redirect",
    `${window.location.pathname}${window.location.search}`,
  );
  window.location.replace(loginUrl);
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !request ||
      isAuthenticationEndpoint(request.url)
    ) {
      return Promise.reject(error);
    }

    if (request._retry) {
      redirectToLogin();
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post("/auth/refresh")
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;
      return await apiClient(request);
    } catch (refreshError) {
      const refreshStatus = axios.isAxiosError(refreshError)
        ? refreshError.response?.status
        : undefined;
      if (refreshStatus === 401 || refreshStatus === 403) {
        redirectToLogin();
      }
      return Promise.reject(refreshError);
    }
  },
);