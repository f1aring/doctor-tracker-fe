"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

import { useCreateDoctor } from "../hooks/use-create-doctor";
import {
  doctorSchema,
  type DoctorFormValues,
} from "../schemas/doctor.schema";

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Family Medicine",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
];

export function AddDoctorDialog() {
  const [open, setOpen] = useState(false);
  const createDoctor = useCreateDoctor();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      specialization: "",
      hospital: "",
      phone: "",
      email: "",
    },
  });

  const isPending = isSubmitting || createDoctor.isPending;

  async function onSubmit(values: DoctorFormValues) {
    try {
      await createDoctor.mutateAsync(values);
      toast.success("Doctor added successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && isPending) {
      return;
    }

    setOpen(nextOpen);
    if (!nextOpen) {
      reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button type="button">
            <Plus aria-hidden="true" className="size-4" />
            Add Doctor
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Doctor</DialogTitle>
          <DialogDescription>
            Enter the doctor&apos;s information below.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Label htmlFor="doctor-name">Name</Label>
            <Input
              autoComplete="name"
              id="doctor-name"
              placeholder="Dr. Jordan Lee"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? "doctor-name-error" : undefined
              }
              {...register("name")}
            />
            {errors.name && (
              <p
                className="text-sm text-destructive"
                id="doctor-name-error"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-specialization">
              Specialization
            </Label>
            <Controller
              control={control}
              name="specialization"
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? "")}
                >
                  <SelectTrigger
                    id="doctor-specialization"
                    onBlur={field.onBlur}
                    aria-invalid={Boolean(errors.specialization)}
                    aria-describedby={
                      errors.specialization
                        ? "doctor-specialization-error"
                        : undefined
                    }
                  >
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALIZATIONS.map((specialization) => (
                      <SelectItem
                        key={specialization}
                        value={specialization}
                      >
                        {specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.specialization && (
              <p
                className="text-sm text-destructive"
                id="doctor-specialization-error"
              >
                {errors.specialization.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-hospital">Hospital</Label>
            <Input
              autoComplete="organization"
              id="doctor-hospital"
              placeholder="Northside Medical Center"
              aria-invalid={Boolean(errors.hospital)}
              aria-describedby={
                errors.hospital ? "doctor-hospital-error" : undefined
              }
              {...register("hospital")}
            />
            {errors.hospital && (
              <p
                className="text-sm text-destructive"
                id="doctor-hospital-error"
              >
                {errors.hospital.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-phone">Phone</Label>
            <Input
              autoComplete="tel"
              id="doctor-phone"
              placeholder="+1 403 555 0101"
              type="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "doctor-phone-error" : undefined
              }
              {...register("phone")}
            />
            {errors.phone && (
              <p
                className="text-sm text-destructive"
                id="doctor-phone-error"
              >
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-email">Email</Label>
            <Input
              autoComplete="email"
              id="doctor-email"
              placeholder="doctor@example.com"
              type="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "doctor-email-error" : undefined
              }
              {...register("email")}
            />
            {errors.email && (
              <p
                className="text-sm text-destructive"
                id="doctor-email-error"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? "Saving..." : "Save Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
