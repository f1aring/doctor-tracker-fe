export default function DashboardLoading() {
  return (
    <div aria-busy="true" aria-label="Loading dashboard" className="space-y-4">
      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      <div className="h-9 w-48 animate-pulse rounded bg-muted" />
      <div className="grid gap-4 pt-4 sm:grid-cols-2">
        <div className="h-32 animate-pulse rounded-card bg-muted" />
        <div className="h-32 animate-pulse rounded-card bg-muted" />
      </div>
    </div>
  );
}
