"use client"
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Grid3x3,
  ShieldCheck,
  MapPin,
  FileStack,
  Link2,
  Settings,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Homepage Content",
    items: [
      { name: "Hero Section", href: "/admin/hero", icon: Sparkles },
      { name: "Services", href: "/admin/services", icon: Grid3x3 },
      { name: "Why Choose Us", href: "/admin/features", icon: ShieldCheck },
      { name: "Location & Hours", href: "/admin/location", icon: MapPin },
    ],
  },
  {
    label: "Site Pages",
    items: [{ name: "Sub-Pages", href: "/admin/pages", icon: FileStack }],
  },
  {
    label: "Site",
    items: [
      { name: "Footer & Links", href: "/admin/footer", icon: Link2 },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  {
    label: "Data",
    items: [{ name: "Subscribers", href: "/admin/subscribers", icon: Mail }],
  },
];

const AdminSidebar = ({ admin }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shrink-0">
          SX
        </div>
        <div>
          <p className="text-sm font-bold text-white">SKYNEX Admin</p>
          <p className="text-xs text-slate-400">Site Control Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors border-l-2 ${
                      active
                        ? "bg-white/10 text-white border-blue-500"
                        : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {admin?.username?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{admin?.username || "Admin"}</p>
            <p className="text-xs text-slate-500 truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white transition-all disabled:opacity-60"
        >
          <LogOut className="w-4 h-4" />
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#12151C] border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            SX
          </div>
          <span className="text-sm font-bold text-white">SKYNEX Admin</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1.5">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div className="w-72 bg-[#12151C] flex flex-col h-full pt-16">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#12151C] border-r border-white/10">
        <SidebarContent />
      </aside>
    </>
  );
};

export default AdminSidebar;
