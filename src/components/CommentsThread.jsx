import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

/**
 * CommentsThread
 * - Renders root comments and their nested replies for a given updateId.
 * - Provides a simple form to post a root comment or a reply.
 *
 * API expectations:
 *  GET  /api/comments/?update=<updateId>        -> returns array of root comments with nested `replies`
 *  POST /api/comments/  { update, body, parent? } -> creates a comment/reply (auth required)
 */

function Comment({ c, onReply }) {
  return (
    <div className="pl-4 border-l mt-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{c.user_name}</div>
          <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-2 text-sm">{c.body}</div>

      <div className="mt-2">
        <button
          className="text-xs text-blue-600 hover:underline"
          onClick={() => onReply(c.id)}
          type="button"
        >
          Reply
        </button>
      </div>

      {/* render replies recursively */}
      {Array.isArray(c.replies) && c.replies.length > 0 && (
        <div className="mt-3 space-y-2">
          {c.replies.map((r) => (
            <Comment key={r.id} c={r} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  c: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default function CommentsThread({ updateId }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchComments() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/comments/?update=${updateId}`);
        if (!mounted) return;
        // backend may return array directly or { results: [...] }
        const data = res.data?.results ?? res.data ?? [];
        setComments(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to fetch comments", e);
        if (mounted) setComments([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (updateId) fetchComments();
    return () => {
      mounted = false;
    };
  }, [updateId]);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!body.trim()) return;
    setSending(true);
    try {
      await axios.post("/api/comments/", {
        update: updateId,
        body: body.trim(),
        parent: replyTo || null,
      });
      setBody("");
      setReplyTo(null);
      // refresh comments
      const res = await axios.get(`/api/comments/?update=${updateId}`);
      const data = res.data?.results ?? res.data ?? [];
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to send comment", err);
      setError("Could not send comment. Try again.");
    } finally {
      setSending(false);
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
          <button
            type="submit"
            disabled={sending}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            {sending ? "Sending..." : replyTo ? "Reply" : "Send"}
          </button>
          {replyTo && (
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="px-3 py-1 border rounded text-sm"
            >
              Cancel
            </button>
          )}
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
      </form>

      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((n) => (
            <div key={n} className="h-10 bg-gray-100 animate-pulse rounded" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-sm text-gray-500">No comments yet. Be the first to comment.</div>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <Comment key={c.id} c={c} onReply={(id) => setReplyTo(id)} />
          ))}
        </div>
      )}
    </div>
  );
}

CommentsThread.propTypes = {
  updateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
