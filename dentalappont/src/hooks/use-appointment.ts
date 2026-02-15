"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { AppointmentStatus } from "@prisma/client";

/* ===========================
   TYPES
=========================== */

export interface AppointmentDTO {
  id: string;
  date: string;
  time: string;
  reason: string | null;
  status: AppointmentStatus;
  patientName: string;
  patientEmail: string;
  doctorName: string;
  doctorId?: string;
}

export interface UpdateAppointmentInput {
  id: string;
  status: AppointmentStatus;
}

export interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

/* ===========================
   GET ALL APPOINTMENTS
=========================== */

export function useGetAppointments() {
  return useQuery<AppointmentDTO[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await fetch("/api/appointments");
      if (!res.ok) throw new Error("Failed to fetch appointments");
      return res.json();
    },
  });
}

/* ===========================
   BOOK APPOINTMENT
=========================== */

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BookAppointmentInput) => {
      const res = await fetch("/api/appointments", {
        method: "POST",
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to book appointment");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["userAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["bookedTimeSlots"] });
    },
  });
}

/* ===========================
   USER APPOINTMENTS
=========================== */

export function useUserAppointments() {
  return useQuery<AppointmentDTO[]>({
    queryKey: ["userAppointments"],
    queryFn: async () => {
      const res = await fetch("/api/user-appointments");
      if (!res.ok) throw new Error("Failed to fetch user appointments");
      return res.json();
    },
  });
}

/* ===========================
   UPDATE APPOINTMENT STATUS
=========================== */

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateAppointmentInput) => {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update appointment");

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["userAppointments"] });
    },
  });
}

/* ===========================
   BOOKED TIME SLOTS (FIXED)
=========================== */

export function useBookedTimeSlots(
  doctorId: string,
  date: string
) {
  return useQuery<string[]>({
    queryKey: ["bookedTimeSlots", doctorId, date],
    queryFn: async () => {
      if (!doctorId || !date) return [];

      const res = await fetch(
        `/api/appointments/booked-slots?doctorId=${doctorId}&date=${date}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch booked time slots");
      }

      return res.json();
    },
    enabled: !!doctorId && !!date,
  });
}
