import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Phone is required"),
  doctorId: z.string().min(1, "Doctor is required"),
  condition: z.enum(["Stable", "Moderate", "Critical"]),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
