import Link from 'next/link'
import { formatDate, getJobTypeLabel } from '@/lib/utils'

interface JobCardProps {
  job: {
    id: string
    title: string
    department: string
    location: string
    type: string
    closesAt: Date | string | null
  }
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="card p-6 border border-gray-100">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-[#E30613] transition-colors">
              <Link href={`/jobs/${job.id}`}>
                {job.title}
              </Link>
            </h3>
            <span className="badge bg-[#E30613] text-white ml-2 shrink-0">
              {getJobTypeLabel(job.type)}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {job.department}
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {job.closesAt && (
            <span className="text-sm text-gray-500">
              Closes: {formatDate(job.closesAt)}
            </span>
          )}
          <Link
            href={`/jobs/${job.id}`}
            className="btn-primary text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
