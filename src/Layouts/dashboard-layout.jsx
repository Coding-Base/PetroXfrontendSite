import { useState } from 'react';
import Sidebar from '../components/shared/sidebar';
import Header from '../components/shared/header';
import MobileSidebar from '../components/shared/mobile-sidebar';
import { MenuIcon } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // FIX: Main container set to h-screen and overflow-hidden to prevent body scroll
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar />
      <div className="flex w-0 flex-1 flex-col h-full overflow-hidden">
        <div className="relative z-10 flex h-20 flex-shrink-0 md:hidden">
          <button
            className="pl-4 text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <Header />
        </div>
        
        {/* FIX: Removed 'mx-2' which caused horizontal scrollbars. Added h-full. */}
        <main className="relative w-full flex-1 focus:outline-none h-full overflow-hidden flex flex-col">
          <div className="hidden md:block">
            <Header />
          </div>
          {/* Children container allows internal scrolling */}
          <div className="flex-1 w-full h-full overflow-hidden">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
