import {
  Plus,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  PageHeader,
} from "@/components/layout/page-header";

import {
  EmptyState,
} from "@/components/feedback/empty-state";

export default function DoctorsPage() {
  return (
    <div>
      <PageHeader
        title="Doctors"
        description="Manage doctors and their associated patients."
        actions={
          <Button>
            <Plus className="size-4" />

            Add Doctor
          </Button>
        }
      />

      <EmptyState
        title="No doctors found"
        description="Doctors will appear here once they are added."
      />
    </div>
  );
}