'use client'

import { useState, useEffect, type JSX } from 'react'
import Link from 'next/link'

interface AnalyticsData {
  overview: {
    totalJobs: number
    publishedJobs: number
    totalApplications: number
    totalApplicants: number
    avgApplicationsPerJob: number
    conversionRate: number
  }
  applicationsByStatus: {
    status: string
    count: number
    percentage: number
  }[]
  applicationsByDepartment: {
    department: string
    count: number
    jobs: number
  }[]
  applicationsByMonth: {
    month: string
    applications: number
    hired: number
  }[]
  topJobs: {
    id: string
    title: string
    department: string
    applications: number
    status: string
  }[]
  recentHires: {
    id: string
    name: string
    email: string
    jobTitle: string
    hiredDate: string
  }[]
  applicationsByLocation: {
    location: string
    count: number
  }[]
  timeToHire: {
    avgDays: number
    minDays: number
    maxDays: number
  }
  demographics: {
    applicationsByGender: {
      gender: string
      count: number
      percentage: number
    }[]
    applicationsByRace: {
      race: string
      count: number
      percentage: number
    }[]
    hiredByGender: {
      gender: string
      count: number
      percentage: number
    }[]
    hiredByRace: {
      race: string
      count: number
      percentage: number
    }[]
  }
}

const statusColors: Record<string, string> = {
  PENDING: '#F59E0B',
  REVIEWED: '#3B82F6',
  SHORTLISTED: '#10B981',
  REJECTED: '#EF4444',
  HIRED: '#8B5CF6',
}

const genderColors: Record<string, string> = {
  MALE: '#3B82F6',
  FEMALE: '#EC4899',
  NOT_SPECIFIED: '#9CA3AF',
}

