import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getSocialLinks } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const social = await getSocialLinks();
  return NextResponse.json({ social });
}
