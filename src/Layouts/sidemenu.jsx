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
          }`
        }
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

        {/* Tutorial button in sidebar - Only show if needed */}
        <button
          className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-blue-700 border border-blue-600 mt-4"
          onClick={() => {
            localStorage.removeItem('hasSeenTutorial');
            alert('Tutorial has been reset. Refresh the page to see it again.');
          }}
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Reset Tutorial
          </div>
        </button>
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
