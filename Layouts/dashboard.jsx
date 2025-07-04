import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  fetchCourses, 
  startTest, 
  fetchLeaderboard,
  fetchUserHistory,
  fetchUserRank,
  fetchUserUploadStats
} from '../api';
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
import logo from "../images/whitelogo.png";
import { Button } from '../components/ui/button';

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

// PetroMark AI Widget Component
const PetroMarkAI = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
    return () => {};
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <elevenlabs-convai agent-id="agent_01jx3tjzhyfjnt6cxax880pxx4"></elevenlabs-convai>
      </div>
    </div>
  );
};

// RANK CONFIG
const RANK_THRESHOLDS = {
  5: 'Lieutenant',
  10: 'Commander',
  15: 'Captain',
  20: 'Vice Admiral',
  25: 'General'
};

// TEST SCORE RANK CONFIG
const TEST_RANK_THRESHOLDS = {
  0: { title: 'Cadet', symbol: '🎓' },
  10: { title: 'Lieutenant', symbol: '⭐' },
  30: { title: 'Commander', symbol: '🚀' },
  70: { title: 'Captain', symbol: '👨‍✈️' },
  100: { title: 'Admiral', symbol: '🎖️' },
  150: { title: 'Major General', symbol: '🏅' }
};

const calculateRank = (approvedUploads) => {
  const thresholds = Object.keys(RANK_THRESHOLDS).map(Number).sort((a, b) => a - b);
  let currentRank = 'Recruit', nextRank = null, uploadsNeeded = 0;
  for (const t of thresholds) {
    if (approvedUploads >= t) {
      currentRank = RANK_THRESHOLDS[t];
    } else if (!nextRank) {
      nextRank = RANK_THRESHOLDS[t];
      uploadsNeeded = t - approvedUploads;
    }
  }
  return { currentRank, nextRank, uploadsNeeded };
};

const calculateTestRank = (totalScore) => {
  const thresholds = Object.keys(TEST_RANK_THRESHOLDS).map(Number).sort((a, b) => b - a);
  for (const t of thresholds) {
    if (totalScore >= t) {
      return {
        currentRank: TEST_RANK_THRESHOLDS[t],
        nextThreshold: thresholds.find(x => x > t),
        pointsNeeded: thresholds.find(x => x > t) ? thresholds.find(x => x > t) - totalScore : 0
      };
    }
  }
  return { currentRank: TEST_RANK_THRESHOLDS[0], nextThreshold: 10, pointsNeeded: 10 };
};

