import { SectionHeading } from "@/components/admin/ui";
import CrudManager from "@/components/admin/CrudManager";

const FIELDS = [
  { key: "icon_name", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "tag", label: "Tag (badge text)", type: "text", hint: 'e.g. "Popular", "Core Service"' },
  { key: "description", label: "Description", type: "textarea" },
  { key: "colorpair", label: "Color theme", type: "colorpair" },
];

const EMPTY = {
  icon_name: "Smartphone",
  title: "",
  tag: "",
  description: "",
  color_from: "blue-500",
  color_to: "indigo-600",
  order_index: 0,
};

export default function ServicesAdminPage() {
  return (
    <div>
      <SectionHeading title="Services" description="The service cards shown on your homepage." />
      <CrudManager apiBase="/api/admin/services" itemLabel="Service" fields={FIELDS} emptyItem={EMPTY} />
    </div>
  );
}
