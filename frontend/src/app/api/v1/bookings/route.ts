import { NextRequest, NextResponse } from "next/server";

interface Booking {
  booking_id: string;
  service_type: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  status: string;
  created_at: string;
}

const bookings: Map<string, Booking> = new Map();

export async function GET() {
  return NextResponse.json({ bookings: Array.from(bookings.values()) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const id = crypto.randomUUID();
  const booking: Booking = {
    booking_id: id,
    service_type: body.service_type ?? "",
    date: body.date ?? "",
    time: body.time ?? "",
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    notes: body.notes ?? "",
    status: "confirmed",
    created_at: new Date().toISOString(),
  };
  bookings.set(id, booking);
  return NextResponse.json({
    booking_id: id,
    status: "confirmed",
    message: `Appointment booked for ${booking.date} at ${booking.time}.`,
  });
}
