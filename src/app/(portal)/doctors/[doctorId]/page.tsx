import Link from "next/link";

export default async function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = await params;

  return (
    <section>
      <Link className="text-sm font-medium text-primary hover:underline" href="/doctors">
        Back to doctors
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">Doctor details</h1>
      <p className="mt-2 text-text-secondary">
        Doctor record: <span className="font-medium text-text-primary">{doctorId}</span>
      </p>
      <p className="mt-4 text-sm text-text-secondary">
        Doctor data will be displayed here when connected to the data service.
      </p>
    </section>
  );
}
