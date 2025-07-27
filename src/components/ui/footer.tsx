// Jeremiah Petion
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Main Content - Centered and Balanced */}
        <div className="flex flex-col items-center gap-6">
          {/* Branding */}
          <div className="text-center">
            <h2 className="text-slate-400">HashBot AI</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-[-20px]">
            <Link 
              href="/"
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-slate-800/50"
            >
              Home
            </Link>
            <Link 
              href="/image-generator"
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-slate-800/50"
            >
              Generate
            </Link>
            <Link 
              href="/chatbot"
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-slate-800/50"
            >
              Chat
            </Link>
            <Link 
              href="/about"
              className="text-sm text-slate-300 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-slate-800/50"
            >
              About
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-s text-slate-500">
            Copyright &copy; {new Date().getFullYear()} HashBot AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
