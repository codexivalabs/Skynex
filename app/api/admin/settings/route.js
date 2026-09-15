import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  const settings = await updateSettings(data);
  return NextResponse.json({ settings });
}
