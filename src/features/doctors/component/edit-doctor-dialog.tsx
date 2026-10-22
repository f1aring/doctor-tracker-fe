"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
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

import { useUpdateDoctor } from "../hooks/use-update-doctor";
import {
  doctorSchema,
  type DoctorFormValues,
} from "../schemas/doctor.schema";
import type { Doctor } from "../types/doctor.types";

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Family Medicine",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
];

interface EditDoctorDialogProps {
  doctor: Doctor;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

export function EditDoctorDialog({
  doctor,
  open: controlledOpen,
  onOpenChange,
  showTrigger = true,
}: EditDoctorDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const updateDoctor = useUpdateDoctor();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      phone: doctor.phone,
      email: doctor.email,
    },
  });

  const isPending = isSubmitting || updateDoctor.isPending;

  useEffect(() => {
    if (open) {
      reset({
        name: doctor.name,
        specialization: doctor.specialization,
        hospital: doctor.hospital,
        phone: doctor.phone,
        email: doctor.email,
      });
    }
  }, [doctor, open, reset]);

  async function onSubmit(values: DoctorFormValues) {
    try {
      await updateDoctor.mutateAsync({
        id: doctor.id,
        data: values,
      });
      toast.success("Doctor updated successfully");
      handleOpenChange(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && isPending) {
      return;
    }

    if (controlledOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {showTrigger && (
        <DialogTrigger
          render={
            <Button type="button" variant="outline">
              <Pencil aria-hidden="true" className="size-4" />
              Edit Doctor
            </Button>
          }
        />
      )}

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>
            Update {doctor.name}&apos;s information.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Label htmlFor="edit-doctor-name">Name</Label>
            <Input
              id="edit-doctor-name"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-specialization">
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
                    id="edit-doctor-specialization"
                    onBlur={field.onBlur}
                    aria-invalid={Boolean(errors.specialization)}
                  >
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALIZATIONS.map((specialization) => (
                      <SelectItem key={specialization} value={specialization}>
                        {specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.specialization && (
              <p className="text-sm text-destructive">
                {errors.specialization.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-hospital">Hospital</Label>
            <Input
              id="edit-doctor-hospital"
              aria-invalid={Boolean(errors.hospital)}
              {...register("hospital")}
            />
            {errors.hospital && (
              <p className="text-sm text-destructive">
                {errors.hospital.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-phone">Phone</Label>
            <Input
              id="edit-doctor-phone"
              type="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-doctor-email">Email</Label>
            <Input
              id="edit-doctor-email"
              type="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
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
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
