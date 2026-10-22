"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDoctors } from "@/features/doctors/hooks/use-doctors";

import { useCreatePatient } from "../hooks/use-create-patient";
import {
  patientSchema,
  type PatientFormValues,
} from "../schemas/patient.schema";
import type { PatientCondition } from "../types/patient.types";

const conditions: PatientCondition[] = [
  "Stable",
  "Moderate",
  "Critical",
];

export function AddPatientDialog({
  doctorId,
}: {
  doctorId?: string;
}) {
  const [open, setOpen] = useState(false);
  const createPatient = useCreatePatient();
  const doctors = useDoctors({ page: 1, limit: 100 });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      doctorId: doctorId ?? "",
      name: "",
      email: "",
      phone: "",
      condition: "Stable",
    },
  });

  function onSubmit(values: PatientFormValues) {
    createPatient.mutate(values, {
      onSuccess: () => {
        reset({
          doctorId: doctorId ?? "",
          name: "",
          email: "",
          phone: "",
          condition: "Stable",
        });
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus aria-hidden="true" />
            Add Patient
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {doctorId ? (
            <input type="hidden" {...register("doctorId")} />
          ) : (
            <div className="space-y-2">
              <Label htmlFor="patient-doctor">Doctor</Label>
              <Controller
                control={control}
                name="doctorId"
                render={({ field }) => (
                  <Select
                    value={field.value || null}
                    onValueChange={(value) => field.onChange(value ?? "")}
                  >
                    <SelectTrigger
                      className="w-full"
                      id="patient-doctor"
                      aria-invalid={Boolean(errors.doctorId)}
                    >
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.data?.data.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {doctors.isLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading doctors...
                </p>
              )}
              {doctors.isError && (
                <p className="text-sm text-destructive" role="alert">
                  Unable to load doctors. Close and reopen this form to retry.
                </p>
              )}
              {errors.doctorId && (
                <p className="text-sm text-destructive">
                  {errors.doctorId.message}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="patient-name">Name</Label>
            <Input
              id="patient-name"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient-email">Email</Label>
            <Input
              id="patient-email"
              type="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient-phone">Phone</Label>
            <Input
              id="patient-phone"
              type="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient-condition">Condition</Label>
            <Controller
              control={control}
              name="condition"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    if (conditions.includes(value as PatientCondition)) {
                      field.onChange(value);
                    }
                  }}
                >
                  <SelectTrigger
                    className="w-full"
                    id="patient-condition"
                    aria-invalid={Boolean(errors.condition)}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.condition && (
              <p className="text-sm text-destructive">
                {errors.condition.message}
              </p>
            )}
          </div>

          <Button
            className="w-full"
            disabled={
              createPatient.isPending ||
              (!doctorId && (doctors.isLoading || doctors.isError))
            }
            type="submit"
          >
            {createPatient.isPending ? "Saving..." : "Save Patient"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
