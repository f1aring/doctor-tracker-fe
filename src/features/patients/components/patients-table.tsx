"use client";

import { DataTable } from "@/components/data-table/data-table";

import { patientColumns } from "./patient-columns";
import type { Patient } from "../types/patient.types";

export function PatientsTable({
  patients,
}: {
  patients: Patient[];
}) {
  return (
    <DataTable
      data={patients}
      columns={patientColumns}
      emptyMessage="No patients found."
    />
  );
}
