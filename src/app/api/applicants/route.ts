import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/applicants - Create or update applicant profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, linkedinUrl, experienceYears, currentPosition, resumePath, bio, gender, race } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if applicant exists
    const existingApplicant = await prisma.applicant.findUnique({
      where: { email },
    })

    let applicant
    if (existingApplicant) {
      // Update existing applicant
      applicant = await prisma.applicant.update({
        where: { email },
        data: {
          name: name || existingApplicant.name,
          phone: phone !== undefined ? phone : existingApplicant.phone,
          linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : existingApplicant.linkedinUrl,
          experienceYears: experienceYears !== undefined ? experienceYears : existingApplicant.experienceYears,
          currentPosition: currentPosition !== undefined ? currentPosition : existingApplicant.currentPosition,
          resumePath: resumePath || existingApplicant.resumePath,
          bio: bio !== undefined ? bio : existingApplicant.bio,
          gender: gender !== undefined ? gender : existingApplicant.gender,
          race: race !== undefined ? race : existingApplicant.race,
        },
      })
    } else {
      // Create new applicant
      applicant = await prisma.applicant.create({
        data: {
          email,
          name: name || null,
          phone: phone || null,
          linkedinUrl: linkedinUrl || null,
          experienceYears: experienceYears || null,
          currentPosition: currentPosition || null,
          resumePath: resumePath || null,
          bio: bio || null,
          gender: gender || null,
          race: race || null,
        },
      })
    }

    return NextResponse.json(applicant, { status: existingApplicant ? 200 : 201 })
  } catch (error) {
    console.error('Error creating/updating applicant:', error)
    return NextResponse.json({ error: 'Failed to create/update applicant' }, { status: 500 })
  }
}
