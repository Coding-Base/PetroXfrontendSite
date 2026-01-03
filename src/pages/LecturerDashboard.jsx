import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import image from '../images/finallogo.png'; // Assuming you have this from signin

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://petroxtestbackend.onrender.com/api';

// --- ICONS (Inline SVGs to avoid dependency issues) ---
const Icons = {
  Book: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  Clock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Download: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
};

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecturerProfile, setLecturerProfile] = useState(null);

  // --- FORM STATE ---
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    duration_minutes: 60
  });
  const [creating, setCreating] = useState(false);

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

  // Fetch courses function
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/lecturer/courses/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const results = data.results || data;
        setCourses(results);
        if (results.length > 0 && !selectedCourse) {
          setSelectedCourse(results[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch statistics when course is selected
  useEffect(() => {
    if (selectedCourse && activeTab !== 'create-course') {
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
  }, [selectedCourse, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // --- CREATE COURSE HANDLER ---
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('title', createForm.title);
        formData.append('description', createForm.description);
        formData.append('start_time', createForm.start_time);
        formData.append('end_time', createForm.end_time);
        formData.append('duration_minutes', createForm.duration_minutes);

        const response = await fetch(`${API_BASE_URL}/lecturer/courses/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Course created successfully!');
            await fetchCourses(); 
            setActiveTab('overview');
            setCreateForm({ title: '', description: '', start_time: '', end_time: '', duration_minutes: 60 });
        } else {
            const errorData = await response.json();
            alert('Error creating course: ' + JSON.stringify(errorData));
        }
    } catch (error) {
        console.error("Create error", error);
        alert('Network error');
    } finally {
        setCreating(false);
    }
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

  if (loading && courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1.5 rounded-lg shadow-md mr-3">
                    <img src={image} alt="Logo" className="h-8 w-8 object-contain bg-white rounded-md" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                        Lecturer Portal
                    </h1>
                    {lecturerProfile && (
                        <p className="text-xs text-slate-500 font-medium">Dr. {lecturerProfile.name}</p>
                    )}
                </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
            >
              <Icons.Logout />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* --- SIDEBAR (Course List) --- */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-lg shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col h-[calc(100vh-8rem)] sticky top-24">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Icons.Book /> My Courses
                    </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                    {courses.length === 0 ? (
                        <div className="text-center py-10 px-4">
                            <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Icons.Book />
                            </div>
                            <p className="text-slate-500 text-sm">No courses created yet.</p>
                        </div>
                    ) : (
                        courses.map(course => (
                            <button
                                key={course.id}
                                onClick={() => {
                                    setSelectedCourse(course);
                                    if(activeTab === 'create-course') setActiveTab('overview');
                                }}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group border ${
                                    selectedCourse?.id === course.id && activeTab !== 'create-course'
                                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                                    : 'border-transparent hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex justify-between items-start">
                                    <p className={`font-semibold text-sm line-clamp-1 ${selectedCourse?.id === course.id && activeTab !== 'create-course' ? 'text-blue-700' : 'text-slate-700'}`}>
                                        {course.title}
                                    </p>
                                    {selectedCourse?.id === course.id && activeTab !== 'create-course' && (
                                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400 group-hover:text-slate-500">
                                    <Icons.Calendar />
                                    {new Date(course.start_time).toLocaleDateString()}
                                </div>
                            </button>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                    <button
                        onClick={() => {
                            setSelectedCourse(null);
                            setActiveTab('create-course');
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                    >
                        <Icons.Plus /> New Course
                    </button>
                </div>
            </div>
          </div>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="lg:col-span-9">
            
            {/* VIEW 1: CREATE COURSE FORM */}
            {activeTab === 'create-course' ? (
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Icons.Plus /> Create New Course
                        </h2>
                        <p className="text-blue-100 mt-1 text-sm">Set up a new examination or study material for your students.</p>
                    </div>

                    <form onSubmit={handleCreateCourse} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Title</label>
                                <input 
                                    type="text"
                                    required
                                    placeholder="e.g. Introduction to Computer Science 101"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                    value={createForm.title}
                                    onChange={e => setCreateForm({...createForm, title: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                <textarea 
                                    required
                                    rows="4"
                                    placeholder="Provide details about the course content..."
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                                    value={createForm.description}
                                    onChange={e => setCreateForm({...createForm, description: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date & Time</label>
                                    <input 
                                        type="datetime-local"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-600"
                                        value={createForm.start_time}
                                        onChange={e => setCreateForm({...createForm, start_time: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">End Date & Time</label>
                                    <input 
                                        type="datetime-local"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-600"
                                        value={createForm.end_time}
                                        onChange={e => setCreateForm({...createForm, end_time: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Minutes)</label>
                                <div className="relative">
                                    <input 
                                        type="number"
                                        required
                                        min="1"
                                        className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                        value={createForm.duration_minutes}
                                        onChange={e => setCreateForm({...createForm, duration_minutes: e.target.value})}
                                    />
                                    <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-medium">min</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                            <button 
                                type="button"
                                onClick={() => {
                                    if (courses.length > 0) {
                                        setSelectedCourse(courses[0]);
                                        setActiveTab('overview');
                                    }
                                }}
                                className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={creating}
                                className={`px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all ${creating ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {creating ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Creating...
                                    </div>
                                ) : 'Create Course'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
            
            /* VIEW 2: COURSE DASHBOARD */
            <div className="flex flex-col gap-6">
                {/* Tabs Navigation */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 flex gap-1">
                    {['overview', 'questions', 'results', 'analytics'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                                activeTab === tab
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 min-h-[500px]">
                    
                    {/* TAB: OVERVIEW */}
                    {activeTab === 'overview' && selectedCourse && (
                        <div className="p-8">
                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">Course Overview</span>
                                <h2 className="text-3xl font-bold text-slate-800 mb-4">{selectedCourse.title}</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">{selectedCourse.description}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Icons.Calendar />
                                        <span className="text-xs font-bold uppercase">Start Time</span>
                                    </div>
                                    <p className="font-semibold text-slate-800">
                                        {new Date(selectedCourse.start_time).toLocaleDateString()}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(selectedCourse.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                </div>
                                
                                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60">
                                    <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                        <Icons.Clock />
                                        <span className="text-xs font-bold uppercase">End Time</span>
                                    </div>
                                    <p className="font-semibold text-slate-800">
                                        {new Date(selectedCourse.end_time).toLocaleDateString()}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(selectedCourse.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                </div>

                                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60">
                                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                                        <Icons.Clock />
                                        <span className="text-xs font-bold uppercase">Duration</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-800">{selectedCourse.duration_minutes}</p>
                                    <p className="text-xs text-slate-500">Minutes allowed</p>
                                </div>

                                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/60">
                                    <div className="flex items-center gap-2 text-orange-600 mb-2">
                                        <Icons.Users />
                                        <span className="text-xs font-bold uppercase">Students</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-800">{statistics?.total_students || 0}</p>
                                    <p className="text-xs text-slate-500">Total enrolled</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: QUESTIONS */}
                    {activeTab === 'questions' && selectedCourse && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">Course Questions</h3>
                                    <p className="text-slate-500 text-sm mt-1">Manage the questions for this examination.</p>
                                </div>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                                    <Icons.Plus /> Add Question
                                </button>
                            </div>

                            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-500">
                                    <Icons.Book />
                                </div>
                                <h4 className="text-lg font-bold text-slate-700">No Questions Added Yet</h4>
                                <p className="text-slate-500 max-w-sm mt-2 mb-6">
                                    Start building your course by adding multiple choice or theory questions.
                                </p>
                                <button className="text-blue-600 font-semibold hover:text-blue-800 hover:underline">
                                    Open Question Editor &rarr;
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TAB: RESULTS */}
                    {activeTab === 'results' && selectedCourse && (
                        <div className="p-0">
                            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">Student Results</h3>
                                    <p className="text-slate-500 text-sm">View and export student performance.</p>
                                </div>
                                <button 
                                    onClick={handleExportResults}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg shadow-green-500/20 transition-all hover:-translate-y-0.5"
                                >
                                    <Icons.Download /> Export Excel
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-8 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Student Name</th>
                                            <th className="px-8 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                                            <th className="px-8 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-center">Score</th>
                                            <th className="px-8 py-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {/* Mock Data Loop - replace with real data */}
                                        <tr>
                                            <td className="px-8 py-12 text-center text-slate-500" colSpan="4">
                                                No results found for this course yet.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* TAB: ANALYTICS */}
                    {activeTab === 'analytics' && statistics && (
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Performance Analytics</h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30">
                                    <p className="text-blue-100 text-sm font-medium uppercase">Total Enrolled</p>
                                    <p className="text-4xl font-bold mt-2">{statistics.total_students}</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                    <p className="text-slate-500 text-sm font-medium uppercase">Submitted</p>
                                    <p className="text-4xl font-bold mt-2 text-slate-800">{statistics.submitted}</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                    <p className="text-slate-500 text-sm font-medium uppercase">Avg Score</p>
                                    <p className="text-4xl font-bold mt-2 text-indigo-600">{statistics.average_score}%</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                    <p className="text-slate-500 text-sm font-medium uppercase">Pass Rate</p>
                                    <p className="text-4xl font-bold mt-2 text-green-600">{statistics.success_rate}%</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                    <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <Icons.Chart /> Pass vs Fail
                                    </h4>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Passed', value: statistics.passed },
                                                        { name: 'Failed', value: statistics.failed }
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    <Cell fill="#10b981" />
                                                    <Cell fill="#ef4444" />
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                                />
                                                <Legend verticalAlign="bottom" height={36}/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-center">
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-semibold text-slate-700">Success Rate</span>
                                                <span className="text-sm font-bold text-green-600">{statistics.success_rate}%</span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${statistics.success_rate}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-semibold text-slate-700">Completion Rate</span>
                                                <span className="text-sm font-bold text-blue-600">
                                                    {statistics.total_students > 0 ? ((statistics.submitted / statistics.total_students) * 100).toFixed(1) : 0}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-2.5">
                                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${statistics.total_students > 0 ? (statistics.submitted / statistics.total_students) * 100 : 0}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
