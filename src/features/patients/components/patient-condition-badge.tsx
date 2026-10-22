import { Badge } from "@/components/ui/badge";

import type { PatientCondition } from "../types/patient.types";

export function PatientConditionBadge({
  condition,
}: {
  condition: PatientCondition;
}) {
  if (condition === "Critical") {
    return <Badge variant="destructive">Critical</Badge>;
  }

  if (condition === "Moderate") {
    return (
      <Badge className="bg-warning text-text-primary">
        Moderate
      </Badge>
    );
  }

  return <Badge className="bg-success text-white">Stable</Badge>;
}