const raceColors: Record<string, string> = {
  BLACK: '#1F2937',
  COLOURED: '#F59E0B',
  WHITE: '#6B7280',
  BASTER: '#8B5CF6',
  NOT_SPECIFIED: '#D1D5DB',
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('all')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
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

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load analytics data</p>
      </div>
    )
  }

  const maxApplications = Math.max(...(data.applicationsByDepartment.map(d => d.count) || [1]))
  const maxMonthlyApplications = Math.max(...(data.applicationsByMonth.map(d => d.applications) || [1]))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Recruitment insights and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E30613] focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Last Year</option>
          </select>
          <Link href="/admin" className="btn-outline">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900">{data.overview.totalApplications}</p>
          <p className="text-xs text-gray-500 mt-1">From {data.overview.totalApplicants} applicants</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
          <p className="text-3xl font-bold text-gray-900">{data.overview.publishedJobs}</p>
          <p className="text-xs text-gray-500 mt-1">of {data.overview.totalJobs} total</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Avg. Applications/Job</p>
          <p className="text-3xl font-bold text-gray-900">{data.overview.avgApplicationsPerJob.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">per published job</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Hire Rate</p>
          <p className="text-3xl font-bold text-green-600">{data.overview.conversionRate.toFixed(1)}%</p>
          <p className="text-xs text-gray-500 mt-1">applications to hires</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Applications by Status - Donut Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Applications by Status</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Simple donut chart using CSS */}
              <svg viewBox="0 0 36 36" className="w-48 h-48 transform -rotate-90">
                {data.applicationsByStatus.reduce((acc, item, index) => {
                  const offset = acc.offset
                  const dashArray = item.percentage
                  acc.elements.push(
                    <circle
                      key={item.status}
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="transparent"
                      stroke={statusColors[item.status] || '#CBD5E1'}
                      strokeWidth="3"
                      strokeDasharray={`${dashArray} ${100 - dashArray}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                    />
                  )
                  acc.offset += dashArray
                  return acc
                }, { elements: [] as JSX.Element[], offset: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{data.overview.totalApplications}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {data.applicationsByStatus.map((item) => (
              <div key={item.status} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: statusColors[item.status] || '#CBD5E1' }}
                />
                <span className="text-sm text-gray-600">{item.status}</span>
                <span className="ml-auto text-sm font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications by Department - Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Applications by Department</h3>
          <div className="space-y-4">
            {data.applicationsByDepartment.map((dept) => (
              <div key={dept.department}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{dept.department}</span>
                  <span className="text-gray-900 font-medium">{dept.count} applications</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E30613] to-[#FF6B6B] rounded-full transition-all duration-500"
                    style={{ width: `${(dept.count / maxApplications) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{dept.jobs} active jobs</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {data.applicationsByMonth.map((month) => (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center gap-1" style={{ height: '200px' }}>
                  <div
                    className="w-full bg-[#E30613] rounded-t transition-all duration-500"
                    style={{
                      height: `${(month.applications / maxMonthlyApplications) * 100}%`,
                      minHeight: month.applications > 0 ? '4px' : '0'
                    }}
                    title={`${month.applications} applications`}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2 truncate w-full text-center">{month.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#E30613] rounded mr-2" />
              <span className="text-sm text-gray-600">Applications</span>
            </div>
          </div>
        </div>

        {/* Top Performing Jobs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Jobs by Applications</h3>
          <div className="space-y-4">
            {data.topJobs.map((job, index) => (
              <Link
                key={job.id}
                href={`/admin/jobs/${job.id}/edit`}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 mr-3">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.department}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#E30613]">{job.applications}</p>
                  <p className="text-xs text-gray-500">applications</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Location Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Applications by Location</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.applicationsByLocation.map((loc) => (
            <div key={loc.location} className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">{loc.count}</p>
              <p className="text-sm text-gray-600">{loc.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Demographics Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Applicants by Gender</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-40 h-40 transform -rotate-90">
                {data.demographics.applicationsByGender.reduce((acc, item, index) => {
                  const offset = acc.offset
                  const dashArray = item.percentage
                  acc.elements.push(
                    <circle
                      key={item.gender}
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="transparent"
                      stroke={genderColors[item.gender] || '#CBD5E1'}
                      strokeWidth="3.5"
                      strokeDasharray={`${dashArray} ${100 - dashArray}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                    />
                  )
                  acc.offset += dashArray
                  return acc
                }, { elements: [] as JSX.Element[], offset: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{data.overview.totalApplicants}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {data.demographics.applicationsByGender.map((item) => (
              <div key={item.gender} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: genderColors[item.gender] || '#CBD5E1' }}
                  />
                  <span className="text-gray-700">{item.gender === 'MALE' ? 'Male' : item.gender === 'FEMALE' ? 'Female' : 'Not Specified'}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{item.count}</span>
                  <span className="text-gray-500 text-sm ml-2">({item.percentage.toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Race Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Applicants by Race</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-40 h-40 transform -rotate-90">
                {data.demographics.applicationsByRace.reduce((acc, item, index) => {
                  const offset = acc.offset
                  const dashArray = item.percentage
                  acc.elements.push(
                    <circle
                      key={item.race}
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="transparent"
                      stroke={raceColors[item.race] || '#CBD5E1'}
                      strokeWidth="3.5"
                      strokeDasharray={`${dashArray} ${100 - dashArray}`}
                      strokeDashoffset={-offset}
                      className="transition-all duration-500"
                    />
                  )
                  acc.offset += dashArray
                  return acc
                }, { elements: [] as JSX.Element[], offset: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{data.overview.totalApplicants}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {data.demographics.applicationsByRace.map((item) => (
              <div key={item.race} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: raceColors[item.race] || '#CBD5E1' }}
                  />
                  <span className="text-gray-700">{item.race.charAt(0) + item.race.slice(1).toLowerCase().replace('_', ' ')}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">{item.count}</span>
                  <span className="text-gray-500 text-sm ml-2">({item.percentage.toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hired Demographics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Hires by Demographics</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Hires by Gender */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">By Gender</h4>
            <div className="space-y-3">
              {data.demographics.hiredByGender.map((item) => (
                <div key={item.gender}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.gender === 'MALE' ? 'Male' : item.gender === 'FEMALE' ? 'Female' : 'Not Specified'}</span>
                    <span className="font-medium text-gray-900">{item.count} ({item.percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: genderColors[item.gender] || '#CBD5E1'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Hires by Race */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">By Race</h4>
            <div className="space-y-3">
              {data.demographics.hiredByRace.map((item) => (
                <div key={item.race}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.race.charAt(0) + item.race.slice(1).toLowerCase().replace('_', ' ')}</span>
                    <span className="font-medium text-gray-900">{item.count} ({item.percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: raceColors[item.race] || '#CBD5E1'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Hires & Time to Hire */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Time to Hire Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Time to Hire</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600">{data.timeToHire.avgDays}</p>
              <p className="text-sm text-gray-600">Avg Days</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-3xl font-bold text-blue-600">{data.timeToHire.minDays}</p>
              <p className="text-sm text-gray-600">Fastest</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <p className="text-3xl font-bold text-orange-600">{data.timeToHire.maxDays}</p>
              <p className="text-sm text-gray-600">Longest</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Insight:</span> Your average time to hire is {data.timeToHire.avgDays} days.
              Industry benchmark for tech roles is typically 30-45 days.
            </p>
          </div>
        </div>

        {/* Recent Hires */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Hires</h3>
          {data.recentHires.length > 0 ? (
            <div className="space-y-4">
              {data.recentHires.map((hire) => (
                <div key={hire.id} className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold mr-3">
                    {hire.name?.charAt(0) || hire.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{hire.name || hire.email}</p>
                    <p className="text-sm text-gray-600">{hire.jobTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{hire.hiredDate}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent hires
            </div>
          )}
        </div>
      </div>

      {/* Pipeline Funnel */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recruitment Funnel</h3>
        <div className="flex flex-col items-center space-y-2">
          {data.applicationsByStatus.map((stage, index) => {
            const widthPercent = 100 - (index * 15)
            return (
              <div
                key={stage.status}
                className="relative flex items-center justify-center text-white font-medium py-3 rounded-lg transition-all duration-500"
                style={{
                  width: `${Math.max(widthPercent, 30)}%`,
                  backgroundColor: statusColors[stage.status] || '#CBD5E1'
                }}
              >
                <span>{stage.status}: {stage.count} ({stage.percentage.toFixed(1)}%)</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
