'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate } from '@/lib/utils'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  status: string
  createdAt: string
  closesAt: string | null
  _count: {
    applications: number
  }
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job? This will also delete all associated applications.')) {
      return
    }

    try {
      const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setJobs(jobs.filter((j) => j.id !== id))
      }
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }

  const filteredJobs = filter ? jobs.filter((j) => j.status === filter) : jobs

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#E30613]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
          <p className="text-gray-600 mt-1">Manage job postings</p>
        </div>
        <Link href="/admin/jobs/new" className="btn-primary">
          + Post New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['', 'DRAFT', 'PUBLISHED', 'CLOSED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-[#E30613] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status || 'All'} ({status ? jobs.filter((j) => j.status === status).length : jobs.length})
          </button>
        ))}
      </div>

      {/* Jobs Table */}
      {filteredJobs.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Applications</th>
                  <th>Status</th>
                  <th>Closes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                    </td>
                    <td className="text-gray-700">{job.department}</td>
                    <td>
                      <Link
                        href={`/admin/applications?job=${job.id}`}
                        className="text-[#E30613] hover:underline"
                      >
                        {job._count.applications} applications
                      </Link>
                    </td>
                    <td>
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="text-gray-500">
                      {job.closesAt ? formatDate(job.closesAt) : '-'}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/jobs/${job.id}/edit`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/jobs/${job.id}`}
                          target="_blank"
                          className="text-gray-600 hover:underline text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {filter ? 'No jobs with this status' : 'No jobs yet'}
          </h3>
          <p className="mt-2 text-gray-600">
            {filter ? 'Try selecting a different filter.' : 'Get started by posting your first job.'}
          </p>
          {!filter && (
            <Link href="/admin/jobs/new" className="btn-primary inline-block mt-4">
              Post New Job
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
