import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { timingSafeEqualStrings } from './security'

export const ADMIN_COOKIE_NAME = 'elena_admin_token'
const DEFAULT_ADMIN_PASSWORD = 'studio-elena-2026'

export function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD
  const secret = process.env.ADMIN_SECRET_KEY || 'elena-fine-art-salt-2026'
  return crypto.createHash('sha256').update(`${password}:${secret}`).digest('hex')
}

export function validatePassword(passwordAttempt: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD
  return timingSafeEqualStrings(passwordAttempt, expectedPassword)
}

export function verifyAdminRequest(request: NextRequest): boolean {
  const expected = getExpectedToken()

  // 1. Check HTTP-only cookie
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  if (cookieToken && timingSafeEqualStrings(cookieToken, expected)) {
    return true
  }

  // 2. Check Authorization Header (Bearer or x-admin-key)
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim()
    if (timingSafeEqualStrings(token, expected)) return true
  }

  const customKey = request.headers.get('x-admin-key')
  if (customKey && timingSafeEqualStrings(customKey, expected)) {
    return true
  }

  return false
}
