import { NextResponse } from 'next/server'
import { ApiResponseEnvelope } from '@/lib/types/domain'

export class ApiError extends Error {
  statusCode: number
  code: string
  details?: any

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', details?: any) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.code = code
    this.details = details
  }
}

/**
 * Standardized API Response Factory for Next.js App Router
 */
export class ApiResponse {
  /**
   * Return a structured success response (200 OK by default)
   */
  static success<T>(data: T, init?: { status?: number; headers?: HeadersInit }): NextResponse<ApiResponseEnvelope<T>> {
    const payload: ApiResponseEnvelope<T> = {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0',
      },
    }

    return NextResponse.json(payload, {
      status: init?.status ?? 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        ...init?.headers,
      },
    })
  }

  /**
   * Return a structured error response
   */
  static error(
    message: string,
    options?: {
      status?: number
      code?: string
      details?: any
      headers?: HeadersInit
    }
  ): NextResponse<ApiResponseEnvelope<null>> {
    const status = options?.status ?? 500
    const code = options?.code ?? (status === 400 ? 'BAD_REQUEST' : status === 401 ? 'UNAUTHORIZED' : status === 404 ? 'NOT_FOUND' : 'INTERNAL_SERVER_ERROR')

    const payload: ApiResponseEnvelope<null> = {
      success: false,
      error: {
        code,
        message,
        details: options?.details,
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0',
      },
    }

    return NextResponse.json(payload, {
      status,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        ...options?.headers,
      },
    })
  }

  static badRequest(message = 'Invalid request parameters', details?: any) {
    return this.error(message, { status: 400, code: 'BAD_REQUEST', details })
  }

  static unauthorized(message = 'Authentication required') {
    return this.error(message, { status: 401, code: 'UNAUTHORIZED' })
  }

  static forbidden(message = 'Access forbidden') {
    return this.error(message, { status: 403, code: 'FORBIDDEN' })
  }

  static notFound(message = 'Resource not found') {
    return this.error(message, { status: 404, code: 'NOT_FOUND' })
  }

  static rateLimited(message = 'Too many requests. Please try again later.') {
    return this.error(message, { status: 429, code: 'RATE_LIMITED' })
  }

  static internal(message = 'An unexpected server error occurred') {
    return this.error(message, { status: 500, code: 'INTERNAL_SERVER_ERROR' })
  }
}
