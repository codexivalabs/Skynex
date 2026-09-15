import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getSubscribers } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const subscribers = await getSubscribers();
  return NextResponse.json({ subscribers });
}
