// src/components/CreateTest.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useGetCourses } from '@/hooks/courses/index';
import { useCreateTest } from '@/hooks/tests/index';

export default function CreateTest() {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [duration, setDuration] = useState(10); // minutes
  const [invitees, setInvitees] = useState(['']);
  const [scheduledStart, setScheduledStart] = useState('');
  const [testType, setTestType] = useState('personal');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // fetch courses
  const { isLoading: loadingCourses, data: courses = [] } = useGetCourses();
  // create-test mutation
  const { isLoading: isSubmitting, mutateAsync: createTestAsync } =
    useCreateTest();

  const handleInviteeChange = (idx, val) => {
    const arr = [...invitees];
    arr[idx] = val;
    setInvitees(arr);
  };

  const addInvitee = () => setInvitees([...invitees, '']);
  const removeInvitee = (idx) =>
    setInvitees(invitees.filter((_, i) => i !== idx) || ['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name || !selectedCourse || !scheduledStart) {
      setError('Name, course, and scheduled start are required.');
      return;
    }
    if (
      testType === 'group' &&
      invitees.filter((em) => em.trim() !== '').length === 0
    ) {
      setError('Please add at least one email for a group test.');
      return;
    }

    try {
      const payload = {
        name,
        course: selectedCourse,
        question_count: questionCount,
        duration_minutes: duration,
        scheduled_start: new Date(scheduledStart).toISOString(),
        invitees:
          testType === 'group'
            ? invitees.filter((em) => em.trim() !== '')
            : [],
      };

      const { data } = await createTestAsync(payload);

      setSuccessMsg(
        testType === 'personal'
          ? 'Personal test created! Redirecting…'
          : 'Group test created! Redirecting…'
      );

      setTimeout(() => {
        navigate(`/dashboard/group-test/${data.id}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          `Failed to create ${testType} test. Please try again.`
      );
    }
  };

  if (loadingCourses) {
    return (
      <div className="mx-auto max-w-md p-6 text-center">
        <p>Loading courses…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Create Test</h2>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
      )}
      {successMsg && (
        <div className="mb-4 rounded bg-green-100 p-3 text-green-700">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Test Type */}
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="testType"
              value="personal"
              checked={testType === 'personal'}
              onChange={() => setTestType('personal')}
              disabled={isSubmitting}
              className="mr-2"
            />
            Personal
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="testType"
              value="group"
              checked={testType === 'group'}
              onChange={() => setTestType('group')}
              disabled={isSubmitting}
              className="mr-2"
            />
            Group
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Test Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-lg border px-4 py-2 focus:ring-blue-500"
            placeholder="Enter test name"
            required
          />
        </div>

        {/* Course */}
        <div>
          <label className="block text-sm font-medium mb-1">Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-lg border px-4 py-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Count & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Questions
            </label>
            <input
              type="number"
              min="1"
              value={questionCount}
              onChange={(e) => setQuestionCount(+e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg border px-4 py-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Duration (min)
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(+e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-lg border px-4 py-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Scheduled Start */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Scheduled Start
          </label>
          <input
            type="datetime-local"
            value={scheduledStart}
            onChange={(e) => setScheduledStart(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-lg border px-4 py-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Invitees */}
        {testType === 'group' && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Invitee Emails
            </label>
            {invitees.map((em, idx) => (
              <div key={idx} className="flex items-center mb-2 space-x-2">
                <input
                  type="email"
                  placeholder="friend@example.com"
                  value={em}
                  onChange={(e) => handleInviteeChange(idx, e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg border px-3 py-2 focus:ring-blue-500"
                />
                {invitees.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInvitee(idx)}
                    disabled={isSubmitting}
                    className="text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInvitee}
              disabled={isSubmitting}
              className="text-blue-600 hover:text-blue-800"
            >
              + Add another email
            </button>
          </div>
        )}

        {/* Submit */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
          >
            {isSubmitting
              ? 'Creating…'
              : `Create ${testType === 'personal' ? 'Personal' : 'Group'} Test`}
          </Button>
        </div>
      </form>
    </div>
  );
}
