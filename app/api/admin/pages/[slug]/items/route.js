import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getPageBySlug, getPageItems, createPageItem, VALID_SLUGS } from "@/lib/content";

export async function GET(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const page = await getPageBySlug(slug);
  if (!page) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const items = await getPageItems(page.id);
  return NextResponse.json({ items });
}

export async function POST(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const page = await getPageBySlug(slug);
  if (!page) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const data = await request.json();
  if (!data.title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  const item = await createPageItem(page.id, data);
  return NextResponse.json({ item }, { status: 201 });
}
