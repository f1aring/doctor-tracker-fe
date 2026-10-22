import type {
  ColumnDef,
  RowData,
} from "@tanstack/react-table";

import type {
  appTableFeatures,
} from "./table-features";

export interface DataTableProps<TData extends RowData> {
  data: TData[];

  columns: ColumnDef<typeof appTableFeatures, TData>[];

  emptyMessage?: string;
}