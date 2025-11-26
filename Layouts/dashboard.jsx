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

// NEW: Check if user is new based on multiple criteria
const isNewUser = (historyData, stats, userRank, approvedUploads) => {
  // Check if tests taken is 0
  if (historyData.length === 0) return true;
  
  // Check if all stats are 0 or N/A
  const testsTaken = historyData.length;
  const averageScore = calculateAverageScore(historyData);
  const hasNoData = testsTaken === 0 && averageScore === 0 && (!userRank || userRank === 'N/A') && approvedUploads === 0;
  
  return hasNoData;
};

// NEW: Calculate average score
const calculateAverageScore = (historyData) => {
  if (!historyData || historyData.length === 0) return 0;
  
  let totalScorePercentage = 0;
  let scoredTests = 0;

  historyData.forEach(session => {
    const questionCount = session.questions?.length || 0;
    const score = Number(session.score) || 0;
    
    if (questionCount > 0) {
      const sessionScore = (score / questionCount) * 100;
      totalScorePercentage += sessionScore;
      scoredTests++;
    }
  });

  return scoredTests > 0 ? Math.round(totalScorePercentage / scoredTests) : 0;
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
  const [isGuidedTourActive, setIsGuidedTourActive] = useState(false); // NEW: Guided tour state
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
        const historyData = extractResults(historyRes);
        
        console.log('Fetched history data:', historyData);
        setTestHistory(historyData);
        setIsLoading(prev => ({ ...prev, history: false }));
        
        // Fetch user rank
        const rankRes = await fetchUserRank();
        const rankData = extractResults(rankRes);
        const userRankValue = rankData[0]?.rank || rankData?.rank || rankRes?.data?.rank || 'N/A';
        
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
        
        // Fetch leaderboard (less critical for tutorial check)
        const leaderboardRes = await fetchLeaderboard();
        setLeaderboard(extractResults(leaderboardRes));
        setIsLoading(prev => ({ ...prev, leaderboard: false }));
        
        // Check if user is new and should see tutorial
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        const isNew = isNewUser(historyData, {}, userRankValue, approvedUploads);
        
        console.log('User status - Is new:', isNew, 'Has seen tutorial:', hasSeenTutorial);
        
        if (isNew && !hasSeenTutorial) {
          // Small delay to ensure dashboard is fully loaded
          setTimeout(() => {
            setShowTutorial(true);
          }, 1500);
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
          setTimeout(() => {
            setShowTutorial(true);
          }, 1500);
        }
      }
    };
    
    fetchDashboardData();
  }, []);

  // NEW: Handle tutorial completion
  const handleTutorialComplete = (allowTutorial) => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
    
    if (allowTutorial) {
      startGuidedTour();
    }
  };

  // NEW: Start guided tour function
  const startGuidedTour = () => {
    setIsGuidedTourActive(true);
    
    // Show first tooltip for dashboard
    setTimeout(() => {
      // You can implement step-by-step guidance here
      // For now, we'll navigate to the tests page as a starting point
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
    const averageScore = calculateAverageScore(testHistory);

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
      {/* NEW: Tutorial Modal */}
      <TutorialModal 
        isOpen={showTutorial}
        onClose={() => handleTutorialComplete(false)}
        onStartTutorial={() => handleTutorialComplete(true)}
      />

      {/* NEW: Guided Tour Overlay */}
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

        {/* Rest of your dashboard content remains the same */}
        {/* ... existing dashboard content ... */}
        
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* ... existing stats cards ... */}
            </div>
            
            {/* Charts and Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              {/* ... existing charts and leaderboard ... */}
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 md:mb-8">
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
                  <svg xmlns="http://www.w3.org2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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