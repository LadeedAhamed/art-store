import crypto from 'crypto'

/**
 * Perform a constant-time comparison of two strings to prevent timing attacks.
 */
export function timingSafeEqualStrings(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf-8')
    const bufB = Buffer.from(b, 'utf-8')

    if (bufA.length !== bufB.length) {
      // Compare dummy buffer to maintain constant execution time
      crypto.timingSafeEqual(bufA, bufA)
      return false
    }

    return crypto.timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

/**
 * Sanitize untrusted input strings to mitigate XSS in text fields.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 5000)
}

/**
 * Generate a cryptographically secure random token (e.g. for CSRF / order nonces).
 */
export function generateSecureToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex')
}
