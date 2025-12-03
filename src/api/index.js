// src/api/index.jsx
import axios from 'axios';

// Base URL for backend API - ensure no trailing slash
const rawBaseURL = import.meta.env.VITE_SERVER_URL || '';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

// Create an Axios instance
export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
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

    // Build pathname relative to baseURL safely (works with relative urls too)
    let requestPath = config.url || '';
    try {
      requestPath = new URL(config.url, baseURL).pathname;
    } catch (e) {
      // fallback: use provided url
      requestPath = config.url || '';
    }

    const isUnauthenticated = unauthenticatedEndpoints.some(path =>
      requestPath.startsWith(path)
    );

    if (!isUnauthenticated) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
    const originalRequest = error.config || {};

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

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/api/token/refresh/', { refresh: getRefreshToken() });
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

// ---------------------------
// AUTH
// ---------------------------
export const loginUser = (username, password) =>
  api.post('/api/token/', { username, password });

export const refreshToken = refresh =>
  api.post('/api/token/refresh/', { refresh });

export const registerUser = (username, email, password, registration_number = '', department = '') =>
  api.post('/users/', { username, email, password, registration_number, department });

// ---------------------------
// UPDATES (ANNOUNCEMENTS / BLOGS)
// ---------------------------

// Fetch list of updates. page_size default is 20.
// Adds a cache-busting timestamp param by default to avoid stale caches.
export const fetchUpdates = (page_size = 20, extraParams = {}) =>
  api.get('/api/updates/', {
    params: { page_size, _t: Date.now(), ...extraParams },
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });

export const fetchUpdate = (slug) =>
  api.get(`/api/updates/${encodeURIComponent(slug)}/`);

// Like / unlike endpoints
export const likeUpdate = (slug) =>
  api.post(`/api/updates/${encodeURIComponent(slug)}/like/`);

export const unlikeUpdate = (slug) =>
  api.post(`/api/updates/${encodeURIComponent(slug)}/unlike/`);

// Get like status for current user
export const getUpdateLikeStatus = (slug) =>
  api.get(`/api/updates/${encodeURIComponent(slug)}/like_status/`);

// alias used by some components
export const checkLikeStatus = (slug) => getUpdateLikeStatus(slug);

// Unread count and mark-as-read
export const getUpdatesUnreadCount = () =>
  api.get('/api/updates/unread_count/');

export const getUnreadCount = () => getUpdatesUnreadCount(); // backwards compatible alias

export const markAllUpdatesRead = () =>
  api.post('/api/updates/mark_all_read/');

// ---------------------------
// COMMENTS
// ---------------------------
export const fetchComments = (updateId) =>
  api.get('/api/comments/', { params: { update: updateId } });

export const createComment = (payload) =>
  api.post('/api/comments/', payload);

export const updateComment = (id, data) =>
  api.put(`/api/comments/${id}/`, data);

export const deleteComment = (id) =>
  api.delete(`/api/comments/${id}/`);

// ---------------------------
// OTHER (tests, leaderboard, materials, etc.)
// ---------------------------

export const fetchCourses = () => api.get('/api/courses/');

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

export const fetchHistory = () => api.get('/api/history/');
export const fetchUserHistory = () => api.get('/api/history/');

export const createGroupTest = payload => api.post('/api/create-group-test/', payload);
export const fetchGroupTestDetail = testId => api.get(`/api/group-test/${testId}/`);

export const fetchLeaderboard = () => api.get('/api/leaderboard/');
export const fetchUserRank = () => api.get('/api/user/rank/');
export const fetchUserUploadStats = () => api.get('/api/user/upload-stats/');

// Materials (multipart upload helper)
export const uploadMaterial = (formData, onUploadProgress) => {
  return api.post('/api/materials/upload/', formData, {
    // Allow longer upload time for larger files (default 5 minutes)
    timeout: 300000,
    headers: { 'X-Upload-Timeout': '300000' },
    transformRequest: [(data, headers) => {
      if (headers) {
        if (headers['Content-Type']) delete headers['Content-Type'];
        if (headers.common && headers.common['Content-Type']) delete headers.common['Content-Type'];
      }
      return data;
    }],
    onUploadProgress: typeof onUploadProgress === 'function' ? (progressEvent) => {
      onUploadProgress(progressEvent);
    } : undefined,
  });
};

export const searchMaterials = (query) => {
  // Accept either a string or an object like { query: 'term' }
  let q = '';
  if (typeof query === 'string') q = query;
  else if (query && typeof query === 'object') q = query.query || '';
  return api.get(`/api/materials/search/`, { params: { query: q } });
};

export const downloadMaterial = (materialId) =>
  api.get(`/api/materials/download/${materialId}/`);

// Questions / admin helpers
export const fetchPendingQuestions = () => api.get('/api/questions/pending/');
export const updateQuestionStatus = (questionId, status) =>
  api.put(`/api/questions/${questionId}/status/`, { status });

export const previewPassQuestions = (formData) =>
  api.post('/api/preview-pass-questions/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const uploadPassQuestions = (payload) => api.post('/api/upload-pass-questions/', payload);

// ---------------------------
// SPECIAL COURSES (NEW FEATURE)
// ---------------------------
export const fetchSpecialCourses = (query = '') => 
  api.get('/api/special-courses/', { params: { q: query } });

export const enrollCourse = (courseId) =>
  api.post(`/api/special-courses/${courseId}/enroll/`);

export const fetchEnrollmentDetail = (enrollmentId) =>
  api.get(`/api/enrollment/${enrollmentId}/`);

export const getEnrolledCourses = () =>
  api.get('/api/enrollments/');

export const startExam = (enrollmentId) =>
  api.post(`/api/enrollment/${enrollmentId}/start/`);

export const submitExam = (enrollmentId, answers) =>
  api.post(`/api/enrollment/${enrollmentId}/submit/`, { answers });

export const exportCourseResults = (courseId) =>
  api.get(`/api/special-courses/${courseId}/export/`);

// Default export (axios instance) kept for convenience
export default api;
