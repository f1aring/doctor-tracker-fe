import { DoctorDetails } from "@/features/doctors/component/doctor-details";

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = await params;

  return <DoctorDetails id={doctorId} />;
}