import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const sections = [
  {
    href: "/doctors",
    title: "Doctors",
    description: "Browse and manage doctor profiles.",
  },
  {
    href: "/patients",
    title: "Patients",
    description: "Browse and manage patient records.",
  },
];

export default function DashboardPage() {
  return (
    <section>
      <p className="text-sm font-medium text-primary">Overview</p>
      <h1 className="mt-2 text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-text-secondary">
        Welcome to Doctor Tracker. Choose a section to get started.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            className="rounded-card border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-modal"
            href={section.href}
            key={section.href}
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
