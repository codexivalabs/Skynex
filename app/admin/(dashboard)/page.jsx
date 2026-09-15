import { Grid3x3, ShieldCheck, FileStack, Mail, ExternalLink } from "lucide-react";
import { query } from "@/lib/db";
import { SectionHeading } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

async function getStats() {
  const [services, features, pages, subscribers] = await Promise.all([
    query("SELECT COUNT(*) AS count FROM services"),
    query("SELECT COUNT(*) AS count FROM features"),
    query("SELECT COUNT(*) AS count FROM pages"),
    query("SELECT COUNT(*) AS count FROM newsletter_subscribers"),
  ]);
  return {
    services: services[0].count,
    features: features[0].count,
    pages: pages[0].count,
    subscribers: subscribers[0].count,
  };
}

export default async function AdminDashboardPage() {
  let stats = { services: 0, features: 0, pages: 0, subscribers: 0 };
  let dbError = false;
  try {
    stats = await getStats();
  } catch (err) {
    dbError = true;
  }

  const cards = [
    { label: "Homepage Services", value: stats.services, icon: Grid3x3, href: "/admin/services", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Why Choose Us Items", value: stats.features, icon: ShieldCheck, href: "/admin/features", color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Site Pages", value: stats.pages, icon: FileStack, href: "/admin/pages", color: "text-orange-600 bg-orange-50 border-orange-100" },
    { label: "Newsletter Subscribers", value: stats.subscribers, icon: Mail, href: "/admin/subscribers", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  ];

  return (
    <div>
      <SectionHeading
        title="Dashboard"
        description="A quick overview of what's on your site right now."
      />

      {dbError && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          Couldn't connect to the database. Check your <code className="font-mono text-xs">.env</code> file
          and make sure MySQL is running.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-6 flex items-center gap-4 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Quick links</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="/" target="_blank" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold">
            View homepage <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a href="/admin/hero" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold">
            Edit hero section
          </a>
          <a href="/admin/settings" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold">
            Site settings
          </a>
        </div>
      </div>
    </div>
  );
}
