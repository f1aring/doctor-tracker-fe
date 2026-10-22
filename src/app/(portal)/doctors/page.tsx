import { DoctorDetails } from "@/features/doctors/component/doctor-details";


interface DoctorPageProps {
  params: Promise<{
    doctorId: string;
  }>;
}

export default async function DoctorPage({
  params,
}: DoctorPageProps) {
  const {
    doctorId,
  } = await params;

  return (
    <DoctorDetails
      id={doctorId}
    />
  );
}