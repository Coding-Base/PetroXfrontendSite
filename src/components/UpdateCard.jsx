// src/components/UpdateCard.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CommentsThread from "./CommentsThread";

/**
 * UpdateCard
 * Props:
 *  - update: object (required) -- the update object from API (id, title, slug, body, like_count, comment_count, created_at, featured_image, author_name)
 *  - initialLiked: optional boolean -- whether the current user already liked this update (if known)
 */
export default function UpdateCard({ update, initialLiked = undefined }) {
  const [liked, setLiked] = useState(Boolean(initialLiked));
  const [likesCount, setLikesCount] = useState(update.like_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [error, setError] = useState(null);
  const [showFull, setShowFull] = useState(false);
  const [fetchedLikeState, setFetchedLikeState] = useState(false);

  useEffect(() => {
    // If parent didn't provide initialLiked, try to fetch like state from a dedicated endpoint (optional)
    // Backend endpoint (optional): GET /api/updates/{slug}/like_status/ -> { liked: true/false }
    if (initialLiked === undefined && !fetchedLikeState) {
      let mounted = true;
      (async () => {
        try {
          const res = await axios.get(`/api/updates/${encodeURIComponent(update.slug)}/like_status/`);
          if (mounted && res?.data && typeof res.data.liked === "boolean") {
            setLiked(res.data.liked);
            setFetchedLikeState(true);
          }
        } catch (e) {
          // endpoint may not exist — that's okay; we'll default to false (or parent-provided value)
        }
      })();
      return () => {
        mounted = false;
      };
    }
    // keep likesCount synced when update prop changes
    setLikesCount(update.like_count || 0);
  }, [initialLiked, update, fetchedLikeState]);

  const toggleLike = async () => {
    setError(null);
    if (loadingLike) return;
    setLoadingLike(true);

    // optimistic update
    const prevLiked = liked;
    const prevCount = likesCount;
    const optimisticLiked = !prevLiked;
    setLiked(optimisticLiked);
    setLikesCount((c) => (optimisticLiked ? c + 1 : Math.max(0, c - 1)));

    try {
      if (!prevLiked) {
        await axios.post(`/api/updates/${encodeURIComponent(update.slug)}/like/`);
      } else {
        await axios.post(`/api/updates/${encodeURIComponent(update.slug)}/unlike/`);
      }
    } catch (err) {
      // revert on error
      setLiked(prevLiked);
      setLikesCount(prevCount);
      setError("Could not update like. Try again.");
      console.error("Like/unlike error:", err);
    } finally {
      setLoadingLike(false);
    }
  };

  const formattedDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const renderBody = () => {
    const body = update.body || "";
    const limit = 400; // characters before "read more"
    if (!showFull && body.length > limit) {
      return (
        <>
          <div className="prose">
            <ReactMarkdown>{body.slice(0, limit) + "..."}</ReactMarkdown>
          </div>
          <button
            onClick={() => setShowFull(true)}
            className="mt-2 text-sm text-blue-600 hover:underline"
            aria-label="Read more"
          >
            Read more
          </button>
        </>
      );
    }
    return (
      <>
        <div className="prose">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
        {showFull && body.length > limit && (
          <button
            onClick={() => setShowFull(false)}
            className="mt-2 text-sm text-gray-600 hover:underline"
            aria-label="Show less"
          >
            Show less
          </button>
        )}
      </>
    );
  };

  return (
    <article className="p-4 bg-white rounded shadow">
      <header className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{update.title}</h3>
          <div className="text-xs text-gray-500 mt-1">
            {update.author_name ? `${update.author_name} • ` : ""}
            {formattedDate(update.created_at)}
          </div>
        </div>
      </header>

      {update.featured_image && (
        <div className="my-3">
          <img
            src={update.featured_image}
            alt={update.title}
            className="w-full max-h-56 object-cover rounded"
            onError={(e) => {
              // fallback hide broken image
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="mt-2">{renderBody()}</div>

      <footer className="mt-4 flex items-center gap-3">
        <button
          onClick={toggleLike}
          disabled={loadingLike}
          className="px-3 py-1 border rounded flex items-center gap-2"
          aria-pressed={liked}
          aria-label={liked ? "Unlike update" : "Like update"}
        >
          <span>{liked ? "Unlike" : "Like"}</span>
          <span className="text-sm text-gray-600">({likesCount})</span>
        </button>

        <button
          onClick={() => setShowComments((s) => !s)}
          className="px-3 py-1 border rounded"
          aria-expanded={showComments}
        >
          Comments ({update.comment_count || 0})
        </button>

        {error && <div className="text-sm text-red-600 ml-3">{error}</div>}
      </footer>

      {showComments && (
        <div className="mt-3">
          <CommentsThread updateId={update.id} />
        </div>
      )}
    </article>
  );
}

UpdateCard.propTypes = {
  update: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    body: PropTypes.string,
    like_count: PropTypes.number,
    comment_count: PropTypes.number,
    created_at: PropTypes.string,
    featured_image: PropTypes.string,
    author_name: PropTypes.string
  }).isRequired,
  initialLiked: PropTypes.bool // optional
};
