import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateCard from "@/components/UpdateCard"; // adjust path if needed

export default function UpdatesTab() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingRead, setMarkingRead] = useState(false);
  const [error, setError] = useState(null);

  // helper to normalize many possible response shapes into an array
  const normalizeUpdatesResponse = (res) => {
    if (!res) return [];
    // If Axios response object, try res.data
    const payload = res.data !== undefined ? res.data : res;

    // Common DRF style: { results: [...], count, next, previous }
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.results)) return payload.results;
    // Some APIs return { data: [...] }
    if (Array.isArray(payload.data)) return payload.data;
    // Some backends return object keyed by id's or single object - no list
    // If payload has an 'items' key
    if (Array.isArray(payload.items)) return payload.items;

    // If it's a single object representing one update, wrap it into array
    if (payload && typeof payload === "object" && payload.id) return [payload];

    // Otherwise return empty array
    return [];
  };

  useEffect(() => {
    let mounted = true;
    const fetchUpdates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/updates/?page_size=20");
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

    // mark all read and then fetch updates
    const markAllReadAndFetch = async () => {
      try {
        setMarkingRead(true);
        // attempt to mark as read, but ignore if fails
        await axios.post("/api/updates/mark_all_read/").catch(() => {});
      } finally {
        setMarkingRead(false);
        // fetch the feed after marking read (so client sees latest)
        fetchUpdates();
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
          {updates.map((u) => (
            // defensive: ensure u is object and has id; if not use slug or index
            <UpdateCard key={u.id ?? u.slug ?? `${u.title ?? "upd"}-${Math.random()}`} update={u} />
          ))}
        </div>
      )}
    </div>
  );
          }
