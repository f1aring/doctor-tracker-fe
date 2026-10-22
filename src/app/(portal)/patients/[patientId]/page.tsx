import { PatientDetails } from "@/features/patients/components/patient-details";

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;

  return <PatientDetails id={patientId} />;
}
