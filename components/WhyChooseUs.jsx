"use client"

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import { getGradientClass, getLightBgClass } from "@/lib/theme-colors";

// Fallback content used only if no features were loaded from the database.
const DEFAULT_FEATURES = [
  {
    icon_name: "ShieldCheck",
    title: "100% Tested & Original Parts",
    description:
      "We source and supply only lab-verified screens, flexes, micro-components, and diagnostic equipment.",
    badge: "Quality Assured",
    color_from: "blue-500",
    color_to: "indigo-600",
  },
];

const WhyChooseUs = ({ features }) => {
  const list = features && features.length ? features : DEFAULT_FEATURES;

  return (
    <section id="why-choose-us" className="py-20 bg-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>The SKYNEX Advantage</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Why Tech Enthusiasts & Technicians Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              SKYNEX
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            We combine high-precision hardware repair, state-of-the-art training programs, and instant tool sourcing under one trusted banner.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {list.map((feature, idx) => {
            const Icon = getIcon(feature.icon_name);
            const gradient = getGradientClass(feature.color_from, feature.color_to);
            const badge = getLightBgClass(feature.color_from);
            return (
              <motion.div
                key={feature.id ?? idx}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${gradient} text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${badge}`}>
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Highlight Line */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
