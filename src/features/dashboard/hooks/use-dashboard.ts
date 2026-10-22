"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "@/services/dashboard.service";
import type { DashboardQueryParams } from "../types/dashboard.types";

export function useDashboard(params: DashboardQueryParams) {
  return useQuery({
    queryKey: ["dashboard", params],
    queryFn: () => dashboardService.getDashboard(params),
    placeholderData: (previousData) => previousData,
  });
}
