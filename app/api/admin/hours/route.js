import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getBusinessHours, createBusinessHour } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const hours = await getBusinessHours();
  return NextResponse.json({ hours });
}

export async function POST(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  if (!data.days || !data.time_range) {
    return NextResponse.json({ error: "Days and time range are required." }, { status: 400 });
  }
  const hour = await createBusinessHour(data);
  return NextResponse.json({ hour }, { status: 201 });
}
