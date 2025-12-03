import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnrollmentDetail } from '@/hooks/useCourses';

export default function TestInstructionsPage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { enrollment, loading } = useEnrollmentDetail(enrollmentId);
  const [startingTest, setStartingTest] = useState(false);

  const handleStartTest = async () => {
    setStartingTest(true);
    // Small delay for UX
    setTimeout(() => {
      navigate(`/dashboard/course/${enrollmentId}/take-test`);
    }, 300);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const course = enrollment?.course;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-start md:items-center justify-center">
      <div className="max-w-3xl w-full max-h-[calc(100vh-4rem)] overflow-auto mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{course?.title}</h1>
            <p className="text-blue-100">Please read the instructions carefully before starting</p>
          </div>

          <div className="p-8 md:p-12">
            {/* Instructions Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="h-6 w-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 6v2M6 7h12M6 7h12m0 0a3 3 0 003-3V3a3 3 0 00-3-3H6a3 3 0 00-3 3v1a3 3 0 003 3zm0 12a3 3 0 003 3h12a3 3 0 003-3v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1z" />
                </svg>
                Examination Rules & Regulations
              </h2>

              <div className="space-y-4">
                <div className="flex items-start bg-red-50 border border-red-200 rounded-lg p-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-md bg-red-600 text-white font-bold mr-4">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Examination Malpractice is a Punishable Offense</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Any form of cheating, copying, or dishonest conduct will result in immediate disqualification and disciplinary action. This may include expulsion from the program.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-md bg-orange-600 text-white font-bold mr-4">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Maintain Professional Conduct</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Do not move your head excessively or behave in a suspicious manner while taking the test. Keep your eyes on the screen and maintain your composure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold mr-4">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Stay on the Test Tab</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Do not minimize this window or switch to other tabs/applications during the test. Leaving the tab may be flagged as suspicious activity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-green-50 border border-green-200 rounded-lg p-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-md bg-green-600 text-white font-bold mr-4">
                    4
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Complete Before Time Runs Out</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      It is advisable to complete and submit your test before the automatic submission time. After the deadline, your test will be automatically submitted regardless of completion status.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Test Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {enrollment?.course?.question_count || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Limit</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {course?.duration_minutes || 'No limit'}
                    {course?.duration_minutes && ' min'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Questions per Page</p>
                  <p className="text-2xl font-bold text-gray-800">10</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Mode</p>
                  <p className="text-2xl font-bold text-gray-800">Multiple Choice</p>
                </div>
              </div>
            </div>

            {/* Acknowledgment Checkbox */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4"
                  id="acknowledge"
                  defaultChecked={false}
                />
                <span className="ml-3 text-sm text-gray-700">
                  <span className="font-semibold">I acknowledge and agree</span> that I have read and understood all the examination rules and regulations above. I will conduct myself professionally and honestly during this test.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={() => navigate(`/dashboard/course/${enrollmentId}/waiting`)}
                className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
              >
                Go Back
              </button>
              <button
                onClick={handleStartTest}
                disabled={startingTest}
                className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70"
              >
                {startingTest ? 'Starting Test...' : 'Start Test Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
