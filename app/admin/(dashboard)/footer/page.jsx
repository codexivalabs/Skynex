"use client"
import React, { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { SectionHeading, TextInput, Button } from "@/components/admin/ui";
import CrudManager from "@/components/admin/CrudManager";

const LINK_FIELDS = [
  { key: "name", label: "Label", type: "text" },
  { key: "href", label: "Link (URL or path)", type: "text", hint: 'e.g. "/online-courses" or "/#services"' },
];

function SocialLinksEditor() {
  const [social, setSocial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  useEffect(() => {
    fetch("/api/admin/social")
      .then((res) => res.json())
      .then((data) => setSocial(data.social || []))
      .finally(() => setLoading(false));
  }, []);

  const updateUrl = (id, url) => {
    setSocial((list) => list.map((s) => (s.id === id ? { ...s, url } : s)));
  };

  const handleSave = async (item) => {
    setSavingId(item.id);
    await fetch(`/api/admin/social/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    setSavingId(null);
    setSavedId(item.id);
    setTimeout(() => setSavedId(null), 1500);
  };

  if (loading) {
    return <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      {social.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <span className="w-24 text-sm font-semibold text-gray-700 capitalize shrink-0">{item.platform}</span>
          <TextInput value={item.url} onChange={(e) => updateUrl(item.id, e.target.value)} />
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleSave(item)}
            disabled={savingId === item.id}
            className="shrink-0"
          >
            {savedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : savingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function FooterAdminPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading title="Navigation Menu" description="Links shown in the top navbar." />
        <CrudManager
          apiBase="/api/admin/links"
          listQuery="?group=nav"
          itemLabel="Nav link"
          fields={LINK_FIELDS}
          emptyItem={{ name: "", href: "", group_name: "nav", order_index: 0 }}
          buildPayload={(form) => ({ ...form, group_name: "nav" })}
          cardTitleKey="name"
          cardSubtitleKey="href"
        />
      </div>

      <div>
        <SectionHeading title="Footer — Quick Links" description="First footer column." color="purple" />
        <CrudManager
          apiBase="/api/admin/links"
          listQuery="?group=footer_quick"
          itemLabel="Link"
          fields={LINK_FIELDS}
          emptyItem={{ name: "", href: "", group_name: "footer_quick", order_index: 0 }}
          buildPayload={(form) => ({ ...form, group_name: "footer_quick" })}
          cardTitleKey="name"
          cardSubtitleKey="href"
        />
      </div>

      <div>
        <SectionHeading title="Footer — Repair & Training" description="Second footer column." color="orange" />
        <CrudManager
          apiBase="/api/admin/links"
          listQuery="?group=footer_services"
          itemLabel="Link"
          fields={LINK_FIELDS}
          emptyItem={{ name: "", href: "", group_name: "footer_services", order_index: 0 }}
          buildPayload={(form) => ({ ...form, group_name: "footer_services" })}
          cardTitleKey="name"
          cardSubtitleKey="href"
        />
      </div>

      <div>
        <SectionHeading title="Social Links" description="Icons shown at the bottom of the footer." color="emerald" />
        <SocialLinksEditor />
      </div>
    </div>
  );
}
