// src/components/lesson/LessonPath.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LessonContent from "./LessonContent";

const LEVELS = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"];
const COURSES_100 = [
  { key: "Maths", label: "Mathematics 101" },
  { key: "Chemistry", label: "Chemistry 101" },
  { key: "Physics", label: "Physics 101" },
  { key: "Gst", label: "GST (English) 101" }
];
const SEMESTERS = ["First Semester", "Second Semester"];

const storageKey = (courseKey, semester) => `petrox_lms_${courseKey}_${semester}`;

const Modal = ({ open, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ y: 12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 8, scale: 0.99 }}
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button onClick={onClose} className="rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5">{children}</div>
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
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{pct}%</span>
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

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ topicIndex: index }));
  }, [index, key]);

  if (!session) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">No lessons found for this selection.</div>;
  }

  const topicTitle = session.Topics[index];
  const topicData = session.Content[index];
  const atEnd = index >= total - 1;

  const onNext = () => {
    if (!atEnd) {
      setIndex(i => Math.min(i + 1, total - 1));
      toast.success("Progress saved locally");
    } else {
      toast.success(`You finished ${courseLabel} • ${semester}`);
      onStudyAnother();
    }
  };

  const resetProgress = () => {
    localStorage.removeItem(key);
    setIndex(0);
    toast("Progress reset", { icon: "♻️" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 text-xs uppercase tracking-wide text-gray-500">{courseLabel} • {semester}</div>
          <h2 className="mb-3 text-2xl font-bold">{topicTitle}</h2>

          {/* Explanation */}
          <article className="prose max-w-none prose-p:leading-relaxed text-gray-800">
            {/* topicData.explanation is a multi-paragraph string, render as paragraphs */}
            {topicData.explanation.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </article>

          {/* Examples */}
          <div className="mt-6 space-y-4">
            {topicData.examples.map((ex, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border bg-gray-50 p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">{ex.title}</div>
                    <div className="mt-1 text-sm"><strong>Problem:</strong> {ex.problem}</div>
                    <div className="mt-2 text-sm text-gray-800"><strong>Solution:</strong> {ex.solution}</div>
                    {ex.steps && ex.steps.length > 0 && (
                      <ol className="mt-2 ml-4 list-decimal text-sm text-gray-700">
                        {ex.steps.map((s, j) => <li key={j} className="mb-1 whitespace-pre-line">{s}</li>)}
                      </ol>
                    )}
                  </div>
                  <details className="min-w-[120px] rounded border bg-white p-3">
                    <summary className="cursor-pointer text-sm font-semibold text-indigo-700">More</summary>
                    <div className="mt-2 text-sm text-gray-800">
                      {/* optional extra commentary */}
                    </div>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3">
          {!atEnd ? (
            <>
              <button onClick={onNext} className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Next Topic</button>
              <a href="/dashboard/my-tests" className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">Take Test</a>
            </>
          ) : (
            <>
              <a href="/dashboard/my-tests" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Take Test for {courseLabel}</a>
              <button onClick={onStudyAnother} className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">Study Another Course</button>
            </>
          )}
          <button onClick={resetProgress} className="ml-auto rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">Reset Progress</button>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <Progress current={index} total={total} />
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h4 className="mb-3 text-sm font-semibold text-gray-700">Lesson Outline</h4>
          <ol className="space-y-2 text-sm">
            {session.Topics.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs ${i === index ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 text-gray-600'}`}>{i + 1}</span>
                <button onClick={() => setIndex(i)} className={`${i === index ? 'font-semibold text-indigo-700' : 'text-gray-700 hover:text-gray-900'}`}>{t}</button>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm text-sm text-gray-600">
          Your progress is saved locally in this browser only. To sync across devices, we can add backend persistence later.
        </div>
      </aside>
    </div>
  );
};

export default function LessonPath() {
  const [openLevel, setOpenLevel] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [openSemester, setOpenSemester] = useState(false);

  const [level, setLevel] = useState(null);
  const [course, setCourse] = useState(null);
  const [semester, setSemester] = useState(null);

  // Open the level modal when user clicks the launcher
  const beginFlow = () => {
    setLevel(null);
    setCourse(null);
    setSemester(null);
    setOpenLevel(true);
  };

  useEffect(() => {
    // no auto-open — user triggers the launcher
  }, []);

  const onStudyAnother = () => {
    setCourse(null);
    setSemester(null);
    setOpenLevel(false);
    setOpenCourse(true);
  };

  // Handle level selection (toaster for non-100)
  const handleSelectLevel = (lvl) => {
    setLevel(lvl);
    setOpenLevel(false);
    setOpenCourse(true);

    if (lvl !== "100 Level") {
      // show friendly toast and keep course modal open with message
      toast.error("The Learning Management for this level has not been set up yet — only 100 Level is available now.");
    }
  };

  return (
    <div className="w-full">
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
            <motion.button
              key={lvl}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectLevel(lvl)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
            >
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
              <motion.button
                key={c.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setCourse(c); setOpenCourse(false); setOpenSemester(true); }}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
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
            <motion.button
              key={s}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSemester(s); setOpenSemester(false); toast.success(`${s} loaded`); }}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {s}
            </motion.button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
