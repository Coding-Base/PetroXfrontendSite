// dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
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
import { Button } from '../components/ui/button';
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

/* -------------------------
   Config & Helpers
   ------------------------- */

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
  let currentRank = 'Recruit';
  let nextRank = null;
  let uploadsNeeded = 0;
  for (const threshold of thresholds) {
    if (approvedUploads >= threshold) {
      currentRank = RANK_THRESHOLDS[threshold];
    } else if (!nextRank) {
      nextRank = RANK_THRESHOLDS[threshold];
      uploadsNeeded = threshold - approvedUploads;
    }
  }
  return { currentRank, nextRank, uploadsNeeded };
};

const calculateTestRank = (totalScore) => {
  const thresholds = Object.keys(TEST_RANK_THRESHOLDS).map(Number).sort((a, b) => b - a);
  for (const threshold of thresholds) {
    if (totalScore >= threshold) {
      return {
        currentRank: TEST_RANK_THRESHOLDS[threshold],
        nextThreshold: thresholds.find(t => t > threshold),
        pointsNeeded: thresholds.find(t => t > threshold) ? thresholds.find(t => t > threshold) - totalScore : 0
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

const extractResults = (response) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.results)) return response.results;
  if (Array.isArray(response.data?.results)) return response.data.results;
  return [];
};

const getIsNewUserInfo = (historyData, userRank, approvedUploads, averageScore) => {
  const conditions = {
    noHistory: !historyData || historyData.length === 0,
    noRank: !userRank || userRank === null || userRank === 'N/A',
    noUploads: approvedUploads === 0,
    noScore: averageScore === 0
  };
  const isNew = conditions.noHistory || conditions.noRank || conditions.noUploads || conditions.noScore;
  return { isNew, conditions };
};

/* -------------------------
   CustomTour (anchored + hole in overlay)
   ------------------------- */

/**
 * CustomTour supports:
 *  - steps: array of { title, content, position?: {top,left}, selector?: string }
 *  - If selector is present the tooltip anchors to it and the overlay cuts a circular hole so target is visible.
 *  - Tooltip draws a small arrow pointing at the element and calls el.scrollIntoView when selector is present.
 *  - Overlay opacity has been reduced so the dashboard remains visible while touring.
 */
const CustomTour = ({ steps, currentStep, onClose, onNext, onPrev, isActive, onComplete }) => {
  const [pos, setPos] = useState({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
  const [arrow, setArrow] = useState({ left: '50%', direction: 'down', visible: false });
  const [hole, setHole] = useState({ visible: false, cx: 0, cy: 0, r: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setHole({ visible: false, cx: 0, cy: 0, r: 0 });
      return;
    }

    let cancelled = false;

    const updatePosition = async () => {
      const step = steps?.[currentStep];
      if (!step) return setPos({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });

      if (step.selector) {
        try {
          const el = document.querySelector(step.selector);
          if (el) {
            try { el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' }); } catch (e) {}
            await new Promise(res => setTimeout(res, 220));
            if (cancelled) return;

            const rect = el.getBoundingClientRect();
            const tooltipEl = tooltipRef.current;
            const tooltipWidth = tooltipEl?.offsetWidth || 320;
            const tooltipHeight = tooltipEl?.offsetHeight || 140;

            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;
            const preferAbove = spaceAbove > tooltipHeight + 12 || spaceAbove > spaceBelow;

            let topPx;
            let leftPx;

            if (preferAbove) {
              topPx = rect.top - tooltipHeight - 12;
              setArrow(prev => ({ ...prev, direction: 'down' }));
            } else {
              topPx = rect.bottom + 12;
              setArrow(prev => ({ ...prev, direction: 'up' }));
            }

            leftPx = rect.left + rect.width / 2 - tooltipWidth / 2;

            const padding = 8;
            const maxLeft = window.innerWidth - tooltipWidth - padding;
            leftPx = Math.min(Math.max(leftPx, padding), Math.max(maxLeft, padding));

            const elementCenterX = rect.left + rect.width / 2;
            const arrowLeftOffset = Math.min(Math.max(elementCenterX - leftPx, 12), (tooltipWidth || 320) - 12);

            setPos({
              top: `${topPx}px`,
              left: `${leftPx}px`,
              transform: 'none'
            });

            setArrow({ left: `${arrowLeftOffset}px`, direction: preferAbove ? 'down' : 'up', visible: true });

            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const r = Math.max(rect.width, rect.height) / 2 + 18;
            setHole({ visible: true, cx, cy, r });
            return;
          }
        } catch (e) {}
      }

      const top = steps[currentStep].position?.top || '50%';
      const left = steps[currentStep].position?.left || '50%';
      setPos({ top, left, transform: 'translate(-50%, -50%)' });
      setArrow({ left: '50%', direction: 'down', visible: false });
      setHole({ visible: false, cx: 0, cy: 0, r: 0 });
    };

    updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize);
    };
  }, [isActive, currentStep, steps]);

  if (!isActive || !steps?.[currentStep]) return null;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep === steps.length - 1) onComplete();
    else onNext();
  };

  // overlay style - reduced opacity so dashboard remains visible
  const overlayBase = {
    position: 'fixed',
    inset: 0,
    transition: 'clip-path 0.18s ease, background-color 0.18s ease',
    zIndex: 49
  };

  // IMPORTANT: reduced opacities here (user requested lighter overlay)
  const overlayStyle = hole.visible
    ? {
        ...overlayBase,
        backgroundColor: 'rgba(0,0,0,0.18)', // lighter when hole is present
        WebkitClipPath: `circle(${hole.r}px at ${Math.round(hole.cx)}px ${Math.round(hole.cy)}px)`,
        clipPath: `circle(${hole.r}px at ${Math.round(hole.cx)}px ${Math.round(hole.cy)}px)`
      }
    : {
        ...overlayBase,
        backgroundColor: 'rgba(0,0,0,0.14)', // default lighter overlay
        clipPath: 'none'
      };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden={!isActive}>
      {/* overlay with optional hole so the target is visible */}
      <div style={overlayStyle} className="pointer-events-auto" />

      {/* tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-white rounded-xl shadow-2xl p-6 max-w-sm animate-in fade-in-90 zoom-in-90 border border-gray-200 pointer-events-auto z-50"
        style={{
          top: pos.top,
          left: pos.left,
          transform: pos.transform || 'translate(-50%, -50%)',
          position: 'absolute'
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* arrow - show only when anchored */}
        {arrow.visible && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: arrow.left,
              top: arrow.direction === 'up' ? '-8px' : undefined,
              bottom: arrow.direction === 'down' ? '-8px' : undefined,
              transform: 'translateX(-50%)',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                ...(arrow.direction === 'up' ? { borderBottom: '8px solid white' } : { borderTop: '8px solid white' })
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '-8px',
                top: arrow.direction === 'up' ? '8px' : undefined,
                bottom: arrow.direction === 'down' ? '8px' : undefined,
                width: '16px',
                height: '6px',
                filter: 'blur(4px)',
                opacity: 0.06,
                background: 'black',
                borderRadius: 3,
                transform: 'translateY(0.5px)'
              }}
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
              {currentStep + 1}
            </div>
            <h3 className="font-bold text-gray-800">{step.title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4">{step.content}</p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full transition-all ${index === currentStep ? 'bg-blue-600 w-4' : 'bg-gray-300'}`} />
            ))}
          </div>
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <button onClick={onPrev} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors pointer-events-auto">
                Back
              </button>
            )}
            <button onClick={handleNext} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors pointer-events-auto">
              {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------
   Dashboard Component
   ------------------------- */

export default function Dashboard() {
  const navigate = useNavigate();

  // DEV: sanity-check imported components that are critical for rendering.
  // Missing imports (undefined) can cause React "element type is invalid" errors
  // that are hard to debug in production builds. Log them and show a helpful UI
  // instead of letting React crash.
  const _missing = [];
  try {
    if (typeof Doughnut === 'undefined') _missing.push('Doughnut');
  } catch (e) {}
  try {
    if (typeof AffiliateDeals === 'undefined') _missing.push('AffiliateDeals');
  } catch (e) {}
  try {
    if (typeof UpdatesBell === 'undefined') _missing.push('UpdatesBell');
  } catch (e) {}
  try {
    if (typeof TutorialModal === 'undefined') _missing.push('TutorialModal');
  } catch (e) {}

  if (_missing.length > 0) {
    // Log full diagnostic to console for easier debugging
    // eslint-disable-next-line no-console
    console.error('Dashboard: missing imports detected:', _missing);
    return (
      <div className="flex h-screen items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md border border-red-100">
          <h2 className="text-lg font-bold text-red-600 mb-2">Rendering error — missing modules</h2>
          <p className="text-sm text-gray-700 mb-4">The dashboard could not render because the following imports are missing or undefined:</p>
          <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
            {_missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="text-xs text-gray-500">Check your import paths, alias config (vite `resolve.alias`) and that the components export default/named correctly.</p>
        </div>
      </div>
    );
  }

  // state
  const [leaderboard, setLeaderboard] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRank, setUserRank] = useState(null);
  const [uploadStats, setUploadStats] = useState({ approvedUploads: 0, rankInfo: { currentRank: 'Recruit', nextRank: 'Lieutenant', uploadsNeeded: 5 } });
  const [totalTestScore, setTotalTestScore] = useState(0);
  const [testRankInfo, setTestRankInfo] = useState(null);
  const [isLoading, setIsLoading] = useState({ leaderboard: true, history: true, rank: true, uploadStats: true, all: true });
  const [showTutorial, setShowTutorial] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  // tour state
  const [tourState, setTourState] = useState({
    isActive: false,
    currentStep: 0,
    steps: [
      { title: '👋 Welcome to Your Dashboard!', content: 'This is your personal dashboard where you can track your progress, see your stats, and access all features.', position: { top: '20%', left: '50%' } },
      { title: '📊 Your Performance Stats', content: 'Here you can see your key metrics: tests taken, average score, approved uploads, and global rank. Track your improvement over time!', selector: '[data-tour="stats"]' },
      { title: '📈 Performance Chart', content: 'This visual chart shows your average score. Aim for higher percentages to improve your ranking!', selector: '[data-tour="performance-chart"]' },
      { title: '🏆 Leaderboard', content: 'See how you rank against other users. Improve your scores and upload quality questions to climb higher!', selector: '[data-tour="leaderboard"]' },
      { title: '🚀 Quick Actions', content: 'Quick access to start new tests, create group tests, or chat with PetroMark AI for assistance.', selector: '[data-tour="quick-actions"]' },
      { title: '🎯 Ready to Begin!', content: "You're all set! Start by taking your first test or explore other features. Happy learning!", position: { top: '50%', left: '50%' } }
    ]
  });

  // refs & guards
  const mountedRef = useRef(false);
  const sessionTourShownRef = useRef(false);

  // local storage per-user key helpers
  const getUserTourKey = (username) => `petrox_user_${username}_tour_completed`;
  const userHasCompletedTour = (username) => {
    if (!username || username === 'User') return false;
    try { return localStorage.getItem(getUserTourKey(username)) === 'true'; } catch (e) { return false; }
  };
  const markTourCompletedForUser = (username) => {
    if (!username || username === 'User') return;
    try { localStorage.setItem(getUserTourKey(username), 'true'); } catch (e) {}
  };

  // cleanup localStorage old tour keys
  const cleanupOldUserData = (currentUser) => {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('petrox_user_') && k.endsWith('_tour_completed'));
      const keep = new Set([getUserTourKey(currentUser), ...keys.slice(0, 5)]);
      keys.forEach(k => { if (!keep.has(k)) localStorage.removeItem(k); });
    } catch (e) {}
  };

  // calculate stats (pure)
  const calculateStatsFromArray = (historyArr = [], currentRank = null) => {
    const testsTaken = (historyArr || []).length;
    let totalScorePercentage = 0;
    let scoredTests = 0;
    (historyArr || []).forEach(session => {
      const questionCount = session.questions?.length || 0;
      const score = Number(session.score) || 0;
      if (questionCount > 0) {
        const sessionScore = (score / questionCount) * 100;
        totalScorePercentage += sessionScore;
        scoredTests++;
      }
    });
    const averageScore = scoredTests > 0 ? Math.round(totalScorePercentage / scoredTests) : 0;
    return { testsTaken, averageScore, currentRank };
  };

  // fetch dashboard on mount (only once)
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const storedName = localStorage.getItem('username') || 'User';
    setUserName(storedName);
    cleanupOldUserData(storedName);
    setDebugInfo('🔍 Dashboard mounted - starting data fetch');

    const fetchDashboard = async () => {
      try {
        setIsLoading(prev => ({ ...prev, all: true }));

        setDebugInfo(prev => prev + '\n🔍 Fetching user history...');
        const historyRes = await fetchUserHistory();
        const historyData = extractResults(historyRes) || [];
        setTestHistory(historyData);
        setIsLoading(prev => ({ ...prev, history: false }));
        setDebugInfo(prev => prev + `\n🔍 Fetched history length: ${historyData.length}`);

        setDebugInfo(prev => prev + '\n🔍 Fetching user rank...');
        const rankRes = await fetchUserRank();
        const rankData = extractResults(rankRes);
        const userRankValue = rankData?.rank || rankRes?.data?.rank || rankData?.[0]?.rank || null;
        setUserRank(userRankValue);
        setIsLoading(prev => ({ ...prev, rank: false }));
        setDebugInfo(prev => prev + `\n🔍 Extracted rank: ${userRankValue}`);

        setDebugInfo(prev => prev + '\n🔍 Fetching upload stats...');
        const uploadRes = await fetchUserUploadStats();
        const uploadData = extractResults(uploadRes);
        const approvedUploads = uploadData[0]?.approved_uploads || uploadData?.approved_uploads || uploadRes?.data?.approved_uploads || 0;
        setUploadStats({ approvedUploads, rankInfo: calculateRank(approvedUploads) });
        setIsLoading(prev => ({ ...prev, uploadStats: false }));
        setDebugInfo(prev => prev + `\n🔍 Approved uploads: ${approvedUploads}`);

        // compute stats
        const computedStats = calculateStatsFromArray(historyData, userRankValue);
        setDebugInfo(prev => prev + `\n🔍 Computed stats from history: ${JSON.stringify(computedStats)}`);

        // new user decision
        const { isNew, conditions } = getIsNewUserInfo(historyData, userRankValue, approvedUploads, computedStats.averageScore);
        setDebugInfo(prev => prev + `\n🔍 New user conditions: ${JSON.stringify(conditions)} -> isNew=${isNew}`);

        // tour flags
        const completed = userHasCompletedTour(storedName);
        const sessionShown = sessionTourShownRef.current;
        setDebugInfo(prev => prev + `\n🔍 Tour flags: completed=${completed}, sessionShown=${sessionShown}`);

        if (isNew && !completed && !sessionShown) {
          setDebugInfo(prev => prev + '\n🎯 Showing tutorial (conditions met)');
          setTimeout(() => {
            setTourState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
            sessionTourShownRef.current = true;
            setDebugInfo(prev => prev + '\n🎯 Tutorial started and session flag set');
          }, 600);
        } else {
          setDebugInfo(prev => prev + `\n❌ Not showing tutorial (isNew=${isNew}, completed=${completed}, sessionShown=${sessionShown})`);
        }

        // test rank & total score
        if (historyData.length > 0) {
          const totalScore = historyData.reduce((acc, s) => acc + (Number(s.score) || 0), 0);
          setTotalTestScore(totalScore);
          setTestRankInfo(calculateTestRank(totalScore));
        } else {
          setTestRankInfo({ currentRank: TEST_RANK_THRESHOLDS[0], nextThreshold: 10, pointsNeeded: 10 });
        }

        // leaderboard
        const lbRes = await fetchLeaderboard();
        setLeaderboard(extractResults(lbRes));
        setIsLoading(prev => ({ ...prev, leaderboard: false, all: false }));
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setDebugInfo(prev => prev + `\n❗ Failed to load dashboard data: ${err?.message || err}`);
        setIsLoading({ leaderboard: false, history: false, rank: false, uploadStats: false, all: false });

        // fallback tour
        const stored = localStorage.getItem('username') || 'User';
        const completed = userHasCompletedTour(stored);
        if (!completed && !sessionTourShownRef.current) {
          setTimeout(() => {
            setTourState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
            sessionTourShownRef.current = true;
            setDebugInfo(prev => prev + '\n🎯 Fallback started tutorial due to API failure');
          }, 700);
        }
      }
    };

    fetchDashboard();
  }, []);

  // handle modal start
  const handleTutorialComplete = (startTour) => {
    setShowTutorial(false);
    if (startTour) {
      setTimeout(() => {
        setTourState(prev => ({ ...prev, isActive: true, currentStep: 0 }));
        sessionTourShownRef.current = true;
        setDebugInfo(prev => prev + '\n🎯 Manual tutorial start from modal');
      }, 500);
    }
  };

  // tour completion
  const handleTourComplete = () => {
    markTourCompletedForUser(userName);
    setTourState(prev => ({ ...prev, isActive: false }));
    setDebugInfo(prev => prev + '\n✅ Tour completed by user and marked as seen');
  };

  // navigation handlers
  const handleNextStep = () => {
    setTourState(prev => {
      if (prev.currentStep < prev.steps.length - 1) return { ...prev, currentStep: prev.currentStep + 1 };
      handleTourComplete();
      return prev;
    });
  };

  const handlePrevStep = () => setTourState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));

  const handleCloseTour = () => {
    setTourState(prev => ({ ...prev, isActive: false }));
    setDebugInfo(prev => prev + '\n⚠️ Tour closed early by user (not marked completed)');
  };

  // dev helpers
  const resetTutorialForCurrentUser = () => {
    try { localStorage.removeItem(getUserTourKey(userName)); } catch (e) {}
    sessionTourShownRef.current = false;
    setDebugInfo(prev => prev + `\n🔁 Reset tutorial for current user ${userName}`);
  };
  const resetTutorialForAllUsers = () => {
    try {
      Object.keys(localStorage).filter(k => k.startsWith('petrox_user_') && k.endsWith('_tour_completed')).forEach(k => localStorage.removeItem(k));
    } catch (e) {}
    sessionTourShownRef.current = false;
    setDebugInfo(prev => prev + '\n🔁 Reset tutorial for ALL users');
  };

  // UI stats derived from testHistory state
  const stats = calculateStatsFromArray(testHistory, userRank);

  const getPerformanceData = () => {
    const [colorStart, colorEnd] = getGradientColors(stats.averageScore);
    return {
      datasets: [{
        data: [stats.averageScore, 100 - stats.averageScore],
        backgroundColor: [
          `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
          'rgba(229, 231, 235, 0.3)'
        ],
        borderWidth: 0,
        borderRadius: 10,
        spacing: 0,
        hoverOffset: 0
      }]
    };
  };

  const performanceData = getPerformanceData();

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    cutout: '75%',
    rotation: 270,
    circumference: 360,
    animation: { animateRotate: true, animateScale: true }
  };

  const getPerformanceRating = (score) => {
    if (score >= 90) return 'Excellent!';
    if (score >= 80) return 'Great job!';
    if (score >= 70) return 'Good work!';
    if (score >= 60) return 'Keep improving!';
    return 'Needs practice';
  };

  /* -------------------------
     Render
     ------------------------- */

  return (
    <div className="flex flex-col h-screen">
      {/* Tutorial Modal - manual */}
      {showTutorial && (
        <TutorialModal
          isOpen={showTutorial}
          onClose={() => handleTutorialComplete(false)}
          onStartTutorial={() => handleTutorialComplete(true)}
        />
      )}

      {/* Custom tour */}
      <CustomTour
        steps={tourState.steps}
        currentStep={tourState.currentStep}
        isActive={tourState.isActive}
        onClose={handleCloseTour}
        onNext={handleNextStep}
        onPrev={handlePrevStep}
        onComplete={handleTourComplete}
      />

      {/* Debug - dev only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-40 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-md max-h-64 overflow-auto text-xs">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <pre className="whitespace-pre-wrap">{debugInfo}</pre>
          <div className="flex flex-wrap gap-2 mt-2">
            <button onClick={resetTutorialForCurrentUser} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Reset Current User</button>
            <button onClick={resetTutorialForAllUsers} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs">Reset ALL Users</button>
            <button onClick={() => { setTourState(s => ({ ...s, isActive: true, currentStep: 0 })); sessionTourShownRef.current = true; }} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">Force Start Tour</button>
            <button onClick={() => setDebugInfo('')} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs">Clear Debug</button>
          </div>
        </div>
      )}

      {/* Main content (layout & styling intact) */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Welcome Header with Dynamic Rank */}
        <div className="mb-6 md:mb-8" data-tour="header">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, {userName} 👋
              {testRankInfo && testRankInfo.currentRank.title !== 'Cadet' && (
                <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{testRankInfo.currentRank.title}</span>
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
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Loading your rank information...</p>
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
            <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8" data-tour="stats">
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-blue-500" data-tour="tests-taken">
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
                      <p className="text-2xl md:text-3xl font-bold mt-1 text-purple-600">{uploadStats.approvedUploads}</p>
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
                      <div className="animate-pulse h-6 bg-gray-200 rounded mt-1 w-16" />
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
              <div className="performance-chart bg-white p-4 md:p-6 rounded-xl shadow-md" data-tour="performance-chart">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">Performance Overview</h2>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{stats.averageScore}% Achieved</div>
                </div>
                <div className="h-64 md:h-80 flex items-center justify-center relative">
                  {isLoading.history ? (
                    <div className="h-full flex items-center justify-center"><div className="text-gray-500">Loading performance data...</div></div>
                  ) : testHistory.length > 0 ? (
                    <>
                      <Doughnut data={performanceData} options={doughnutChartOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl md:text-4xl font-bold text-gray-800">{stats.averageScore}%</div>
                        <div className="text-sm md:text-base text-gray-600 mt-1">{getPerformanceRating(stats.averageScore)}</div>
                        <div className="mt-2 flex items-center"><span className="text-xs text-gray-500">Overall Score</span></div>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                      <p className="text-gray-500 text-center">No test data available</p>
                      <Button onClick={() => navigate('/dashboard/my-tests')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Take Your First Test</Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="leaderboard-section bg-white p-4 md:p-6 rounded-xl shadow-md" data-tour="leaderboard">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">Leaderboard</h2>
                  <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Top Performers</div>
                </div>
                <div className="overflow-x-auto">
                  {isLoading.leaderboard ? (
                    <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="animate-pulse h-12 bg-gray-200 rounded-lg" />)}</div>
                  ) : leaderboard.length > 0 ? (
                    <div className="space-y-3">
                      {leaderboard.slice(0, 5).map((user, index) => (
                        <div key={user.id || index} className={`flex items-center p-3 rounded-lg ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200' : index === 1 ? 'bg-gray-50' : index === 2 ? 'bg-orange-50' : 'bg-white'}`}>
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${index === 0 ? 'bg-yellow-100 text-yellow-800' : index === 1 ? 'bg-gray-200 text-gray-800' : index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>{index + 1}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 truncate">{user.username || 'Unknown'}</h4>
                            <p className="text-xs text-gray-600 truncate">{user.tests_taken} tests</p>
                          </div>
                          <div className="font-semibold text-blue-600">{Math.round(user.avg_score)}%</div>
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
            <div className="quick-actions bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 md:mb-8" data-tour="quick-actions">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Quick Actions</h2>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Get Started</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Button onClick={() => navigate('/dashboard/enrolled-courses')} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Enrolled Courses
                </Button>

                <Button onClick={() => navigate('/dashboard/enroll-course')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search & Enroll
                </Button>

                <Button onClick={() => navigate('/dashboard/my-tests')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  Start Test
                </Button>

                <Button onClick={() => navigate('/create-group')} className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Group Test
                </Button>

                <Button onClick={() => setActiveTab('petromark')} className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
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
