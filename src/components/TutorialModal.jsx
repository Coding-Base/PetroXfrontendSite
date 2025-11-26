import React from 'react';
import { Button } from './ui/button';

const TutorialModal = ({ isOpen, onClose, onStartTutorial }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden animate-in fade-in-90 zoom-in-90">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Welcome to Petrox! 🎉</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-2">Let's get you started with our platform</p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Interactive Dashboard</h3>
                <p className="text-gray-600 text-sm">Track your progress, scores, and rankings in real-time</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Take Tests</h3>
                <p className="text-gray-600 text-sm">Practice with customized tests and improve your skills</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Group Tests</h3>
                <p className="text-gray-600 text-sm">Collaborate and compete with friends and colleagues</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Upload Materials</h3>
                <p className="text-gray-600 text-sm">Share and access study materials with the community</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">AI Assistant</h3>
                <p className="text-gray-600 text-sm">Get instant help with PetroMark AI for any questions</p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full transition-all ${
                  dot === 1 ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors py-2.5"
            >
              Skip Tutorial
            </Button>
            <Button
              onClick={onStartTutorial}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all transform hover:scale-105 py-2.5 shadow-lg"
            >
              Start Guided Tour
            </Button>
          </div>
          <p className="text-center text-gray-500 text-xs mt-3">
            You can always access this tutorial from settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
