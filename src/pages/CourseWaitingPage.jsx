import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnrollmentDetail } from '@/hooks/useCourses';
import { startExam } from '@/api';
import { toast } from 'sonner';

export default function CourseWaitingPage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { enrollment, loading } = useEnrollmentDetail(enrollmentId);
  const [startingExam, setStartingExam] = useState(false);
  
  // Timer State
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (!enrollment?.course?.start_time) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const startTime = new Date(enrollment.course.start_time).getTime();
      const distance = startTime - now;

      if (distance <= 0) {
        setIsTimeUp(true);
        setTimeRemaining('00:00:00');
        return;
      }

      setIsTimeUp(false);
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      parts.push(`${hours.toString().padStart(2, '0')}h`);
      parts.push(`${minutes.toString().padStart(2, '0')}m`);
      parts.push(`${seconds.toString().padStart(2, '0')}s`);
      
      setTimeRemaining(parts.join(' '));
    };

    calculateTime();
    const timerId = setInterval(calculateTime, 1000);

    return () => clearInterval(timerId);
  }, [enrollment]);

  const handleStartTest = async () => {
    if (!isTimeUp) {
      toast.error('Test has not started yet. Please wait for the start time.');
      return;
    }

    try {
      setStartingExam(true);
      
      // 1. Call API to mark exam as started
      await startExam(enrollmentId);
      
      // 2. Navigate to the test interface
      const targetPath = `/dashboard/course/${enrollmentId}/test`;
      console.log("Navigating to:", targetPath); // Debugging: Check console to ensure this path matches your Router
      navigate(targetPath);
      
    } catch (err) {
      console.error("Start Exam Error:", err);
      // If backend says "already started", proceed to test anyway
      if (err?.response?.data?.detail?.includes('started') || err?.response?.status === 400) {
         navigate(`/dashboard/course/${enrollmentId}/test`);
      } else {
         toast.error(err?.response?.data?.detail || 'Failed to start exam. Check connection.');
      }
    } finally {
      setStartingExam(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Course not found</h1>
          <p className="text-gray-500 mb-6">We couldn't find the enrollment details you requested.</p>
          <button
            onClick={() => navigate('/dashboard/enrolled-courses')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const course = enrollment.course;

  return (
    // UPDATED LAYOUT: Removed 'flex items-center' to allow natural scrolling on mobile
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4 overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Header Banner */}
          <div className="bg-blue-600 px-6 py-6 sm:px-8 text-white text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isTimeUp ? 'Ready to Begin?' : 'Exam Starting Soon'}
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base">Please ensure you have a stable internet connection.</p>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            {/* Course Title Card */}
            <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">{course.title}</h2>
                <p className="text-gray-600 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">{course.description}</p>
            </div>

            {/* Countdown / Status Section */}
            <div className="flex justify-center mb-8 sm:mb-10">
                {!isTimeUp ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-center w-full max-w-md">
                        <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Time Remaining</p>
                        <div className="text-4xl sm:text-5xl font-mono font-bold text-blue-600 tracking-tight break-words">
                            {timeRemaining}
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm mt-4">
                            Starts: {new Date(course.start_time).toLocaleString()}
                        </p>
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 text-center w-full max-w-md animate-pulse-slow">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-1">Exam is Live!</h3>
                        <p className="text-green-600 text-sm sm:text-base">You may now enter the examination room.</p>
                    </div>
                )}
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 uppercase font-bold">Start Time</p>
                    <p className="font-semibold text-gray-800 text-lg">
                        {new Date(course.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 uppercase font-bold">Duration</p>
                    <p className="font-semibold text-gray-800 text-lg">
                        {course.duration_minutes} Mins
                    </p>
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 sm:p-6 mb-8">
              <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
                <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Important Instructions
              </h3>
              <ul className="space-y-2 text-amber-900 text-xs sm:text-sm list-disc pl-5">
                <li>Ensure you have a stable internet connection before starting.</li>
                <li>Do not refresh or close the browser window during the test.</li>
                <li>The system will automatically submit your answers when the time is up.</li>
                <li>Any attempt to open other tabs may be flagged as malpractice.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                <button
                  onClick={handleStartTest}
                  disabled={!isTimeUp || startingExam}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
                    isTimeUp
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {startingExam ? (
                      <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Entering Exam Room...
                      </span>
                  ) : isTimeUp ? (
                      'Start Test Now'
                  ) : (
                      'Waiting for start time...'
                  )}
                </button>

                <button
                  onClick={() => navigate('/dashboard/enrolled-courses')}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors text-sm sm:text-base"
                >
                  Cancel and Go Back
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
