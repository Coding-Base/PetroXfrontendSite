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

// NEW: Enhanced check if user is new
const isNewUser = (historyData, userRank, approvedUploads) => {
  console.log('Checking if user is new:', {
    historyLength: historyData?.length,
    userRank,
    approvedUploads
  });

  // If no history data at all, treat as new user
  if (!historyData || historyData.length === 0) {
    return true;
  }

  // Check if user has any meaningful activity
  const hasActivity = historyData.some(session => 
    session.score > 0 || 
    session.questions?.length > 0 ||
    session.completed === true
  );

  return !hasActivity && approvedUploads === 0;
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
  const [isGuidedTourActive, setIsGuidedTourActive] = useState(false);
  const navigate = useNavigate();

  // Set username unconditionally on component mount
  useEffect(() => {
    // Set username from localStorage immediately
    const storedName = localStorage.getItem('username') || 'User';
    setUserName(storedName);

    // Fetch all dashboard data
    const fetchDashboardData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, all: true }));
        
        // Fetch user history first to check if user is new
        const historyRes = await fetchUserHistory();
        const historyData = extractResults(historyRes) || [];
        
        console.log('Fetched history data:', historyData);
        setTestHistory(historyData);
        setIsLoading(prev => ({ ...prev, history: false }));
        
        // Fetch user rank
        const rankRes = await fetchUserRank();
        const rankData = extractResults(rankRes);
        const userRankValue = rankData[0]?.rank || rankData?.rank || rankRes?.data?.rank || null;
        
        console.log('User rank data:', rankRes, 'Extracted rank:', userRankValue);
        setUserRank(userRankValue);
        setIsLoading(prev => ({ ...prev, rank: false }));
        
        // Fetch upload stats
        const uploadStatsRes = await fetchUserUploadStats();
        const uploadData = extractResults(uploadStatsRes);
        const approvedUploads = uploadData[0]?.approved_uploads || 
                              uploadData?.approved_uploads || 
                              uploadStatsRes?.data?.approved_uploads || 
                              0;
        
        console.log('Approved uploads:', approvedUploads);
        setUploadStats({
          approvedUploads,
          rankInfo: calculateRank(approvedUploads)
        });
        setIsLoading(prev => ({ ...prev, uploadStats: false }));
        
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
        setIsLoading(prev => ({ ...prev, leaderboard: false }));
        
        // Check if user is new and should see tutorial
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        const isNew = isNewUser(historyData, userRankValue, approvedUploads);
        
        console.log('User status - Is new:', isNew, 'Has seen tutorial:', hasSeenTutorial, 'History length:', historyData.length);
        
        if (isNew && !hasSeenTutorial) {
          console.log('Showing tutorial for new user');
          // Small delay to ensure dashboard is fully loaded
          setTimeout(() => {
            setShowTutorial(true);
          }, 1000);
        }
        
        setIsLoading(prev => ({ ...prev, all: false }));
        
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setIsLoading({
          leaderboard: false,
          history: false,
          rank: false,
          uploadStats: false,
          all: false
        });

        // Even if API fails, check if we should show tutorial for new users
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        if (!hasSeenTutorial) {
          console.log('API failed, showing tutorial by default');
          setTimeout(() => {
            setShowTutorial(true);
          }, 1000);
        }
      }
    };
    
    fetchDashboardData();
  }, []);

  // Handle tutorial completion
  const handleTutorialComplete = (allowTutorial) => {
    console.log('Tutorial completed, allow tutorial:', allowTutorial);
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
    
    if (allowTutorial) {
      startGuidedTour();
    }
  };

  // Start guided tour function
  const startGuidedTour = () => {
    console.log('Starting guided tour');
    setIsGuidedTourActive(true);
    
    // Show first tooltip for dashboard
    setTimeout(() => {
      // Navigate to the tests page as a starting point
      navigate('/dashboard/my-tests');
      
      // Show success message or next steps
      setTimeout(() => {
        alert("🎉 Welcome to Petrox! Let's start with taking your first test. Explore the different features as you go!");
        setIsGuidedTourActive(false);
      }, 2000);
    }, 500);
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
      {/* Tutorial Modal */}
      <TutorialModal 
        isOpen={showTutorial}
        onClose={() => handleTutorialComplete(false)}
        onStartTutorial={() => handleTutorialComplete(true)}
      />

      {/* Guided Tour Overlay */}
      {isGuidedTourActive && (
        <div className="fixed inset-0 z-40 bg-blue-600 bg-opacity-10 backdrop-blur-sm transition-all duration-300"></div>
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

            {/* Updates bell in header */}
            <div className="ml-auto">
              <UpdatesBell onOpen={() => navigate('/dashboard/updates')} />
            </div>
          </div>
          
          {testHistory.length === 0 && !isLoading.all && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">New to Petrox?</p>
                  <p className="text-blue-600 text-sm">Take your first test to get started and unlock all features!</p>
                </div>
              </div>
            </div>
          )}
          
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A.75.75 0 003 5.48v10.643a.75.75 0 00.853.736c2.43-.428 4.926-.94 7.394-1.52.394-.096.669.328.338.611-1.3.975-2.965 1.9-4.77 2.716a.75.75 0 00-.365.962l1.732 4.26a.75.75 0 001.445.194l1.974-4.267c.58.13 1.17.248 1.768.35.45.1.9.19 1.35.27V21a.75.75 0 001.5 0v-2.766c.45-.08.9-.17 1.35-.27.599-.102 1.188-.22 1.768-.35l1.974 4.267a.75.75 0 001.44
