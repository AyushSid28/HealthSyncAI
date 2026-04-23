import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "healthsync-ai",
    version: "0.1.0",
  });
}
