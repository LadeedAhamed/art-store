'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#FAF9F6',
          color: '#1F1D1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <div
          style={{
            maxWidth: 460,
            width: '100%',
            background: '#FFFFFF',
            padding: '2.5rem',
            borderRadius: 8,
            border: '1px solid #E6E1D7',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem', color: '#1F1D1A' }}>
            Application Fatal Error
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#767066', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            A critical system error occurred. Please reload the atelier session.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.65rem 1.25rem',
              background: '#24211D',
              color: '#FAF8F5',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reload Session
          </button>
        </div>
      </body>
    </html>
  )
}
