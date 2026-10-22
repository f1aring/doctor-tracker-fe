"use client";

import { Activity, Mail, Phone } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/layout/page-header";

import { usePatient } from "../hooks/use-patient";
import { PatientConditionBadge } from "./patient-condition-badge";

export function PatientDetails({ id }: { id: string }) {
  const {
    data: patient,
    isLoading,
    isError,
    refetch,
  } = usePatient(id);

  if (isLoading) {
    return <LoadingState message="Loading patient..." />;
  }

  if (isError || !patient) {
    return (
      <ErrorState
        description="Unable to load patient."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={patient.name}
        description="Patient information"
      />

      <Card>
        <CardHeader>
          <CardTitle>Patient Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <div className="mt-1 flex items-center gap-2">
              <Mail aria-hidden="true" className="size-4 text-primary" />
              <a className="break-all hover:underline" href={`mailto:${patient.email}`}>
                {patient.email}
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <div className="mt-1 flex items-center gap-2">
              <Phone aria-hidden="true" className="size-4 text-primary" />
              <a href={`tel:${patient.phone}`}>{patient.phone}</a>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Condition</p>
            <div className="mt-2 flex items-center gap-2">
              <Activity aria-hidden="true" className="size-4 text-primary" />
              <PatientConditionBadge condition={patient.condition} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
