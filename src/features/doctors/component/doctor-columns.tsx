"use client";

import Link from "next/link";

import type {
  ColumnDef,
} from "@tanstack/react-table";

import {
  appTableFeatures,
} from "@/components/data-table/table-features";

import {
  MoreHorizontal,
} from "lucide-react";

import type {
  Doctor,
} from "../types/doctor.types";

import {
  ROUTES,
} from "@/constants/routes";

import {
  DataTableColumnHeader,
} from "@/components/data-table/data-table-column-header";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

    cell: ({ row }) => {
      const doctor =
        row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Actions for ${doctor.name}`}
              />
            }
          >
            <MoreHorizontal
              aria-hidden="true"
              className="size-4"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
          >
            <DropdownMenuLabel>
              Actions
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              render={
                <Link
                  href={ROUTES.DOCTORS.DETAIL(
                    doctor.id
                  )}
                />
              }
            >
              View Doctor
            </DropdownMenuItem>

            <DropdownMenuItem>
              Edit Doctor
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete Doctor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];