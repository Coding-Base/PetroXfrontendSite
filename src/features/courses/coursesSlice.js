import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourses = createAsyncThunk('courses/fetch', async (q) => {
  const res = await axios.get('/api/exams/courses/', { params: { q } });
  return res.data;
});

export const enrollCourse = createAsyncThunk('courses/enroll', async ({ courseId }) => {
  const res = await axios.post(`/api/exams/courses/${courseId}/enroll/`);
  return res.data;
});

export const fetchEnrollment = createAsyncThunk('courses/fetchEnrollment', async ({ enrollmentId }) => {
  const res = await axios.get(`/api/exams/enrollment/${enrollmentId}/`);
  return res.data;
});

export const submitExam = createAsyncThunk('courses/submit', async ({ enrollmentId, answers }) => {
  const res = await axios.post(`/api/exams/enrollment/${enrollmentId}/submit/`, { answers });
  return res.data;
});

const slice = createSlice({
  name: 'courses',
  initialState: { list: [], enrollments: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(enrollCourse.fulfilled, (state, action) => { state.enrollments[action.payload.id] = action.payload; })
      .addCase(fetchEnrollment.fulfilled, (state, action) => { state.enrollments[action.payload.id] = action.payload; });
  }
});

export default slice.reducer;
