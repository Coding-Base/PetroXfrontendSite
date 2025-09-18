import React, { useEffect, useState } from "react";
import UpdateCard from "@/components/UpdateCard"; // keep your path
import { fetchUpdates, markAllUpdatesRead } from "@/api"; // <- use the API helpers

export default function UpdatesTab() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingRead, setMarkingRead] = useState(false);
  const [error, setError] = useState(null);

  // normalize many API shapes into an array of updates
  const normalizeUpdatesResponse = (res) => {
    if (!res) return [];
    // If Axios response object, unwrap .data
    const payload = res.data !== undefined ? res.data : res;

    // Common DRF: { results: [...] }
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.results)) return payload.results;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.items)) return payload.items;
    // Single object containing update
    if (payload && typeof payload === "object" && (payload.id || payload.slug)) return [payload];
    return [];
  };

  useEffect(() => {
    let mounted = true;

    const doFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        // call the helper that uses baseURL and cache-buster
        const res = await fetchUpdates(20);
        if (!mounted) return;
        const list = normalizeUpdatesResponse(res);
        setUpdates(list);
      } catch (err) {
        console.error("Failed to load updates", err);
        if (mounted) setError("Ooops, something went wrong :( Failed to load updates.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const markAllReadAndFetch = async () => {
      try {
        setMarkingRead(true);
        // use API helper; ignore errors for marking read but log them
        await markAllUpdatesRead().catch((e) => {
          // non-fatal
          console.warn("markAllRead failed (ignored):", e);
        });
      } finally {
        setMarkingRead(false);
        // fetch the feed after marking read (so client sees latest)
        await doFetch();
      }
    };

    markAllReadAndFetch();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Updates</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Updates</h2>
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Updates</h2>
        <div className="text-sm text-gray-500">
          {markingRead ? "Marking as read..." : `${updates.length} item${updates.length === 1 ? "" : "s"}`}
        </div>
      </div>

      {updates.length === 0 ? (
        <div className="text-sm text-gray-500">No updates yet.</div>
      ) : (
        <div className="space-y-4">
          {updates.map((u, idx) => (
            <UpdateCard
              key={u.id ?? u.slug ?? `${u.title ?? "upd"}-${idx}`}
              update={u}
            />
          ))}
        </div>
      )}
    </div>
  );
}
