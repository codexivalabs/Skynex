"use client"
import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  Wrench,
  GraduationCap,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/3 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Next-Gen Mobile Repair Institute & AI Sourcing</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
              Master Advanced Mobile Repairing with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                SKYNEX
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              From hardware chip-level diagnostics to AI-powered troubleshooting, premium tool sourcing, and instant schematic downloads — elevate your mobile repair career today.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <motion.a
                href="#courses"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all w-full sm:w-auto text-center"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#demo"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm transition-all w-full sm:w-auto text-center"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </motion.a>
            </div>

            {/* Key Feature Highlights */}
            <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full text-xs sm:text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Onsite & Online Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>AI+ Hardware Diagnostic</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span>Verified Parts & Tools</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Card Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Interactive Preview Card */}
            <div className="relative z-10 rounded-3xl bg-white border border-gray-100 p-6 shadow-2xl shadow-slate-200/80">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">SKYNEX AI Diagnostics</h4>
                    <p className="text-xs text-gray-500">Live Schematics & Fault Finder</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  ● Active
                </span>
              </div>

              {/* Sample Visual Modules */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Chip-Level Training</p>
                      <p className="text-[11px] text-gray-500">CPU & Power IC Reballing</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">Enroll</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Original Parts Store</p>
                      <p className="text-[11px] text-gray-500">Displays, Flexes & Stencils</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-purple-600">Browse</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Certified Diploma</p>
                      <p className="text-[11px] text-gray-500">Recognized Certification</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-orange-600">Verified</span>
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-4 pt-3 text-center border-t border-gray-100">
                <span className="text-xs text-gray-400 font-medium">
                  Trusted by 5,000+ Mobile Technicians Worldwide
                </span>
              </div>
            </div>

            {/* Floating Decorative Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl border border-gray-100 shadow-xl hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-orange-500/30">
                100%
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Tested Hardware</p>
                <p className="text-[11px] text-gray-500 font-medium">Tools & Components</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;