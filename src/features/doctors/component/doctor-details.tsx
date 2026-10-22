"use client";

import {
  Mail,
  Phone,
  Hospital,
  Stethoscope,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  LoadingState,
} from "@/components/feedback/loading-state";

import {
  ErrorState,
} from "@/components/feedback/error-state";

import {
  PageHeader,
} from "@/components/layout/page-header";

import {
  useDoctor,
} from "../hooks/use-doctor";

import {
  EditDoctorDialog,
} from "./edit-doctor-dialog";

interface DoctorDetailsProps {
  id: string;
}

export function DoctorDetails({
  id,
}: DoctorDetailsProps) {
  const {
    data: doctor,
    isLoading,
    isError,
    refetch,
  } = useDoctor(id);

  if (isLoading) {
    return (
      <LoadingState message="Loading doctor..." />
    );
  }

  if (
    isError ||
    !doctor
  ) {
    return (
      <ErrorState
        description="Unable to load doctor."
        onRetry={() =>
          refetch()
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={doctor.name}
        description={
          doctor.specialization
        }
        actions={
          <EditDoctorDialog
            doctor={doctor}
          />
        }
      />

      <div
        className="
          grid
          gap-6
          lg:grid-cols-3
        "
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              Doctor Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">
            <Info
              icon={Stethoscope}
              label="Specialization"
              value={
                doctor.specialization
              }
            />

            <Info
              icon={Hospital}
              label="Hospital"
              value={
                doctor.hospital
              }
            />

            <Info
              icon={Phone}
              label="Phone"
              value={
                doctor.phone
              }
            />

            <Info
              icon={Mail}
              label="Email"
              value={
                doctor.email
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Patients
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="size-8 text-primary" />

              <div>
                <p className="text-3xl font-semibold">
                  {
                    doctor.patientCount
                  }
                </p>

                <p className="text-sm text-muted-foreground">
                  Total patients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-5 text-primary" />

      <div>
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}