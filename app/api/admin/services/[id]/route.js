import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { updateService, deleteService } from "@/lib/content";

export async function PUT(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const service = await updateService(id, data);
  return NextResponse.json({ service });
}

export async function DELETE(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteService(id);
  return NextResponse.json({ ok: true });
}
