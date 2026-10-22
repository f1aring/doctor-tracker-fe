"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

interface DataTablePaginationProps {
  pageIndex: number;
  pageCount: number;

  canPreviousPage: boolean;
  canNextPage: boolean;

  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function DataTablePagination({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
}: DataTablePaginationProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <p className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of{" "}
        {pageCount || 1}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={
            !canPreviousPage
          }
          onClick={
            onPreviousPage
          }
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={!canNextPage}
          onClick={onNextPage}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}