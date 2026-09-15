"use client"
import React, { useEffect, useState } from "react";
import { Field, TextInput, TextArea, Button, StatusBanner, SectionHeading } from "@/components/admin/ui";
import { Loader2 } from "lucide-react";

const EMPTY = {
  badge_text: "", heading_main: "", heading_highlight: "", subtitle: "",
  cta_primary_text: "", cta_primary_link: "", cta_secondary_text: "", cta_secondary_link: "",
  highlight_1: "", highlight_2: "", highlight_3: "", trust_text: "",
};

export default function HeroAdminPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data.hero) setForm({ ...EMPTY, ...data.hero });
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/hero", {
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

  if (loading) {
    return <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>;
  }

  return (
    <div>
      <SectionHeading title="Hero Section" description="The first thing visitors see at the top of your homepage." />

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 max-w-2xl">
        <Field label="Badge text (small pill above the headline)">
          <TextInput value={form.badge_text} onChange={update("badge_text")} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Headline (main part)">
            <TextInput value={form.heading_main} onChange={update("heading_main")} />
          </Field>
          <Field label="Headline (highlighted word)" hint="Rendered with the gradient color.">
            <TextInput value={form.heading_highlight} onChange={update("heading_highlight")} />
          </Field>
        </div>

        <Field label="Subtitle">
          <TextArea value={form.subtitle} onChange={update("subtitle")} rows={3} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Primary button text">
            <TextInput value={form.cta_primary_text} onChange={update("cta_primary_text")} />
          </Field>
          <Field label="Primary button link">
            <TextInput value={form.cta_primary_link} onChange={update("cta_primary_link")} />
          </Field>
          <Field label="Secondary button text">
            <TextInput value={form.cta_secondary_text} onChange={update("cta_secondary_text")} />
          </Field>
          <Field label="Secondary button link">
            <TextInput value={form.cta_secondary_link} onChange={update("cta_secondary_link")} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Highlight 1">
            <TextInput value={form.highlight_1} onChange={update("highlight_1")} />
          </Field>
          <Field label="Highlight 2">
            <TextInput value={form.highlight_2} onChange={update("highlight_2")} />
          </Field>
          <Field label="Highlight 3">
            <TextInput value={form.highlight_3} onChange={update("highlight_3")} />
          </Field>
        </div>

        <Field label="Trust text" hint='Shown below the preview card, e.g. "Trusted by 5,000+ technicians".'>
          <TextInput value={form.trust_text} onChange={update("trust_text")} />
        </Field>

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
          <StatusBanner status={status} errorText="Couldn't save. Please try again." />
        </div>
      </form>
    </div>
  );
}
