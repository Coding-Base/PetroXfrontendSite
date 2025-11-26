import React from 'react';

const GuidedTour = ({ isActive, currentStep, onNext, onPrev, onSkip }) => {
  if (!isActive) return null;

  const tourSteps = [
    {
      title: "Welcome to Your Dashboard!",
      description: "This is your main dashboard where you can track your progress and access all features.",
      position: "center"
    },
    {
      title: "Track Your Stats",
      description: "Here you can see your test history, average scores, uploads, and global ranking.",
      position: "top"
    },
    {
      title: "Performance Overview",
      description: "Monitor your progress with visual charts that show your performance over time.",
      position: "left"
    },
    {
      title: "Leaderboard",
      description: "See how you rank against other users and stay motivated to improve.",
      position: "right"
    },
    {
      title: "Quick Actions",
      description: "Start tests, create group sessions, or use PetroMark AI from here.",
      position: "bottom"
    }
  ];

  const currentStepData = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      
      {/* Tour Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto animate-in fade-in-90 zoom-in-90">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{currentStepData.title}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-blue-100 text-sm">
                  {currentStep + 1} / {tourSteps.length}
                </span>
                <button
                  onClick={onSkip}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-6">{currentStepData.description}</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
              ></div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={onPrev}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentStep === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              <button
                onClick={onNext}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105"
              >
                {currentStep === tourSteps.length - 1 ? 'Get Started!' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlight Elements (simplified visual guide) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* These would be positioned highlights in a real implementation */}
        <div className="absolute top-20 left-4 right-4 h-32 border-2 border-yellow-400 rounded-xl shadow-2xl shadow-yellow-400/50 animate-pulse"></div>
      </div>
    </div>
  );
};

export default GuidedTour;
