"use client"
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

// Fallback content used only if the location row / hours haven't been
// set up in the database yet, so the page never renders blank.
const DEFAULT_INFO = {
  address: "Main Market, Jhelum, Punjab, Pakistan",
  phone: "+92 340 3800000",
  email: "contact@skynex.com",
  map_embed_url:
    "https://maps.google.com/maps?q=Jhelum%20Punjab%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed",
  direct_map_url: "https://maps.google.com/?q=Jhelum+Punjab+Pakistan",
};

const DEFAULT_HOURS = [
  { days: "Monday - Saturday", time_range: "09:00 AM - 08:00 PM" },
  { days: "Friday", time_range: "Break: 1:00 PM - 2:30 PM" },
  { days: "Sunday", time_range: "Closed / Emergency Service" },
];

const Location = ({ location, hours }) => {
  const storeInfo = { ...DEFAULT_INFO, ...(location || {}) };
  const businessHours = hours && hours.length ? hours : DEFAULT_HOURS;

  return (
    <section id="location" className="py-20 bg-gray-50/60 relative overflow-hidden">
      {/* Background Accent Blobs */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 shadow-sm"
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Visit Our Workshop & Institute</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            Find Us on the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Map
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            Drop by for chip-level repairs, onsite course inquiries, or tool purchasing.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact & Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/50 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                Workshop & Lab Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Address</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{storeInfo.address}</p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Contact Number</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{storeInfo.phone}</p>
                  <p className="text-xs text-gray-400">{storeInfo.email}</p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Working Hours</h4>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    {businessHours.map((item, idx) => (
                      <div key={item.id ?? idx} className="flex justify-between text-gray-600">
                        <span className="font-medium">{item.days}</span>
                        <span className="text-gray-900 font-semibold">{item.time_range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={storeInfo.direct_map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md hover:shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${storeInfo.phone}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Shop</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Google Maps iFrame */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 h-[420px] lg:h-auto min-h-[400px] rounded-3xl overflow-hidden border border-gray-200 shadow-xl shadow-slate-200/50 relative group"
          >
            <iframe
              title="SKYNEX Google Map Location"
              src={storeInfo.map_embed_url}
              className="w-full h-full border-0 rounded-3xl"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Top Right Floating Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-100 shadow-md flex items-center gap-2 text-xs font-bold text-gray-800 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open for Repairs Today</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Location;
