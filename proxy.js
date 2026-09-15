import { NextResponse } from "next/server";
import { verifyRequestToken } from "@/lib/auth";

// Protects everything under /admin (except the login page) and every
// /api/admin/* route handler. Runs on the Node.js runtime so it can use
// the same jsonwebtoken-based verification as the rest of the app.
export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (!isAdminApi && !isAdminPage) {
    return NextResponse.next();
  }

  const payload = verifyRequestToken(request);

  if (!payload) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
