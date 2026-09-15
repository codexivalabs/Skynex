"use client"
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Field, TextInput, TextArea, Button, StatusBanner, SectionHeading } from "@/components/admin/ui";
import CrudManager from "@/components/admin/CrudManager";

const EMPTY_LOCATION = {
  name: "", address: "", phone: "", email: "", map_embed_url: "", direct_map_url: "",
};

function LocationForm() {
  const [form, setForm] = useState(EMPTY_LOCATION);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch("/api/admin/location")
      .then((res) => res.json())
      .then((data) => data.location && setForm({ ...EMPTY_LOCATION, ...data.location }))
      .finally(() => setLoading(false));
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/location", {
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
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
      <Field label="Workshop name">
        <TextInput value={form.name} onChange={update("name")} />
      </Field>
      <Field label="Address">
        <TextInput value={form.address} onChange={update("address")} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Phone">
          <TextInput value={form.phone} onChange={update("phone")} />
        </Field>
        <Field label="Email">
          <TextInput value={form.email} onChange={update("email")} />
        </Field>
      </div>
      <Field label="Google Maps embed URL" hint="The URL used inside the map's iframe (Google Maps → Share → Embed a map).">
        <TextArea value={form.map_embed_url} onChange={update("map_embed_url")} rows={2} />
      </Field>
      <Field label='"Get Directions" link' hint="A normal Google Maps link people can open in a new tab.">
        <TextInput value={form.direct_map_url} onChange={update("direct_map_url")} />
      </Field>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
        <StatusBanner status={status} errorText="Couldn't save. Please try again." />
      </div>
    </form>
  );
}

const HOURS_FIELDS = [
  { key: "days", label: "Days", type: "text", hint: 'e.g. "Monday - Saturday"' },
  { key: "time_range", label: "Time / note", type: "text", hint: 'e.g. "09:00 AM - 08:00 PM"' },
];
const EMPTY_HOUR = { days: "", time_range: "", order_index: 0 };

export default function LocationAdminPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading title="Location" description="Your workshop's address and contact details, shown on the homepage map section." />
        <LocationForm />
      </div>

      <div>
        <SectionHeading title="Working Hours" description="The rows shown under 'Working Hours' on the homepage." color="purple" />
        <CrudManager
          apiBase="/api/admin/hours"
          itemLabel="Hours row"
          fields={HOURS_FIELDS}
          emptyItem={EMPTY_HOUR}
          cardTitleKey="days"
          cardSubtitleKey="time_range"
        />
      </div>
    </div>
  );
}
