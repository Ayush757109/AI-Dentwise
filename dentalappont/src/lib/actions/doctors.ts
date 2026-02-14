"use server";

import { Gender, Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

/* =========================================================
   TYPES
========================================================= */

export interface DoctorWithCount {
  id: string;
  name: string;
  email: string;
  phone: string;
  speciality: string;
  bio: string | null;
  imageUrl: string;
  gender: Gender;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  appointmentCount: number;
}

interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

/* =========================================================
   INTERNAL MAPPER (removes duplication)
========================================================= */

function mapDoctorWithCount(
  doctor: Prisma.DoctorGetPayload<{
    include: { _count: { select: { appointments: true } } };
  }>
): DoctorWithCount {
  return {
    id: doctor.id,
    name: doctor.name,
    email: doctor.email,
    phone: doctor.phone,
    speciality: doctor.speciality,
    bio: doctor.bio,
    imageUrl: doctor.imageUrl,
    gender: doctor.gender,
    isActive: doctor.isActive,
    createdAt: doctor.createdAt,
    updatedAt: doctor.updatedAt,
    appointmentCount: doctor._count.appointments,
  };
}

/* =========================================================
   GET ALL DOCTORS
========================================================= */

export async function getDoctors(): Promise<DoctorWithCount[]> {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return doctors.map(mapDoctorWithCount);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
}

/* =========================================================
   CREATE DOCTOR
========================================================= */

export async function createDoctor(
  input: CreateDoctorInput
) {
  try {
    if (!input.name.trim() || !input.email.trim()) {
      throw new Error("Name and email are required");
    }

    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });

    revalidatePath("/admin");

    return doctor;
  } catch (error: unknown) {
    console.error("Error creating doctor:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("A doctor with this email already exists");
    }

    throw new Error("Failed to create doctor");
  }
}

/* =========================================================
   UPDATE DOCTOR
========================================================= */

export async function updateDoctor(
  input: UpdateDoctorInput
) {
  try {
    if (!input.id) {
      throw new Error("Doctor ID is required");
    }

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
    });

    if (!currentDoctor) {
      throw new Error("Doctor not found");
    }

    // Check email uniqueness if changed
    if (
      input.email &&
      input.email !== currentDoctor.email
    ) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
      });

      if (existingDoctor) {
        throw new Error(
          "A doctor with this email already exists"
        );
      }
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name ?? currentDoctor.name,
        email: input.email ?? currentDoctor.email,
        phone: input.phone ?? currentDoctor.phone,
        speciality:
          input.speciality ?? currentDoctor.speciality,
        gender: input.gender ?? currentDoctor.gender,
        isActive:
          input.isActive ?? currentDoctor.isActive,
      },
    });

    revalidatePath("/admin");

    return updatedDoctor;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw new Error("Failed to update doctor");
  }
}

/* =========================================================
   GET AVAILABLE DOCTORS
========================================================= */

export async function getAvailableDoctors(): Promise<
  DoctorWithCount[]
> {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { name: "asc" },
    });

    return doctors.map(mapDoctorWithCount);
  } catch (error) {
    console.error(
      "Error fetching available doctors:",
      error
    );
    throw new Error(
      "Failed to fetch available doctors"
    );
  }
}
