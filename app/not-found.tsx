import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
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
          maxWidth: 520,
          width: '100%',
          background: '#FFFFFF',
          padding: '3.5rem 2.5rem',
          borderRadius: 8,
          border: '1px solid #E6E1D7',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#8B4A34',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          404 • Not Found
        </span>

        <h1
          style={{
            fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            margin: '0.25rem 0 1rem',
            color: '#1F1D1A',
            letterSpacing: '-0.01em',
          }}
        >
          Artwork Not Found
        </h1>

        <p
          style={{
            fontSize: '0.875rem',
            color: '#767066',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          The painting, edition, or studio page you are looking for may have been archived into a private collection or moved.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem' }}>
          <Link
            href="/shop"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#24211D',
              color: '#FAF8F5',
              border: '1px solid #171512',
              borderRadius: 6,
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Explore Available Artworks
          </Link>

          <Link
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#FFFFFF',
              color: '#1F1D1A',
              border: '1px solid #D5CEBF',
              borderRadius: 6,
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
