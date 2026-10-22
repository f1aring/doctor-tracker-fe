import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patients",
};

export default function PatientsPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Patients</h1>
      <p className="mt-2 text-text-secondary">
        Patient records will appear here when connected to the data service.
      </p>
      <div className="mt-8 rounded-card border border-dashed border-border-dark bg-surface p-8 text-center">
        <p className="font-medium">No patients to show yet</p>
        <p className="mt-2 text-sm text-text-secondary">
          Return to the dashboard to explore the available sections.
        </p>
        <Link
          className="mt-4 inline-flex font-medium text-primary hover:underline"
          href="/dashboard"
        >
          Go to dashboard
        </Link>
      </div>
    </section>
  );
}
