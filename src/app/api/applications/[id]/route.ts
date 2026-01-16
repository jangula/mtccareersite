import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/applications/[id] - Get application details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        applicant: true,
        emailLogs: {
          orderBy: { sentAt: 'desc' },
        },
      },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Applicants can only see their own applications
    if (session.type === 'APPLICANT') {
      const applicant = await prisma.applicant.findUnique({
        where: { email: session.email },
      })

      if (!applicant || application.applicantId !== applicant.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 })
  }
}

// DELETE /api/applications/[id] - Withdraw application (applicant) or delete (admin)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const application = await prisma.application.findUnique({
      where: { id },
    })

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Applicants can only withdraw their own pending applications
    if (session.type === 'APPLICANT') {
      const applicant = await prisma.applicant.findUnique({
        where: { email: session.email },
      })

      if (!applicant || application.applicantId !== applicant.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      if (application.status !== 'PENDING') {
        return NextResponse.json({ error: 'Can only withdraw pending applications' }, { status: 400 })
      }
    }

    await prisma.application.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Application deleted successfully' })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 })
  }
}
