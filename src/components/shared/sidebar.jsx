import { useState } from 'react';
import DashboardNav from '../shared/dashboard-nav';
import { navItems } from '../../constants/data';
import { useSidebar } from '../../hooks/use-sidebar';
import { cn } from '../../lib/utils';
import { ChevronsLeft } from 'lucide-react';
import logo from '../../images/whitelogo.png';

export default function Sidebar({ className }) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav
      className={cn(
        // FIX: Changed 'h-screen' to 'h-full'.
        // FIX: Changed 'md:block' to 'md:flex flex-col' to enable internal scrolling.
        `relative z-10 hidden h-full flex-none flex-col bg-blue-800 px-3 md:flex`,
        status && 'duration-500',
        !isMinimized ? 'w-56' : 'w-[80px]',
        className
      )}
    >
      {/* Header (Logo & Toggle) - Stays fixed at top */}
      <div
        className={cn(
          'flex items-center px-0 py-5 md:px-2 flex-shrink-0',
          isMinimized ? 'justify-center' : 'justify-between'
        )}
      >
        {!isMinimized && (
          <div className="mb-8 flex justify-center">
            <img src={logo} alt="Petrox logo" className="h-24 object-contain" />
          </div>
        )}
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            'p-1 text-white hover:bg-blue-700 rounded transition',
            isMinimized && 'rotate-180'
          )}
          aria-label="Toggle sidebar"
        >
          <ChevronsLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Nav Items - Scrollable Area */}
      {/* FIX: Added 'flex-1 overflow-y-auto' so this section scrolls if screen is too small */}
      <div className="space-y-4 py-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="px-2 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
