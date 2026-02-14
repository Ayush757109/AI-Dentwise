import { NextResponse } from "next/server";
import {
  getAppointments,
  bookAppointment,
  updateAppointmentStatus,
} from "@/lib/actions/appointments";

// GET all appointments
export async function GET() {
  try {
    const data = await getAppointments();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// CREATE appointment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await bookAppointment(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to book appointment" },
      { status: 500 }
    );
  }
}

// UPDATE appointment status
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const data = await updateAppointmentStatus(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update appointment" },
      { status: 500 }
    );
  }
}
