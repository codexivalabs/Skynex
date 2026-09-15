import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { updateFeature, deleteFeature } from "@/lib/content";

export async function PUT(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const feature = await updateFeature(id, data);
  return NextResponse.json({ feature });
}

export async function DELETE(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteFeature(id);
  return NextResponse.json({ ok: true });
}
