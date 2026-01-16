'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate, formatDateTime, getJobTypeLabel } from '@/lib/utils'

interface Application {
  id: string
  status: string
  coverLetter: string | null
  createdAt: string
  updatedAt: string
  job: {
    id: string
    title: string
    department: string
    location: string
    type: string
  }
  applicant: {
    id: string
    name: string | null
    email: string
    phone: string | null
    resumePath: string | null
    linkedinUrl: string | null
    bio: string | null
    experienceYears: number | null
    currentPosition: string | null
  }
  emailLogs: {
    id: string
    emailType: string
    subject: string
    sentAt: string
    status: string
  }[]
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplication()
  }, [id])

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/${id}`)
      if (!response.ok) throw new Error('Application not found')
      const data = await response.json()
      setApplication(data)
    } catch {
      setError('Failed to load application')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!application) return
    setUpdating(true)

    try {
      const response = await fetch(`/api/applications/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updatedApp = await response.json()
        setApplication(updatedApp)
      }
    } catch (err) {
      console.error('Error updating status:', err)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#E30613]" />
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Application Not Found</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/admin/applications" className="btn-primary">
          Back to Applications
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/applications" className="inline-flex items-center text-gray-600 hover:text-[#E30613]">
        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Applications
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Applicant Information</h2>
              <StatusBadge status={application.status} size="lg" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">{application.applicant.name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${application.applicant.email}`} className="font-medium text-[#E30613] hover:underline">
                  {application.applicant.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{application.applicant.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Position</p>
                <p className="font-medium text-gray-900">{application.applicant.currentPosition || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Years of Experience</p>
                <p className="font-medium text-gray-900">
                  {application.applicant.experienceYears !== null ? `${application.applicant.experienceYears} years` : 'Not provided'}
                </p>
              </div>
              {application.applicant.linkedinUrl && (
                <div>
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <a
                    href={application.applicant.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#E30613] hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}
            </div>

            {application.applicant.bio && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Professional Summary</p>
                <p className="text-gray-700">{application.applicant.bio}</p>
              </div>
            )}

            {application.applicant.resumePath && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Resume</p>
                <a
                  href={application.applicant.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Resume
                </a>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h2>
              <div className="prose prose-gray max-w-none">
                {application.coverLetter.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Email History */}
          {application.emailLogs && application.emailLogs.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Communication History</h2>
              <div className="space-y-3">
                {application.emailLogs.map((log) => (
                  <div key={log.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <svg className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{log.subject}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${log.status === 'SENT' ? 'bg-green-100 text-green-800' : log.status === 'SIMULATED' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {log.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{formatDateTime(log.sentAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Position Applied For</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Job Title</p>
                <Link href={`/admin/jobs/${application.job.id}/edit`} className="font-medium text-[#E30613] hover:underline">
                  {application.job.title}
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{application.job.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{application.job.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium text-gray-900">{getJobTypeLabel(application.job.type)}</p>
              </div>
            </div>
          </div>

          {/* Application Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Applied</p>
                <p className="font-medium text-gray-900">{formatDateTime(application.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium text-gray-900">{formatDateTime(application.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Status Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {[
                { status: 'PENDING', label: 'Pending', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
                { status: 'REVIEWED', label: 'Mark as Reviewed', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
                { status: 'SHORTLISTED', label: 'Shortlist Candidate', color: 'bg-green-100 hover:bg-green-200 text-green-800' },
                { status: 'REJECTED', label: 'Reject Application', color: 'bg-red-100 hover:bg-red-200 text-red-800' },
                { status: 'HIRED', label: 'Mark as Hired', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800' },
              ].map((action) => (
                <button
                  key={action.status}
                  onClick={() => handleStatusChange(action.status)}
                  disabled={updating || application.status === action.status}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    application.status === action.status
                      ? 'bg-gray-100 text-gray-500 cursor-default'
                      : action.color
                  }`}
                >
                  {application.status === action.status ? `Currently ${action.label}` : action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
