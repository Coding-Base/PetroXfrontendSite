import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnrollmentDetail } from '@/hooks/useCourses';
import { useTestTimer, useTestAnswers } from '@/hooks/useTestTimer';
import { submitExam } from '@/api';
import { toast } from 'sonner';

export default function TestInterfacePage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { enrollment, loading: enrollmentLoading, refetch } = useEnrollmentDetail(enrollmentId);
  const { answers, setAnswer, isAnswered, answeredCount, getAnswersForSubmit } = useTestAnswers();
  const { formattedTime, isTimeUp } = useTestTimer(enrollment?.course?.end_time);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract questions from enrollment
  useEffect(() => {
    if (enrollment?.questions) {
      setQuestions(enrollment.questions);
      setLoading(false);
    }
  }, [enrollment]);

  // Auto-submit when time is up
  useEffect(() => {
    if (isTimeUp && !submitting) {
      handleSubmitTest(true);
    }
  }, [isTimeUp]);

  const questionsPerPage = 10;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIdx = currentPage * questionsPerPage;
  const endIdx = startIdx + questionsPerPage;
  const currentQuestions = questions.slice(startIdx, endIdx);

  const handleSelectAnswer = (questionId, choiceId) => {
    setAnswer(questionId, choiceId);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleJumpToQuestion = (questionIndex) => {
    const pageNum = Math.floor(questionIndex / questionsPerPage);
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  const handleSubmitTest = async (isAutoSubmit = false) => {
    if (!isAutoSubmit && !window.confirm('Are you sure you want to submit your test? This action cannot be undone.')) {
      return;
    }

    try {
      setSubmitting(true);
      const answersData = getAnswersForSubmit();
      await submitExam(enrollmentId, answersData);
      toast.success(isAutoSubmit ? 'Test auto-submitted due to time limit' : 'Test submitted successfully!');
      navigate(`/dashboard/course/${enrollmentId}/submitted`);
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Failed to submit test');
    } finally {
      setSubmitting(false);
    }
  };

  if (enrollmentLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Bar with Timer */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">{enrollment?.course?.title}</h2>
            <p className="text-sm text-gray-600">
              Question {startIdx + 1} - {Math.min(endIdx, questions.length)} of {questions.length}
            </p>
          </div>
          
          {/* Timer */}
          <div className={`flex items-center gap-3 px-4 py-2 rounded-lg font-mono font-bold text-lg ${
            isTimeUp ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            {formattedTime}
          </div>
        </div>
      </div>

      <div className="pt-20 pb-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Questions */}
          <div className="space-y-6">
            {currentQuestions.map((question, idx) => {
              const questionId = question.id;
              const questionIndex = startIdx + idx;
              const currentAnswer = answers[questionId];

              return (
                <div key={questionId} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                      {questionIndex + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium mb-4">{question.text}</p>
                      
                      {/* Choices */}
                      <div className="space-y-3">
                        {question.choices.map((choice) => (
                          <label
                            key={choice.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              currentAnswer === choice.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${questionId}`}
                              value={choice.id}
                              checked={currentAnswer === choice.id}
                              onChange={() => handleSelectAnswer(questionId, choice.id)}
                              className="w-4 h-4"
                            />
                            <span className="text-gray-700">{choice.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-4 justify-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="px-6 py-3 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>

            {currentPage === totalPages - 1 ? (
              <button
                onClick={() => handleSubmitTest(false)}
                disabled={submitting}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 font-medium text-white hover:from-green-700 hover:to-green-800 disabled:opacity-70 transition-all"
              >
                {submitting ? 'Submitting...' : 'Submit Test'}
              </button>
            ) : (
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="px-6 py-3 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            )}
          </div>

          {/* Page Indicator */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>

        {/* Sidebar - Question Navigation */}
        <div className="lg:col-span-1 h-fit sticky top-24">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Questions</h3>
            
            {/* Stats */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-700">
                <p className="font-medium">Answered: <span className="text-blue-600 font-bold">{answeredCount()}/{questions.length}</span></p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(answeredCount() / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrentPage = Math.floor(idx / questionsPerPage) === currentPage;
                const answered = isAnswered(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`aspect-square rounded font-semibold text-sm transition-all ${
                      isCurrentPage && startIdx <= idx && idx < endIdx
                        ? 'ring-2 ring-blue-600'
                        : ''
                    } ${
                      answered
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    title={`Question ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <span>Not Answered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
