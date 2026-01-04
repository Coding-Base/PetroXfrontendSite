import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import image from '../images/finallogo.png';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://petroxtestbackend.onrender.com/api';

// --- ICONS ---
const Icons = {
  Book: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  Clock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Download: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Edit: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
};

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecturerProfile, setLecturerProfile] = useState(null);

  // Data for tabs
  const [questionsList, setQuestionsList] = useState([]);
  const [enrollmentList, setEnrollmentList] = useState([]); // NEW: For Results Table

  // Form States
  const [createForm, setCreateForm] = useState({ title: '', description: '', start_time: '', end_time: '', duration_minutes: 60 });
  const [creating, setCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionForm, setQuestionForm] = useState({ text: '', mark: 1, choices: [{ text: '', is_correct: false }, { text: '', is_correct: false }] });
  const [submittingQuestion, setSubmittingQuestion] = useState(false);

  // Helper: Handle 401 Logout
  const handleAuthError = (status) => {
    if (status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  // 1. Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`${API_BASE_URL}/lecturer/profile/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          setLecturerProfile(await response.json());
        } else {
          handleAuthError(response.status);
        }
      } catch (err) { console.error(err); }
    };
    fetchProfile();
  }, [navigate]);

  // 2. Fetch Courses
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
        // Only set default if nothing selected yet
        if (results.length > 0 && !selectedCourse) {
          setSelectedCourse(results[0]);
        }
      } else {
        handleAuthError(response.status);
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  }, [selectedCourse]);

  useEffect(() => { fetchCourses(); }, []);

  // 3. Fetch Details based on Tab
  useEffect(() => {
    if (!selectedCourse || activeTab === 'create-course') return;
    const token = localStorage.getItem('access_token');

    // Stats (Always fetch for overview/analytics)
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/lecturer/courses/${selectedCourse.id}/statistics/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) setStatistics(await response.json());
        else handleAuthError(response.status);
      } catch (err) { console.error(err); }
    };

    // Questions (Only if questions tab)
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/lecturer/questions/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const allData = await response.json();
          const results = allData.results || allData;
          // Filter questions for THIS course
          const filtered = results.filter(q => String(q.course) === String(selectedCourse.id));
          setQuestionsList(filtered);
        }
      } catch (err) { console.error(err); }
    };

    // Results (Only if results tab)
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

  const handleCreateOrUpdateCourse = async (e) => {
    e.preventDefault();
    setCreating(true);
    const token = localStorage.getItem('access_token');
    
    // Timezone Handling: Convert Local Input -> UTC ISO String
    const formData = new FormData();
    formData.append('title', createForm.title);
    formData.append('description', createForm.description);
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
            handleAuthError(response.status);
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
            // Force re-fetch questions
            setActiveTab('overview'); 
            setTimeout(() => setActiveTab('questions'), 50);
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
        a.download = `course_${selectedCourse.id}_results.xlsx`; // Changed to xlsx
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to export. Ensure pandas/openpyxl is installed on server.");
      }
    } catch (err) { console.error(err); }
  };

  // Handlers for Form UI
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
  
  const handleEditCourse = () => {
      setIsEditing(true);
      // Format dates for input field (local time)
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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
                <img src={image} alt="Logo" className="h-8 w-8" />
                <h1 className="text-xl font-bold text-blue-700">Lecturer Portal</h1>
            </div>
            <button onClick={() => handleAuthError(401)} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded">
                <Icons.Logout /> Logout
            </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden sticky top-24">
                <div className="p-4 border-b bg-slate-50 font-bold flex gap-2"><Icons.Book /> My Courses</div>
                <div className="max-h-96 overflow-y-auto p-2 space-y-1">
                    {courses.map(c => (
                        <button key={c.id} onClick={() => { setSelectedCourse(c); if(activeTab === 'create-course') setActiveTab('overview'); }}
                            className={`w-full text-left p-3 rounded transition-all ${selectedCourse?.id === c.id && activeTab !== 'create-course' ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700' : 'hover:bg-slate-50'}`}>
                            <p className="font-semibold text-sm truncate">{c.title}</p>
                            <p className="text-xs text-slate-500">{new Date(c.start_time).toLocaleDateString()}</p>
                        </button>
                    ))}
                </div>
                <div className="p-3 border-t">
                    <button onClick={() => { setIsEditing(false); setCreateForm({ title: '', description: '', start_time: '', end_time: '', duration_minutes: 60 }); setActiveTab('create-course'); }} 
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex justify-center gap-2">
                        <Icons.Plus /> New Course
                    </button>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
            {activeTab === 'create-course' ? (
                /* CREATE/EDIT FORM */
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Course' : 'Create New Course'}</h2>
                    <form onSubmit={handleCreateOrUpdateCourse} className="space-y-4">
                        <input type="text" placeholder="Title" required className="w-full border p-2 rounded" value={createForm.title} onChange={e => setCreateForm({...createForm, title: e.target.value})} />
                        <textarea placeholder="Description" required className="w-full border p-2 rounded" value={createForm.description} onChange={e => setCreateForm({...createForm, description: e.target.value})} />
                        <div className="grid grid-cols-2 gap-4">
                            <div><label>Start</label><input type="datetime-local" required className="w-full border p-2 rounded" value={createForm.start_time} onChange={e => setCreateForm({...createForm, start_time: e.target.value})} /></div>
                            <div><label>End</label><input type="datetime-local" required className="w-full border p-2 rounded" value={createForm.end_time} onChange={e => setCreateForm({...createForm, end_time: e.target.value})} /></div>
                        </div>
                        <input type="number" placeholder="Duration (min)" required className="w-full border p-2 rounded" value={createForm.duration_minutes} onChange={e => setCreateForm({...createForm, duration_minutes: e.target.value})} />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setActiveTab('overview')} className="px-4 py-2 border rounded">Cancel</button>
                            <button type="submit" disabled={creating} className="px-4 py-2 bg-blue-600 text-white rounded">{creating ? 'Saving...' : 'Save'}</button>
                        </div>
                    </form>
                </div>
            ) : (
                /* TABS VIEW */
                <div className="flex flex-col gap-4">
                    <div className="flex bg-white rounded-lg shadow p-1">
                        {['overview', 'questions', 'results'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded capitalize ${activeTab === tab ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-600'}`}>{tab}</button>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow min-h-[400px]">
                        {/* OVERVIEW */}
                        {activeTab === 'overview' && selectedCourse && (
                            <div className="p-6">
                                <div className="flex justify-between">
                                    <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                                    <button onClick={handleEditCourse} className="text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">Edit</button>
                                </div>
                                <p className="text-slate-600 mt-2">{selectedCourse.description}</p>
                                <div className="grid grid-cols-4 gap-4 mt-6">
                                    <div className="bg-slate-50 p-4 rounded border"><strong>Students:</strong> {statistics?.total_students || 0}</div>
                                    <div className="bg-slate-50 p-4 rounded border"><strong>Duration:</strong> {selectedCourse.duration_minutes}m</div>
                                </div>
                            </div>
                        )}

                        {/* QUESTIONS */}
                        {activeTab === 'questions' && (
                            <div className="p-6">
                                {showQuestionForm ? (
                                    <form onSubmit={handleQuestionSubmit} className="space-y-4 border p-4 rounded">
                                        <h3 className="font-bold">Add Question</h3>
                                        <textarea placeholder="Question Text" required className="w-full border p-2 rounded" value={questionForm.text} onChange={e => setQuestionForm({...questionForm, text: e.target.value})} />
                                        <input type="number" placeholder="Marks" className="w-20 border p-2 rounded" value={questionForm.mark} onChange={e => setQuestionForm({...questionForm, mark: e.target.value})} />
                                        {questionForm.choices.map((c, i) => (
                                            <div key={i} className="flex gap-2 items-center">
                                                <input type="radio" name="correct" checked={c.is_correct} onChange={() => handleCorrectOptionChange(i)} />
                                                <input type="text" placeholder={`Option ${i+1}`} required className="flex-1 border p-2 rounded" value={c.text} onChange={e => handleOptionChange(i, e.target.value)} />
                                                <button type="button" onClick={() => handleRemoveChoice(i)} className="text-red-500"><Icons.Trash /></button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={handleAddChoice} className="text-blue-600 text-sm">+ Option</button>
                                        <div className="flex justify-end gap-2">
                                            <button type="button" onClick={() => setShowQuestionForm(false)} className="px-3 py-1 border rounded">Cancel</button>
                                            <button type="submit" disabled={submittingQuestion} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex justify-between mb-4">
                                            <h3 className="font-bold text-lg">Questions ({questionsList.length})</h3>
                                            <button onClick={() => setShowQuestionForm(true)} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Question</button>
                                        </div>
                                        {questionsList.length === 0 ? <p className="text-center text-gray-500">No questions yet.</p> : (
                                            <div className="space-y-2">
                                                {questionsList.map((q, i) => (
                                                    <div key={i} className="border p-3 rounded hover:shadow-sm">
                                                        <p className="font-semibold">{i+1}. {q.text} <span className="text-xs bg-slate-200 px-2 rounded">{q.mark} pts</span></p>
                                                        <ul className="pl-4 mt-1 text-sm">
                                                            {q.choices?.map((c, idx) => (
                                                                <li key={idx} className={c.is_correct ? 'text-green-600 font-bold' : 'text-slate-600'}>
                                                                    - {c.text} {c.is_correct && '✓'}
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

                        {/* RESULTS */}
                        {activeTab === 'results' && (
                            <div className="p-6">
                                <div className="flex justify-between mb-4">
                                    <h3 className="font-bold text-lg">Student Results</h3>
                                    <button onClick={handleExportResults} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2"><Icons.Download /> Export Excel</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-100">
                                            <tr>
                                                <th className="p-3 border-b">Student</th>
                                                <th className="p-3 border-b">Email</th>
                                                <th className="p-3 border-b text-center">Score</th>
                                                <th className="p-3 border-b text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {enrollmentList.length === 0 ? (
                                                <tr><td colSpan="4" className="p-4 text-center text-slate-500">No enrollments yet.</td></tr>
                                            ) : (
                                                enrollmentList.map(e => (
                                                    <tr key={e.id} className="border-b hover:bg-slate-50">
                                                        <td className="p-3">{e.user?.username || 'Unknown'}</td>
                                                        <td className="p-3">{e.user?.email || '-'}</td>
                                                        <td className="p-3 text-center font-bold">{e.submitted ? `${e.score}%` : '-'}</td>
                                                        <td className="p-3 text-center">
                                                            <span className={`px-2 py-1 rounded text-xs ${e.submitted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
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
