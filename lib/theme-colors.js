// Tailwind's build-time scanner only generates CSS for class names that
// appear as literal text somewhere in the source. Colors stored in the
// database (e.g. "blue-500") can't be safely interpolated into a
// className at runtime (`from-${x}`) because that exact utility class
// would never get generated. Instead, admin-editable "color" fields
// store a key into this fixed palette, and the *complete* class strings
// below are written out literally so Tailwind always includes them.

export const COLOR_OPTIONS = [
  { from: "blue-500", to: "indigo-600", label: "Blue" },
  { from: "purple-500", to: "indigo-600", label: "Purple" },
  { from: "orange-500", to: "amber-600", label: "Orange" },
  { from: "cyan-500", to: "blue-600", label: "Cyan" },
  { from: "indigo-500", to: "purple-600", label: "Indigo" },
  { from: "emerald-500", to: "teal-600", label: "Emerald" },
];

const GRADIENT_CLASS = {
  "blue-500|indigo-600": "from-blue-500 to-indigo-600",
  "purple-500|indigo-600": "from-purple-500 to-indigo-600",
  "orange-500|amber-600": "from-orange-500 to-amber-600",
  "cyan-500|blue-600": "from-cyan-500 to-blue-600",
  "indigo-500|purple-600": "from-indigo-500 to-purple-600",
  "emerald-500|teal-600": "from-emerald-500 to-teal-600",
};

const LIGHT_BG_CLASS = {
  "blue-500": "bg-blue-50 text-blue-600 border-blue-100",
  "purple-500": "bg-purple-50 text-purple-600 border-purple-100",
  "orange-500": "bg-orange-50 text-orange-600 border-orange-100",
  "cyan-500": "bg-cyan-50 text-cyan-600 border-cyan-100",
  "indigo-500": "bg-indigo-50 text-indigo-600 border-indigo-100",
  "emerald-500": "bg-emerald-50 text-emerald-600 border-emerald-100",
};

export function getGradientClass(colorFrom, colorTo) {
  return GRADIENT_CLASS[`${colorFrom}|${colorTo}`] || GRADIENT_CLASS["blue-500|indigo-600"];
}

export function getLightBgClass(colorFrom) {
  return LIGHT_BG_CLASS[colorFrom] || LIGHT_BG_CLASS["blue-500"];
}
