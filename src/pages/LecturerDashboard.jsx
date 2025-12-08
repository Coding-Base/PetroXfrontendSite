import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import dayjs from 'dayjs';

const API_BASE = 'https://petroxtestbackend.onrender.com/api';

export default function LecturerDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', start_time: '', end_time: '', mark: 1 });
  const [creating, setCreating] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);
  const [questionForm, setQuestionForm] = useState({ text: '', mark: 1, option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' });

  const accessToken = localStorage.getItem('access_token');
  const axiosConfig = { headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {} };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/special-courses/`, axiosConfig);
      const list = Array.isArray(res.data) ? res.data : (res.data.results || []);
      // If backend returns created_by, filter by current user id (optional)
      const myId = localStorage.getItem('user_id');
      const filtered = myId ? list.filter(c => String(c.created_by) === String(myId) || (c.created_by && c.created_by.id && String(c.created_by.id) === String(myId))) : list;
      setCourses(filtered);
    } catch (err) {
      console.error(err);
      setError('Failed to load courses. Ensure you are authenticated and that the endpoint exists.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!newCourse.title) { setError('Provide a title'); return; }
    setCreating(true);
    try {
      const payload = {
        title: newCourse.title,
        description: newCourse.description,
        start_time: newCourse.start_time ? new Date(newCourse.start_time).toISOString() : null,
        end_time: newCourse.end_time ? new Date(newCourse.end_time).toISOString() : null,
        mark: newCourse.mark
      };
      await axios.post(`${API_BASE}/special-courses/`, payload, axiosConfig);
      setNewCourse({ title: '', description: '', start_time: '', end_time: '', mark: 1 });
      setShowCreate(false);
      fetchCourses();
    } catch (err) {
      console.error('Create failed', err);
      setError('Failed to create course. Check payload and permissions.');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Delete this course? This will remove questions and related data.')) return;
    try {
      await axios.delete(`${API_BASE}/special-courses/${id}/`, axiosConfig);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setError('Failed to delete course. Check permissions.');
    }
  };

  const handleExport = async (id, title) => {
    try {
      const res = await axios.get(`${API_BASE}/special-courses/${id}/export/`, { ...axiosConfig, responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `results_${(title || id).replace(/\s+/g, '_')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('Export failed. Ensure backend export endpoint exists and you have permission.');
    }
  };

  const handleOpenCourse = (course) => {
    setActiveCourse(course);
    setQuestionForm({ text: '', mark: 1, option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' });
  };

  const handleAddQuestion = async () => {
    if (!activeCourse) return;
    if (!questionForm.text) { setError('Question text required'); return; }
    try {
      const payload = {
        text: questionForm.text,
        mark: questionForm.mark,
        option_a: questionForm.option_a,
        option_b: questionForm.option_b,
        option_c: questionForm.option_c,
        option_d: questionForm.option_d,
        correct_option: questionForm.correct_option
      };
      await axios.post(`${API_BASE}/special-courses/${activeCourse.id}/questions/`, payload, axiosConfig);
      fetchCourses();
      setQuestionForm({ text: '', mark: 1, option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' });
      alert('Question added');
    } catch (err) {
      console.error(err);
      setError('Adding question failed. Check endpoint /special-courses/{id}/questions/');
    }
  };

  const courseCount = courses.length;
  const totalQuestions = courses.reduce((acc, c) => acc + (c.questions_count ?? c.question_count ?? (Array.isArray(c.questions) ? c.questions.length : 0)), 0);
  const recent = courses.slice(0, 5).map(c => c.title);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Lecturer Dashboard</h1>
          <div>
            <Button onClick={() => setShowCreate(true)} className="mr-3">Create Special Course</Button>
            <Button onClick={fetchCourses} variant="secondary">Refresh</Button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Courses created</p>
            <div className="text-3xl font-bold">{courseCount}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Total questions</p>
            <div className="text-3xl font-bold">{totalQuestions}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <p className="text-sm text-gray-500">Recent courses</p>
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              {recent.length === 0 ? <div className="text-gray-400">No courses</div> : recent.map((t, i) => <div key={i}>• {t}</div>)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded shadow p-4">
              <h2 className="font-semibold mb-3">Your Special Courses</h2>
              {loading ? <div>Loading...</div> : courses.length === 0 ? <div className="text-gray-500">No special courses found.</div> : (
                <div className="space-y-3">
                  {courses.map(c => (
                    <div key={c.id} className="p-3 border rounded flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-sm text-gray-500">{c.description?.slice(0,120)}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {c.start_time ? `Start: ${dayjs(c.start_time).format('DD/MM/YYYY HH:mm')}` : ''}
                          {c.end_time ? ` • End: ${dayjs(c.end_time).format('DD/MM/YYYY HH:mm')}` : ''}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => handleOpenCourse(c)} className="text-sm">Open</Button>
                        <Button onClick={() => handleExport(c.id, c.title)} className="text-sm">Export</Button>
                        <button onClick={() => handleDeleteCourse(c.id)} className="text-sm text-red-600 px-3 py-1 rounded border hover:bg-red-50">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded shadow p-4">
              <h3 className="font-medium">Quick Stats</h3>
              <div className="mt-3">
                <div className="text-sm text-gray-500">Courses</div>
                <div className="text-xl font-bold">{courseCount}</div>
              </div>
            </div>

            <div className="bg-white rounded shadow p-4">
              <h3 className="font-medium">Small Pie</h3>
              <div className="mt-3 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 32 32">
                  <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
                  <path d={`M16 16 L32 16 A16 16 0 ${courseCount/10 > 0.5 ? 1 : 0} 1 ${16 + 16*Math.cos((courseCount/10)*Math.PI*2)} ${16 + 16*Math.sin((courseCount/10)*Math.PI*2)} Z`} fill="#4f46e5" />
                </svg>
              </div>
            </div>
          </aside>
        </div>

        {activeCourse && (
          <div className="mt-6 bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Manage: {activeCourse.title}</h3>
              <div className="text-sm text-gray-500">ID: {activeCourse.id}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">Question text</label>
                <textarea value={questionForm.text} onChange={(e) => setQuestionForm(prev => ({ ...prev, text: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2" rows={4}/>
              </div>
              <div>
                <label className="block text-sm font-medium">Mark</label>
                <input type="number" value={questionForm.mark} onChange={(e) => setQuestionForm(prev => ({ ...prev, mark: Number(e.target.value) }))} className="mt-1 w-full rounded border px-3 py-2"/>
                <label className="block text-sm font-medium mt-3">Option A</label>
                <input value={questionForm.option_a} onChange={(e) => setQuestionForm(prev => ({ ...prev, option_a: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2"/>
                <label className="block text-sm font-medium mt-3">Option B</label>
                <input value={questionForm.option_b} onChange={(e) => setQuestionForm(prev => ({ ...prev, option_b: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2"/>
                <label className="block text-sm font-medium mt-3">Option C</label>
                <input value={questionForm.option_c} onChange={(e) => setQuestionForm(prev => ({ ...prev, option_c: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2"/>
                <label className="block text-sm font-medium mt-3">Option D</label>
                <input value={questionForm.option_d} onChange={(e) => setQuestionForm(prev => ({ ...prev, option_d: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2"/>
                <label className="block text-sm font-medium mt-3">Correct option</label>
                <select value={questionForm.correct_option} onChange={(e) => setQuestionForm(prev => ({ ...prev, correct_option: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                <div className="mt-4">
                  <Button onClick={handleAddQuestion}>Add Question</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowCreate(false)} />
            <div className="relative w-full max-w-2xl bg-white rounded p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-3">Create Special Course</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Title</label>
                  <input value={newCourse.title} onChange={e => setNewCourse(prev => ({ ...prev, title: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2"/>
                </div>
                <div>
                  <label className="block text-sm">Mark (per question default)</label>
                  <input type="number" value={newCourse.mark} onChange={e => setNewCourse(prev => ({ ...prev, mark: Number(e.target.value) }))} className="mt-1 w-full rounded border px-3 py-2"/>
                </div>
                <div>
                  <label className="block text-sm">Start time</label>
                  <input type="datetime-local" value={newCourse.start_time} onChange={e => setNewCourse(prev => ({ ...prev, start_time: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2"/>
                </div>
                <div>
                  <label className="block text-sm">End time</label>
                  <input type="datetime-local" value={newCourse.end_time} onChange={e => setNewCourse(prev => ({ ...prev, end_time: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm">Description</label>
                  <textarea value={newCourse.description} onChange={e => setNewCourse(prev => ({ ...prev, description: e.target.value }))} className="mt-1 w-full rounded border px-3 py-2" rows={3} />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded border">Cancel</button>
                <Button onClick={handleCreateCourse} disabled={creating}>{creating ? 'Creating...' : 'Create'}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
