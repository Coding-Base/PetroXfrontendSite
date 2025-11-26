import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  startTest, 
  fetchLeaderboard,
  fetchUserHistory,
  fetchUserRank,
  fetchUserUploadStats
} from '@/api';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {Button} from '../components/ui/button'
import AffiliateDeals from '@/pages/AffilateDeals';
import UpdatesBell from '@/components/UpdatesBell';
import TutorialModal from '@/components/TutorialModal';

// Register chart components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// RANK CONFIGURATION
const RANK_THRESHOLDS = {
  5: 'Lieutenant',
  10: 'Commander',
  15: 'Captain',
  20: 'Vice Admiral',
  25: 'General'
};

// TEST SCORE RANK CONFIGURATION
const TEST_RANK_THRESHOLDS = {
  0: { title: 'Cadet', symbol: '🎓' },
  10: { title: 'Lieutenant', symbol: '⭐' },
  30: { title: 'Commander', symbol: '🚀' },
  70: { title: 'Captain', symbol: '👨‍✈️' },
  100: { title: 'Admiral', symbol: '🎖️' },
  150: { title: 'Major General', symbol: '🏅' }
};

// Calculate user rank based on approved uploads
const calculateRank = (approvedUploads) => {
  const thresholds = Object.keys(RANK_THRESHOLDS)
    .map(Number)
    .sort((a, b) => a - b);
  
  let currentRank = 'Recruit';
  let nextRank = null;
  let uploadsNeeded = 0;
  
  for (const threshold of thresholds) {
    if (approvedUploads >= threshold) {
      currentRank = RANK_THRESHOLDS[threshold];
    } else {
      if (!nextRank) {
        nextRank = RANK_THRESHOLDS[threshold];
        uploadsNeeded = threshold - approvedUploads;
      }
    }
  }
  
  return {
    currentRank,
    nextRank,
    uploadsNeeded
  };
};

// Calculate test rank based on total score
const calculateTestRank = (totalScore) => {
  const thresholds = Object.keys(TEST_RANK_THRESHOLDS)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending

  for (const threshold of thresholds) {
    if (totalScore >= threshold) {
      return {
        currentRank: TEST_RANK_THRESHOLDS[threshold],
        nextThreshold: thresholds.find(t => t > threshold),
        pointsNeeded: thresholds.find(t => t > threshold) ? 
          thresholds.find(t => t > threshold) - totalScore : 0
      };
    }
  }
  
  // Default for scores below 0 (shouldn't happen, but safe)
  return {
    currentRank: TEST_RANK_THRESHOLDS[0],
    nextThreshold: 10,
    pointsNeeded: 10
  };
};

// Get gradient colors based on score
const getGradientColors = (score) => {
  if (score >= 90) {
    return ['#4ade80', '#22d3ee']; // Green to teal
  } else if (score >= 70) {
    return ['#60a5fa', '#c084fc']; // Blue to purple
  } else if (score >= 50) {
    return ['#fbbf24', '#fb923c']; // Yellow to orange
  } else {
    return ['#f9a8d4', '#f87171']; // Pink to red
  }
};

// Utility function to safely extract results from paginated API response
const extractResults = (response) => {
  if (!response) return [];
  
  // Handle different response structures
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.results)) return response.results;
  if (Array.isArray(response.data?.results)) return response.data.results;
  
  return [];
};

// Enhanced check if user is new based on multiple factors
const isNewUser = (historyData, userRank, approvedUploads, averageScore) => {
  console.log('🔍 Checking if user is new with data:', {
    historyLength: historyData?.length,
    userRank,
    approvedUploads,
    averageScore
  });

  // User is new if ANY of these conditions are true:
  const conditions = {
    noHistory: !historyData || historyData.length === 0,
    noRank: !userRank || userRank === null || userRank === 'N/A',
    noUploads: approvedUploads === 0,
    noScore: averageScore === 0
  };

  console.log('🔍 New user conditions:', conditions);

  const isNew = conditions.noHistory || conditions.noRank || conditions.noUploads || conditions.noScore;
  
  console.log('🔍 User is new:', isNew);
  return isNew;
};

