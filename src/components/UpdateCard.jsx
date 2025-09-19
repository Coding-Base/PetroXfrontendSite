// src/components/UpdateCard.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import CommentsThread from "./CommentsThread";
import { likeUpdate, unlikeUpdate, checkLikeStatus } from "@/api"; // use helper functions

export default function UpdateCard({ update, initialLiked }) {
  const [liked, setLiked] = useState(Boolean(initialLiked));
  const [likesCount, setLikesCount] = useState(update.like_count ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedLikeState, setFetchedLikeState] = useState(false);

  useEffect(() => {
    setLikesCount(update.like_count ?? 0);
    if (initialLiked === undefined && !fetchedLikeState) {
      let mounted = true;
      (async () => {
        try {
          const res = await checkLikeStatus(update.slug ?? update.id);
          if (mounted && res?.data && typeof res.data.liked === "boolean") {
            setLiked(res.data.liked);
            setFetchedLikeState(true);
          }
        } catch (e) {
          // ignore if endpoint missing or error
        }
      })();
      return () => { mounted = false; };
    }
  }, [initialLiked, update, fetchedLikeState]);

  const toggleLike = async () => {
    if (loadingLike) return;
    setLoadingLike(true);
    setError(null);

    // optimistic
    const prevLiked = liked;
    const prevCount = likesCount;
    const newLiked = !prevLiked;
    setLiked(newLiked);
    setLikesCount(c => (newLiked ? c + 1 : Math.max(0, c - 1)));

    try {
      if (!prevLiked) {
        await likeUpdate(update.slug ?? update.id);
      } else {
        await unlikeUpdate(update.slug ?? update.id);
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
    try { return new Date(iso).toLocaleString(); } catch { return iso; }
  };

  return (
    <article className="p-4 bg-white rounded shadow">
      <header className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{update.title}</h3>
          <div className="text-xs text-gray-500 mt-1">
            {update.author_name ? `${update.author_name} • ` : ""}{formattedDate(update.created_at)}
          </div>
        </div>
      </header>

      {update.featured_image && (
        <div className="my-3">
          <img src={update.featured_image} alt={update.title} className="w-full max-h-56 object-cover rounded" onError={(e)=>{ e.target.style.display='none'; }} />
        </div>
      )}

      <div className="mt-2 prose">
        <ReactMarkdown>{update.body || ""}</ReactMarkdown>
      </div>

      <footer className="mt-4 flex items-center gap-3">
        <button onClick={toggleLike} disabled={loadingLike} className="px-3 py-1 border rounded flex items-center gap-2" aria-pressed={liked}>
          <span>{liked ? "Unlike" : "Like"}</span>
          <span className="text-sm text-gray-600">({likesCount})</span>
        </button>

        <button onClick={() => setShowComments(s => !s)} className="px-3 py-1 border rounded">
          Comments ({update.comment_count ?? 0})
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
    slug: PropTypes.string,
    body: PropTypes.string,
    like_count: PropTypes.number,
    comment_count: PropTypes.number,
    created_at: PropTypes.string,
    featured_image: PropTypes.string,
    author_name: PropTypes.string,
  }).isRequired,
  initialLiked: PropTypes.bool
};
