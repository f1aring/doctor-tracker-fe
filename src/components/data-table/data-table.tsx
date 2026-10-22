"use client";

import {
  useTable,
  type RowData,
} from "@tanstack/react-table";

import {
  appTableFeatures,
} from "./table-features";

import type {
  DataTableProps,
} from "./data-table.types";

import {
  DataTablePagination,
} from "./data-table-pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable<TData extends RowData>({
  data,
  columns,
  emptyMessage = "No results found.",
}: DataTableProps<TData>) {
  const table = useTable<typeof appTableFeatures, TData>({
    features: appTableFeatures,

    data,

    columns,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  const pagination =
    table.state.pagination;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table
                .getHeaderGroups()
                .map(
                  (
                    headerGroup
                  ) => (
                    <TableRow
                      key={
                        headerGroup.id
                      }
                    >
                      {headerGroup.headers.map(
                        (
                          header
                        ) => (
                          <TableHead
                            key={
                              header.id
                            }
                          >
                            {header.isPlaceholder
                              ? null
                              : <table.FlexRender header={header} />}
                          </TableHead>
                        )
                      )}
                    </TableRow>
                  )
                )}
            </TableHeader>

            <TableBody>
              {table
                .getRowModel()
                .rows.length ? (
                table
                  .getRowModel()
                  .rows.map(
                    (row) => (
                      <TableRow
                        key={
                          row.id
                        }
                      >
                        {row
                          .getAllCells()
                          .map(
                            (
                              cell
                            ) => (
                              <TableCell
                                key={
                                  cell.id
                                }
                              >
                                <table.FlexRender cell={cell} />
                              </TableCell>
                            )
                          )}
                      </TableRow>
                    )
                  )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      columns.length
                    }
                    className="h-32 text-center text-muted-foreground"
                  >
                    {
                      emptyMessage
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DataTablePagination
        pageIndex={
          pagination.pageIndex
        }
        pageCount={
          table.getPageCount()
        }
        canPreviousPage={
          table.getCanPreviousPage()
        }
        canNextPage={
          table.getCanNextPage()
        }
        onPreviousPage={() =>
          table.previousPage()
        }
        onNextPage={() =>
          table.nextPage()
        }
      />
    </div>
  );
}