// src/components/lesson/LessonPath.jsx
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LessonContent from "./LessonContent";

/* Tailwind classes assumed. */
const LEVELS = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"];
const COURSES_100 = [
  { key: "Maths", label: "Mathematics 101" },
  { key: "Chemistry", label: "Chemistry 101" },
  { key: "Physics", label: "Physics 101" },
  { key: "Gst", label: "GST (English) 101" }
];
const SEMESTERS = ["First Semester", "Second Semester"];
const storageKey = (courseKey, semester) => `petrox_lms_${courseKey}_${semester}`;

/* Scrollbar / mobile scroll styles */
const ScrollbarStyles = () => (
  <style>{`
    .lms-scroll {
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: rgba(79,70,229,0.8) rgba(229,231,235,0.8);
    }
    .lms-scroll::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    .lms-scroll::-webkit-scrollbar-track {
      background: rgba(229,231,235,0.8);
      border-radius: 10px;
    }
    .lms-scroll::-webkit-scrollbar-thumb {
      background-color: rgba(79,70,229,0.85);
      border-radius: 10px;
      border: 2px solid rgba(229,231,235,0.8);
    }
    /* Ensure body bottom padding so sticky doesn't overlap content when opened */
    @media (max-width: 768px) {
      body { padding-bottom: 72px; } /* allows space for sticky bar */
    }
  `}</style>
);

