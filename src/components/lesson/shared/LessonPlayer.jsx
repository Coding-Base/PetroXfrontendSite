import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

/**
 * LessonPlayer.jsx
 * Update: Mobile sticky bar always shows Take Test and Reset buttons (plus Next and Outline).
 *
 * Replace your existing src/components/lesson/shared/LessonPlayer.jsx with this file.
 * Assumes tailwindcss, framer-motion and react-hot-toast are available.
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

  // mobile outline drawer
  const [showOutlineMobile, setShowOutlineMobile] = useState(false);

  // ref for main scrollable lesson container
  const scrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ topicIndex: index }));
  }, [index, storageKey]);

  // Scroll to top of lesson container when index changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const fn = () => {
      try {
        if (typeof el.scrollTo === "function") el.scrollTo({ top: 0, behavior: "smooth" });
        else el.scrollTop = 0;
      } catch {
        el.scrollTop = 0;
      }
    };

    const rafId = requestAnimationFrame(() => {
      const t = setTimeout(fn, 30);
      return () => clearTimeout(t);
    });

    const safety = setTimeout(fn, 300);

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
    setShowOutlineMobile(false);
  };

  const skipCurrent = () => {
    if (!atEnd) {
      setIndex((i) => Math.min(i + 1, total - 1));
      setShowAllExamples(false);
      setRevealAnswers(false);
      toast.success("Topic skipped — progress saved");
      setShowOutlineMobile(false);
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
    setShowOutlineMobile(false);
  };

  /* ---------- Mobile sticky bar: Always show Take Test and Reset ---------- */
  const MobileStickyBar = () => {
    const pct = Math.round(((index + 1) / total) * 100);
    return (
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white px-3 py-2"
        style={{
          boxShadow: "0 -6px 18px rgba(15,23,42,0.06)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)",
        }}
        role="toolbar"
        aria-label="Lesson controls"
      >
        <div className="flex items-center gap-3">
          {/* Outline button (left) */}
          <button
            onClick={() => setShowOutlineMobile(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-white text-sm text-gray-700"
            aria-label="Open outline"
            title="Outline"
          >
            ☰
          </button>

          {/* Progress + title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate text-sm font-medium text-gray-800">{topicTitle}</div>
              <div className="text-xs font-semibold text-gray-600">{pct}%</div>
            </div>

            <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-indigo-600 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Action buttons (Next, Take Test, Reset) */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Next */}
            <button
              onClick={() => {
                setIndex((i) => Math.min(i + 1, total - 1));
                setShowAllExamples(false);
                setRevealAnswers(false);
                toast.success("Progress saved");
              }}
              className="h-10 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white"
              aria-label="Next topic"
              title="Next topic"
            >
              Next
            </button>

            {/* Take Test - always visible */}
            <a
              href="/dashboard/mytest"
              className="h-10 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white inline-flex items-center justify-center"
              aria-label="Take test"
              title="Take test"
            >
              Test
            </a>

            {/* Reset - always visible */}
            <button
              onClick={resetProgress}
              className="h-10 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
              aria-label="Reset progress"
              title="Reset"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ---------- Mobile Outline Drawer ---------- */
  const MobileOutlineDrawer = () => {
    return (
      <div
        className={`fixed inset-0 z-60 flex h-full w-full flex-col bg-white transition-all ${
          showOutlineMobile ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!showOutlineMobile}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="text-lg font-semibold">Lesson Outline</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowOutlineMobile(false);
              }}
              className="rounded-md border px-3 py-2 text-sm"
              aria-label="Close outline"
            >
              Close
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4">
          <ol className="space-y-3">
            {session.Topics.map((t, i) => (
              <li key={i} className="flex items-start justify-between gap-3 rounded-lg border p-3">
                <div className="flex items-start gap-3">
                  <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm ${i === index ? "bg-indigo-600 text-white" : "border text-gray-700"}`}>
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{t}</div>
                    <div className="mt-1 text-xs text-gray-500">{i === index ? "Current topic" : `Topic ${i + 1}`}</div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => {
                      goTo(i);
                    }}
                    className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Jump
                  </button>

                  <button
                    onClick={() => {
                      setIndex(i);
                      toast.success(`Moved to ${t}`);
                      setShowOutlineMobile(false);
                    }}
                    className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs"
                  >
                    Mark
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIndex(0);
                toast.success("Jumped to first topic");
                setShowOutlineMobile(false);
              }}
              className="rounded-md border px-3 py-2 text-sm"
            >
              First Topic
            </button>
            <button
              onClick={() => {
                setIndex(total - 1);
                toast.success("Jumped to last topic");
                setShowOutlineMobile(false);
              }}
              className="rounded-md border px-3 py-2 text-sm"
            >
              Last Topic
            </button>
            <button
              onClick={() => {
                resetProgress();
                setShowOutlineMobile(false);
              }}
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </div>
    );
  };

  /* ---------- Main JSX ---------- */
  return (
    // Increased bottom padding so mobile sticky bar can't overlay page interactive elements
    <div className="pb-32 md:pb-0">
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
                    <div className="mt-2 text-gray-600">
                      {!revealAnswers ? <em>Attempt the question on paper, then click Reveal Answers</em> : <div><strong>Answer:</strong> {q.a}</div>}
                    </div>
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

          {/* Desktop in-page controls (hidden on mobile) */}
          <div className="hidden md:flex flex-wrap items-center gap-3">
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
            <button onClick={resetProgress} className="ml-auto rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">Reset Progress</button>
          </div>
        </div>

        {/* Desktop sidebar */}
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

      {/* mobile sticky + outline drawer */}
      <div className="md:hidden">
        <MobileStickyBar />
        {showOutlineMobile && <MobileOutlineDrawer />}
      </div>
    </div>
  );
}
