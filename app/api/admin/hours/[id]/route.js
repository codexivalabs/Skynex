import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { updateBusinessHour, deleteBusinessHour } from "@/lib/content";

export async function PUT(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const hour = await updateBusinessHour(id, data);
  return NextResponse.json({ hour });
}

export async function DELETE(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteBusinessHour(id);
  return NextResponse.json({ ok: true });
}
