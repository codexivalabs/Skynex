import { NextResponse } from "next/server";
import { getHomeContent } from "@/lib/content";

export async function GET() {
  try {
    const data = await getHomeContent();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to load home content:", err);
    return NextResponse.json({ error: "Failed to load content." }, { status: 500 });
  }
}
