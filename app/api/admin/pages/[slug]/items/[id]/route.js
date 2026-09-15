import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { updatePageItem, deletePageItem } from "@/lib/content";

export async function PUT(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const item = await updatePageItem(id, data);
  return NextResponse.json({ item });
}

export async function DELETE(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deletePageItem(id);
  return NextResponse.json({ ok: true });
}
