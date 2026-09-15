"use client"
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Field, TextInput, TextArea, IconSelect, Button, StatusBanner, SectionHeading } from "@/components/admin/ui";
import CrudManager from "@/components/admin/CrudManager";

const ITEM_FIELDS = [
  { key: "icon_name", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "meta_label", label: "Meta label", type: "text", hint: 'e.g. "6 Weeks", "In Stock", "PDF / BRD"' },
  { key: "tag", label: "Tag (badge text)", type: "text", hint: 'e.g. "Popular", "Beginner"' },
  { key: "description", label: "Description", type: "textarea" },
];
const EMPTY_ITEM = { icon_name: "Star", title: "", meta_label: "", tag: "", description: "", order_index: 0 };

export default function PageEditorClient({ slug, initialPage }) {
  const [form, setForm] = useState(initialPage);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("idle");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      <a href="/admin/pages" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> All pages
      </a>

      <div>
        <SectionHeading title={`Page: /${slug}`} description="Header content for this page." />
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nav label" hint="Shown in the navbar and footer.">
              <TextInput value={form.nav_label || ""} onChange={update("nav_label")} />
            </Field>
            <Field label="Icon">
              <IconSelect value={form.icon_name || "Sparkles"} onChange={update("icon_name")} name="icon_name" />
            </Field>
          </div>

          <Field label="Badge text">
            <TextInput value={form.badge_text || ""} onChange={update("badge_text")} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title (main part)">
              <TextInput value={form.title || ""} onChange={update("title")} />
            </Field>
            <Field label="Title (highlighted word)">
              <TextInput value={form.title_highlight || ""} onChange={update("title_highlight")} />
            </Field>
          </div>

          <Field label="Subtitle">
            <TextArea value={form.subtitle || ""} onChange={update("subtitle")} rows={3} />
          </Field>

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
            <StatusBanner status={status} errorText="Couldn't save. Please try again." />
          </div>
        </form>
      </div>

      <div>
        <SectionHeading title="Page items" description="The cards listed on this page." color="purple" />
        <CrudManager
          apiBase={`/api/admin/pages/${slug}/items`}
          itemLabel="Item"
          fields={ITEM_FIELDS}
          emptyItem={EMPTY_ITEM}
          cardSubtitleKey="meta_label"
        />
      </div>
    </div>
  );
}
