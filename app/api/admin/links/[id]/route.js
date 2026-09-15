import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { updateLink, deleteLink } from "@/lib/content";

export async function PUT(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const link = await updateLink(id, data);
  return NextResponse.json({ link });
}

export async function DELETE(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteLink(id);
  return NextResponse.json({ ok: true });
}
