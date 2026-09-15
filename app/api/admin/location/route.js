import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getLocation, updateLocation } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const location = await getLocation();
  return NextResponse.json({ location });
}

export async function PUT(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  const location = await updateLocation(data);
  return NextResponse.json({ location });
}
