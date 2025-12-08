import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axios from 'axios';

/**
 * ReviewPage
 *
 * Props:
 * - sessionId: id of the test session to fetch from the backend (preferred)
 * - isOpen: modal visibility
 * - onClose: close callback
 * - onRetake: retake callback (optional)
 * - localAnswers: optional object mapping questionId -> user's selected answer (e.g. { "459": "B", "526": "A" })
 *
 * Behavior:
 * - If sessionId is provided we fetch the session payload from the backend and merge localAnswers into it (localAnswers wins).
 * - If sessionId is not provided but localAnswers is provided, we build a minimal testDetails object so the review can still show the user's submitted answers
 *   (note: in that case question text/options may be missing unless the parent passes richer question data).
 * - Detailed view shows ONLY the questions the user got wrong, and for each shows:
 *     - Your Answer (letter + text if possible)
 *     - Correct Answer (letter + text if possible)
 */

const ReviewPage = ({ sessionId, isOpen, onClose, onRetake, localAnswers }) => {
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('summary'); // 'summary' or 'detailed'

  useEffect(() => {
    if (!isOpen) return;

    const fetchResults = async () => {
      // If sessionId is provided, fetch remote session and merge localAnswers into it
      if (sessionId) {
        try {
          setLoading(true);
          const token = localStorage.getItem('access_token');
          const response = await axios.get(
            `https://petroxtestbackend.onrender.com/api/test-session/${sessionId}/`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          let details = response.data ?? {};

          // If there are local answers, merge them into the question objects (override any server-stored user_answer)
          if (localAnswers && typeof localAnswers === 'object' && Array.isArray(details.questions)) {
            const localMap = {};
            Object.entries(localAnswers).forEach(([k, v]) => {
              localMap[String(k)] = v;
            });

            details = {
              ...details,
              questions: details.questions.map((q) => ({
                ...q,
                // server could already have per-question user_answer; localAnswers take precedence
                user_answer: localMap[String(q.id)] ?? q.user_answer ?? q.selected_choice ?? q.answer ?? null
              }))
            };
          }

          setTestDetails(details);
          setError('');
        } catch (err) {
          console.error('Failed to fetch test results', err);
          setError('Failed to load test results. Please try again.');
          setTestDetails(null);
        } finally {
          setLoading(false);
        }
        return;
      }

      // If no sessionId but we have localAnswers, build a minimal details object so review still shows user's answers
      if (!sessionId && localAnswers && typeof localAnswers === 'object') {
        try {
          setLoading(true);
          const questions = Object.entries(localAnswers).map(([qid, answer], idx) => ({
            id: Number(qid) || qid,
            question_text: 'Question text not available (session not fetched)',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            correct_option: null,
            user_answer: answer,
            // keep position
            _tmp_index: idx
          }));

          const details = {
            id: null,
            user: null,
            course: null,
            questions,
            start_time: null,
            end_time: null,
            score: null,
            duration: null,
            question_count: questions.length
          };

          setTestDetails(details);
          setError('');
        } catch (err) {
          console.error('Failed to build fallback test details', err);
          setError('Failed to prepare review data.');
          setTestDetails(null);
        } finally {
          setLoading(false);
        }
        return;
      }

      // otherwise nothing to show
      setTestDetails(null);
      setLoading(false);
    };

    fetchResults();
  }, [sessionId, isOpen, localAnswers]);

  // Helper: get option text safely (supports option_a...option_d)
  const getOptionText = (question, optionKey) => {
    if (optionKey === null || optionKey === undefined || optionKey === '') return 'Not answered';
    // If optionKey looks like an option letter "A","B", ...
    if (typeof optionKey === 'string' && optionKey.length <= 2) {
      const key = optionKey.toString().toUpperCase();
      const field = `option_${key.toLowerCase()}`;
      if (question && question[field]) return question[field];
      // fallback: maybe backend stored the full text as the answer
      return optionKey;
    }
    // If optionKey is numeric or long text, convert to string
    return String(optionKey);
  };

  // Normalize the server response into a consistent questions array.
  // Accepts optional externalAnswers map to prefer when deciding user's answer (but we already prefer localAnswers during fetch merge).
  const normalizeQuestions = (details) => {
    if (!details) return [];

    // try to get question ordering from session (if provided)
    const orderArr = details.question_order || details.questions_order || details.order || null;

    // possible top-level answers mapping (if server returned them)
    const topLevelAnswers =
      details.answers ||
      details.responses ||
      details.user_answers ||
      details.answer_map ||
      details.answerMap ||
      null;

    // convert topLevelAnswers to map
    const makeAnswerMap = (a) => {
      if (!a) return {};
      if (Array.isArray(a)) {
        const m = {};
        a.forEach((item) => {
          if (!item) return;
          // common shapes: { question: id, choice: 'A' } or { question_id: id, answer: 'A' }
          if (item.question || item.question_id || item.q) {
            const qid = item.question || item.question_id || item.q;
            const val = item.choice ?? item.answer ?? item.selected ?? item.value ?? null;
            if (qid != null) m[String(qid)] = val;
          } else if (item.id && (item.choice || item.answer)) {
            m[String(item.id)] = item.choice ?? item.answer;
          }
        });
        return m;
      }
      if (typeof a === 'object') {
        const m = {};
        Object.entries(a).forEach(([k, v]) => {
          if (v && typeof v === 'object') {
            m[String(k)] = v.choice ?? v.answer ?? v.selected ?? v.value ?? v;
          } else {
            m[String(k)] = v;
          }
        });
        return m;
      }
      return {};
    };

    const answerMap = makeAnswerMap(topLevelAnswers);
    const rawQuestions = Array.isArray(details.questions) ? details.questions : [];

    // build order index if present
    const orderIndex = {};
    if (Array.isArray(orderArr)) {
      orderArr.forEach((qid, idx) => {
        orderIndex[String(qid)] = idx;
      });
    }

    const normalized = rawQuestions.map((q, idx) => {
      const qid = q.id ?? q.pk ?? q.question_id ?? null;

      // user answer may be present in per-question fields or top-level mapping
      const userAns =
        (q && (q.user_answer ?? q.selected_choice ?? q.user_choice ?? q.selected_option ?? q.user_selected ?? q.answer)) ??
        answerMap[String(qid)] ??
        answerMap[qid] ??
        null;

      const correctOpt = q.correct_option ?? q.correct ?? q.answer_key ?? q.correct_answer ?? null;

      let isCorrect = null;
      if (typeof q.is_correct === 'boolean') {
        isCorrect = q.is_correct;
      } else if (userAns != null && correctOpt != null) {
        try {
          const ua = String(userAns).trim().toUpperCase();
          const ca = String(correctOpt).trim().toUpperCase();
          isCorrect = ua === ca;
        } catch {
          isCorrect = false;
        }
      } else {
        // if server explicitly included score or marking, and q has no correct option, set false by default
        isCorrect = false;
      }

      const userAnswerText = userAns ? getOptionText(q, userAns) : 'Not answered';
      const correctAnswerText = correctOpt ? getOptionText(q, correctOpt) : 'Not provided';

      const number = orderIndex[String(qid)] != null ? orderIndex[String(qid)] + 1 : idx + 1;

      return {
        ...q,
        id: qid,
        user_answer: userAns,
        user_answer_text: userAnswerText,
        correct_option: correctOpt,
        correct_option_text: correctAnswerText,
        is_correct: Boolean(isCorrect),
        number
      };
    });

    // sort by explicit order if provided
    if (Array.isArray(orderArr) && normalized.length > 0) {
      normalized.sort((a, b) => {
        const ai = orderIndex[String(a.id)] ?? a.number ?? 0;
        const bi = orderIndex[String(b.id)] ?? b.number ?? 0;
        return ai - bi;
      });
      normalized.forEach((q, i) => (q.number = i + 1));
    } else {
      normalized.forEach((q, i) => (q.number = i + 1));
    }

    return normalized;
  };

  // derived values
  const normalizedQuestions = normalizeQuestions(testDetails);
  const score = testDetails?.score ?? 0;
  const totalQuestions = testDetails?.question_count ?? normalizedQuestions.length;
  const scorePercentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  // only show questions the user FAILED in detailed mode
  const incorrectQuestions = normalizedQuestions.filter((q) => !q.is_correct);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-opacity-75 fixed inset-0 bg-black" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="border-b pb-4 text-2xl leading-6 font-bold text-gray-900"
                >
                  Test Review
                  <p className="mt-1 text-sm font-normal text-gray-500">
                    {activeView === 'summary' ? 'Performance summary' : 'Reviewing incorrect answers only'}
                  </p>
                </Dialog.Title>

                {loading ? (
                  <div className="py-12 text-center">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                    </div>
                    <p className="mt-4 text-gray-600">Loading your test results...</p>
                  </div>
                ) : error ? (
                  <div className="py-8 text-center">
                    <div className="mb-4 text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-medium text-red-600">{error}</p>
                    <button onClick={onClose} className="mt-4 rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200">Close</button>
                  </div>
                ) : activeView === 'summary' ? (
                  <div className="mt-6">
                    {/* Summary content unchanged (uses normalized data) */}
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">Overall Score</h2>
                      <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-4 mb-3">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
                          style={{ width: `${scorePercentage}%` }}
                        />
                      </div>
                      <p className="text-lg font-semibold text-gray-700">
                        You scored: <span className="text-green-600">{scorePercentage}%</span>
                      </p>
                      <p className="text-gray-600">
                        ({score} out of {totalQuestions} questions correct)
                      </p>
                    </div>

                    {/* Sections breakdown if provided */}
                    <div className="space-y-6">
                      {(testDetails?.sections || []).length === 0 ? null : (testDetails.sections || []).map((section, idx) => {
                        const qInSection = normalizedQuestions.filter(q => String(q.section) === String(section.id));
                        const correctCount = qInSection.filter(q => q.is_correct).length;
                        const sectionScore = qInSection.length ? Math.round((correctCount / qInSection.length) * 100) : 0;
                        if (qInSection.length === 0) return null;
                        return (
                          <div key={idx} className="border rounded-lg p-5">
                            <div className="flex flex-wrap justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold text-gray-800">{section.name}</h3>
                              <p className="text-base font-medium">
                                <span className="text-green-600">{correctCount}</span>
                                <span className="text-gray-600">/{qInSection.length}</span>
                                <span className="ml-2 text-gray-700">({sectionScore}%)</span>
                              </p>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                              <div
                                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                                style={{ width: `${sectionScore}%` }}
                              />
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-700 mb-3">Questions:</h4>
                              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                                {qInSection.map(question => (
                                  <div
                                    key={question.id}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      question.is_correct
                                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                                        : 'bg-gradient-to-br from-red-400 to-red-600'
                                    } text-white font-medium shadow-sm`}
                                  >
                                    {question.number}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => setActiveView('detailed')}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                      >
                        View Incorrect Answers
                      </button>
                      <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  </div>
                ) : (
                  // DETAILED: show ONLY incorrect questions
                  <div className="mt-6">
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">Incorrect Answers</h3>
                          <p className="text-gray-600">{incorrectQuestions.length} question(s) to review</p>
                        </div>
                        <div>
                          <button onClick={() => setActiveView('summary')} className="text-blue-600 hover:text-blue-800 font-medium">View Summary</button>
                        </div>
                      </div>
                    </div>

                    <div className="max-h-[60vh] space-y-6 overflow-y-auto py-2 pr-2">
                      {incorrectQuestions.length === 0 ? (
                        <div className="text-center text-gray-600 py-8">
                          Congratulations — you answered all questions correctly!
                        </div>
                      ) : incorrectQuestions.map((question) => (
                        <div key={question.id || question.number} className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-200">
                          <div className="flex items-start">
                            <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold bg-gradient-to-br from-red-400 to-red-600 text-white">
                              {question.number}
                            </div>

                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 mb-2">{question.question_text}</h4>

                              <div className="space-y-3">
                                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                  <div className="mb-2 flex items-center">
                                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white">✕</span>
                                    <h5 className="font-medium text-red-800">Your Answer</h5>
                                  </div>
                                  <p className="ml-8">
                                    <span className="font-bold mr-2">{String(question.user_answer ?? '—')}</span>
                                    {question.user_answer_text}
                                  </p>
                                </div>

                                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                  <div className="mb-2 flex items-center">
                                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">✓</span>
                                    <h5 className="font-medium text-green-800">Correct Answer</h5>
                                  </div>
                                  <p className="ml-8">
                                    <span className="font-bold mr-2">{String(question.correct_option ?? '—')}</span>
                                    {question.correct_option_text}
                                  </p>
                                </div>

                                {question.explanation && (
                                  <div className="mt-2 rounded-lg bg-blue-50 p-4">
                                    <h5 className="mb-2 font-medium text-blue-800">Explanation</h5>
                                    <p className="text-gray-700">{question.explanation}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap justify-end gap-3 border-t pt-4">
                      <button type="button" className="px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg hover:opacity-90 font-medium" onClick={onClose}>Close Review</button>
                      {/* Retake kept commented as in original */}
                      {/* <button type="button" className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 font-medium" onClick={() => { onClose(); onRetake(); }}>Retake Test</button> */}
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewPage;
