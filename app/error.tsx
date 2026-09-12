'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring services in production
    console.error('Atelier Application Error:', error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: '#FAF9F6',
        color: '#1F1D1A',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          background: '#FFFFFF',
          padding: '2.5rem 2rem',
          borderRadius: 8,
          border: '1px solid #E6E1D7',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#8B4A34',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          Elena Moore Atelier
        </span>

        <h1
          style={{
            fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif",
            fontSize: '2rem',
            fontWeight: 600,
            margin: '0.25rem 0 1rem',
            color: '#1F1D1A',
          }}
        >
          Something Went Wrong
        </h1>

        <p
          style={{
            fontSize: '0.875rem',
            color: '#767066',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
          }}
        >
          We encountered an unexpected error while preparing this artwork view. Please try reloading or return to the main gallery.
        </p>

        {error.digest && (
          <div
            style={{
              fontSize: '0.6875rem',
              fontFamily: 'monospace',
              color: '#948D80',
              background: '#F7F5F0',
              padding: '0.35rem 0.65rem',
              borderRadius: 4,
              marginBottom: '1.5rem',
              wordBreak: 'break-all',
            }}
          >
            Error ID: {error.digest}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.65rem 1.25rem',
              background: '#24211D',
              color: '#FAF8F5',
              border: '1px solid #171512',
              borderRadius: 6,
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>

          <Link
            href="/"
            style={{
              padding: '0.65rem 1.25rem',
              background: '#FFFFFF',
              color: '#1F1D1A',
              border: '1px solid #D5CEBF',
              borderRadius: 6,
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Return to Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}
