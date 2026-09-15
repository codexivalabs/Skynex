import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getAdminById } from "@/lib/content";

export async function GET() {
  const payload = await getCurrentAdmin();
  if (!payload) {
    return NextResponse.json({ admin: null }, { status: 401 });
  }
  const admin = await getAdminById(payload.sub);
  return NextResponse.json({ admin });
}
