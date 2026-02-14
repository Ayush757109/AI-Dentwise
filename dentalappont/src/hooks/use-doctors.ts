"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { Gender } from "@prisma/client";

/* ===========================
   TYPES
=========================== */

export interface DoctorDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  speciality: string;
  bio: string | null;
  imageUrl: string;
  gender: Gender;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  appointmentCount?: number;
}

export interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

export interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

/* ===========================
   GET ALL DOCTORS
=========================== */

export function useGetDoctors() {
  return useQuery<DoctorDTO[], Error>({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors");

      if (!res.ok) {
        throw new Error("Failed to fetch doctors");
      }

      return res.json();
    },
  });
}

/* ===========================
   GET AVAILABLE DOCTORS
=========================== */

export function useAvailableDoctors() {
  return useQuery<DoctorDTO[], Error>({
    queryKey: ["availableDoctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors?available=true");

      if (!res.ok) {
        throw new Error("Failed to fetch available doctors");
      }

      return res.json();
    },
  });
}

/* ===========================
   CREATE DOCTOR
=========================== */

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation<DoctorDTO, Error, CreateDoctorInput>({
    mutationFn: async (input) => {
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error("Failed to create doctor");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["availableDoctors"] });
    },
  });
}

/* ===========================
   UPDATE DOCTOR
=========================== */

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation<DoctorDTO, Error, UpdateDoctorInput>({
    mutationFn: async (input) => {
      const res = await fetch("/api/doctors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error("Failed to update doctor");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["availableDoctors"] });
    },
  });
}
