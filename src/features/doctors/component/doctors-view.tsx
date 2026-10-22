"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";

import { DoctorFilters } from "./doctor-filters";
import { DoctorsTable } from "./doctors-table";

import { mockDoctors } from "../data/mock-doctors";

export function DoctorsView() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [hospital, setHospital] = useState("all");

  const doctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.email.toLowerCase().includes(search.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialization =
        specialization === "all" ||
        doctor.specialization === specialization;

      const matchesHospital =
        hospital === "all" ||
        doctor.hospital === hospital;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesHospital
      );
    });
  }, [search, specialization, hospital]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors"
        description="Manage doctors and their patients."
        actions={
          <Button>
            <Plus className="size-4" />
            Add Doctor
          </Button>
        }
      />

      <DoctorFilters
        search={search}
        specialization={specialization}
        hospital={hospital}
        onSearchChange={setSearch}
        onSpecializationChange={setSpecialization}
        onHospitalChange={setHospital}
      />

      <DoctorsTable doctors={doctors} />
    </div>
  );
}