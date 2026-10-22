"use client";

import {
  DataTable,
} from "@/components/data-table/data-table";

import {
  doctorColumns,
} from "./doctor-columns";

import type {
  Doctor,
} from "../types/doctor.types";

interface DoctorsTableProps {
  doctors: Doctor[];
}

export function DoctorsTable({
  doctors,
}: DoctorsTableProps) {
  return (
    <DataTable
      data={doctors}
      columns={doctorColumns}
      emptyMessage="No doctors found."
    />
  );
}