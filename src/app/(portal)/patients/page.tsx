import {
  Users,
} from "lucide-react";

import {
  PageHeader,
} from "@/components/layout/page-header";

import {
  EmptyState,
} from "@/components/feedback/empty-state";

export default function PatientsPage() {
  return (
    <div>
      <PageHeader
        title="Patients"
        description="View and manage patient records."
      />

      <EmptyState
        title="No patients found"
        description="Patient records will appear here."
        icon={Users}
      />
    </div>
  );
}