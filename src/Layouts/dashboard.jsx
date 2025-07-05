// src/components/Dashboard.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
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

// register ChartJS components
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

// rank thresholds, chart helpers, etc...
const RANK_THRESHOLDS = {
  5: 'Lieutenant',
  10: 'Commander',
  15: 'Captain',
  20: 'Vice Admiral',
  25: 'General'
};
const TEST_RANK_THRESHOLDS = {
  0:  { title: 'Cadet',        symbol: '🎓' },
  10: { title: 'Lieutenant',   symbol: '⭐' },
  30: { title: 'Commander',    symbol: '🚀' },
  70: { title: 'Captain',      symbol: '👨‍✈️' },
  100:{ title: 'Admiral',      symbol: '🎖️' },
  150:{ title: 'Major General',symbol: '🏅' }
};
function calculateRank(approvedUploads) {
  const thresholds = Object.keys(RANK_THRESHOLDS).map(Number).sort((a,b)=>a-b);
  let currentRank='Recruit', nextRank=null, uploadsNeeded=0;
  for(let t of thresholds) {
    if(approvedUploads>=t) currentRank=RANK_THRESHOLDS[t];
    else if(!nextRank) {
      nextRank=RANK_THRESHOLDS[t];
      uploadsNeeded = t - approvedUploads;
    }
  }
  return { currentRank, nextRank, uploadsNeeded };
}
function calculateTestRank(totalScore) {
  const thr = Object.keys(TEST_RANK_THRESHOLDS).map(Number).sort((a,b)=>b-a);
  for(let t of thr) {
    if(totalScore>=t) {
      const next = thr.find(x=>x>t);
      return {
        currentRank: TEST_RANK_THRESHOLDS[t],
        nextThreshold: next,
        pointsNeeded: next ? next - totalScore : 0
      };
    }
  }
  return { currentRank: TEST_RANK_THRESHOLDS[0], nextThreshold:10, pointsNeeded:10 };
}
function getGradientColors(score) {
  if (score>=90) return ['#4ade80','#22d3ee'];
  if (score>=70) return ['#60a5fa','#c084fc'];
  if (score>=50) return ['#fbbf24','#fb923c'];
  return ['#f9a8d4','#f87171'];
}
export default function Dashboard() {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // state
  const [selectedCourse] = useState('');
  const [questionCount] = useState(5);
  const [testDuration] = useState(300);
  const [leaderboard,   setLeaderboard]   = useState([]);
  const [testHistory,   setTestHistory]   = useState([]);
  const [userName,      setUserName]      = useState('');
  const [userRank,      setUserRank]      = useState(null);
  const [uploadStats,   setUploadStats]   = useState({ approvedUploads:0, rankInfo:calculateRank(0) });
  const [totalTestScore,setTotalTestScore]= useState(0);
  const [testRankInfo,  setTestRankInfo]  = useState(null);
  const [isLoading,     setIsLoading]     = useState({
    leaderboard:true, history:true, rank:true, uploadStats:true
  });
  const [activeTab,     setActiveTab]     = useState('dashboard');
  const [showMobileMenu,setShowMobileMenu]= useState(false);

  // pull username ASAP
  useEffect(() => {
    const stored = localStorage.getItem('username') || 'User';
    setUserName(stored);
  }, []);

  // click-outside for mobile menu
  useEffect(() => {
    function onDown(e) {
      if(menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    }
    if(showMobileMenu) document.addEventListener('mousedown', onDown);
    return ()=>document.removeEventListener('mousedown', onDown);
  }, [showMobileMenu]);

  // fetch all dashboard data
  useEffect(() => {
    (async function load() {
      try {
        // leaderboard
        const lb = await fetchLeaderboard();
        setLeaderboard(lb.data);
        setIsLoading(s=>({...s, leaderboard:false}));

        // history
        const hist = await fetchUserHistory();
        setTestHistory(hist.data);
        setIsLoading(s=>({...s, history:false}));

        // total score & test rank
        const tot = hist.data.reduce((acc,sess)=>acc+sess.score,0);
        setTotalTestScore(tot);
        setTestRankInfo(calculateTestRank(tot));

        // global rank
        const ur = await fetchUserRank();
        setUserRank(ur.data.rank);
        setIsLoading(s=>({...s, rank:false}));

        // uploads
        const up = await fetchUserUploadStats();
        const approved = up.data.approved_uploads||0;
        setUploadStats({
          approvedUploads: approved,
          rankInfo: calculateRank(approved)
        });
        setIsLoading(s=>({...s, uploadStats:false}));
      }
      catch(e){
        console.error(e);
        setIsLoading({ leaderboard:false, history:false, rank:false, uploadStats:false });
      }
    })();
  }, []);

  function handleStartTest(){
    if(!selectedCourse) return alert('Select a course');
    startTest(selectedCourse, questionCount, testDuration)
      .then(res => navigate(`/test/${res.data.id}`))
      .catch(_=>alert('Error starting test'));
  }
  function handleLogout(){
    localStorage.clear();
    navigate('/login', { replace:true });
  }

  // stats cards
  const stats = {
    testsTaken: testHistory.length,
    averageScore: testHistory.length
      ? Math.round(
          testHistory.reduce((sum, s) => 
            sum + ( s.questions?.length 
                    ? (s.score/s.questions.length)*100 
                    : 0), 0
          ) / testHistory.length
        )
      : 0,
    currentRank: userRank
  };

  const doughnutData = {
    datasets:[{
      data:[stats.averageScore, 100-stats.averageScore],
      backgroundColor:[
        getGradientColors(stats.averageScore)[0],
        'rgba(229,231,235,0.3)'
      ],
      borderWidth:0
    }]
  };
  const doughnutOptions = {
    responsive:true,
    cutout:'75%',
    plugins:{ legend:{display:false}, tooltip:{enabled:false} },
    rotation:270
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        {/* header */}
        <div className="mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">
              Welcome, {userName} 👋
            </h1>
            {testRankInfo?.currentRank.title !== 'Cadet' && (
              <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {testRankInfo.currentRank.title}
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            {testRankInfo && testRankInfo.pointsNeeded>0
              ? `You need ${testRankInfo.pointsNeeded} more points to become ${
                  TEST_RANK_THRESHOLDS[testRankInfo.nextThreshold].title
                }`
              : 'You are at the top rank!'}
          </p>
        </div>

        {/* stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tests Taken */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-700">Tests Taken</h3>
            {isLoading.history
              ? <div className="animate-pulse h-8 bg-gray-200 rounded mt-2 w-16" />
              : <p className="text-3xl font-bold text-blue-600 mt-2">{stats.testsTaken}</p>
            }
            <p className="text-xs text-gray-500 mt-1">Total tests completed</p>
          </div>

          {/* Average Score */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-700">Average Score</h3>
            {isLoading.history
              ? <div className="animate-pulse h-8 bg-gray-200 rounded mt-2 w-16" />
              : <p className="text-3xl font-bold text-green-600 mt-2">{stats.averageScore}%</p>
            }
            <p className="text-xs text-gray-500 mt-1">Across all tests</p>
          </div>

          {/* Approved Uploads */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <h3 className="font-semibold text-gray-700">Approved Uploads</h3>
            {isLoading.uploadStats
              ? <div className="animate-pulse h-8 bg-gray-200 rounded mt-2 w-16" />
              : <p className="text-3xl font-bold text-purple-600 mt-2">
                  {uploadStats.approvedUploads}
                </p>
            }
            <p className="text-xs text-gray-500 mt-1">Questions approved</p>
          </div>

          {/* Global Rank */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <h3 className="font-semibold text-gray-700">Global Rank</h3>
            {isLoading.rank
              ? <div className="animate-pulse h-8 bg-gray-200 rounded mt-2 w-16" />
              : <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {userRank ? `#${userRank}` : 'N/A'}
                </p>
            }
            <p className="text-xs text-gray-500 mt-1">Your position</p>
          </div>
        </div>

        {/* performance & leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* performance */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Performance Overview</h2>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {stats.averageScore}% Achieved
              </span>
            </div>
            <div className="relative h-64">
              {isLoading.history
                ? <div className="h-full flex items-center justify-center text-gray-500">Loading data…</div>
                : testHistory.length > 0
                  ? <>
                      <Doughnut data={doughnutData} options={doughnutOptions}/>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{stats.averageScore}%</span>
                        <span className="text-gray-600 text-xs mt-1">
                          {stats.averageScore >= 90
                            ? 'Excellent!'
                            : stats.averageScore >= 70
                              ? 'Good job!'
                              : 'Keep practicing'}
                        </span>
                      </div>
                    </>
                  : <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <p>No test data available</p>
                      <Button
                        onClick={handleStartTest}
                        className="mt-4 bg-blue-600 text-white py-2 rounded-lg text-sm"
                      >
                        Take Your First Test
                      </Button>
                    </div>
              }
            </div>
          </div>

          {/* leaderboard */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Leaderboard</h2>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                Top Performers
              </span>
            </div>
            {isLoading.leaderboard
              ? <div className="space-y-4">
                  {[...Array(5)].map((_,i)=>(
                    <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              : leaderboard.length > 0
                ? <div className="space-y-3">
                    {leaderboard.slice(0,5).map((u,i)=>(
                      <div key={i} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                          i===0?'bg-yellow-200 text-yellow-800':
                          i===1?'bg-gray-200 text-gray-800':
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {i+1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{u.username}</p>
                          <p className="text-xs text-gray-500">{u.tests_taken} tests</p>
                        </div>
                        <p className="font-semibold text-blue-600">{Math.round(u.avg_score)}%</p>
                      </div>
                    ))}
                  </div>
                : <div className="h-32 flex items-center justify-center text-gray-500">
                    No leaderboard data available
                  </div>
            }
          </div>
        </div>

        {/* quick actions */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleStartTest}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center"
            >
              Start New Test
            </Button>
            <Button
              onClick={()=>navigate('/create-group')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-center"
            >
              Group Test
            </Button>
            <Button
              onClick={()=>setActiveTab('petromark')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center"
            >
              PetroMark AI
            </Button>
          </div>
        </div>

        {/* chat */}
        <div className="mt-6">
          <Chat />
        </div>
      </div>
    </div>
  );
}
