import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/jobs/[id] - Get job details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const session = await getSession()
    const isAdmin = session?.type === 'HR'

    const job = await prisma.job.findUnique({
      where: { id },
      include: isAdmin
        ? {
            applications: {
              include: {
                applicant: true,
              },
              orderBy: { createdAt: 'desc' },
            },
            _count: {
              select: { applications: true },
            },
          }
        : undefined,
    })

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    // Non-admin users can only see published jobs
    if (!isAdmin && job.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 })
  }
}

// PUT /api/jobs/[id] - Update job (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session || session.type !== 'HR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, department, location, type, description, requirements, benefits, salaryRange, status, closesAt } = body

    const job = await prisma.job.update({
      where: { id },
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements,
        benefits: benefits || null,
        salaryRange: salaryRange || null,
        status,
        closesAt: closesAt ? new Date(closesAt) : null,
      },
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('Error updating job:', error)
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}

// DELETE /api/jobs/[id] - Delete job (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session || session.type !== 'HR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.job.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Job deleted successfully' })
  } catch (error) {
    console.error('Error deleting job:', error)
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
  }
}
