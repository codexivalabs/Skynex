import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { getLinks, createLink } from "@/lib/content";

export async function GET(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const group = request.nextUrl.searchParams.get("group");
  const links = await getLinks(group || undefined);
  return NextResponse.json({ links });
}

export async function POST(request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await request.json();
  if (!data.group_name || !data.name || !data.href) {
    return NextResponse.json({ error: "Group, name, and href are required." }, { status: 400 });
  }
  const link = await createLink(data);
  return NextResponse.json({ link }, { status: 201 });
}
