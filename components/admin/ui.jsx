"use client"
import React from "react";
import { getIcon, ICON_NAMES } from "@/lib/icon-map";
import { COLOR_OPTIONS, getGradientClass } from "@/lib/theme-colors";

export const Field = ({ label, children, hint }) => (
  <label className="block">
    <span className="block text-sm font-semibold text-gray-800 mb-1.5">{label}</span>
    {children}
    {hint && <span className="block text-xs text-gray-400 mt-1">{hint}</span>}
  </label>
);

const baseInput =
  "w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all";

export const TextInput = (props) => <input {...props} className={baseInput} />;

export const TextArea = (props) => (
  <textarea {...props} rows={props.rows || 3} className={baseInput + " resize-none"} />
);

export const NumberInput = (props) => (
  <input {...props} type="number" className={baseInput} />
);

export const IconSelect = ({ value, onChange, name }) => {
  const Preview = getIcon(value);
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
        <Preview className="w-5 h-5" />
      </div>
      <select name={name} value={value} onChange={onChange} className={baseInput}>
        {ICON_NAMES.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
    </div>
  );
};

// colorFrom/colorTo are stored together; the picker offers the fixed
// palette from theme-colors.js so every combination Tailwind needs to
// render is guaranteed to exist in the compiled CSS.
export const ColorSelect = ({ colorFrom, colorTo, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {COLOR_OPTIONS.map((opt) => {
      const active = opt.from === colorFrom && opt.to === colorTo;
      const gradient = getGradientClass(opt.from, opt.to);
      return (
        <button
          key={opt.from}
          type="button"
          onClick={() => onSelect(opt.from, opt.to)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-tr ${gradient} transition-all ${
            active ? "ring-2 ring-offset-2 ring-gray-900" : "opacity-70 hover:opacity-100"
          }`}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

export const Button = ({ variant = "primary", className = "", ...props }) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm",
    danger: "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100",
    ghost: "text-gray-500 hover:text-gray-800 hover:bg-gray-100",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    />
  );
};

export const StatusBanner = ({ status, successText = "Saved.", errorText }) => {
  if (status === "success") {
    return <p className="text-sm font-semibold text-emerald-600 mt-2">{successText}</p>;
  }
  if (status === "error") {
    return (
      <p className="text-sm font-semibold text-red-500 mt-2">{errorText || "Something went wrong."}</p>
    );
  }
  return null;
};

// Fixed literal classes (see the note in theme-colors.js for why these
// can't be built with template interpolation).
const HEADING_BAR_CLASS = {
  blue: "border-blue-600",
  purple: "border-purple-600",
  orange: "border-orange-500",
  emerald: "border-emerald-600",
};

export const SectionHeading = ({ title, description, color = "blue" }) => (
  <div className="mb-6">
    <h2 className={`text-lg font-bold text-gray-900 border-l-4 pl-3 ${HEADING_BAR_CLASS[color] || HEADING_BAR_CLASS.blue}`}>
      {title}
    </h2>
    {description && <p className="text-sm text-gray-500 mt-1.5 pl-3.5">{description}</p>}
  </div>
);
