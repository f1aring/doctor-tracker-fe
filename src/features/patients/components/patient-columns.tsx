"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import { appTableFeatures } from "@/components/data-table/table-features";

import { PatientConditionBadge } from "./patient-condition-badge";
import { DeletePatientDialog } from "./delete-patient-dialog";
import { EditPatientDialog } from "./edit-patient-dialog";
import type { Patient } from "../types/patient.types";

export const patientColumns: ColumnDef<
  typeof appTableFeatures,
  Patient
>[] = [
  {
    accessorKey: "name",
    header: "Patient",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => (
      <PatientConditionBadge condition={row.original.condition} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex flex-wrap gap-2">
          <Link
            className="inline-flex h-7 items-center justify-center rounded-button border border-border px-3 text-sm font-medium transition-colors hover:bg-muted"
            href={`/patients/${encodeURIComponent(patient.id)}`}
          >
            View
          </Link>
          <EditPatientDialog patient={patient} />
          <DeletePatientDialog id={patient.id} name={patient.name} />
        </div>
      );
    },
  },
];
