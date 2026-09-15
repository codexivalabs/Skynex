"use client"
import React, { useEffect, useState } from "react";
import { Loader2, Trash2, Mail } from "lucide-react";
import { SectionHeading, Button } from "@/components/admin/ui";

export default function SubscribersAdminPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/subscribers")
      .then((res) => res.json())
      .then((data) => setSubscribers(data.subscribers || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Remove this subscriber?")) return;
    await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <SectionHeading title="Newsletter Subscribers" description="Everyone who signed up through the footer form." />

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
          <Mail className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No subscribers yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {subscribers.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">{s.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Subscribed {new Date(s.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(s.id)}
                className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
