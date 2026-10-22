"use client";

import { useState } from "react";

import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/layout/page-header";

import { AddPatientDialog } from "./add-patient-dialog";
import { PatientFilters } from "./patient-filters";
import { PatientsTable } from "./patients-table";
import { usePatients } from "../hooks/use-patients";
import type { PatientCondition } from "../types/patient.types";

export function PatientsView() {
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState<
    PatientCondition | "all"
  >("all");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = usePatients({
    page: 1,
    limit: 10,
    search: search.trim() || undefined,
    condition: condition === "all" ? undefined : condition,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="View and manage patient records."
        actions={<AddPatientDialog />}
      />

      <PatientFilters
        search={search}
        condition={condition}
        onSearchChange={setSearch}
        onConditionChange={(value) => {
          if (
            value === "all" ||
            value === "Stable" ||
            value === "Moderate" ||
            value === "Critical"
          ) {
            setCondition(value);
          }
        }}
      />

      {isLoading ? (
        <LoadingState message="Loading patients..." />
      ) : isError ? (
        <ErrorState
          description="Unable to load patients."
          onRetry={() => {
            void refetch();
          }}
        />
      ) : data ? (
        <PatientsTable patients={data.data} />
      ) : null}
    </div>
  );
}
