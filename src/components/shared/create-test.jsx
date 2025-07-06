import React, { useEffect, useState } from 'react';
import { fetchCourses, startTest } from '@/api/index'; // assuming this is correct path
import { useNavigate } from 'react-router-dom';

const CreateTest = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetchCourses();
        console.log('Fetched Courses:', response.data); // Debug log
        setCourses(response.data); // Make sure response.data is an array
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
      } finally {
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId || !questionCount || !duration) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await startTest(selectedCourseId, questionCount, duration);
      const sessionId = response.data.session_id;
      navigate(`/test/${sessionId}`);
    } catch (err) {
      console.error('Error starting test:', err);
      setError('Failed to start test.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Create a Test</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {isLoadingCourses ? (
        <p>Loading courses...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Course:</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Choose a course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Number of Questions:</label>
            <input
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full border p-2 rounded"
              min={1}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Duration (in minutes):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border p-2 rounded"
              min={1}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Start Test
          </button>
        </form>
      )}

      {/* For Debugging: Uncomment to see course data */}
      {/* <pre>{JSON.stringify(courses, null, 2)}</pre> */}
    </div>
  );
};

export default CreateTest;
