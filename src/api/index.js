// api/index.jsx
import axios from 'axios';

// Base URL for backend API - ensure no trailing slash
const rawBaseURL = import.meta.env.VITE_SERVER_URL;
const baseURL = rawBaseURL.endsWith('/')
  ? rawBaseURL.slice(0, -1)
  : rawBaseURL;

// Create an Axios instance
export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000, // 30 seconds global timeout
});

// Token helpers
const getAccessToken  = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// ===================== REQUEST INTERCEPTOR =====================
api.interceptors.request.use(
  config => {
    const unauthenticatedEndpoints = [
      '/api/token',
      '/api/token/refresh',
      '/users'
    ];

    // Use URL constructor to get pathname; works with absolute or relative config.url
    const requestPath = new URL(config.url, baseURL).pathname;
    const isUnauthenticated = unauthenticatedEndpoints.some(path =>
      requestPath.startsWith(path)
    );

    if (!isUnauthenticated) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn(`No access token found for ${requestPath}`);
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

// ===================== RESPONSE INTERCEPTOR =====================
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Request timed out. Please try again.',
        isTimeout: true
      });
    }

    if (!error.response) {
      const onlineStatus = typeof navigator !== 'undefined' ? navigator.onLine : true;
      return Promise.reject({
        message: onlineStatus
          ? 'Server connection failed. Please try again later.'
          : 'Network error. Please check your internet connection.',
        isNetworkError: true
      });
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post(
          '/api/token/refresh/',
          { refresh: getRefreshToken() }
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

// ===================== AUTH ENDPOINTS =====================
export const loginUser = (username, password) =>
  api.post('/api/token/', { username, password });

export const refreshToken = refresh =>
  api.post('/api/token/refresh/', { refresh });

export const registerUser = (username, email, password) =>
  api.post('/users/', { username, email, password });

// ===================== COURSES ENDPOINTS =====================
export const fetchCourses = () =>
  api.get('/api/courses/');

// ===================== TEST ENDPOINTS =====================
export const startTest = (courseId, questionCount, duration) =>
  api.post('/api/start-test/', {
    course_id: courseId,
    question_count: questionCount,
    duration_minutes: duration
  });

export const submitTest = (sessionId, answers) =>
  api.post(`/api/submit-test/${sessionId}/`, { answers });

export const fetchTestSession = sessionId =>
  api.get(`/api/test-session/${sessionId}/`);

// ===================== HISTORY ENDPOINTS =====================
export const fetchHistory = () =>
  api.get('/api/history/');

export const fetchUserHistory = () =>
  api.get('/api/history/');

// ===================== GROUP TEST ENDPOINTS =====================
export const createGroupTest = payload =>
  api.post('/api/create-group-test/', payload);

export const fetchGroupTestDetail = testId =>
  api.get(`/api/group-test/${testId}/`);

// ===================== LEADERBOARD ENDPOINTS =====================
export const fetchLeaderboard = () =>
  api.get('/api/leaderboard/');

export const fetchUserRank = () =>
  api.get('/api/user/rank/');

export const fetchUserUploadStats = () =>
  api.get('/api/user/upload-stats/');

// ===================== MATERIALS ENDPOINTS =====================
// IMPORTANT: do NOT set 'Content-Type' manually for multipart/form-data.
// Let the browser set the correct Content-Type including boundary.
export const uploadMaterial = (formData) => {
  return api.post('/api/materials/upload/', formData, {
    headers: {
      // remove Content-Type here; allow browser to set boundary
      'X-Upload-Timeout': '120000'
    },
    timeout: 120000
  });
};

export const searchMaterials = (query) =>
  api.get(`/api/materials/search/?query=${encodeURIComponent(query)}`)
    .then(response => response.data);

// ✅ Always return { download_url } for frontend
export const downloadMaterial = (materialId) =>
  api.get(`/api/materials/download/${materialId}/`)
    .then(response => {
      if (response.data?.download_url) {
        return { download_url: response.data.download_url };
      }
      return response.data; // fallback
    });

// ===================== QUESTION ENDPOINTS =====================
export const fetchPendingQuestions = () =>
  api.get('/api/questions/pending/');

export const updateQuestionStatus = (questionId, status) =>
  api.put(`/api/questions/${questionId}/status/`, { status });

export const previewPassQuestions = (formData) =>
  api.post('/api/preview-pass-questions/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const uploadPassQuestions = (payload) =>
  api.post('/api/upload-pass-questions/', payload);

export default api;
