"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import {
  AppointmentStatus,
  Prisma,
} from "@prisma/client";

/* ===========================
   TYPES
=========================== */

type AppointmentWithRelations =
  Prisma.AppointmentGetPayload<{
    include: {
      user: {
        select: {
          firstName: true;
          lastName: true;
          email: true;
        };
      };
      doctor: {
        select: {
          name: true;
          imageUrl: true;
        };
      };
    };
  }>;

interface TransformedAppointment {
  id: string;
  date: string;
  time: string;
  reason: string | null;
  status: AppointmentStatus;
  patientName: string;
  patientEmail: string;
  doctorName: string;
  doctorImageUrl: string;
}

/* ===========================
   TRANSFORM FUNCTION
=========================== */

function transformAppointment(
  appointment: AppointmentWithRelations
): TransformedAppointment {
  return {
    id: appointment.id,
    date: appointment.date.toISOString().split("T")[0],
    time: appointment.time,
    reason: appointment.reason,
    status: appointment.status,
    patientName: `${appointment.user.firstName ?? ""} ${
      appointment.user.lastName ?? ""
    }`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl ?? "",
  };
}

/* ===========================
   GET ALL APPOINTMENTS
=========================== */

export async function getAppointments(): Promise<TransformedAppointment[]> {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
}

/* ===========================
   GET USER APPOINTMENTS
=========================== */

export async function getUserAppointments(): Promise<
  TransformedAppointment[]
> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to view appointments");
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error(
        "User not found. Please ensure your account is properly set up."
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to fetch user appointments");
  }
}

/* ===========================
   USER APPOINTMENT STATS
=========================== */

export async function getUserAppointmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) throw new Error("User not found");

    const [totalCount, completedCount] =
      await Promise.all([
        prisma.appointment.count({
          where: { userId: user.id },
        }),
        prisma.appointment.count({
          where: {
            userId: user.id,
            status: AppointmentStatus.COMPLETED,
          },
        }),
      ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalAppointments: 0,
      completedAppointments: 0,
    };
  }
}

/* ===========================
   GET BOOKED TIME SLOTS
=========================== */

export async function getBookedTimeSlots(
  doctorId: string,
  date: string
): Promise<string[]> {
  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: {
          gte: start,
          lt: end,
        },
        status: {
          in: [
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.COMPLETED,
          ],
        },
      },
      select: { time: true },
    });

    return appointments.map((a) => a.time);
  } catch (error) {
    console.error("Error fetching booked time slots:", error);
    return [];
  }
}

/* ===========================
   BOOK APPOINTMENT
=========================== */

interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

export async function bookAppointment(
  input: BookAppointmentInput
): Promise<TransformedAppointment> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("You must be logged in to book an appointment");
    }

    if (!input.doctorId || !input.date || !input.time) {
      throw new Error("Doctor, date, and time are required");
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error(
        "User not found. Please ensure your account is properly set up."
      );
    }

    const appointment =
      await prisma.appointment.create({
        data: {
          userId: user.id,
          doctorId: input.doctorId,
          date: new Date(input.date),
          time: input.time,
          reason:
            input.reason?.trim() ||
            "General consultation",
          status: AppointmentStatus.CONFIRMED,
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          doctor: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      });

    return transformAppointment(appointment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error(
      "Failed to book appointment. Please try again later."
    );
  }
}

/* ===========================
   UPDATE APPOINTMENT STATUS
=========================== */

export async function updateAppointmentStatus(input: {
  id: string;
  status: AppointmentStatus;
}) {
  try {
    if (!input.id) {
      throw new Error("Appointment ID is required");
    }

    return await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
}
