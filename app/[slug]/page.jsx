import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubPageBody from "@/components/SubPageBody";
import { getHomeContent, getPageWithItems, VALID_SLUGS } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) return {};
  try {
    const data = await getPageWithItems(slug);
    if (!data) return {};
    return {
      title: `${data.page.title} ${data.page.title_highlight || ""} | SKYNEX`.trim(),
      description: data.page.subtitle,
    };
  } catch {
    return {};
  }
}

export default async function SubPage({ params }) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  let pageData = null;
  let homeContent = null;
  try {
    [pageData, homeContent] = await Promise.all([getPageWithItems(slug), getHomeContent()]);
  } catch (err) {
    console.error(`Failed to load content for /${slug}:`, err);
  }

  if (!pageData) {
    notFound();
  }

  const { navLinks, footerQuick, footerServices, social, settings } = homeContent || {};

  return (
    <div>
      <Navbar navLinks={navLinks} logoUrl={settings?.logo_url} siteName={settings?.site_name} />
      <SubPageBody page={pageData.page} items={pageData.items} />
      <Footer
        settings={settings}
        quickLinks={footerQuick}
        serviceLinks={footerServices}
        social={social}
      />
    </div>
  );
}
