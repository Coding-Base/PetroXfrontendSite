import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackMenuClick, trackLogout } from '../utils/analytics';
import logo from '../assets/logo.png';
import ActivationModal from '../components/shared/ActivationModal';
import { Icons } from '../components/ui/icons';
import { useFeatureActivation } from '@/hooks/useFeatureActivation';

function SideMenu({ activeTab, setActiveTab, setShowTestForm, setShowMobileMenu }) {
  const navigate = useNavigate();

  const { isUnlocked, monetizationInfo, loading, verifyCode } = useFeatureActivation();
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleMenuItemClick = (tabName) => {
    // Treat enrolled courses and dashboard as safe (not protected)
    const protectedTab = !(tabName === 'enrolledCourses' || tabName === 'dashboard');
    const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));

    if (shouldBlock) {
      // Store the intended action and show activation modal
      setPendingAction(() => () => handleMenuItemClickExecute(tabName));
      setShowModal(true);
      return;
    }

    // Not blocked: perform the action
    handleMenuItemClickExecute(tabName);
  };

  const handleMenuItemClickExecute = (tabName) => {
    setActiveTab(tabName);
    trackMenuClick(tabName); // Track menu click

    // Handle tab-specific actions
    switch(tabName) {
      case 'createTest':
        setShowTestForm(true);
        break;
      case 'createGroupTest':
        navigate('/create-group');
        break;
      case 'UploadPastQuestions':
        navigate('/upload');
        setShowMobileMenu(false);
        break;
      case 'MaterialManagement':
        navigate('/material');
        break;
      default:
        // No additional actions for other tabs
        break;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    trackLogout();  // Track logout event
    navigate('/login');
  };

  return (
    // Added 'h-screen' to ensure sidebar takes full height of the PC screen
    <div className="hidden flex-col bg-blue-800 p-6 text-white md:flex md:w-64 h-screen sidebar-menu sticky top-0 overflow-y-auto">
      <div className="mb-8 flex justify-center">
        <img src={logo} alt="Petrox logo" className="h-24 object-contain" />
      </div>

      <div className="flex-1 space-y-3">
        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('dashboard')}
        >
          <div className="flex items-center justify-between">
            <span>Dashboard</span>
            {/* dashboard is not protected; show nothing here */}
          </div>
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'enrolledCourses' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('enrolledCourses')}
        >
          <div className="flex items-center justify-between">
            <span>Enrolled Courses</span>
            {/* enrolled courses is not protected */}
          </div>
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'createGroupTest' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('createGroupTest')}
        >
          <div className="flex items-center justify-between">
            <span>Create Group Test</span>
            {(() => {
              const protectedTab = !( 'createGroupTest' === 'enrolledCourses' || 'createGroupTest' === 'dashboard');
              const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));
              return shouldBlock ? (Icons.lock ? <Icons.lock className="h-4 w-4 text-yellow-200" /> : null) : null;
            })()}
          </div>
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'UploadPastQuestions' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('UploadPastQuestions')}
        >
          <div className="flex items-center justify-between">
            <span>Upload Past Questions</span>
            {(() => {
              const protectedTab = !( 'UploadPastQuestions' === 'enrolledCourses' || 'UploadPastQuestions' === 'dashboard');
              const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));
              return shouldBlock ? (Icons.lock ? <Icons.lock className="h-4 w-4 text-yellow-200" /> : null) : null;
            })()}
          </div>
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'MaterialManagement' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('MaterialManagement')}
        >
          <div className="flex items-center justify-between">
            <span>Material Management</span>
            {(() => {
              const protectedTab = !( 'MaterialManagement' === 'enrolledCourses' || 'MaterialManagement' === 'dashboard');
              const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));
              return shouldBlock ? (Icons.lock ? <Icons.lock className="h-4 w-4 text-yellow-200" /> : null) : null;
            })()}
          </div>
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'petromark' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('petromark')}
        >
          <div className="flex items-center justify-between">
            <span>PetroMark AI</span>
            {(() => {
              const protectedTab = !( 'petromark' === 'enrolledCourses' || 'petromark' === 'dashboard');
              const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));
              return shouldBlock ? (Icons.lock ? <Icons.lock className="h-4 w-4 text-yellow-200" /> : null) : null;
            })()}
          </div>
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'history' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('history')}
        >
          <div className="flex items-center justify-between">
            <span>History</span>
            {(() => {
              const protectedTab = !( 'history' === 'enrolledCourses' || 'history' === 'dashboard');
              const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));
              return shouldBlock ? (Icons.lock ? <Icons.lock className="h-4 w-4 text-yellow-200" /> : null) : null;
            })()}
          </div>
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('settings')}
        >
          <div className="flex items-center justify-between">
            <span>Settings</span>
            {(() => {
              const protectedTab = !( 'settings' === 'enrolledCourses' || 'settings' === 'dashboard');
              const shouldBlock = protectedTab && (loading ? true : (monetizationInfo?.is_enabled && !isUnlocked));
              return shouldBlock ? (Icons.lock ? <Icons.lock className="h-4 w-4 text-yellow-200" /> : null) : null;
            })()}
          </div>
        </button>

        {/* Tutorial reset button - Only show if needed */}
        {process.env.NODE_ENV === 'development' && (
          <button
            className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-blue-700 border border-blue-600 mt-4"
            onClick={() => {
              localStorage.removeItem('hasSeenTutorial');
              alert('Tutorial has been reset. Refresh the page to see tour.');
            }}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Tutorial
            </div>
          </button>
        )}
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      {/* Activation modal for protected menu items */}
      <ActivationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        monetizationInfo={monetizationInfo}
        onCodeSubmit={async (code) => {
          const res = await verifyCode(code);
          if (res.success && pendingAction) {
            // execute the stored action
            pendingAction();
            setPendingAction(null);
            setShowModal(false);
          }
          return res;
        }}
        isVerifying={false}
      />
    </div>
  );
}

export default SideMenu;
