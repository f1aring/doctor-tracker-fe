import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types";
import type { DashboardData } from "@/features/dashboard/types/dashboard.types";

export const dashboardService = {
  async getDashboard() {
    const { data } = await apiClient.get<ApiResponse<DashboardData>>(
      "/dashboard",
    );

    return data.data;
  },
};
