import { getPages } from "@/lib/content";
import { getIcon } from "@/lib/icon-map";
import { SectionHeading } from "@/components/admin/ui";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PagesListAdminPage() {
  let pages = [];
  try {
    pages = await getPages();
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      <SectionHeading
        title="Site Pages"
        description="These are the pages linked from your navbar (Online Courses, Onsite, AI+, Downloads, Parts & Tools, Sourcing)."
      />

      <div className="space-y-3">
        {pages.map((page) => {
          const Icon = getIcon(page.icon_name);
          return (
            <a
              key={page.slug}
              href={`/admin/pages/${page.slug}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-5 flex items-center gap-4 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">{page.nav_label}</p>
                <p className="text-xs text-gray-500 mt-0.5">/{page.slug}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
