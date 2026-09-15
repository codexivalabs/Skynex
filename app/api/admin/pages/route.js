import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getPages } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const pages = await getPages();
  return NextResponse.json({ pages });
}
