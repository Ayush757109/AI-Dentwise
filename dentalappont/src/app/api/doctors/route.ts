import { NextResponse } from "next/server";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  getAvailableDoctors,
} from "@/lib/actions/doctors";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const available = searchParams.get("available");

  if (available === "true") {
    const data = await getAvailableDoctors();
    return NextResponse.json(data);
  }

  const data = await getDoctors();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await createDoctor(body);
  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const data = await updateDoctor(body);
  return NextResponse.json(data);
}
