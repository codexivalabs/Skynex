import { SectionHeading } from "@/components/admin/ui";
import CrudManager from "@/components/admin/CrudManager";

const FIELDS = [
  { key: "icon_name", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "badge", label: "Badge text", type: "text", hint: 'e.g. "Quality Assured"' },
  { key: "description", label: "Description", type: "textarea" },
  { key: "colorpair", label: "Color theme", type: "colorpair" },
];

const EMPTY = {
  icon_name: "ShieldCheck",
  title: "",
  badge: "",
  description: "",
  color_from: "blue-500",
  color_to: "indigo-600",
  order_index: 0,
};

export default function FeaturesAdminPage() {
  return (
    <div>
      <SectionHeading title="Why Choose Us" description="The feature cards shown in the homepage's Why Choose Us section." />
      <CrudManager
        apiBase="/api/admin/features"
        itemLabel="Feature"
        fields={FIELDS}
        emptyItem={EMPTY}
        cardSubtitleKey="badge"
      />
    </div>
  );
}
