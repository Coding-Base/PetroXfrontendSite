import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnrollmentDetail } from '@/hooks/useCourses';
import { Button } from '@/components/ui/button';

export default function TestCompletionPage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  const { enrollment, loading } = useEnrollmentDetail(enrollmentId);

  const handleReturn = () => {
    navigate('/dashboard/enrolled-courses');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-8 0v2a2 2 0 002 2h4a2 2 0 002-2z" />
            </svg>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Test Already Completed
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You have already taken this test. You cannot retake it.
          </p>

          {/* Test Summary */}
          {enrollment && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Test Name</p>
                  <p className="text-lg font-bold text-gray-800">{enrollment.course?.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Enrollment Date</p>
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(enrollment.enrolled_at).toLocaleDateString()}
                  </p>
                </div>
                {enrollment.submitted_at && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Submission Time</p>
                      <p className="text-lg font-bold text-gray-800">
                        {new Date(enrollment.submitted_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Your Score</p>
                      <p className="text-3xl font-bold text-purple-600">{enrollment.score?.toFixed(2)}%</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-yellow-900 mb-3">Why can't I retake this test?</h3>
            <p className="text-yellow-800 text-sm">
              Each special course test can only be taken once. This ensures fair assessment and maintains the integrity of the evaluation process. If you believe there was an issue with your submission, please contact the administrator.
            </p>
          </div>

          {/* Action Button */}
          <div className="space-y-3">
            <Button
              onClick={handleReturn}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              Back to Enrolled Courses
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full px-8 py-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
