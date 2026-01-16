import { NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/auth'

// POST /api/auth/logout - Logout and clear session
export async function POST() {
  try {
    await clearSessionCookie()
    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error logging out:', error)
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}
