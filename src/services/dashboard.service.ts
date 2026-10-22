import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types";
import type {
  DashboardData,
  DashboardQueryParams,
} from "@/features/dashboard/types/dashboard.types";

export const dashboardService = {
  async getDashboard(params: DashboardQueryParams) {
    const { data } = await apiClient.get<ApiResponse<DashboardData>>(
      "/dashboard",
      { params },
    );

    return data.data;
  },
};
