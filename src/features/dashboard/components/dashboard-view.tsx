"use client";

import { ErrorState } from "@/components/feedback/error-state";
import { PageHeader } from "@/components/layout/page-header";

import { useDashboard } from "../hooks/use-dashboard";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { DashboardStats } from "./dashboard-stats";
import { PatientGrowthChart } from "./patient-growth-chart";
import { PatientsByConditionChart } from "./patients-by-condition-chart";
import { PatientsPerDoctorChart } from "./patients-per-doctor-chart";

export function DashboardView() {
  const dashboard = useDashboard();

  if (dashboard.isPending) {
    return <DashboardSkeleton />;
  }

  if (dashboard.isError || !dashboard.data) {
    return (
      <ErrorState
        description="Unable to load dashboard."
        onRetry={() => {
          void dashboard.refetch();
        }}
      />
    );
  }

  const data = dashboard.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of doctors and patients."
      />
      <DashboardStats stats={data.stats} />
      <PatientGrowthChart data={data.patientGrowth ?? []} />
      <div className="grid gap-6 lg:grid-cols-2">
        <PatientsByConditionChart data={data.conditions} />
        <PatientsPerDoctorChart data={data.patientsPerDoctor} />
      </div>
    </div>
  );
}
