import { NextResponse } from "next/server";
import { getCurrentAdmin, verifyPassword, hashPassword } from "@/lib/auth";
import { getAdminByUsername, updateAdminPassword } from "@/lib/content";

// Change the logged-in admin's password. Requires the current password.
export async function PUT(request) {
  const payload = await getCurrentAdmin();
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Current and new password are required." }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  }

  const admin = await getAdminByUsername(payload.username);
  const valid = await verifyPassword(currentPassword, admin.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  const hash = await hashPassword(newPassword);
  await updateAdminPassword(admin.id, hash);
  return NextResponse.json({ ok: true });
}
