import axios from 'axios';

// Base URL for backend API
const baseURL = 'https://petroxtestbackend.onrender.com';

// Create an Axios instance
export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

// Token helpers
const getAccessToken  = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// Request interceptor: inject access token
api.interceptors.request.use(
  config => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor: handle 401 and refresh token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${baseURL}/api/token/refresh/`,
          { refresh: getRefreshToken() },
          { headers: { 'Content-Type': 'application/json' } }
        );
        localStorage.setItem('access_token', data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (e) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

// AUTH endpoints
export const loginUser    = (username, password) =>
  api.post('/api/token/', { username, password });

export const refreshToken = refresh =>
  api.post('/api/token/refresh/', { refresh });

export const registerUser = (username, email, password) =>
  api.post('/api/users/', { username, email, password });

// COURSES & TESTS endpoints
export const fetchCourses     = () =>
  api.get('/api/courses/');

export const startTest        = (courseId, questionCount, duration) =>
  api.post('/api/start-test/', {
    course_id:      courseId,
    question_count: questionCount,
    duration_minutes: duration
  });

export const submitTest       = (sessionId, answers) =>
  api.post(`/api/submit-test/${sessionId}/`, { answers });

export const fetchTestSession = sessionId =>
  api.get(`/api/test-session/${sessionId}/`);

// HISTORY endpoints
export const fetchHistory = () =>
  api.get('/api/history/');

// GROUP TEST endpoints
export const createGroupTest = payload =>
  api.post('/api/create-group-test/', payload);

export const fetchGroupTestDetail = (testId) =>
  api.get(`/api/group-test/${testId}/`);

// LEADERBOARD & RANK endpoints
export const fetchLeaderboard    = () =>
  api.get('/api/leaderboard/');

export const fetchUserHistory    = () =>
  api.get('/api/history/');

export const fetchUserRank       = () =>
  api.get('/api/user/rank/');

// USER UPLOAD STATS
export const fetchUserUploadStats = () =>
  api.get('/api/user/upload-stats/');

// MATERIALS endpoints
export const uploadMaterial = (formData, signal) =>
  api.post('/api/materials/upload/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    signal
  });

// ADDED: Search materials endpoint
export const searchMaterials = (query) =>
  api.get(`/api/materials/search/?query=${encodeURIComponent(query)}`);

// ADDED: Download material endpoint
export const downloadMaterial = (materialId) =>
  api.get(`/api/materials/download/${materialId}/`);

// PAST QUESTIONS endpoints
// ADDED: Preview past questions endpoint
export const previewPassQuestions = (formData) =>
  api.post('/api/preview-pass-questions/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// ADDED: Upload past questions endpoint
export const uploadPassQuestions = (payload) =>
  api.post('/api/upload-pass-questions/', payload);

// QUESTION APPROVAL endpoints
// ADDED: Fetch pending questions
export const fetchPendingQuestions = () =>
  api.get('/api/questions/pending/');

// ADDED: Update question status
export const updateQuestionStatus = (questionId, status) =>
  api.put(`/api/questions/${questionId}/status/`, { status });

export default api;

