import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div initial={{ y: 12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 8, scale: 0.99 }} className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button onClick={onClose} className="rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 max-h-[70vh] overflow-y-auto lms-scroll">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