const getGradientColors = (score) => {
  if (score >= 90) return ['#4ade80', '#22d3ee'];
  if (score >= 70) return ['#60a5fa', '#c084fc'];
  if (score >= 50) return ['#fbbf24', '#fb923c'];
  return ['#f9a8d4', '#f87171'];
};

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [testDuration, setTestDuration] = useState(300);
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
    courses: true,
    rank: true,
    uploadStats: true
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };
    if (showMobileMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileMenu]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // courses
        const coursesRes = await fetchCourses();
        setCourses(coursesRes.data);
        setIsLoading(prev => ({ ...prev, courses: false }));
        if (coursesRes.data.length) setSelectedCourse(coursesRes.data[0].id);

        // leaderboard
        const lb = await fetchLeaderboard();
        setLeaderboard(lb.data);
        setIsLoading(prev => ({ ...prev, leaderboard: false }));

        // history
        const history = await fetchUserHistory();
        setTestHistory(history.data);
        setIsLoading(prev => ({ ...prev, history: false }));
        if (history.data.length) {
          const total = history.data.reduce((acc, s) => acc + s.score, 0);
          setTotalTestScore(total);
          setTestRankInfo(calculateTestRank(total));
        } else {
          setTestRankInfo(calculateTestRank(0));
        }

        // rank
        const rank = await fetchUserRank();
        setUserRank(rank.data.rank);
        setIsLoading(prev => ({ ...prev, rank: false }));

        // upload stats
        const stats = await fetchUserUploadStats();
        const approved = stats.data.approved_uploads || 0;
        setUploadStats({ approvedUploads: approved, rankInfo: calculateRank(approved) });
        setIsLoading(prev => ({ ...prev, uploadStats: false }));

        // name
        setUserName(localStorage.getItem('username') || 'User');
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setIsLoading({
          leaderboard: false,
          history: false,
          courses: false,
          rank: false,
          uploadStats: false
        });
      }
    };
    fetchDashboardData();
  }, []);

  const handleStartTest = () => {
    if (!selectedCourse) {
      alert('Select a course');
      return;
    }
    startTest(selectedCourse, questionCount, testDuration)
      .then(res => navigate(`/test/${res.data.id}`))
      .catch(() => alert('Error starting test'));
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    cutout: '75%',
    rotation: 270,
    circumference: 360,
    animation: { animateRotate: true, animateScale: true }
  };

  const calculateStats = () => {
    const testsTaken = testHistory.length;
    let totalPerc = 0, count = 0;
    testHistory.forEach(s => {
      const qc = s.questions?.length || 0;
      if (qc) {
        totalPerc += (s.score / qc) * 100;
        count++;
      }
    });
    return {
      testsTaken,
      averageScore: count ? Math.round(totalPerc / count) : 0,
      currentRank: userRank
    };
  };
  const stats = calculateStats();

  const getPerformanceRating = score => {
    if (score >= 90) return 'Excellent!';
    if (score >= 80) return 'Great job!';
    if (score >= 70) return 'Good work!';
    if (score >= 60) return 'Keep improving!';
    return 'Needs practice';
  };

  const performanceData = {
    datasets: [{
      data: [stats.averageScore, 100 - stats.averageScore],
      backgroundColor: [
        `linear-gradient(135deg, ${getGradientColors(stats.averageScore).join(', ')})`,
        'rgba(229, 231, 235, 0.3)'
      ],
      borderWidth: 0,
      borderRadius: 10,
      spacing: 0,
      hoverOffset: 0
    }]
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Welcome & Rank */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, {userName} 👋
            </h1>
            {testRankInfo && testRankInfo.currentRank.title !== 'Cadet' && (
              <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {testRankInfo.currentRank.title}
              </span>
            )}
          </div>
          {testRankInfo && (
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              {totalTestScore === 0
                ? "Take your first test! You need 10 points to become a Lieutenant"
                : testRankInfo.pointsNeeded > 0
                ? `You need ${testRankInfo.pointsNeeded} more points to become a ${
                    TEST_RANK_THRESHOLDS[testRankInfo.nextThreshold]?.title || 'higher rank'
                  }`
                : "Congratulations! You've reached the highest rank!"}
            </p>
          )}
          {!isLoading.uploadStats && uploadStats.rankInfo.nextRank && (
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              Upload {uploadStats.rankInfo.uploadsNeeded} more approved questions to become a {uploadStats.rankInfo.nextRank}
            </p>
          )}
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Tests Taken */}
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
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16" />
                    ) : (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-blue-600">{stats.testsTaken}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Total tests completed</p>
              </div>

              {/* Average Score */}
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
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16" />
                    ) : (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-green-600">{stats.averageScore}%</p>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Across all tests</p>
              </div>

              {/* Approved Uploads */}
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
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16" />
                    ) : (
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-purple-600">
                        {uploadStats.approvedUploads}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-2">Questions approved</p>
              </div>
            </div>

            {/* Charts & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              {/* Performance */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">Performance Overview</h2>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {stats.averageScore}% Achieved
                  </div>
                </div>
                <div className="h-64 md:h-80 flex items-center justify-center relative">
                  {isLoading.history ? (
                    <div className="text-gray-500">Loading performance data...</div>
                  ) : testHistory.length > 0 ? (
                    <>
                      <Doughnut data={performanceData} options={doughnutChartOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl md:text-4xl font-bold text-gray-800">
                          {stats.averageScore}%
                        </div>
                        <div className="text-sm md:text-base text-gray-600 mt-1">
                          {getPerformanceRating(stats.averageScore)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500 text-center">
                      No test data available
                    </div>
                  )}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">Leaderboard</h2>
                  <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Top Performers
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {isLoading.leaderboard ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse h-12 bg-gray-200 rounded-lg" />
                      ))}
                    </div>
                  ) : leaderboard.length > 0 ? (
                    leaderboard.slice(0, 5).map((u, idx) => (
                      <div key={u.id || idx} className="flex items-center p-3 mb-2 bg-white rounded-lg shadow-sm">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                          idx === 0 ? 'bg-yellow-100 text-yellow-800' :
                          idx === 1 ? 'bg-gray-200 text-gray-800' :
                          idx === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 truncate">{u.username}</p>
                          <p className="text-xs text-gray-600 truncate">{u.tests_taken} tests</p>
                        </div>
                        <div className="font-semibold text-blue-600">
                          {Math.round(u.avg_score)}%
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No leaderboard data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={() => handleStartTest()} className="bg-blue-600 text-white py-3 rounded-lg">
                  Start New Test
                </Button>
                <Button onClick={() => navigate('/create-group')} className="bg-purple-600 text-white py-3 rounded-lg">
                  Group Test
                </Button>
                <Button onClick={() => setActiveTab('petromark')} className="bg-yellow-600 text-white py-3 rounded-lg">
                  PetroMark AI
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
