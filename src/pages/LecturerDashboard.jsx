import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://petroxtestbackend.onrender.com/api';

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecturerProfile, setLecturerProfile] = useState(null);

  // Fetch lecturer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/lecturer/profile/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setLecturerProfile(await response.json());
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/lecturer/courses/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCourses(data.results || data);
          if (data.results && data.results.length > 0) {
            setSelectedCourse(data.results[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch statistics when course is selected
  useEffect(() => {
    if (selectedCourse) {
      const fetchStats = async () => {
        try {
          const token = localStorage.getItem('access_token');
          const response = await fetch(`${API_BASE_URL}/lecturer/courses/${selectedCourse.id}/statistics/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            setStatistics(await response.json());
          }
        } catch (err) {
          console.error('Failed to fetch statistics:', err);
        }
      };
      fetchStats();
    }
  }, [selectedCourse]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handleExportResults = async () => {
    if (!selectedCourse) return;
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/lecturer/courses/${selectedCourse.id}/export_results/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `course_${selectedCourse.id}_results.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lecturer Dashboard</h1>
            {lecturerProfile && (
              <p className="text-gray-600">Welcome, {lecturerProfile.name}</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Courses</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {courses.length === 0 ? (
                  <p className="text-gray-600 text-sm">No courses yet</p>
                ) : (
                  courses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedCourse?.id === course.id
                          ? 'bg-purple-100 border-l-4 border-purple-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(course.start_time).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                )}
              </div>

              <button
                onClick={() => setActiveTab('create-course')}
                className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                + New Course
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="flex border-b">
                {['overview', 'questions', 'results', 'analytics'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 font-medium transition ${
                      activeTab === tab
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && selectedCourse && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h3>
                      <p className="text-gray-600">{selectedCourse.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Start Time</p>
                        <p className="text-lg font-bold text-blue-600">
                          {new Date(selectedCourse.start_time).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">End Time</p>
                        <p className="text-lg font-bold text-green-600">
                          {new Date(selectedCourse.end_time).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Duration</p>
                        <p className="text-lg font-bold text-purple-600">
                          {selectedCourse.duration_minutes} minutes
                        </p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Total Students</p>
                        <p className="text-lg font-bold text-orange-600">
                          {statistics?.total_students || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'questions' && selectedCourse && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">Questions</h3>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        + Add Question
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600 text-center py-8">
                        Questions editor will be implemented here.
                        <br />
                        Features: Add questions, upload images, manage choices
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'results' && selectedCourse && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">Student Results</h3>
                      <button
                        onClick={handleExportResults}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        📥 Export to Excel
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="px-4 py-2 text-left">Student Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-center">Score</th>
                            <th className="px-4 py-2 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statistics?.total_students === 0 ? (
                            <tr>
                              <td colSpan="4" className="px-4 py-8 text-center text-gray-600">
                                No submissions yet
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td colSpan="4" className="px-4 py-8 text-center text-gray-600">
                                Results will be displayed here
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && statistics && (
                  <div className="space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Total Students</p>
                        <p className="text-3xl font-bold text-blue-600">{statistics.total_students}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Submitted</p>
                        <p className="text-3xl font-bold text-green-600">{statistics.submitted}</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Not Submitted</p>
                        <p className="text-3xl font-bold text-red-600">{statistics.not_submitted}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm">Average Score</p>
                        <p className="text-3xl font-bold text-purple-600">{statistics.average_score}%</p>
                      </div>
                    </div>

                    {/* Pass/Fail Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Pass/Fail Distribution</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Passed', value: statistics.passed },
                                { name: 'Failed', value: statistics.failed }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill="#10b981" />
                              <Cell fill="#ef4444" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                          <p className="text-sm"><span className="font-bold text-green-600">Passed:</span> {statistics.passed} ({statistics.success_rate}%)</p>
                          <p className="text-sm"><span className="font-bold text-red-600">Failed:</span> {statistics.failed} ({statistics.failure_rate}%)</p>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Success Rate</span>
                              <span className="text-sm font-bold text-green-600">{statistics.success_rate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${statistics.success_rate}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Failure Rate</span>
                              <span className="text-sm font-bold text-red-600">{statistics.failure_rate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-red-600 h-2 rounded-full"
                                style={{ width: `${statistics.failure_rate}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                              <span className="text-sm font-bold text-blue-600">
                                {statistics.total_students > 0 
                                  ? ((statistics.submitted / statistics.total_students) * 100).toFixed(1)
                                  : 0}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${statistics.total_students > 0 
                                    ? (statistics.submitted / statistics.total_students) * 100 
                                    : 0}%`
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

