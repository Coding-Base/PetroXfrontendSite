import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/finallogo.png';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://petroxtestbackend.onrender.com/api';

// --- CLEAN ICONS ---
const Icons = {
  Book: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  Download: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Edit: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
};

export default function LecturerDashboard() {
  const navigate = useNavigate();
  
  // State
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecturerProfile, setLecturerProfile] = useState(null);
  
  // Data Lists
  const [questionsList, setQuestionsList] = useState([]);
  const [enrollmentList, setEnrollmentList] = useState([]);

  // Forms
  const [createForm, setCreateForm] = useState({ title: '', description: '', start_time: '', end_time: '', duration_minutes: 60 });
  const [questionForm, setQuestionForm] = useState({ text: '', mark: 1, choices: [{ text: '', is_correct: false }, { text: '', is_correct: false }] });
  
  // UI States
  const [creating, setCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);

  // --- AUTH & PROFILE ---
  const handleAuthError = (status) => {
    if (status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`${API_BASE_URL}/lecturer/profile/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) setLecturerProfile(await response.json());
        else handleAuthError(response.status);
      } catch (err) { console.error(err); }
    };
    fetchProfile();
  }, [navigate]);

  // --- FETCHING DATA ---
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${API_BASE_URL}/lecturer/courses/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        const results = data.results || data;
        setCourses(results);
        if (results.length > 0 && !selectedCourse) setSelectedCourse(results[0]);
      } else handleAuthError(response.status);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  }, [selectedCourse]);

  useEffect(() => { fetchCourses(); }, []);

  // Fetch Tab Data
  useEffect(() => {
    if (!selectedCourse || activeTab === 'create-course') return;
    const token = localStorage.getItem('access_token');

    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/lecturer/courses/${selectedCourse.id}/statistics/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) setStatistics(await response.json());
      } catch (err) { console.error(err); }
    };

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/lecturer/questions/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const allData = await response.json();
          const results = allData.results || allData;
          // Filter logic for string/int mismatch safety
          const filtered = results.filter(q => String(q.course) === String(selectedCourse.id));
          setQuestionsList(filtered);
        }
      } catch (err) { console.error(err); }
    };

    const fetchEnrollments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/lecturer/enrollments/course_enrollments/?course_id=${selectedCourse.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setEnrollmentList(data.enrollments || []);
            }
        } catch (err) { console.error(err); }
    };

    fetchStats();
    if (activeTab === 'questions') fetchQuestions();
    if (activeTab === 'results') fetchEnrollments();

  }, [selectedCourse, activeTab]);

  // --- ACTIONS ---
  const handleCreateOrUpdateCourse = async (e) => {
    e.preventDefault();
    setCreating(true);
    const token = localStorage.getItem('access_token');
    
    const formData = new FormData();
    formData.append('title', createForm.title);
    formData.append('description', createForm.description);
    // Fix Timezone: Send ISO UTC
    formData.append('start_time', new Date(createForm.start_time).toISOString());
    formData.append('end_time', new Date(createForm.end_time).toISOString());
    formData.append('duration_minutes', createForm.duration_minutes);

    const url = isEditing 
        ? `${API_BASE_URL}/lecturer/courses/${selectedCourse.id}/` 
        : `${API_BASE_URL}/lecturer/courses/`;
    
    try {
        const response = await fetch(url, {
            method: isEditing ? 'PUT' : 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (response.ok) {
            alert(`Course ${isEditing ? 'updated' : 'created'} successfully!`);
            await fetchCourses();
            setActiveTab('overview');
            setIsEditing(false);
            setCreateForm({ title: '', description: '', start_time: '', end_time: '', duration_minutes: 60 });
        } else {
            const err = await response.json();
            alert('Error: ' + JSON.stringify(err));
        }
    } catch (err) { alert('Network error'); } 
    finally { setCreating(false); }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!questionForm.choices.some(c => c.is_correct)) {
        alert("Mark one option as correct.");
        return;
    }
    setSubmittingQuestion(true);
    const token = localStorage.getItem('access_token');
    
    try {
        const payload = {
            course_id: selectedCourse.id,
            questions: [{ text: questionForm.text, mark: questionForm.mark, choices: questionForm.choices }]
        };

        const response = await fetch(`${API_BASE_URL}/lecturer/questions/bulk_create/`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Question added!");
            setShowQuestionForm(false);
            setQuestionForm({ text: '', mark: 1, choices: [{ text: '', is_correct: false }, { text: '', is_correct: false }] });
            setActiveTab('overview'); 
            setTimeout(() => setActiveTab('questions'), 50); // Hack to force refresh
        } else {
            const err = await response.json();
            alert("Error: " + JSON.stringify(err));
        }
    } catch (err) { alert("Network error"); } 
    finally { setSubmittingQuestion(false); }
  };

  const handleExportResults = async () => {
    const token = localStorage.getItem('access_token');
    try {
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
      } else {
        alert("Export failed. Server error.");
      }
    } catch (err) { console.error(err); }
  };

  const handleEditCourse = () => {
      setIsEditing(true);
      const format = (iso) => new Date(iso).toISOString().slice(0, 16);
      setCreateForm({
          title: selectedCourse.title,
          description: selectedCourse.description,
          start_time: format(selectedCourse.start_time),
          end_time: format(selectedCourse.end_time),
          duration_minutes: selectedCourse.duration_minutes
      });
      setActiveTab('create-course');
  };

  // Question Form Helpers
  const handleAddChoice = () => setQuestionForm({...questionForm, choices: [...questionForm.choices, { text: '', is_correct: false }]});
  const handleRemoveChoice = (i) => setQuestionForm({...questionForm, choices: questionForm.choices.filter((_, idx) => idx !== i)});
  const handleOptionChange = (i, val) => {
      const newChoices = [...questionForm.choices];
      newChoices[i].text = val;
      setQuestionForm({...questionForm, choices: newChoices});
  };
  const handleCorrectOptionChange = (i) => {
      const newChoices = questionForm.choices.map((c, idx) => ({ ...c, is_correct: idx === i }));
      setQuestionForm({...questionForm, choices: newChoices});
  };

  if (loading && courses.length === 0) return <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-500">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-1.5 rounded-lg shadow">
                    <img src={image} alt="Logo" className="h-6 w-6 bg-white rounded" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Lecturer Portal</h1>
                    {lecturerProfile && <p className="text-xs text-gray-500">Welcome, {lecturerProfile.name}</p>}
                </div>
            </div>
            <button onClick={() => handleAuthError(401)} className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-2">
                <Icons.Logout /> Logout
            </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar: Course List */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 shadow-sm h-fit sticky top-24">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="font-bold text-gray-700 flex items-center gap-2"><Icons.Book /> Courses</h2>
                <button onClick={() => { setIsEditing(false); setCreateForm({title:'', description:'', start_time:'', end_time:'', duration_minutes:60}); setActiveTab('create-course'); }} 
                    className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700" title="New Course"><Icons.Plus /></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
                {courses.length === 0 && <p className="text-center text-sm text-gray-400 py-4">No courses yet.</p>}
                {courses.map(c => (
                    <div key={c.id} onClick={() => { setSelectedCourse(c); if(activeTab === 'create-course') setActiveTab('overview'); }}
                        className={`p-3 mb-1 rounded-md cursor-pointer transition-colors border ${selectedCourse?.id === c.id && activeTab !== 'create-course' ? 'bg-blue-50 border-blue-200' : 'border-transparent hover:bg-gray-50'}`}>
                        <h3 className={`font-semibold text-sm ${selectedCourse?.id === c.id && activeTab !== 'create-course' ? 'text-blue-700' : 'text-gray-700'}`}>{c.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Icons.Calendar /> {new Date(c.start_time).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
            
            {/* FORM VIEW (Create/Edit) */}
            {activeTab === 'create-course' ? (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Course' : 'Create New Course'}</h2>
                        <button onClick={() => setActiveTab('overview')} className="text-gray-500 hover:text-gray-800">Cancel</button>
                    </div>
                    <form onSubmit={handleCreateOrUpdateCourse} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                            <input type="text" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                                value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea required rows="3" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                                value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <input type="datetime-local" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500" 
                                    value={createForm.start_time} onChange={e => setCreateForm({...createForm, start_time: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                <input type="datetime-local" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500" 
                                    value={createForm.end_time} onChange={e => setCreateForm({...createForm, end_time: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
                            <input type="number" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500" 
                                value={createForm.duration_minutes} onChange={e => setCreateForm({...createForm, duration_minutes: e.target.value})} />
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button type="submit" disabled={creating} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-medium">
                                {creating ? 'Saving...' : 'Save Course'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                /* COURSE DETAILS VIEW */
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[500px] flex flex-col">
                    
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 bg-gray-50/50">
                        {['overview', 'questions', 'results'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} 
                                className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                        
                        {/* OVERVIEW TAB */}
                        {activeTab === 'overview' && selectedCourse && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h2>
                                        <p className="text-gray-600 mt-2">{selectedCourse.description}</p>
                                    </div>
                                    <button onClick={handleEditCourse} className="text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-2">
                                        <Icons.Edit /> Edit
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                        <p className="text-xs font-bold text-blue-600 uppercase">Students</p>
                                        <p className="text-2xl font-bold text-gray-800">{statistics?.total_students || 0}</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                        <p className="text-xs font-bold text-green-600 uppercase">Passed</p>
                                        <p className="text-2xl font-bold text-gray-800">{statistics?.passed || 0}</p>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                                        <p className="text-xs font-bold text-purple-600 uppercase">Start Time</p>
                                        <p className="text-sm font-semibold text-gray-800">{new Date(selectedCourse.start_time).toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                                        <p className="text-xs font-bold text-orange-600 uppercase">Duration</p>
                                        <p className="text-2xl font-bold text-gray-800">{selectedCourse.duration_minutes}m</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* QUESTIONS TAB */}
                        {activeTab === 'questions' && (
                            <div>
                                {showQuestionForm ? (
                                    <form onSubmit={handleQuestionSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <h3 className="font-bold text-lg mb-4">Add New Question</h3>
                                        <div className="space-y-4">
                                            <textarea placeholder="Enter question text..." required className="w-full p-3 border rounded-lg" 
                                                value={questionForm.text} onChange={e => setQuestionForm({...questionForm, text: e.target.value})} />
                                            <input type="number" placeholder="Marks" className="w-24 p-2 border rounded-lg" 
                                                value={questionForm.mark} onChange={e => setQuestionForm({...questionForm, mark: e.target.value})} />
                                            
                                            <div className="space-y-2">
                                                <p className="text-sm font-semibold text-gray-600">Options (Select correct answer)</p>
                                                {questionForm.choices.map((c, i) => (
                                                    <div key={i} className="flex gap-2 items-center bg-white p-2 rounded border">
                                                        <input type="radio" name="correct" checked={c.is_correct} onChange={() => handleCorrectOptionChange(i)} />
                                                        <input type="text" placeholder={`Option ${i+1}`} className="flex-1 outline-none" required 
                                                            value={c.text} onChange={e => handleOptionChange(i, e.target.value)} />
                                                        <button type="button" onClick={() => handleRemoveChoice(i)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Icons.Trash /></button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={handleAddChoice} className="text-sm text-blue-600 font-medium">+ Add Option</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 mt-6">
                                            <button type="button" onClick={() => setShowQuestionForm(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                                            <button type="submit" disabled={submittingQuestion} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                                {submittingQuestion ? 'Saving...' : 'Save Question'}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-bold text-lg text-gray-800">Course Questions ({questionsList.length})</h3>
                                            <button onClick={() => setShowQuestionForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
                                                <Icons.Plus /> Add Question
                                            </button>
                                        </div>
                                        {questionsList.length === 0 ? (
                                            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-3"><Icons.Book /></div>
                                                <p className="text-gray-500">No questions added yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {questionsList.map((q, i) => (
                                                    <div key={i} className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-sm">
                                                        <div className="flex justify-between">
                                                            <p className="font-semibold text-gray-800">Q{i+1}. {q.text}</p>
                                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{q.mark} Marks</span>
                                                        </div>
                                                        <ul className="mt-2 space-y-1 ml-4">
                                                            {q.choices?.map((c, idx) => (
                                                                <li key={idx} className={`text-sm flex items-center gap-2 ${c.is_correct ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
                                                                    {c.is_correct ? <Icons.Check /> : <span className="w-4" />} {c.text}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {/* RESULTS TAB */}
                        {activeTab === 'results' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-gray-800">Student Results</h3>
                                    <button onClick={handleExportResults} className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                        <Icons.Download /> Export CSV
                                    </button>
                                </div>
                                <div className="overflow-x-auto border rounded-lg">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-gray-600 border-b">
                                            <tr>
                                                <th className="p-3 font-semibold">Student Name</th>
                                                <th className="p-3 font-semibold">Email</th>
                                                <th className="p-3 font-semibold text-center">Score</th>
                                                <th className="p-3 font-semibold text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {enrollmentList.length === 0 ? (
                                                <tr><td colSpan="4" className="p-6 text-center text-gray-500">No enrollments found.</td></tr>
                                            ) : (
                                                enrollmentList.map((e, idx) => (
                                                    <tr key={e.id || idx} className="hover:bg-gray-50">
                                                        <td className="p-3 font-medium text-gray-800">{e.user?.username || 'Unknown'}</td>
                                                        <td className="p-3 text-gray-600">{e.user?.email || '-'}</td>
                                                        <td className="p-3 text-center font-bold">{e.submitted ? `${e.score}%` : '-'}</td>
                                                        <td className="p-3 text-center">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${e.submitted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                {e.submitted ? 'Submitted' : 'Pending'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
