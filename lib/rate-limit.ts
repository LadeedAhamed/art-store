/**
 * In-memory sliding-window rate limiter for serverless / edge API protection.
 */
interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

// Clean up stale memory records periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    rateLimitStore.forEach((record, key) => {
      if (now > record.resetTime) {
        rateLimitStore.delete(key)
      }
    })
  }, 300000)
}

export interface RateLimitOptions {
  limit?: number
  windowMs?: number
}

/**
 * Check if an IP or identifier has exceeded the allowed rate limit.
 *
 * @param identifier Unique client key (IP address, session token, etc.)
 * @param options { limit: max requests, windowMs: duration in ms }
 * @returns { success: boolean, remaining: number, reset: number }
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): { success: boolean; remaining: number; reset: number } {
  const limit = options.limit ?? 20
  const windowMs = options.windowMs ?? 60000 // 1 minute window
  const now = Date.now()

  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      success: true,
      remaining: limit - 1,
      reset: Math.ceil((now + windowMs) / 1000),
    }
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      reset: Math.ceil(record.resetTime / 1000),
    }
  }

  record.count += 1
  return {
    success: true,
    remaining: limit - record.count,
    reset: Math.ceil(record.resetTime / 1000),
  }
}
