import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyMagicLink, generateJWT, setSessionCookie, JWTPayload } from '@/lib/auth'

// GET /api/auth/verify - Verify magic link and create session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.redirect(new URL('/login?error=invalid-token', request.url))
    }

    const result = await verifyMagicLink(token)

    if (!result) {
      return NextResponse.redirect(new URL('/login?error=expired-token', request.url))
    }

    const { email, userType } = result
    let jwtPayload: JWTPayload

    if (userType === 'HR') {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return NextResponse.redirect(new URL('/login?error=user-not-found', request.url))
      }

      jwtPayload = {
        id: user.id,
        email: user.email,
        type: 'HR',
        role: user.role,
        name: user.name,
      }
    } else {
      const applicant = await prisma.applicant.findUnique({
        where: { email },
      })

      if (!applicant) {
        return NextResponse.redirect(new URL('/login?error=user-not-found', request.url))
      }

      jwtPayload = {
        id: applicant.id,
        email: applicant.email,
        type: 'APPLICANT',
        name: applicant.name || undefined,
      }
    }

    // Generate JWT and set cookie
    const jwtToken = generateJWT(jwtPayload)
    await setSessionCookie(jwtToken)

    // Redirect to appropriate dashboard
    const redirectUrl = userType === 'HR' ? '/admin' : '/portal'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  } catch (error) {
    console.error('Error verifying magic link:', error)
    return NextResponse.redirect(new URL('/login?error=verification-failed', request.url))
  }
}