/* Modal component with scrollable body */
const Modal = ({ open, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div initial={{ y: 12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 8, scale: 0.99 }} className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button onClick={onClose} className="rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 lms-scroll max-h-[70vh] sm:max-h-[60vh] overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Progress = ({ current, total }) => {
  const pct = total === 0 ? 0 : Math.round(((current + 1) / total) * 100);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span className="ml-2 font-medium">{pct}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-gray-200">
        <div className="h-3 rounded-full bg-indigo-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const LessonPlayer = ({ courseKey, courseLabel, semester, onStudyAnother }) => {
  const courseArr = LessonContent[courseKey] || [];
  const session = courseArr.find(s => s.Session === semester) || null;
  const total = session ? session.Topics.length : 0;
  const key = storageKey(courseKey, semester);

  // topic index state loaded from localStorage per course/semester
  const [index, setIndex] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      return parsed.topicIndex || 0;
    } catch {
      return 0;
    }
  });

  // controls whether the topic shows all examples or only the first two (mobile-friendly)
  const [showAllExamples, setShowAllExamples] = useState(false);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ topicIndex: index }));
  }, [index, key]);

  if (!session) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">No lessons found for this selection.</div>;
  }

  const topicTitle = session.Topics[index];
  const topicData = session.Content[index];
  const examples = topicData.examples || [];
  const displayCount = showAllExamples ? examples.length : Math.min(2, examples.length); // default show 2
  const atEnd = index >= total - 1;

  // suggestions: next up to 3 topics
  const suggestionCount = 3;
  const suggestions = [];
  for (let i = index + 1; i <= Math.min(index + suggestionCount, total - 1); i++) {
    suggestions.push({ idx: i, title: session.Topics[i] });
  }

  // Actions
  const goTo = (i) => {
    const nextIdx = Math.min(Math.max(i, 0), total - 1);
    setIndex(nextIdx);
    setShowAllExamples(false);
    toast.success(`Loaded: ${session.Topics[nextIdx]}`);
  };

  const markAsDone = (i) => {
    if (i <= index) {
      toast("Already passed that topic", { icon: "ℹ️" });
      return;
    }
    setIndex(i);
    setShowAllExamples(false);
    toast.success(`Marked "${session.Topics[i]}" and moved to it`);
  };

  const skipCurrent = () => {
    if (!atEnd) {
      setIndex(i => Math.min(i + 1, total - 1));
      setShowAllExamples(false);
      toast.success("Topic skipped — progress saved");
    } else {
      toast("This is the last topic", { icon: "ℹ️" });
    }
  };

  const resetProgress = () => {
    localStorage.removeItem(key);
    setIndex(0);
    setShowAllExamples(false);
    toast("Progress reset", { icon: "♻️" });
  };

  // sticky bottom controls for mobile: show Next/Take Test/Reset + progress
  const MobileStickyBar = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-3">
      <div className="flex items-center gap-3">
        <div className="w-full">
          <div className="text-xs text-gray-600 flex items-center justify-between">
            <div>{topicTitle}</div>
            <div className="font-medium">{Math.round(((index + 1) / total) * 100)}%</div>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!atEnd ? (
            <button onClick={() => { setIndex(i => Math.min(i + 1, total - 1)); setShowAllExamples(false); toast.success("Progress saved"); }} className="whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">Next</button>
          ) : (
            <a href="/dashboard/mytest" className="whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">Take Test</a>
          )}
          <button onClick={resetProgress} className="whitespace-nowrap rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Reset</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* desktop+mobile layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
        <div className="space-y-6">
          {/* lesson content area; scrollable on mobile */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-white p-6 shadow-sm lms-scroll max-h-[68vh] overflow-y-auto">
            <div className="mb-4 text-xs uppercase tracking-wide text-gray-500">{courseLabel} • {semester}</div>
            <h2 className="mb-3 text-2xl font-bold">{topicTitle}</h2>

            <article className="prose max-w-none prose-p:leading-relaxed text-gray-800">
              {topicData.explanation.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </article>

            {/* Examples (show first 2 by default; toggle to show all) */}
            <div className="mt-6 space-y-4">
              {examples.slice(0, displayCount).map((ex, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border bg-gray-50 p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-800">{ex.title}</div>
                      {ex.problem && <div className="mt-1 text-sm"><strong>Problem:</strong> {ex.problem}</div>}
                      {ex.solution && <div className="mt-2 text-sm text-gray-800"><strong>Solution:</strong> {ex.solution}</div>}
                      {ex.steps && ex.steps.length > 0 && (
                        <ol className="mt-2 ml-4 list-decimal text-sm text-gray-700">
                          {ex.steps.map((s, j) => <li key={j} className="mb-1 whitespace-pre-line">{s}</li>)}
                        </ol>
                      )}
                    </div>

                    <details className="min-w-[120px] rounded border bg-white p-3">
                      <summary className="cursor-pointer text-sm font-semibold text-indigo-700">More</summary>
                      <div className="mt-2 text-sm text-gray-800">
                        {/* optional per-example hint or commentary */}
                        {ex.hint ? <div className="text-xs text-gray-600">Hint: {ex.hint}</div> : <div className="text-xs text-gray-600">No extra hints available.</div>}
                      </div>
                    </details>
                  </div>
                </motion.div>
              ))}

              {/* Show More / Show Less if there are more examples */}
              {examples.length > 2 && (
                <div className="mt-2">
                  <button onClick={() => setShowAllExamples(s => !s)} className="text-sm font-semibold text-indigo-700 hover:underline">
                    {showAllExamples ? "Show fewer examples" : `Show ${examples.length - 2} more example${examples.length - 2 > 1 ? 's' : ''}`}
                  </button>
                </div>
              )}
            </div>

            {/* Suggested topics & Skip */}
            <div className="mt-6 rounded-xl border bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700">Suggested topics</h4>
                <div className="text-xs text-gray-500">You may jump ahead</div>
              </div>

              {suggestions.length === 0 ? (
                <div className="mt-3 text-sm text-gray-600">No suggested topics — you are at the end of this session.</div>
              ) : (
                <ul className="mt-3 space-y-3">
                  {suggestions.map(s => (
                    <li key={s.idx} className="flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-800">{s.title}</div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => goTo(s.idx)} className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700">Jump</button>
                        <button onClick={() => markAsDone(s.idx)} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">Mark as done</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex items-center gap-3">
                <button onClick={skipCurrent} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Skip this topic</button>
                <div className="text-xs text-gray-500">or use the Next Topic button below</div>
              </div>
            </div>
          </motion.div>

          {/* Desktop navigation area (kept) */}
          <div className="flex flex-wrap items-center gap-3">
            {!atEnd ? (
              <>
                <button onClick={() => { setIndex(i => Math.min(i + 1, total - 1)); setShowAllExamples(false); toast.success("Progress saved"); }} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Next Topic</button>
                <a href="/dashboard/my-tests" className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">Take Test</a>
              </>
            ) : (
              <>
                <a href="/dashboard/my-tests" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Take Test for {courseLabel}</a>
                <button onClick={onStudyAnother} className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">Study Another Course</button>
              </>
            )}
            <button onClick={resetProgress} className="ml-auto rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hidden md:inline-flex">Reset Progress</button>
          </div>
        </div>

        {/* Right column */}
        <aside className="space-y-4 hidden md:block">
          <div className="rounded-2xl border bg-white p-5 shadow-sm lms-scroll max-h-[68vh] overflow-y-auto">
            <Progress current={index} total={total} />
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
                  <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs ${i === index ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 text-gray-600'}`}>{i + 1}</span>
                  <button onClick={() => { setIndex(i); setShowAllExamples(false); }} className={`${i === index ? 'font-semibold text-indigo-700' : 'text-gray-700 hover:text-gray-900'}`}>{t}</button>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm text-sm text-gray-600">
            To sync across devices later we can add backend persistence.
          </div>
        </aside>
      </div>

      {/* Mobile sticky bar for progress and controls */}
      <div className="md:hidden">
        <MobileStickyBar />
      </div>
    </>
  );
};

export default function LessonPath() {
  const [openLevel, setOpenLevel] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [openSemester, setOpenSemester] = useState(false);

  const [level, setLevel] = useState(null);
  const [course, setCourse] = useState(null);
  const [semester, setSemester] = useState(null);

  const beginFlow = () => {
    setLevel(null);
    setCourse(null);
    setSemester(null);
    setOpenLevel(true);
  };

  useEffect(() => {
    // no auto-open; manual launch
  }, []);

  const onStudyAnother = () => {
    setCourse(null);
    setSemester(null);
    setOpenLevel(false);
    setOpenCourse(true);
  };

  const handleSelectLevel = (lvl) => {
    setLevel(lvl);
    setOpenLevel(false);
    setOpenCourse(true);
    if (lvl !== "100 Level") {
      toast.error("The Learning Management for this level has not been set up yet — only 100 Level is available now.");
    }
  };

  return (
    <div className="w-full">
      <ScrollbarStyles />
      <Toaster position="top-right" />

      <button onClick={beginFlow} className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
        📘 Lesson Path
      </button>

      {level === "100 Level" && course && semester ? (
        <div className="mt-6">
          <LessonPlayer courseKey={course.key} courseLabel={course.label} semester={semester} onStudyAnother={onStudyAnother} />
        </div>
      ) : null}

      {/* Level modal */}
      <Modal open={openLevel} onClose={() => setOpenLevel(false)} title="Select Your Level">
        <div className="grid grid-cols-2 gap-3">
          {LEVELS.map(lvl => (
            <motion.button key={lvl} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleSelectLevel(lvl)} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
              {lvl}
            </motion.button>
          ))}
        </div>
      </Modal>

      {/* Course modal */}
      <Modal open={openCourse} onClose={() => setOpenCourse(false)} title={level === "100 Level" ? "Select Course (100 Level)" : "Unavailable"}>
        {level !== "100 Level" ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-800">
            The Learning Management for this level has not been set up yet — only <span className="font-semibold">100 Level</span> is available now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {COURSES_100.map(c => (
              <motion.button key={c.key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setCourse(c); setOpenCourse(false); setOpenSemester(true); }} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
                {c.label}
              </motion.button>
            ))}
          </div>
        )}
      </Modal>

      {/* Semester modal */}
      <Modal open={openSemester} onClose={() => setOpenSemester(false)} title="Select Semester">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {SEMESTERS.map(s => (
            <motion.button key={s} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setSemester(s); setOpenSemester(false); toast.success(`${s} loaded`); }} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
              {s}
            </motion.button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

