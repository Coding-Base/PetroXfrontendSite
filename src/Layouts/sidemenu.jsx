import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackMenuClick, trackLogout } from '../utils/analytics';
import logo from '../assets/logo.png';

function SideMenu({ activeTab, setActiveTab, setShowTestForm, setShowMobileMenu }) {
  const navigate = useNavigate();

  const handleMenuItemClick = (tabName) => {
    setActiveTab(tabName);
    trackMenuClick(tabName);  // Track menu click
    
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
    <div className="hidden flex-col bg-blue-800 p-6 text-white md:flex md:w-64 sidebar-menu">
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
          Dashboard
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'createTest' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('createTest')}
        >
          Create Test
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'createGroupTest' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('createGroupTest')}
        >
          Create Group Test
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'UploadPastQuestions' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('UploadPastQuestions')}
        >
          Upload Past Questions
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'MaterialManagement' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('MaterialManagement')}
        >
          Material Management
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'petromark' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('petromark')}
        >
          PetroMark AI
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'history' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('history')}
        >
          History
        </button>

        <button
          className={`w-full rounded-lg px-4 py-3 text-left transition ${
            activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-700'
          }`}
          onClick={() => handleMenuItemClick('settings')}
        >
          Settings
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
    </div>
  );
}

export default SideMenu;
