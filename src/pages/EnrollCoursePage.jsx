import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses, useEnrolledCourses } from '@/hooks/useCourses';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function EnrollCoursePage() {
  const navigate = useNavigate();
  const { courses, loading: searchLoading, error: searchError, searchCourses, enroll } = useCourses();
  const { enrolledCourses } = useEnrolledCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolling, setEnrolling] = useState(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());

  // Track enrolled course IDs
  useEffect(() => {
    const ids = new Set(enrolledCourses.map(e => e.course.id));
    setEnrolledCourseIds(ids);
  }, [enrolledCourses]);

  // Search for courses
  const handleSearch = async (e) => {
    e.preventDefault();
    await searchCourses(searchTerm);
  };

  // Enroll in a course
  const handleEnroll = async (courseId, e) => {
    if (e) e.stopPropagation();
    try {
      setEnrolling(courseId);
      await enroll(courseId);
      setEnrolledCourseIds(prev => new Set([...prev, courseId]));
      toast.success('Successfully enrolled in course!');
      
      // Navigate to waiting page after successful enrollment
      setTimeout(() => {
        navigate(`/dashboard/enrolled-courses`);
      }, 500);
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Failed to enroll');
    } finally {
      setEnrolling(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Enroll in Special Courses</h1>
          <p className="text-gray-600 mt-2">Search and enroll in available special courses</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Courses
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., Chem 101 Test 2025, PET 501..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                disabled={searchLoading}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all disabled:opacity-70"
              >
                {searchLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {searchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {searchError}
          </div>
        )}

        {/* Loading State */}
        {searchLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse h-32" />
            ))}
          </div>
        )}

        {/* Courses Grid */}
        {!searchLoading && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isEnrolled = enrolledCourseIds.has(course.id);
              const now = new Date();
              const courseStartTime = new Date(course.start_time);
              const courseEndTime = new Date(course.end_time);
              let courseStatus = 'Upcoming';
              let statusColor = 'bg-blue-100 text-blue-800';

              if (now > courseEndTime) {
                courseStatus = 'Ended';
                statusColor = 'bg-red-100 text-red-800';
              } else if (now >= courseStartTime) {
                courseStatus = 'Active';
                statusColor = 'bg-green-100 text-green-800';
              }

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col"
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800 flex-1">{course.title}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ml-2 whitespace-nowrap ${statusColor}`}>
                        {courseStatus}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span className="font-medium">Start Time:</span>
                        <span>{new Date(course.start_time).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">End Time:</span>
                        <span>{new Date(course.end_time).toLocaleString()}</span>
                      </div>
                      {course.duration_minutes > 0 && (
                        <div className="flex justify-between">
                          <span className="font-medium">Duration:</span>
                          <span>{course.duration_minutes} minutes</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      if (isEnrolled) {
                        navigate('/dashboard/enrolled-courses');
                      } else {
                        handleEnroll(course.id, e);
                      }
                    }}
                    disabled={enrolling === course.id || (courseStatus === 'Ended' && !isEnrolled)}
                    className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-all ${
                      isEnrolled
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {enrolling === course.id
                      ? 'Enrolling...'
                      : isEnrolled
                      ? '✓ Enrolled'
                      : courseStatus === 'Ended'
                      ? 'Course Ended'
                      : 'Enroll Now'}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!searchLoading && courses.length === 0 && searchTerm && (
          <div className="bg-white rounded-lg p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h2>
            <p className="text-gray-600">Try searching with different keywords.</p>
          </div>
        )}

        {/* Initial Empty State */}
        {!searchLoading && courses.length === 0 && !searchTerm && (
          <div className="bg-white rounded-lg p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Start searching for courses</h2>
            <p className="text-gray-600">Enter keywords to find special courses to enroll in.</p>
          </div>
        )}
      </div>
    </div>
  );
}
