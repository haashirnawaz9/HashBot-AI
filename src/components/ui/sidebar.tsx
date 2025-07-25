'use client';

import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  user: boolean;
  firstName?: string
}

const Sidebar = ({ isOpen, toggle, user, firstName }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#0f172a] shadow-lg border-l border-slate-800 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          {/* Close button */}
          <button 
            className="text-white mb-8 hover:text-blue-400 transition-colors cursor-pointer"
            onClick={toggle}
          >
            ✕   Close
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-white hover:text-blue-400 transition-colors py-2"
              onClick={toggle}
            >
              Home
            </Link>
            <Link 
              href="/image-generator" 
              className="text-white hover:text-blue-400 transition-colors py-2"
              onClick={toggle}
            >
              AI Photo Generator
            </Link>
            <Link 
              href="/chatbot" 
              className="text-white hover:text-blue-400 transition-colors py-2"
              onClick={toggle}
            >
              AI ChatBot
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-blue-400 transition-colors py-2"
              onClick={toggle}
            >
              About
            </Link>
          </nav>

          {/* User Info */}
          {user && (
            <div className="mt-8 pt-4 border-t border-slate-700 flex items-center absolute bottom-6">
              <UserButton />
              <span className="ml-3 text-white">Welcome, <span className="font-bold">{firstName}</span></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
