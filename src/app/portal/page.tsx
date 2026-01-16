'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/utils'

interface Application {
  id: string
  status: string
  createdAt: string
  job: {
    id: string
    title: string
    department: string
    location: string
  }
}

interface Applicant {
  id: string
  email: string
  name: string | null
  phone: string | null
  resumePath: string | null
}

export default function PortalDashboard() {
  const [applicant, setApplicant] = useState<Applicant | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [applicantRes, applicationsRes] = await Promise.all([
        fetch('/api/applicants/me'),
        fetch('/api/applicants/me/applications'),
      ])

      if (applicantRes.ok) {
        const applicantData = await applicantRes.json()
        setApplicant(applicantData)
      }

      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json()
        setApplications(applicationsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'PENDING').length,
    shortlisted: applications.filter((a) => a.status === 'SHORTLISTED').length,
    rejected: applications.filter((a) => a.status === 'REJECTED').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#E30613]" />
      </div>
    )
  }

  const isProfileIncomplete = !applicant?.name || !applicant?.phone || !applicant?.resumePath

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#E30613] to-[#B8050F] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome{applicant?.name ? `, ${applicant.name}` : ''}!
        </h1>
        <p className="text-white/80">
          Track your job applications and manage your profile from your personal dashboard.
        </p>
      </div>

      {/* Profile Incomplete Warning */}
      {isProfileIncomplete && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start">
          <svg className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="font-medium text-yellow-800">Complete your profile</h3>
            <p className="text-sm text-yellow-700 mt-1">
              A complete profile helps recruiters learn more about you.{' '}
              <Link href="/portal/profile" className="underline font-medium">
                Update your profile now
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Shortlisted</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{stats.shortlisted}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Not Selected</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejected}</p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          <Link href="/portal/applications" className="text-sm text-[#E30613] hover:underline">
            View all
          </Link>
        </div>
        {applications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {applications.slice(0, 5).map((application) => (
              <div key={application.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      href={`/portal/applications/${application.id}`}
                      className="font-medium text-gray-900 hover:text-[#E30613]"
                    >
                      {application.job.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {application.job.department} • {application.job.location}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Applied {formatDate(application.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={application.status} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
            <p className="mt-2 text-gray-600">Start exploring opportunities and submit your first application.</p>
            <Link href="/jobs" className="btn-primary inline-block mt-4">
              Browse Jobs
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/jobs"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center"
        >
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-[#E30613] mr-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Find More Jobs</h3>
            <p className="text-sm text-gray-600">Browse open positions at MTC</p>
          </div>
        </Link>
        <Link
          href="/portal/profile"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Update Profile</h3>
            <p className="text-sm text-gray-600">Keep your information current</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
