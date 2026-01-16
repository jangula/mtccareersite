import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { formatDate, getJobTypeLabel } from '@/lib/utils'
import StatusBadge from '@/components/ui/StatusBadge'

export const dynamic = 'force-dynamic'

interface JobPageProps {
  params: Promise<{ id: string }>
}

async function getJob(id: string) {
  const job = await prisma.job.findUnique({
    where: { id },
  })
  return job
}

export async function generateMetadata({ params }: JobPageProps) {
  const { id } = await params
  const job = await getJob(id)

  if (!job) {
    return {
      title: 'Job Not Found',
    }
  }

  return {
    title: `${job.title} - ${job.department}`,
    description: job.description.slice(0, 160),
  }
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { id } = await params
  const job = await getJob(id)

  if (!job || job.status !== 'PUBLISHED') {
    notFound()
  }

  const isExpired = job.closesAt && new Date(job.closesAt) < new Date()

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#E30613] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/jobs"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <StatusBadge status={job.type} />
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {job.department}
            </span>
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-gray max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-3">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <div className="prose prose-gray max-w-none">
                {job.requirements.split('\n').map((req, index) => (
                  <p key={index} className="text-gray-700 mb-2 flex items-start">
                    {req.startsWith('-') ? (
                      <>
                        <span className="text-[#E30613] mr-2">•</span>
                        {req.substring(1).trim()}
                      </>
                    ) : (
                      req
                    )}
                  </p>
                ))}
              </div>
            </div>

            {job.benefits && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                <div className="prose prose-gray max-w-none">
                  {job.benefits.split('\n').map((benefit, index) => (
                    <p key={index} className="text-gray-700 mb-2 flex items-start">
                      {benefit.startsWith('-') ? (
                        <>
                          <span className="text-green-500 mr-2">✓</span>
                          {benefit.substring(1).trim()}
                        </>
                      ) : (
                        benefit
                      )}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Employment Type</span>
                  <p className="font-medium text-gray-900">{getJobTypeLabel(job.type)}</p>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Department</span>
                  <p className="font-medium text-gray-900">{job.department}</p>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Location</span>
                  <p className="font-medium text-gray-900">{job.location}</p>
                </div>

                {job.salaryRange && (
                  <div>
                    <span className="text-sm text-gray-500">Salary Range</span>
                    <p className="font-medium text-gray-900">{job.salaryRange}</p>
                  </div>
                )}

                <div>
                  <span className="text-sm text-gray-500">Posted</span>
                  <p className="font-medium text-gray-900">{formatDate(job.createdAt)}</p>
                </div>

                {job.closesAt && (
                  <div>
                    <span className="text-sm text-gray-500">Application Deadline</span>
                    <p className={`font-medium ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatDate(job.closesAt)}
                      {isExpired && ' (Expired)'}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                {isExpired ? (
                  <div className="text-center">
                    <p className="text-red-600 font-medium mb-2">Applications Closed</p>
                    <p className="text-sm text-gray-600">This position is no longer accepting applications.</p>
                  </div>
                ) : (
                  <Link
                    href={`/jobs/${job.id}/apply`}
                    className="btn-primary w-full text-center block"
                  >
                    Apply Now
                  </Link>
                )}
              </div>

              <div className="mt-4 text-center">
                <button className="text-sm text-gray-600 hover:text-[#E30613] transition-colors flex items-center justify-center w-full">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share this job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
