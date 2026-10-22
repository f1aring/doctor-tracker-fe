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

interface PatientFiltersProps {
  search: string;
  condition: string;
  onSearchChange: (value: string) => void;
  onConditionChange: (value: string) => void;
}

export function PatientFilters({
  search,
  condition,
  onSearchChange,
  onConditionChange,
}: PatientFiltersProps) {
  return (
    <FilterBar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search patients..."
      />

      <Select
        value={condition}
        onValueChange={(value) => onConditionChange(value ?? "all")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Conditions</SelectItem>
          <SelectItem value="Stable">Stable</SelectItem>
          <SelectItem value="Moderate">Moderate</SelectItem>
          <SelectItem value="Critical">Critical</SelectItem>
        </SelectContent>
      </Select>
    </FilterBar>
  );
}
