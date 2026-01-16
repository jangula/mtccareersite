import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get all jobs
    const jobs = await prisma.job.findMany({
      include: {
        applications: {
          include: {
            applicant: true
          }
        }
      }
    })

    // Get all applications with details
    const applications = await prisma.application.findMany({
      include: {
        job: true,
        applicant: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get unique applicants
    const applicants = await prisma.applicant.findMany()

    // Calculate overview stats
    const totalJobs = jobs.length
    const publishedJobs = jobs.filter(j => j.status === 'PUBLISHED').length
    const totalApplications = applications.length
    const totalApplicants = applicants.length
    const hiredCount = applications.filter(a => a.status === 'HIRED').length
    const avgApplicationsPerJob = publishedJobs > 0 ? totalApplications / publishedJobs : 0
    const conversionRate = totalApplications > 0 ? (hiredCount / totalApplications) * 100 : 0

    // Applications by status
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const applicationsByStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: totalApplications > 0 ? (count / totalApplications) * 100 : 0
    }))

    // Sort by funnel order
    const statusOrder = ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED']
    applicationsByStatus.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))

    // Applications by department
    const deptCounts = jobs.reduce((acc, job) => {
      if (!acc[job.department]) {
        acc[job.department] = { count: 0, jobs: 0 }
      }
      acc[job.department].count += job.applications.length
      acc[job.department].jobs += 1
      return acc
    }, {} as Record<string, { count: number; jobs: number }>)

    const applicationsByDepartment = Object.entries(deptCounts)
      .map(([department, data]) => ({
        department,
        count: data.count,
        jobs: data.jobs
      }))
      .sort((a, b) => b.count - a.count)

    // Applications by month (last 6 months)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const now = new Date()
    const last6Months = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthApps = applications.filter(app => {
        const appDate = new Date(app.createdAt)
        return appDate.getFullYear() === date.getFullYear() && appDate.getMonth() === date.getMonth()
      })

      last6Months.push({
        month: monthNames[date.getMonth()],
        applications: monthApps.length,
        hired: monthApps.filter(a => a.status === 'HIRED').length
      })
    }

    // Top jobs by applications
    const topJobs = jobs
      .map(job => ({
        id: job.id,
        title: job.title,
        department: job.department,
        applications: job.applications.length,
        status: job.status
      }))
      .sort((a, b) => b.applications - a.applications)
      .slice(0, 5)

    // Recent hires
    const recentHires = applications
      .filter(a => a.status === 'HIRED')
      .slice(0, 5)
      .map(app => ({
        id: app.id,
        name: app.applicant.name,
        email: app.applicant.email,
        jobTitle: app.job.title,
        hiredDate: new Date(app.updatedAt).toLocaleDateString()
      }))

    // Applications by location
    const locationCounts = jobs.reduce((acc, job) => {
      if (!acc[job.location]) {
        acc[job.location] = 0
      }
      acc[job.location] += job.applications.length
      return acc
    }, {} as Record<string, number>)

    const applicationsByLocation = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)

    // Time to hire calculation (mock data for demo)
    const hiredApps = applications.filter(a => a.status === 'HIRED')
    let avgDays = 21
    let minDays = 7
    let maxDays = 45

    if (hiredApps.length > 0) {
      const daysToHire = hiredApps.map(app => {
        const created = new Date(app.createdAt)
        const updated = new Date(app.updatedAt)
        return Math.ceil((updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
      })
      avgDays = Math.round(daysToHire.reduce((a, b) => a + b, 0) / daysToHire.length)
      minDays = Math.min(...daysToHire)
      maxDays = Math.max(...daysToHire)
    }

    // Gender distribution analytics
    const genderCounts = applicants.reduce((acc, applicant) => {
      const gender = applicant.gender || 'NOT_SPECIFIED'
      acc[gender] = (acc[gender] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const applicationsByGender = Object.entries(genderCounts)
      .map(([gender, count]) => ({
        gender,
        count,
        percentage: totalApplicants > 0 ? (count / totalApplicants) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)

    // Race distribution analytics
    const raceCounts = applicants.reduce((acc, applicant) => {
      const race = applicant.race || 'NOT_SPECIFIED'
      acc[race] = (acc[race] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const applicationsByRace = Object.entries(raceCounts)
      .map(([race, count]) => ({
        race,
        count,
        percentage: totalApplicants > 0 ? (count / totalApplicants) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)

    // Hired by gender
    const hiredByGender = hiredApps.reduce((acc, app) => {
      const gender = app.applicant.gender || 'NOT_SPECIFIED'
      acc[gender] = (acc[gender] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const hiredGenderStats = Object.entries(hiredByGender)
      .map(([gender, count]) => ({
        gender,
        count,
        percentage: hiredCount > 0 ? (count / hiredCount) * 100 : 0
      }))

    // Hired by race
    const hiredByRace = hiredApps.reduce((acc, app) => {
      const race = app.applicant.race || 'NOT_SPECIFIED'
      acc[race] = (acc[race] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const hiredRaceStats = Object.entries(hiredByRace)
      .map(([race, count]) => ({
        race,
        count,
        percentage: hiredCount > 0 ? (count / hiredCount) * 100 : 0
      }))

    return NextResponse.json({
      overview: {
        totalJobs,
        publishedJobs,
        totalApplications,
        totalApplicants,
        avgApplicationsPerJob,
        conversionRate
      },
      applicationsByStatus,
      applicationsByDepartment,
      applicationsByMonth: last6Months,
      topJobs,
      recentHires,
      applicationsByLocation,
      timeToHire: {
        avgDays,
        minDays,
        maxDays
      },
      demographics: {
        applicationsByGender,
        applicationsByRace,
        hiredByGender: hiredGenderStats,
        hiredByRace: hiredRaceStats
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
