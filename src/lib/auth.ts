import jwt from 'jsonwebtoken'
import { cookies, headers } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import prisma from './prisma'

// DEMO MODE - Set to true to return demo sessions
const DEMO_MODE = true

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'
const MAGIC_LINK_EXPIRY = 15 * 60 * 1000 // 15 minutes
const SESSION_EXPIRY = 7 * 24 * 60 * 60 // 7 days in seconds

export interface JWTPayload {
  id: string
  email: string
  type: 'HR' | 'APPLICANT'
  role?: 'ADMIN' | 'HR'
  name?: string
}

export async function generateMagicLink(email: string, userType: 'HR' | 'APPLICANT'): Promise<string> {
  const token = uuidv4()
  const expiresAt = new Date(Date.now() + MAGIC_LINK_EXPIRY)

  await prisma.magicLink.create({
    data: {
      email,
      token,
      userType,
      expiresAt,
    },
  })

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}/api/auth/verify?token=${token}`
}

export async function verifyMagicLink(token: string): Promise<{ email: string; userType: 'HR' | 'APPLICANT' } | null> {
  const magicLink = await prisma.magicLink.findUnique({
    where: { token },
  })

  if (!magicLink || magicLink.used || new Date() > magicLink.expiresAt) {
    return null
  }

  // Mark as used
  await prisma.magicLink.update({
    where: { id: magicLink.id },
    data: { used: true },
  })

  return {
    email: magicLink.email,
    userType: magicLink.userType,
  }
}

export function generateJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: SESSION_EXPIRY })
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  // DEMO MODE: Return demo sessions based on referer/path
  if (DEMO_MODE) {
    const headersList = await headers()
    const referer = headersList.get('referer') || ''
    const pathname = headersList.get('x-pathname') || ''

    // Check if accessing admin or portal
    const isAdmin = referer.includes('/admin') || pathname.includes('/admin')
    const isPortal = referer.includes('/portal') || pathname.includes('/portal')

    if (isAdmin) {
      return {
        id: 'demo-hr-user',
        email: 'admin@mtc.com.na',
        type: 'HR',
        role: 'ADMIN',
        name: 'Demo HR Admin',
      }
    }

    if (isPortal) {
      return {
        id: 'demo-applicant',
        email: 'demo@applicant.com',
        type: 'APPLICANT',
        name: 'Demo Applicant',
      }
    }

    // Default to HR for API calls without clear context
    return {
      id: 'demo-hr-user',
      email: 'admin@mtc.com.na',
      type: 'HR',
      role: 'ADMIN',
      name: 'Demo HR Admin',
    }
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return null
  }

  return verifyJWT(token)
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY,
    path: '/',
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function requireAuth(allowedTypes?: ('HR' | 'APPLICANT')[]): Promise<JWTPayload> {
  const session = await getSession()

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (allowedTypes && !allowedTypes.includes(session.type)) {
    throw new Error('Forbidden')
  }

  return session
}

export async function requireHRAuth(): Promise<JWTPayload> {
  return requireAuth(['HR'])
}

export async function requireApplicantAuth(): Promise<JWTPayload> {
  return requireAuth(['APPLICANT'])
}
