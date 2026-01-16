import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

// GET /api/applicants/me - Get current applicant profile
export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.type !== 'APPLICANT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const applicant = await prisma.applicant.findUnique({
      where: { email: session.email },
    })

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    }

    return NextResponse.json(applicant)
  } catch (error) {
    console.error('Error fetching applicant:', error)
    return NextResponse.json({ error: 'Failed to fetch applicant' }, { status: 500 })
  }
}

// PUT /api/applicants/me - Update current applicant profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.type !== 'APPLICANT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, linkedinUrl, experienceYears, currentPosition, resumePath, bio } = body

    const applicant = await prisma.applicant.update({
      where: { email: session.email },
      data: {
        name,
        phone,
        linkedinUrl,
        experienceYears,
        currentPosition,
        resumePath,
        bio,
      },
    })

    return NextResponse.json(applicant)
  } catch (error) {
    console.error('Error updating applicant:', error)
    return NextResponse.json({ error: 'Failed to update applicant' }, { status: 500 })
  }
}
