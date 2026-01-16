import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { sendApplicationReceivedEmail } from '@/lib/email'

// GET /api/applications - List applications (admin only)
export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.type !== 'HR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const applications = await prisma.application.findMany({
      include: {
        job: true,
        applicant: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}

// POST /api/applications - Submit a new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, applicantId, coverLetter } = body

    if (!jobId || !applicantId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if job exists and is published
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job || job.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Job not found or not accepting applications' }, { status: 404 })
    }

    // Check if job has closed
    if (job.closesAt && new Date(job.closesAt) < new Date()) {
      return NextResponse.json({ error: 'This job is no longer accepting applications' }, { status: 400 })
    }

    // Check if applicant exists
    const applicant = await prisma.applicant.findUnique({
      where: { id: applicantId },
    })

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    }

    // Check if already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_applicantId: {
          jobId,
          applicantId,
        },
      },
    })

    if (existingApplication) {
      return NextResponse.json({ error: 'You have already applied for this job' }, { status: 400 })
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        jobId,
        applicantId,
        coverLetter: coverLetter || null,
      },
      include: {
        job: true,
        applicant: true,
      },
    })

    // Send confirmation email
    await sendApplicationReceivedEmail(
      applicant.email,
      applicant.name || 'Applicant',
      job.title,
      application.id
    )

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
