import {
  Stethoscope,
  Users,
  Activity,
  HeartPulse,
} from "lucide-react";

import {
  PageHeader,
} from "@/components/layout/page-header";

import {
  StatCard,
} from "@/components/shared/stat-card";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your doctors and patients."
      />

      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Doctors"
          value="24"
          description="Active doctors"
          icon={Stethoscope}
        />

        <StatCard
          title="Total Patients"
          value="1,284"
          description="Registered patients"
          icon={Users}
        />

        <StatCard
          title="Active Patients"
          value="1,120"
          description="Currently active"
          icon={Activity}
        />

        <StatCard
          title="Critical Patients"
          value="18"
          description="Requires attention"
          icon={HeartPulse}
        />
      </div>
    </div>
  );
}