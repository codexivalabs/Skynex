"use client"
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import { getGradientClass, getLightBgClass } from "@/lib/theme-colors";

const SubPageBody = ({ page, items }) => {
  const PageIcon = getIcon(page.icon_name);

  return (
    <>
      {/* Page Header — mirrors the Hero/Services section styling used on the homepage */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <PageIcon className="w-4 h-4 text-orange-500" />
              <span>{page.badge_text}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
              {page.title}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                {page.title_highlight}
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              {page.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Item Grid — same card language as the homepage Services section */}
      <section className="py-16 lg:py-20 bg-gray-50/60 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-semibold">Content for this page is coming soon.</p>
              <p className="text-sm mt-1">Check back shortly, or contact us for details.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {items.map((item, idx) => {
                const Icon = getIcon(item.icon_name);
                const colorCycle = ["blue-500|indigo-600", "purple-500|indigo-600", "orange-500|amber-600"];
                const [colorFrom, colorTo] = colorCycle[idx % colorCycle.length].split("|");
                const gradient = getGradientClass(colorFrom, colorTo);
                const badge = getLightBgClass(colorFrom);

                return (
                  <motion.div
                    key={item.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    whileHover={{ y: -6 }}
                    className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${gradient} text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        {item.tag && (
                          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${badge}`}>
                            {item.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition-colors">
                      <span>{item.meta_label || "Learn More"}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default SubPageBody;
