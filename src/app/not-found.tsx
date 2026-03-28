export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A1628',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: '#FAF8F4'
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '5rem', color: '#B89A5A', margin: '0 0 1rem', fontWeight: 300 }}>404</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 300, margin: '0 0 2rem' }}>Page Not Found</p>
          <a href="/en" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            border: '2px solid #B89A5A',
            color: '#B89A5A',
            textDecoration: 'none',
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em'
          }}>
            Return Home
          </a>
        </div>
      </body>
    </html>
  );
}
