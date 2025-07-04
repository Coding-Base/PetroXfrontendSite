/import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useGetCourses } from '@/hooks/courses';
import { useCreateTest } from '@/hooks/tests';

export default function CreateTest() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [duration, setDuration] = useState(10);
  const [invitees, setInvitees] = useState(['']);
  const [scheduledStart, setScheduledStart] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [testType, setTestType] = useState('personal');

  const { isLoading, data } = useGetCourses();
  const { isLoading: isSubmitting, mutateAsync: createTestAsync } = useCreateTest();
  const courses = data?.data || [];

  // Set default course when courses load
  useEffect(() => {
    if (!isLoading && courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0].id);
    }
  }, [isLoading, courses, selectedCourse]);

  const handleInviteeChange = (index, value) => {
    const newInvitees = [...invitees];
    newInvitees[index] = value;
    setInvitees(newInvitees);
  };

  const addInviteeField = () => {
    setInvitees([...invitees, '']);
  };

  const removeInviteeField = (index) => {
    if (invitees.length <= 1) return;
    const newInvitees = invitees.filter((_, idx) => idx !== index);
    setInvitees(newInvitees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Validation
    if (!name || !selectedCourse || !scheduledStart) {
      setError('Name, course, and scheduled start date/time are required.');
      return;
    }

    if (testType === 'group') {
      const validEmails = invitees.filter(email => email.trim() !== '');
      if (validEmails.length === 0) {
        setError('Please add at least one email for group test.');
        return;
      }
    }

    try {
      // Convert to UTC
      const scheduledStartUtc = new Date(scheduledStart).toISOString();

      const payload = {
        name,
        course: selectedCourse,
        question_count: questionCount,
        duration_minutes: duration,
        invitees: testType === 'group' 
          ? invitees.filter(email => email.trim() !== '') 
          : [],
        scheduled_start: scheduledStartUtc
      };

      const { data } = await createTestAsync(payload);

      setSuccessMsg(
        testType === 'personal'
          ? 'Personal test created successfully! Redirecting...'
          : 'Group test created successfully! Redirecting...'
      );

      setTimeout(() => {
        navigate(`/dashboard/group-test/${data.id}`);
      }, 1000);
    } catch (err) {
      console.error('Test creation error:', err);
      setError(
        err.response?.data?.error || 
        `Failed to create ${testType} test. Please try again.`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <p className="text-lg">Loading courses...</p>
        <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
          <div className="h-full w-3/4 animate-pulse rounded-full bg-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6 overflow-y-auto md:overflow-visible">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Create Test</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {successMsg && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Test Type Selection */}
        <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
          <label className="block mb-2 font-medium text-blue-800">Test Type</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="testType"
                value="personal"
                checked={testType === 'personal'}
                onChange={() => setTestType('personal')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <span className="ml-2 text-gray-700">Personal Test</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="testType"
                value="group"
                checked={testType === 'group'}
                onChange={() => setTestType('group')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <span className="ml-2 text-gray-700">Group Test</span>
            </label>
          </div>
          <p className="mt-2 text-sm text-blue-600">
            {testType === 'personal' 
              ? 'Test for yourself only' 
              : 'Invite others to join your test'}
          </p>
        </div>

        {/* Test Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Test Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Physics Midterm Practice"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Course Selection */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            required
            disabled={isSubmitting || courses.length === 0}
          >
            <option value="">{courses.length ? 'Select a course' : 'No courses available'}</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Question Count & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.max(1, Math.min(100, +e.target.value)))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="180"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, Math.min(180, +e.target.value)))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Scheduled Start */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Scheduled Start
          </label>
          <input
            type="datetime-local"
            value={scheduledStart}
            onChange={(e) => setScheduledStart(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
          <p className="mt-2 text-sm text-gray-500">
            Your test will start at this time
          </p>
        </div>

        {/* Invitees for Group Test */}
        {testType === 'group' && (
          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
            <div className="flex justify-between items-center">
              <label className="block font-medium text-blue-800">
                Invitee Emails
              </label>
              <span className="text-sm text-blue-600">
                {invitees.filter(e => e.trim()).length} added
              </span>
            </div>
            
            <p className="mb-3 text-sm text-blue-600">
              Add email addresses of people you want to invite
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {invitees.map((email, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="friend@example.com"
                    value={email}
                    onChange={(e) => handleInviteeChange(idx, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => removeInviteeField(idx)}
                    className={`p-2 rounded-full ${invitees.length > 1 
                      ? 'text-red-600 hover:bg-red-100' 
                      : 'text-gray-400 cursor-not-allowed'}`}
                    disabled={invitees.length <= 1}
                    title="Remove email"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addInviteeField}
              className="mt-3 flex items-center text-blue-600 hover:text-blue-800 font-medium"
              disabled={isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add another email
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-white font-medium shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-70"
            disabled={isSubmitting || courses.length === 0}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Test...
              </div>
            ) : (
              `Create ${testType === 'personal' ? 'Personal' : 'Group'} Test`
            )}
          </Button>
          
          {courses.length === 0 && (
            <p className="mt-2 text-center text-sm text-red-600">
              Cannot create test - no courses available
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
