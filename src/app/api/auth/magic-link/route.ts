import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateMagicLink } from '@/lib/auth'
import { sendMagicLinkEmail } from '@/lib/email'
import { isValidEmail } from '@/lib/utils'

// POST /api/auth/magic-link - Send magic link email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, userType } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    if (!userType || !['HR', 'APPLICANT'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 })
    }

    // For HR users, verify they exist in the users table
    if (userType === 'HR') {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        // Don't reveal if user exists or not for security
        return NextResponse.json({ message: 'If an account exists, a login link has been sent.' })
      }
    }

    // For applicants, create account if it doesn't exist
    if (userType === 'APPLICANT') {
      const existingApplicant = await prisma.applicant.findUnique({
        where: { email },
      })

      if (!existingApplicant) {
        await prisma.applicant.create({
          data: { email },
        })
      }
    }

    // Generate and send magic link
    const magicLink = await generateMagicLink(email, userType)
    await sendMagicLinkEmail(email, magicLink, userType === 'HR')

    return NextResponse.json({ message: 'If an account exists, a login link has been sent.' })
  } catch (error) {
    console.error('Error sending magic link:', error)
    return NextResponse.json({ error: 'Failed to send magic link' }, { status: 500 })
  }
}
