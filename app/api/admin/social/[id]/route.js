import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { updateSocialLink } from "@/lib/content";

export async function PUT(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = await request.json();
  const social = await updateSocialLink(id, data);
  return NextResponse.json({ social });
}
