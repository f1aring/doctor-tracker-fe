"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { getApiErrorMessage } from "@/lib/api-error";

import { useUpdatePatient } from "../hooks/use-update-patient";
import {
  patientSchema,
  type PatientFormValues,
} from "../schemas/patient.schema";
import type { Patient, PatientCondition } from "../types/patient.types";

const conditions: PatientCondition[] = [
  "Stable",
  "Moderate",
  "Critical",
];

export function EditPatientDialog({ patient }: { patient: Patient }) {
  const [open, setOpen] = useState(false);
  const updatePatient = useUpdatePatient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      doctorId: patient.doctorId,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      condition: patient.condition,
    },
  });

  async function onSubmit(values: PatientFormValues) {
    try {
      await updatePatient.mutateAsync({
        id: patient.id,
        data: values,
      });
      toast.success("Patient updated");
      setOpen(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" variant="outline">
            Edit
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" {...register("doctorId")} />
          <div className="space-y-2">
            <Label htmlFor={`edit-patient-name-${patient.id}`}>Name</Label>
            <Input
              id={`edit-patient-name-${patient.id}`}
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`edit-patient-email-${patient.id}`}>Email</Label>
            <Input
              id={`edit-patient-email-${patient.id}`}
              type="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`edit-patient-phone-${patient.id}`}>Phone</Label>
            <Input
              id={`edit-patient-phone-${patient.id}`}
              type="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`edit-patient-condition-${patient.id}`}>
              Condition
            </Label>
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
                    id={`edit-patient-condition-${patient.id}`}
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
            disabled={updatePatient.isPending}
            type="submit"
          >
            {updatePatient.isPending ? "Updating..." : "Update Patient"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
