import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../images/finallogo.png";
import { Button } from '../components/ui/button';

export default function SignUpRoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'student') {
      navigate('/signup-student');
    } else if (role === 'lecturer') {
      navigate('/signup-lecturer');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      {/* Logo */}
      <div className="mb-8">
        <img src={image} alt="PetroXfrontend Logo" className="h-16 w-auto" />
      </div>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Join PetroXfrontend</h1>
        <p className="text-lg text-gray-600">Select your account type to get started</p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Student Card */}
        <div
          onClick={() => handleRoleSelect('student')}
          className={`p-8 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
            selectedRole === 'student'
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-blue-300 shadow-md hover:shadow-lg'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4">👨‍🎓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Student</h2>
            <p className="text-gray-600 mb-6">
              Take courses, complete tests, and track your progress
            </p>
            <ul className="text-sm text-gray-600 text-left space-y-2 mb-6">
              <li>✓ Access to course materials</li>
              <li>✓ Take special course tests</li>
              <li>✓ View your grades and results</li>
              <li>✓ Track learning progress</li>
            </ul>
            <Button
              onClick={() => handleRoleSelect('student')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Continue as Student
            </Button>
          </div>
        </div>

        {/* Lecturer Card */}
        <div
          onClick={() => handleRoleSelect('lecturer')}
          className={`p-8 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
            selectedRole === 'lecturer'
              ? 'border-purple-500 bg-purple-50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-purple-300 shadow-md hover:shadow-lg'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Lecturer</h2>
            <p className="text-gray-600 mb-6">
              Create courses, manage tests, and track student performance
            </p>
            <ul className="text-sm text-gray-600 text-left space-y-2 mb-6">
              <li>✓ Create and manage special courses</li>
              <li>✓ Design questions with images</li>
              <li>✓ View student results & analytics</li>
              <li>✓ Export test results to Excel</li>
            </ul>
            <Button
              onClick={() => handleRoleSelect('lecturer')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Continue as Lecturer
            </Button>
          </div>
        </div>
      </div>

      {/* Already have account */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:text-blue-600 font-semibold">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
