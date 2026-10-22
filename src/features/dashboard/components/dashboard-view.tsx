"use client";

import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/layout/page-header";

import { useDashboard } from "../hooks/use-dashboard";
import { DashboardStats } from "./dashboard-stats";
import { PatientsByConditionChart } from "./patients-by-condition-chart";
import { PatientsPerDoctorChart } from "./patients-per-doctor-chart";

export function DashboardView() {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        description="Unable to load dashboard."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of doctors, patients and system activity."
      />
      <DashboardStats stats={data.stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <PatientsByConditionChart data={data.conditions} />
        <PatientsPerDoctorChart data={data.patientsPerDoctor} />
      </div>
    </div>
  );
}
