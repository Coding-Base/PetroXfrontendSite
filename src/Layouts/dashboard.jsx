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
import { Button } from '../components/ui/button';
import logo from '../images/whitelogo.png';

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

// Rank threshold data (unchanged)
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

const calculateRank = approvedUploads => {
  let currentRank = 'Recruit', nextRank = null, uploadsNeeded = 0;
  const thresholds = Object.keys(RANK_THRESHOLDS).map(Number).sort((a,b)=>a-b);
  for (const t of thresholds) {
    if (approvedUploads >= t) currentRank = RANK_THRESHOLDS[t];
    else if (!nextRank) {
      nextRank = RANK_THRESHOLDS[t];
      uploadsNeeded = t - approvedUploads;
    }
  }
  return { currentRank, nextRank, uploadsNeeded };
};

const calculateTestRank = totalScore => {
  const thresholds = Object.keys(TEST_RANK_THRESHOLDS).map(Number).sort((a,b)=>b-a);
  for (const t of thresholds) {
    if (totalScore >= t) {
      return {
        currentRank: TEST_RANK_THRESHOLDS[t],
        nextThreshold: thresholds.find(x=>x>t),
        pointsNeeded: (thresholds.find(x=>x>t)||t) - totalScore
      };
    }
  }
  return {
    currentRank: TEST_RANK_THRESHOLDS[0],
    nextThreshold: 10,
    pointsNeeded: 10
  };
};

const getGradientColors = score => {
  if (score >= 90) return ['#4ade80','#22d3ee'];
  if (score >= 70) return ['#60a5fa','#c084fc'];
  if (score >= 50) return ['#fbbf24','#fb923c'];
  return ['#f9a8d4','#f87171'];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // state
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [testDuration, setTestDuration] = useState(300);
  const [leaderboard, setLeaderboard] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [uploadStats, setUploadStats] = useState({ approvedUploads: 0, rankInfo: {} });
  const [totalTestScore, setTotalTestScore] = useState(0);
  const [testRankInfo, setTestRankInfo] = useState(null);
  const [userName, setUserName] = useState('User');
  const [isLoading, setIsLoading] = useState({
    leaderboard: true,
    history: true,
    rank: true,
    uploadStats: true,
    courses: true
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // outside click to close menu
  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };
    if (showMobileMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMobileMenu]);

  // fetch all dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // courses
        const c = await fetchCourses(); setCourses(c.data);
        setIsLoading(l=>({...l,courses:false}));

        // leaderboard
        const lb = await fetchLeaderboard(); setLeaderboard(lb.data);
        setIsLoading(l=>({...l,leaderboard:false}));

        // history
        const h = await fetchUserHistory(); setTestHistory(h.data);
        setIsLoading(l=>({...l,history:false}));

        // total score & test rank
        const total = h.data.reduce((sum,s)=>(sum+s.score),0);
        setTotalTestScore(total);
        setTestRankInfo(calculateTestRank(total));

        // global rank
        const r = await fetchUserRank(); setUserRank(r.data.rank);
        setIsLoading(l=>({...l,rank:false}));

        // upload stats
        const u = await fetchUserUploadStats();
        const approved = u.data.approved_uploads||0;
        setUploadStats({ approvedUploads:approved, rankInfo:calculateRank(approved) });
        setIsLoading(l=>({...l,uploadStats:false}));

        // username
        setUserName(localStorage.getItem('username') || 'User');
      } catch(err) {
        console.error('Failed to load dashboard data',err);
        setIsLoading({
          leaderboard:false,
          history:false,
          rank:false,
          uploadStats:false,
          courses:false
        });
      }
    };
    fetchData();
  }, []);

  const handleStartTest = () => {
    if (!selectedCourse) {
      alert('Select a course');
      return;
    }
    startTest(selectedCourse, questionCount, testDuration)
      .then(res=>navigate(`/test/${res.data.id}`))
      .catch(()=>alert('Error starting test'));
  };

  const doughnutOptions = {
    responsive:true,
    maintainAspectRatio:false,
    plugins:{ legend:{ display:false }, tooltip:{ enabled:false } },
    cutout:'75%', rotation:270, circumference:360,
    animation:{ animateRotate:true, animateScale:true }
  };

  // compute stats
  const stats = (() => {
    const testsTaken = testHistory.length;
    let totalPct=0, cnt=0;
    testHistory.forEach(s => {
      const qc = s.questions?.length||0;
      if(qc>0){ totalPct += (s.score/qc)*100; cnt++; }
    });
    const avg = cnt>0?Math.round(totalPct/cnt):0;
    return { testsTaken, averageScore:avg };
  })();

  const performanceData = (() => {
    const [c1,c2] = getGradientColors(stats.averageScore);
    return {
      datasets:[{
        data:[stats.averageScore,100-stats.averageScore],
        backgroundColor:[c1,c2],
        borderWidth:0, borderRadius:10, spacing:0
      }]
    };
  })();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Welcome, {userName} 👋</h1>
        </div>

        {/* Start Test Form */}
        <section className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Start a Test</h2>
          {isLoading.courses ? (
            <p>Loading courses…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <select
                className="border px-3 py-2 rounded"
                value={selectedCourse}
                onChange={e=>setSelectedCourse(e.target.value)}
              >
                <option value="">Select a course</option>
                {courses.map(c=>(
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={questionCount}
                onChange={e=>setQuestionCount(+e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                min="60"
                value={testDuration}
                onChange={e=>setTestDuration(+e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <Button onClick={handleStartTest}>Start Test</Button>
            </div>
          )}
        </section>

        {/* Performance & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
            <div className="h-64 relative">
              {isLoading.history ? (
                <p>Loading performance…</p>
              ) : testHistory.length>0 ? (
                <>
                  <Doughnut data={performanceData} options={doughnutOptions}/>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold">{stats.averageScore}%</p>
                  </div>
                </>
              ) : (
                <p>No test data available</p>
              )}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
            {isLoading.leaderboard ? (
              <p>Loading leaderboard…</p>
            ) : leaderboard.length>0 ? (
              <ul className="space-y-2">
                {leaderboard.slice(0,5).map((u,i)=>(
                  <li key={u.id||i} className="flex justify-between">
                    <span>{i+1}. {u.username}</span>
                    <span>{Math.round(u.avg_score)}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No leaderboard data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
