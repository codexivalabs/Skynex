"use client"
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Field, TextInput, TextArea, Button, StatusBanner, SectionHeading } from "@/components/admin/ui";

const EMPTY_SETTINGS = {
  site_name: "", logo_url: "", tagline: "", footer_about: "",
  phone: "", email: "", address: "", copyright_text: "",
};

function SiteSettingsForm() {
  const [form, setForm] = useState(EMPTY_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => data.settings && setForm({ ...EMPTY_SETTINGS, ...data.settings }))
      .finally(() => setLoading(false));
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/settings", {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Site name">
          <TextInput value={form.site_name} onChange={update("site_name")} />
        </Field>
        <Field label="Logo URL" hint="Path or URL to your logo image.">
          <TextInput value={form.logo_url} onChange={update("logo_url")} />
        </Field>
      </div>

      <Field label="Tagline">
        <TextInput value={form.tagline} onChange={update("tagline")} />
      </Field>

      <Field label="Footer 'about' text">
        <TextArea value={form.footer_about} onChange={update("footer_about")} rows={3} />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Phone">
          <TextInput value={form.phone} onChange={update("phone")} />
        </Field>
        <Field label="Email">
          <TextInput value={form.email} onChange={update("email")} />
        </Field>
      </div>

      <Field label="Address">
        <TextInput value={form.address} onChange={update("address")} />
      </Field>

      <Field label="Copyright line" hint="Shown after the year in the footer, e.g. '{year} SKYNEX. All rights reserved.'">
        <TextInput value={form.copyright_text} onChange={update("copyright_text")} />
      </Field>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
        <StatusBanner status={status} errorText="Couldn't save. Please try again." />
      </div>
    </form>
  );
}

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't update password.");
      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 max-w-md">
      <Field label="Current password">
        <TextInput type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
      </Field>
      <Field label="New password" hint="At least 8 characters.">
        <TextInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
      </Field>
      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" disabled={saving}>{saving ? "Updating..." : "Update password"}</Button>
        <StatusBanner status={status} successText="Password updated." errorText={errorMsg} />
      </div>
    </form>
  );
}

export default function SettingsAdminPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading title="Site Settings" description="Your brand info, used in the navbar, footer, and location section." />
        <SiteSettingsForm />
      </div>
      <div>
        <SectionHeading title="Change Password" description="Update your own admin login password." color="purple" />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
