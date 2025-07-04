import { api } from '@/api';

export const addCourse = async (course, signal) =>
  api.post('/api/courses/', course, { signal });

export const getCourses = async (signal) => api.get('/api/courses/', { signal });
