// src/components/Dashboard.jsx
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
import Chat from '../pages/chat';
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
    if (!document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);
  return <elevenlabs-convai agent-id="agent_01jx3tjzhyfjnt6cxax880pxx4" />;
};

// Rank thresholds
const RANK_THRESHOLDS = {
  5: 'Lieutenant',
  10: 'Commander',
  15: 'Captain',
  20: 'Vice Admiral',
  25: 'General'
};
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
    } else if (nextRank === null) {
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
      const next = thresholds.find(x => x > t) || null;
      return {
        currentRank: TEST_RANK_THRESHOLDS[t],
        nextThreshold: next,
        pointsNeeded: next ? next - totalScore : 0
      };
    }
  }
  return {
    currentRank: TEST_RANK_THRESHOLDS[0],
    nextThreshold: 10,
    pointsNeeded: 10
  };
};

const getGradientColors = (score) => {
  if (score >= 90) return ['#4ade80', '#22d3ee'];
  if (score >= 70) return ['#60a5fa', '#c084fc'];
  if (score >= 50) return ['#fbbf24', '#fb923c'];
  return ['#f9a8d4', '#f87171'];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [uploadStats, setUploadStats] = useState({ approvedUploads: 0, rankInfo: {} });
  const [totalTestScore, setTotalTestScore] = useState(0);
  const [testRankInfo, setTestRankInfo] = useState(null);
  const [isLoading, setIsLoading] = useState({
    leaderboard: true,
    history: true,
    rank: true,
    uploadStats: true
  });
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };
    if (showMobileMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMobileMenu]);

  // Fetch dashboard data
  useEffect(() => {
    (async () => {
      try {
        const [lbRes, histRes, rankRes, uploadRes] = await Promise.all([
          fetchLeaderboard(),
          fetchUserHistory(),
          fetchUserRank(),
          fetchUserUploadStats()
        ]);

        // Leaderboard
        setLeaderboard(lbRes.data);
        setIsLoading(s => ({ ...s, leaderboard: false }));

        // History & test score
        setTestHistory(histRes.data);
        setIsLoading(s => ({ ...s, history: false }));
        const totalScore = histRes.data.reduce((sum, s) => sum + s.score, 0);
        setTotalTestScore(totalScore);
        setTestRankInfo(calculateTestRank(totalScore));

        // Rank
        setUserRank(rankRes.data.rank);
        setIsLoading(s => ({ ...s, rank: false }));

        // Upload stats
        const approved = uploadRes.data.approved_uploads || 0;
        setUploadStats({
          approvedUploads: approved,
          rankInfo: calculateRank(approved)
        });
        setIsLoading(s => ({ ...s, uploadStats: false }));

        // Username
        setUserName(localStorage.getItem('username') || 'User');
      } catch (err) {
        console.error(err);
        setIsLoading({
          leaderboard: false,
          history: false,
          rank: false,
          uploadStats: false
        });
      }
    })();
  }, []);

  const calculateStats = () => {
    const testsTaken = testHistory.length;
    const totalPct = testHistory.reduce((sum, s) => {
      const count = s.questions?.length || 0;
      return count > 0 ? sum + (s.score / count) * 100 : sum;
    }, 0);
    const avg = testsTaken ? Math.round(totalPct / testsTaken) : 0;
    return { testsTaken, averageScore: avg, currentRank: userRank };
  };
  const stats = calculateStats();

  const doughnutData = () => {
    const [c1, c2] = getGradientColors(stats.averageScore);
    return {
      datasets: [{
        data: [stats.averageScore, 100 - stats.averageScore],
        backgroundColor: [c1, 'rgba(229,231,235,0.3)'],
        hoverOffset: 0,
        borderWidth: 0
      }]
    };
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    rotation: 270,
    plugins: { legend: { display: false }, tooltip: { enabled: false } }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartTest = () => {
    alert('Select a course from sidebar to start a new test');
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar omitted for brevity */}

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {userName} 👋
          </h1>
          {testRankInfo && (
            <p className="text-gray-600 mt-2 text-sm">
              {testRankInfo.pointsNeeded > 0
                ? `You need ${testRankInfo.pointsNeeded} more points to become a ${TEST_RANK_THRESHOLDS[testRankInfo.nextThreshold]?.title}`
                : 'Congratulations! You have reached the highest rank!'}
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Tests Taken */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Tests Taken</h3>
            {isLoading.history
              ? <div className="animate-pulse h-8 bg-gray-200 rounded mt-2" />
              : <p className="text-3xl font-bold mt-2 text-blue-600">{stats.testsTaken}</p>}
            <p className="text-sm text-gray-500 mt-1">Total tests completed</p>
          </div>
          {/* Average Score */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Average Score</h3>
            {isLoading.history
              ? <div className="animate-pulse h-8 bg-gray-200 rounded mt-2" />
              : <p className="text-3xl font-bold mt-2 text-green-600">{stats.averageScore}%</p>}
            <p className="text-sm text-gray-500 mt-1">Across all tests</p>
          </div>
          {/* Global Rank */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Global Rank</h3>
            {isLoading.rank
              ? <div className="animate-pulse h-8 bg-gray-200 rounded mt-2" />
              : <p className="text-3xl font-bold mt-2 text-purple-600">#{userRank ?? 'N/A'}</p>}
            <p className="text-sm text-gray-500 mt-1">Your position</p>
          </div>
        </div>

        {/* Performance & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Performance Overview</h2>
            <div className="h-64 flex items-center justify-center relative">
              {isLoading.history || stats.testsTaken === 0
                ? <div className="text-gray-500">No test data available</div>
                : <>
                    <Doughnut data={doughnutData()} options={doughnutOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800">{stats.averageScore}%</span>
                      <span className="text-sm text-gray-600 mt-1">
                        {stats.averageScore >= 90
                          ? 'Excellent!'
                          : stats.averageScore >= 80
                            ? 'Great job!'
                            : stats.averageScore >= 70
                              ? 'Good work!'
                              : stats.averageScore >= 60
                                ? 'Keep improving!'
                                : 'Needs practice'}
                      </span>
                    </div>
                  </>}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Leaderboard</h2>
            {isLoading.leaderboard
              ? <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse h-10 bg-gray-200 rounded" />
                  ))}
                </div>
              : leaderboard.length > 0
                ? leaderboard.slice(0, 5).map((u, idx) => (
                    <div key={u.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <span className="font-semibold w-6">{idx+1}.</span>
                        <span className="ml-2">{u.username}</span>
                      </div>
                      <span className="font-medium text-blue-600">
                        {Math.round(u.avg_score)}%
                      </span>
                    </div>
                  ))
                : <div className="text-gray-500">No leaderboard data available</div>
            }
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleStartTest} className="bg-blue-600 text-white">
              Start New Test
            </Button>
            <Button onClick={() => navigate('/create-group')} className="bg-purple-600 text-white">
              Group Test
            </Button>
            <Button onClick={() => setActiveTab('petromark')} className="bg-yellow-600 text-white">
              PetroMark AI
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
