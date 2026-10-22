"use client";

import { useState } from "react";

import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/layout/page-header";

import { DoctorFilters } from "./doctor-filters";
import { DoctorsTable } from "./doctors-table";
import { AddDoctorDialog } from "./add-doctor-dialog";
import { useDoctors } from "../hooks/use-doctors";

export function DoctorsView() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [hospital, setHospital] = useState("all");
  const doctors = useDoctors({
    page: 1,
    limit: 100,
    search: search.trim() || undefined,
    specialization: specialization === "all" ? undefined : specialization,
    hospital: hospital === "all" ? undefined : hospital,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors"
        description="Manage doctors and their patients."
        actions={<AddDoctorDialog />}
      />

      <DoctorFilters
        search={search}
        specialization={specialization}
        hospital={hospital}
        onSearchChange={setSearch}
        onSpecializationChange={setSpecialization}
        onHospitalChange={setHospital}
      />

      {doctors.isPending ? (
        <LoadingState message="Loading doctors..." />
      ) : doctors.isError ? (
        <ErrorState
          description="Unable to load doctors."
          onRetry={() => {
            void doctors.refetch();
          }}
        />
      ) : (
        <DoctorsTable doctors={doctors.data.data} />
      )}
    </div>
  );
}