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

export interface DashboardData {
  stats: DashboardStats;
  conditions: ConditionStat[];
  patientsPerDoctor: DoctorPatientStat[];
}
