export default function DoctorDetailsLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading doctor details"
      className="space-y-4"
    >
      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      <div className="h-9 w-56 animate-pulse rounded bg-muted" />
      <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
    </div>
  );
}
