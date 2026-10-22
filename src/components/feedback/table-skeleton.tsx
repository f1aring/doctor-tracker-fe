import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div
      className="space-y-3 rounded-xl border bg-card p-4"
      role="status"
      aria-label="Loading table"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
      <span className="sr-only">Loading table data...</span>
    </div>
  );
}
