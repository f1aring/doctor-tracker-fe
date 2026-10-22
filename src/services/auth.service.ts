import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types";
import type { AuthUser } from "@/store/slices/auth-slice";

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<ApiResponse<AuthUser>>(
      "/auth/login",
      payload,
    );

    return data.data;
  },

  async me() {
    const { data } =
      await apiClient.get<ApiResponse<AuthUser>>("/auth/me");

    return data.data;
  },

  async logout() {
    await apiClient.post("/auth/logout");
  },
};
