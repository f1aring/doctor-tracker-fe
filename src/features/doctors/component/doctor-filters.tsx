"use client";

import { FilterBar } from "@/components/shared/filter-bar";
import { SearchInput } from "@/components/shared/search-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DoctorFiltersProps {
  search: string;
  specialization: string;
  hospital: string;

  onSearchChange: (value: string) => void;
  onSpecializationChange: (value: string) => void;
  onHospitalChange: (value: string) => void;
}

export function DoctorFilters({
  search,
  specialization,
  hospital,
  onSearchChange,
  onSpecializationChange,
  onHospitalChange,
}: DoctorFiltersProps) {
  return (
    <FilterBar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search doctors..."
      />

      <div className="flex flex-wrap gap-2">
        <Select
          value={specialization}
          onValueChange={(value) =>
            onSpecializationChange(value ?? "all")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            <SelectItem value="Cardiology">Cardiology</SelectItem>
            <SelectItem value="Neurology">Neurology</SelectItem>
            <SelectItem value="Dermatology">Dermatology</SelectItem>
            <SelectItem value="Pediatrics">Pediatrics</SelectItem>
            <SelectItem value="Orthopedics">Orthopedics</SelectItem>
            <SelectItem value="Family Medicine">Family Medicine</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={hospital}
          onValueChange={(value) =>
            onHospitalChange(value ?? "all")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Hospital" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Hospitals</SelectItem>
            <SelectItem value="Northside Medical Center">
              Northside Medical Center
            </SelectItem>
            <SelectItem value="Riverside Children's Hospital">
              Riverside Children&apos;s Hospital
            </SelectItem>
            <SelectItem value="Lakeshore Health Clinic">
              Lakeshore Health Clinic
            </SelectItem>
            <SelectItem value="University Health Pavilion">
              University Health Pavilion
            </SelectItem>
            <SelectItem value="Riverside Community Clinic">
              Riverside Community Clinic
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FilterBar>
  );
}