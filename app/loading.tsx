export default function Loading() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAF9F6',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: '2px solid #E6E1D7',
          borderTopColor: '#24211D',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span
        style={{
          fontSize: '0.75rem',
          fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#8C8476',
        }}
      >
        Elena Moore Atelier
      </span>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
