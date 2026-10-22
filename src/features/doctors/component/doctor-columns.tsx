"use client";

import type {
  ColumnDef,
} from "@tanstack/react-table";

import {
  appTableFeatures,
} from "@/components/data-table/table-features";

import type {
  Doctor,
} from "../types/doctor.types";

import {
  DataTableColumnHeader,
} from "@/components/data-table/data-table-column-header";

import { DoctorRowActions } from "./doctor-row-actions";

export const doctorColumns: ColumnDef<
  typeof appTableFeatures,
  Doctor
>[] = [
  {
    accessorKey: "name",

    header: ({
      column,
    }) => (
      <DataTableColumnHeader
        title="Doctor"
        column={column}
      />
    ),

    cell: ({ row }) => (
      <div>
        <p className="font-medium">
          {row.original.name}
        </p>

        <p className="text-xs text-muted-foreground">
          {
            row.original
              .email
          }
        </p>
      </div>
    ),
  },

  {
    accessorKey:
      "specialization",

    header: ({
      column,
    }) => (
      <DataTableColumnHeader
        title="Specialization"
        column={column}
      />
    ),
  },

  {
    accessorKey: "hospital",

    header: ({
      column,
    }) => (
      <DataTableColumnHeader
        title="Hospital"
        column={column}
      />
    ),
  },

  {
    accessorKey:
      "patientCount",

    header: ({
      column,
    }) => (
      <DataTableColumnHeader
        title="Patients"
        column={column}
      />
    ),
  },

  {
    id: "actions",

    header: "",

    cell: ({ row }) => <DoctorRowActions doctor={row.original} />,
  },
];