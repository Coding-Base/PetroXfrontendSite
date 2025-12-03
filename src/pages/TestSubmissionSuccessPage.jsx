import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnrollmentDetail } from '@/hooks/useCourses';

export default function TestSubmissionSuccessPage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { enrollment, loading } = useEnrollmentDetail(enrollmentId);

  const handleReturn = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Test Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your exam has been received and processed. Your score has been calculated and saved.
          </p>

          {/* Test Summary */}
          {enrollment && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Test Name</p>
                  <p className="text-lg font-bold text-gray-800">{enrollment.course?.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Submission Time</p>
                  <p className="text-lg font-bold text-gray-800">
                    {enrollment.submitted_at ? new Date(enrollment.submitted_at).toLocaleString() : 'Just now'}
                  </p>
                </div>
                {enrollment.score !== null && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Your Score</p>
                      <p className="text-3xl font-bold text-green-600">{enrollment.score?.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <p className="text-lg font-bold">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          ✓ Completed
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">Important Information</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Your answers have been recorded and your score has been calculated</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>You can view your results and feedback in your dashboard</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>This test cannot be retaken once submitted</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={handleReturn}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Footer Message */}
        <p className="text-center text-gray-600 mt-6">
          Thank you for taking the test. Good luck with your score!
        </p>
      </div>
    </div>
  );
}
