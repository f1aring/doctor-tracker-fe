import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(2, "Name is required"),

  specialization: z
    .string()
    .min(1, "Specialization is required"),

  hospital: z
    .string()
    .min(2, "Hospital is required"),

  phone: z
    .string()
    .min(8, "Phone number is required"),

  email: z
    .string()
    .email("Enter a valid email"),
});

export type DoctorFormValues =
  z.infer<typeof doctorSchema>;