// src/pages/UpdatesTab.jsx
import React, { useEffect, useState } from "react";
import UpdateCard from "@/components/UpdateCard";
import { fetchUpdates, markAllUpdatesRead, getUpdatesUnreadCount } from "@/api";
import { useNavigate } from "react-router-dom";

export default function UpdatesTab() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingRead, setMarkingRead] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const normalizeUpdatesResponse = (res) => {
    if (!res) return [];
    const payload = res.data !== undefined ? res.data : res;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.results)) return payload.results;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.items)) return payload.items;
    if (payload && typeof payload === "object" && (payload.id || payload.slug)) return [payload];
    return [];
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchUpdates(20);
      setUpdates(normalizeUpdatesResponse(res));
    } catch (err) {
      console.error("Failed to load updates", err);
      setError("Failed to load updates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // do NOT auto-mark all read on mount — we wait for explicit user action
  }, []);

  const handleMarkAllRead = async () => {
    setMarkingRead(true);
    try {
      await markAllUpdatesRead();
      // Refresh list/unread counts
      await load();
    } catch (err) {
      console.error("Failed to mark all read", err);
    } finally {
      setMarkingRead(false);
    }
  };

  // Recent posts (right column) — top 5 most recent
  const recentPosts = updates.slice(0, 5);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Updates</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="text-sm px-3 py-1 border rounded bg-white hover:bg-gray-50"
            aria-label="Refresh updates"
          >
            Refresh
          </button>
          <button
            onClick={handleMarkAllRead}
            disabled={markingRead}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
            aria-label="Mark all as read"
          >
            {markingRead ? "Marking..." : "Mark all read"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-40 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : updates.length === 0 ? (
        <div className="text-gray-600">No updates yet.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main feed */}
          <div className="lg:col-span-8 space-y-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
            {updates.map((u, idx) => (
              <UpdateCard key={u.id ?? u.slug ?? idx} update={u} />
            ))}
          </div>

          {/* Side column: Recent posts (only visible on large screens) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="bg-white p-4 rounded shadow sticky top-6">
              <h3 className="font-semibold mb-3">Recent posts</h3>
              <div className="space-y-3">
                {recentPosts.map((p, i) => (
                  <button
                    key={p.id ?? p.slug ?? i}
                    onClick={() => {
                      // navigate to the update detail route (if you have one), otherwise scroll into view
                      // If you don't have a detail page, just open a modal or scroll: here we navigate to updates route and rely on slug anchor (example)
                      navigate(`/dashboard/updates#${p.slug || p.id}`);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-gray-50"
                  >
                    <div className="text-sm font-medium truncate">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{p.excerpt ?? (p.body?.slice(0, 80) || '')}</div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
