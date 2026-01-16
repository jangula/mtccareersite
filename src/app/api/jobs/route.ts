import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

// GET /api/jobs - List published jobs (public) or all jobs (admin)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    const isAdmin = session?.type === 'HR'

    const jobs = await prisma.job.findMany({
      where: isAdmin ? {} : { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      include: isAdmin
        ? {
            _count: {
              select: { applications: true },
            },
          }
        : undefined,
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

// POST /api/jobs - Create a new job (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.type !== 'HR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, department, location, type, description, requirements, benefits, salaryRange, status, closesAt } = body

    if (!title || !department || !location || !description || !requirements) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const job = await prisma.job.create({
      data: {
        title,
        department,
        location,
        type: type || 'FULL_TIME',
        description,
        requirements,
        benefits: benefits || null,
        salaryRange: salaryRange || null,
        status: status || 'DRAFT',
        closesAt: closesAt ? new Date(closesAt) : null,
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}
