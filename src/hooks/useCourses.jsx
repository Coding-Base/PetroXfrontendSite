import { useState, useEffect } from 'react';
import { 
  fetchSpecialCourses, 
  enrollCourse, 
  getEnrolledCourses,
  fetchEnrollmentDetail 
} from '@/api';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCourses = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchSpecialCourses(query);
      const coursesList = Array.isArray(response?.data) ? response.data : response?.data?.results || [];
      setCourses(coursesList);
    } catch (err) {
      setError(err?.message || 'Failed to fetch courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const enroll = async (courseId) => {
    try {
      setError(null);
      const response = await enrollCourse(courseId);
      return response?.data;
    } catch (err) {
      setError(err?.message || 'Failed to enroll in course');
      throw err;
    }
  };

  return { courses, loading, error, searchCourses, enroll };
};

export const useEnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10, count: 0 });

  const fetchEnrolled = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEnrolledCourses();
      const data = response?.data || {};
      setEnrolledCourses(data.results || []);
      setPagination({
        page: data.page || 1,
        page_size: data.page_size || 10,
        count: data.count || 0,
      });
    } catch (err) {
      setError(err?.message || 'Failed to fetch enrolled courses');
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolled();
  }, []);

  return { enrolledCourses, loading, error, pagination, refetch: fetchEnrolled };
};

export const useEnrollmentDetail = (enrollmentId) => {
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchEnrollmentDetail(enrollmentId);
      setEnrollment(response?.data);
    } catch (err) {
      setError(err?.message || 'Failed to fetch enrollment details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enrollmentId) {
      fetchDetail();
    }
  }, [enrollmentId]);

  return { enrollment, loading, error, refetch: fetchDetail };
};
