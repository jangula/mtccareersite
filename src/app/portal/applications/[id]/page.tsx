'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate, formatDateTime } from '@/lib/utils'

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

const statusTimeline = [
  { status: 'PENDING', label: 'Application Submitted', description: 'Your application is being reviewed by the HR team.' },
  { status: 'REVIEWED', label: 'Under Review', description: 'Your application is currently being evaluated.' },
  { status: 'SHORTLISTED', label: 'Shortlisted', description: 'Congratulations! You have been shortlisted for the next stage.' },
  { status: 'HIRED', label: 'Hired', description: 'Welcome to the team! You have been selected for this position.' },
]

export default function ApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplication()
  }, [id])

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/${id}`)
      if (!response.ok) {
        throw new Error('Application not found')
      }
      const data = await response.json()
      setApplication(data)
    } catch {
      setError('Failed to load application')
    } finally {
      setLoading(false)
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
        <p className="text-gray-600 mb-4">{error || 'The application you are looking for does not exist.'}</p>
        <Link href="/portal/applications" className="btn-primary">
          Back to Applications
        </Link>
      </div>
    )
  }

  const statusIndex = statusTimeline.findIndex((s) => s.status === application.status)
  const isRejected = application.status === 'REJECTED'

  return (
    <div className="space-y-6">
      <Link href="/portal/applications" className="inline-flex items-center text-gray-600 hover:text-[#E30613]">
        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Applications
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{application.job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {application.job.department}
              </span>
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {application.job.location}
              </span>
            </div>
          </div>
          <StatusBadge status={application.status} size="lg" />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Applied:</span> {formatDateTime(application.createdAt)}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> {formatDateTime(application.updatedAt)}
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Application Status</h2>

        {isRejected ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-red-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-medium text-red-800">Application Not Selected</h3>
                <p className="text-sm text-red-700 mt-1">
                  We appreciate your interest in MTC. While your application wasn&apos;t selected for this position,
                  we encourage you to apply for other opportunities that match your skills.
                </p>
                <Link href="/jobs" className="text-sm text-red-700 font-medium hover:underline mt-2 inline-block">
                  Browse other positions
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {statusTimeline.map((step, index) => {
              const isCompleted = index <= statusIndex
              const isCurrent = index === statusIndex

              return (
                <div key={step.status} className="flex items-start mb-6 last:mb-0">
                  <div className="relative flex flex-col items-center mr-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-[#E30613] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    {index < statusTimeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${isCompleted ? 'bg-[#E30613]' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className={`flex-1 ${isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                    <h3 className={`font-medium ${isCurrent ? 'text-[#E30613]' : ''}`}>
                      {step.label}
                    </h3>
                    <p className="text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Cover Letter */}
      {application.coverLetter && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Cover Letter</h2>
          <div className="prose prose-gray max-w-none">
            {application.coverLetter.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700">{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Email History */}
      {application.emailLogs.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Communication History</h2>
          <div className="space-y-3">
            {application.emailLogs.map((log) => (
              <div key={log.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <svg className="h-5 w-5 text-gray-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">{log.subject}</p>
                  <p className="text-sm text-gray-500">{formatDateTime(log.sentAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Job */}
      <div className="flex justify-center">
        <Link href={`/jobs/${application.job.id}`} className="btn-outline">
          View Job Details
        </Link>
      </div>
    </div>
  )
}
