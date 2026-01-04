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
      {/* CSS for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c7c7cc;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
      `}</style>

      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Header (Fixed at top of content) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 shrink-0">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Enrolled Courses</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Manage your special course enrollments</p>
          </div>
          <Button
            onClick={handleEnrollCourse}
            className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg transform active:scale-95"
          >
            + Enroll New Course
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 shrink-0">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse h-32" />
            ))}
          </div>
        )}

        {/* Scrollable Course List Area */}
        {!loading && (
          <div className="flex-1 min-h-0"> 
            {enrolledCourses.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-gray-100 mt-4">
                <div className="mx-auto h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.253s4.5 10 10 10 10-4.5 10-10S17.5 6.253 12 6.253z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No Enrolled Courses</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't enrolled in any special courses yet. Browse the catalog to get started.</p>
                <Button
                  onClick={handleEnrollCourse}
                  className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Explore Courses
                </Button>
              </div>
            ) : (
              /* Course List with Scrollbar */
              <div className="space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar pr-2 pb-4">
                {enrolledCourses.map((enrollment) => {
                  const now = new Date();
                  const courseStartTime = new Date(enrollment.course.start_time);
                  const courseEndTime = new Date(enrollment.course.end_time);
                  let status = 'Upcoming';
                  let statusColor = 'bg-blue-100 text-blue-700 border-blue-200';

                  if (enrollment.submitted) {
                    status = 'Completed';
                    statusColor = 'bg-green-100 text-green-700 border-green-200';
                  } else if (now > courseEndTime) {
                    status = 'Expired';
                    statusColor = 'bg-red-100 text-red-700 border-red-200';
                  } else if (now >= courseStartTime) {
                    status = 'In Progress';
                    statusColor = 'bg-amber-100 text-amber-700 border-amber-200';
                  }

                  return (
                    <div
                      key={enrollment.id}
                      onClick={() => handleCourseClick(enrollment)}
                      className="group bg-white rounded-xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-300 relative overflow-hidden"
                    >
                      {/* Left border accent */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${status === 'Completed' ? 'bg-green-500' : status === 'In Progress' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pl-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                                {enrollment.course.title}
                            </h3>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor}`}>
                              {status}
                            </span>
                          </div>
                          
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{enrollment.course.description}</p>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs md:text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span className="font-medium text-gray-700">Start:</span> {new Date(enrollment.course.start_time).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className="font-medium text-gray-700">End:</span> {new Date(enrollment.course.end_time).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                            {enrollment.submitted && (
                              <div className="flex items-center gap-1.5 ml-auto md:ml-0 bg-green-50 px-2 py-0.5 rounded text-green-700">
                                <span className="font-bold">Score:</span> {enrollment.score?.toFixed(1)}%
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 md:mt-0 flex-shrink-0">
                          <Button className={`w-full md:w-auto px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm ${
                              enrollment.submitted 
                                ? 'bg-white border-2 border-green-600 text-green-700 hover:bg-green-50' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                          }`}>
                            {enrollment.submitted ? 'View Results' : 'Enter Class'} &rarr;
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Pagination (Sticky Bottom) */}
        {!loading && enrolledCourses.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center items-center gap-4 shrink-0">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {Math.ceil(pagination.count / pagination.page_size)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * pagination.page_size >= pagination.count}
              className="px-4 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
