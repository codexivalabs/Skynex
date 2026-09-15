"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowUp,
  Loader2,
  Check,
} from "lucide-react";

// Custom Social Icon Components (Replaces missing Lucide exports)
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_ICON_MAP = {
  facebook: { Icon: FacebookIcon, name: "Facebook", color: "hover:bg-blue-600" },
  instagram: { Icon: InstagramIcon, name: "Instagram", color: "hover:bg-purple-600" },
  youtube: { Icon: YoutubeIcon, name: "YouTube", color: "hover:bg-red-600" },
  twitter: { Icon: TwitterIcon, name: "Twitter", color: "hover:bg-sky-500" },
};

// Fallback content used only if no data was loaded from the database.
const DEFAULT_QUICK_LINKS = [
  { name: "Online Courses", href: "/online-courses" },
  { name: "Onsite Training", href: "/onsite" },
  { name: "AI+ Fault Finder", href: "/ai-plus" },
  { name: "Schematic Downloads", href: "/downloads" },
  { name: "Parts & Tools Store", href: "/parts-tools" },
  { name: "Sourcing Service", href: "/sourcing" },
];

const DEFAULT_SERVICE_LINKS = [
  { name: "Mobile Screen & Glass Replacement", href: "/#services" },
  { name: "Motherboard & Chip-Level Repair", href: "/#services" },
];

const DEFAULT_SOCIAL = [
  { platform: "facebook", url: "#" },
  { platform: "instagram", url: "#" },
  { platform: "youtube", url: "#" },
  { platform: "twitter", url: "#" },
];

const DEFAULT_SETTINGS = {
  site_name: "SKYNEX",
  logo_url: "/logo.png",
  footer_about:
    "Your trusted partner for professional mobile & PC repairs, AI diagnostic tools, original spare parts, and certified technician courses.",
  phone: "+92 340 3800000",
  email: "contact@skynex.com",
  address: "Main Market, Jhelum, Punjab, Pakistan",
  copyright_text: "SKYNEX. All rights reserved.",
};

const Footer = ({ settings, quickLinks, serviceLinks, social }) => {
  const site = { ...DEFAULT_SETTINGS, ...(settings || {}) };
  const links = quickLinks && quickLinks.length ? quickLinks : DEFAULT_QUICK_LINKS;
  const repairServices = serviceLinks && serviceLinks.length ? serviceLinks : DEFAULT_SERVICE_LINKS;
  const socialLinks = social && social.length ? social : DEFAULT_SOCIAL;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 relative overflow-hidden text-gray-600">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-100">
          
          <div className="lg:col-span-4 space-y-6">
            <a href="/" className="flex items-center gap-3">
              <img
                src={site.logo_url}
                alt={`${site.site_name} Logo`}
                className="h-12 w-auto object-contain"
              />
            </a>

            <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
              {site.footer_about}
            </p>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Subscribe for Schematics & Deals
              </p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-all shrink-0 disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : status === "success" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
              {status === "success" && (
                <p className="text-xs font-semibold text-emerald-600">Subscribed! Check your inbox soon.</p>
              )}
              {status === "error" && (
                <p className="text-xs font-semibold text-red-500">{errorMsg}</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-4 border-blue-600 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-4 border-purple-600 pl-3">
              Repair & Training
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {repairServices.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-l-4 border-orange-500 pl-3">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>{site.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                <a href={`tel:${site.phone}`} className="hover:text-blue-600 transition-colors">
                  {site.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href={`mailto:${site.email}`} className="hover:text-blue-600 transition-colors">
                  {site.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <p>© {new Date().getFullYear()} {site.copyright_text}</p>

          <div className="flex items-center gap-2">
            {socialLinks.map((s) => {
              const meta = SOCIAL_ICON_MAP[s.platform] || SOCIAL_ICON_MAP.facebook;
              const Icon = meta.Icon;
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  aria-label={meta.name}
                  className={`w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:text-white ${meta.color} transition-all duration-300 shadow-sm`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
