import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

// GET /api/admin/stats - Get dashboard statistics
export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.type !== 'HR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      totalJobs,
      publishedJobs,
      totalApplications,
      pendingApplications,
      shortlistedCandidates,
      hiredCandidates,
      recentApplications,
    ] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({ where: { status: 'PUBLISHED' } }),
      prisma.application.count(),
      prisma.application.count({ where: { status: 'PENDING' } }),
      prisma.application.count({ where: { status: 'SHORTLISTED' } }),
      prisma.application.count({ where: { status: 'HIRED' } }),
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          job: true,
          applicant: true,
        },
      }),
    ])

    return NextResponse.json({
      stats: {
        totalJobs,
        publishedJobs,
        totalApplications,
        pendingApplications,
        shortlistedCandidates,
        hiredCandidates,
      },
      recentApplications,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
