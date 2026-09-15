"use client"
import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react";
import { Field, TextInput, TextArea, NumberInput, IconSelect, ColorSelect, Button } from "@/components/admin/ui";
import { getIcon } from "@/lib/icon-map";

/**
 * Declarative CRUD list for simple flat resources.
 *
 * fields: [{ key, label, type: 'text' | 'textarea' | 'number' | 'icon' | 'colorpair', hint }]
 *   'colorpair' expects the item to have `color_from` + `color_to` and
 *   renders a single palette picker that sets both.
 */
export default function CrudManager({
  apiBase,
  listQuery = "",
  itemLabel,
  fields,
  emptyItem,
  cardTitleKey = "title",
  cardSubtitleKey = "description",
  buildPayload,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = none, "new" = adding
  const [form, setForm] = useState(emptyItem);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const listKey = apiBase.split("/").pop(); // e.g. "services" -> response { services: [...] }

  const load = () => {
    setLoading(true);
    fetch(`${apiBase}${listQuery}`)
      .then((res) => res.json())
      .then((data) => setItems(data[listKey] || Object.values(data)[0] || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, [apiBase, listQuery]);

  const startAdd = () => {
    setForm({ ...emptyItem, order_index: items.length + 1 });
    setEditingId("new");
    setError("");
  };

  const startEdit = (item) => {
    setForm({ ...emptyItem, ...item });
    setEditingId(item.id);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError("");
  };

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const setColorPair = (from, to) => setForm((f) => ({ ...f, color_from: from, color_to: to }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = buildPayload ? buildPayload(form) : form;
      const isNew = editingId === "new";
      const res = await fetch(isNew ? apiBase : `${apiBase}/${editingId}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed.");
      }
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Delete this ${itemLabel.toLowerCase()}? This can't be undone.`)) return;
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    load();
  };

  const renderField = (field) => {
    if (field.type === "icon") {
      return (
        <IconSelect value={form[field.key] || "Star"} onChange={update(field.key)} name={field.key} />
      );
    }
    if (field.type === "colorpair") {
      return <ColorSelect colorFrom={form.color_from} colorTo={form.color_to} onSelect={setColorPair} />;
    }
    if (field.type === "textarea") {
      return <TextArea value={form[field.key] || ""} onChange={update(field.key)} />;
    }
    if (field.type === "number") {
      return <NumberInput value={form[field.key] ?? 0} onChange={update(field.key)} />;
    }
    return <TextInput value={form[field.key] || ""} onChange={update(field.key)} />;
  };

  const FormCard = ({ isNew }) => (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key} className={field.type === "textarea" || field.type === "colorpair" ? "sm:col-span-2" : ""}>
            <Field label={field.label} hint={field.hint}>
              {renderField(field)}
            </Field>
          </div>
        ))}
        <Field label="Display order" hint="Lower numbers appear first.">
          <NumberInput value={form.order_index ?? 0} onChange={update("order_index")} />
        </Field>
      </div>

      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          {isNew ? "Add" : "Save changes"}
        </Button>
        <Button type="button" variant="secondary" onClick={cancelEdit}>
          <X className="w-4 h-4" /> Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        {editingId === null && (
          <Button onClick={startAdd}>
            <Plus className="w-4 h-4" /> Add {itemLabel}
          </Button>
        )}
      </div>

      {editingId === "new" && <FormCard isNew />}

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 py-6"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>
      ) : items.length === 0 && editingId !== "new" ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400 text-sm">
          No {itemLabel.toLowerCase()}s yet. Click "Add {itemLabel}" to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) =>
            editingId === item.id ? (
              <FormCard key={item.id} isNew={false} />
            ) : (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
              >
                {item.icon_name && (
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    {React.createElement(getIcon(item.icon_name), { className: "w-5 h-5" })}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{item[cardTitleKey]}</p>
                  {item[cardSubtitleKey] && (
                    <p className="text-xs text-gray-500 truncate mt-0.5">{item[cardSubtitleKey]}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 font-medium shrink-0">#{item.order_index}</span>
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-blue-600 shrink-0"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 shrink-0"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
