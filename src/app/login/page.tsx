'use client'

import Link from 'next/link'

// DEMO MODE - Shows portal selector instead of login form
const DEMO_MODE = true

export default function LoginPage() {
  if (DEMO_MODE) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <div className="bg-[#E30613] text-white font-bold text-2xl px-3 py-1 rounded">
                MTC
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Careers</span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Demo Portal Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select a portal to explore the system
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
            <div className="space-y-4">
              {/* HR Admin Portal */}
              <Link
                href="/admin"
                className="block w-full p-6 bg-gradient-to-r from-[#E30613] to-[#B8050F] rounded-xl text-white hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">HR Admin Portal</h3>
                    <p className="text-white/80 text-sm">Manage jobs, applications & candidates</p>
                  </div>
                  <svg className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              {/* Applicant Portal */}
              <Link
                href="/portal"
                className="block w-full p-6 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl text-white hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Applicant Portal</h3>
                    <p className="text-white/80 text-sm">Manage profile & track applications</p>
                  </div>
                  <svg className="h-6 w-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              {/* Browse Jobs */}
              <Link
                href="/jobs"
                className="block w-full p-6 bg-white border-2 border-gray-200 rounded-xl text-gray-900 hover:border-[#E30613] hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <svg className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Browse Jobs</h3>
                    <p className="text-gray-600 text-sm">View open positions & apply</p>
                  </div>
                  <svg className="h-6 w-6 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex">
                <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-800">Demo Mode Active</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Authentication is disabled for demonstration purposes. In production, users would log in via magic link email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            MTC Career Portal System - Demonstration Version
          </p>
        </div>
      </div>
    )
  }

  // Original login form code would go here for non-demo mode
  return null
}
