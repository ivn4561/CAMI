export default function Footer() {
  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(201,160,82,0.1)',
        padding: '40px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <img
        src="/Logo.png"
        alt="CAMI by Black Romeo"
        style={{
          width: '60px',
          mixBlendMode: 'screen',
          opacity: 0.85,
        }}
      />
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          letterSpacing: '0.25em',
          color: 'rgba(201,160,82,0.4)',
          textTransform: 'uppercase',
        }}
      >
        Black Romeo × CAMI
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(245,230,200,0.2)',
        }}
      >
        © 2025 All rights reserved · South Florida
      </div>
    </footer>
  )
}
