"use client"
import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  GraduationCap,
  Wrench,
  Headphones,
  FileCode2,
  Cpu,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "mobile-repair",
    icon: Smartphone,
    title: "Mobile Hardware & Software Repair",
    description:
      "Expert chip-level hardware repair, screen replacements, motherboard troubleshooting, and original firmware flashing.",
    tag: "Core Service",
    color: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    id: "pc-repair",
    icon: Laptop,
    title: "PC & Laptop Diagnostics",
    description:
      "Complete laptop and PC maintenance including GPU repair, RAM/SSD upgrades, power IC replacement, and OS recovery.",
    tag: "Popular",
    color: "from-purple-500 to-indigo-600",
    lightBg: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    id: "online-courses",
    icon: GraduationCap,
    title: "Online & Onsite Courses",
    description:
      "Master modern micro-soldering, schematics reading, and AI-assisted troubleshooting with our certified repair courses.",
    tag: "Institute",
    color: "from-orange-500 to-amber-600",
    lightBg: "bg-orange-50 text-orange-600 border-orange-100",
  },
  {
    id: "accessories",
    icon: Headphones,
    title: "Premium Mobile & PC Accessories",
    description:
      "High-grade tempered glass, fast chargers, original flex cables, data lines, and premium audio gear.",
    tag: "Store",
    color: "from-cyan-500 to-blue-600",
    lightBg: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  {
    id: "parts-tools",
    icon: Wrench,
    title: "Repair Tools & Stencils Sourcing",
    description:
      "Professional lab tools, reballing stencils, digital microscopes, DC power supplies, and soldering stations.",
    tag: "Hardware",
    color: "from-indigo-500 to-purple-600",
    lightBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    id: "schematics-downloads",
    icon: FileCode2,
    title: "Schematics & Diagram Downloads",
    description:
      "Instant access to tested bitmap diagrams, schematic PDFs, pinout maps, and official repair dumps.",
    tag: "Digital Assets",
    color: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50/60 relative overflow-hidden">
      {/* Background Subtle Accent Lines */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 shadow-sm"
          >
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Complete Repair & Learning Solutions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Mobile & Tech Care
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            From professional device fixes and certified institute training to sourcing top-tier lab equipment and schematics.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${service.lightBg}`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition-colors">
                  <span className="hover:cursor-pointer">Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;