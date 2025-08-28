import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./shared/Modal";
import LessonPlayer from "./shared/LessonPlayer";

// course components (each exports default component and courseContent)
import Maths from "./courses/Maths";
import Chemistry from "./courses/Chemistry";
import Physics from "./courses/Physics";
import Gst from "./courses/Gst";
import Biology from "./courses/Biology";

const LEVELS = ["100 Level", "200 Level", "300 Level", "400 Level", "500 Level"];
const COURSES_100 = [
  { key: "Maths", label: "Mathematics 101", comp: Maths },
  { key: "Chemistry", label: "Chemistry 101", comp: Chemistry },
  { key: "Physics", label: "Physics 101", comp: Physics },
  { key: "Gst", label: "GST (English) 101", comp: Gst },
  { key: "Biology", label: "Biology 101", comp: Biology }
];
const SEMESTERS = ["First Semester", "Second Semester"];

export default function LessonPath() {
  const [openLevel, setOpenLevel] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [openSemester, setOpenSemester] = useState(false);

  const [level, setLevel] = useState(null);
  const [course, setCourse] = useState(null); // { key, label, comp }
  const [semester, setSemester] = useState(null);

  const beginFlow = () => {
    setLevel(null);
    setCourse(null);
    setSemester(null);
    setOpenLevel(true);
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
      <Toaster position="top-right" />
      <button
        onClick={beginFlow}
        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
      >
        📘 Lesson Path
      </button>

      {/* Render player when selection complete */}
      {level === "100 Level" && course && semester ? (
        <div className="mt-6">
          {/* course.comp is a React component wrapper that renders LessonPlayer with courseContent */}
          {React.createElement(course.comp, { semester })}
        </div>
      ) : null}

      {/* LEVEL modal */}
      <Modal open={openLevel} onClose={() => setOpenLevel(false)} title="Select Your Level">
        <div className="grid grid-cols-2 gap-3">
          {LEVELS.map((lvl) => (
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

      {/* COURSE modal */}
      <Modal open={openCourse} onClose={() => setOpenCourse(false)} title={level === "100 Level" ? "Select Course (100 Level)" : "Unavailable"}>
        {level !== "100 Level" ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-800">
            The Learning Management for this level has not been set up yet — only <span className="font-semibold">100 Level</span> is available now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {COURSES_100.map((c) => (
              <motion.button
                key={c.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCourse(c);
                  setOpenCourse(false);
                  setOpenSemester(true);
                }}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {c.label}
              </motion.button>
            ))}
          </div>
        )}
      </Modal>

      {/* SEMESTER modal */}
      <Modal open={openSemester} onClose={() => setOpenSemester(false)} title="Select Semester">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {SEMESTERS.map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSemester(s);
                setOpenSemester(false);
                toast.success(`${s} loaded`);
              }}
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