// Custom Tour Component - Enhanced with proper positioning
const CustomTour = ({ steps, currentStep, onClose, onNext, onPrev, isActive, onComplete }) => {
  if (!isActive || !steps[currentStep]) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Last step - complete the tour
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay with hole for highlighted element */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      
      {/* Tooltip */}
      <div 
        className="absolute bg-white rounded-xl shadow-2xl p-6 max-w-sm animate-in fade-in-90 zoom-in-90 border border-gray-200 z-50"
        style={{
          top: step.position?.top || '50%',
          left: step.position?.left || '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
              {currentStep + 1}
            </div>
            <h3 className="font-bold text-gray-800">{step.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-600 text-sm mb-4">{step.content}</p>

        {/* Progress and Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <button
                onClick={onPrev}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRank, setUserRank] = useState(null);
  const [uploadStats, setUploadStats] = useState({
    approvedUploads: 0,
    rankInfo: { currentRank: 'Recruit', nextRank: 'Lieutenant', uploadsNeeded: 5 }
  });
  const [totalTestScore, setTotalTestScore] = useState(0);
  const [testRankInfo, setTestRankInfo] = useState(null);
  const [isLoading, setIsLoading] = useState({
    leaderboard: true,
    history: true,
    rank: true,
    uploadStats: true,
    all: true
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [isNewUserFlag, setIsNewUserFlag] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [hasTourBeenShown, setHasTourBeenShown] = useState(false);
  const navigate = useNavigate();

  // Custom Tour State - Enhanced with better positioning
  const [tourState, setTourState] = useState({
    isActive: false,
    currentStep: 0,
    steps: [
      {
        title: '👋 Welcome to Your Dashboard!',
        content: 'This is your personal dashboard where you can track your progress, see your stats, and access all features.',
        position: { top: '20%', left: '50%' }
      },
      {
        title: '📊 Your Performance Stats',
        content: 'Here you can see your key metrics: tests taken, average score, approved uploads, and global rank. Track your improvement over time!',
        position: { top: '35%', left: '50%' }
      },
      {
        title: '📈 Performance Chart',
        content: 'This visual chart shows your average score. Aim for higher percentages to improve your ranking!',
        position: { top: '55%', left: '25%' }
      },
      {
        title: '🏆 Leaderboard',
        content: 'See how you rank against other users. Improve your scores and upload quality questions to climb higher!',
        position: { top: '55%', left: '75%' }
      },
      {
        title: '🚀 Quick Actions',
        content: 'Quick access to start new tests, create group tests, or chat with PetroMark AI for assistance.',
        position: { top: '80%', left: '50%' }
      },
      {
        title: '🎯 Ready to Begin!',
        content: 'You\'re all set! Start by taking your first test or explore other features. Happy learning!',
        position: { top: '50%', left: '50%' }
      }
    ]
  });

  // User-specific localStorage key for tour completion
  const getUserTourKey = (username) => {
    return `petrox_user_${username}_tour_completed`;
  };

  // Check if current user has completed tour before
  const hasCurrentUserCompletedTour = () => {
    if (!userName || userName === 'User') return false;
    
    const userTourKey = getUserTourKey(userName);
    const tourCompleted = localStorage.getItem(userTourKey);
    
    console.log('🔍 Tour completion check for user:', {
      userName,
      userTourKey,
      tourCompleted
    });
    
    return tourCompleted === 'true';
  };

  // Mark tour as completed for current user
  const markTourAsCompletedForCurrentUser = () => {
    if (!userName || userName === 'User') return;
    
    const userTourKey = getUserTourKey(userName);
    localStorage.setItem(userTourKey, 'true');
    
    console.log('✅ Tour marked as completed for user:', userName);
    setDebugInfo(prev => prev + `\n✅ Tour marked as completed for user: ${userName}`);
  };

  // Clean up old user data (optional - for managing storage)
  const cleanupOldUserData = () => {
    // Keep only the current user's data and maybe the last few users
    // This prevents localStorage from growing too large
    const currentUserKey = getUserTourKey(userName);
    const allKeys = Object.keys(localStorage);
    const userTourKeys = allKeys.filter(key => key.startsWith('petrox_user_') && key.endsWith('_tour_completed'));
    
    // Keep current user and max 5 recent users
    const keysToKeep = userTourKeys.slice(0, 5).concat(currentUserKey);
    const keysToRemove = userTourKeys.filter(key => !keysToKeep.includes(key));
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log('🧹 Removed old user tour data:', key);
    });
  };

  // Calculate stats from real data
  const calculateStats = () => {
    const testsTaken = testHistory.length;
    let totalScorePercentage = 0;
    let scoredTests = 0;

    testHistory.forEach(session => {
      const questionCount = session.questions?.length || 0;
      const score = Number(session.score) || 0;
      
      if (questionCount > 0) {
        const sessionScore = (score / questionCount) * 100;
        totalScorePercentage += sessionScore;
        scoredTests++;
      }
    });

    const averageScore = scoredTests > 0
      ? Math.round(totalScorePercentage / scoredTests)
      : 0;

    return {
      testsTaken,
      averageScore,
      currentRank: userRank,
    };
  };

  // Reset tutorial for current user only
  const resetTutorialForCurrentUser = () => {
    if (!userName || userName === 'User') return;
    
    const userTourKey = getUserTourKey(userName);
    localStorage.removeItem(userTourKey);
    setHasTourBeenShown(false);
    console.log('🎯 Tutorial reset for current user:', userName);
    setDebugInfo(`Tutorial reset for user: ${userName} - refresh page to see tour`);
  };

  // Reset tutorial for ALL users (admin/debug function)
  const resetTutorialForAllUsers = () => {
    const allKeys = Object.keys(localStorage);
    const userTourKeys = allKeys.filter(key => key.startsWith('petrox_user_') && key.endsWith('_tour_completed'));
    
    userTourKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log('🧹 Removed tour data:', key);
    });
    
    setHasTourBeenShown(false);
    console.log('🎯 Tutorial reset for ALL users');
    setDebugInfo('Tutorial reset for ALL users - refresh page to see tour');
  };

  // Set username unconditionally on component mount
  useEffect(() => {
    // Set username from localStorage immediately
    const storedName = localStorage.getItem('username') || 'User';
    setUserName(storedName);

    console.log('🔍 Dashboard mounted - Starting data fetch');
    setDebugInfo('Dashboard mounted - Starting data fetch');

    // Clean up old user data
    cleanupOldUserData();

    // Check tour completion status for current user
    const tourCompleted = hasCurrentUserCompletedTour();
    console.log('🔍 Tour completed status for current user:', tourCompleted);

    // Fetch all dashboard data
    const fetchDashboardData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, all: true }));
        
        console.log('🔍 Fetching user history...');
        setDebugInfo('Fetching user history...');

        // Fetch user history first to check if user is new
        const historyRes = await fetchUserHistory();
        const historyData = extractResults(historyRes) || [];
        
        console.log('🔍 Fetched history data:', historyData);
        console.log('🔍 History length:', historyData.length);
        setTestHistory(historyData);
        setIsLoading(prev => ({ ...prev, history: false }));
        
        // Fetch user rank
        console.log('🔍 Fetching user rank...');
        setDebugInfo('Fetching user rank...');
        const rankRes = await fetchUserRank();
        const rankData = extractResults(rankRes);
        const userRankValue = rankData?.rank || rankRes?.data?.rank || rankData[0]?.rank || null;
        
        console.log('🔍 User rank data:', rankRes, 'Extracted rank:', userRankValue);
        setUserRank(userRankValue);
        setIsLoading(prev => ({ ...prev, rank: false }));
        
        // Fetch upload stats
        console.log('🔍 Fetching upload stats...');
        setDebugInfo('Fetching upload stats...');
        const uploadStatsRes = await fetchUserUploadStats();
        const uploadData = extractResults(uploadStatsRes);
        const approvedUploads = uploadData[0]?.approved_uploads || 
                              uploadData?.approved_uploads || 
                              uploadStatsRes?.data?.approved_uploads || 
                              0;
        
        console.log('🔍 Approved uploads:', approvedUploads);
        setUploadStats({
          approvedUploads,
          rankInfo: calculateRank(approvedUploads)
        });
        setIsLoading(prev => ({ ...prev, uploadStats: false }));

        // Calculate stats to get average score
        const stats = calculateStats();
        console.log('🔍 Calculated stats:', stats);

        // Check if user is new
        const isNew = isNewUser(historyData, userRankValue, approvedUploads, stats.averageScore);
        
        setIsNewUserFlag(isNew);

        console.log('🔍 Final user status check:', {
          isNew,
          tourCompleted,
          historyLength: historyData.length,
          userRank: userRankValue,
          approvedUploads,
          averageScore: stats.averageScore,
          hasTourBeenShown,
          userName
        });

        setDebugInfo(`
          User Status Check:
          - User Name: ${userName}
          - Is New: ${isNew}
          - Tour Completed: ${tourCompleted}
          - History Length: ${historyData.length}
          - User Rank: ${userRankValue}
          - Approved Uploads: ${approvedUploads}
          - Average Score: ${stats.averageScore}
          - Has Tour Been Shown This Session: ${hasTourBeenShown}
          - Conditions:
            * No History: ${!historyData || historyData.length === 0}
            * No Rank: ${!userRankValue || userRankValue === null || userRankValue === 'N/A'}
            * No Uploads: ${approvedUploads === 0}
            * No Score: ${stats.averageScore === 0}
        `);

        // Show tutorial if user is new AND hasn't completed tour AND tour not shown this session
        if (isNew && !tourCompleted && !hasTourBeenShown) {
          console.log('🎯 SHOWING TUTORIAL - User is new and has not completed tour');
          setDebugInfo(prev => prev + '\n🎯 SHOWING TUTORIAL - User is new and has not completed tour');
          
          // Start the tour automatically for new users after a short delay
          setTimeout(() => {
            console.log('🎯 Starting tour automatically for new user');
            setTourState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
            setHasTourBeenShown(true);
          }, 2000);
        } else {
          console.log('❌ NOT showing tutorial - Reason:', {
            isNew,
            tourCompleted,
            hasTourBeenShown,
            shouldShow: isNew && !tourCompleted && !hasTourBeenShown
          });
          setDebugInfo(prev => prev + `\n❌ NOT showing tutorial - isNew: ${isNew}, tourCompleted: ${tourCompleted}, hasTourBeenShown: ${hasTourBeenShown}`);
        }
        
        // Calculate total test score from history
        if (historyData.length > 0) {
          const totalScore = historyData.reduce((acc, session) => {
            return acc + (Number(session.score) || 0);
          }, 0);
          
          console.log('Total test score:', totalScore);
          setTotalTestScore(totalScore);
          setTestRankInfo(calculateTestRank(totalScore));
        } else {
          setTestRankInfo({
            currentRank: TEST_RANK_THRESHOLDS[0],
            nextThreshold: 10,
            pointsNeeded: 10
          });
        }

        // Fetch leaderboard
        const leaderboardRes = await fetchLeaderboard();
        setLeaderboard(extractResults(leaderboardRes));
        setIsLoading(prev => ({ ...prev, leaderboard: false, all: false }));
        
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setDebugInfo(`Failed to load dashboard data: ${err.message}`);
        setIsLoading({
          leaderboard: false,
          history: false,
          rank: false,
          uploadStats: false,
          all: false
        });

        // Even if API fails, show tutorial assuming user is new and hasn't completed tour
        const tourCompleted = hasCurrentUserCompletedTour();
        if (!tourCompleted && !hasTourBeenShown) {
          console.log('🎯 SHOWING TUTORIAL - API failed but assuming user is new');
          setDebugInfo(prev => prev + '\n🎯 SHOWING TUTORIAL - API failed but assuming user is new');
          setTimeout(() => {
            setTourState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
            setHasTourBeenShown(true);
          }, 2000);
        }
      }
    };
    
    fetchDashboardData();
  }, [hasTourBeenShown, userName]);

  // Handle tutorial completion (for manual start from modal)
  const handleTutorialComplete = (startTour) => {
    console.log('Tutorial completed, allow tutorial:', startTour);
    setShowTutorial(false);
    
    if (startTour) {
      // Start the custom tour
      setTimeout(() => {
        setTourState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
        setHasTourBeenShown(true);
      }, 500);
    }
  };

  // Handle tour completion
  const handleTourComplete = () => {
    console.log('✅ Tour completed by user');
    markTourAsCompletedForCurrentUser();
    setTourState(prev => ({ ...prev, isActive: false }));
    setDebugInfo(prev => prev + '\n✅ Tour completed and marked as seen for current user');
  };

  // Tour navigation handlers
  const handleNextStep = () => {
    setTourState(prev => {
      if (prev.currentStep < prev.steps.length - 1) {
        return { ...prev, currentStep: prev.currentStep + 1 };
      } else {
        // Tour finished - mark as completed
        handleTourComplete();
        return prev;
      }
    });
  };

  const handlePrevStep = () => {
    setTourState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1)
    }));
  };

  const handleCloseTour = () => {
    // Don't mark as completed if user closes early
    console.log('Tour closed early by user');
    setTourState(prev => ({ ...prev, isActive: false }));
    setDebugInfo(prev => prev + '\n⚠️ Tour closed early by user');
  };

  const stats = calculateStats();

  // Get performance rating description
  const getPerformanceRating = (score) => {
    if (score >= 90) return 'Excellent!';
    if (score >= 80) return 'Great job!';
    if (score >= 70) return 'Good work!';
    if (score >= 60) return 'Keep improving!';
    return 'Needs practice';
  };

  // Create performance doughnut chart data
  const getPerformanceData = () => {
    const [colorStart, colorEnd] = getGradientColors(stats.averageScore);
    
    return {
      datasets: [{
        data: [stats.averageScore, 100 - stats.averageScore],
        backgroundColor: [
          `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
          'rgba(229, 231, 235, 0.3)' // Light gray for the remaining
        ],
        borderWidth: 0,
        borderRadius: 10,
        spacing: 0,
        hoverOffset: 0
      }]
    };
  };

  const performanceData = getPerformanceData();

  // Doughnut chart options
  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
    },
    cutout: '75%',
    rotation: 270, // Start from top
    circumference: 360, // Full circle
    animation: {
      animateRotate: true,
      animateScale: true
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Tutorial Modal - Only shows for manual activation */}
      {showTutorial && (
        <TutorialModal 
          isOpen={showTutorial}
          onClose={() => handleTutorialComplete(false)}
          onStartTutorial={() => handleTutorialComplete(true)}
        />
      )}

      {/* Custom Tour */}
      <CustomTour
        steps={tourState.steps}
        currentStep={tourState.currentStep}
        isActive={tourState.isActive}
        onClose={handleCloseTour}
        onNext={handleNextStep}
        onPrev={handlePrevStep}
        onComplete={handleTourComplete}
      />

      {/* Debug Info - Only show in development */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="fixed bottom-4 left-4 z-40 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-md max-h-64 overflow-auto text-xs">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <pre>{debugInfo}</pre>
          <div className="flex flex-wrap gap-2 mt-2">
            <button 
              onClick={resetTutorialForCurrentUser}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
            >
              Reset Current User
            </button>
            <button 
              onClick={resetTutorialForAllUsers}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs"
            >
              Reset ALL Users
            </button>
            <button 
              onClick={() => {
                setDebugInfo('');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs"
            >
              Clear Debug
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Welcome Header with Dynamic Rank */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, {userName} 👋
              {testRankInfo && testRankInfo.currentRank.title !== 'Cadet' && (
                <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {testRankInfo.currentRank.title}
                </span>
              )}
            </h1>

            <div className="ml-auto">
              <UpdatesBell onOpen={() => navigate('/dashboard/updates')} />
            </div>
          </div>
          
          {testRankInfo ? (
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              {totalTestScore === 0 ? (
                "Take your first test! You need 10 points to become a Lieutenant"
              ) : testRankInfo.pointsNeeded > 0 ? (
                `You need ${testRankInfo.pointsNeeded} more points to become a ${TEST_RANK_THRESHOLDS[testRankInfo.nextThreshold]?.title || 'next rank'}`
              ) : (
                "Congratulations! You've reached the highest rank!"
              )}
            </p>
          ) : (
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              Loading your rank information...
            </p>
          )}
          
          {!isLoading.uploadStats && uploadStats.rankInfo.nextRank && (
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              Upload {uploadStats.rankInfo.uploadsNeeded} more approved questions to become a {uploadStats.rankInfo.nextRank}
            </p>
          )}
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-700">Tests Taken</h3>
                    {isLoading.history ? (
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16"></div>
                    ) : (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-blue-600">{stats.testsTaken}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Total tests completed</p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-700">Average Score</h3>
                    {isLoading.history ? (
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16"></div>
                    ) : (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-green-600">{stats.averageScore}%</p>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Across all tests</p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-700">Approved Uploads</h3>
                    {isLoading.uploadStats ? (
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16"></div>
                    ) : (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-purple-600">
                        {uploadStats.approvedUploads}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Questions approved</p>
              </div>
              
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A.75.75 0 003 5.48v10.643a.75.75 0 00.853.736c2.43-.428 4.926-.94 7.394-1.52.394-.096.669.328.338.611-1.3.975-2.965 1.9-4.77 2.716a.75.75 0 00-.365.962l1.732 4.26a.75.75 0 001.445.194l1.974-4.267c.58.13 1.17.248 1.768.35.45.1.9.19 1.35.27V21a.75.75 0 001.5 0v-2.766c.45-.08.9-.17 1.35-.27.599-.102 1.188-.22 1.768-.35l1.974 4.267a.75.75 0 001.445-.194l1.732-4.26a.75.75 0 00-.365-.962c-1.805-.816-3.47-1.74-4.77-2.716-.331-.283-.056-.707.338-.611 2.468.58 4.964 1.092 7.394 1.52a.75.75 0 00.853-.736V5.48a.75.75 0 00-.834-.724c-2.39.42-4.866.94-7.343 1.528-.388.093-.654-.332-.326-.611a8.963 8.963 0 002.45-4.34.75.75 0 00-1.46-.348 7.508 7.508 0 01-2.066 3.644 7.52 7.52 0 01-3.644 2.066.75.75 0 00-.348 1.46c1.577.397 3.2.74 4.843 1.01z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-700">Global Rank</h3>
                    {isLoading.rank ? (
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16"></div>
                    ) : userRank ? (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-yellow-600">#{userRank}</p>
                    ) : (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-yellow-600">N/A</p>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Your position on leaderboard</p>
              </div>
            </div>
            
            {/* Charts and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="performance-chart bg-white p-4 md:p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Performance Overview
                  </h2>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {stats.averageScore}% Achieved
                  </div>
                </div>
                <div className="h-64 md:h-80 flex items-center justify-center relative">
                  {isLoading.history ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-gray-500">Loading performance data...</div>
                    </div>
                  ) : testHistory.length > 0 ? (
                    <>
                      <Doughnut 
                        data={performanceData} 
                        options={doughnutChartOptions} 
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl md:text-4xl font-bold text-gray-800">
                          {stats.averageScore}%
                        </div>
                        <div className="text-sm md:text-base text-gray-600 mt-1">
                          {getPerformanceRating(stats.averageScore)}
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs text-gray-500">Overall Score</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                      <p className="text-gray-500 text-center">No test data available</p>
                      <Button
                        onClick={() => navigate('/dashboard/my-tests')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Take Your First Test
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="leaderboard-section bg-white p-4 md:p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Leaderboard
                  </h2>
                  <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Top Performers
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {isLoading.leaderboard ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse h-12 bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  ) : leaderboard.length > 0 ? (
                    <div className="space-y-3">
                      {leaderboard.slice(0, 5).map((user, index) => (
                        <div 
                          key={user.id || index} 
                          className={`flex items-center p-3 rounded-lg ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200' : 
                            index === 1 ? 'bg-gray-50' : 
                            index === 2 ? 'bg-orange-50' : 'bg-white'
                          }`}
                        >
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                            index === 1 ? 'bg-gray-200 text-gray-800' : 
                            index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 truncate">
                              {user.username || 'Unknown'}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">
                              {user.tests_taken} tests
                            </p>
                          </div>
                          <div className="font-semibold text-blue-600">
                            {Math.round(user.avg_score)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                      <p className="text-gray-500 text-center">No leaderboard data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="quick-actions bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  Quick Actions
                </h2>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Get Started
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => navigate('/dashboard/my-tests')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Start New Test
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
                  onClick={() => navigate('/create-group')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Group Test
                </Button>
                
                <Button 
                  onClick={() => setActiveTab('petromark')}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  PetroMark AI
                </Button>
              </div>
            </div>
          </div>
        )}
        <AffiliateDeals />
      </div>
    </div>
  );
}
