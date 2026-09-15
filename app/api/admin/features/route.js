import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getFeatures, createFeature } from "@/lib/content";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const features = await getFeatures();
  return NextResponse.json({ features });
}

export async function POST(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  if (!data.title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  const feature = await createFeature(data);
  return NextResponse.json({ feature }, { status: 201 });
}
