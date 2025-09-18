// src/api/index.jsx
import axios from 'axios';

// Read backend base URL from environment and normalize (remove trailing slash)
const rawBaseURL = import.meta.env.VITE_SERVER_URL || '';
const baseURL = rawBaseURL ? rawBaseURL.replace(/\/+$/, '') : '';

// Helpful debug message so you can see where requests will go.
// In production you may remove or reduce logging.
if (!baseURL) {
  // eslint-disable-next-line no-console
  console.error(
    'VITE_SERVER_URL is not set. The frontend will call the current origin for /api/* which may return index.html. ' +
    'Set VITE_SERVER_URL to your backend API base (e.g. https://petroxtestbackend.onrender.com) in your Render environment variables and redeploy.'
  );
} else {
  // eslint-disable-next-line no-console
  console.info('API base URL:', baseURL);
}

// Create an Axios instance
export const api = axios.create({
  baseURL, // if empty, requests will be relative to the current origin (not desired in prod)
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Utility: build a full URL for debugging (not used by axios)
export const getFullUrl = (path) => {
  if (!path) return baseURL || window.location.origin;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return baseURL ? `${baseURL}${normalizedPath}` : `${window.location.origin}${normalizedPath}`;
};

// Token helpers
const getAccessToken  = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// ===================== REQUEST INTERCEPTOR =====================
api.interceptors.request.use(
  config => {
    // list endpoints that don't require auth tokens
    const unauthenticatedEndpoints = [
      '/api/token',
      '/api/token/refresh',
      '/users'
    ];

    // Build pathname safely using baseURL or current origin
    let baseForUrl = baseURL || (typeof window !== 'undefined' ? window.location.origin : '');
    try {
      const requestPath = new URL(config.url, baseForUrl).pathname;
      const isUnauthenticated = unauthenticatedEndpoints.some(path =>
        requestPath.startsWith(path)
      );

      if (!isUnauthenticated) {
        const token = getAccessToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      // If URL parsing fails, just attach token if present
      const token = getAccessToken();
      if (token) {
        config.headers = config.headers || {};
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

    // Try refresh on 401
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/api/token/refresh/', { refresh: getRefreshToken() });
        localStorage.setItem('access_token', data.access);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (e) {
        localStorage.clear();
        // Redirect to login page
        if (typeof window !== 'undefined') window.location.href = '/login';
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

// ===================== UPDATES ENDPOINTS =====================
// fetchUpdates adds a cache-buster _t param and requests no-cache
export const fetchUpdates = (page_size = 20, extraParams = {}) =>
  api.get('/api/updates/', {
    params: {
      page_size,
      _t: Date.now(),           // cache-buster to avoid stale CDN cache
      ...extraParams
    },
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });

// detail, like/unlike, like_status, unread_count, mark_all_read
export const fetchUpdate = (slug) =>
  api.get(`/api/updates/${encodeURIComponent(slug)}/`);

export const likeUpdate = (slug) =>
  api.post(`/api/updates/${encodeURIComponent(slug)}/like/`);

export const unlikeUpdate = (slug) =>
  api.post(`/api/updates/${encodeURIComponent(slug)}/unlike/`);

export const checkLikeStatus = (slug) =>
  api.get(`/api/updates/${encodeURIComponent(slug)}/like_status/`);

export const getUnreadCount = () =>
  api.get('/api/updates/unread_count/');

export const markAllUpdatesRead = () =>
  api.post('/api/updates/mark_all_read/');

// ===================== COMMENTS ENDPOINTS =====================
export const fetchComments = (updateId, params = {}) =>
  api.get('/api/comments/', { params: { update: updateId, ...params } });

export const createComment = (data) =>
  api.post('/api/comments/', data);

export const updateComment = (id, data) =>
  api.put(`/api/comments/${encodeURIComponent(id)}/`, data);

export const deleteComment = (id) =>
  api.delete(`/api/comments/${encodeURIComponent(id)}/`);

// ===================== COURSES ENDPOINTS =====================
export const fetchCourses = () => api.get('/api/courses/');

// ===================== TEST ENDPOINTS =====================
export const startTest = (courseId, questionCount, duration) =>
  api.post('/api/start-test/', {
    course_id: courseId,
    question_count: questionCount,
    duration_minutes: duration
  });

export const submitTest = (sessionId, answers) =>
  api.post(`/api/submit-test/${encodeURIComponent(sessionId)}/`, { answers });

export const fetchTestSession = sessionId =>
  api.get(`/api/test-session/${encodeURIComponent(sessionId)}/`);

// ===================== HISTORY ENDPOINTS =====================
export const fetchHistory = () => api.get('/api/history/');
export const fetchUserHistory = () => api.get('/api/history/');

// ===================== GROUP TEST ENDPOINTS =====================
export const createGroupTest = payload =>
  api.post('/api/create-group-test/', payload);

export const fetchGroupTestDetail = testId =>
  api.get(`/api/group-test/${encodeURIComponent(testId)}/`);

// ===================== LEADERBOARD ENDPOINTS =====================
export const fetchLeaderboard = () => api.get('/api/leaderboard/');
export const fetchUserRank = () => api.get('/api/user/rank/');
export const fetchUserUploadStats = () => api.get('/api/user/upload-stats/');

// ===================== MATERIALS ENDPOINTS =====================
export const uploadMaterial = (formData, onUploadProgress) => {
  return api.post('/api/materials/upload/', formData, {
    timeout: 120000,
    headers: { 'X-Upload-Timeout': '120000' },
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

export const searchMaterials = (query) =>
  api.get(`/api/materials/search/?query=${encodeURIComponent(query)}`)
    .then(response => response.data);

export const downloadMaterial = (materialId) =>
  api.get(`/api/materials/download/${encodeURIComponent(materialId)}/`)
    .then(response => {
      if (response.data?.download_url) {
        return { download_url: response.data.download_url };
      }
      return response.data;
    });

// ===================== QUESTION ENDPOINTS =====================
export const fetchPendingQuestions = () => api.get('/api/questions/pending/');

export const updateQuestionStatus = (questionId, status) =>
  api.put(`/api/questions/${encodeURIComponent(questionId)}/status/`, { status });

export const previewPassQuestions = (formData) =>
  api.post('/api/preview-pass-questions/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const uploadPassQuestions = (payload) =>
  api.post('/api/upload-pass-questions/', payload);

export default api;
