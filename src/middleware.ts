import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

// DEMO MODE - Set to true to disable authentication
const DEMO_MODE = true

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

interface JWTPayload {
  id: string
  email: string
  type: 'HR' | 'APPLICANT'
  role?: 'ADMIN' | 'HR'
  name?: string
}

async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // DEMO MODE: Skip all authentication
  if (DEMO_MODE) {
    // Redirect login page to appropriate portal based on query param
    if (pathname === '/login') {
      const redirect = request.nextUrl.searchParams.get('redirect')
      if (redirect === '/admin') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      // Default: show a portal selector or go to applicant portal
      return NextResponse.next()
    }
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get('session')?.value

  // Public routes that don't require authentication
  const isPublicPage =
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/benefits' ||
    pathname === '/culture' ||
    pathname.startsWith('/jobs')

  // Public API routes
  const isPublicApi =
    pathname.startsWith('/api/auth/') ||
    (pathname === '/api/jobs' && request.method === 'GET') ||
    (pathname.startsWith('/api/jobs/') && request.method === 'GET') ||
    (pathname === '/api/applications' && request.method === 'POST') ||
    (pathname === '/api/applicants' && request.method === 'POST') ||
    (pathname === '/api/upload' && request.method === 'POST')

  // Static files and Next.js internals
  const isStaticOrInternal =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/uploads') ||
    pathname.includes('.')

  if (isPublicPage || isPublicApi || isStaticOrInternal) {
    return NextResponse.next()
  }

  // Admin routes require HR authentication
  if (pathname.startsWith('/admin')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
    }

    const payload = await verifyToken(sessionToken)
    if (!payload || payload.type !== 'HR') {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
    }
  }

  // Portal routes require applicant authentication
  if (pathname.startsWith('/portal')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login?redirect=/portal', request.url))
    }

    const payload = await verifyToken(sessionToken)
    if (!payload || payload.type !== 'APPLICANT') {
      return NextResponse.redirect(new URL('/login?redirect=/portal', request.url))
    }
  }

  // API routes for applicant portal
  if (pathname.startsWith('/api/applicants/me')) {
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(sessionToken)
    if (!payload || payload.type !== 'APPLICANT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  // API routes for admin
  if (pathname.startsWith('/api/admin')) {
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(sessionToken)
    if (!payload || payload.type !== 'HR') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
