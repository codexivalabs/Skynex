import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [services, features, pages, subscribers] = await Promise.all([
    query("SELECT COUNT(*) AS count FROM services"),
    query("SELECT COUNT(*) AS count FROM features"),
    query("SELECT COUNT(*) AS count FROM pages"),
    query("SELECT COUNT(*) AS count FROM newsletter_subscribers"),
  ]);

  return NextResponse.json({
    services: services[0].count,
    features: features[0].count,
    pages: pages[0].count,
    subscribers: subscribers[0].count,
  });
}
