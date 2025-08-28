import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

/**
 * LessonPlayer.jsx
 * Updated: automatically scroll to the top of the loaded topic whenever `index` changes.
 *
 * Key behavior:
 * - scrollRef points to the scrollable lesson container
 * - useEffect listens to `index` and scrolls that container to top smoothly
 * - fallbacks included (rAF + small timeout) for best cross-device reliability
 */

export default function LessonPlayer({ courseLabel, courseContent, semester, onStudyAnother }) {
  const session = (courseContent || []).find((s) => s.Session === semester) || null;
  const total = session ? session.Topics.length : 0;
  const storageKey = `petrox_lms_${courseLabel.replace(/\s+/g, "_")}_${semester.replace(/\s+/g, "_")}`;

  const [index, setIndex] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return 0;
      const p = JSON.parse(raw);
      return p.topicIndex || 0;
    } catch {
      return 0;
    }
  });

  const [showAllExamples, setShowAllExamples] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);

  // ref for main scrollable lesson container
  const scrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ topicIndex: index }));
  }, [index, storageKey]);

  // Whenever index changes, scroll the lesson container to top.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Use requestAnimationFrame to wait for a render pass, then smooth scroll.
    // Also guard with a small timeout to handle some browsers/layouts where rAF alone isn't enough.
    const fn = () => {
      try {
        if (typeof el.scrollTo === "function") {
          el.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          el.scrollTop = 0;
        }
      } catch {
        // fallback
        el.scrollTop = 0;
      }
    };

    const rafId = requestAnimationFrame(() => {
      // tiny delay to ensure any content reflow completes
      const t = setTimeout(fn, 40);
      // cleanup for timeout if necessary
      const cleanup = () => clearTimeout(t);
      // attach cleanup to raf closure (no-op here) — we'll cancel via returned cleanup below
      return cleanup;
    });

    // also set a safety timeout
    const safety = setTimeout(() => {
      try {
        if (typeof el.scrollTo === "function") el.scrollTo({ top: 0, behavior: "smooth" });
        else el.scrollTop = 0;
      } catch {
        el.scrollTop = 0;
      }
    }, 250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safety);
    };
  }, [index]);

  if (!session) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
        No lessons found for this selection.
      </div>
    );
  }

  const topicTitle = session.Topics[index];
  const topicData = session.Content[index];
  const examples = topicData.examples || [];
  const displayCount = showAllExamples ? examples.length : Math.min(2, examples.length);
  const atEnd = index >= total - 1;

  const suggestionCount = 3;
  const suggestions = [];
  for (let i = index + 1; i <= Math.min(index + suggestionCount, total - 1); i++) {
    suggestions.push({ idx: i, title: session.Topics[i] });
  }

  const goTo = (i) => {
    const next = Math.min(Math.max(i, 0), total - 1);
    setIndex(next);
    setShowAllExamples(false);
    setRevealAnswers(false);
    toast.success(`Loaded: ${session.Topics[next]}`);
    // scroll handled by useEffect watching `index`
  };

  const skipCurrent = () => {
    if (!atEnd) {
      setIndex((i) => Math.min(i + 1, total - 1));
      setShowAllExamples(false);
      setRevealAnswers(false);
      toast.success("Topic skipped — progress saved");
      // scroll handled by useEffect
    } else {
      toast("This is the last topic");
    }
  };

  const resetProgress = () => {
    localStorage.removeItem(storageKey);
    setIndex(0);
    setShowAllExamples(false);
    setRevealAnswers(false);
    toast("Progress reset");
    // scroll handled by useEffect
  };

  // mobile sticky controls
  const MobileStickyBar = () => (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-3 h-[76px] safe-area-inset"
      style={{ boxShadow: "0 -6px 18px rgba(15,23,42,0.06)" }}
    >
      <div className="flex items-center gap-3 h-full">
        <div className="w-full">
          <div className="text-xs text-gray-600 flex items-center justify-between">
            <div className="truncate max-w-[58%] text-sm font-medium">{topicTitle}</div>
            <div className="font-medium text-sm">{Math.round(((index + 1) / total) * 100)}%</div>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-indigo-600 transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!atEnd ? (
            <button
              onClick={() => {
                setIndex((i) => Math.min(i + 1, total - 1));
                setShowAllExamples(false);
                setRevealAnswers(false);
                toast.success("Progress saved");
              }}
              className="whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white"
            >
              Next
            </button>
          ) : (
            <a
              href="/dashboard/mytest"
              className="whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white"
            >
              Take Test
            </a>
          )}
          <button
            onClick={resetProgress}
            className="whitespace-nowrap rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );

  return (
    // keep bottom padding so mobile fixed sticky bar doesn't overlap content
    <div className="pb-28 md:pb-0">
      <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
        <div className="space-y-6">
          {/* main scrollable lesson content */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            ref={scrollRef}
            className="rounded-2xl border bg-white p-6 shadow-sm lms-scroll lms-scroll-top max-h-[68vh] overflow-y-auto pb-6"
          >
            <div className="mb-4 text-xs uppercase tracking-wide text-gray-500">
              {courseLabel} • {semester}
            </div>
            <h2 className="mb-3 text-2xl font-bold">{topicTitle}</h2>

            <article className="prose max-w-none prose-p:leading-relaxed text-gray-800">
              {topicData.explanation.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>

            <div className="mt-6 space-y-4">
              {examples.slice(0, displayCount).map((ex, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border bg-gray-50 p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-800">{ex.title}</div>
                      {ex.problem && (
                        <div className="mt-1 text-sm">
                          <strong>Problem:</strong> {ex.problem}
                        </div>
                      )}
                      {ex.solution && (
                        <div className="mt-2 text-sm text-gray-800">
                          <strong>Solution:</strong> {ex.solution}
                        </div>
                      )}
                      {ex.steps && ex.steps.length > 0 && (
                        <ol className="mt-2 ml-4 list-decimal text-sm text-gray-700">
                          {ex.steps.map((s, j) => (
                            <li key={j} className="mb-1 whitespace-pre-line">
                              {s}
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                    <details className="min-w-[120px] rounded border bg-white p-3">
                      <summary className="cursor-pointer text-sm font-semibold text-indigo-700">More</summary>
                      <div className="mt-2 text-sm text-gray-800">
                        {ex.hint ? <div className="text-xs text-gray-600">Hint: {ex.hint}</div> : <div className="text-xs text-gray-600">No extra hints available.</div>}
                      </div>
                    </details>
                  </div>
                </motion.div>
              ))}

              {examples.length > 2 && (
                <div className="mt-2">
                  <button onClick={() => setShowAllExamples((s) => !s)} className="text-sm font-semibold text-indigo-700 hover:underline">
                    {showAllExamples ? "Show fewer examples" : `Show ${examples.length - 2} more example${examples.length - 2 > 1 ? "s" : ""}`}
                  </button>
                </div>
              )}
            </div>

            {/* Class work */}
            <div className="mt-6 rounded-xl border bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700">Class Work</h4>
                <div className="text-xs text-gray-500">Try on paper — reveal answers when ready</div>
              </div>

              <ul className="mt-3 space-y-3 text-sm">
                {(topicData.quiz || []).map((q, i) => (
                  <li key={i} className="rounded-md border p-3 bg-gray-50">
                    <div className="font-medium">Q{i + 1}. {q.q}</div>
                    <div className="mt-2 text-gray-600">{!revealAnswers ? <em>Attempt the question on paper, then click Reveal Answers</em> : <div><strong>Answer:</strong> {q.a}</div>}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center gap-3">
                <button onClick={() => setRevealAnswers((r) => !r)} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">{revealAnswers ? "Hide Answers" : "Reveal Answers"}</button>
                <button onClick={skipCurrent} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Skip this topic</button>
              </div>
            </div>

            {/* Suggested */}
            <div className="mt-6 rounded-xl border bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700">Suggested topics</h4>
                <div className="text-xs text-gray-500">Quick jump</div>
              </div>

              {suggestions.length === 0 ? (
                <div className="mt-3 text-sm text-gray-600">No suggested topics — you are at the end of this session.</div>
              ) : (
                <ul className="mt-3 space-y-3">
                  {suggestions.map((s) => (
                    <li key={s.idx} className="flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-800">{s.title}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => goTo(s.idx)} className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700">Jump</button>
                        <button onClick={() => { setIndex(s.idx); toast.success(`Moved to ${s.title}`); }} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">Mark as done</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3">
            {!atEnd ? (
              <>
                <button
                  onClick={() => {
                    setIndex((i) => Math.min(i + 1, total - 1));
                    setShowAllExamples(false);
                    setRevealAnswers(false);
                    toast.success("Progress saved");
                  }}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Next Topic
                </button>
                <a href="/dashboard/mytest" className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">Take Test</a>
              </>
            ) : (
              <>
                <a href="/dashboard/mytest" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Take Test for {courseLabel}</a>
                <button onClick={onStudyAnother} className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">Study Another Course</button>
              </>
            )}
            <button onClick={resetProgress} className="ml-auto rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hidden md:inline-flex">Reset Progress</button>
          </div>
        </div>

        <aside className="space-y-4 hidden md:block">
          <div className="rounded-2xl border bg-white p-5 shadow-sm lms-scroll max-h-[68vh] overflow-y-auto">
            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span className="ml-2 font-medium">{Math.round(((index + 1) / total) * 100)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-200">
              <div className="h-3 rounded-full bg-indigo-600 transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
            </div>
            <div className="mt-3 text-xs text-gray-500">Progress saved locally in this browser.</div>
            <div className="mt-3">
              <button onClick={resetProgress} className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Reset Progress</button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm lms-scroll max-h-[68vh] overflow-y-auto">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">Lesson Outline</h4>
            <ol className="space-y-2 text-sm">
              {session.Topics.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs ${i === index ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-300 text-gray-600"}`}>{i + 1}</span>
                  <button onClick={() => { setIndex(i); setShowAllExamples(false); setRevealAnswers(false); }} className={`${i === index ? "font-semibold text-indigo-700" : "text-gray-700 hover:text-gray-900"}`}>{t}</button>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm text-sm text-gray-600">To sync across devices later we can add backend persistence.</div>
        </aside>
      </div>

      <div className="md:hidden">
        <MobileStickyBar />
      </div>
    </div>
  );
}
