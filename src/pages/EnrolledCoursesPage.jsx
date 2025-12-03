import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnrolledCourses } from '@/hooks/useCourses';
import { Button } from '@/components/ui/button';

export default function EnrolledCoursesPage() {
  const navigate = useNavigate();
  const { enrolledCourses, loading, error, pagination, refetch } = useEnrolledCourses();
  const [currentPage, setCurrentPage] = useState(1);

  const handleCourseClick = (enrollment) => {
    const now = new Date();
    const courseStartTime = new Date(enrollment.course.start_time);
    const courseEndTime = new Date(enrollment.course.end_time);

    if (enrollment.submitted) {
      // Test already completed
      navigate(`/dashboard/course/${enrollment.id}/completed`);
    } else if (now >= courseStartTime) {
      // Test has started or is ongoing
      navigate(`/dashboard/course/${enrollment.id}/take-test`);
    } else {
      // Test hasn't started yet, show waiting page
      navigate(`/dashboard/course/${enrollment.id}/waiting`);
    }
  };

  const handleEnrollCourse = () => {
    navigate('/dashboard/enroll-course');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Enrolled Courses</h1>
            <p className="text-gray-600 mt-2">Manage your special course enrollments</p>
          </div>
          <Button
            onClick={handleEnrollCourse}
            className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
          >
            + Enroll Course
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse h-24" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && enrolledCourses.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.253s4.5 10 10 10 10-4.5 10-10S17.5 6.253 12 6.253z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Enrolled Courses Yet</h2>
            <p className="text-gray-600 mb-6">Start by enrolling in a special course to get started.</p>
            <Button
              onClick={handleEnrollCourse}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
            >
              Explore Courses
            </Button>
          </div>
        )}

        {/* Courses List */}
        {!loading && enrolledCourses.length > 0 && (
          <div className="space-y-4">
            {enrolledCourses.map((enrollment) => {
              const now = new Date();
              const courseStartTime = new Date(enrollment.course.start_time);
              const courseEndTime = new Date(enrollment.course.end_time);
              let status = 'Upcoming';
              let statusColor = 'bg-blue-100 text-blue-800';

              if (enrollment.submitted) {
                status = 'Completed';
                statusColor = 'bg-green-100 text-green-800';
              } else if (now > courseEndTime) {
                status = 'Expired';
                statusColor = 'bg-red-100 text-red-800';
              } else if (now >= courseStartTime) {
                status = 'In Progress';
                statusColor = 'bg-yellow-100 text-yellow-800';
              }

              return (
                <div
                  key={enrollment.id}
                  onClick={() => handleCourseClick(enrollment)}
                  className="bg-white rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{enrollment.course.title}</h3>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
                          {status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{enrollment.course.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium text-gray-800">Start:</span>
                          <p>{new Date(enrollment.course.start_time).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">End:</span>
                          <p>{new Date(enrollment.course.end_time).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">Enrolled:</span>
                          <p>{new Date(enrollment.enrolled_at).toLocaleDateString()}</p>
                        </div>
                        {enrollment.submitted && (
                          <div>
                            <span className="font-medium text-gray-800">Score:</span>
                            <p className="text-lg font-bold text-green-600">{enrollment.score?.toFixed(2)}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all">
                        {enrollment.submitted ? 'View Results' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && enrolledCourses.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {Math.ceil(pagination.count / pagination.page_size)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * pagination.page_size >= pagination.count}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
