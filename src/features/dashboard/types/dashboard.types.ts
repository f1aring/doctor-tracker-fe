export interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  criticalPatients: number;
  averagePatientsPerDoctor: number;
}

export interface ConditionStat {
  condition: string;
  count: number;
}

export interface DoctorPatientStat {
  doctorName: string;
  patientCount: number;
}

export interface PatientGrowthStat {
  date: string;
  count: number;
}

export type PatientGrowthPeriod =
  | "7d"
  | "30d"
  | "90d"
  | "6m"
  | "1y"
  | "all";

export type PatientGrowthInterval =
  | "day"
  | "month"
  | "year";

export interface DashboardQueryParams {
  growthPeriod: PatientGrowthPeriod;
  growthInterval: PatientGrowthInterval;
}

export interface DashboardData {
  stats: DashboardStats;
  conditions: ConditionStat[];
  patientsPerDoctor: DoctorPatientStat[];
  patientGrowth: PatientGrowthStat[];
}
