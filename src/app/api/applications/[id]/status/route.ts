import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { sendStatusUpdateEmail } from '@/lib/email'

interface RouteParams {
  params: Promise<{ id: string }>
}

// PUT /api/applications/[id]/status - Update application status (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session || session.type !== 'HR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status } = body

    const validStatuses = ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        applicant: true,
      },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Update status
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
      include: {
        job: true,
        applicant: true,
      },
    })

    // Send email notification for status changes
    if (['REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED'].includes(status)) {
      await sendStatusUpdateEmail(
        application.applicant.email,
        application.applicant.name || 'Applicant',
        application.job.title,
        status as 'REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED',
        application.id
      )
    }

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error('Error updating application status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
