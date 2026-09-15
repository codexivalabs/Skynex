import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import { getHomeContent } from "@/lib/content";

// Rendered per-request so admin edits show up immediately without a
// rebuild/redeploy.
export const dynamic = "force-dynamic";

export default async function Home() {
  let content = null;
  try {
    content = await getHomeContent();
  } catch (err) {
    // If the database isn't reachable yet, every component below falls
    // back to its own built-in defaults so the page still renders.
    console.error("Failed to load homepage content from the database:", err);
  }

  const {
    hero,
    services,
    features,
    location,
    hours,
    settings,
    navLinks,
    footerQuick,
    footerServices,
    social,
  } = content || {};

  return (
    <div>
      <Navbar navLinks={navLinks} logoUrl={settings?.logo_url} siteName={settings?.site_name} />
      <Hero hero={hero} />
      <Services services={services} />
      <WhyChooseUs features={features} />
      <Location location={location} hours={hours} />
      <Footer
        settings={settings}
        quickLinks={footerQuick}
        serviceLinks={footerServices}
        social={social}
      />
    </div>
  );
}
