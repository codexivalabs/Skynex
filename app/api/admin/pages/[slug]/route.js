import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getPageBySlug, updatePage, VALID_SLUGS } from "@/lib/content";

export async function GET(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const page = await getPageBySlug(slug);
  return NextResponse.json({ page });
}

export async function PUT(request, { params }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) return NextResponse.json({ error: "Not found." }, { status: 404 });
  const data = await request.json();
  const page = await updatePage(slug, data);
  return NextResponse.json({ page });
}
