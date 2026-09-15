import { NextResponse } from "next/server";
import { getPageWithItems, VALID_SLUGS } from "@/lib/content";

export async function GET(request, { params }) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const data = await getPageWithItems(slug);
    if (!data) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to load page content:", err);
    return NextResponse.json({ error: "Failed to load content." }, { status: 500 });
  }
}
