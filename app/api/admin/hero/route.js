import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getHero, updateHero } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const hero = await getHero();
  return NextResponse.json({ hero });
}

export async function PUT(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  const hero = await updateHero(data);
  return NextResponse.json({ hero });
}
