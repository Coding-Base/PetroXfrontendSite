import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnrollmentDetail } from '@/hooks/useCourses';
import { useTestTimer } from '@/hooks/useTestTimer';
import { startExam } from '@/api';
import { toast } from 'sonner';

export default function CourseWaitingPage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { enrollment, loading } = useEnrollmentDetail(enrollmentId);
  const [startingExam, setStartingExam] = useState(false);

  // Calculate countdown to start time
  const { timeRemaining, isTimeUp, formattedTime } = useTestTimer(
    enrollment?.course?.start_time
  );

  const handleStartTest = async () => {
    if (!isTimeUp) {
      toast.error('Test has not started yet. Please wait for the start time.');
      return;
    }

    try {
      setStartingExam(true);
      await startExam(enrollmentId);
      // Navigate to instructions/onboarding page
      navigate(`/dashboard/course/${enrollmentId}/instructions`);
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Failed to start exam');
    } finally {
      setStartingExam(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
          <button
            onClick={() => navigate('/dashboard/enrolled-courses')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go back to courses
          </button>
        </div>
      </div>
    );
  }

  const course = enrollment.course;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl w-full max-h-[calc(100vh-4rem)] overflow-auto mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {isTimeUp ? 'Ready to Begin?' : 'Exam Starting Soon'}
            </h1>
          </div>

          {/* Course Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          {/* Countdown Timer */}
          {!isTimeUp ? (
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4">Test starts at:</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(course.start_time).toLocaleString()}
              </p>
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-8 mb-6">
                <p className="text-gray-600 text-sm mb-2">Time remaining</p>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 font-mono">
                  {formattedTime}
                </div>
              </div>
              <p className="text-gray-600">
                The test will automatically open when the countdown reaches zero. Please be ready!
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
              <svg className="h-12 w-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-green-800 mb-2">Test Ready!</h3>
              <p className="text-green-700">
                The test is now available. Click the button below to begin.
              </p>
            </div>
          )}

          {/* Exam Details */}
          <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 rounded-lg p-6">
            <div>
              <p className="text-sm font-medium text-gray-600">Start Time</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(course.start_time).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">End Time</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(course.end_time).toLocaleTimeString()}
              </p>
            </div>
            {course.duration_minutes > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600">Duration</p>
                <p className="text-lg font-semibold text-gray-800">
                  {course.duration_minutes} minutes
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important Instructions
            </h3>
            <ul className="space-y-2 text-yellow-900 text-sm">
              <li className="flex">
                <span className="font-bold mr-3">1.</span>
                <span>Examination malpractice is a punishable offense</span>
              </li>
              <li className="flex">
                <span className="font-bold mr-3">2.</span>
                <span>Do not move your head or behave suspiciously while taking the test</span>
              </li>
              <li className="flex">
                <span className="font-bold mr-3">3.</span>
                <span>Do not minimize your screen or leave this tab</span>
              </li>
              <li className="flex">
                <span className="font-bold mr-3">4.</span>
                <span>It is advisable to finish before the system automatically submits for you</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartTest}
            disabled={!isTimeUp || startingExam}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white text-lg transition-all ${
              isTimeUp
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            } ${startingExam ? 'opacity-70' : ''}`}
          >
            {startingExam ? 'Starting Exam...' : isTimeUp ? 'Start Test Now' : 'Waiting for test to start...'}
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard/enrolled-courses')}
            className="w-full mt-4 py-2 px-6 rounded-lg font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
}
