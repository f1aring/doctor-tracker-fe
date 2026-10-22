"use client";

import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

interface DataTableColumnHeaderProps {
  title: string;

  column: {
    getIsSorted: () =>
      | false
      | "asc"
      | "desc";

    toggleSorting: (
      desc?: boolean
    ) => void;
  };
}

export function DataTableColumnHeader({
  title,
  column,
}: DataTableColumnHeaderProps) {
  const sorting =
    column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className="-ml-3 h-8"
      onClick={() =>
        column.toggleSorting(
          sorting === "asc"
        )
      }
    >
      {title}

      {sorting === "desc" ? (
        <ArrowDown className="ml-2 size-4" />
      ) : sorting === "asc" ? (
        <ArrowUp className="ml-2 size-4" />
      ) : (
        <ChevronsUpDown className="ml-2 size-4" />
      )}
    </Button>
  );
}