// src/components/CommentsThread.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchComments, createComment } from "@/api";

/**
 * Normalize many possible backend shapes into an array of comments.
 * Handles:
 *  - [] (plain array)
 *  - { results: [...] } (DRF pagination)
 *  - { data: [...] }
 *  - { items: [...] }
 *  - { comments: [...] }
 *  - single object (wrap in array)
 */
function normalizeCommentsPayload(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.comments)) return payload.comments;
  if (payload && typeof payload === "object" && (payload.id || payload.body)) return [payload];
  return [];
}

function Comment({ c, onReply }) {
  return (
    <div className="pl-3 border-l mt-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{c.user?.username ?? c.user_name ?? "Unknown"}</div>
        <div className="text-xs text-gray-500">{c.created_at ? new Date(c.created_at).toLocaleString() : ""}</div>
      </div>
      <div className="mt-1 text-sm">{c.body}</div>
      <div className="mt-2">
        <button className="text-xs text-blue-600" onClick={() => onReply(c.id)}>Reply</button>
      </div>

      {Array.isArray(c.replies) && c.replies.length > 0 && (
        <div className="mt-3 space-y-2">
          {c.replies.map(r => <Comment key={r.id} c={r} onReply={onReply} />)}
        </div>
      )}
    </div>
  );
}

export default function CommentsThread({ updateId }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchComments(updateId);
      // res could be axios response (res.data) or raw payload
      const payload = res && res.data !== undefined ? res.data : res;
      // debug: helpful if things look odd — remove in production
      // console.debug("CommentsThread: fetched payload:", payload);
      const normalized = normalizeCommentsPayload(payload);
      setComments(normalized);
    } catch (e) {
      console.error("CommentsThread: failed to fetch comments", e);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (updateId) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    try {
      await createComment({ update: updateId, body: body.trim(), parent: replyTo });
      setBody("");
      setReplyTo(null);
      await load(); // refresh to show the new comment
    } catch (err) {
      console.error("CommentsThread: failed to send comment", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={submit} className="mb-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="w-full p-2 border rounded"
          placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
        />
        <div className="flex items-center gap-2 mt-2">
          <button type="submit" disabled={submitting} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
            {submitting ? "Sending..." : "Send"}
          </button>
          {replyTo && (
            <button type="button" onClick={() => setReplyTo(null)} className="px-3 py-1 border rounded text-sm">
              Cancel reply
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="space-y-2">
          {[1,2].map(n => <div key={n} className="h-10 bg-gray-100 animate-pulse rounded" />)}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-sm text-gray-500">No comments yet — be the first to comment.</div>
      ) : (
        <div className="space-y-3">{comments.map(c => <Comment key={c.id} c={c} onReply={(id)=>setReplyTo(id)} />)}</div>
      )}
    </div>
  );
}

CommentsThread.propTypes = {
  updateId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};
