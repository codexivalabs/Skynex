"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";

// Nav menu items
const navLinks = [
  { name: "Online Courses", href: "/online-courses" },
  { name: "Onsite", href: "/onsite" },
  { name: "AI+", href: "/ai-plus", badge: "NEW" },
  { name: "Downloads", href: "/downloads" },
  { name: "Parts & Tools", href: "/parts-tools" },
  { name: "Sourcing", href: "/sourcing" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Online Courses");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-3">
            {/* Replace /logo.png with your actual image path */}
            <img 
              src="/logo.png" 
              alt="SKYNEX Logo" 
              className="h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.name}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-sm">
                        {link.badge}
                      </span>
                    )}
                  </span>

                  {/* Active Link Bottom Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Section: Sign In Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Sign In Button */}
            <motion.a
              href="#signin"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </motion.a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(link.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.name}
                      {link.badge && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white">
                          {link.badge}
                        </span>
                      )}
                    </span>
                  </a>
                );
              })}

              {/* Mobile Sign In */}
              <div className="pt-4 mt-2 border-t border-gray-100">
                <a
                  href="#signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;