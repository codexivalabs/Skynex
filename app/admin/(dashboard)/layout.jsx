import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { getAdminById } from "@/lib/content";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  const payload = await getCurrentAdmin();
  if (!payload) {
    redirect("/admin/login");
  }
  const admin = await getAdminById(payload.sub);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar admin={admin} />
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
