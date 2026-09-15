import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getServices, createService } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const services = await getServices();
  return NextResponse.json({ services });
}

export async function POST(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  if (!data.title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  const service = await createService(data);
  return NextResponse.json({ service }, { status: 201 });
}
