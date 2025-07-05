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

function calculateRank(approvedUploads) {
  const thresholds = Object.keys(RANK_THRESHOLDS).map(Number).sort((a,b)=>a-b);
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
}

function calculateTestRank(totalScore) {
  const th = Object.keys(TEST_RANK_THRESHOLDS).map(Number).sort((a,b)=>b-a);
  for (const t of th) {
    if (totalScore >= t) {
      return {
        currentRank: TEST_RANK_THRESHOLDS[t],
        nextThreshold: th.find(x=>x>t)||null,
        pointsNeeded: (th.find(x=>x>t)||0) - totalScore
      };
    }
  }
  return {
    currentRank: TEST_RANK_THRESHOLDS[0],
    nextThreshold: 10,
    pointsNeeded: 10
  };
}

function getGradientColors(score) {
  if (score >= 90) return ['#4ade80','#22d3ee'];
  if (score >= 70) return ['#60a5fa','#c084fc'];
  if (score >= 50) return ['#fbbf24','#fb923c'];
  return ['#f9a8d4','#f87171'];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [testDuration, setTestDuration] = useState(300);
  const [leaderboard, setLeaderboard] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [uploadStats, setUploadStats] = useState({ approvedUploads:0, rankInfo:{ currentRank:'Recruit', nextRank:'Lieutenant', uploadsNeeded:5 } });
  const [totalTestScore, setTotalTestScore] = useState(0);
  const [testRankInfo, setTestRankInfo] = useState(null);
  const [isLoading, setIsLoading] = useState({ leaderboard:true, history:true, rank:true, uploadStats:true });
  const [userName, setUserName] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    // Close mobile menu
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        // ...
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const lb = await fetchLeaderboard();
        setLeaderboard(lb.data);
        setIsLoading(s=>({ ...s, leaderboard:false }));

        const hist = await fetchUserHistory();
        setTestHistory(hist.data);
        setIsLoading(s=>({ ...s, history:false }));

        const sum = hist.data.reduce((a,s)=>a+s.score,0);
        setTotalTestScore(sum);
        setTestRankInfo(calculateTestRank(sum));

        const ur = await fetchUserRank();
        setUserRank(ur.data.rank);
        setIsLoading(s=>({ ...s, rank:false }));

        const us = await fetchUserUploadStats();
        const ap = us.data.approved_uploads||0;
        setUploadStats({ approvedUploads:ap, rankInfo:calculateRank(ap) });
        setIsLoading(s=>({ ...s, uploadStats:false }));

        // courses if needed
        const cs = await fetchCourses();
        setCourses(cs.data);

        // username
        setUserName(localStorage.getItem('username')||'User');
      } catch(err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const handleStartTest = () => {
    if (!selectedCourse) {
      alert('Select a course');
      return;
    }
    startTest(selectedCourse, questionCount, testDuration)
      .then(res=>navigate(`/test/${res.data.id}`))
      .catch(()=>alert('Error'));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  // Stats
  const stats = {
    testsTaken: testHistory.length,
    averageScore:
      testHistory.length
        ? Math.round(testHistory.reduce((acc,s)=>{
            const qc = s.questions?.length||0;
            return qc?acc+(s.score/qc*100):acc;
          },0)/testHistory.length)
        : 0
  };

  const doughnutOptions = {
    responsive: true,
    plugins:{ legend:{ display:false }, tooltip:{ enabled:false } },
    cutout:'75%', rotation:270,circumference:360
  };
  const perfColors = getGradientColors(stats.averageScore);
  const doughnutData = {
    datasets:[{
      data:[stats.averageScore,100-stats.averageScore],
      backgroundColor:[perfColors[0],perfColors[1]],
      borderWidth:0
    }]
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">
              Welcome, {userName} 👋
            </h1>
            {testRankInfo?.currentRank?.title && (
              <span className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {testRankInfo.currentRank.title}
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-600">
            {totalTestScore === 0
              ? 'Take your first test!'
              : testRankInfo?.pointsNeeded > 0
                ? `You need ${testRankInfo.pointsNeeded} more points to become a ${TEST_RANK_THRESHOLDS[testRankInfo.nextThreshold]?.title}`
                : "You've reached the highest rank!"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tests Taken */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Tests Taken</h3>
            {isLoading.history
              ? <div className="h-6 bg-gray-200 rounded animate-pulse mt-2 w-20"/>
              : <p className="mt-2 text-2xl font-bold text-blue-600">{stats.testsTaken}</p>}
            <p className="text-gray-500 text-sm mt-1">Total completed</p>
          </div>
          {/* Average Score */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Average Score</h3>
            {isLoading.history
              ? <div className="h-6 bg-gray-200 rounded animate-pulse mt-2 w-20"/>
              : <p className="mt-2 text-2xl font-bold text-green-600">{stats.averageScore}%</p>}
            <p className="text-gray-500 text-sm mt-1">Across all tests</p>
          </div>
          {/* Approved Uploads */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Approved Uploads</h3>
            {isLoading.uploadStats
              ? <div className="h-6 bg-gray-200 rounded animate-pulse mt-2 w-20"/>
              : <p className="mt-2 text-2xl font-bold text-purple-600">{uploadStats.approvedUploads}</p>}
            <p className="text-gray-500 text-sm mt-1">Questions approved</p>
          </div>
        </div>

        {/* Performance & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Performance</h2>
              {!isLoading.history && (
                <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {stats.averageScore}% Achieved
                </span>
              )}
            </div>
            <div className="relative h-64">
              <Doughnut data={doughnutData} options={doughnutOptions}/>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{stats.averageScore}%</span>
                <span className="text-gray-600">{stats.averageScore >= 90 ? 'Excellent' : stats.averageScore >= 70 ? 'Good' : 'Keep Practicing'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Leaderboard</h2>
            </div>
            {isLoading.leaderboard
              ? <div className="space-y-4">
                  {[...Array(5)].map((_,i)=>(
                    <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"/>
                  ))}
                </div>
              : (
                <div className="space-y-3">
                  {leaderboard.slice(0,5).map((u,i)=>(
                    <div key={u.id} className="flex items-center p-3 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                        {i+1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{u.username}</p>
                        <p className="text-xs text-gray-500">{u.tests_taken} tests</p>
                      </div>
                      <p className="font-semibold text-blue-600">{Math.round(u.avg_score)}%</p>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button onClick={()=>navigate('/create-test')} className="bg-blue-600 text-white px-6 py-3">
              Start Personal Test
            </Button>
            <Button onClick={()=>navigate('/create-group')} className="bg-purple-600 text-white px-6 py-3">
              Create Group Test
            </Button>
            <Button onClick={()=>navigate('/petromark')} className="bg-yellow-500 text-white px-6 py-3">
              PetroMark AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
