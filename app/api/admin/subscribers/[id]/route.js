import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { deleteSubscriber } from "@/lib/content";

export async function DELETE(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await deleteSubscriber(id);
  return NextResponse.json({ ok: true });
}
