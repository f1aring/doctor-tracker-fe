import Link from "next/link";

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;

  return (
    <section>
      <Link className="text-sm font-medium text-primary hover:underline" href="/patients">
        Back to patients
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">Patient details</h1>
      <p className="mt-2 text-text-secondary">
        Patient record: <span className="font-medium text-text-primary">{patientId}</span>
      </p>
      <p className="mt-4 text-sm text-text-secondary">
        Patient data will be displayed here when connected to the data service.
      </p>
    </section>
  );
}
