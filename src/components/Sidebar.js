'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm h-screen fixed">
      {/* Logo/Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/junfan.jpg"
            alt="Junfan AI Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-medium text-gray-700 dark:text-gray-200">Junfan AI</span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="px-3 py-2">
        {/* Personal Section */}
        <div className="mb-6">
          <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wider">Personal</div>
          <nav className="space-y-0.5">
            <Link
              href="/dashboards"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive('/dashboards')
                  ? 'bg-gray-100/80 text-gray-900 dark:bg-gray-800/50 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/30'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Overview
            </Link>

            <Link
              href="/account"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive('/account')
                  ? 'bg-gray-100/80 text-gray-900 dark:bg-gray-800/50 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/30'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              My Account
            </Link>

            <Link
              href="/assistant"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive('/assistant')
                  ? 'bg-gray-100/80 text-gray-900 dark:bg-gray-800/50 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/30'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
              </svg>
              Research Assistant
            </Link>

            <Link
              href="/reports"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive('/reports')
                  ? 'bg-gray-100/80 text-gray-900 dark:bg-gray-800/50 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/30'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Research Reports
            </Link>

            <Link
              href="/playground"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive('/playground')
                  ? 'bg-gray-100/80 text-gray-900 dark:bg-gray-800/50 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/30'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                <line x1="12" y1="22" x2="12" y2="15.5"></line>
                <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
              </svg>
              API Playground
            </Link>

            <Link
              href="/docs"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive('/docs')
                  ? 'bg-gray-100/80 text-gray-900 dark:bg-gray-800/50 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/30'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Documentation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
          </nav>
        </div>
      </div>

      {/* User Section */}
      <div className="absolute bottom-0 w-64 py-4 px-3">
        <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
            N
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-200">Junfan Zhu</span>
        </button>
      </div>
    </div>
  );
} 