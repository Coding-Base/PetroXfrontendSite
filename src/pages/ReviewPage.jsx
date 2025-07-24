import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axios from 'axios';

const ReviewPage = ({ sessionId, isOpen, onClose, onRetake }) => {
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('summary'); // 'summary' or 'detailed'

  // Fetch test results when modal opens
  useEffect(() => {
    if (!isOpen || !sessionId) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `https://petroxtestbackend.onrender.com/api/test-session/${sessionId}/`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setTestDetails(response.data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch test results', err);
        setError('Failed to load test results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId, isOpen]);

  const questions = testDetails?.questions || [];
  const score = testDetails?.score || 0;
  const totalQuestions = testDetails?.question_count || questions.length;
  const scorePercentage = Math.round((score / totalQuestions) * 100);

  // Find option text by key
  const getOptionText = (question, optionKey) => {
    if (!optionKey) return 'Not answered';
    const key = optionKey.toUpperCase();
    const field = `option_${key.toLowerCase()}`;
    return question[field] || `Option ${key}`;
  };

  // Group questions by section
  const sections = testDetails?.sections || [];
  const sectionMap = {};
  sections.forEach(section => {
    sectionMap[section.id] = {
      name: section.name,
      questions: [],
      correctCount: 0
    };
  });

  questions.forEach((question, index) => {
    if (sectionMap[question.section]) {
      sectionMap[question.section].questions.push({
        ...question,
        number: index + 1
      });
      if (question.is_correct) {
        sectionMap[question.section].correctCount++;
      }
    }
  });

  const sectionResults = Object.values(sectionMap).filter(section => section.questions.length > 0);

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
                    {activeView === 'summary' ? 'Performance summary' : 'Reviewing all questions'}
                  </p>
                </Dialog.Title>

                {loading ? (
                  <div className="py-12 text-center">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                    </div>
                    <p className="mt-4 text-gray-600">
                      Loading your test results...
                    </p>
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-red-600">{error}</p>
                    <button
                      onClick={onClose}
                      className="mt-4 rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200"
                    >
                      Close
                    </button>
                  </div>
                ) : activeView === 'summary' ? (
                  <div className="mt-6">
                    {/* Overall Score Section */}
                    <div className="text-center mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Overall Score
                      </h2>
                      <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-4 mb-3">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full" 
                          style={{ width: `${scorePercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-lg font-semibold text-gray-700">
                        You scored: <span className="text-green-600">{scorePercentage}%</span>
                      </p>
                      <p className="text-gray-600">
                        ({score} out of {totalQuestions} questions correct)
                      </p>
                    </div>

                    {/* Sections Breakdown */}
                    <div className="space-y-6">
                      {sectionResults.map((section, index) => {
                        const sectionScore = Math.round((section.correctCount / section.questions.length) * 100);
                        
                        return (
                          <div key={index} className="border rounded-lg p-5">
                            <div className="flex flex-wrap justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold text-gray-800">{section.name}</h3>
                              <p className="text-base font-medium">
                                <span className="text-green-600">{section.correctCount}</span>
                                <span className="text-gray-600">/{section.questions.length}</span>
                                <span className="ml-2 text-gray-700">({sectionScore}%)</span>
                              </p>
                            </div>
                            
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                              <div 
                                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" 
                                style={{ width: `${sectionScore}%` }}
                              ></div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-700 mb-3">Questions:</h4>
                              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                                {section.questions.map(question => (
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
                        View Answers
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onRetake();
                        }}
                        className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                      >
                       
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
                  <div className="mt-6">
                    {/* Summary Header in Detailed View */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">Overall Performance</h3>
                          <p className="text-gray-600">
                            {score} out of {totalQuestions} correct ({scorePercentage}%)
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-green-600 font-bold">{score}</div>
                            <div className="text-sm text-gray-600">Correct</div>
                          </div>
                          <div className="text-center">
                            <div className="text-red-600 font-bold">{totalQuestions - score}</div>
                            <div className="text-sm text-gray-600">Incorrect</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveView('summary')}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Summary
                        </button>
                      </div>
                    </div>

                    {/* Questions List */}
                    <div className="max-h-[60vh] space-y-6 overflow-y-auto py-2 pr-2">
                      {questions.map((question, index) => {
                        const correctOption = question.correct_option;
                        return (
                          <div
                            key={question.id}
                            className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-200"
                          >
                            <div className="flex items-start">
                              <div
                                className={`${
                                  question.is_correct
                                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white'
                                    : 'bg-gradient-to-br from-red-400 to-red-600 text-white'
                                } mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold`}
                              >
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">
                                  {question.question_text}
                                </h4>

                                <div className="mt-4">
                                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                    <div className="mb-2 flex items-center">
                                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                                        ✓
                                      </span>
                                      <h5 className="font-medium text-green-800">
                                        Correct Answer
                                      </h5>
                                    </div>
                                    <p className="ml-8">
                                      <span className="font-bold">
                                        {correctOption}:
                                      </span>{" "}
                                      {getOptionText(question, correctOption)}
                                    </p>
                                  </div>

                                  {/* Explanation section */}
                                  {question.explanation && (
                                    <div className="mt-4 rounded-lg bg-blue-50 p-4">
                                      <h5 className="mb-2 font-medium text-blue-800">
                                        Explanation
                                      </h5>
                                      <p className="text-gray-700">
                                        {question.explanation}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap justify-end gap-3 border-t pt-4">
                      <button
                        type="button"
                        className="px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg hover:opacity-90 font-medium"
                        onClick={onClose}
                      >
                        Close Review
                      </button>
                      <button
                        type="button"
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 font-medium"
                        onClick={() => {
                          onClose();
                          onRetake();
                        }}
                      >
                        Retake Test
                      </button>
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
