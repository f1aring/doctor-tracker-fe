import {
  Activity,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import type { DashboardStats as DashboardStatsType } from "../types/dashboard.types";

export function DashboardStats({
  stats,
}: {
  stats: DashboardStatsType;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Doctors"
        value={stats.totalDoctors}
        description="Registered doctors"
        icon={Stethoscope}
      />
      <StatCard
        title="Total Patients"
        value={stats.totalPatients}
        description="Registered patients"
        icon={Users}
      />
      <StatCard
        title="Critical Patients"
        value={stats.criticalPatients}
        description="Require attention"
        icon={Activity}
      />
      <StatCard
        title="Avg. Patients / Doctor"
        value={stats.averagePatientsPerDoctor}
        description="Average patient load"
        icon={UserRound}
      />
    </div>
  );
}
