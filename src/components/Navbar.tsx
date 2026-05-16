import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,160,82,0.12)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo left */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '18px',
            fontWeight: 700,
            color: '#C9A052',
            letterSpacing: '0.1em',
          }}
        >
          CAMI
        </div>

        {/* Links center */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {['About', 'Services', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: 400,
                color: 'rgba(245,230,200,0.7)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A052')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,230,200,0.7)')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: Phone + Instagram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="tel:9542263557"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: '#C9A052',
              textDecoration: 'none',
              letterSpacing: '0.1em',
            }}
          >
            954 226 3557
          </a>

          <a
            href="https://www.instagram.com/bc_luxery"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#C9A052',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4006E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#C9A052')}
            aria-label="Instagram"
          >
            {/* Instagram SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}
